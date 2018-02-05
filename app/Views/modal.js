
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from 'react-native-modal-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, TextInput, Image, StyleSheet } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

export default class modal extends Component {
  constructor(props) {
  super(props);
  this.state = {
    Services: ''
  }
}


  static navigationOptions = {
    header: null,
  };


  render() {
    const { navigate } = this.props.navigation;
    const data = [
      {key: 0, label: 'Full Time'},
      {key: 1, label: 'Freenlance'},
      {key: 2, label: 'Alcohol'},
    ];
    const data2 = [
      {key: 0, label: 'Citizen'},
    ]
    return (
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <ModalPicker data={data} onChange={(option)=>{ this.setState({Services:option.label})}}>
            <View style={{width: 150, flexDirection: 'row', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 15}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#BABABA', flex: 1}}>Services</Text>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </View>
          </ModalPicker>
          <View style={{width: 140, flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10, opacity:(this.state.Services == '' ? 0 : 1)}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#939199', flex: 1}}>{this.state.Services}</Text>
            <TouchableOpacity onPress={()=>this.setState({Services: ''})}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modal: {
    height: 0,
    width: 0,
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor: '#ededed',
    justifyContent: 'center',
  }
});
