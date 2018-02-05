/**
 * @providesModule ZFullHeader
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

export default class ZFullHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 80
    }
  }

  renderLeftIcon = () => {
    if(this.props.leftIcon) {
      return(
        <TouchableOpacity onPress={this.props.leftIconPress}>
          <Icon name={this.props.leftIcon} size={35} color={this.props.leftIconColor}/>
        </TouchableOpacity>
      );
    }
  }

  renderRightText = () => {
    if (this.props.enableRight) {
      if(this.props.rightText) {
        return(
          <TouchableOpacity onPress={this.props.rightTextPress}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 14, marginTop: 10}}>{this.props.rightText}</Text>
          </TouchableOpacity>
        );
      }
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 22}, this.props.titleStyle]} >{this.props.headerTitle}</Text>);
  }

  renderSubTitle = () => {
    if(this.props.subTitle) {
      return (<Text style={[{textAlign: 'center', color: 'white', fontSize: 14, marginTop: 10}, this.props.subStyles]} >{this.props.subTitle}</Text>);
    }
  }


  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#33314B', height: 200, width: '100%'}}>
        <View>
          {this.renderTitle()}
          <View style={{width: 300}}>
            {this.renderSubTitle()}
          </View>
        </View>
        <View style={{position: 'absolute', left: 10, top: 20}}>
          {this.renderLeftIcon()}
        </View>
        <View style={{position: 'absolute', right: 10, top: 23}}>
          {this.renderRightText()}
        </View>
      </View>
    );
  }

}
