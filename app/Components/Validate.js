/**
 * @providesModule Validate
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

export default class Validate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderCheckIcon = () => {
    if(this.props.isValidated){
      return (
        <View style={{marginLeft: 5, paddingTop: (this.props.margin ? 30 : 0)}}>
          <Icon name="md-checkmark" size={25} color="#75CFD8" style={{backgroundColor: 'transparent'}} />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          {this.props.children}
        </View>
        {this.renderCheckIcon()}
      </View>
    );
  }

}
