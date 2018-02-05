/**
 * @providesModule ZInput
 */
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';

export default class ZInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hidePassword: this.props.secureTextEntry
    }
  }

  onShowPassword = () => {
    if (this.state.hidePassword) {
      this.setState({hidePassword: false});
    } else {
      this.setState({hidePassword: true});
    }
  }

  renderEyeIcon = () => {
    if(this.props.eyeIcon){
      return (
        <TouchableOpacity onPress={()=>this.onShowPassword()}>
          <Icon name={this.props.eyeIcon} size={25} color="white" style={{marginLeft: 10}} />
        </TouchableOpacity>
      )
    }
  }

  renderTextInput = () => {
    if(this.props.icon){
      return (
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', paddingHorizontal: 5}}>{this.props.topPlaceholder}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', paddingHorizontal: 5, borderBottomWidth: 1, borderColor: 'white', marginBottom: 5, overflow: 'hidden'}}>
            <Icon name={this.props.icon} size={20} color={this.props.iconColor} style={{marginRight: 10}} />
            <TextInput autoCapitalize="none" underlineColorAndroid="transparent" selectionColor="white" autoCorrect={false} spellCheck={false} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placeholder} value={this.props.value} placeholderTextColor="#9895CF" style={[{fontSize: 14, color: 'white' , height: 40, width: 250}, this.props.textInputStyles]} onChangeText={this.props.onChangeText}/>
          </View>
        </View>
      )
    }else{
      if(this.props.eyeIcon){
        return (
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', paddingHorizontal: 5}}>{this.props.topPlaceholder}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', paddingHorizontal: 5, borderBottomWidth: 1, borderColor: 'white', marginBottom: 5, overflow: 'hidden'}}>
              <TextInput autoCapitalize="none" underlineColorAndroid="transparent" selectionColor="white" autoCorrect={false} spellCheck={false} secureTextEntry={this.state.hidePassword} placeholder={this.props.placeholder} value={this.props.value} placeholderTextColor="#9895CF" style={[{fontSize: 14, color: 'white' , height: 40, width: 300}, this.props.textInputStyles]} onChangeText={this.props.onChangeText}/>
              {this.renderEyeIcon()}
            </View>
          </View>
        )
      }else{
        return (
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', paddingHorizontal: 5}}>{this.props.topPlaceholder}</Text>
            <View style={{backgroundColor: 'transparent', paddingHorizontal: 5, borderBottomWidth: 1, borderColor: 'white', marginBottom: 5, overflow: 'hidden'}}>
              <TextInput autoCapitalize="none" underlineColorAndroid="transparent" selectionColor="white" autoCorrect={false} spellCheck={false} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placeholder} value={this.props.value} placeholderTextColor="#9895CF" style={[{fontSize: 14, color: 'white' , height: 40, width: 300}, this.props.textInputStyles]} onChangeText={this.props.onChangeText}/>
            </View>
          </View>
        )
      }

    }
  }

  render() {
    return (
      <View style={{marginTop: 5}}>
        {this.renderTextInput()}
      </View>
    );
  }

}
