/**
 * @providesModule ZSubText
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

export default class ZSubText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: '#A8A5AE', fontWeight: 'bold', fontSize: 14}, this.props.styles]} >{this.props.text}</Text>);
  }

  render() {
    return (
      <View>
        {this.renderTitle()}
      </View>
    );
  }

}
