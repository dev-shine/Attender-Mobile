import ZTextInput from 'ZTextInput';
import ZText from 'ZText';
import ZTextInputWidth from 'ZTextInputWidth';


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

export default class AddBankDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password'
    }
  }

  static navigationOptions = {
  //header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10}}>

        <View style={{marginTop: 30}}>

          <View style={{marginBottom: 10}}>
            <ZText text="Withdraw Funds" styles={{color: '#747474', fontSize: 16, textAlign: 'justify', fontWeight: '600'}}/>
            <ZText text="Available Balance:" styles={{color: '#747474', fontSize: 13, marginTop: 20, textAlign: 'justify'}}/>
          </View>

          <View style={{paddingBottom: 30, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
            <ZTextInputWidth placeholder="Withdrawal Amount" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
            <ZTextInputWidth placeholder="Withdraw to Bank Account" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
          </View>


            <View style={{flex: 1, marginTop: 15, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigate('')}>
                <View style={{borderRadius: 5, backgroundColor: '#5FDAE7', padding: 5, paddingHorizontal: 10, width: 110, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Withdraw</Text>
                </View>
              </TouchableOpacity>
            </View>


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
  }
});
