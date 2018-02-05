
import ZFullHeader from 'ZFullHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import Validate from 'Validate';
import ZRoundedButton from 'ZRoundedButton';
import ZPhoto from 'ZPhoto';
import Form from 'react-native-form';

import API from 'API';

import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import MultiSlider from 'react-native-multi-slider';

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
  Platform,
  LayoutAnimation
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

var {height, width} = Dimensions.get('window');
var ImagePicker = require('react-native-image-picker');

export default class ProfileSetup extends Component {

  constructor(props) {
    super(props);
    this.maxLength = 200;

    this.state = {
      isYes: false,
      isNo: false,
      textLength: 0,
      photo: '',
      photo2: '',
      imageSource: [],
      name: '',
      isCompany: false,
      companyName: '',
      location: '',
      locationName: '',
      about: '',
      eventTypes: [],
      isBirthday: false,
      isWedding: false,
      isConference: false,
      isMusicFestival: false,
      isFamilyEvent: false,
      isOther: false
    }
  }

  componentWillMount = () => {
    if (this.props.navigation.state.params.editMode) {
      this.getExistingData();
    }
  }

  getExistingData = () => {
    let res = this.props.navigation.state.params.userData.employer;
    let type = res.eventType;
    console.log('organizerId', res);

    birthday = type.indexOf('Birthday') > -1;
    wedding = type.indexOf('Wedding') > -1;
    conference = type.indexOf('Conference') > -1;
    musicFestival = type.indexOf('Music Festival') > -1;
    familyEvent = type.indexOf('Family Event') > -1;
    other = type.indexOf('Other') > -1;

    if (birthday) { this.setState({isBirthday: birthday}) }
    if (wedding) { this.setState({isWedding: wedding}) }
    if (conference) { this.setState({isConference: conference}) }
    if (musicFestival) { this.setState({isMusicFestival: musicFestival}) }
    if (familyEvent) { this.setState({isFamilyEvent: familyEvent}) }
    if (other) { this.setState({isOther: other}) }

    this.setState({
      name: res.name,
      prevCompany: res.isCompany,
      isCompany: res.isCompany,
      companyName: res.companyName,
      locationName: res.locationName,
      about: res.about,
      eventTypes: res.eventType,
      photo: {uri: res.image},
      photo2: {uri: res.image}
    })
  }

  onSaveEvent = () => {
    // this.props.navigation.navigate('HomeEmployer');
    var organizerData = Object.assign(
      {
        name: this.state.name,
        isCompany: (this.state.isCompany) ? '1' : '0',
        companyName: this.state.companyName,
        location: '14.6819, 121.0944',
        locationName: this.state.locationName,
        about: this.state.about,
        eventType: this.state.eventTypes.join(),
        image: this.state.photo2.uri
      }
    )
    console.log(organizerData);
    API.post('user/profile/organizer', organizerData).then((res) =>{
      console.log(res)
      if(res.status){
        // this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]});
        this.props.navigation.navigate('CreatEvent', {isOrganizer: true});
      }else {
        alert('Something wrong');
      }
    });
  }

  static navigationOptions = {
    header: null,
  };

  getEventType = (eventType, id, value) => {
    var $eventType = this.state.eventTypes;
    switch (eventType){
      case 'Birthday':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      case 'Wedding':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      case 'Conference':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      case 'Music Festival':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      case 'Family Event':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      case 'Other':
      {
        if(!value){
          var index = $eventType.indexOf(eventType);
          $eventType.splice(index, 1)
        }else {
          $eventType.push(eventType);
        }
      }
      break;
      default:
    }
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
        this.setState({photo: {uri: response.uri }, isLoading: false});
        // this.getImageUrl(response.uri);
      }
    });
  }

  getImageUrl = (data) => {
    API.uploadImage(data, 'avatars', (res) => {
      console.log('avatar', res);
      this.setState({photo2: {uri: res.secure_url}, isLoading: false});
    });
  }

  onShowCamera2 = () => {
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
        this.setState({photo2: {uri: response.uri }, isLoading: false});
        // this.setState({imageSource: this.state.imageSource.concat(source), isLoading: false});
        this.getImageUrl(response);
      }
    });
  }

  onValidateFields = (field, value) => {
    console.log('VALIDATION', field, value);
    var $FIELDS = this.state.FIELDS;
    if(value.length > 0){
      $FIELDS[field] = true;
      this.setState({FIELDS: $FIELDS});
    }else{
      $FIELDS[field] = false;
      this.setState({FIELDS: $FIELDS});
    }
  }

  onChangeText = (text) => {
    this.setState({
      textLength: text.length
    });
  }

  onSelectGender = (gender) => {

    switch (gender) {
      case 'yes':
        {
          this.setState({isYes: true, isNo: false, isCompany: true});
        }
        break;
      case 'no':
        {
          this.setState({isYes: false, isNo: true, isCompany: false});
        }
        break;
      default:

    }
  }

  onCompany = (type) => {
    switch (type) {
      case 'yes':
      {
        this.setState({prevCompany: true, isCompany: true});
      }
        break;
      case 'no':
      {
        this.setState({prevCompany: false, companyName: '', isCompany: false});
      }
        break;
      default:

    }
  }

  renderButtonYes = () => {
    // if(this.state.isYes){
    //   return (
    //     <TouchableOpacity onPress={()=>this.onSelectGender('yes')}>
    //       <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#5DD9E9', marginRight: 10}}>
    //         <Text style={{fontSize: 14, color: 'white'}}>Yes</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )
    // }else{
    //   return (
    //     <TouchableOpacity onPress={()=>this.onSelectGender('yes')}>
    //       <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA', marginRight: 10}}>
    //         <Text style={{fontSize: 14, color: '#7B7A81'}}>Yes</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )
    // }
    return (
      <TouchableOpacity onPress={()=>this.onCompany('yes')}>
        <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (this.state.prevCompany ? '#5DD9E9' : '#FAFAFA'), marginRight: 10}}>
          <Text style={{fontSize: 14, color: (this.state.prevCompany ? 'white' : '#7B7A81')}}>Yes</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderButtonNo = () => {
    // if(this.state.isNo){
    //   return (
    //     <TouchableOpacity onPress={()=>this.onSelectGender('no')}>
    //       <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#5DD9E9'}}>
    //         <Text style={{fontSize: 14, color: 'white'}}>No</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )
    // }else{
    //   return (
    //     <TouchableOpacity onPress={()=>this.onSelectGender('no')}>
    //       <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: '#FAFAFA'}}>
    //         <Text style={{fontSize: 14, color: '#7B7A81'}}>No</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )
    // }
    return (
      <TouchableOpacity onPress={()=>this.onCompany('no')}>
        <View style={{width: 100, justifyContent: 'center', alignItems: 'center', padding: 10, paddingVertical: 15, backgroundColor: (!this.state.prevCompany ? '#5DD9E9' : '#FAFAFA')}}>
          <Text style={{fontSize: 14, color: (!this.state.prevCompany ? 'white' : '#7B7A81')}}>No</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderCompanyName = () => {
    if(this.state.isCompany){
      return (
        <View style={{marginVertical: 10}}>
          <ZTextInput placeholderInside="Your Company name" value={this.state.companyName} name="name" onChangeText={(value) => this.setState({companyName: value})} radius={false} />
        </View>
      )
    }
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
            <Image style={{width: 100, height: 100, resizeMode: 'stretch'}} borderRadius={50} source={this.state.photo}/>
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

  renderOrganiserPhoto = () => {
    if(this.state.photo2 == ''){
      return (
        <View style={{marginTop: (Platform.OS === 'ios' ? 0 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="ios-camera-outline" size={60} color="#A3A3A3" style={{backgroundColor: 'transparent'}}  />
        </View>
      )
    }else{
      if(Platform.OS === 'ios'){
        return (
          <View style={{marginTop: (Platform.OS === 'ios' ? 0 : 0 ), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 350, height: 200}} resizeMode='cover' source={this.state.photo2}/>
          </View>
        )
      }else {
        return (
          <View style={{alignSelf: 'center'}}>
            <Image style={{width: 350, height: 200}} resizeMode='cover' source={this.state.photo2}/>
          </View>
        )
      }
    }
  }

  onPressImage = (image) => {
    this.setState({photo2: image});
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

  renderHeader = () => {
    if (!this.props.isSettings) {
      return(
        <ZFullHeader headerTitle="Create Event Organiser" subTitle="We need just a few details to get you started" leftIcon="ios-arrow-round-back-outline" leftIconColor="white" leftIconPress={()=>this.props.navigation.goBack()} />
      )
    }else {
      return(
        <View style={{marginTop: 80, backgroundColor: 'white', width: '100%'}}>
        </View>
      )
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    const { navigate } = this.props.navigation;
    const placeholderOrganiser = `Organiser's name`;
    let editMode = this.props.navigation.state.params.editMode;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={[styles.container, {backgroundColor: (!this.props.isSettings ? '#F5F5F5' : 'white')}]} contentContainerStyle={styles.scrollContent}>

            {this.renderHeader()}

            <View style={styles.body}>
              <TouchableOpacity onPress={() => this.onShowCamera()}>
                {this.renderProfilePhoto()}
              </TouchableOpacity>
            </View>

            <View style={styles.body}>

              <ZTextInput placeholderInside="Organiser Name" value={this.state.name} onChangeText={(value)=>this.setState({name: value})} radius={false} />

              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Company</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {this.renderButtonYes()}
                  {this.renderButtonNo()}
                </View>
              </View>

              {this.renderCompanyName()}

              <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Location</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10, height: 40, justifyContent: 'center'}}>
                    <TextInput placeholder='Enter Location' value={this.state.locationName} onChangeText={(value) => this.setState({locationName: value})}/>
                  </View>
                  <View style={{marginRight: 5, backgroundColor: '#F5F5F5', width: 30, height: 40, justifyContent: 'center', alignItems: 'center'}} >
                    <Icon name="ios-pin" size={25} color='#5D5CAA'/>
                  </View>
                </View>
              </View>

              <View>
                <ZTextInput type="TextInput" value={this.state.about} name="about" placeholder="About you/ Company" multiline={true} maxLength={200} returnKeyType="next" radius={false} onChangeText={(value) => this.setState({about: value})} />
                <Text style={{fontSize: 12, fontWeight: '500', color: '#D4D4D4', textAlign: 'right'}}>{this.state.textLength}/200</Text>
              </View>

            </View>

            <View style={styles.body}>
              <ZHero text="Event Type" styles={{color: '#999999'}}/>

              <View style={{flexDirection: 'row'}}>
                <ZSliderCard>
                  <ZIcon photoUrlSelected={require('../Assets/birthdayiconselected.png')} photoUrlUnSelected={require('../Assets/birthdayicon.png')} iconText="Birthday" isSelected={editMode ? this.state.isBirthday : false} selectedIcon={(value) => this.getEventType('Birthday', 0, value)} />
                  <ZIcon photoUrlSelected={require('../Assets/weddingiconselected.png')} photoUrlUnSelected={require('../Assets/weddingicon.png')} iconText="Wedding" isSelected={editMode ? this.state.isWedding : false} selectedIcon={(value) => this.getEventType('Wedding', 1, value)} />
                  <ZIcon photoUrlSelected={require('../Assets/conferenceiconselected.png')} photoUrlUnSelected={require('../Assets/conferenceicon.png')} iconText="Conference" isSelected={editMode ? this.state.isConference : false} selectedIcon={(value) => this.getEventType('Conference', 2, value)} />
                  <ZIcon photoUrlSelected={require('../Assets/clubiconselected.png')} photoUrlUnSelected={require('../Assets/clubicon.png')} iconText="Music Festival" isSelected={editMode ? this.state.isMusicFestival : false} selectedIcon={(value) => this.getEventType('Music Festival', 3, value)} />
                  <ZIcon photoUrlSelected={require('../Assets/pubiconselected.png')} photoUrlUnSelected={require('../Assets/pubicon.png')} iconText="Family Event" isSelected={editMode ? this.state.isFamilyEvent : false} selectedIcon={(value) => this.getEventType('Family Event', 4, value)} />
                  <ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')} photoUrlUnSelected={require('../Assets/Certificatesicon.png')} iconText="Other" isSelected={editMode ? this.state.isOther : false} selectedIcon={(value) => this.getEventType('Other', 5, value)} />
                </ZSliderCard>
              </View>

              <View style={{marginVertical: 10}}>
              <ZHero text="Organiser image" styles={{color: '#33314B'}}/>

                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: 200, marginVertical: 10, backgroundColor: '#F5F5F5'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {this.onShowCamera2()}}>
                      {this.renderOrganiserPhoto()}
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                </View>
                <ZMuteText text="Or select from a few of ours selections below"/>
                <ZSliderCard>
                  {this.renderImages()}
                </ZSliderCard>
              </View>

            </View>
            <View style={styles.body}>
              <View style={{marginVertical: 10}}>
                <ZRoundedButton name="Save" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', width: 200, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSaveEvent()}  />
              </View>
            </View>

        </ScrollView>
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
