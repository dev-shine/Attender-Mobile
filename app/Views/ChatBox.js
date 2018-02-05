import ZText from 'ZText';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

import { GiftedChat, Actions, Bubble, Send } from 'react-native-gifted-chat';
import ZCustomHeader from 'ZCustomHeader';
import API from 'API';
var moment = require('moment');
const ws = require('adonis-websocket-client');
const io = ws('https://staging.attender.com.au');
const client = io.channel('chat').connect();
// import { client } from '../Dashboard';

// import CustomActions from '../Helper/CustomActions';
// import CustomView from '../Helper/CustomView';

export default class Default extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      inputMessage: '',
      messageDetails: this.props.navigation.state.params.messageDetails ? this.props.navigation.state.params.messageDetails : [],
      newMessage: this.props.navigation.state.params.newMessage ? this.props.navigation.state.params.newMessage : false,
      isShowTrialEvent: false
    }

    this._isMounted = false;
    this._isAlright = null;
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    console.log("TEST", this.props.navigation.state.params.userData);
  }

  componentWillMount() {
    var self = this;
    this.getConversations();

    var threadId = this.state.messageDetails._id;
    client.joinRoom(threadId, {}, (err , message) => {
      console.log('join room', err, message);
    });

    client.on('message', function (room, message) {
      console.log('room', room, 'message', message);
      if (message == "refresh-messages") {
        self.getConversations();
      }
      if (message == "typing") {

      }
    })

    this._isMounted = true;
  }

  getConversations = () => {
    console.log('Get all conversation!', this.props.navigation.state.params.userData);
    var threadId = this.state.messageDetails._id;
    console.log('Get all conversation!', this.state.messageDetails);
    API.get(`conversation/${threadId}`).then((res) => {
      console.log(res);
      let formatMessages = [];
      if (res.status) {
        res.messages.map((res, id) => {
          var avatar;
          const { isEmployer, employer} = this.props.navigation.state.params.userData;
          if (isEmployer) {
            if (this.props.navigation.state.params.userData._id == res.sender) {
              avatar = res.employer.image;
            } else {
              avatar = res.staff.avatar;
            }
          } else {
            if (this.props.navigation.state.params.userData._id == res.sender) {
              avatar = res.staff.avatar;
            } else {
              avatar = res.employer.image;
            }
          }

          var $formatMessages = {
              _id: id,
              text: res.message,
              createdAt: moment(res.sentAt).format(),
              user: {
                _id: res.sender,
                name: '',
                avatar: avatar
              },
            };
          formatMessages.push($formatMessages)
        })
        this.setState({messages: formatMessages});
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  goBack = () => {
    var threadId = this.state.messageDetails._id;
    client.leaveRoom(threadId, {}, (err, message) => {
      console.log(err, message);
    });
    this.props.navigation.goBack();
  }

  onSend = (messages = []) => {
    var messageDetails = this.state.messageDetails;
    var type = this.props.navigation.state.params.type;

    if(this.state.inputMessage != ''){
      if (type == 'Venue') {
        var body = {
          receiver: messageDetails.usid,
          message: this.state.inputMessage,
          staff: messageDetails.uselect
        }

        API.post('new-staff-message', body).then((res) => {
          console.log(res);
          this._textInput.setNativeProps({text: ''});
          this.setState({inputMessage: ''});
        })
      } else {
        var body = {
          receiver: messageDetails.usid,
          message: this.state.inputMessage,
          venue: messageDetails.uselect
        }
        API.post('new-venue-message', body).then((res) => {
          this._textInput.setNativeProps({text: ''});
          this.setState({inputMessage: ''});
        })
      }
    }
  }


  renderSend(props) {
    return (
        <Send
          {...props}
        >
          <View style={{marginRight: 10, marginBottom: 5}}>
            <Icon name="ios-send" size={30} color="#5E5EB9" style={{backgroundColor: 'transparent'}} />
          </View>
        </Send>
    );
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFFFFF',
          },
          right: {
            backgroundColor: '#5E5EB9'
          }
        }}
      />
    );
  }

  // renderCustomView = (props) => {
  //   return (
  //     <CustomView
  //       {...props}
  //     />
  //   );
  // }

  renderFooter = (props) => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderComposer = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>

        <TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <Icon name="ios-camera" size={30} color="#5E5EB9" style={{backgroundColor: 'transparent'}} />
          </View>
        </TouchableOpacity>

        <View style={{flex: 1, marginHorizontal: 10, borderWidth: 1, borderColor: '#BABABA', backgroundColor: 'white', borderRadius: 5, overflow: 'hidden'}}>
          <TextInput autoCapitalize="none" underlineColorAndroid="transparent" autoCorrect={false} ref={component => this._textInput = component} style={{paddingHorizontal: 5, height: 38, color: '#696969', fontSize: 14, fontWeight: '400', letterSpacing: 2.0}} onChangeText={(inputMessage)=>this.setState({inputMessage})} onSubmitEditing={()=>this.onSend()} />
        </View>

        <TouchableOpacity onPress={()=>this.onSend()}>
          <View style={{marginRight: 10}}>
            <Icon name="ios-send" size={30} color="#5E5EB9" style={{backgroundColor: 'transparent'}} />
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  renderStaffAvatar = (data) => {
    if (data.avatar == '' || data.avatar == 'undefined') {
      return(
        'https://www.nztcc.org/themes/kos/images/avatar.png'
      )
    } else {
      return(
        data.avatar
      )
    }
  }

  renderVenueAvatar = (data) => {
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

  renderAvatar = () => {
    if (this.props.navigation.state.params.staff) {
      return (
        <View style={{position: 'absolute', top: 15, left: 10}}>
          <Image style={{width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: 'white'}} source={{uri: this.renderStaffAvatar(this.props.navigation.state.params.staff)}}/>
        </View>
      )
    }else {
      return (
        <View style={{position: 'absolute', top: 15, left: 10}}>
          <Image style={{width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: 'white'}} source={{uri: this.renderVenueAvatar(this.props.navigation.state.params.messageDetails)}}/>
        </View>
      )
    }
  }
// https://avatarfiles.alphacoders.com/826/82656.png
  renderGroupUser = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.renderAvatar()}
        <View style={{position: 'absolute', top: 30, left: 80}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white' , backgroundColor: 'transparent'}}>{this.state.newMessage ? this.props.navigation.state.params.staff.user.fullname : this.state.messageDetails.uname}</Text>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#9D9BA6', backgroundColor: 'transparent'}}>{this.props.navigation.state.params.venue}</Text>
        </View>

      </View>
    )
  }

  renderButtonGiveTrial = () => {
    var type = this.props.navigation.state.params.type;
    if (type == "Venue") {
      return(
        <TouchableOpacity onPress={()=>this.setState({isShowTrialEvent: true})}>
          <View style={{backgroundColor: '#5F5FBA', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
            <Icon name="ios-settings-outline" size={25} color="white" style={{backgroundColor: 'transparent'}}/>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderChatBoxHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#33314B', height: 100, paddingTop: 20}}>
        <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>this.goBack()}>
            <View style={{backgroundColor: 'transparent', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
              <Icon name="ios-arrow-round-back" size={35} color="white" style={{backgroundColor: 'transparent'}}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: 280, height: 100, justifyContent: 'center', alignItems: 'flex-start'}}>
          {this.renderGroupUser()}
        </View>
        <View style={{flex: 1,paddingRight: 10, justifyContent: 'center', alignItems: 'center'}}>
          {this.renderButtonGiveTrial()}
        </View>
      </View>
    )
  }

  // onPressStartTrial = () => {
  //   const { navigate } = this.props.navigation;
  //   navigate('TrialPeriod', { name: 'TrialPeriod' });
  //   this.setState({isShowTrialEvent: false});
  // }

  onPressStartTrial = () => {
    API.post(`trial/${this.props.navigation.state.params.messageDetails.uselect}`, {}).then((res)=>{
        if(res.status){
          this.setState({isShowTrialEvent: false});
          this.props.navigation.navigate('VStaff', { name: 'VenueStaff', userData: this.props.navigation.state.params.userData});
        }else{
          alert('Something wrong');
        }
      })
  }

  onPressSkipTrial = () => {
    API.post(`direct-hire/${this.props.navigation.state.params.messageDetails.uselect}`, {}).then((res)=>{
        if(res.status){
          this.setState({isShowTrialEvent: false});
          this.props.navigation.navigate('VStaff', { name: 'VenueStaff', userData: this.props.navigation.state.params.userData });
        }else{
          alert('Something wrong');
        }
      })
  }

  renderGiveTrial = () => {
    return(
      <Modal
        transparent={true}
        animationType='slide'
        visible={this.state.isShowTrialEvent}
      >
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.9, backgroundColor: 'white'}} />
          <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', marginVertical: 170, width: 310}}>
          <View>
            <TouchableOpacity onPress={() => {this.setState({isShowTrialEvent: false})}} style={{position: 'absolute', left: 120, bottom: 10}}>
              <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{backgroundColor: '#F5F5F5', margin: 10, width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name='ios-close-outline' size={35} style={{backgroundColor: 'transparent'}}/>
              </View>
              </View>
            </TouchableOpacity>
          </View>
            <View style={{marginBottom: 15}}>
              <ZText text="Would you like to give" styles={{color: '#727272', backgroundColor: 'transparent', marginTop: 1, fontSize: 18, fontWeight: '500'}}/>
              <ZText text={(this.state.newMessage ? this.props.navigation.state.params.staff.user.fullname : this.state.messageDetails.uname) + " a trial?"} styles={{color: '#727272', marginTop: 1, fontSize: 18, fontWeight: '500'}}/>
            </View>
            <View>
              <ZText text="Alternatively, you can skip the trial process" styles={{color: '#727272', marginTop: 1, fontSize: 12}}/>
              <ZText text="and hire right away." styles={{color: '#727272', marginTop: 1, fontSize: 12}}/>
            </View>
            <View style={{marginTop: 40, flexDirection: 'row'}}>
              <TouchableOpacity onPress={()=>this.onPressStartTrial()}>
                <View style={{marginRight: 50}}>
                  <View style={{borderRadius: 40, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>OK</Text>
                  </View>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ZText text="Start Trial" styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.onPressSkipTrial()}>
                <View style={{borderRadius: 40, backgroundColor: '#5D5CAA', margin: 10, width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={
                    require('../Assets/topleftarrowicon.png')}
                    style={{width: 30, height: 25, resizeMode: 'stretch', transform: [{ rotate: '180deg'}]}}
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ZText text="Skip Trial" styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

        // onLoadEarlier={this.onLoadEarlier}
        // loadEarlier={this.state.loadEarlier}
        // isLoadingEarlier={this.state.isLoadingEarlier}


  render() {
    return (
      <View style={{flex: 1}}>
      {this.renderChatBoxHeader()}

      <GiftedChat
        messages={this.state.messages}
        user={{
          _id: this.props.navigation.state.params.userData._id, // sent messages should have same user._id
        }}
        isAnimated={true}
        bottomOffset={0}
        minInputToolbarHeight={50}
        renderInputToolbar={this.renderComposer}
        showUserAvatar={true}
        renderBubble={this.renderBubble}
        renderFooter={this.renderFooter}

      />

      <View style={{position: 'absolute', top: 78, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome name="caret-down" size={50} color="#33314B" style={{backgroundColor: 'transparent'}}/>
      </View>
      {this.renderGiveTrial()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
