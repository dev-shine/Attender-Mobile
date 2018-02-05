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
  colors,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import API from 'API';

import {
  StackNavigator,
} from 'react-navigation';

export default class Loking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      isLoading: true
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

  componentDidMount(){
    API.get('auth/current').then((res) => {
      console.log(res);
      if(res.status){
        AsyncStorage.setItem('User', JSON.stringify(res.data));
        this.props.navigation.setParams({fullname: res.data.fullname});
        this.setState({isLoading: false});
      }else{
        AsyncStorage.setItem('User', '');
        AsyncStorage.setItem('Token', '');
        this.setState({isLoading: false});
        this.props.navigation.navigate('Login');
      }
    });
  }

  renderOnShowLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
          <Text style={{fontSize: 10, marginTop: 5}}>Loading data...</Text>
        </View>
      )
    }
  }

  onLookForWork = () => {
    const { navigate } = this.props.navigation;
    if (this.props.navigation.state.params) {
      navigate('ProfileSetup', {fullname: this.props.navigation.state.params.fullname});
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#625BBA', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{margin: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../Assets/attenderlogo.png')} style={{width: 160, height: 140, resizeMode: 'stretch'}}/>

        <View style={{marginVertical: 60}}>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity onPress={() => this.onLookForWork()}>
              <View style={{borderRadius: 5, backgroundColor: '#63c0de', padding: 10, paddingHorizontal: 10, width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: '#D9FFFF'}}>Looking for work</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={() => navigate('Hire')}>
              <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Looking to hire</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
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
