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

const SubscriptionButton = (props) => {
  return (
    <TouchableOpacity
      style={{ 
        marginTop: 20, 
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      onPress={() => {
        props.onPress();
      }}
    >
      <View 
        style={{ 
          flexDirection: 'row', 
          borderBottomColor: '#fff',
          borderBottomWidth: StyleSheet.hairlineWidth,
          justifyContent: 'space-between'
        }}
      >
        <Text style={{
            fontFamily: 'AvenirNextLTPro-Regular', 
            color: '#fff',
            backgroundColor: 'transparent', 
            fontSize: 14,
            paddingBottom: 4,
            }}
          >
          {props.title}
        </Text>
        <Icon name="ios-arrow-forward" size={20} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

class Subscription extends Component {

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
    const { navigate } = this.props.navigation;
    // navigate('SubscriptionSubscribe');
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

  renderBack() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 20 }}>
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Icon name="ios-arrow-round-back-outline" size={35} color="#BEBEBE" />
        </TouchableOpacity>
      </View>
    );
  }

  renderHeader() {
    return (
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
    );
  }

  renderContent = () => {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        {this.renderBack()}
        <View style={{paddingLeft: 30, paddingRight: 30 }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
            {this.renderHeader()}
          </View>
          <View style={{ marginTop: 50 }}>
            <Text style={{
                fontFamily: 'AvenirNextLTPro-Medium', 
                color: '#fff',
                backgroundColor: 'transparent', 
                fontSize: 14, 
                }}
              >
              Your Subscriptions
            </Text>
          </View>
          <SubscriptionButton 
            title="Attender Premium"
            onPress={() => navigate('SubscriptionManage') }
          />
          <View style={{ marginTop: 50 }}>
            <Text style={{
                fontFamily: 'AvenirNextLTPro-Medium', 
                color: '#fff',
                backgroundColor: 'transparent', 
                fontSize: 14, 
                }}
              >
              Managing Staff
            </Text>
          </View>
          <SubscriptionButton
            title="John Smith"
            onPress={() => navigate('SubscriptionManage') }
          />
          <SubscriptionButton 
            title="Anne Smith"
            onPress={() => console.warn('Test') }
          />
          <SubscriptionButton 
            title="Juan Pedro"
            onPress={() => console.warn('Test') }
          />
          <SubscriptionButton 
            title="Rizal Jose"
            onPress={() => console.warn('Test') }
          />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);

