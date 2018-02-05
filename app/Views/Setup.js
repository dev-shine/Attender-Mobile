
import ZHeader from 'ZHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZInput from 'ZInput';
import ZRoundedButton from 'ZRoundedButton';
import DateTimePicker from 'react-native-modal-datetime-picker';

import API from 'API';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import Form from 'react-native-form';

var moment = require('moment');

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
  Platform,
  ActivityIndicator
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Setup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      latitude: null,
      longitude: null,
      selected: false,
      isLoggined: false,
      venues: [],
      staffs: [],
      services: [],
      isTimePicker: false,
      mondayStartTime: new Date(),
      mondayEndTime: new Date(),
      tuesdayStartTime: new Date(),
      tuesdayEndTime: new Date(),
      wednesdayStartTime: new Date(),
      wednesdayEndTime: new Date(),
      thursdayStartTime: new Date(),
      thursdayEndTime: new Date(),
      fridayStartTime: new Date(),
      fridayEndTime: new Date(),
      saturdayStartTime: new Date(),
      saturdayEndTime: new Date(),
      sundayStartTime: new Date(),
      sundayEndTime: new Date(),
      monOff: false,
      tueOff: false,
      wedOff: false,
      thuOff: false,
      friOff: false,
      satOff: false,
      sunOff: false,
      startOrEnd: '',
      type: '',
      location: [14.6819, 121.0944],
      locationName: 'Surry Hills, CBD Sydney',
      numberEmployees: 0,
      socialMedias: [],
      photo: '',
      imageSource: [],
      name: '',
      venueInfo: '',
      managerName: '',
      tag1: '',
      tag2: '',
      isCafe: false,
      isRestaurant: false,
      isBar: false,
      isClub: false,
      isPub: false,
      isAlcohol: false,
      isDrinks: false,
      isFood: false,
      isPokies: false,
      isCocktails: false,
      isBreakfast: false,
      isLunch: false,
      isDinner: false,
      isHotel: false,
      isFacebook: false,
      isGoogle: false,
      isInstagram: false
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillMount () {
    if (this.props.navigation.state.params.editMode) {
      this.getExistingData();
    }
  }

  getExistingData = () => {
    let res = this.props.navigation.state.params.userData.employer;
    let type = res.type;
    let service = res.services;
    let socialMedia = res.socialMedia;

//venue types
    cafe = type.indexOf('cafe') > -1;
    restaurant = type.indexOf('restaurant') > -1;
    bar = type.indexOf('bar') > -1;
    club = type.indexOf('club') > -1;
    pub = type.indexOf('pub') > -1;
//venue services
    alcohol = service.indexOf('alcohol') > -1;
    drinks = service.indexOf('drinks') > -1;
    food = service.indexOf('food') > -1;
    pokies = service.indexOf('pokies') > -1;
    cocktails = service.indexOf('cocktails') > -1;
    breakfast = service.indexOf('breakfast') > -1;
    lunch = service.indexOf('lunch') > -1;
    dinner = service.indexOf('dinner') > -1;
    hotel = service.indexOf('hotel') > -1;
//venue socialmedias
    facebook = socialMedia.indexOf('facebook') > -1;
    google = socialMedia.indexOf('google') > -1;
    instagram = socialMedia.indexOf('instagram') > -1;

    if (cafe) { this.setState({isCafe: cafe}) }
    if (restaurant) { this.setState({isRestaurant: restaurant}) }
    if (bar) { this.setState({isBar: bar}) }
    if (club) { this.setState({isClub: club}) }
    if (pub) { this.setState({isPub: pub}) }

    if (alcohol) { this.setState({isAlcohol: alcohol}) }
    if (drinks) { this.setState({isDrinks: drinks}) }
    if (food) { this.setState({isFood: food}) }
    if (pokies) { this.setState({isPokies: pokies}) }
    if (cocktails) { this.setState({isCocktails: cocktails}) }
    if (breakfast) { this.setState({isBreakfast: breakfast}) }
    if (lunch) { this.setState({isLunch: lunch}) }
    if (dinner) { this.setState({isDinner: dinner}) }
    if (hotel) { this.setState({isHotel: hotel}) }

    if (facebook) { this.setState({isFacebook: facebook}) }
    if (google) { this.setState({isGoogle: google}) }
    if (instagram) { this.setState({isInstagram: instagram}) }

    this.setState({
      name: res.name,
      venueInfo: res.info,
      managerName: res.managerName,
      venues: res.type,
      location: res.location,
      locationName: res.locationName,
      services: res.services,
      numberEmployees: res.numberEmployees,
      mondayStartTime: res.openingHours.monday.start,
      mondayEndTime: res.openingHours.monday.end,
      tuesdayStartTime: res.openingHours.tuesday.start,
      tuesdayEndTime: res.openingHours.tuesday.end,
      wednesdayStartTime: res.openingHours.wednesday.start,
      wednesdayEndTime: res.openingHours.wednesday.end,
      thursdayStartTime: res.openingHours.thursday.start,
      thursdayEndTime: res.openingHours.thursday.end,
      fridayStartTime: res.openingHours.friday.start,
      fridayEndTime: res.openingHours.friday.end,
      saturdayStartTime: res.openingHours.saturday.start,
      saturdayEndTime: res.openingHours.saturday.end,
      sundayStartTime: res.openingHours.sunday.start,
      sundayEndTime: res.openingHours.sunday.end,
      socialMedias: res.socialMedia,
      photo: {uri: res.image},
      tag1: res.tag1,
      tag2: res.tag2,
    });
  }

  onSelectTime = (time) => {
    if(this.state.type == 'Monday'){
      if(this.state.startOrEnd == 'start'){
        this.setState({mondayStartTime: time, isTimePicker: false});
      }else {
        this.setState({mondayEndTime: time, isTimePicker: false});
      }
    }else if (this.state.type == 'Tuesday') {
      if (this.state.startOrEnd == 'start') {
        this.setState({tuesdayStartTime: time, isTimePicker: false});
      }else {
        this.setState({tuesdayEndTime: time, isTimePicker: false});
      }
    }else if (this.state.type == 'Wednesday') {
      if (this.state.startOrEnd == 'start') {
        this.setState({wednesdayStartTime: time, isTimePicker: false});
      }else {
        this.setState({wednesdayEndTime: time, isTimePicker: false});
      }
    }else if (this.state.type == 'Thursday') {
      if (this.state.startOrEnd == 'start') {
        this.setState({thursdayStartTime: time, isTimePicker: false});
      }else {
        this.setState({thursdayEndTime: time, isTimePicker: false});
      }
    }else if (this.state.type == 'Friday') {
      if (this.state.startOrEnd == 'start') {
        this.setState({fridayStartTime: time, isTimePicker: false});
      }else {
        this.setState({fridayEndTime: time, isTimePicker: false});
      }
    }else if (this.state.type == 'Saturday') {
      if (this.state.startOrEnd == 'start') {
        this.setState({saturdayStartTime: time, isTimePicker: false});
      }else {
        this.setState({saturdayEndTime: time, isTimePicker: false});
      }
    }else {
      if (this.state.startOrEnd == 'start') {
        this.setState({sundayStartTime: time, isTimePicker: false});
      }else {
        this.setState({sundayEndTime: time, isTimePicker: false});
      }
    }
  }

  onShowTimePicker = (type, startOrEnd) => {
    this.setState({isTimePicker: true, type: type, startOrEnd: startOrEnd});
  }

  onSaveVenueSetup = () => {
    var venueData = Object.assign(
      {
        name: this.state.name,
        info: this.state.venueInfo,
        managerName: this.state.managerName,
        type: this.state.venues.join(),
        location: this.state.location.join(),
        locationName: this.state.locationName,
        services: this.state.services.join(),
        numberEmployees: this.state.numberEmployees,
        openingHours: JSON.stringify({
          monday: {
            start: this.state.mondayStartTime,
            end: this.state.mondayEndTime
          },
          tuesday: {
            start: this.state.tuesdayStartTime,
            end: this.state.tuesdayEndTime
          },
          wednesday: {
            start: this.state.wednesdayStartTime,
            end: this.state.wednesdayEndTime
          },
          thursday: {
            start: this.state.thursdayStartTime,
            end: this.state.thursdayEndTime
          },
          friday: {
            start: this.state.fridayStartTime,
            end: this.state.fridayEndTime
          },
          saturday: {
            start: this.state.saturdayStartTime,
            end: this.state.saturdayEndTime
          },
          sunday: {
            start: this.state.sundayStartTime,
            end: this.state.sundayEndTime
          },
        }),
        socialMedia: this.state.socialMedias.join(),
        image: this.state.photo.uri,
        tag1: this.state.tag1,
        tag2: this.state.tag2
      }
    )

    const { navigate } = this.props.navigation;
    console.log(venueData);
     API.post('user/profile/venue', venueData).then((res)=>{
      console.log('venue', res);
      if (res.status) {
        if (this.props.navigation.state.params.editMode) {
          this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName: 'HomeEmployer'}]})
        } else {
          navigate('SearchStaff');
        }
      } else {
        alert('Something wrong');
      }
    });
  }

  getSocialMedia = (socialMedia, id, value) => {
    var $socialMedia  = this.state.socialMedias;
    switch (socialMedia) {
      case 'facebook':
        {
          if(!value) {
            var index = $socialMedia.indexOf(socialMedia);
            $socialMedia.splice(index, 1)
          }else {
            $socialMedia.push(socialMedia);
          }
        }
        break;
      case 'google':
      {
        if(!value) {
          var index = $socialMedia.indexOf(socialMedia);
          $socialMedia.splice(index, 1)
        }else {
          $socialMedia.push(socialMedia);
        }
      }
        break;
      case 'instagram':
      {
        if(!value) {
          var index = $socialMedia.indexOf(socialMedia);
          $socialMedia.splice(index, 1)
        }else {
          $socialMedia.push(socialMedia);
        }
      }
      break;
      default:
    }
  }

  getSelectedVenue = (venue, id, value) => {
    var $venue = this.state.venues;
    switch (venue) {
      case 'cafe':
        if (!value) {
          var index = $venue.indexOf(venue);
          $venue.splice(index, 1);
        } else {
          $venue.push(venue);
        }
        break;
      case 'restaurant':
        if (!value) {
          var index = $venue.indexOf(venue);
          $venue.splice(index, 1);
        } else {
          $venue.push(venue);
        }
        break;
      case 'bar':
        if (!value) {
          var index = $venue.indexOf(venue);
          $venue.splice(index, 1);
        } else {
          $venue.push(venue);
        }
        break;
      case 'club':
        if (!value) {
          var index = $venue.indexOf(venue);
          $venue.splice(index, 1);
        } else {
          $venue.push(venue);
        }
        break;
      case 'pub':
        if (!value) {
          var index = $venue.indexOf(venue);
          $venue.splice(index, 1);
        } else {
          $venue.push(venue);
        }
        break;
      default:
    }
  }

  // getStaffInterest = (staff, id, value) => {
  //   var $staff = this.state.staffs;
  //   switch (job) {
  //     case 'attender':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     case 'manager':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     case 'waiter':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     case 'kitchen':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     case 'barback':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     case 'host':
  //       {
  //         if(!value){
  //           var index = $staff.indexOf(staff);
  //           $staff.splice(index, 1);
  //         }else{
  //           $staff.push(staff);
  //         }
  //       }
  //       break;
  //     default:
  //   }
  // }

  renderOnShowLoading = () => {
    if(this.state.isLoading){
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
          <Text style={{fontSize: 12, marginTop: 5}}>Uploading photos...</Text>
        </View>
      )
    }
  }

  getServices = (service, id, value) => {
    var $service = this.state.services;
    switch (service) {
      case 'alcohol':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'drinks':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'food':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'pokies':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'cocktails':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'breakfast':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'lunch':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'dinner':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      case 'hotel':
        {
          if(!value){
            var index = $service.indexOf(service);
            $service.splice(index, 1);
          }else{
            $service.push(service);
          }
        }
        break;
      default:
    }
  }

  renderHeader = () => {
    const { navigate } = this.props.navigation;
    if (!this.props.isSettings) {
      if (!this.props.navigation.state.params.venueEditShortcut) {
        return(
          <ZHeader headerTitle="Welcome" subTitle="let's setup a few things" rightText="SKIP" onPress={()=>navigate('HomeEmployer', { name: 'dashboard' })} />
        )
      } else {
        return(
          <ZHeader headerTitle="Welcome" subTitle="let's setup a few things" leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()} />
        )
      }
    }
  }

  renderEventImage = () => {
    if(this.state.photo == ''){
      return (
        <View style={{marginTop: (Platform.OS === 'ios' ? 0 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="ios-camera-outline" size={60} color="#A3A3A3" style={{backgroundColor: 'transparent'}}  />
        </View>
      )
    }else{
      if(Platform.OS === 'ios'){
        return (
          <View style={{marginTop: (Platform.OS === 'ios' ? 0 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 350, height: 200}} resizeMode='cover' source={this.state.photo}/>
          </View>
        )
      }else {
        return (
          <View style={{alignSelf: 'center'}}>
            <Image style={{width: 350, height: 200}} resizeMode='cover' source={this.state.photo}/>
          </View>
        )
      }
    }
  }

  getImageUrl = (data) => {
    API.uploadImage(data, 'avatars', (res) => {
      console.log('avatar', res);
      this.setState({photo: {uri: res.secure_url}, isLoading: false});
    });
  }

  onShowCamera = () => {
    var options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality: 1,
      maxHeight: 400,
      maxWidth: 300
    };

    ImagePicker.showImagePicker(options, (response) => {
      this.setState({isLoading: true});
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({isLoading: false});
      }
      else if (response.error) {
        this.setState({isLoading: false});
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // this.setState({photo: {uri: response.uri }, isLoading: false});
        this.getImageUrl(response);
      }
    });
  }

  onPressImage = (image) => {
    this.setState({photo: image});
  }

  renderImages = () => {
    return this.state.imageSource.map((image, id) => {
      return(
        <View key={id}>
          <TouchableOpacity onPress={()=>this.onPressImage(image)}>
            <Image style={{width: 80, height: 80, marginRight: 5}} source={image} />
          </TouchableOpacity>
        </View>
      )
    })
  }

  onDayOff = (day) => {
    switch (day) {
      case 'monday':
        this.setState({monOff: this.state.monOff ?  false : true});
      break;
      case 'tuesday':
        this.setState({tueOff: this.state.tueOff ?  false : true});
      break;
      case 'wednesday':
        this.setState({wedOff: this.state.wedOff ?  false : true});
      break;
      case 'thursday':
        this.setState({thuOff: this.state.thuOff ?  false : true});
      break;
      case 'friday':
        this.setState({friOff: this.state.friOff ?  false : true});
      break;
      case 'saturday':
        this.setState({satOff: this.state.satOff ?  false : true});
      break;
      case 'sunday':
        this.setState({sunOff: this.state.sunOff ?  false : true});
      break;
      default:

    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let editMode = this.props.navigation.state.params.editMode;
    let location = `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&size=450x200&zoom=16&key=AIzaSyBcS3ZBzDWPfexr_D2IY9o7RX-H0XEvvWA`

    return (
      <View style={{flex: 1}}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

          {this.renderHeader()}

          <View style={styles.body}>
            <ZTextInput type="TextInput" placeholder="Venue name" value={this.state.name} onChangeText={(name)=>this.setState({name})} />
            <ZTextInput type="TextInput" placeholder="Venue information" value={this.state.venueInfo} onChangeText={(venueInfo)=>this.setState({venueInfo})} multiline />
            <ZTextInput type="TextInput" placeholder="Manager name" value={this.state.managerName}  onChangeText={(managerName)=>this.setState({managerName})} />
          </View>

          <View style={styles.body}>
          <ZHero text="Venue image" styles={{color: '#33314B'}}/>

            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 200, marginVertical: 10, backgroundColor: '#F5F5F5'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {this.onShowCamera()}}>
                  {this.renderEventImage()}
                </TouchableOpacity>
              </View>
            </View>
            <ZMuteText text="Or select from a few of ours selections below"/>
            <ZSliderCard>
              {this.renderImages()}
            </ZSliderCard>
          </View>

          <View style={styles.body}>
          <ZHero text="Venue description" styles={{color: '#33314B'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '48%'}}>
                <ZTextInput type="TextInput" placeholder="Tag 1" onChangeText={(tag1)=>this.setState({tag1})} value={this.state.tag1} />
              </View>
              <View style={{width: '48%'}}>
                <ZTextInput type="TextInput" placeholder="Tag 2" onChangeText={(tag2)=>this.setState({tag2})} value={this.state.tag2} />
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <ZHero text="Type of venue" styles={{color: '#33314B'}}/>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
              <ZSliderCard>
                <ZIcon photoUrlSelected={require('../Assets/cafeiconselected.png')} photoUrlUnSelected={require('../Assets/cafeicon.png')} iconText="Cafe" isSelected={editMode ? this.state.isCafe : false} selectedIcon={(value)=>this.getSelectedVenue('cafe', 0, value)} />
                <ZIcon photoUrlSelected={require('../Assets/menuiconselected.png')} photoUrlUnSelected={require('../Assets/menuicon.png')} iconText="Restaurant" isSelected={editMode ? this.state.isRestaurant : false} selectedIcon={(value)=>this.getSelectedVenue('restaurant', 1, value)} />
                <ZIcon photoUrlSelected={require('../Assets/barsiconselected.png')} photoUrlUnSelected={require('../Assets/barsicon.png')} iconText="Bar" isSelected={editMode ? this.state.isBar : false} selectedIcon={(value)=>this.getSelectedVenue('bar', 2, value)} />
                <ZIcon photoUrlSelected={require('../Assets/clubiconselected.png')} photoUrlUnSelected={require('../Assets/clubicon.png')} iconText="Club" isSelected={editMode ? this.state.isClub : false} selectedIcon={(value)=>this.getSelectedVenue('club', 3, value)} />
                <ZIcon photoUrlSelected={require('../Assets/pubiconselected.png')} photoUrlUnSelected={require('../Assets/pubicon.png')} iconText="Pub" isSelected={editMode ? this.state.isPub : false} selectedIcon={(value)=>this.getSelectedVenue('pub', 4, value)} />
              </ZSliderCard>
            </View>

          </View>

          <View style={styles.body}>
            <ZHero text="Location" styles={{color: '#33314B'}}/>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15}}>
              <View>
                <Icon name="ios-pin" size={20} color='gray' style={{marginTop: 15, marginRight: 5}} />
              </View>
              <View style={{width: '80%'}}>
                <ZTextInput type="TextInput" value={this.state.locationName} name="locationName" onChangeText={(value) => this.setState({locationName: value})} location/>
              </View>
            </View>

            <View style={{flex: 1, height: 200}}>
              <Image source={{uri: location}} style={{height: '100%', width: '100%'}}/>
            </View>
          </View>

          <View style={styles.body}>
            <ZHero text="Opening hours" styles={{color: '#33314B'}}/>
            <View style={{flexDirection: 'row', marginVertical: 10}}>

            <ZSliderCard>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('monday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.monOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.monOff ? 'OFF' : 'Monday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Monday', 'start')} disabled={this.state.monOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.monOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.monOff ? 'white' : 'black')}}>{moment(this.state.mondayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Monday', 'end')} disabled={this.state.monOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.monOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.monOff ? 'white' : 'black')}}>{moment(this.state.mondayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('tuesday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.tueOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.tueOff ? 'OFF' : 'Tuesday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Tuesday', 'start')} disabled={this.state.tueOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.tueOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.tueOff ? 'white' : 'black')}}>{moment(this.state.tuesdayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Tuesday', 'end')} disabled={this.state.tueOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.tueOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.tueOff ? 'white' : 'black')}}>{moment(this.state.tuesdayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('wednesday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.wedOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.wedOff ? 'OFF' : 'Wednesday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Wednesday', 'start')} disabled={this.state.wedOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.wedOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.wedOff ? 'white' : 'black')}}>{moment(this.state.wednesdayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Wednesday', 'end')} disabled={this.state.wedOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.wedOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.wedOff ? 'white' : 'black')}}>{moment(this.state.wednesdayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('thursday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.thuOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.thuOff ? 'OFF' : 'Thursday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Thursday', 'start')} disabled={this.state.thuOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.thuOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.thuOff ? 'white' : 'black')}}>{moment(this.state.thursdayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Thursday', 'end')} disabled={this.state.thuOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.thuOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.thuOff ? 'white' : 'black')}}>{moment(this.state.thursdayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('friday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.friOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.friOff ? 'OFF' : 'Friday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Friday', 'start')} disabled={this.state.friOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.friOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.friOff ? 'white' : 'black')}}>{moment(this.state.fridayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Friday', 'end')} disabled={this.state.friOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.friOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.friOff ? 'white' : 'black')}}>{moment(this.state.fridayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('saturday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.satOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.satOff ? 'OFF' : 'Saturday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Saturday', 'start')} disabled={this.state.satOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.satOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.satOff ? 'white' : 'black')}}>{moment(this.state.saturdayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Saturday', 'end')} disabled={this.state.satOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.satOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.satOff ? 'white' : 'black')}}>{moment(this.state.saturdayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginRight: 5}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={()=>this.onDayOff('sunday')}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.sunOff ? '#FF3D3D' : '#B3EDF2')}}>
                        <Text style={{fontSize: 14, marginVertical: 10}}>{this.state.sunOff ? 'OFF' : 'Sunday'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Sunday', 'start')} disabled={this.state.sunOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.sunOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.sunOff ? 'white' : 'black')}}>{moment(this.state.sundayStartTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('Sunday', 'end')} disabled={this.state.sunOff}>
                      <View style={{marginBottom: 5, padding: 5, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.sunOff ? '#EFB1B1' : '#F7F7F7')}}>
                        <Text style={{fontSize: 14, marginVertical: 10, color: (this.state.sunOff ? 'white' : 'black')}}>{moment(this.state.sundayEndTime).format('h A')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ZSliderCard>

            </View>
            <DateTimePicker
              mode="time"
              isVisible={this.state.isTimePicker}
              onConfirm={this.onSelectTime}
              onCancel={()=>this.setState({isTimePicker: false})}
            />

          </View>

          <View style={styles.body}>
            <ZHero text="Number of employees" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.numberEmployees} onChangeValue={(numberEmployees) => this.setState({numberEmployees})} />
            </View>
          </View>

          <View style={styles.body}>
            <ZHero text="Services" styles={{color: '#33314B'}}/>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 20}}>
              <ZIcon photoUrlSelected={require('../Assets/alcoholiconselected.png')} photoUrlUnSelected={require('../Assets/alcoholicon.png')} iconText="Alcohol" isSelected={editMode ? this.state.isAlcohol : false} selectedIcon={(value)=>this.getServices('alcohol', 0, value)} />
              <ZIcon photoUrlSelected={require('../Assets/drinkingiconselected.png')} photoUrlUnSelected={require('../Assets/drinkingicon.png')} iconText="Drinks" isSelected={editMode ? this.state.isDrinks : false} selectedIcon={(value)=>this.getServices('drinks', 1, value)} />
              <ZIcon photoUrlSelected={require('../Assets/foodselectedicon.png')} photoUrlUnSelected={require('../Assets/foodsicon.png')} iconText="Food" isSelected={editMode ? this.state.isFood : false} selectedIcon={(value)=>this.getServices('food', 2, value)} />
              <ZIcon photoUrlSelected={require('../Assets/pockieselected.png')} photoUrlUnSelected={require('../Assets/pockie.png')} iconText="Pokies" isSelected={editMode ? this.state.isPokies : false} selectedIcon={(value)=>this.getServices('pokies', 3, value)} />
              <ZIcon photoUrlSelected={require('../Assets/coctailiconselected.png')} photoUrlUnSelected={require('../Assets/coctailicon.png')} iconText="Cocktails" isSelected={editMode ? this.state.isCocktails : false} selectedIcon={(value)=>this.getServices('cocktails', 4, value)} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginBottom: 13}}>
              <ZIcon photoUrlSelected={require('../Assets/foodiconselected.png')} photoUrlUnSelected={require('../Assets/foodicon.png')} iconText="Breakfast" isSelected={editMode ? this.state.isBreakfast : false} selectedIcon={(value)=>this.getServices('breakfast', 5, value)} />
              <ZIcon photoUrlSelected={require('../Assets/drinkiconselected.png')} photoUrlUnSelected={require('../Assets/drinkicon.png')} iconText="Lunch" isSelected={editMode ? this.state.isLunch : false} selectedIcon={(value)=>this.getServices('lunch', 6, value)} />
              <ZIcon photoUrlSelected={require('../Assets/dinnericonselected.png')} photoUrlUnSelected={require('../Assets/dinnericon.png')} iconText="Dinner" isSelected={editMode ? this.state.isDinner : false} selectedIcon={(value)=>this.getServices('dinner', 7, value)} />
              <ZIcon photoUrlSelected={require('../Assets/pokieiconselected.png')} photoUrlUnSelected={require('../Assets/pokieicon.png')} iconText="Hotel" isSelected={editMode ? this.state.isHotel : false} selectedIcon={(value)=>this.getServices('hotel', 8, value)} />
            </View>
          </View>

          <View style={styles.body}>
            <ZHero text="Integrate with social media" styles={{color: '#33314B'}}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20, marginLeft: 20}}>
              <ZIcon photoUrlSelected={require('../Assets/facebookicon.png')} photoUrlUnSelected={require('../Assets/facebookicon.png')} iconText="Facebook" isSelected={editMode ? this.state.isFacebook : false} selectedIcon={(value)=> this.getSocialMedia('facebook', 0, value)} />
              <ZIcon photoUrlSelected={require('../Assets/googleicon.png')} photoUrlUnSelected={require('../Assets/googleicon.png')} iconText="Google" isSelected={editMode ? this.state.isGoogle : false} selectedIcon={(value)=> this.getSocialMedia('google', 1, value)} />
              <ZIcon photoUrlSelected={require('../Assets/instagramicon.png')} photoUrlUnSelected={require('../Assets/instagramicon.png')} iconText="Instagram" isSelected={editMode ? this.state.isInstagram : false} selectedIcon={(value)=> this.getSocialMedia('instagram', 2, value)} />
            </View>
          </View>

          <View style={styles.body}>
            <View style={{marginVertical: 10}}>
              <ZRoundedButton name="Save" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', width: 200, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSaveVenueSetup()} />
            </View>
          </View>
      </ScrollView>
      {this.renderOnShowLoading()}
      </View>
    );
  }

  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //   <ZMuteText text="Monday - Friday" styles={{marginVertical: 10}}/>
  //
  //   <View style={{flexDirection: 'row'}}>
  //     <TouchableOpacity onPress={()=>this.onShowTimePicker('weekdays', 'start')}>
  //       <ZText text={moment(this.state.selectedWeekdaysStartTime).format('h A') + ' - '}/>
  //     </TouchableOpacity>
  //
  //     <TouchableOpacity onPress={()=>this.onShowTimePicker('weekdays', 'end')}>
  //       <ZText text={moment(this.state.selectedWeekdaysEndTime).format('h A')}/>
  //     </TouchableOpacity>
  //   </View>
  //
  // </View>
  //
  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //   <ZMuteText text="Saturday - Sunday" styles={{marginVertical: 10}}/>
  //
  //   <View style={{flexDirection: 'row'}}>
  //     <TouchableOpacity onPress={()=>this.onShowTimePicker('weekends', 'start')}>
  //       <ZText text={moment(this.state.selectedWeekendsStartTime).format('h A') + ' - '}/>
  //     </TouchableOpacity>
  //
  //     <TouchableOpacity onPress={()=>this.onShowTimePicker('weekends', 'end')}>
  //       <ZText text={moment(this.state.selectedWeekendsEndTime).format('h A')}/>
  //     </TouchableOpacity>
  //   </View>
  //
  // </View>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  plainBody: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 10
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
