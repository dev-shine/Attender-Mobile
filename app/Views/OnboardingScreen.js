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
  TouchableOpacity, colors
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class OnboardingScreen extends Component {


  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#625BBA'}}>
      <ScrollView>
        <View style={{marginTop: 60, justifyContent: 'center', alignItems: 'center'}}>

          <View>
            <TouchableOpacity onPress={() => navigate('AddingBankDetail')}>
              <View style={{borderRadius: 5, backgroundColor: '#63c0de', padding: 10, paddingHorizontal: 10, width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: '#D9FFFF'}}>AddingBankDetail</Text>
              </View>
            </TouchableOpacity>
          </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('AccountConfirmed')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>AccountConfirmed</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('AppSettings')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>AppSettings</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Earnings')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Earnings</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('ConfirmationSent')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>ConfirmationSent</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('CreditDebit')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>CreditDebit</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Hire')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Hire</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Home</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Looking')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Looking</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('PaymentSettings')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>PaymentSettings</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('PrivacyPolicy')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>PrivacyPolicy</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Sent')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Sent</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Services')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Services</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Settings')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('TermsAgreement')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>TermsAgreement</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('Transfer')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Transfer</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('TransferMoney')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>TransferMoney</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('TrialPeriod')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>TrialPeriod</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('WithDraw')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>WithDraw</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('WithdrawFunds')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>WithdrawFunds</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => navigate('WithDrawingFunds')}>
                <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>WithDrawingFunds</Text>
                </View>
              </TouchableOpacity>
            </View>
            
          </View>
        </ScrollView>
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
