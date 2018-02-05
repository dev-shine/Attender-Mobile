/**
 * @providesModule ZModal
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal
} from 'react-native';

export default class ZModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
        <Modal animationType={"fade"} transparent={true} visible={this.props.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
          {this.props.children}
          <View style={{flex: 1, position: 'absolute', right: 0, width: 0, left: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.7}}>
          </View>
        </Modal>
    );
  }

}
