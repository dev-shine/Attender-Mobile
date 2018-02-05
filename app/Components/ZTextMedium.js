/**
 * @providesModule ZTextMedium
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

export default class ZTextMedium extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'justify', color: '#FFFFFF', fontWeight: '300', fontSize: 17, marginTop: 20, backgroundColor: 'transparent'}, this.props.styles]} >{this.props.text}</Text>);
  }

  render() {
    return (
      <View>
        {this.renderTitle()}
      </View>
    );
  }

}
