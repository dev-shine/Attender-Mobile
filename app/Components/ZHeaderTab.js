/**
 * @providesModule ZHeaderTab
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class ZHeaderTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderLeftIcon = () => {
    if(this.props.leftIcon) {
      return(
        <TouchableOpacity onPress={this.props.leftIconPress}>
          <View style={{backgroundColor: 'transparent', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
            <Icon name={this.props.leftIcon} size={30} color={this.props.leftIconColor} style={{backgroundColor: 'transparent'}}/>
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#33314B', height: 100, paddingTop: 38}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {this.renderLeftIcon()}
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.props.children}
        </View>
      </View>
    );
  }

}
