import ZHeader from 'ZHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZRoundedButton from 'ZRoundedButton';
import ZFullCard from 'ZFullCard';
import ZTab from 'ZTab';
import ZTabItem from 'ZTabItem';
import ZCustomHeader from 'ZCustomHeader';
import ZAvatar from 'ZAvatar';
import ZMessageCard from 'ZMessageCard';
import ZPhoto from 'ZPhoto';
import ZProfileCard from 'ZProfileCard';
import ZCard from 'ZCard';
import ZRater from 'NRater';
import ZButtonOutline from 'ZButtonOutline';
import ZInput from 'ZInput';
import ZTextMedium from 'ZTextMedium';
import Icon from 'react-native-vector-icons/Ionicons';
import API from 'API';
import React, { Component } from 'react';
import Dashboard from '../Dashboard';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  colors,
  Platform,
  ImageBackground,
  AsyncStorage
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {
        staffId: {
          fullname: ''
        }
      },
      messageTicker: 0,
      notificationTicker: 0
    }
  }

  static navigationOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      },
      headerTitleStyle: {

      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white'}}></Text>
  };

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    API.get('auth/current').then((res) => {
      console.log('User', res);
      if(res.status){
        this.setState({userData: res.data, messageTicker: res.newMessages, notificationTicker: res.newNotifications});
      }
    });
  }

  onLogout = () => {
    AsyncStorage.setItem('Token', '');
    AsyncStorage.setItem('User', '');
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Login'}]})
  }


  // <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
  //   <TouchableOpacity>
  //     <Image source={require('../Assets/menuiconwhites.png')} style={{width: 40, height: 50, resizeMode: 'stretch'}}/>
  //   </TouchableOpacity>
  // </View>


  render() {
    const { navigate } = this.props.navigation;
    var user = this.state.userData;
    var staffId = user.staffId;

    return (
      <ImageBackground source={require('../Assets/Rectangle.png')} style={{flex: 1, paddingTop: (Platform.OS === 'ios' ? 30: 0)}}>

        <ScrollView>

          <View style={{padding: 30}}>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

              <View style={{flex: 1, flexDirection: 'column'}}>
                <Image source={require('../Assets/logo.png')} style={{width: 50, height: 50, borderRadius: 25, marginLeft: 10, resizeMode: 'stretch'}}/>
                <Text style={{color: 'white', backgroundColor: 'transparent', fontSize: 20}}>Attender</Text>
              </View>

            </View>

            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Image source={{uri: staffId.avatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'}} style={{height: 70, borderRadius: 35, width: 70, resizeMode: (Platform.OS === 'ios' ? 'cover' : 'cover')}}/>
              <View style={{flex: 1, marginLeft: 15, marginTop: 15}}>
                <TouchableOpacity onPress={()=>navigate('SProfile', {userProfile: staffId, isSendMessage: true, isUserProfile: true, user: user})}>
                  <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'justify', backgroundColor: 'transparent'}}>{staffId.fullname}</Text>
                </TouchableOpacity>
                <Text style={{color: '#A2ABDA', textAlign: 'justify', backgroundColor: 'transparent', marginTop: 5, fontSize: 13}}>{staffId.email}</Text>
              </View>
            </View>

            <View style={{marginTop: 15}}>

              <TouchableOpacity onPress={() => navigate('Messages', {onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Messages" styles={{fontSize: 18}}/>
                {
                  this.state.messageTicker >= 1 ?
                    <View style={{position: 'absolute', left: 80, top: 10, width: 18, height: 18, backgroundColor: 'red', borderRadius: 9, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 12, fontWeight: '400', color: 'white'}}>{this.state.messageTicker}</Text>
                    </View>
                  : null
                }
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('VenueSearch', {fullname: staffId.fullname, userId: staffId._id, userProfile: user})}>
                <ZTextMedium text="Browse Venues" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('BrowseEvent', {fullname: staffId.fullname, userId: staffId._id, userProfile: user})}>
                <ZTextMedium text="Browse Events" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Calendar', {isStaff: true})}>
                <ZTextMedium text="Calendar" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Earnings')}>
                <ZTextMedium text="Earnings" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Settings', {props: user, editMode: true, isStaff: true, termsCondition: 'Attendants'})}>
                <ZTextMedium text="Settings" styles={{fontSize: 18}} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Notification', {isStaff: true, onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Notifications" />
                {
                  this.state.notificationTicker >= 1 ?
                    <View style={{position: 'absolute', left: 95, top: 10, width: 18, height: 18, backgroundColor: 'red', borderRadius: 9, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 12, fontWeight: '400', color: 'white'}}>{this.state.notificationTicker}</Text>
                    </View>
                  : null
                }
              </TouchableOpacity>

              <View style={{marginVertical: 60}}>
                <TouchableOpacity onPress={() => this.onLogout()}>
                  <ZTextMedium text="Log out" styles={{fontSize: 18}}/>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  }
});
