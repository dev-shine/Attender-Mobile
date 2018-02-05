
import ZText from 'ZText';
import ZTextMedium from 'ZTextMedium';
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

export default class TransferMoney extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10}}>

        <View style={{marginTop: 40}}>

          <ZText text="Transfer Money" styles={{color: '#777777', fontSize: 17, textAlign: 'justify'}}/>
          <ZTextMedium text="Bank Transfer" styles={{color: '#737373', marginTop: 1, fontSize: 15}}/>
          <ZTextMedium text="Add Account" styles={{color: '#737373', marginTop: 1, fontSize: 15}}/>

          <ZTextInputWidth placeholder="Amount" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
          <ZTextInputWidth placeholder="Transfer to:" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>
          <ZTextInputWidth placeholder="Bank" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}}/>

          <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderColor: '#A8AFB8', marginTop: 10}}>

            <View style={{flex: 1}}>
              <Text style={{color: '#A8A5AE', paddingBottom: 5}}>BSB</Text>
              <TextInput style={{height: 45, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} />
            </View>

            <View style={{flex: 1, marginLeft: 20}}>
              <Text style={{color: '#A8A5AE', paddingBottom: 5}}>Account Numbers</Text>
              <TextInput style={{height: 45, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} />
            </View>

          </View>


          <View style={{marginTop: 15, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigate('')}>
              <View style={{borderRadius: 5, backgroundColor: '#65D9E6', padding: 5, paddingHorizontal: 10, height: 35, width: 180, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 13, fontWeight: '500', color: '#D9FFFF'}}>Add Account and Send</Text>
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
