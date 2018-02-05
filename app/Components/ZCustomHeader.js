/**
 * @providesModule ZCustomHeader
 */
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class ZCustomHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 80
    }
  }

  renderSubLeftIcon = () => {
    if(this.props.SubleftIcon) {
      return(
        <TouchableOpacity onPress={this.props.onSubLeftIconPress}>
          <View style={{width: 36, height: 36, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
            <Icon name={this.props.SubleftIcon} size={30} color={this.props.subLeftIconColor} style={{backgroundColor: 'transparent'}}/>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderLeftIcon = () => {
    if(this.props.leftIcon) {
      return(
        <TouchableOpacity onPress={this.props.onLeftIconPress}>
          <View style={{backgroundColor: '#716F93', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
            <Icon name={this.props.leftIcon} size={25} color={this.props.leftIconColor} style={{backgroundColor: 'transparent'}}/>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderRightIcon = () => {
    if(this.props.rightIcon) {
      return(
        <TouchableOpacity onPress={this.props.onRightIconPress}>
          <View style={{backgroundColor: '#5F5FBA', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
            <Icon name={this.props.rightIcon} size={25} color={this.props.rightIconColor} style={{backgroundColor: 'transparent'}}/>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderSearchBar = () => {
    return (
      <Text style={[{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22}, this.props.titleStyle]} >{this.props.headerTitle}</Text>

    );
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: (this.props.headerBackground ? this.props.headerBackground : '#33314B'), height: 100, paddingTop: 20}}>
        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderSubLeftIcon()}
        </View>
        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderLeftIcon()}
          <Text style={{fontSize: 8, color: 'white'}}>{this.props.leftIconText}</Text>
        </View>
        <View style={{width: 230, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          {this.props.children}
        </View>
        <View style={{flex: 1,paddingRight: 10, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderRightIcon()}
          <Text style={{fontSize: 8, color: 'white'}}>{this.props.rightIconText}</Text>
        </View>
      </View>
    );
  }

}
