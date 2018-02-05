
import ZText from 'ZText';
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
  TouchableOpacity, colors
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class WithDrawingFunds extends Component {

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
      <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>

        <View>
          <Icon name="ios-checkmark-outline" size={180} color="#63DBE8" style={{backgroundColor: 'transparent'}} />
        </View>

        <ZTextMedium text="Your have successful withdrawn" styles={{color: '#7C7C7C', fontWeight: '400', fontSize: 15}}/>
        <ZTextMedium text="funds to your bank account" styles={{color: '#7C7C7C', marginTop: 1, fontSize: 15, fontWeight: '400'}}/>

        <View style={{marginTop: 25}}>
          <TouchableOpacity onPress={() => navigate('')}>
            <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 65, height: 30, borderRadius: 30}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF', textAlign: 'center'}}>OK</Text>
            </View>
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
  }
});
