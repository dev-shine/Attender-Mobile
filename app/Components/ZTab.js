/**
 * @providesModule ZTab
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class ZTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        padding: 5,
        borderTopWidth: 0.5,
        borderColor: '#E9E9E9'
      }}>
        {this.props.children}
      </View>
    );
  }

}
