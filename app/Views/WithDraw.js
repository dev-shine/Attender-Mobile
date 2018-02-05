import ZText from 'ZText';

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

export default class Transfer extends Component {


  static navigationOptions = {
  //header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
        <ZText text="Withdraw" styles={{color: '#777777', fontSize: 15, marginBottom: 10, fontWeight: 'bold'}}/>
        <ZText text="$300" styles={{color: '#615AB9', fontSize: 35}}/>
        <ZText text="funds to your" styles={{color: '#737373', fontSize: 15}}/>
        <ZText text="National Australian Bank" styles={{color: '#625BA1', fontSize: 19, fontWeight: '600'}}/>
        <ZText text="with an account number of" styles={{color: '#737373', marginTop: 1, fontSize: 15}}/>
        <ZText text="XXXX X45 21" styles={{color: '#625BA1', fontSize: 17, fontWeight: '600'}}/>

        <View style={{marginTop: 60}}>
          <TouchableOpacity onPress={() => navigate('')}>
            <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF'}}>Confirm</Text>
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
