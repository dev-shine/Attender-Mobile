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
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class AccountConfirmed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white'}}></Text>
  };

  componentDidMount() {
    // alert(JSON.stringify(this.props.navigation.state.params));
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#63c0de', alignItems: 'center', justifyContent: 'center'}}>

        <View>
          <Icon name="ios-checkmark-outline" size={180} color="white" style={{backgroundColor: 'transparent'}} />
        </View>

        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Account Confirmed</Text>

        <View style={{alignItems: 'center', margin: 30}}>
          <Text style={{color: 'white'}}>Thank you for confirming your account,</Text>
          <Text style={{color: 'white'}}>click Continue to finalise your Attender</Text>
          <Text style={{color: 'white'}}>profile.</Text>
        </View>

        <TouchableOpacity onPress={() => navigate('Looking', {fullname: this.props.navigation.state.params.fullname})}>
          <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, margin: 20, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 150, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#D9FFFF'}}>Continue</Text>
          </View>
        </TouchableOpacity>

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
