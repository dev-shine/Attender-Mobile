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
        <View style={{padding: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
            {this.renderHeader()}
          </View>
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

