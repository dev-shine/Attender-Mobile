
import ZHeader from 'ZHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZRoundedButton from 'ZRoundedButton';
import ZFullCard from 'ZFullCard';
import ZTab from 'ZTab';
import ZTabItem from 'ZTabItem';
import ZCustomHeader from 'ZCustomHeader';
import ZAvatar from 'ZAvatar';
import ZMessageCard from 'ZMessageCard';
import ZPhoto from 'ZPhoto';
import ZProfileCard from 'ZProfileCard';
import ZCard from 'ZCard';
import ZRater from 'NRater';
import ZButtonOutline from 'ZButtonOutline';
import API from 'API';

var moment = require('moment');
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class NewMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount () {
    this.getThreadMessages();
  }

  getThreadMessages = () => {
    if (this.props.navigation.state.params.typeStaff) {
      API.get('staff-messages').then((res)=>{
       console.log('newMessages', res);
       if (res.status) {
         this.setState({messages: res.threads})
       }
     });
    } else {
      API.get('venue-messages').then((res)=>{
       console.log('newMessages', res);
       if (res.status) {
         this.setState({messages: res.threads})
       }
     });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let userProfile = this.props.navigation.state.params.userProfile;
    return (
      <View style={{flex: 1}}>
        <ZHeader
          headerTitle="New Message"
          titleStyle={{fontSize: 16, fontWeight: '500'}}
          leftIcon="ios-arrow-round-back-outline"
          leftIconColor="white"
          leftIconPress={()=>this.props.navigation.goBack()}
        />

        <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
          <View style={styles.plainBody}>
          <ZMuteText text="TO" styles={{textAlign: 'left'}}/>
            <ZSliderCard>
              <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartenders" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')} photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Chef" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')} photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barback" isSelected={this.state.selected}  />
              <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')} photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host" isSelected={this.state.selected}  />
            </ZSliderCard>
          </View>


          <View style={styles.body2}>
          <ZMuteText text="MEMBERS" styles={{textAlign: 'left', paddingLeft: 10}}/>
            {
              this.state.messages.map((res, index)=>{
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatBox', {messageDetails: res, userData: userProfile, type: this.props.navigation.state.params.typeStaff ? 'Staff' : 'Venue', newMessage: false})}>
                      <ZMessageCard avatar={res.uavatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'} fullname={res.uname} previewMessage={res.message} dataTime={moment(res.latest).fromNow()} isChecked={res.delivered} seen={res.seen}/>
                    </TouchableOpacity>
                  </View>
                )
              })
            }

          </View>
        </ScrollView>
      </View>
    )
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
  heading: {
    backgroundColor: 'purple',
    padding: 10,
    paddingTop: 25,
    width: '100%',
    alignItems: 'center'
  },
  headingText: {
    color: '#FFFFFF',
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
  },
  body3: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  plainBody: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 10
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});
