
import ZHero from 'ZHero';
import ZSliderCard from 'ZSliderCard';
import ZMuteText from 'ZMuteText';
import ZRoundedButton from 'ZRoundedButton';
import ZModal from 'ZModal';
import ZJobCard from 'ZJobCard';
import ZFullHeader from 'ZFullHeader';
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
  TouchableOpacity
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class BrowseJob extends Component {

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
      isStaffRosterModal: false
    }
  }

  componentDidMount = () => {

    //API.get('staff');


    var results = [
      {
        venue: 'Tipple and Slaw',
        job: ' Full Time   Restaurant',
        skills: true,
        experience: false,
        location: ' Surry Hills'
      },
      {
        venue: 'Tipsy Pig',
        job: '  Full Time  Pub',
        skills: true,
        experience: false,
        location: ' Surry Hills'
      },
      {
        venue: 'Locavore',
        job: '  Full Time  Pub',
        skills: true,
        experience: false,
        location: ' Surry Hills'
      },{
        venue: 'Chicken and Beer',
        job: '  Full Time  Pub and Restaurant',
        skills: true,
        experience: false,
        location: ' Surry Hills'
      },
    ]

    this.setState({data: results});
  }

  static navigationOptions = {
    header: null,
  };


  renderContent = () => {
    const { navigate } = this.props.navigation;
      return (
        <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
          <ZFullHeader
            leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()}
            headerTitle="Hello Andrew,"
            subTitle="Here you can see the current hiring based in your selection"
            subStyles={{fontSize: 16}}

          />
          <View style={styles.body}>
            <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
            <ZSliderCard>
              <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#5F5FBA"  />
              <ZRoundedButton name="Part time" isSelected={this.state.selected} selectedColor="#5F5FBA" />
              <ZRoundedButton name="Full time" isSelected={this.state.selected} selectedColor="#5F5FBA" />
              <ZRoundedButton name="Event" isSelected={this.state.selected} selectedColor="#5F5FBA" />
              <ZRoundedButton name="Conference" isSelected={this.state.selected} selectedColor="#5F5FBA" />
            </ZSliderCard>
            <ZSliderCard>
              <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7" height={35}  />
              <ZRoundedButton name="Bartender" isSelected={this.state.selected} selectedColor="#64DAE7" height={35}  />
              <ZRoundedButton name="Waiter" isSelected={this.state.selected} selectedColor="#64DAE7" height={35}  />
              <ZRoundedButton name="Kitchen" isSelected={this.state.selected} selectedColor="#64DAE7" height={35}  />
            </ZSliderCard>
          </View>
          {
            this.state.data.map((data, id)=>{
              return (
                <View key={id} style={styles.body}>
                  <ZJobCard venue={data.venue} skills={data.skills} exp={data.experience} job={data.job} rsa="We are currently needing a bartender for a Full time position to work on Night Shift" location={data.location} onPress={()=>navigate('', { name: '' })} />
                </View>
              )
            })
        }
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderContent()}
        <ZModal modalVisible={this.state.isModalOpen} >
          <ZHero text="Languages" styles={{color: '#33314B', fontSize: 22}}/>
        </ZModal>
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
