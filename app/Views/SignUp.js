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
import Form from 'react-native-form';
import Icon from 'react-native-vector-icons/Ionicons';
import API from 'API';
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
  ActivityIndicator,
  Platform,
  AsyncStorage
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import CountryPicker from 'react-native-country-picker-modal';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
const countryPickerCustomStyles = {};
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      fullname: 'Edgar Deguia',
      Region : 'Mobile Number',
      email: 'admin@attender.com',
      password: 'password',
      isLoading: false,
      country: {
        cca2: 'AU',
        callingCode: '61',
        name: 'Hong Kong'
      },
    }
  }

  static navigationOptions = {
    headerStyle: {
          backgroundColor: '#625BBA'
      },
      headerTitleStyle: {
          flex: 1,
          color: 'white',
          justifyContent: 'center',
          alignItems: 'flex-start'
      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white', fontWeight: '500', fontSize: 18}}>Sign up</Text>
  };

  componentDidMount(){
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() {
    if (Platform.OS == 'ios') {
      try {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
          iosClientId: '547833755930-np96ha557rhhesu7r06n9lojfs542gb1.apps.googleusercontent.com',
          webClientId: '547833755930-k5kkpb37i9abo6hm862kfmsg5oe2if46.apps.googleusercontent.com',
          offlineAccess: false
        });

        // const user = await GoogleSignin.currentUserAsync();
        // console.log(user);
        // this.setState({user});
      }
      catch(err) {
        console.log("Google signin error", err.code, err.message);
      }
    } else {
      try {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
          webClientId: '547833755930-k5kkpb37i9abo6hm862kfmsg5oe2if46.apps.googleusercontent.com',
          offlineAccess: false
        });

        // const user = await GoogleSignin.currentUserAsync();
        // console.log(user);
        // this.setState({user});
      }
      catch(err) {
        console.log("Play services error", err.code, err.message);
      }
    }

  }

  getCurrentUser = () => {
    const { navigate } = this.props.navigation;
    API.get('auth/current').then((res) => {
      console.log('User', res);
      if(res.status){
        AsyncStorage.setItem('User', JSON.stringify(res.data));
        this.setState({isLoading: false});
        if (res.data.hasProfile) {
          if (res.data.isStaff) {
            this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Home'}]})
          } else {
            this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]})
          }

        } else {
          this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Looking'}]})
        }
      }
    });
  }

  onGoogleSignUp = () => {
    GoogleSignin.signIn()
    .then((user) => {
      var obj = {
        accessToken: user.accessToken,
        accessTokenExpirationDate: user.accessTokenExpirationDate,
        email: user.email,
        familyName: user.familyName,
        givenName: user.givenName,
        id: user.id,
        idToken: user.idToken,
        name: user.name,
        photo: user.photo
      }
      API.post('auth/register/google', obj).then((res) => {
        console.log(res);
        if (res.status) {
          API.REQUEST_TOKEN = res.token;
          AsyncStorage.setItem('Token', JSON.stringify(res.token));
          this.getCurrentUser();
        } else {
          alert('Email or Mobile is already taken.');
        }

      });
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut = () => {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

  initUser = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture.height(480),birthday,gender&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      console.log('Facebook profile', json);
      let source = { uri: json.picture.data.url};

      var obj = {
        gender: json.gender,
        id: json.id,
        name: json.name,
        accessToken: token,
        avatar: json.picture.data.url
      }

      API.post('auth/register/facebook', obj).then((res) => {
        console.log(res);
        if (res.status) {
          API.REQUEST_TOKEN = res.token;
          AsyncStorage.setItem('Token', JSON.stringify(res.token));
          this.getCurrentUser();
        } else {
          alert('Account already exist');
        }
      });

    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  onGetFacebookProfile = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            this.initUser(data.accessToken);
            // this.requestInfo();
          })
        }
      },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  onSignUp = () => {
    const { navigate } = this.props.navigation;

    this.setState({isLoading: true});

    API.post('auth/register', this.refs.form.getValues())
    .then((res)=>{
      console.log(res);
      if(res.status){
        this.setState({isLoading: false});
        navigate('ConfirmationSent', {user: this.refs.form.getValues()});
      }else{
        this.setState({isLoading: false});
        alert('Invalid email address');
      }
    });

    // navigate('ConfirmationSent', {user: this.refs.form.getValues()});

    // console.log(this.refs.form.getValues());
  }

  renderOnShowLoading = () => {
    if(this.state.isLoading){
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
        </View>
      )
    }
  }

  _changeCountry = (country) => {
    this.setState({ country });
  }

  renderCountryCode = () => {
    return (
      <View style={{marginTop: -8, marginRight: -5, marginLeft: -15}}>
        <CountryPicker
          ref={'countryPicker'}
          closeable
          style={{justifyContent: 'center', alignItems: 'center'}}
          onChange={this._changeCountry}
          cca2={this.state.country.cca2}
          translation='eng'/>
      </View>
    )
  }

  renderCallingCode = () => {
    return (
      <View>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>+{this.state.country.callingCode}</Text>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#625BBA'}}>
        <ScrollView style={{paddingTop: 20}}>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <Form ref="form" style={{}}>

              <ZInput type="TextInput" name="fullname" placeholder="Full name" topPlaceholder="Full name" />
              <ZInput type="TextInput" name="email" placeholder="E-mail" topPlaceholder="E-mail"/>

              <View>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', paddingHorizontal: 5}}>Region</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', borderBottomWidth: 1, borderColor: 'white', marginBottom: 5, overflow: 'hidden'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: 'white', height: 30, marginVertical: 5, paddingRight: 5}}>
                    {this.renderCountryCode()}
                    {this.renderCallingCode()}
                  </View>
                  <View style={{backgroundColor: 'transparent', paddingHorizontal: 5}}>
                    <TextInput type="TextInput" name="mobile" autoCapitalize="none" underlineColorAndroid="transparent" selectionColor="white" autoCorrect={false} spellCheck={false} placeholder="Mobile" placeholderTextColor="#9895CF" style={{fontSize: 14, color: 'white' , height: 40, width: 180}}/>
                  </View>
                </View>
              </View>

              <ZInput type="TextInput" name="password" placeholder="Password" topPlaceholder="Password" secureTextEntry={true} eyeIcon="ios-eye"/>
            </Form>

          <View style={{marginVertical: 30}}>
            <TouchableOpacity onPress={() => this.onSignUp()}>
              <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 150, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 30}}>
            <TouchableOpacity onPress={() => navigate('TermsAgreement', {termsCondition: 'App'})}>
              <Text style={{color: 'white', fontSize: 12, textAlign: 'center'}}>By confirming your account you agree to our</Text>
              <Text style={{color: '#63c0de', fontSize: 12, textAlign: 'center'}}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>

          <ZButtonOutline name="Sign up using Google" icon="logo-googleplus" iconColor="#EB4C28" styles={{flexDirection: 'row', borderRadius: 10, margin: 5, padding: 5, width: 250}} textStyles={{color: '#EB7960'}} onPress={()=>this.onGoogleSignUp()} />
          <ZButtonOutline name="Sign up using Facebook" icon="logo-facebook" iconColor="#2670C2" styles={{flexDirection: 'row', borderRadius: 10, margin: 5, padding: 5, width: 250}} textStyles={{color: '#38589E'}} onPress={()=>this.onGetFacebookProfile()}/>

          </View>

        </ScrollView>
        {this.renderOnShowLoading()}
      </View>
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
