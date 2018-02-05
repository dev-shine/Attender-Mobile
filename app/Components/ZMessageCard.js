/**
 * @providesModule ZMessageCard
 */

 import ZAvatar from 'ZAvatar';

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

export default class ZMessageCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  renderCheckIcon = () => {
    if(this.props.isChecked) {
      if(this.props.seen){
        return (
          <View>
            <Image style={{width: 16, height: 16, borderRadius: 8}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbtYShJYGSHeYUfLK7CWNkBEInSJULkcwUCoEgG25Tmnqo6oh'}}/>
          </View>
        )
      }else{
        return (
          <View>
            <Icon name="ios-checkmark-circle" size={20} color="#60BB77" />
          </View>
        )
      }


    }else{
      return (
        <View>
          <Icon name="ios-checkmark-circle-outline" size={20} />
        </View>
      )
    }

  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#E9E9E9', paddingHorizontal: 20, paddingVertical: 5}}>
        <ZAvatar source={this.props.avatar} styles={{marginLeft: -8}} hideIndicator={true} />
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#33314B', marginVertical: 2}}>{this.props.fullname}</Text>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#B6B3BB'}} numberOfLines={1}>{this.props.venue}</Text>
          <Text style={{fontSize: 13, fontWeight: '100', color: '#33314B'}} numberOfLines={1} ellipsizeMode="tail">{this.props.previewMessage}</Text>
        </View>
        <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text style={{fontSize: 12, fontWeight: 'normal', color: '#B6B3BB', marginVertical: 5}}>{this.props.dataTime}</Text>
          {this.renderCheckIcon()}
        </View>
      </View>
    );
  }

}
