/**
 * @providesModule NRater
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

export default class NRater extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderRating = () => {
    var rating = [];
    for (var i = 0; i < 5; i++) {
    rating.push(<View key={i} style={{height: 20, width: 20 }}><Icon style={{color: '#FFC000'}} size={20} name="ios-star" style={{color: '#F54763'}} /></View>)
    }
    return (<View style={{flexDirection: 'row'}}>{rating}</View>)
  }

  render() {
    return (
      <View>
        {this.renderRating()}
      </View>
    );
  }

}
