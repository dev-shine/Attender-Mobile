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
  TouchableOpacity, colors, Switch
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class AppSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static navigationOptions = {
    title: 'AppSettings'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>

        <ZMuteText text="App Settings" styles={{textAlign: 'left', marginVertical: 10}}/>
          <View style={{flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 10, paddingBottom: 5}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, marginTop: 5}}>Push Notifications</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>

          <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 5, borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingBottom: 2}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15,marginTop: 5, marginBottom: 10}}>Use my Location</Text>
            </View>
            <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.falseSwitchIsOn} />
          </View>

          <View>
            <ZMuteText text="About the App" styles={{textAlign: 'left', marginTop: 40}}/>
              <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => navigate('PrivacyPolicy')}>
                      <View style={{flex: 1}}><Text style={{fontSize: 15, marginTop: 10, marginBottom: 10}}>Privacy Policy</Text></View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}><Image source={require('../Assets/righticoncalendar.png')} style={{width: 20, height: 20, marginTop: 10, resizeMode: 'stretch'}}/></View>
                    </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => navigate('TermsAgreement',{termsCondition: this.props.termsCondition})}>
                      <View style={{flex: 1}}><Text style={{fontSize: 15, marginTop: 10, marginBottom: 10}}>Terms and Conditions</Text></View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}><Image source={require('../Assets/righticoncalendar.png')} style={{width: 20, height: 20, marginTop: 10, resizeMode: 'stretch'}}/></View>
                    </TouchableOpacity>
              </View>
          </View>

          <View style={{justifyContent: 'flex-end', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginTop: 120}}>
            <TouchableOpacity>
              <Text style={{color: '#AF000C', fontSize: 15}}>Delete Account</Text>
            </TouchableOpacity>
          </View>

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
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});
