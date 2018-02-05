/**
 * @providesModule ZHeader2
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

export default class ZHeader2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 80
    }
  }

  componentDidMount() {
    if(this.props.subTitle){
      if(this.props.footerText){
        this.setState({headerHeight: 250});
      }else {
        this.setState({headerHeight: 150});
      }

    } else {
      this.setState({headerHeight: 80});
    }
  }

  renderLeftIcon = () => {
    if(this.props.leftIcon) {
      return(
        <TouchableOpacity onPress={this.props.leftIconPress}>
          <Icon name={this.props.leftIcon} size={30} color={this.props.leftIconColor}/>
        </TouchableOpacity>
      );
    }
  }

  renderRightIcon = () => {
    if(this.props.rightIcon) {
      return(
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon name={this.props.rightIcon} size={30} color={this.props.rightIconColor} style={{textAlign: 'right', padding: 10}} />
        </TouchableOpacity>
      );
    }
  }

  renderRightText = () => {
    if(this.props.rightText) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{width: 60, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: -50, paddingRight: 10}}>
            <Text style={{textAlign: 'right', color: 'white', fontSize: 14, marginRight: 10}} >{this.props.rightText}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderTitle = () => {
    return (<Text style={[{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 22}, this.props.titleStyle]} >{this.props.headerTitle}</Text>);
  }

  renderSubTitle = () => {
    if(this.props.subTitle) {
      return (<Text style={[{textAlign: 'center', color: 'white', fontSize: 14, marginTop: 10}, this.props.subStyles]} >{this.props.subTitle}</Text>);
    }
  }

  renderFooterItem = () => {
    if(this.props.footerText){
      return (<Text style={[{textAlign: 'center', color: 'white', fontSize: 14, marginTop: 40, marginVertical: 20}, this.props.footerTextStyle]} >Looking for: <Text style={{color: '#7E7FDA'}}>{this.props.footerText}</Text></Text>);
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#33314B', height: this.state.headerHeight}}>
        <View style={{flex: 1, paddingLeft: 10}}>
          {this.renderLeftIcon()}
        </View>
        <View>
          {this.renderTitle()}
          <View style={{width: 280}}>
            {this.renderSubTitle()}
          </View>

        </View>
        <View style={{flex: 1}}>
          {this.renderRightIcon()}
          {this.renderRightText()}
        </View>
        <View style={{position: 'absolute', bottom: 10, right: 0, left: 0}}>
          {this.renderFooterItem()}
        </View>
      </View>
    );
  }

}
