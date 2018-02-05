/**
 * @providesModule ZAvatar
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

export default class ZAvatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderIndicator = () => {
    if(this.props.hideIndicator) {

    }else {
      return (
        <View style={{position: 'absolute', top: 0, right: 5, backgroundColor: 'white', width: 14, height: 14, borderRadius: 14, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 9, fontWeight: '500', color:'#797582', backgroundColor: 'transparent'}}>{this.props.text}</Text>
        </View>
      )

    }
  }

  renderAvatar = () => {
    if (this.props.source) {
      return(
        <View style={{margin: 5, marginHorizontal: 8}}>
          <Image style={{width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'white'}} source={{uri: this.props.source}}/>
          {this.renderIndicator()}
        </View>
      )
    }else if (this.props.largeAvatar) {
      return(
        <View style={{margin: 5, marginHorizontal: 8}}>
          <Image style={{width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: 'white'}} source={{uri: this.props.largeAvatar}}/>
          {this.renderIndicator()}
        </View>
      )
    }else if(this.props.small) {
      return(
        <View style={{margin: 5, marginHorizontal: 8}}>
          <Image style={{width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'white'}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbtYShJYGSHeYUfLK7CWNkBEInSJULkcwUCoEgG25Tmnqo6oh'}}/>
          {this.renderIndicator()}
        </View>
      )
    }else {
      return(
        <View>
          <Image style={{width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: 'white'}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbtYShJYGSHeYUfLK7CWNkBEInSJULkcwUCoEgG25Tmnqo6oh'}}/>
          <Icon name="ios-radio-button-on-outline" size={16} color="#D5D4D9" style={{position: 'absolute', top: 0, right: 10, backgroundColor: 'transparent'}} />
        </View>
      )
    }
  }

  renderAvatarName = () => {
    if(this.props.avatarName) {
      return (
        <Text style={{fontSize: 12, color:"#716D7B"}}>{this.props.avatarName}</Text>
      )
    }
  }

  render() {
    return (
      <View style={[{justifyContent: 'center', alignItems: 'center'}, this.props.styles]}>
        {this.renderAvatar()}
        {this.renderAvatarName()}
      </View>
    );
  }

}
