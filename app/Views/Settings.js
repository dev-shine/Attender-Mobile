import ZText from 'ZText';

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
  TouchableOpacity, colors
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import ProfileSetup from './ProfileSetup';
import EventOrganizerSetup from './EventOrganizerSetup';
import Setup from './Setup';
import AppSettings from './AppSettings';
import PaymentSettings from './PaymentSettings';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      selectedTab: 'editProfile',
      isEditProfile: false,
      isAppSettings: false,
      isPaymentSettings: false
    }
  }

  static navigationOptions = {
    headerStyle: {
          backgroundColor: '#625BBA'
      },
      headerTitleStyle: {
          color: 'white',
          height: 100,
          width: 140
      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white'}}>Settings</Text>
  };

  onSelectTab = (tab) => {
    if (tab == 'editProfile') {
      this.setState({selectedTab: tab, isEditProfile: true, isAppSettings: false, isPaymentSettings: false});
    } else if (tab == 'appSettings') {
      this.setState({selectedTab: tab, isEditProfile: false, isAppSettings: true, isPaymentSettings: false});
    } else {
      this.setState({selectedTab: tab, isEditProfile: false, isAppSettings: false, isPaymentSettings: true});
    }
  }

  renderProfile = () => {
    if (this.props.navigation.state.params.isStaff) {
      return(
        <ProfileSetup navigation={this.props.navigation} isSettings={true} />
      )
    } else if (this.props.navigation.state.params.isOrganizer) {
      return(
        <EventOrganizerSetup navigation={this.props.navigation} isSettings={true} />
      )
    }else {
      return(
        <Setup navigation={this.props.navigation} isSettings={true} />
      )
    }
  }

  renderContent = () => {
    switch (this.state.selectedTab) {
      case 'editProfile':
      {
        return (
          <View style={{flex: 1}}>
            {this.renderProfile()}
          </View>
        )
      }
      break;
      case 'appSettings':
      {
        return (
          <View style={{flex: 1}}>
            <AppSettings navigation={this.props.navigation} termsCondition={this.props.navigation.state.params.termsCondition}/>
          </View>
        )
      }
      break;
      case 'paymentSettings':
      {
        return (
          <View style={{flex: 1}}>
            <PaymentSettings navigation={this.props.navigation} isStaff={this.props.navigation.state.params.isStaff} />
          </View>
        )
      }
      break;
      default:

    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

        <View style={{flexDirection: 'row'}}>

        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=>this.onSelectTab('editProfile')}>
            <View style={{backgroundColor: '#625BBA', paddingHorizontal: 10, paddingVertical: 15, borderRightWidth: 0.5, borderColor: '#5351B2' , alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '500', color: (this.state.isEditProfile ? 'white' : '#D5D7ED')}}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}} >
          <TouchableOpacity onPress={()=>this.onSelectTab('appSettings')}>
            <View style={{backgroundColor: '#625BBA', paddingHorizontal: 10, paddingVertical: 15, borderRightWidth: 0.5, borderColor: '#5351B2', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '500', color: (this.state.isAppSettings ? 'white' : '#D5D7ED')}}>App Settings</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}} >
          <TouchableOpacity onPress={()=>this.onSelectTab('paymentSettings')}>
            <View style={{backgroundColor: '#625BBA', paddingHorizontal: 10, paddingVertical: 15, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '500', color: (this.state.isPaymentSettings ? 'white' : '#D5D7ED')}}>Payment Settings</Text>
            </View>
          </TouchableOpacity>
        </View>

        </View>

        {this.renderContent()}

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
