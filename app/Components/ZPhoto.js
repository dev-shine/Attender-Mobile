/**
 * @providesModule ZPhoto
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

export default class ZPhoto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderPhoto = () => {
    return (<Image style={this.props.styles} source={{uri: this.props.imageUrl}}/>)
  }

  render() {
    return (
      <View>
        {this.renderPhoto()}
      </View>
    );
  }

}
