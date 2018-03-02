
import ZHeader from 'ZHeader';
import ZHeader2 from 'ZHeader2';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZInput from 'ZInput';
import ZTextInputWidth from 'ZTextInputWidth';
import ZInputOutline from 'ZInputOutline';
import ZEventCard from 'ZEventCard';

import dashboard from './app/Dashboard';
import StaffProfile from './app/Views/StaffProfile';
import NewMessage from './app/Views/NewMessage';
import VenueStaff from './app/Views/VenueStaff';
import CEvent from './app/Views/CreateEvent';
import Login from './app/Views/Login';
import SignUp from './app/Views/SignUp';
import AccountConfirmed from './app/Views/AccountConfirmed';
import ConfirmationSent from './app/Views/ConfirmationSent';
import ProfileSetup from './app/Views/ProfileSetup';
import Setup from './app/Views/Setup';
import Looking from './app/Views/Looking';
import Hire from './app/Views/Hire';
import Home from './app/Views/Home';
import Settings from './app/Views/Settings';
import AppSettings from './app/Views/AppSettings';
import TermsAgreement from './app/Views/TermsAgreement';
import PrivacyPolicy from './app/Views/PrivacyPolicy';
import Transfer from './app/Views/Transfer';
import Sent from './app/Views/Sent';
import AddingBankDetail from './app/Views/AddingBankDetail';
import TransferMoney from './app/Views/TransferMoney';
import WithdrawFunds from './app/Views/WithdrawFunds';
import Earnings from './app/Views/Earnings';
import WithDrawingFunds from './app/Views/WithDrawingFunds';
import PaymentSettings from './app/Views/PaymentSettings';
import CreditDebit from './app/Views/CreditDebit';
import WithDraw from './app/Views/WithDraw';
import TrialPeriod from './app/Views/TrialPeriod';
import Services from './app/Views/Services';
import BrowseEvent from './app/Views/BrowseEvent';
import BrowseJob from './app/Views/BrowseJob';
import OnboardingScreen from './app/Views/OnboardingScreen';
import EventOrganizerSetup from './app/Views/EventOrganizerSetup';
import VenueSearch from './app/Views/VenueSearch';
import modal from './app/Views/modal';
import Calendar from './app/Views/Calendar';
import InterestEventPeople from './app/Views/InterestEventPeople';
import HomeEmployer from './app/Views/HomeEmployer';
import ChatBox from './app/Views/ChatBox';
import MonthlyReview from './app/Views/MonthlyReview';
import Notification from './app/Views/Notification';
import Messages from './app/Views/Messages';
import StaffTimeSheet from './app/Views/StaffTimeSheet';
import SearchStaff from './app/Views/SearchStaff';

import API from 'API';

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  ActivityIndicator,
  Platform,
  Linking,
  PushNotificationIOS
} from 'react-native';

import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';

const autoLogin = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});

export default class Attender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      isLoading: true,
      deviceToken: ''
    }
  }

  componentDidMount() {
    if(Platform.OS == 'ios') {
      if (__DEV__) {
        AsyncStorage.getItem('Token').then((token) => {
          console.log('Token', JSON.parse(token));
          if(token != null){
            API.REQUEST_TOKEN = JSON.parse(token);
            this.getCurrentUser('');
            // this.props.navigation.dispatch(autoLogin);
          }else{
            this.setState({isLoading: false});
          }
        });
      } else {
        PushNotificationIOS.addEventListener('register', (dToken) => {
          AsyncStorage.getItem('Token').then((token) => {
            console.log('Token', JSON.parse(token));
            if(token != null){
              API.REQUEST_TOKEN = JSON.parse(token);
              this.getCurrentUser(dToken);
              // this.props.navigation.dispatch(autoLogin);
            }else{
              this.setState({isLoading: false});
            }
          });
        });
      }

      PushNotificationIOS.addEventListener('notification', function(notification){
       console.log('You have received a new notification!', notification);
      });

      PushNotificationIOS.requestPermissions();
    } else {
      AsyncStorage.getItem('Token').then((token) => {
        console.log('Token', JSON.parse(token));
        if(token != null){
          API.REQUEST_TOKEN = JSON.parse(token);
          this.getCurrentUser('');
          // this.props.navigation.dispatch(autoLogin);
        }else{
          this.setState({isLoading: false});
        }
      });
    }

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillMount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;

    const route = url.replace(/.*?:\/\//g, '');
    // const name = route.match(/\/([^\/]+)\/?$/)[1];
    const token = route.split('/')[1];
    const name = route.split('/')[2];
    const routeName = route.split('/')[0];
    if (routeName === 'accountConfirmed') {
      API.REQUEST_TOKEN = token;
      navigate('AccountConfirmed', {fullname: name});
      // this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'AccountConfirmed', params: {fullname: name}}]})

    };
  }

  getCurrentUser = (dToken) => {
    console.log(`auth/current?dToken=${dToken}&type=ios`);
    API.get(`auth/current?dToken=${dToken}&type=ios`).then((res) => {
      console.log(res);
      if(res.status){
        AsyncStorage.setItem('User', JSON.stringify(res.data));
        if (res.data.hasProfile) {
          if (res.data.isStaff) {
            this.setState({isLoading: false});
            this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Home'}]})
          } else {
            if (res.data.isVenue) {
              this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]})
            } else {
              this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]})
            }
          }

        } else {
          this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Looking'}]})
        }
      }else{
        AsyncStorage.setItem('User', '');
        AsyncStorage.setItem('Token', '');
        this.setState({isLoading: false});
      }
    });
  }

  static navigationOptions = {
    header: null,
  };

  renderOnShowLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.9}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
          <Text style={{fontSize: 10, marginTop: 5}}>Loading data...</Text>
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          {this.renderOnShowLoading()}
        </View>
      )
    }
    return(
      <View style={{flex: 1}}>
        <ImageBackground source={require('./app/Assets/bg.png')} style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginBottom: 50}}>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 5, margin: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 140, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Log In</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('SignUp')}>
              <View style={{borderRadius: 5, backgroundColor: '#00E5FF', padding: 5, margin: 10, paddingHorizontal: 10, width: 140, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }

}

const App = StackNavigator(
  {
    Main: {screen: Attender},
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    AccountConfirmed: {screen: AccountConfirmed},
    ConfirmationSent: {screen: ConfirmationSent},
    Setup: {screen: Setup},
    ProfileSetup: {screen: ProfileSetup},
    Looking: {screen: Looking},
    Hire: {screen: Hire},
    Home: {screen: Home},
    Settings: {screen: Settings},
    AppSettings: {screen: AppSettings},
    TermsAgreement: {screen: TermsAgreement},
    PrivacyPolicy: {screen: PrivacyPolicy},
    Transfer: {screen: Transfer},
    Sent: {screen: Sent},
    TransferMoney: {screen: TransferMoney},
    WithdrawFunds: {screen: WithdrawFunds},
    WithDrawingFunds: {screen: WithDrawingFunds},
    AddingBankDetail: {screen: AddingBankDetail},
    Earnings: {screen: Earnings},
    PaymentSettings: {screen: PaymentSettings},
    CreditDebit: {screen: CreditDebit},
    WithDraw: {screen: WithDraw},
    TrialPeriod: {screen: TrialPeriod},
    Services: {screen: Services},
    OnboardingScreen: {screen: OnboardingScreen},
    Dashboard: {screen: dashboard},
    SProfile: {screen: StaffProfile},
    NMessage: {screen: NewMessage},
    VStaff: {screen: VenueStaff},
    CreatEvent: {screen: CEvent},
    EventOrganizerSetup: {screen: EventOrganizerSetup},
    BrowseEvent: {screen: BrowseEvent},
    BrowseJob: {screen: BrowseJob},
    VenueSearch: {screen: VenueSearch},
    modal: {screen: modal},
    Calendar: {screen: Calendar},
    InterestEventPeople: {screen: InterestEventPeople},
    HomeEmployer: {screen: HomeEmployer},
    ChatBox: {screen: ChatBox},
    MonthlyReview: {screen: MonthlyReview},
    Notification: {screen: Notification},
    Messages: {screen: Messages},
    StaffTimeSheet: {screen: StaffTimeSheet},
    SearchStaff: {screen: SearchStaff}
  },
  {
    initialRouteName: 'Main'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    backgroundColor: 'purple',
    padding: 10,
    paddingTop: 25,
    width: '100%',
    alignItems: 'center'
  },
  headingText: {
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});

AppRegistry.registerComponent('Attender', () => App);
