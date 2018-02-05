/**
 * @providesModule ZTextInput
 */
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class ZTextInput extends Component {

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
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>{this.props.placeholder}</Text>
          <View style={{borderRadius: (this.props.radius ? 5 : 0), backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}}>
            <TextInput defaultValue={this.props.defaultValue} underlineColorAndroid="transparent" editable={this.props.editable} maxLength={this.props.maxLength} returnKeyType={this.props.returnKeyType} value={this.props.value} autoCorrect={false} spellCheck={false} style={{height: 120, color: '#33314B', fontSize: 15}} multiline={true} onChangeText={this.props.onChangeText} onSubmitEditing={this.props.onSubmitEditing}/>
          </View>
        </View>
      )
    }else{
      if (this.props.onPress) {
        return (
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>{this.props.placeholder}</Text>
            <View style={[{borderRadius: (this.props.radius ? 5 : 0), backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}, this.props.containerStyle]}>
              <TextInput defaultValue={this.props.defaultValue} underlineColorAndroid="transparent" placeholder={this.props.placeholderInside} editable={this.props.editable} returnKeyType={this.props.returnKeyType} value={this.props.value} autoCorrect={false} spellCheck={false} style={{height: 40, color: '#33314B'}} onChangeText={this.props.onChangeText} onSubmitEditing={this.props.onSubmitEditing}/>
            </View>
          </TouchableOpacity>
        )
      }else {
        if (this.props.location) {
          return (
            <View>
              <View style={[{borderRadius: (this.props.radius ? 5 : 0), backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}, this.props.containerStyle]}>
                <TextInput defaultValue={this.props.defaultValue} underlineColorAndroid="transparent" placeholder={this.props.placeholderInside} editable={this.props.editable} returnKeyType={this.props.returnKeyType} value={this.props.value} autoCorrect={false} spellCheck={false} style={{textAlign: 'center', fontSize: 14, fontWeight: 'normal', color: '#33314B'}} onChangeText={this.props.onChangeText} onSubmitEditing={this.props.onSubmitEditing}/>
              </View>
            </View>
          )
        }else {
          return (
            <View>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>{this.props.placeholder}</Text>
              <View style={[{borderRadius: (this.props.radius ? 5 : 0), backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}, this.props.containerStyle]}>
                <TextInput defaultValue={this.props.defaultValue} underlineColorAndroid="transparent" placeholder={this.props.placeholderInside} editable={this.props.editable} returnKeyType={this.props.returnKeyType} value={this.props.value} autoCorrect={false} spellCheck={false} style={{height: 40, color: '#33314B'}} onChangeText={this.props.onChangeText} onSubmitEditing={this.props.onSubmitEditing}/>
              </View>
            </View>
          )
        }
      }
    }

  }

  render() {
    return (
      <View style={[{marginTop: 15}, this.props.styles]}>
        {this.renderTextInput()}
      </View>
    );
  }

}
