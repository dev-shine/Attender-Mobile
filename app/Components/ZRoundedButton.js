/**
 * @providesModule ZRoundedButton
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

export default class ZRoundedButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.isSelected
    }
  }

  onSelectVenue = () => {
    if(this.state.selected) {
      this.setState({selected: false});
      this.props.selectedButton(false);
    }else{
      this.setState({selected: true});
      this.props.selectedButton(true);
    }
  }

  renderButton = () => {
    if(this.props.normal) {
      return (
        <View style={[{height: 40, paddingHorizontal: 30, borderRadius: 20, backgroundColor: '#5F5FBA', alignItems: 'center', justifyContent: 'center'}, this.props.normalButtonStyle]}>
          <Text style={{fontSize: 12, fontWeight: '500', color: 'white'}}>{this.props.name}</Text>
        </View>
      )
    }else if (this.props.miniButton) {
      return (
        <View style={[{height: 35, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#5F5FBA', alignItems: 'center', justifyContent: 'center'}, this.props.normalButtonStyle]}>
          <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>{this.props.name}</Text>
        </View>
      )
    }
    else {
      if(this.state.selected){
        return (
          <View style={{height: (this.props.height || 40), paddingHorizontal: 30, borderRadius: 20, backgroundColor: (this.props.selectedColor), alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>{this.props.name}</Text>
          </View>
        )
      }else{
        return (
          <View style={{height: (this.props.height || 40), paddingHorizontal: 30, borderRadius: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#716D7B'}}>{this.props.name}</Text>
          </View>
        )
      }
    }


  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.normal ? this.props.onPress : ()=>this.onSelectVenue()} style={[{marginRight: 10}, this.props.styles]} disabled={this.props.disabled}>
        {this.renderButton()}
      </TouchableOpacity>
    );
  }

}
