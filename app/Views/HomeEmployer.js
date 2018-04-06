import ZTextMedium from 'ZTextMedium';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  ImageBackground,
  Platform,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import API from 'API';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      userData: {
        employer: {
          image: ''
        },
        organizerId: {
          image: ''
        }
      },
      isLoading: true,
      messageTicker: 0,
      notificationTicker: 0
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.getAllData()
  }

  getAllData = () => {
    API.get('auth/current').then((res) => {
      console.log('User', res);
      if(res.status){
        this.setState({userData: res.data, messageTicker: res.newMessages, notificationTicker: res.newNotifications, isLoading: false});
      } else {
        this.setState({isLoading: false});
      }
    });
  }

  onLogout = () => {
    AsyncStorage.setItem('Token', '');
    AsyncStorage.setItem('User', '');
    this.props.dispatch({ type: 'LOGOUT_RESET' });
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Login'}]})
  }

  renderOnShowLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="white"/>
          <Text style={{fontSize: 10, marginTop: 5, color: 'white'}}>Loading data...</Text>
        </View>
      )
    }
  }

  // <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
  //   <TouchableOpacity onPress={()=>navigate('Hire')}>
  //     <Image source={require('../Assets/menuiconwhites.png')} style={{width: 40, height: 50, resizeMode: 'stretch'}}/>
  //   </TouchableOpacity>
  // </View>
  renderContent = () => {
    const { navigate } = this.props.navigation;
    var user = this.state.userData;
    var employer = user.employer;
    var organizerId = user.organizerId;

    if (user.isVenue) {
      return(
        <ScrollView>
          <View style={{padding: 30}}>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: '#fff', 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25,
                    overflow: 'hidden',
                  }}
                >
                  <Image source={require('../Assets/logo.png')} style={{ width: 50, height: 50, borderRadius: 25, overflow: 'hidden'}}/>
                </View>
                <Text style={{color: 'white', backgroundColor: 'transparent', fontSize: 20}}>Attender</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Image source={{uri: employer.image || 'https://www.nztcc.org/themes/kos/images/avatar.png'}} style={{height: 70, borderRadius: 35, width: 70, resizeMode: (Platform.OS === 'ios' ? 'cover' : 'cover')}}/>
              <View style={{flex: 1, marginLeft: 15, marginTop: 15}}>
                <TouchableOpacity onPress={()=>navigate('Dashboard', {selectedTab: 'Venue', isVenue: true, userData: user, navigateToMenu: false,  onGoBack: () => this.getAllData()})}>
                  <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'justify', backgroundColor: 'transparent'}}>{employer.name}</Text>
                </TouchableOpacity>
                <Text style={{color: '#A2ABDA', textAlign: 'justify', backgroundColor: 'transparent', marginTop: 5, fontSize: 13}}>{user.email}</Text>
              </View>
            </View>

            <View style={{marginTop: 15}}>
              <TouchableOpacity onPress={()=>navigate('Dashboard', {selectedTab: 'Messages', navigateToMenu: false,  onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Messages" styles={{fontSize: 18}}/>
                {
                  this.state.messageTicker >= 1 ?
                    <View style={{position: 'absolute', left: 80, top: 10, width: 18, height: 18, backgroundColor: 'red', borderRadius: 9, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 12, fontWeight: '400', color: 'white'}}>{this.state.messageTicker}</Text>
                    </View>
                  : null
                }
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('Dashboard', {selectedTab: 'Staff', navigateToMenu: false,  onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Browse Jobseeker" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('VStaff', { name: 'VenueStaff', userData: user})}>
                <ZTextMedium text="My staff" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('Calendar', {isStaff: false})}>
                <ZTextMedium text="Calendar" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Settings', {isOrganizer: false, termsCondition: 'Business', userData: user, editMode: true})}>
                <ZTextMedium text="Settings" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Subscription')}>
                <ZTextMedium text="Subscription" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Notification', {isStaff: false,  onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Notifications" />
                {
                  this.state.notificationTicker >= 1 ?
                    <View style={{position: 'absolute', left: 95, top: 10, width: 18, height: 18, backgroundColor: 'red', borderRadius: 9, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: 12, fontWeight: '400', color: 'white'}}>{this.state.notificationTicker}</Text>
                    </View>
                  : null
                }
              </TouchableOpacity>
              
              <View style={{marginVertical: 40}}>
                <TouchableOpacity onPress={() => this.onLogout()}>
                  <ZTextMedium text="Log out" styles={{fontSize: 18}}/>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <View style={{padding: 30}}>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: '#fff', 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25,
                    overflow: 'hidden',
                  }}
                >
                  <Image source={require('../Assets/logo.png')} style={{ width: 50, height: 50, borderRadius: 25, overflow: 'hidden'}}/>
                </View>
                <Text style={{color: 'white', backgroundColor: 'transparent', fontSize: 20}}>Attender</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Image source={{uri: employer.image || 'https://www.nztcc.org/themes/kos/images/avatar.png'}} style={{height: 70, borderRadius: 35, width: 70, resizeMode: (Platform.OS === 'ios' ? 'cover' : 'cover')}}/>
              <View style={{flex: 1, marginLeft: 15, marginTop: 15}}>
                <TouchableOpacity onPress={()=>navigate('Dashboard', {selectedTab: 'Venue'})}>
                  <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'justify', backgroundColor: 'transparent'}}>{employer.name}</Text>
                </TouchableOpacity>
                <Text style={{color: '#A2ABDA', textAlign: 'justify', backgroundColor: 'transparent', marginTop: 5, fontSize: 13}}>{user.email}</Text>
              </View>
            </View>

            <View style={{marginTop: 15}}>
              <TouchableOpacity onPress={()=>navigate('Dashboard', {selectedTab: 'Messages'})}>
                <ZTextMedium text="Messages" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('Dashboard', {selectedTab: 'Staff', isVenue: false})}>
                <ZTextMedium text="Browse Jobseeker" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('VStaff', { name: 'VenueStaff', userData: user})}>
                <ZTextMedium text="My staff" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigate('Calendar', {isStaff: false})}>
                <ZTextMedium text="Calendar" styles={{fontSize: 18}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Settings', {isOrganizer: true, termsCondition: 'Business', userData: user, editMode: true})}>
                <ZTextMedium text="Settings" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Subscription')}>
                <ZTextMedium text="Subscription" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Notification', {isStaff: false,  onGoBack: () => this.getAllData()})}>
                <ZTextMedium text="Notifications" />
              </TouchableOpacity>



              <View style={{marginVertical: 40}}>
                <TouchableOpacity onPress={() => this.onLogout()}>
                  <ZTextMedium text="Log out" styles={{fontSize: 18}}/>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      )
    }
  }


  render() {
    return (
      <ImageBackground source={require('../Assets/Rectangle.png')} style={{flex: 1, paddingTop: (Platform.OS === 'ios' ? 30: 0)}}>
        {this.renderContent()}
        {this.renderOnShowLoading()}
      </ImageBackground>
    );

    // <TouchableOpacity onPress={()=>navigate('BrowseEvent', {fullname: user.fullname, userId: 1})}>
    //   <ZTextMedium text="Events" styles={{fontSize: 18}}/>
    // </TouchableOpacity>
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
