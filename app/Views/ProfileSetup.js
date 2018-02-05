
import ZFullHeader from 'ZFullHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZInput from 'ZInput';
import ZAvatar from 'ZAvatar';
import Validate from 'Validate';
import ZRoundedButton from 'ZRoundedButton';

import API from 'API';

import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSlider from 'react-native-multi-slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Form from 'react-native-form';
import ModalPicker from 'react-native-modal-picker';
import SelectMultiple from 'react-native-select-multiple';

import Geocoder from 'react-native-geocoder';

var ImagePicker = require('react-native-image-picker');
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
  Dimensions,
  ActivityIndicator,
  Modal,
  Picker,
  LayoutAnimation,
  Platform
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import ZHelper from 'ZHelper';
var {height, width} = Dimensions.get('window');

export default class ProfileSetup extends Component {

  constructor(props) {
    super(props);
    this.maxLength = 200;

    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      describeData: [],
      descText: '',
      isMale: false,
      isFemale: false,
      isOther: false,
      language: [],
      languageValue: '',
      rate1: 15,
      rate2: 20,
      certificateData: [],
      certificate: '',
      distance: '5km',
      photo: '',
      isLoading: false,
      isBirthdayPicker: false,
      selectedBirthday: new Date(),
      selectedGender: 'male',
      jobType: [],
      workType: '',
      workEligibility: '',
      location: '',
      isMondayMorning: false,
      isMondayAfternoon: false,
      isMondayEvening: false,
      isTuesdayMorning: false,
      isTuesdayAfternoon: false,
      isTuesdayEvening: false,
      isWedMorning: false,
      isWedAfternoon: false,
      isWedEvening: false,
      isThursMorning: false,
      isThursAfternoon: false,
      isThursEvening: false,
      isFridayMorning: false,
      isFridayAfternoon: false,
      isFridayEvening: false,
      isSaturdayMorning: false,
      isSaturdayAfternoon: false,
      isSaturdayEvening: false,
      isSundayMorning: false,
      isSundayAfternoon: false,
      isSundayEvening: false,
      textLength: 0,
      onShowMultiSelection: false,
      selectedQualities: [],
      isDurationPicker: false,
      startDuration: new Date(),
      endDuration: new Date(),
      FIELDS: [],
      textLengthAdInfo: 0,
      describeDataLabel: [],
      languageDataLabel: [],
      certificateDataLabel: [],
      workTypeData: [],
      workTypeDataLabel: [],
      workEligibilityData: [],
      workEligibilityDataLabel: [],
      dateControl: '',
      workExperienceArray: [],
      selectedDuration: ''
    }
  }

  componentDidMount = () => {
    if (this.props.navigation.state.params.editMode) {
      this.getExistingData();
    }
  }

  onClearPress = () => {
    this.setState({
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password',
      describeData: [],
      descText: '',
      isMale: false,
      isFemale: false,
      isOther: false,
      language: [],
      languageValue: '',
      rate1: '$15/hr',
      rate2: '$20/hr',
      certificateData: [],
      certificate: '',
      distance: '5km',
      photo: '',
      isLoading: false,
      isBirthdayPicker: false,
      selectedBirthday: new Date(),
      selectedGender: 'male',
      jobType: [],
      workType: '',
      workEligibility: '',
      location: '',
      isMondayMorning: false,
      isMondayAfternoon: false,
      isMondayEvening: false,
      isTuesdayMorning: false,
      isTuesdayAfternoon: false,
      isTuesdayEvening: false,
      isWedMorning: false,
      isWedAfternoon: false,
      isWedEvening: false,
      isThursMorning: false,
      isThursAfternoon: false,
      isThursEvening: false,
      isFridayMorning: false,
      isFridayAfternoon: false,
      isFridayEvening: false,
      isSaturdayMorning: false,
      isSaturdayAfternoon: false,
      isSaturdayEvening: false,
      isSundayMorning: false,
      isSundayAfternoon: false,
      isSundayEvening: false,
      textLength: 0,
      onShowMultiSelection: false,
      selectedQualities: [],
      isDurationPicker: false,
      startDuration: new Date(),
      endDuration: new Date(),
      FIELDS: [],
      textLengthAdInfo: 0,
      describeDataLabel: [],
      languageDataLabel: [],
      certificateDataLabel: [],
      workTypeData: [],
      workTypeDataLabel: [],
      workEligibilityData: [],
      workEligibilityDataLabel: [],
      companyValue: '',
      locationValue: '',
      positionValue: '',
      additionalValue: '',
      preflocationValue: '',
      fullname: '',
      bio: '',
    })
  }

  onValidateFields = (field, value) => {
    var $FIELDS = this.state.FIELDS;
    if(value.length > 0){
      $FIELDS[field] = value;
      this.setState({FIELDS: $FIELDS});
      console.log(this.state.FIELDS)
    }else{
      $FIELDS[field] = false;
      this.setState({FIELDS: $FIELDS});
      console.log(this.state.FIELDS)
    }
  }

  onCancelButton = (field) => {
    var $FIELDS = this.state.FIELDS;

    $FIELDS.splice($FIELDS.field);
    this.setState({FIELDS: $FIELDS, onShowMultiSelection: false, describeData: []})
    console.log($FIELDS)
  }

  static navigationOptions = {
    header: null,
  };

  onChangeText = (text) => {
    this.setState({
      textLength: text.length
    });
  }

  getExistingData = () => {
    let res = this.props.navigation.state.params.props.staffId;
//for gender
    let $gender = res.gender;
    if ($gender == 'male' ) {
      this.onSelectGender('male');
    } else if ($gender == 'female') {
      this.onSelectGender('female');
    } else {
      this.onSelectGender('other')
    }

    console.log('data', res);
    this.setState({
      photo: {uri: res.avatar},
      fullname: res.fullname,
      bio: res.bio,
      describeDataLabel: res.description,
      selectedBirthday: res.birthdate,
      selectedGender: $gender,
      languageDataLabel: res.languages,
      jobType: res.position,
      rate1: res.rateBadge,
      workType: res.frequency,
      workEligibility: res.eligibility,
      certificateDataLabel: res.certificates,
      location: res.preferredLocation,
      distance: res.preferredDistance,
      isMondayMorning: res.availability.monday.morning,
      isMondayAfternoon: res.availability.monday.afternoon,
      isMondayEvening: res.availability.monday.evening,
      isTuesdayMorning: res.availability.tuesday.morning,
      isTuesdayAfternoon: res.availability.tuesday.afternoon,
      isTuesdayEvening: res.availability.tuesday.evening,
      isWedMorning: res.availability.wednesday.morning,
      isWedAfternoon: res.availability.wednesday.afternoon,
      isWedEvening: res.availability.wednesday.evening,
      isThursMorning: res.availability.thursday.morning,
      isThursAfternoon: res.availability.thursday.afternoon,
      isThursEvening: res.availability.thursday.evening,
      isFridayMorning: res.availability.friday.morning,
      isFridayAfternoon: res.availability.friday.afternoon,
      isFridayEvening: res.availability.friday.evening,
      isSaturdayMorning: res.availability.saturday.morning,
      isSaturdayAfternoon: res.availability.saturday.afternoon,
      isSaturdayEvening: res.availability.saturday.evening,
      isSundayMorning: res.availability.sunday.morning,
      isSundayAfternoon: res.availability.sunday.afternoon,
      isSundayEvening: res.availability.sunday.evening,
      workExperienceArray: res.experiences
    });
  }

  onSaveProfile = () => {
    var profileData = Object.assign(
      this.refs.form.getValues(),
      {
       avatar: this.state.photo.uri,
       description: this.state.describeDataLabel.join(),
       birthdate: this.state.selectedBirthday.toString(),
       gender: this.state.selectedGender,
       languages: this.state.languageDataLabel.join(),
       position: this.state.jobType.join(),
       startRate: this.state.rate1,
       endRate: this.state.rate2,
       rateBadge: this.state.rate1+' - '+this.state.rate2,
       rateType: 'hourly',
       frequency: this.state.workType,
       eligibility: this.state.workEligibility,
       certificates: this.state.certificateDataLabel.join(),
       preferredLocation: this.state.location,
       preferredDistance: this.state.distance,
       availability: JSON.stringify({
         monday: {
           morning: this.state.isMondayMorning,
           afternoon: this.state.isMondayAfternoon,
           evening: this.state.isMondayEvening
         },
         tuesday: {
           morning: this.state.isTuesdayMorning,
           afternoon: this.state.isTuesdayAfternoon,
           evening: this.state.isTuesdayEvening
         },
         wednesday: {
           morning: this.state.isWedMorning,
           afternoon: this.state.isWedAfternoon,
           evening: this.state.isWedEvening
         },
         thursday: {
           morning: this.state.isThursMorning,
           afternoon: this.state.isThursAfternoon,
           evening: this.state.isThursEvening
         },
         friday: {
           morning: this.state.isFridayMorning,
           afternoon: this.state.isFridayAfternoon,
           evening: this.state.isFridayEvening
         },
         saturday: {
           morning: this.state.isSaturdayMorning,
           afternoon: this.state.isSaturdayAfternoon,
           evening: this.state.isSaturdayEvening
         },
         sunday: {
           morning: this.state.isSundayMorning,
           afternoon: this.state.isSundayAfternoon,
           evening: this.state.isSundayEvening
         },
       }),
       experiences: JSON.stringify(this.state.workExperienceArray)
      },
    );

    console.log(profileData);

    const { navigate } = this.props.navigation;

    API.post('user/profile/staff', profileData).then((res)=>{
     //console.log(res);
     if(res.status){
       if (this.props.navigation.state.params.editMode) {
         this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Home', params: {avatar: this.state.photo}}]})
       } else {
         navigate('VenueSearch', {avatar: this.state.photo, browseVenues: true, fullname: this.props.navigation.state.params.fullname})
       }
     }else{
       alert('You must fill in all the required fields.');
       console.log(res);
     }
   });

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
      maxHeight: 200,
      maxWidth: 200
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

  searchLocation = () => {
    const { updateState } = this.props;
    // Address Geocoding
    Geocoder.geocodeAddress(this.state.searchLocation).then(res => {
      // console.log(res);
      if(res[0].streetName == null){
        updateState('UPDATE_LOCATION', {location: res[0].formattedAddress});
      }else{
        updateState('UPDATE_LOCATION', {location: res[0].streetName + ", " + res[0].countryCode});
      }
    })
    .catch(err => console.log(err));
  }

  onSelectJobType = (job, id, value) => {
    var $jobType = this.state.jobType;
    // console.log(job, value);
    switch (job) {
      case 'bartender':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
      case 'manager':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
      case 'waiter':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
        case 'chef':
          {
            if(!value){
              var index = $jobType.indexOf(job);
              $jobType.splice(index, 1);
            }else{
              $jobType.push(job);
            }
          }
          break;
      case 'kitchen':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
      case 'barback':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
      case 'host':
        {
          if(!value){
            var index = $jobType.indexOf(job);
            $jobType.splice(index, 1);
          }else{
            $jobType.push(job);
          }
        }
        break;
      default:
    }
    this.onValidateFields('position', this.state.jobType);
  }

  onSelectSchedule = (day, daytime) => {
    switch (day) {
      case 'Monday':
        {
          if(daytime == 'Morning'){
            if(this.state.isMondayMorning){
              this.setState({isMondayMorning: false});
            }else{
              this.setState({isMondayMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isMondayAfternoon){
              this.setState({isMondayAfternoon: false});
            }else{
              this.setState({isMondayAfternoon: true});
            }
          }else{
            if(this.state.isMondayEvening){
              this.setState({isMondayEvening: false});
            }else{
              this.setState({isMondayEvening: true});
            }
          }
        }
        break;
      case 'Tuesday':
        {
          if(daytime == 'Morning'){
            if(this.state.isTuesdayMorning){
              this.setState({isTuesdayMorning: false});
            }else{
              this.setState({isTuesdayMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isTuesdayAfternoon){
              this.setState({isTuesdayAfternoon: false});
            }else{
              this.setState({isTuesdayAfternoon: true});
            }
          }else{
            if(this.state.isTuesdayEvening){
              this.setState({isTuesdayEvening: false});
            }else{
              this.setState({isTuesdayEvening: true});
            }
          }
        }
        break;
      case 'Wednesday':
        {
          if(daytime == 'Morning'){
            if(this.state.isWedMorning){
              this.setState({isWedMorning: false});
            }else{
              this.setState({isWedMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isWedAfternoon){
              this.setState({isWedAfternoon: false});
            }else{
              this.setState({isWedAfternoon: true});
            }
          }else{
            if(this.state.isWedEvening){
              this.setState({isWedEvening: false});
            }else{
              this.setState({isWedEvening: true});
            }
          }
        }
        break;
      case 'Thursday':
        {
          if(daytime == 'Morning'){
            if(this.state.isThursMorning){
              this.setState({isThursMorning: false});
            }else{
              this.setState({isThursMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isThursAfternoon){
              this.setState({isThursAfternoon: false});
            }else{
              this.setState({isThursAfternoon: true});
            }
          }else{
            if(this.state.isThursEvening){
              this.setState({isThursEvening: false});
            }else{
              this.setState({isThursEvening: true});
            }
          }
        }
        break;
      case 'Friday':
        {
          if(daytime == 'Morning'){
            if(this.state.isFridayMorning){
              this.setState({isFridayMorning: false});
            }else{
              this.setState({isFridayMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isFridayAfternoon){
              this.setState({isFridayAfternoon: false});
            }else{
              this.setState({isFridayAfternoon: true});
            }
          }else{
            if(this.state.isFridayEvening){
              this.setState({isFridayEvening: false});
            }else{
              this.setState({isFridayEvening: true});
            }
          }
        }
        break;
      case 'Saturday':
        {
          if(daytime == 'Morning'){
            if(this.state.isSaturdayMorning){
              this.setState({isSaturdayMorning: false});
            }else{
              this.setState({isSaturdayMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isSaturdayAfternoon){
              this.setState({isSaturdayAfternoon: false});
            }else{
              this.setState({isSaturdayAfternoon: true});
            }
          }else{
            if(this.state.isSaturdayEvening){
              this.setState({isSaturdayEvening: false});
            }else{
              this.setState({isSaturdayEvening: true});
            }
          }
        }
        break;
      case 'Sunday':
        {
          if(daytime == 'Morning'){
            if(this.state.isSundayMorning){
              this.setState({isSundayMorning: false});
            }else{
              this.setState({isSundayMorning: true});
            }
          }else if (daytime == 'Afternoon') {
            if(this.state.isSundayAfternoon){
              this.setState({isSundayAfternoon: false});
            }else{
              this.setState({isSundayAfternoon: true});
            }
          }else{
            if(this.state.isSundayEvening){
              this.setState({isSundayEvening: false});
            }else{
              this.setState({isSundayEvening: true});
            }
          }
        }
        break;
      default:

    }
  }

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

  // onAddItem = () => {
  //   var obj = this.state.describeData;
  //   if(obj.length < 3){
  //     if(this.state.descText == ''){
  //       alert('Please describe yourself.');
  //     }else{
  //       obj.push(this.state.descText);
  //       this.setState({describeData: obj, descText: ''});
  //       this.refs['descText'].clear();
  //     }
  //   }
  // }

  onShowSelectionPicker = (type) => {
    this.setState({selectionType: type, onShowMultiSelection: true});
  }

  onRemoveItem = (id) => {
    var obj = this.state.describeData;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({describeData: obj});
      this.onValidateFields('describe', []);
    }
  }

  renderDescribeYourself = () => {
    return (
      <Validate isValidated={this.state.FIELDS.describe} margin={false}>
        <TouchableOpacity onPress={()=>this.onShowSelectionPicker('qualities')}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingRight: 12}}>
          <TextInput underlineColorAndroid="transparent" ref={'descText'} editable={false} placeholder="Describe yourself in 3 words" style={{width: '100%', height: 40, fontSize: 14}} onChangeText={(descText)=>this.setState({descText})} />
          <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
          </View>
        </View>
        </TouchableOpacity>
      </Validate>
    )
  }

  renderDescribeItems = () => {
    return this.state.describeData.map((res, id)=>{
      return (
        <View key={id} style={{marginBottom: 5}}>
          <View style={{flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingLeft: 10, marginRight: 20}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#45434F', flex: 1}}>{res.value}</Text>
            <TouchableOpacity onPress={()=>this.onRemoveItem(id)}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  onSelectDurationPicker = (date) => {
    let type = this.state.selectedDuration;

    if (type == 'start') {
      this.setState({startDuration: date, isDurationPicker: false});
    } else {
      this.setState({endDuration: date, isDurationPicker: false});
    }
  }

  onSelectBirthdayPicker = (date) => {
    this.setState({selectedBirthday: date, isBirthdayPicker: false});
    this.onValidateFields('birthdate', 'birthdate');
  }

  onNextDate = () => {
    var d = this.state.selectedBirthday;
    d.setFullYear(d.getFullYear() + 1);
    this.setState({selectedBirthday: d});
  }

  onPrevDate = () => {
    var d = this.state.selectedBirthday;
    d.setFullYear(d.getFullYear() - 1);
    this.setState({selectedBirthday: d});
  }

  renderBirthdate = () => {
    return (
      <Validate isValidated={this.state.FIELDS.birthdate}>
        <TouchableOpacity onPress={()=>this.setState({isBirthdayPicker: true})}>
          <View>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Birthdate</Text>
            <View style={{flex: 1, flexDirection: 'row', width: '60%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 5, paddingHorizontal: 10}}>
              {/**<TextInput underlineColorAndroid="transparent" editable={false} value={moment(this.state.selectedBirthday).format('DD / MMMM / YYYY')} autoCorrect={false} spellCheck={false} style={{textAlign: 'center', height: 40, width: 160, color: '#33314B', fontSize: 13, fontWeight: '500'}} />**/}
              <Text style={{textAlign: 'center', color: '#33314B', fontSize: 13, fontWeight: '500', marginRight: 8, flex: 1}}>{moment(this.state.selectedBirthday).format('DD / MMMM / YYYY')}</Text>
              <View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <TouchableOpacity onPress={() => this.onNextDate()}>
                    <View style={{flex: 1}}>
                        <Icon name="ios-arrow-up" size={15} style={{backgroundColor: 'transparent'}} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onPrevDate()}>
                    <View style={{flex: 1}}>
                        <Icon name="ios-arrow-down" size={15} style={{backgroundColor: 'transparent'}} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Validate>
    )
  }

  onSelectGender = (gender) => {

    switch (gender) {
      case 'male':
        {
          this.setState({isMale: true, isFemale: false, isOther: false, selectedGender: gender});
        }
        break;
      case 'female':
        {
          this.setState({isMale: false, isFemale: true, isOther: false, selectedGender: gender});
        }
        break;
      case 'other':
        {
          this.setState({isMale: false, isFemale: false, isOther: true, selectedGender: this.state.otherGender});
        }
        break;
      default:
    }
    this.onValidateFields('gender', gender);
  }

  renderButtonMale = (icon, text) => {
    if(this.state.isMale){
      return (
        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectGender('male')}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#5DD9E9', marginRight: 5}}>
            <Icon name={icon} size={15} color="white" style={{backgroundColor: 'transparent', marginRight: 8}} />
            <Text style={{fontSize: 14, color: 'white'}}>{text}</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      if (this.state.isOther) {
        return (
          <TouchableOpacity onPress={()=>this.onSelectGender('male')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', marginRight: 5}}>
              <Icon name={icon} size={15} color="#7B7A81" style={{backgroundColor: 'transparent'}} />
            </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectGender('male')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', marginRight: 5}}>
              <Icon name={icon} size={15} color="#7B7A81" style={{backgroundColor: 'transparent', marginRight: 8}} />
              <Text style={{fontSize: 14, color: '#7B7A81'}}>{text}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
  }

  renderButtonFemale = (icon, text) => {
    if(this.state.isFemale){
      return (
        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectGender('female')}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#5DD9E9', marginRight: 5}}>
            <Icon name={icon} size={15} color="white" style={{backgroundColor: 'transparent', marginRight: 8}} />
            <Text style={{fontSize: 14, color: 'white'}}>{text}</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      if (this.state.isOther) {
        return (
          <TouchableOpacity onPress={()=>this.onSelectGender('female')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', marginRight: 5}}>
              <Icon name={icon} size={15} color="#7B7A81" style={{backgroundColor: 'transparent'}} />
            </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectGender('female')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', marginRight: 5}}>
              <Icon name={icon} size={15} color="#7B7A81" style={{backgroundColor: 'transparent', marginRight: 8}} />
              <Text style={{fontSize: 14, color: '#7B7A81'}}>{text}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
  }

  renderButtonOther = () => {
    if(this.state.isOther){
      return (
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>this.onSelectGender('other')}>
          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#5DD9E9', marginRight: 5}}>
            <Text style={{fontSize: 14, color: 'white'}}>Other</Text>
          </View>
        </TouchableOpacity>
        <View style={{backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput placeholder="Type other gender" underlineColorAndroid="transparent" autoCorrect={false} spellCheck={false} style={{textAlign: 'center', height: 40, width: 160, color: '#7B7A81', fontSize: 14}} onChangeText={(otherGender)=>this.setState({otherGender})} />
        </View>
        </View>
      )
    }else{
      return (
        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectGender('other')}>
          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA'}}>
            <Text style={{fontSize: 14, color: '#7B7A81'}}>Other</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderGender = () => {
    return (
      <Validate isValidated={this.state.FIELDS.gender}>
        <View>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Sex</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            {this.renderButtonMale('ios-male', 'Male')}
            {this.renderButtonFemale('ios-female', 'Female')}
            {this.renderButtonOther()}
          </View>
        </View>
      </Validate>
    )
  }

  // onAddLanguage = () => {
  //   var obj = this.state.language;
  //   if(obj.length < 3){
  //     if(this.state.languageValue == ''){
  //       alert('Please add language.');
  //     }else{
  //       obj.push(this.state.languageValue);
  //       this.setState({language: obj, languageValue: ''});
  //       this.refs['language'].clear();
  //     }
  //   }
  // }

  onRemoveLanguage = (id) => {
    var obj = this.state.language;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({language: obj});
      this.onValidateFields('language', []);
    }
  }

  renderLanguage = () => {
    return (
      <Validate isValidated={this.state.FIELDS.language} margin={false}>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Spoken Languages</Text>
        <TouchableOpacity onPress={()=>this.onShowSelectionPicker('languages')}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingRight: 12}}>
            <TextInput underlineColorAndroid="transparent" ref={'language'} editable={false} placeholder="Select Language" style={{width: '100%', height: 40, fontSize: 14}} onChangeText={(languageValue)=>this.setState({languageValue})} />
            <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
            </View>
          </View>
        </TouchableOpacity>
      </Validate>
    )
  }

  renderSelectedLanguage = () => {

    var languages = [
      'Arabic',
      'Chinese',
      'Czech',
      'Dutch',
      'English',
      'Filipino',
      'Finnish',
      'French',
      'German',
      'Greek',
      'Indian',
      'Indonesian',
      'Japanese',
      'Korean',
      'Nepali',
      'Norweigan',
      'Polish',
      'Portuguese',
      'Russian',
      'Spanish',
      'Swedish',
      'Thai',
      'Turkish',
      'Vietnamese',

    ];

    var flags = [
      require('../Assets/flags/arabic.png'),
      require('../Assets/flags/china.png'),
      require('../Assets/flags/Czech.png'),
      require('../Assets/flags/Dutch.png'),
      require('../Assets/flags/British.png'),
      require('../Assets/flags/Philippines.png'),
      require('../Assets/flags/Finnish.png'),
      require('../Assets/flags/french.png'),
      require('../Assets/flags/German.png'),
      require('../Assets/flags/Greece.png'),
      require('../Assets/flags/india.png'),
      require('../Assets/flags/indonesia.png'),
      require('../Assets/flags/japan.png'),
      require('../Assets/flags/korea.png'),
      require('../Assets/flags/Nepal.png'),
      require('../Assets/flags/Norweigan.png'),
      require('../Assets/flags/Polish.png'),
      require('../Assets/flags/Portuguese.png'),
      require('../Assets/flags/Russian.png'),
      require('../Assets/flags/Spanish.png'),
      require('../Assets/flags/swedish.png'),
      require('../Assets/flags/Thailand.png'),
      require('../Assets/flags/Turkish.png'),
      require('../Assets/flags/Vietnam.png'),
    ];

    return this.state.language.map((res, id)=>{
      var index = languages.indexOf(res.value);
      return (
        <View key={id} style={{marginBottom: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, marginRight: 20}}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={flags[index]} style={{width: 30, height: 20, resizeMode: 'stretch', marginRight: 10}} />
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#45434F', flex: 1}}>{res.value}</Text>
            </View>
            <TouchableOpacity onPress={()=>this.onRemoveLanguage(id)}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  onSetDistance = (value) => {
    this.setState({distance: value+'km'});
    this.onValidateFields('distance', value);
  }

  onSetRate = (value) => {
    this.setState({rate1: value[0], rate2: value[1]});
    this.onValidateFields('rate', value);
  }

  renderCustomMarker = () => {
    return (<Image source={require('../Assets/Sliding-button.png')} style={{height: 16, width: 12}} resizeMode='contain'/>)
  }

  // onAddCertificateItem = () => {
  //   var obj = this.state.certificateData;
  //   if(obj.length < 3){
  //     if(this.state.certificate == ''){
  //       alert('Please input certificate.');
  //     }else{
  //       obj.push(this.state.certificate);
  //       this.setState({certificateData: obj, certificate: ''});
  //       this.refs['certificate'].clear();
  //     }
  //   }
  // }

  onRemoveCertificateItem = (id) => {
    var obj = this.state.certificateData;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({certificateData: obj});
      this.onValidateFields('certificate', []);
    }
  }

  onRemoveWorkTypeItem = (id) => {
    var obj = this.state.workTypeData;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({workTypeData: obj});
      this.onValidateFields('workType', []);
    }
  }

  onRemoveWorkEligibilityItem = (id) => {
    var obj = this.state.workEligibilityData;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({workEligibilityData: obj});
      this.onValidateFields('workEligibility', []);
    }
  }

  renderCertificate = () => {
    return (
      <Validate isValidated={this.state.FIELDS.certificate} margin={false}>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Licenses and Certifications</Text>
        <TouchableOpacity onPress={()=>this.onShowSelectionPicker('certificates')}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5'}}>
            <TextInput underlineColorAndroid="transparent" ref={'certificate'} editable={false} placeholder="Select" style={{flex: 1, height: 40, fontSize: 14}} onChangeText={(certificate)=>this.setState({certificate})} />
            <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
            </View>
          </View>
        </TouchableOpacity>
      </Validate>
    )
  }

  renderCertificationItems = () => {
    return this.state.certificateData.map((res, id)=>{
      return (
        <View key={id} style={{marginTop: 5}}>
          <View style={{flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 23}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#45434F', flex: 1}}>{res.value}</Text>
            <TouchableOpacity onPress={()=>this.onRemoveCertificateItem(id)}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  renderWorkType = () => {
    return(
      <Validate isValidated={this.state.FIELDS.workType}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.onShowSelectionPicker('workType')}>
            <View style={{width: 150, flexDirection: 'row', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 15}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#BABABA', flex: 1}}>Work Type</Text>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            {this.renderWorkTypeItem()}
          </View>
        </View>
      </Validate>
    )
  }

  renderWorkEligibility = () => {
    return(
      <Validate isValidated={this.state.FIELDS.workEligibility}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>this.onShowSelectionPicker('workEligibility')}>
            <View style={{width: 150, flexDirection: 'row', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 15}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#BABABA', flex: 1}}>Work Eligibility</Text>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            {this.renderWorkEligibilityItem()}
          </View>
        </View>
      </Validate>
    )
  }

  renderWorkEligibilityItem = () => {
    return this.state.workEligibilityData.map((res, id)=>{
      return (
        <View key={id}>
          <View style={{width: 140, flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#939199', flex: 1}}>{res.value}</Text>
            <TouchableOpacity onPress={()=>this.onRemoveWorkEligibilityItem(id)}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  renderWorkTypeItem = () => {
    return this.state.workTypeData.map((res, id)=>{
      return (
        <View key={id}>
          <View style={{width: 140, flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#939199', flex: 1}}>{res.value}</Text>
            <TouchableOpacity onPress={()=>this.onRemoveWorkTypeItem(id)}>
              <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  renderDay = (day) => {
    return (
      <View style={{flex: 1, width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#eee'}}>
        <Text style={{fontSize: 14, color: '#7B7A81'}}>{day}</Text>
      </View>
    )
  }

  renderDayType = (day) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#FAFAFA', borderWidth: 0.5, borderColor: '#eee'}}>
        <Text style={{fontSize: 10, color: '#7B7A81'}}>{day}</Text>
      </View>
    )
  }

  renderProfilePhoto = () => {
    if(this.state.photo == ''){
      return (
        <View style={{marginTop: (Platform.OS === 'ios' ? -65 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D8D8D8', width: 100, height: 100, borderRadius: 50}}>
          <Icon name="ios-camera-outline" size={60} color="#A3A3A3" style={{backgroundColor: 'transparent'}}  />
        </View>
      )
    }else{
      if(Platform.OS === 'ios'){
        return (
          <View style={{marginTop: (Platform.OS === 'ios' ? -65 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D8D8D8', width: 100, height: 100, borderRadius: 50}}>
            <Image style={{width: 100, height: 100, resizeMode: 'cover'}} borderRadius={50} source={this.state.photo}/>
          </View>
        )
      }else {
        return (
          <View style={{alignSelf: 'center'}}>
            <Image style={{width: 100, height: 100}} borderRadius={50} resizeMode='cover' source={this.state.photo}/>
          </View>
        )
      }

    }
  }

  onPickData = (option, type) => {
    if(type == 'workType'){
      this.setState({workType:option.label});
      this.onValidateFields('workType', option.label);
    }else{
      this.setState({workEligibility:option.label});
      this.onValidateFields('workEligibility', option.label);
    }
  }

  onRemoveData = (type) => {
    if(type == 'workType'){
      this.setState({workType: ''});
      this.onValidateFields('workType', '');
    }else{
      this.setState({workEligibility: ''});
      this.onValidateFields('workEligibility', '');
    }
  }

  onChangeLocation = (location) => {
    this.setState({location: location});
    this.onValidateFields('location', location);
  }

  onSelectionsChange = (selectedQualities) => {
    // selectedFruits is array of { label, value }
    // console.log(selectedQualities);
    if (this.state.selectionType == 'workType') {
      this.onValidateFields('workType', selectedQualities);
      this.setState({ workTypeData : selectedQualities});
    }else if (this.state.selectionType == 'workEligibility') {
      this.onValidateFields('workEligibility', selectedQualities);
      this.setState({ workEligibilityData : selectedQualities});
    }else if(this.state.selectionType == 'qualities'){
      if(selectedQualities.length > 3){
        alert('Please select 3 words only.')
      }else{
        this.onValidateFields('describe', selectedQualities);
        this.setState({ describeData : selectedQualities});
      }
    }else if (this.state.selectionType == 'languages') {
      this.onValidateFields('language', selectedQualities);
      this.setState({ language : selectedQualities});
    }else {
      this.onValidateFields('certificate', selectedQualities);
      this.setState({ certificateData : selectedQualities});
    }
  }

  onCancelSelectionsChange = (selectedQualities) => {

    if (this.state.selectionType == 'workType') {
      this.onValidateFields('workType', []);
      this.setState({onShowMultiSelection: false, workTypeData: []})
    }else if (this.state.selectionType == 'workEligibility') {
      this.onValidateFields('workEligibility', []);
      this.setState({onShowMultiSelection: false, workEligibilityData: []})
    }else if(this.state.selectionType == 'qualities'){
      this.onValidateFields('describe', []);
      this.setState({onShowMultiSelection: false, describeData: []})
    }else if (this.state.selectionType == 'languages') {
      this.onValidateFields('language', []);
      this.setState({onShowMultiSelection: false, language: []})
    }else {
      this.onValidateFields('certificate', []);
      this.setState({onShowMultiSelection: false, certificateData: []})
    }
  }

  onSelectMutiple = () => {
    if (this.state.selectionType == 'workType') {
      var data = this.state.workTypeDataLabel;
      this.state.workTypeData.map((res)=>{
        data.push(res.value);
      })
      this.setState({onShowMultiSelection: false, workTypeDataLabel: data});
    }else if (this.state.selectionType == 'workEligibility') {
      var data = this.state.workEligibilityDataLabel;
      this.state.workEligibilityData.map((res)=>{
        data.push(res.value);
      })
      this.setState({onShowMultiSelection: false, workEligibilityDataLabel: data});
    }
    else if (this.state.selectionType == 'qualities') {
      var data = this.state.describeDataLabel;
      this.state.describeData.map((res)=>{
        data.push(res.value);
      })
      this.setState({onShowMultiSelection: false, describeDataLabel: data});
    } else if (this.state.selectionType == 'languages') {
      var data = this.state.languageDataLabel;
      this.state.language.map((res)=>{
        data.push(res.value);
      })
      this.setState({onShowMultiSelection: false, languageDataLabel: data});
    } else {
      var data = this.state.certificateDataLabel;
      this.state.certificateData.map((res)=>{
        data.push(res.value);
      })
      this.setState({onShowMultiSelection: false, certificateDataLabel: data});
    }

  }

  renderMultiSelection = () => {
    var workType = [
      'Full Time',
      'Part Time',
      'Casual',
      'Event'
    ];
    var workEligibility = [
      'Citizen',
      'Working Visa'
    ];
    var qualities = [
      'Nightowl',
      'mixologist',
      'hardworker',
      'productive',
      'proactive',
      'professional',
      'quick',
      'fast',
      'manager',
      'outgoing',
      'patient',
      'hipster',
      'rocker',
      'fun',
      'active',
      'positive',
      'sporty',
      'quirky',
      'metalhead',
      'raver',
      'honest',
      'committed',
      'social',
      'friendly',
      'traditional',
      'green',
      'vibrant',
      'funny',
      'artistic',
      'strong',
      'sophisticated',
      'skilled',
      'flexible',
      'leader',
      'inventive',
      'awesome',
      'muso',
      'suit'
    ];

    var languages = [
      'Arabic',
      'Chinese',
      'Czech',
      'Dutch',
      'English',
      'Filipino',
      'Finnish',
      'French',
      'German',
      'Greek',
      'Indian',
      'Indonesian',
      'Japanese',
      'Korean',
      'Nepali',
      'Norweigan',
      'Polish',
      'Portuguese',
      'Russian',
      'Spanish',
      'Swedish',
      'Thai',
      'Turkish',
      'Vietnamese',
    ];

    var certificates = [
      'Driver`s licence',
      'Responsible Service of Alcohol (RSA)',
      'Responsible Conduct of Gambling (RCG)',
      'Diploma of Hospitality Management',
      'Certificate 2 in Hospitality',
      'Certificate 3 in Hospitality',
      'Certificate 4 in Hospitality',
      'Certificate 3 in Events',
      'Accredited cocktail course',
      'Accredited food handling course',
      'Accredited food safety supervision',
      'Accredited Barista course',
      'Relevant Safety Certification',
      'First Aid Certification',
      'Working with children',
      'Police check',
      'Forklift licence',
    ];


    if(this.state.onShowMultiSelection){
      if (this.state.selectionType == 'workType') {
        return (
          <Modal transparent={true} visible={this.state.onShowMultiSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={workType} selectedItems={this.state.workTypeData} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onCancelSelectionsChange()} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }else if (this.state.selectionType == 'workEligibility') {
        return (
          <Modal transparent={true} visible={this.state.onShowMultiSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={workEligibility} selectedItems={this.state.workEligibilityData} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onCancelSelectionsChange()} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }else if(this.state.selectionType == 'qualities'){
        return (
          <Modal transparent={true} visible={this.state.onShowMultiSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={qualities} selectedItems={this.state.describeData} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onCancelSelectionsChange()} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }else if (this.state.selectionType == 'languages') {
        return (
          <Modal transparent={true} visible={this.state.onShowMultiSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={languages} selectedItems={this.state.language} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onCancelSelectionsChange()} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }else{
        return (
          <Modal transparent={true} visible={this.state.onShowMultiSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={certificates} selectedItems={this.state.certificateData} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onCancelSelectionsChange()} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }
    }

  }

  renderHeader = () => {
    if (!this.props.isSettings) {
      return (
        <ZFullHeader headerTitle="Profile Set up" subTitle="We need just a few details to get you started" leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()} />
      )
    } else {
      return(
        <View style={{marginTop: 80, backgroundColor: 'white', width: '100%'}}>
        </View>
      )
    }
  }

  onChangeTextAdInfo = (text) => {
    this.setState({
      textLengthAdInfo: text.length,
      additionalValue: text
    });
  }

  // <Validate isValidated={this.state.FIELDS.workType}>
  //   <View style={{flexDirection: 'row'}}>
  //     <ModalPicker data={data} onChange={(option)=>{ this.onPickData(option, 'workType') }}>
  //       <View style={{width: 150, flexDirection: 'row', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 15}}>
  //         <Text style={{fontSize: 14, fontWeight: '500', color: '#BABABA', flex: 1}}>Work Type</Text>
  //         <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
  //           <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
  //         </View>
  //       </View>
  //     </ModalPicker>
  //     <View style={{width: 140, flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10, opacity:(this.state.workType == '' ? 0 : 1)}}>
  //       <Text style={{fontSize: 14, fontWeight: '500', color: '#939199', flex: 1}}>{this.state.workType}</Text>
  //       <TouchableOpacity onPress={()=>this.onRemoveData('workType')}>
  //         <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
  //           <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // </Validate>
  //
  // <Validate isValidated={this.state.FIELDS.workEligibility}>
  //   <View style={{flexDirection: 'row', marginTop: 10}}>
  //     <ModalPicker data={data2} onChange={(option)=>{ this.onPickData(option, 'workEligibility')}}>
  //       <View style={{width: 150, flexDirection: 'row', padding: 5, paddingVertical: 10, paddingHorizontal: 10, marginRight: 15}}>
  //         <Text style={{fontSize: 14, fontWeight: '500', color: '#BABABA', flex: 1}}>Work Eligibility</Text>
  //         <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
  //           <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
  //         </View>
  //       </View>
  //     </ModalPicker>
  //     <View style={{width: 140, flexDirection: 'row', borderWidth: 1, borderColor:"#eee", backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 10, paddingHorizontal: 10, opacity:(this.state.workEligibility == '' ? 0 : 1)}}>
  //       <Text style={{fontSize: 14, fontWeight: '500', color: '#939199', flex: 1}}>Citizen</Text>
  //       <TouchableOpacity onPress={()=>this.onRemoveData('workEligibility')}>
  //         <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
  //           <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // </Validate>

  onAddExperiencePress = () => {
    var workExp = this.state.workExperienceArray
    var $workExp = {
      companyValue: this.state.companyValue,
      positionValue: this.state.positionValue,
      locationValue: this.state.locationValue,
      startDuration: this.state.startDuration,
      endDuration: this.state.endDuration,
      additionalValue: this.state.additionalValue,
    }

    workExp.push($workExp)
    this.setState({
      workExperienceArray: workExp,
      companyValue: '',
      positionValue: '',
      locationValue: '',
      startDuration: new Date(),
      endDuration: new Date(),
      additionalValue: '',
    })
    console.log('workexp', workExp);
  }

  renderWorkExperience = (val, key) => {
    return(
      <View key={key}>
        <View style={{marginVertical: 5, flexDirection: 'row'}}>
          <ZTextInput placeholder="Company" radius={false} onChangeText={(text) => this.setState({companyValue: text})} value={val.companyValue} styles={{flex: 1, marginRight: 5}} />
          <ZTextInput placeholder="Position" radius={false} onChangeText={(text) => this.setState({positionValue: text})} value={val.positionValue} styles={{flex: 1}} />
        </View>

        <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'flex-end'}}>
          <ZTextInput name="location" placeholder="Location" radius={false} onChangeText={(text) => this.setState({locationValue: text})} value={val.locationValue} styles={{flex: 1, marginRight: 5}} />

          <TouchableOpacity style={{flex: 1, marginTop: (Platform.OS === 'ios' ? 0 : 11)}} onPress={()=>this.setState({isDurationPicker: true})}>
            <View style={{marginRight: 5}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>From</Text>
              <View style={{backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 15, paddingLeft: 10}}>
                <Text style={{color: '#33314B', fontSize: 16}}>{moment(val.startDuration).format('MMM YYYY')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{flex: 1, marginTop: (Platform.OS === 'ios' ? 0 : 11)}} onPress={()=>this.setState({isDurationPicker: true})}>
            <View>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>To</Text>
              <View style={{backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 15, paddingLeft: 10}}>
                <Text style={{color: '#33314B', fontSize: 16}}>{moment(val.endDuration).format('MMM YYYY')}</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{marginVertical: 5}}>
          <ZTextInput placeholder="Additonal Information" multiline={true} maxLength={200} radius={false} onChangeText={(text) => this.setState({additionalValue: text})} value={val.additionalValue} styles={{flex: 1}}/>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#D4D4D4', textAlign: 'right'}}>{val.additionalValue ? val.additionalValue.length : 0}/200</Text>
        </View>
      </View>
    )
  }

  onPressDuration = (date) => {
    this.setState({isDurationPicker: true, selectedDuration: date});
  }

  render() {
    const { navigate } = this.props.navigation;
    const data = [
      {key: 0, label: 'Full Time'},
      {key: 1, label: 'Part Time'},
      {key: 2, label: 'Casual'},
      {key: 3, label: 'Event'}
    ];
    const data2 = [
      {key: 0, label: 'Citizen'},
      {key: 1, label: 'Working Visa'},
    ]
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={{flex: 1}}>
          <ScrollView style={[styles.container, {backgroundColor: (!this.props.isSettings ? '#F5F5F5' : 'white')}]} contentContainerStyle={styles.scrollContent}>

              {this.renderHeader()}

              <View style={styles.body}>
                <TouchableOpacity onPress={()=>this.onShowCamera()}>
                  {this.renderProfilePhoto()}
                </TouchableOpacity>
              </View>

              <View style={styles.body}>
                <ZHero text="Personal Information" styles={{color: '#33314B'}}/>
                <Form ref="form">
                  <Validate isValidated={this.state.FIELDS.fullname}>
                    <ZTextInput type="TextInput" name="fullname" placeholder="Full name" defaultValue={this.props.navigation.state.params ? this.props.navigation.state.params.fullname : ''} value={this.state.fullname} returnKeyType="next" radius={false} onChangeText={(value)=>this.onValidateFields('fullname', value)} />
                  </Validate>
                  <Validate isValidated={this.state.FIELDS.bio}>
                    <ZTextInput type="TextInput" name="bio" placeholder="Bio" value={this.state.bio} multiline={true} maxLength={200} returnKeyType="next" radius={false} onChangeText={(text)=>this.onChangeText(text)} onChangeText={(value)=>this.onValidateFields('bio', value)} />
                    <Text style={{fontSize: 12, fontWeight: '500', color: '#D4D4D4', textAlign: 'right'}}>{this.state.FIELDS.bio ? this.state.FIELDS.bio.length:0}/200</Text>
                  </Validate>
                </Form>
                <View style={{marginVertical: 10}}>
                  {this.renderDescribeYourself()}
                  {this.renderDescribeItems()}
                </View>

                <View style={{marginVertical: 10}}>
                  {this.renderBirthdate()}
                  <DateTimePicker
                    isVisible={this.state.isBirthdayPicker}
                    onConfirm={this.onSelectBirthdayPicker}
                    onCancel={()=>this.setState({isBirthdayPicker: false})}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  {this.renderGender()}
                </View>

                <View style={{marginVertical: 10}}>
                  {this.renderLanguage()}
                  {this.renderSelectedLanguage()}
                </View>
              </View>

              <View style={styles.body}>
                <ZHero text="Job Description" styles={{color: '#999999'}}/>
                <View style={{marginVertical: 20}}>
                  <ZHero text="Position" styles={{color: '#33314B', fontSize: 16, marginBottom: 5}}/>
                  <ZHero text="Tap on the position(s) that you are interested in" styles={{color: '#33314B', fontWeight: '300', fontSize: 12}}/>
                </View>
                <Validate isValidated={this.state.FIELDS.position}>
                  <View style={{flexDirection: 'row'}}>
                    <ZSliderCard>
                      <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartender" isSelected={this.state.isBartender} selectedIcon={(value)=>this.onSelectJobType('bartender', 0, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager" isSelected={this.state.isManager} selectedIcon={(value)=>this.onSelectJobType('manager', 1, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')} photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter/Waitress" isSelected={this.state.isWaiter} selectedIcon={(value)=>this.onSelectJobType('waiter', 2, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Chef" isSelected={this.state.isKitchen} selectedIcon={(value)=>this.onSelectJobType('chef', 3, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen Hand" isSelected={this.state.isKitchen} selectedIcon={(value)=>this.onSelectJobType('kitchen', 4, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')} photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barback" isSelected={this.state.isBarback} selectedIcon={(value)=>this.onSelectJobType('barback', 5, value)} />
                      <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')} photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host" isSelected={this.state.isHost} selectedIcon={(value)=>this.onSelectJobType('host', 6, value)} />
                    </ZSliderCard>
                  </View>
                </Validate>
              </View>

              <View style={styles.body}>
                <View>
                  <View style={{marginVertical: 10}}>
                    <Validate isValidated={this.state.FIELDS.rate}>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5}}>
                        <ZMuteText text="Hourly Rate" styles={{color: '#D0D0D0', textAlign: 'left', marginRight: 20, fontWeight: '500'}} />
                        <ZMuteText text={`$${this.state.rate1}/hr`} styles={{color: '#5E5DBB', textAlign: 'left', fontWeight: '500'}} />
                        <ZMuteText text=" - " styles={{color: '#5E5DBB', fontWeight: '500'}} />
                        <ZMuteText text={`$${this.state.rate2}/hr`} styles={{color: '#5E5DBB', textAlign: 'left', fontWeight: '500'}} />
                      </View>
                    </Validate>
                  </View>
                  <ZMuteText text="$150/h" styles={{color: '#D0D0D0', textAlign: 'right', marginBottom: 10, fontWeight: '500'}} />
                  <MultiSlider
                    min={15}
                    max={150}
                    step={1}
                    sliderLength={(width *.9)}
                    values={[15,20]}
                    onValuesChange={(value)=>this.onSetRate(value)}
                    selectedStyle={{backgroundColor: '#5FDAEB'}}
                    unselectedStyle={{backgroundColor: '#C4C4C4'}}
                    containerStyle={{height: 3}}
                    trackStyle={{height: 5}}
                    customMarker={this.renderCustomMarker}
                    allowOverlap
                    />
                  </View>


                  <View style={{marginVertical: 25}}>
                    {this.renderWorkType()}
                    {this.renderWorkEligibility()}
                  </View>

                  <View style={{marginVertical: 10}}>
                    {this.renderCertificate()}
                    {this.renderCertificationItems()}
                  </View>

                  <View style={{marginVertical: 10}}>
                    <Validate isValidated={this.state.FIELDS.location}>
                      <View>
                          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Preferred Location</Text>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10, height: 40, justifyContent: 'center'}}>
                              <TextInput ref={() => this.location} value={this.state.location} onChangeText={(location)=>this.onChangeLocation(location)}/>
                            </View>
                            <View style={{marginRight: 5, backgroundColor: '#F5F5F5', width: 30, height: 40, justifyContent: 'center', alignItems: 'center'}} >
                              <Icon name="ios-pin" size={25} color='#5D5CAA'/>
                            </View>
                          </View>
                      </View>
                    </Validate>
                  </View>

                  <View style={{marginVertical: 10}}>
                    <Validate isValidated={this.state.FIELDS.distance}>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 15}}>
                        <ZMuteText text="Distance" styles={{color: '#D0D0D0', textAlign: 'left', marginRight: 20, fontWeight: '500'}} />
                        <ZMuteText text={this.state.distance} styles={{color: '#5E5DBB', textAlign: 'left', fontWeight: '500'}} />
                      </View>
                    </Validate>
                    <MultiSlider
                      min={1}
                      max={100}
                      step={1}
                      sliderLength={(width *.9)}
                      values={[5]}
                      onValuesChange={(value)=>this.onSetDistance(value)}
                      selectedStyle={{backgroundColor: '#5FDAEB'}}
                      unselectedStyle={{backgroundColor: '#C4C4C4'}}
                      containerStyle={{height: 3}}
                      trackStyle={{height: 5}}
                      customMarker={this.renderCustomMarker}
                      />
                  </View>

                  <View style={{marginVertical: 15}}>
                    <ZHero text="Availability (Optional)" styles={{color: '#AFAFAF', fontWeight: '500', fontSize: 14, textAlign: 'left'}}/>
                    <ZHero text="Tap on the box to fill your available schedule" styles={{color: '#AFAFAF', fontWeight: '400', fontSize: 11, textAlign: 'left'}}/>

                    <View style={{marginVertical: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'transparent'}}>
                          <Text style={{fontSize: 10, color: '#7B7A81'}}>Monday</Text>
                        </View>
                        {this.renderDayType('Morning')}
                        {this.renderDayType('Afternoon')}
                        {this.renderDayType('Evening')}
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Monday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Monday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isMondayMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isMondayMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isMondayMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Monday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isMondayAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isMondayAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isMondayAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Monday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isMondayEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isMondayEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isMondayEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Tuesday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Tuesday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isTuesdayMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isTuesdayMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isTuesdayMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Tuesday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isTuesdayAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isTuesdayAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isTuesdayAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Tuesday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isTuesdayEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isTuesdayEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isTuesdayEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Wednesday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Wednesday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isWedMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isWedMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isWedMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Wednesday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isWedAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isWedAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isWedAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Wednesday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isWedEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isWedEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isWedEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Thursday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Thursday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isThursMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isThursMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isThursMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Thursday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isThursAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isThursAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isThursAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Thursday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isThursEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isThursEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isThursEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Friday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Friday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isFridayMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isFridayMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isFridayMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Friday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isFridayAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isFridayAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isFridayAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Friday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isFridayEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isFridayEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isFridayEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Saturday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Saturday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSaturdayMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSaturdayMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSaturdayMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Saturday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSaturdayAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSaturdayAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSaturdayAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Saturday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSaturdayEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSaturdayEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSaturdayEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        {this.renderDay('Sunday')}
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Sunday', 'Morning')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSundayMorning ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSundayMorning ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSundayMorning ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Sunday', 'Afternoon')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSundayAfternoon ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSundayAfternoon ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSundayAfternoon ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={()=>this.onSelectSchedule('Sunday', 'Evening')}>
                          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.isSundayEvening ? '#5FDAE9' :'white'), borderWidth: 0.5, borderColor: '#eee'}}>
                            <View style={{backgroundColor:(this.state.isSundayEvening ? '#5FDAE9' :'#D9F9FA'), width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                              <Icon name="ios-add" size={15} color={this.state.isSundayEvening ? '#5FDAE9' :'white'} style={{backgroundColor: 'transparent'}} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              </View>

              <View style={styles.body}>
                <ZHero text="Work Experience" styles={{color: '#999999'}}/>
                <View style={{marginVertical: 5}}>
                  <ZHero text="(Optional)" styles={{color: '#999999', fontWeight: '400', fontSize: 12}}/>
                </View>

                {
                  this.state.workExperienceArray.map((val, key) => {
                    return this.renderWorkExperience(val, key)
                  })
                }

                <View>
                  <Form ref="workExperience">
                    <View style={{marginVertical: 5, flexDirection: 'row'}}>
                      <ZTextInput type="TextInput" name="company" placeholder="Company" radius={false} onChangeText={(text) => this.setState({companyValue: text})} value={this.state.companyValue} styles={{flex: 1, marginRight: 5}} />
                      <ZTextInput type="TextInput" name="position" placeholder="Position" radius={false} onChangeText={(text) => this.setState({positionValue: text})} value={this.state.positionValue} styles={{flex: 1}} />
                    </View>

                    <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'flex-end'}}>
                      <ZTextInput type="TextInput" name="location" placeholder="Location" radius={false} onChangeText={(text) => this.setState({locationValue: text})} value={this.state.locationValue} styles={{flex: 1, marginRight: 5}} />

                      <TouchableOpacity style={{flex: 1, marginTop: (Platform.OS === 'ios' ? 0 : 11)}} onPress={()=>this.onPressDuration('start')}>
                        <View style={{marginRight: 5}}>
                          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>From</Text>
                          <View style={{backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 15, paddingLeft: 10}}>
                            <Text style={{color: '#33314B', fontSize: 16}}>{moment(this.state.startDuration).format('MMM YYYY')}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={{flex: 1, marginTop: (Platform.OS === 'ios' ? 0 : 11)}} onPress={()=>this.onPressDuration('end')}>
                        <View>
                          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>To</Text>
                          <View style={{backgroundColor: '#F5F5F5', padding: 5, paddingVertical: 15, paddingLeft: 10}}>
                            <Text style={{color: '#33314B', fontSize: 16}}>{moment(this.state.endDuration).format('MMM YYYY')}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                    </View>

                    <View style={{marginVertical: 5}}>
                      <ZTextInput type="TextInput" name="additionalInfo" placeholder="Additonal Information" multiline={true} maxLength={200} radius={false} value={this.state.additionalValue} styles={{flex: 1}} onChangeText={(text) => this.onChangeTextAdInfo(text)}/>
                      <Text style={{fontSize: 12, fontWeight: '500', color: '#D4D4D4', textAlign: 'right'}}>{this.state.textLengthAdInfo}/200</Text>
                    </View>
                  </Form>
                </View>

                <View style={{alignItems: 'center', padding: 50}}>
                  <TouchableOpacity onPress={()=>this.onAddExperiencePress()}>
                    <View style={{backgroundColor: '#625BBA', padding: 5, paddingHorizontal: 10, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: 130}}>
                      <Text style={{fontSize: 12, color: '#D9FFFF'}}>+ Add Experience</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  isVisible={this.state.isDurationPicker}
                  onConfirm={this.onSelectDurationPicker}
                  onCancel={()=>this.setState({isDurationPicker: false})}
                />


                <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <ZRoundedButton name="Save" styles={{marginRight: 20}} normalButtonStyle={{backgroundColor: '#64DAE7', width: 140, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSaveProfile()} />
                  <ZRoundedButton name="Clear all" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#CACACA', width: 140, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onClearPress()} />
                </View>

              </View>
              {this.renderMultiSelection()}
          </ScrollView>
          {this.renderOnShowLoading()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
