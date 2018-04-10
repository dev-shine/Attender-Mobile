import ZTextMedium from 'ZTextMedium';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import * as actions from '../Reducers/subscriptionActions';

import API from 'API';

const Bullet = (props) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{fontFamily: 'AvenirNextLTPro-Regular', textAlign: 'justify', color: 'white', backgroundColor: 'transparent', fontSize: 15, lineHeight: 25}}>
      {'\u2022' + "  "}
    </Text>
    <View style={{ width: 8 }}/>
    <Text style={{fontFamily: 'AvenirNextLTPro-Regular', textAlign: 'justify', color: 'white', backgroundColor: 'transparent', fontSize: 15, lineHeight: 25}}>
      {props.children}
    </Text>
  </View>
);

class SubscriptionSubscribe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
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

  renderPremium() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
          <Image source={require('../Assets/subscribePremium.png')}/>
          <Text style={{fontFamily: 'AvenirNextLTPro-Medium', color: 'white', backgroundColor: 'transparent', fontSize: 14, marginTop: 30 }}>
            SUBSCRIBE TO ATTENDER
          </Text>
          <View style={{ marginLeft: 80, marginRight: 80, paddingTop: 15 }}>
            <Bullet children="Choose from a pool of ready to work staff when needed" />
            <Bullet children="Set tasks trial potential staff through the app" />
            <Bullet children="View your Venue, Events Callendar and Messages on one platform" />
            <Bullet children="$49 per month (excl. GST), no lock in contract" />
          </View>
        </View>
      </View>
    );
  }

  renderManageStaff() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
          <Image source={require('../Assets/subscribeStaff.png')}/>
          <Text style={{fontFamily: 'AvenirNextLTPro-Medium', color: 'white', backgroundColor: 'transparent', fontSize: 14, marginTop: 30 }}>
            MANAGE YOUR STAFF WITH ATTENDER
          </Text>
          <Text style={{fontFamily: 'AvenirNextLTPro-Regular', textAlign: 'center', lineHeight: 25, color: 'white', backgroundColor: 'transparent', fontSize: 14, marginTop: 10 }}>
            A more convenient way to manage{'\n'}
            your team's roster and communications.
          </Text>
          <Text style={{fontFamily: 'AvenirNextLTPro-Demi', textAlign: 'center', lineHeight: 25, color: 'white', backgroundColor: 'transparent', fontSize: 14, marginTop: 20 }}>
            Additional staff cost $3 per month to manage.
          </Text>
        </View>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
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
          
          <Text style={{fontFamily: 'AvenirNextLTPro-Medium', color: 'white', backgroundColor: 'transparent', fontSize: 28, marginTop: 12 }}>
            Attender
          </Text>
          <Text style={{fontFamily: 'AvenirNextLTPro-Medium', color: 'white', backgroundColor: 'transparent', fontSize: 18, marginTop: 16 }}>
            Hospitality Work Made Simple
          </Text>
        </View>
      </View>
    );
  }

  renderButtons() {
    const { navigate, goBack, state } = this.props.navigation;
    const premium = state.params.type === "premium";
    return (
      <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity 
          onPress={() => {
            if (premium) {
              this.props.actions.subscribePremium((data) => {
                goBack();
              });
            } else {
              this.props.actions.subscribeManage(state.params.staffId, (data) => {
                goBack();
              });
            }
          }}
        >
          <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, width: 140, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'AvenirNextLTPro-Demi', fontSize: 14, color: 'white'}}>Subscribe Now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={
            () => {
              goBack();
            }
          }
        >
          <View style={{borderRadius: 5, backgroundColor: 'transparent', padding: 5, margin: 10, borderWidth: 1, borderColor: 'white', width: 140, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontFamily: 'AvenirNextLTPro-Demi', fontSize: 14, color: 'white'}}>No Thanks</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    const { state } = this.props.navigation;
    const premium = state.params.type === "premium";
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            {this.renderHeader()}
            {premium ? this.renderPremium() : this.renderManageStaff()}
          </View>
          {this.renderButtons()}
        </View>
      </ScrollView>
    );
  }


  render() {
    
    return (
      <ImageBackground source={require('../Assets/Rectangle.png')} style={{flex: 1, paddingTop: (Platform.OS === 'ios' ? 30: 0)}}>
        {this.renderContent()}
        {this.renderOnShowLoading()}
      </ImageBackground>
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionSubscribe);

