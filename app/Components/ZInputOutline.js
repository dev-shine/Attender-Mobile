/**
 * @providesModule ZInputOutline
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

export default class ZInputOutline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.isSelected
    }
  }

  renderIcon = () => {
    if(this.props.icon){
      return(
        <Icon name={this.props.icon} size={50} color={this.props.iconColor} style={{backgroundColor: 'transparent', marginHorizontal: 10, marginTop: 3}} />
      )
    }
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 5}}>
        <TextInput style={{fontSize: 14, color: 'black' , height: 30, width: 250}}/>
      </View>
    );
  }

}
