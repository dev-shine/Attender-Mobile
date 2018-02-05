
import ZText from 'ZText';
import ZTextInputWidth from 'ZTextInputWidth';


import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity, colors
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class AddingBankDetail extends Component {



  static navigationOptions = {

  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, padding: 10, backgroundColor: '#FFFFFF'}}>
        <ZText text="Add Bank Details" styles={{color: '#777777', fontSize: 17, textAlign: 'justify'}}/>

          <View>
            <ZTextInputWidth placeholder="Account Name" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
            <ZTextInputWidth placeholder="Bank Name" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
          </View>

          <View style={{borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 15}}>
                <ZTextInputWidth placeholder="BSB" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
              </View>
              <View style={{flex: 1}}>
                <ZTextInputWidth placeholder="Account Number" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
            </View>
          </View>

      </View>


          <View style={{position: 'relative'}}>
            <View style={{marginTop: 20, alignItems: 'center', position: 'absolute', right: 0}}>
            <TouchableOpacity onPress={() => navigate('')}>
              <View style={{borderRadius: 5, backgroundColor: '#65D9E6', padding: 5, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 13, fontWeight: '500', color: '#D9FFFF'}}>Save</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  }
});
