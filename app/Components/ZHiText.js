/**
 * @providesModule ZHiText
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

export default class ZHiText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22}, this.props.styles]} >{this.props.text}</Text>);
  }

  render() {
    return (
      <View>
        {this.renderTitle()}
      </View>
    );
  }

}
