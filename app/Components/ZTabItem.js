/**
 * @providesModule ZTabItem
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

export default class ZTabItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  onSelectTabItem = () => {
    if(this.props.onPress) {
      if(this.state.selected) {
        this.setState({selected: false});
      }else{
        this.setState({selected: true});
      }
    }
  }

  renderTabItem = () => {
    if(this.props.selected) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={this.props.name} size={25} color="#5F5FBA" style={{backgroundColor: 'transparent'}} />
            <Text style={{fontSize: 10, color: '#5F5FBA'}}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={this.props.name} size={25} color="#78757E" style={{backgroundColor: 'transparent'}} />
            <Text style={{fontSize: 10, color: '#78757E'}}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderTabItem()}
      </View>
    );
  }

}
