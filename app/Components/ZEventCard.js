/**
 * @providesModule ZEventCard
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

export default class ZEventCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  renderAvatar = () => {
    if (this.props.image) {
      return(
        <Image style={{width: 100, height: 100}} source={{uri: this.props.image }}/>
      )
    }else {
      return(
        <Image style={{width: 100, height: 100}} source={{uri: 'https://www.uratex.com.ph/wp-content/themes/uratex-custom/img/placeholder.jpg'}}/>
      )
    }
  }

  renderName = () => {
    if (this.props.interested) {
      return(<Text style={{fontSize: 18, color: '#33314B'}}>{this.props.event}</Text>)
    }
  }

  renderNameCalendar = () => {
    if (!this.props.interested) {
      return(<Text style={{fontSize: 15, color: '#33314B'}}>{this.props.event}</Text>)
    }
  }

  renderLocation = () => {
    return(<Text style={{fontSize: 13, color: '#363346'}}> <Image style={{width: 11, height: 14}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Media_Viewer_Icon_-_Location.svg/1000px-Media_Viewer_Icon_-_Location.svg.png'}}/> {this.props.location}</Text>)
  }
  renderDetails = () => {
    return(
      <View>
        <Text style={{fontSize: 12, marginVertical: 5, color: '#8F8F8F', fontWeight: '400', paddingVertical: 3}}>{this.props.type}</Text>
        <Text style={{fontSize: 11, color: '#8F8F8F'}}>{this.props.job}  <Text style={{fontSize: 11, color: '#8F8F8F'}}>{this.props.jobType}</Text></Text>
        <Text style={{fontSize: 11, color: '#8F8F8F', paddingVertical: 3}}>Venue: <Text style={{fontSize: 11, color: '#78757E', paddingVertical: 3}}>{this.props.rsa}</Text></Text>
      </View>
    )
  }

  renderSkill = () => {
    if(this.props.skills){
      return (
        <View style={{flex: 1}}>
          <ZSliderCard>
            <Text style={{fontSize: 16, color: '#78757E', alignSelf: 'center', marginRight: 10}}>Position Needed :</Text>
            <ZIcon photoUrlSelected={require('../Assets/Bartendericon.png')} photoUrlUnSelected={require('../Assets/Bartendericon.png')} isSelected={false} small={true} selectedIcon={this.props.onPressEvent} />
            <ZIcon photoUrlSelected={require('../Assets/waitericon.png')} photoUrlUnSelected={require('../Assets/waitericon.png')} isSelected={false} small={true} selectedIcon={this.props.onPressEvent} />
          </ZSliderCard>
        </View>
      )
    }

  }

  renderInterestedButton = () => {
    if (this.props.interested) {
      if (this.props.isInterested) {
        return (<ZButtonOutline name="I'm Interested" onPress={this.props.onPressInterested} styles={{backgroundColor: '#5F5FBA'}} textStyles={{color: 'white'}} />)
      } else {
        return (<ZButtonOutline name="I'm Interested" onPress={this.props.onPressInterested} />)
      }
    }
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, marginVertical: 10}}>{this.renderNameCalendar()}</View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            {this.renderAvatar()}
          </View>

          <View style={{flex: 1}}>
            {this.renderName()}
            {this.renderDetails()}
            {this.renderLocation()}
          </View>
        </View>

        <View style={{borderTopWidth: 1, borderColor: '#E9E9E9', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderSkill()}
          {this.renderInterestedButton()}
        </View>
        <View style={{position: 'absolute', right: -5}}>
          <Text style={{fontSize: 18, color: '#33314B', fontWeight: '500'}}>{this.props.rate}</Text>
        </View>

      </View>
    );
  }

}
