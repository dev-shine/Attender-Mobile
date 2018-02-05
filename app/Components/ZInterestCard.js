/**
 * @providesModule ZInterestCard
 */

import Icon from 'react-native-vector-icons/Ionicons';
import NRater from 'NRater';
import ZSliderCard from 'ZSliderCard';
import ZButtonOutline from 'ZButtonOutline';
import ZIcon from 'ZIcon';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export default class ZInterestCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  renderAvatar = () => {
    return(
      <Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbtYShJYGSHeYUfLK7CWNkBEInSJULkcwUCoEgG25Tmnqo6oh'}}/>
    )
  }

  renderName = () => {
    return(<Text style={{fontSize: 18, color: '#33314B'}}>{this.props.fullname}</Text>)
  }

  renderDetails = () => {
    return(
      <View>
        <Text style={{fontSize: 14, marginVertical: 5}}>{this.props.job} | <Text style={{fontSize: 14, color: '#78757E'}}>{this.props.jobType}</Text></Text>
        <Text style={{fontSize: 14}}>RSA | <Text style={{fontSize: 14, color: '#78757E'}}>{this.props.rsa}</Text></Text>
      </View>
    )
  }

  renderSkill = () => {
    if(this.props.skills){
      return (
        <View style={{flex: 1}}>
          <ZSliderCard>
            <Text style={{fontSize: 16, color: '#78757E', alignSelf: 'center', marginRight: 10}}>Skills</Text>
            <ZIcon photoUrlSelected={require('../Assets/languageiconselected.png')} photoUrlUnSelected={require('../Assets/languageicon.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/cardidicon.png')} photoUrlUnSelected={require('../Assets/cardidicon.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')} photoUrlUnSelected={require('../Assets/Certificatesicon.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/cardvideoicon.png')} photoUrlUnSelected={require('../Assets/cardvideoicon.png')} isSelected={false} small={true} />

          </ZSliderCard>
        </View>
      )
    }else {
      return (
        <View style={{flex: 1}}>
          <ZButtonOutline name="Skills" styles={{width: 70}}/>
        </View>
      )
    }

  }

  renderExp = () => {
    if(this.props.exp) {
      return (
        <View style={{flex: 1}}>
          <ZSliderCard>
            <Text style={{fontSize: 16, color: '#78757E', alignSelf: 'center', marginRight: 10}}>Experience</Text>
            <ZIcon photoUrlSelected={require('../Assets/coctailiconselected.png')} photoUrlUnSelected={require('../Assets/coctailicon.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/cardbookicon.png')} photoUrlUnSelected={require('../Assets/cardbookicon.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/cardchaticon.png')} photoUrlUnSelected={require('../Assets/cardchaticon.png')} isSelected={false} small={true} />

          </ZSliderCard>
        </View>
      )
    }else{
      return (<ZButtonOutline  name="Experienced"/>)
    }

  }

  render() {
    return (
      <View style={{}}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
              {this.renderAvatar()}
            </View>

            <View style={{flex: 1}}>
              {this.renderName()}
              <NRater />
              {this.renderDetails()}
            </View>
          </View>
        </TouchableOpacity>

        <View style={{borderTopWidth: 1, borderColor: '#E9E9E9', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderSkill()}
          {this.renderExp()}
        </View>
        <View style={{position: 'absolute', right: -5}}>
          <Text style={{fontSize: 18, color: '#33314B', fontWeight: '500'}}>{this.props.rate}</Text>
        </View>

      </View>
    );
  }

}
