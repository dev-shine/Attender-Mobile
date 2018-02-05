/**
 * @providesModule ZText
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

export default class ZText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: '#33314B', fontWeight: '500', fontSize: 20}, this.props.styles]} >{this.props.text}</Text>);
  }

  render() {
    return (
      <View>
        {this.renderTitle()}
      </View>
    );
  }

}
