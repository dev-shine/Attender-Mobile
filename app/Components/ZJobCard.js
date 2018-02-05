/**
 * @providesModule ZJobCard
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

export default class ZJobCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  renderAvatar = () => {
    return(
      <Image style={{width: 80, height: 110, resizeMode: 'stretch'}} source={{uri: 'https://pbs.twimg.com/profile_images/705373678511525888/g9wIUBNt.jpg'}}/>
    )
  }

  renderVenue = () => {
    return(<Text style={{fontSize: 18, color: '#33314B'}}>{this.props.venue}</Text>)
  }

  renderLocation = () => {
    return(<Text style={{fontSize: 16, color: '#363346', marginTop: 4}}><Image style={{width: 20, height: 20, marginTop: 5}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Media_Viewer_Icon_-_Location.svg/1000px-Media_Viewer_Icon_-_Location.svg.png'}}/> {this.props.location}</Text>)
  }
  renderJob = () => {
    return(<Text style={{fontSize: 14, color: '#78757E', marginVertical: 5}}>$6-8/Hr{this.props.job}</Text>)
  }
  renderDetails = () => {
    return(
      <View>
        <Text style={{fontSize: 14, color: '#78757E'}}> <Text style={{fontSize: 14, color: '#78757E'}}>{this.props.rsa}</Text></Text>
      </View>
    )
  }

  renderSkill = () => {
    if(this.props.skills){
      return (
        <View style={{flex: 1}}>
          <ZSliderCard>
            <Text style={{fontSize: 16, color: '#78757E', alignSelf: 'center', marginRight: 10}}>Position Needed :</Text>
            <ZIcon photoUrlSelected={require('../Assets/Bartendericon.png')} photoUrlUnSelected={require('../Assets/Bartendericonselected.png')} isSelected={false} small={true} />
            <ZIcon photoUrlSelected={require('../Assets/waitericon.png')} photoUrlUnSelected={require('../Assets/waitericonselected.png')} isSelected={false} small={true} />

          </ZSliderCard>
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
      return (<ZButtonOutline  name="I'm Interested"/>)
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
              {this.renderVenue()}
              {this.renderJob()}
              {this.renderDetails()}
              {this.renderLocation()}
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
