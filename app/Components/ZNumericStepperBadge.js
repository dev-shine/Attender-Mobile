/**
 * @providesModule ZNumericStepperBadge
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

export default class ZNumericStepperBadge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }


  increment = () => {
    var incValue = this.state.value;
    incValue++;
    if (this.props.monthlyRateLimit) {
      if (incValue <= 10) {
        this.setState({value: incValue});
        this.props.onChangeValue(incValue);
      }
    } else {
      this.setState({value: incValue});
      this.props.onChangeValue(incValue);
    }
  }

  decrement = () => {
    var decValue = this.state.value;
    if (decValue >= 1) {
      decValue--;
      this.setState({value: decValue});
      this.props.onChangeValue(decValue);
    }
  }

  renderBody = () => {
    if (this.props.size) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=> this.decrement()}>
            <View style={{width: 20, height: 20, borderRadius: 15, borderWidth: 1.5, borderColor: '#D5D4D9', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="md-remove" size={12} color='black' />
            </View>
          </TouchableOpacity>

        <View style={{width: (this.props.size), height: (this.props.size), borderRadius: (this.props.size / 2), backgroundColor: '#64DAE7', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
          <Text style={{fontSize: 14, color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>{this.state.value}</Text>
        </View>

        <TouchableOpacity onPress={()=> this.increment()}>
          <View style={{width: 20, height: 20, borderRadius: 15, borderWidth: 1.5, borderColor: '#D5D4D9', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="md-add" size={12} color='black' />
          </View>
        </TouchableOpacity>
      </View>
      )
    } else {
      return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={()=> this.decrement()}>
          <View style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: '#D5D4D9', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="md-remove" size={15} color='black' />
          </View>
        </TouchableOpacity>

        <View style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#64DAE7', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15}}>
          <Text style={{fontSize: 24, color: 'white', alignSelf: 'center', fontWeight: 'bold'}}>{this.state.value}</Text>
        </View>

          <TouchableOpacity onPress={()=> this.increment()}>
            <View style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: '#D5D4D9', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="md-add" size={15} color='black' />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        {this.renderBody()}
      </View>
    );
  }

}
