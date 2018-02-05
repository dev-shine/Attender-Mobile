/**
 * @providesModule ZHero
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

export default class ZHero extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 22}, this.props.styles]} >{this.props.text}</Text>);
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        {this.renderTitle()}
      </View>
    );
  }

}
