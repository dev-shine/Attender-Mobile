
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

export default class Loking extends Component {

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
    title: 'Services',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

        <View style={{flexDirection: 'row'}}>

          <TouchableOpacity>
            <Image source={require('../Assets/alcoholiconselected.png')} style={{width: 55, height: 50, marginRight: 10, resizeMode: 'stretch'}}/>
            <Text style={{marginRight: 10, textAlign: 'justify', color: '#5E5CBD', fontWeight: '500'}}>Alcohol</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Assets/pubiconselected.png')} style={{width: 55, height: 50, marginLeft: 5, resizeMode: 'stretch'}}/>
            <Text style={{marginLeft: 10, color: '#5E5CBD', fontWeight: '500'}}>Drinks</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Assets/coctailiconselected.png')} style={{width: 55, height: 50, marginLeft: 10, resizeMode: 'stretch'}}/>
            <Text style={{marginLeft: 10, color: '#5E5CBD', fontWeight: '500'}}>Cocktails</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Assets/drinkiconselected.png')} style={{width: 55, height: 50, resizeMode: 'stretch', marginLeft: 10}}/>
            <Text style={{color: '#5E5CBD', fontWeight: '500', marginLeft: 15}}>Lunch</Text>
          </TouchableOpacity>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableOpacity>
            <Image source={require('../Assets/menuiconselected.png')} style={{width: 55, height: 50, marginRight: 10, resizeMode: 'stretch'}}/>
            <Text style={{color: '#5E5CBD', fontWeight: '500', marginLeft: 10}}>Food</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <TouchableOpacity>
            <Image source={require('../Assets/foodiconselected.png')} style={{width: 55, height: 50, resizeMode: 'stretch', marginLeft: 10}}/>
            <Text style={{marginLeft: 10, color: '#5E5CBD', fontWeight: '500'}}>Breakfast</Text>
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
