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

export default class Sent extends Component {

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
  header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center'}}>

        <View>
          <Icon name="ios-checkmark-outline" size={180} color="#5FDAEB" style={{backgroundColor: 'transparent'}} />
        </View>

        <ZText text="Sent!" styles={{color: '#747474', fontSize: 20, marginBottom: 30, fontWeight: 'bold'}}/>
        <ZTextMedium text="Your request to transfer $300 to" styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>
        <ZTextMedium text="Andrew Orsen was successful." styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>

        <View style={{marginTop: 25}}>

          <TouchableOpacity onPress={() => navigate('')}>
            <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 65, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>OK</Text>
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
