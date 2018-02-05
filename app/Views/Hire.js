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
import ZInput from 'ZInput';


import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  colors,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Loking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      isVenue: null,
      isOrganizer: null,
      isLoading: true
    }
  }

  static navigationOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      },
      headerTitleStyle: {

      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white'}}></Text>
  };

  componentDidMount () {
    AsyncStorage.getItem('User').then((res)=>{
      console.log('AsyncStorage user', JSON.parse(res));
      let user = JSON.parse(res);
      this.setState({isVenue: user.isVenue, isOrganizer: user.isOrganizer, isLoading: false});
    });
  }

  onSelectVenue = () => {
    const { navigate } = this.props.navigation;
    if (this.state.isVenue) {
      navigate('HomeEmployer');
    } else {
      navigate('Setup', {editMode: false});
    }
  }

  onSelectEvent = () => {
    const { navigate } = this.props.navigation;
    if (this.state.isOrganizer) {
      navigate('HomeEmployer');
    } else {
      navigate('EventOrganizerSetup', {editMode: false});
    }
  }

  renderOnShowLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
          <Text style={{fontSize: 10, marginTop: 5}}>Loading data...</Text>
        </View>
      )
    }
  }


  render() {
    var text2 = `you're looking to hire staff!`;
    var text3 = `you're setting up as a venue/establishment or if`;
    var text4 = `you're organising a one off event e.g. a festival,`;
    return (
      <View style={{flex: 1, padding: 30, backgroundColor: '#625BBA', alignItems: 'center', justifyContent: 'center'}}>

        <View style={{alignItems: 'center', padding: 10}}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>Great,</Text>
          <Text style={{fontWeight:'bold', color: 'white'}}>{text2}</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 20}}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>To give you the right profile we need to know if</Text>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '500', marginVertical: 2}}>{text3}</Text>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>{text4}</Text>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '500', marginTop: 2}}>wedding or birthday.</Text>
        </View>

        <View style={{marginTop: 70, justifyContent: 'center', alignItems: 'center'}}>

          <TouchableOpacity onPress={() => this.onSelectVenue()}>
            <View style={{borderRadius: 5, backgroundColor: '#63c0de', padding: 10, paddingHorizontal: 10, width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#D9FFFF'}}>Venue/Establishment</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: 20}}>
            <TouchableOpacity onPress={() => this.onSelectEvent()}>
              <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'white', width: 200, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Event Organizer</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        {this.renderOnShowLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null
  }
});
