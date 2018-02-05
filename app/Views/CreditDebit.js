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
import ZTextInputWidth from 'ZTextInputWidth';
import ZHiText from 'ZHiText';
import ZInputOutline from 'ZInputOutline';
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

export default class CreditDebit extends Component {



  static navigationOptions = {
    title: 'Credit Debit'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={{flex: 1, padding: 30, backgroundColor: '#FFFFFF'}}>
          <View style={{marginBottom: 20}}>
            <ZTextMedium text="Add Credit/Debit Card" styles={{color: '#787878', fontSize: 17, fontWeight: '500'}}/>
            <Text style={{color:'#787878', fontSize: 10, marginTop: 5}}>This connection is secure</Text>
          </View>

          <View style={{flexDirection: 'row'}}>

            <TouchableOpacity>
              <Image source={require('../Assets/Visaicon.png')} style={{width: 60, height: 50, resizeMode: 'stretch'}}/>
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={require('../Assets/master.png')} style={{width: 50, height: 50, resizeMode: 'stretch', marginHorizontal: 40}}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <Image source={require('../Assets/Expressicon.png')} style={{width: 50, height: 50, resizeMode: 'stretch'}}/>
            </TouchableOpacity>

          </View>

            <View style={{marginBottom: 5, marginTop: 20}}>

              <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 5}}>
                  <TextInput placeholder="Name on the Card" style={{fontSize: 14, color: 'black' , height: 30}}/>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 5}}>
                  <TextInput placeholder="Credit/Debit Card Number" style={{fontSize: 14, color: 'black' , height: 30}}/>
                </View>
              </View>

            </View>


            <View style={{flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingBottom: 15}}>

              <View style={{flex: 1, marginRight: 5}}>
                <Text style={{color: '#A8A5AE', paddingBottom: 5}}>Month/Year</Text>
                <TextInput style={{height: 40, backgroundColor: '#FAFAFA', padding: 10}} />
              </View>

              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{color: '#A8A5AE', paddingBottom: 5}}>CVV</Text>
                <TextInput style={{height: 40, backgroundColor: '#FAFAFA', padding: 10}} />
              </View>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>

              <View style={{flex: 1, marginTop: 12}}>
                <ZTextMedium text="Add another Card" styles={{color: '#787878', fontSize: 12}} />
              </View>

              <View style={{flex: 1, marginTop: 30, marginLeft: 15}}>
                <TouchableOpacity>
                  <Image source={require('../Assets/plusicon.png')} style={{resizeMode: 'stretch', width: 20, height: 20}}/>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigate('')}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, marginTop: 20, paddingHorizontal: 10, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF'}}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>

            <ZTextMedium text="Payment Method" styles={{color: '#787878', fontSize: 14, fontWeight: 'bold', marginTop: 50, marginBottom: 20}}/>

            <View style={{marginTop: 10, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
            </View>

            <ZInputOutline />
            <ZInputOutline />

        </View>

      </ScrollView>
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
