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
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import API from 'API';

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  AsyncStorage,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      isLoading: false
    }
  }

  static navigationOptions = {
    header: null,
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
      if(res.status){
        this.props.dispatch({ type: 'SET_USERDATA', payload: res.data });
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

  onLogIn = () => {
    this.setState({isLoading: true});
    API.post('auth/login', this.refs.form.getValues())
    .then((res) => {
      console.log(res);
      if(res.status) {
        API.REQUEST_TOKEN = res.token;
        this.props.dispatch({ type: 'SET_AUTHENTICATION', payload: res.token });
        AsyncStorage.setItem('Token', JSON.stringify(res.token));
        this.getCurrentUser();
      } else {
        this.setState({isLoading: false});
        alert('Invalid username and password');
      }
    });
  }

  onGoogleSignin = () => {
    this.setState({isLoading: true});
    GoogleSignin.signIn()
    .then((user) => {

      API.post('auth/login/google', {email: user.email , id: user.id})
      .then((res) => {
        console.log(res);
        if(res.status) {
          API.REQUEST_TOKEN = res.token;
          AsyncStorage.setItem('Token', JSON.stringify(res.token));
          this.getCurrentUser();
        } else {
          this.setState({isLoading: false});
          alert('Account not found');
        }
      });

    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
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

      API.post('auth/login/facebook', obj).then((res) => {
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

  renderOnShowLoading = () => {
    if(this.state.isLoading){
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
        </View>
      )
    }
  }

  onKeyboardDismiss = () => {
    Keyboard.dismiss();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={()=>this.onKeyboardDismiss()}>
      <View style={{flex: 1, backgroundColor: '#625BBA', alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../Assets/attenderlogo.png')} style={{width: 160, height: 140, resizeMode: 'stretch', marginVertical: 30}}/>

        <Form ref="form">
          <ZInput type="TextInput" name="email" placeholder="Email" textInputStyles={{fontWeight: '500'}} icon="ios-contact" iconColor="white" onChangeText={(email)=>this.setState({email})} />
          <ZInput type="TextInput" name="password" placeholder="Password" secureTextEntry={true} textInputStyles={{fontWeight: '500'}} icon="ios-lock" iconColor="white" onChangeText={(password)=>this.setState({password})} />
        </Form>

        <TouchableOpacity onPress={()=>this.onLogIn()}>
          <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, marginTop: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 150, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Log in</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, textAlign: 'center', marginTop: 20}}>Forgot your Password?</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
          <ZButtonOutline name="Log in using Google" icon="logo-googleplus" iconColor="#EB4C28" styles={{flexDirection: 'row', borderRadius: 10, margin: 5, padding: 5, width: 250}} textStyles={{color: '#EB7960'}} onPress={()=>this.onGoogleSignin()}/>
          <ZButtonOutline name="Connect via Facebook" icon="logo-facebook" iconColor="#2670C2" styles={{flexDirection: 'row', borderRadius: 10, margin: 5, padding: 5, width: 250}} textStyles={{color: '#38589E'}} onPress={()=>this.onGetFacebookProfile()}/>

          <TouchableOpacity onPress={()=>navigate('SignUp')}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center', margin: 10}}><Text style={{color: '#62B5D9', fontWeight: '500'}}>Sign up</Text> here if you dont have an account.</Text>
          </TouchableOpacity>

        </View>
        {this.renderOnShowLoading()}
      </View>
      </TouchableWithoutFeedback>
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


const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);