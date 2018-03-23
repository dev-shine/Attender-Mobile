
import ZHero from 'ZHero';
import ZSliderCard from 'ZSliderCard';
import ZMuteText from 'ZMuteText';
import ZRoundedButton from 'ZRoundedButton';
import ZModal from 'ZModal';
import ZIcon from 'ZIcon';
import ZVenueCard from 'ZVenueCard';
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
  TouchableOpacity, Modal, Image
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class VenueSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      selected: false,
      data: [{
        openingHours:{
          monday:{start:'', end:''},
          saturday:{start:'', end:''},
        },
        type: []
      }],
      messages: [],
      isSelected: false,
      selectedTab: 'Staff',
      isSelectedStaff: true,
      isSelectedMessages: false,
      isSelectedVenue: false,
      selectedDate: moment().format(),
      isModalOpen: false,
      isStaffRosterModal: false,
      filtersVenue: [],
      filtersService: [],
      isTypeVenue: false,
      isTypeService: false,
      isAlcohol: false,
      isDrinks: false,
      isCocktails: false,
      isLunch: false,
      isFood: false,
      isBreakfast: false
    }
  }

  componentDidMount = () => {
    this.getAllVenues();
  }

  renderTypeVenue = () => {
    if (this.state.isTypeVenue) {
      return(
        <ZSliderCard>
          <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('All', 1, value)} />
          <ZRoundedButton name="Cafe" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('Cafe', 2, value)} />
          <ZRoundedButton name="Restaurant" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('Restaurant', 3, value)} />
          <ZRoundedButton name="Bar" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('Bar', 4, value)} />
          <ZRoundedButton name="Club" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('Club', 5, value)} />
          <ZRoundedButton name="Pub" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByVenue('Pub', 6, value)} />
        </ZSliderCard>
      )
    }
  }

  renderTypeService = () => {
    if (this.state.isTypeService) {
      return(
        <ZSliderCard>
          <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('All', 1, value)} />
          <ZRoundedButton name="Alcohol" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Alcohol', 2, value)} />
          <ZRoundedButton name="Drinks" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Drinks', 3, value)} />
          <ZRoundedButton name="Food" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Food', 4, value)} />
          <ZRoundedButton name="Pokies" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Pokies', 5, value)} />
          <ZRoundedButton name="Cocktails" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Cocktails', 6, value)} />
          <ZRoundedButton name="Breakfast" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Breakfast', 7, value)} />
          <ZRoundedButton name="Lunch" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Lunch', 8, value)} />
          <ZRoundedButton name="Dinner" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Dinner', 9, value)} />
          <ZRoundedButton name="Hotel" isSelected={this.state.selected} selectedColor="#64DAE7" height={35} selectedButton={(value) => this.getFilterByService('Hotel', 10, value)} />
        </ZSliderCard>
      )
    }
  }

  getFilterByVenue = (filterBy, id, value) => {
    var $filterBy = this.state.filtersVenue;
    switch (filterBy) {
      case 'Type of Venue':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
              this.setState({isTypeVenue: false, filtersVenue: []});
            }else {
              $filterBy.push(filterBy.toLowerCase());
              this.setState({isTypeVenue: true});
            }
          }
      break;
      case 'All':
          {
            if(!value){
              $filterBy.push(filterBy.toLowerCase());
            }else {
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }
          }
      break;
      case 'Cafe':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Restaurant':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Bar':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Club':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Pub':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      default:
    }
    console.log($filterBy);
    this.getAllVenues();
  }

  getFilterByService = (filterBy, id, value) => {
    var $filterBy = this.state.filtersService;
    switch (filterBy) {
      case 'Type of Service':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
              this.setState({isTypeService: false, filtersService: []});
            }else {
              $filterBy.push(filterBy.toLowerCase());
              this.setState({isTypeService: true});
            }
          }
      break;
      case 'All':
          {
            if(!value){
              $filterBy.push(filterBy.toLowerCase());
            }else {
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }
          }
      break;
      case 'Alcohol':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Drinks':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Food':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Pokies':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Cocktails':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Breakfast':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Lunch':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Dinner':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      case 'Hotel':
          {
            if(!value){
              var index = $filterBy.indexOf(filterBy);
              $filterBy.splice(index, 1)
            }else {
              $filterBy.push(filterBy.toLowerCase());
            }
          }
      break;
      default:
    }
    console.log($filterBy);
    this.getAllVenues();
  }

  onSelectInterested = (_id) => {
    API.post(`venue/${_id}/interest`, {}).then((res) => {
      console.log('interested', res)
      this.getAllVenues();
    });
  }

  getAllVenues = () => {
    API.get(`venues?services=${this.state.filtersService.join()}&types=${this.state.filtersVenue.join()}`).then((res) => {
      console.log('venues', res)
        this.setState({data: res.venues})
    });
  }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

  static navigationOptions = {
    header: null,
  };


  renderMoreServicesModal = () => {
    return(
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.95, backgroundColor: 'white'}} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginVertical: 10, fontSize: 25, fontWeight: '500'}}>Services</Text>
            <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5'}}>
              <View style={{flexDirection: 'row', paddingTop: 40, paddingBottom: 15, paddingHorizontal: 40}}>
                <View>
                  <ZIcon photoUrlSelected={require('../Assets/alcoholicon.png')} photoUrlUnSelected={require('../Assets/alcoholiconselected.png')} isSelected={this.state.isAlcohol} size={50} selectedIcon={()=>this.setState({isAlcohol: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Alcohol</Text>
                </View>
                <View>
                  <ZIcon photoUrlSelected={require('../Assets/drinkingicon.png')} photoUrlUnSelected={require('../Assets/drinkingiconselected.png')} isSelected={this.state.isDrinks} size={50} selectedIcon={()=>this.setState({isDrinks: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Drinks</Text>
                </View>
                <View>
                  <ZIcon photoUrlSelected={require('../Assets/coctailicon.png')} photoUrlUnSelected={require('../Assets/coctailiconselected.png')} isSelected={this.state.isCocktails} size={50} selectedIcon={()=>this.setState({isCocktails: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Cocktails</Text>
                </View>
                <View>
                  <ZIcon photoUrlSelected={require('../Assets/drinkicon.png')} photoUrlUnSelected={require('../Assets/drinkiconselected.png')} isSelected={this.state.isLunch} size={50} selectedIcon={()=>this.setState({isLunch: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Lunch</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingBottom: 40, paddingTop: 15, paddingHorizontal: 40}}>
                <View style={{flexDirection: 'column'}}>
                  <ZIcon photoUrlSelected={require('../Assets/foodsicon.png')} photoUrlUnSelected={require('../Assets/foodselectedicon.png')} isSelected={this.state.isFood} size={50} selectedIcon={()=>this.setState({isFood: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Food</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <ZIcon photoUrlSelected={require('../Assets/foodicon.png')} photoUrlUnSelected={require('../Assets/foodiconselected.png')} isSelected={this.state.isBreakfast} size={50} selectedIcon={()=>this.setState({isBreakfast: true})} />
                  <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Breakfast</Text>
                </View>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={{position: 'absolute', bottom: 195, left: 125}}>
                <View style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
                  <Icon name='ios-close-outline' size={50} style={{backgroundColor: 'transparent'}}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
//headerTitle={this.props.navigation.state.params.fullname}
// <Image source={require('../Assets/alcoholiconselected.png')} style={{width: 55, height: 50, marginRight: 10, resizeMode: 'stretch'}}/>
  renderContent = () => {
    const { navigate } = this.props.navigation;
      return (
        <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
          <ZFullHeader
            headerTitle={this.props.navigation.state.params ? this.props.navigation.state.params.fullname : ''}
            leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()}
            rightText="SKIP" onPress={()=>navigate('Dashboard', { name: 'dashboard' })} rightTextPress={()=>this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Home', params: {avatar: this.state.photo}}]})}
            enableRight={this.props.navigation.state.params ? this.props.navigation.state.params.browseVenues : false}
            subTitle="Here you can express interest in venues that you would potentially work for. This will help venues find people like you to hire."
            subStyles={{fontSize: 16}}

          />
          <View style={styles.body}>
            <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
            <ZSliderCard>
              <ZRoundedButton name="Type of Venue" isSelected={this.state.selected} selectedColor="#5F5FBA" selectedButton={(value) => this.getFilterByVenue ('Type of Venue', 0, value)} />
              <ZRoundedButton name="Type of Service" isSelected={this.state.selected} selectedColor="#5F5FBA" selectedButton={(value) => this.getFilterByService ('Type of Service', 0, value)} />
            </ZSliderCard>
            {this.renderTypeVenue()}
            {this.renderTypeService()}
            {this.renderMoreServicesModal()}
          </View>
          {
            this.state.data.map((data, id)=>{
              let weekdays = '',
                  weekends = ''
              if (!data.openingHours.Weekdays) {
                 weekdays =  `Monday - Friday : ${moment(data.openingHours.monday.start).format('h A')} - ${moment(data.openingHours.monday.end).format('h A')}`
                 weekends =  `Saturday - Sunday : ${moment(data.openingHours.saturday.start).format('h A')} - ${moment(data.openingHours.saturday.end).format('h A')}`
              }else {
                 weekdays = 'Invalid'
                 weekends = 'Invalid'
              }

              let isInterested = false;
              if (data.interested != undefined) {
                if (data.interested[this.props.navigation.state.params.userId] != undefined) {
                  isInterested = data.interested[this.props.navigation.state.params.userId].interestedAt.length > 0;
                }
              }

                console.log(this.props.navigation.state.params.userId)
                console.log(this.props.navigation.state.params.userProfile)

              return (
                <View key={id} style={styles.body}>
                  <ZVenueCard avatar={data.image} venue={data.name} name={data.type.join(' / ')}
                              schedule={weekdays}
                              schedule1={weekends} location={data.locationName}
                              services={true}
                              isInterested={isInterested}
                              onPressInterested={()=> this.onSelectInterested(data._id)}
                              onPressMore={() => this.setState({modalVisible: true})}
                              isAlcohol={this.state.isAlcohol}
                              isDrinks={this.state.isDrinks}
                              isCocktails={this.state.isCocktails}
                              onPress={() => navigate('VProfile', {
                                  userProfile: data,
                                  myProfile: this.props.navigation.state.params.userProfile
                              })}/>
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
