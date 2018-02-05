
import ZFullHeader from 'ZFullHeader';
import ZHero from 'ZHero';
import ZSliderCard from 'ZSliderCard';
import ZInterestCard from 'ZInterestCard';
import ZRater from 'NRater';
import ZModal from 'ZModal';
import API from 'API';

var moment = require('moment');
import Calendar from 'react-native-calendar';
import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class InterestEventPeople extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: false,
      data: [],
      messages: [],
      isSelected: false,
      selectedTab: 'Staff',
      isSelectedStaff: true,
      isSelectedMessages: false,
      isSelectedVenue: false,
      selectedDate: moment().format(),
      isModalOpen: false,
      isStaffRosterModal: false,
      isLoading: true,
      refreshing: false
    }
  }

  componentDidMount = () => {
    this.getAllInterestedStaffs();
  }

  getAllInterestedStaffs = () => {
    API.get('venue/interested').then((res)=>{
     console.log('staffs', res);
     if (res.status) {
       this.setState({data: res.staffs, isLoading: false})
     }
   });
  }

  static navigationOptions = {
    header: null,
  };

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

  renderContent = () => {
    const { navigate } = this.props.navigation;
    switch (this.state.selectedTab) {
      case 'Staff':
        {
          LayoutAnimation.easeInEaseOut();
          return (
            <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>this.getAllInterestedStaffs()}
              />
            }
            >
              <ZFullHeader
              leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()}
                headerTitle={`Hello ${this.props.navigation.state.params.fullname}`}
                subTitle="Below you can see people who are interested in your venue and/or event."
                subStyles={{fontSize: 16}}

              />
              <View style={styles.body}>
              </View>
              {
                this.state.data.map((data, id)=>{
                  return (
                    <View key={id} style={styles.body}>
                      <ZInterestCard fullname={data.fullname} skills={data.skills} exp={data.experiences} rate={data.rateBadge} job={data.position.join(' ')} jobType={data.frequency} rsa={data.description.join(' ')} onPress={()=>navigate('SProfile', { userProfile: data, myProfile: this.props.navigation.state.params.userData })} />
                    </View>
                  )
                })
              }
            </ScrollView>
          )
        }

    }

  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderContent()}
        <ZModal modalVisible={this.state.isModalOpen} >
          <ZHero text="Languages" styles={{color: '#33314B', fontSize: 22}}/>
        </ZModal>
        {this.renderOnShowLoading()}
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
    marginBottom: 10
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});
