/**
 * @providesModule ZTextInputWidth
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

export default class ZTextInputWidth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderTextInput = () => {
    if(this.props.multiline) {
      return (
        <View>
          <Text style={{fontSize: 13, color: '#A8A5AE', marginBottom: 5}}>{this.props.placeholder}</Text>
          <View style={{backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE', padding: 5, paddingLeft: 10}}>
            <TextInput style={{height: 30, color: '#33314B'}} multiline={true} onChangeText={this.props.onChangeText}/>
          </View>
        </View>
      )
    }else{
      if (this.props.dollarSign) {
        return (
          <View>
            <Text style={{fontSize: 13, color: '#A8A5AE', marginBottom: 5}}>{this.props.placeholder}</Text>
            <View style={{backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE', padding: 5, paddingLeft: 20}}>
              <TextInput autoCorrect={false} spellCheck={false} underlineColorAndroid="transparent" style={{height: 30, color: '#33314B'}} onChangeText={this.props.onChangeText} value={this.props.value}/>
              <Text style={{position: 'absolute', top: 10, left: 5, fontSize: 16, color: '#A8A5AE'}}>$</Text>
            </View>
          </View>
        )
      } else if (this.props.nextPrev) {
        return (
          <View>
            <Text style={{fontSize: 13, color: '#A8A5AE', marginBottom: 5}}>{this.props.placeholder}</Text>
            <View style={{backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE', padding: 5, paddingLeft: 10}}>
              <TextInput editable={false} autoCorrect={false} spellCheck={false} underlineColorAndroid="transparent" style={{height: 30, color: '#33314B'}} onChangeText={this.props.onChangeText} value={this.props.value}/>
              <View style={{position: 'absolute', top: 3, right: 10}}>
                <TouchableOpacity onPress={this.props.onPressUp}>
                  <View>
                    <Icon name='ios-arrow-up' size={15} color='#625BBA'/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressDown}>
                  <View>
                    <Icon name='ios-arrow-down' size={15} color='#625BBA'/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      } else {
        return (
          <View>
            <Text style={{fontSize: 13, color: '#A8A5AE', marginBottom: 5}}>{this.props.placeholder}</Text>
            <View style={{backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE', padding: 5, paddingLeft: 10}}>
              <TextInput autoCorrect={false} spellCheck={false} underlineColorAndroid="transparent" style={{height: 30, color: '#33314B'}} onChangeText={this.props.onChangeText} value={this.props.value}/>
            </View>
          </View>
        )
      }
    }

  }

  render() {
    return (
      <View style={{marginTop: 10}}>
        {this.renderTextInput()}
      </View>
    );
  }

}
