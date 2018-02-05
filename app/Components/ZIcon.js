/**
 * @providesModule ZIcon
 */

import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

export default class ZIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.isSelected
    }
  }

  onSelectVenue = () => {
    if(this.state.selected) {
      this.setState({selected: false});
      if(this.props.selectedIcon){
        this.props.selectedIcon(false);
      }
    }else{
      this.setState({selected: true});
      if(this.props.selectedIcon){
        this.props.selectedIcon(true);
      }
    }
  }

  // renderIonicons = () => {
  //   if(this.props.icon){
  //     return (
  //       <Icon name={this.props.name} size={15} color='white' />
  //     )
  //   }
  // }
  //
  renderImage = () => {
    if (this.props.size) {
      if(this.state.selected){
        return(
          <Image source={this.props.photoUrlSelected} resizeMode="contain" style={{width: (this.props.size), height: (this.props.size)}} />
        )
      }else{
        return(
          <Image source={this.props.photoUrlUnSelected} resizeMode="contain" style={{width: (this.props.size), height: (this.props.size)}} />
        )
      }
    }
    if(this.props.small){
      if(this.state.selected){
        return(
          <Image source={this.props.photoUrlSelected} resizeMode="contain" style={{width: 35, height: 35}} />
        )
      }else{
        return(
          <Image source={this.props.photoUrlUnSelected} resizeMode="contain" style={{width: 35, height: 35}} />
        )
      }
    }else{
      if(this.props.badge){
        if(this.state.selected){
          return (
            <View style={{width: 50, height: 50, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={this.props.photoUrlSelected} resizeMode="contain" style={{width: 50, height: 50}} />
              <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#5F5FBA', width: 15, height: 15, borderRadius: 10, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 9, fontWeight: '500', color:'white', backgroundColor: 'transparent'}}>{this.props.badge}</Text>
              </View>
            </View>
          )
        }else{
          return (
            <View style={{width: 50, height: 50, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={this.props.photoUrlUnSelected} resizeMode="contain" style={{width: 50, height: 50}} />
              <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#A8A5AE', width: 15, height: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 9, fontWeight: '500', color:'white', backgroundColor: 'transparent'}}>{this.props.badge}</Text>
              </View>
            </View>
          )
        }
      }else{
        if(this.state.selected){
          return(
            <Image source={this.props.photoUrlSelected} resizeMode="contain" style={{height: 50, width: 50}} />
          )
        }else{
          return(
            <Image source={this.props.photoUrlUnSelected} resizeMode="contain" style={{height: 50, width: 50}} />
          )
        }
      }


    }

  }

  renderIconText = () => {
    if(this.props.iconText) {
      if(this.state.selected){
        return (
          <View style={{padding: 10}}>
            <Text style={{textAlign: 'center', fontSize: 14, color: '#5F5FBA', fontWeight: '500'}}>{this.props.iconText}</Text>
          </View>
        )
      }else{
        return (
          <View style={{padding: 10}}>
            <Text style={{textAlign: 'center', fontSize: 14, color: '#d3cfcf', fontWeight: '500'}}>{this.props.iconText}</Text>
          </View>
        )
      }
    }
  }

  renderIcon = () => {
    if(this.props.small) {
      if(this.state.selected){
        return (
          <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#5F5FBA', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={this.props.name} size={15} color='white' />
          </View>
        )
      }else{
        return (
          <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#d3cfcf'}}>
            <Icon name={this.props.name} size={15} color='#5F5FBA'/>
          </View>
        )
      }
    } else {
      if(this.props.badge){
        if(this.state.selected){
          return (
            <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#5F5FBA', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={this.props.name} size={35} color='white' />
              <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#5F5FBA', width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 11, fontWeight: '500', color:'white', backgroundColor: 'transparent'}}>{this.props.badge}</Text>
              </View>
            </View>
          )
        }else{
          return (
            <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#d3cfcf'}}>
              <Icon name={this.props.name} size={35} color='#5F5FBA'/>
              <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#A8A5AE', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 11, fontWeight: '500', color:'white', backgroundColor: 'transparent'}}>{this.props.badge}</Text>
              </View>
            </View>
          )
        }
      }else{
        if(this.state.selected){
          return (
            <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#5F5FBA', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={this.props.name} size={35} color='white' />
            </View>
          )
        }else{
          return (
            <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#d3cfcf'}}>
              <Icon name={this.props.name} size={35} color='#5F5FBA'/>
            </View>
          )
        }
      }

    }

  }

  render() {
    return (
      <TouchableOpacity onPress={()=>this.onSelectVenue()} style={{width: (this.props.small ? 45 : 100), marginLeft: (this.props.small ? -5 : -30)}}>
        <View style={{alignItems: 'center'}}>
          {this.renderImage()}
          {this.renderIconText()}
        </View>
      </TouchableOpacity>
    );
  }

}
