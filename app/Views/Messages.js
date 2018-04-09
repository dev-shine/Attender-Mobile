import ZCustomHeader from 'ZCustomHeader';
import ZMuteText from 'ZMuteText';
import ZMessageCard from 'ZMessageCard';
import ZSliderCard from 'ZSliderCard';
import ZAvatar from 'ZAvatar';
import ZRoundedButton from 'ZRoundedButton';

import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  LayoutAnimation
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import API from 'API';
var moment = require('moment');
const ws = require('adonis-websocket-client');
const io = ws('http://45.76.121.86');
const client = io.channel('chat').connect();

export default class Messages extends Component {

  constructor(props){
    super(props);
    this.state = {
      archived: [],
      messages: [],
      selectedTab: 'Inbox',
      filterMessages: [],
    }
  }

  componentDidMount = () => {

    var self = this;
    client.on('message', function (room, message) {
      console.log('room', room, 'message', message);
      if (room == self.state.userData._id) {
        self.getStaffThreadMessages();
      }
      if (message == "refresh-messages") {

      }
    });
    this.getStaffThreadMessages();
    this.getVenueProfile();
  }

  getStaffThreadMessages = () => {
    API.get('staff-messages').then((res)=>{
     console.log('messages Jameson', res);
     if (res.status) {
       this.setState({messages: res.threads})
     }
   });
  }

  onDeleteMessage = ($id) => {
    API.post(`conversation/${$id}/delete`, {}).then((res) => {
      if (res.status) {
        this.getStaffThreadMessages();
      }else {
        alert('Something went wrong');
      }
    })
  }

  onArchivedMessage = ($id) => {
    API.post(`conversation/${$id}/archive`, {}).then((res) => {
      if (res.status) {
        this.getAllArchived();
        this.getStaffThreadMessages();
      }else {
        alert('Something went wrong');
      }
    })
  }

  onRestoreMessage = ($id) => {
    API.post(`conversation/${$id}/restore`, {}).then((res) => {
      console.log(res);
      if (res.status) {
        this.getAllArchived();
        this.getStaffThreadMessages();
      }else {
        alert('Something went wrong');
      }
    })
  }

  getVenueProfile = () => {
    API.get('auth/current').then((res) => {
      console.log('User', res);
      if(res.status){
        //join room
        client.joinRoom(res.data._id, {}, console.log);
        this.setState({userData: res.data});
      }
    });
  }

  getAllArchived = () => {
    API.get('staff-archives').then((res) => {
      if (res.status) {
        this.setState({archived: res.threads});
      }
    })
  }

  static navigationOptions = {
    header: null,
  };

  onPressLeftIcon = () => {
    if (this.state.selectedTab == 'Inbox') {
      this.setState({selectedTab: 'Archived'});
    }else {
      this.setState({selectedTab: 'Inbox'});
    }
  }

  getFilterMessage = (filterMessage, id, value) => {
    var $filterMessage = this.state.filterMessages;
      switch (filterMessage) {
        case 'All time':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Part time':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Full time':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Event':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'All type':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Bartender':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Waiter':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Kitchen':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Housekeeper':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        case 'Barista':
          {
            if(!value){
              var index = $filterMessage.indexOf(filterMessage);
              $filterMessage.splice(index, 1)
            }else {
              $filterMessage.push(filterMessage);
            }
          }
        break;
        default:

      }
      console.log($filterMessage);
  }

  renderMessageAvatar = (data) => {
    if (data.uavatar == '' || data.uavatar == 'undefined') {
      return(
        'https://www.nztcc.org/themes/kos/images/avatar.png'
      )
    } else {
      return(
        data.uavatar
      )
    }
  }

  renderContent = () => {
    const { navigate } = this.props.navigation;
    let userProfile = this.state.userData;
    switch (this.state.selectedTab){
      case 'Inbox':
      {
        LayoutAnimation.easeInEaseOut();

        const rightButtons = ($id) => {
          return [
            <TouchableOpacity onPress={()=>this.onArchivedMessage($id)}>
              <View style={{backgroundColor: '#6E6F92', width: 120, height: 70, padding: 13, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ios-archive-outline' color='white' size={30} />
                <Text style={{fontSize: 12, color: 'white'}}>Archived</Text>
              </View>
            </TouchableOpacity>,

            <TouchableOpacity>
              <View style={{backgroundColor: '#5352B5', width: 120, height: 70, padding: 13, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ios-mail-outline' color='white' size={30} />
                <Text style={{fontSize: 12, color: 'white'}}>Mark as Unread</Text>
              </View>
            </TouchableOpacity>
          ];
        }
        return (
          <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
            <ZCustomHeader
              rightIcon="ios-mail-outline"
              rightIconColor="white"
              rightIconText="Message"
              leftIcon="ios-archive-outline"
              leftIconColor="white"
              leftIconText='Archived'
              SubleftIcon="ios-arrow-round-back-outline"
              subLeftIconColor="white"
              onSubLeftIconPress={()=>[this.props.navigation.state.params.onGoBack(), this.props.navigation.goBack()]}
              onLeftIconPress={()=>[this.onPressLeftIcon(),this.getAllArchived()]}
              onRightIconPress={()=>navigate('NMessage', { name: 'NMessage', typeStaff: true, userProfile})}
              >

              <View style={{flex: 1, borderRadius: 2, width:'90%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput placeholder="Search" style={{textAlign: 'center', height: 40, width: '90%'}} onChangeText={(text) => this.setState({text})} />
              </View>

            </ZCustomHeader>

            <View style={{flex: 1,
                backgroundColor: '#FFFFFF',
                width: '100%',
                paddingTop: 20,
                paddingBottom: 5,
                paddingHorizontal: 20,
                marginBottom: 10}}>

            <ZMuteText text="FAVORITES" styles={{textAlign: 'left'}}/>

            <ZSliderCard>
              {
                this.state.messages.map((res, index)=>{
                  return (
                    <TouchableOpacity key={res._id}>
                      <ZAvatar source={this.renderMessageAvatar(res)} text="V" avatarName={res.uname} />
                    </TouchableOpacity>
                  )
                })
              }
            </ZSliderCard>


            </View>

            <View style={styles.body}>
              <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
              <ZSliderCard>
                <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#5F5FBA" height={35} selectedButton={(value) => this.getFilterMessage('All time', 0, value)} />
                <ZRoundedButton name="Partime" isSelected={this.state.selected} selectedColor="#5F5FBA" height={35} selectedButton={(value) => this.getFilterMessage('Part time', 1, value)} />
                <ZRoundedButton name="Full time" isSelected={this.state.selected} selectedColor="#5F5FBA" height={35} selectedButton={(value) => this.getFilterMessage('Full time', 2, value)} />
                <ZRoundedButton name="Event" isSelected={this.state.selected} selectedColor="#5F5FBA" height={35} selectedButton={(value) => this.getFilterMessage('Event', 3, value)} />
              </ZSliderCard>
              <ZSliderCard>
                <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('All type', 4, value)} />
                <ZRoundedButton name="Bartender" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('Bartender', 5, value)} />
                <ZRoundedButton name="Waiter" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('Waiter', 6, value)} />
                <ZRoundedButton name="Kitchen" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('Kitchen', 7, value)} />
                <ZRoundedButton name="Housekeeper" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('Housekeeper', 8, value)} />
                <ZRoundedButton name="Barista" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterMessage('Barista', 9, value)} />
              </ZSliderCard>
            </View>

            <View style={styles.body2}>
              {
                this.state.messages.map((res, index)=>{
                  console.log(res)
                  return (
                    <Swipeable key={res._id} rightButtons={rightButtons(res._id)} rightButtonWidth={120}>
                      <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ChatBox', {messageDetails: res, userData: userProfile, newMessage: false, staff: res.staff})
                      }}>
                        <ZMessageCard avatar={this.renderMessageAvatar(res)} fullname={res.uname} previewMessage={res.message}  dataTime={moment(res.latest).fromNow()} isChecked={res.delivered} seen={res.seen}/>
                      </TouchableOpacity>
                    </Swipeable>
                  )
                })
              }
            </View>
          </ScrollView>
        )
      }
      break;
      case 'Archived':
      {
        LayoutAnimation.easeInEaseOut();

        const rightButtons = ($id) => {
          return [
          <TouchableOpacity onPress={()=>this.onRestoreMessage($id)}>
            <View style={{backgroundColor: '#6E6F92', width: 120, height: 70, padding: 13, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='ios-archive-outline' color='white' size={30} />
              <Text style={{fontSize: 12, color: 'white'}}>Restore</Text>
            </View>
          </TouchableOpacity>,

          <TouchableOpacity onPress={()=>this.onDeleteMessage($id)}>
            <View style={{backgroundColor: '#F00010', width: 120, height: 70, padding: 13, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='ios-trash-outline' color='white' size={30} />
              <Text style={{fontSize: 12, color: 'white'}}>Delete</Text>
            </View>
          </TouchableOpacity>
          ];
        }
        return(
          <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
            <ZCustomHeader
              rightIcon="ios-mail-outline"
              rightIconColor="white"
              rightIconText="Message"
              leftIcon="ios-archive-outline"
              leftIconColor="white"
              leftIconText='Inbox'
              SubleftIcon="ios-arrow-round-back-outline"
              subLeftIconColor="white"
              onSubLeftIconPress={()=>this.props.navigation.goBack()}
              onLeftIconPress={()=>{this.onPressLeftIcon()}}
              onRightIconPress={()=>navigate('NMessage', { name: 'NMessage', typeStaff: true, userProfile})}
              >

              <View style={{flex: 1, borderRadius: 2, width:'90%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput placeholder="Search" style={{textAlign: 'center', height: 40, width: '90%'}} onChangeText={(text) => this.setState({text})} />
              </View>

            </ZCustomHeader>

            <View style={{flex: 1,
                backgroundColor: '#FFFFFF',
                width: '100%',
                paddingTop: 20,
                paddingBottom: 5,
                paddingHorizontal: 20,
                marginBottom: 10}}>

            <ZMuteText text="ARCHIVED" styles={{textAlign: 'left'}}/>

            </View>

            <View style={styles.body2}>
              {
                this.state.archived.map((res, index)=>{
                  return (
                    <Swipeable key={index} rightButtons={rightButtons(res._id)} rightButtonWidth={120}>
                      <TouchableOpacity onPress={() => {
                          console.log("Vallar Archived", res)
                          this.props.navigation.navigate('ChatBox', {messageDetails: res, userData: userProfile, newMessage: false,  staff: res.staff})
                      }}>
                        <ZMessageCard avatar={res.uavatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'} fullname={res.uname} previewMessage={res.message} dataTime={moment(res.latest).fromNow()} isChecked={res.delivered} seen={res.seen}/>
                      </TouchableOpacity>
                    </Swipeable>
                  )
                })
              }
            </View>
          </ScrollView>
        );
      }
      break;
      default:
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  body2: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 10,
    marginBottom: 10
  }
});
