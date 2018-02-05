
import ZHeader from 'ZHeader';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZNumericStepperBadge from 'ZNumericStepperBadge';
import ZRoundedButton from 'ZRoundedButton';
import ZFullCard from 'ZFullCard';
import ZTab from 'ZTab';
import ZTabItem from 'ZTabItem';
import ZCustomHeader from 'ZCustomHeader';
import ZAvatar from 'ZAvatar';
import ZMessageCard from 'ZMessageCard';
import ZPhoto from 'ZPhoto';
import ZProfileCard from 'ZProfileCard';
import ZCard from 'ZCard';
import ZRater from 'NRater';
import ZButtonOutline from 'ZButtonOutline';

import DateTimePicker from 'react-native-modal-datetime-picker';

import API from 'API';

var moment = require('moment');

import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

export default class CreatEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      text: '',
      bartendersValue: 0,
      managersValue: 0,
      waitersValue: 0,
      chefsValue: 0,
      kitchensValue: 0,
      barbacksValue: 0,
      hostsValue: 0,
      photo: '',
      imageSource: [],
      isTimePicker: false,
      staffTypes: [],
      eventName: '',
      eventDescription: '',
      date: new Date(),
      startTime: moment(),
      endTime: moment(),
      isBartender: false,
      isManager:false,
      isWaiter:false,
      isChef: false,
      isKitchen: false,
      isBarback: false,
      isHost: false,
      myStaffs: {
        bartender: [],
        manager: [],
        waiter: [],
        chef: [],
        kitchen: [],
        barback: [],
        host: []
      },
      eventTypes: []
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    API.get('auth/current').then((res) => {
      console.log('User', res);
      if(res.status){
        this.setState({userData: res.data, isLoading: false});
      }
    });
    this.getMyStaffs();
  }

  getMyStaffs = () => {
    API.get('staffs').then((res)=>{
     console.log('staffs', res);
     if (res.status) {
       this.setState({myStaffs: res.staffs});
     }
   });
  }

  onSaveEvent = () => {
    if (this.props.navigation.state.params.isOrganizer) {
      var eventData = {
        name: this.state.eventName,
        description: this.state.eventDescription,
        date: this.state.date.toString(),
        startTime: moment(this.state.startTime).format('hh:mm A'),
        endTime: moment(this.state.endTime).format('hh:mm A'),
        interest: JSON.stringify([
          {
            staff: "bartender",
            quantity: this.state.bartendersValue,
          },
          {
            staff: "waiter",
            quantity: this.state.waitersValue,
          },
        ]),
        image: this.state.photo.uri,
      }

      console.log(eventData);
      const { navigate } = this.props.navigation;

      API.post('events', eventData).then((res)=>{
       console.log(res);
       if(res.status){
         this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]});
       }else{
         alert('Something wrong');
       }
     });
   } else {
     var eventData = {
       name: this.state.eventName,
       description: this.state.eventDescription,
       date: this.state.date.toString(),
       startTime: moment(this.state.startTime).format('hh:mm A'),
       endTime: moment(this.state.endTime).format('hh:mm A'),
       interest: JSON.stringify([
         {
           staff: "bartender",
           quantity: this.state.bartendersValue,
         },
         {
           staff: "waiter",
           quantity: this.state.waitersValue,
         },
       ]),
       image: this.state.photo.uri,
     }

     console.log(eventData);
     const { navigate } = this.props.navigation;

     API.post('events', eventData).then((res)=>{
      console.log(res);
      if(res.status){
        this.props.navigation.goBack()
      }else{
        alert('Something wrong');
      }
    });
   }
  }

  getStaffType = (staffType, id, value) => {
    var $staffType = this.state.staffTypes;
    switch (staffType){
      case 'Bartender':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Manager':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Waiter':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Chef':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Kitchen':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Barback':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      case 'Host':
      {
        if(!value){
          var index = $staffType.indexOf(staffType);
          $staffType.splice(index, 1)
        }else {
          $staffType.push(staffType);
        }
      }
      break;
      default:
    }
    console.log($staffType);
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
        console.log('ImagePicker Error: ', response.error);
        this.setState({isLoading: false});
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // this.setState({photo: {uri: response.uri }, isLoading: false});
        this.getImageUrl(response)
        this.setState({imageSource: this.state.imageSource.concat(source)});
      }
    });
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

  onSelectDatePicker = (date) => {
    this.setState({date: date, isDatePicker: false});
  }

  onShowTimePicker = (startOrEnd) => {
    this.setState({isTimePicker: true, startOrEnd: startOrEnd});
  }

  onSelectTime = (time) => {
    if(this.state.startOrEnd == 'start'){
      this.setState({startTime: time, isTimePicker: false});
    }else {
      this.setState({endTime: time, isTimePicker: false});
    }
  }

  onIconPress = (type) => {
    if (type == 'Bartender') {
      if (this.state.isBartender) {
        this.setState({isBartender: false});
      }else {
        this.setState({isBartender: true});
      }
    }else if (type == 'Manager') {
      if (this.state.isManager) {
        this.setState({isManager: false});
      }else {
        this.setState({isManager: true});
      }
    }else if (type == 'Waiter') {
      if (this.state.isWaiter) {
        this.setState({isWaiter: false});
      }else {
        this.setState({isWaiter: true});
      }
    }else if (type == 'Chef') {
      if (this.state.isChef) {
        this.setState({isChef: false});
      }else {
        this.setState({isChef: true});
      }
    }else if (type == 'Kitchen') {
      if (this.state.isKitchen) {
        this.setState({isKitchen: false});
      }else {
        this.setState({isKitchen: true});
      }
    }else if (type == 'Barback') {
      if (this.state.isBarback) {
        this.setState({isBarback: false});
      }else {
        this.setState({isBarback: true});
      }
    }else if (type == 'Host') {
      if (this.state.isBartender) {
        this.setState({isHost: false});
      }else {
        this.setState({isHost: true});
      }
    }
  }

  renderBartender = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isBartender) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Bartender" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.bartendersValue} onChangeValue={(value) => this.setState({bartendersValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Bartenders ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderManager = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isManager) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Manager" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.managersValue} onChangeValue={(value) => this.setState({managersValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Manager ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderWaiter = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isWaiter) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Waiter" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.waitersValue} onChangeValue={(value) => this.setState({waitersValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Waiter ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderChef = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isChef) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Chef" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.chefsValue} onChangeValue={(value) => this.setState({chefsValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Chef ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderKitchen = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isKitchen) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Kitchen" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.kitchensValue} onChangeValue={(value) => this.setState({kitchensValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Kitchen ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderBarback = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isBarback) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Barback" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.barbacksValue} onChangeValue={(value) => this.setState({barbacksValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Barback ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  renderHost = (userProfile) => {
    const { navigate } = this.props.navigation;
    if (this.state.isHost) {
      return(
        <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <ZHero text="Host" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.hostsValue} onChangeValue={(value) => this.setState({hostsValue: value})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.plainBody}>
            <ZMuteText text="Suggested Staff" />
            <ZSliderCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
              <ZCard styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text="Sophie F." styles={{fontSize: 14}}/>
                <ZRater />
                <ZMuteText text="Full time" />
                <View style={{marginVertical: 10}}>
                  <ZRoundedButton name="Invite" styles={{marginRight: 0}} normalButtonStyle={{paddingHorizontal: 50}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
                </View>
                <TouchableOpacity style={{position: 'absolute', top: 20, right: 10}}>
                  <View>
                    <Icon name="md-calendar" size={30} color="#716D7B"  />
                  </View>
                </TouchableOpacity>
              </ZCard>
            </ZSliderCard>
            <ZButtonOutline name='See all 8 Host ↓' styles={{borderColor: '#D5D4D9', backgroundColor: '#F4F4F4', padding: 10, width: 200, height: 40, alignSelf: 'center'}} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
          </View>
        </View>
        </View>
      )
    }
  }

  // getEventType = (eventType, id, value) => {
  //   var $eventType = this.state.eventTypes;
  //   switch (eventType){
  //     case 'Birthday':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     case 'Wedding':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     case 'Conference':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     case 'Music Festival':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     case 'Family Event':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     case 'Other':
  //     {
  //       if(!value){
  //         var index = $eventType.indexOf(eventType);
  //         $eventType.splice(index, 1)
  //       }else {
  //         $eventType.push(eventType);
  //       }
  //     }
  //     break;
  //     default:
  //   }
  //  console.log('dataType', $eventType);
  // }


  render() {
    const { navigate } = this.props.navigation;
    let userProfile = this.state.userData;
    return (
      <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
        <ZHeader
          headerTitle="Create Event"
          titleStyle={{fontSize: 16, fontWeight: '500'}}
          leftIcon="ios-arrow-round-back-outline"
          leftIconColor="white"
          leftIconPress={()=>this.props.navigation.goBack()}
        />

        <View style={styles.body}>
          <ZTextInput placeholder="Event name" onChangeText={(value)=>this.setState({eventName: value})} />
          <ZTextInput placeholder="Description" multiline={true} onChangeText={(value)=>this.setState({eventDescription: value})} />

          <View style={{flex: 1, flexDirection: 'row', marginVertical: 15}}>

            <View style={{flex: 1, marginRight: 10}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Date</Text>
              <View style={{borderRadius: 5, backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}}>
                <TouchableOpacity onPress={()=>this.setState({isDatePicker: true})}>
                  <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <View>
                      <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}} />
                    </View>
                    <View>
                      <TextInput value={moment(this.state.date).format('DD MMM YYYY')} style={{textAlign: 'center', color: 'gray', fontWeight: 'normal', fontSize: 14, width: 100}} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <DateTimePicker
              isVisible={this.state.isDatePicker}
              onConfirm={this.onSelectDatePicker}
              onCancel={()=>this.setState({isDatePicker: false})}
            />

            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: '#A8A5AE', marginBottom: 3}}>Time</Text>
              <View style={{borderRadius: 5, backgroundColor: '#F5F5F5', padding: 5, paddingLeft: 10}}>
                <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <View>
                    <Icon name="ios-time-outline" size={25} color="#716D7B" style={{padding: 5}}  />
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('start')}>
                      <ZMuteText text={moment(this.state.startTime).format('HH:mm') + ' - '} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>this.onShowTimePicker('end')}>
                      <ZMuteText text={moment(this.state.endTime).format('HH:mm')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <DateTimePicker
              mode="time"
              isVisible={this.state.isTimePicker}
              onConfirm={this.onSelectTime}
              onCancel={()=>this.setState({isTimePicker: false})}
            />

          </View>
        </View>

        <View style={styles.body}>
          <ZHero text="Staff of interest" styles={{color: '#33314B'}}/>
          <View style={{marginTop: 10, marginBottom: 15}}>
            <Text style={{fontSize: 12, alignSelf: 'center', color: '#33314B'}}>Tap on the staff that are needed for this event</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <ZSliderCard>
              <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartender" isSelected={this.state.isBartender} selectedIcon={(value) => [this.getStaffType('Bartender', 0, value), this.onIconPress('Bartender')]} />
              <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager" isSelected={this.state.isManager} selectedIcon={(value) => [this.getStaffType('Manager', 1, value), this.onIconPress('Manager')]} />
              <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')} photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter" isSelected={this.state.isWaiter} selectedIcon={(value) => [this.getStaffType('Waiter', 2, value), this.onIconPress('Waiter')]} />
              <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Chef" isSelected={this.state.isChef} selectedIcon={(value) => [this.getStaffType('Chef', 3, value), this.onIconPress('Chef')]} />
              <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen" isSelected={this.state.isKitchen} selectedIcon={(value) => [this.getStaffType('Kitchen', 3, value), this.onIconPress('Kitchen')]} />
              <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')} photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barback" isSelected={this.state.isBarback} selectedIcon={(value) => [this.getStaffType('Barback', 4, value), this.onIconPress('Barback')]} />
              <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')} photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host" isSelected={this.state.isHost} selectedIcon={(value) => [this.getStaffType('Host', 5, value), this.onIconPress('Host')]} />
            </ZSliderCard>
          </View>

        </View>

        {this.renderBartender(userProfile)}
        {this.renderManager(userProfile)}
        {this.renderWaiter(userProfile)}
        {this.renderChef(userProfile)}
        {this.renderKitchen(userProfile)}
        {this.renderBarback(userProfile)}
        {this.renderHost(userProfile)}

        {
          /**
          <View style={styles.body}>
            <ZHero text="Event Type" styles={{color: '#33314B'}}/>

            <View style={{flexDirection: 'row'}}>
              <ZSliderCard>
                <ZIcon photoUrlSelected={require('../Assets/birthdayiconselected.png')} photoUrlUnSelected={require('../Assets/birthdayicon.png')} iconText="Birthday" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Birthday', 0, value)} />
                <ZIcon photoUrlSelected={require('../Assets/weddingiconselected.png')} photoUrlUnSelected={require('../Assets/weddingicon.png')} iconText="Wedding" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Wedding', 1, value)} />
                <ZIcon photoUrlSelected={require('../Assets/conferenceiconselected.png')} photoUrlUnSelected={require('../Assets/conferenceicon.png')} iconText="Conference" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Conference', 2, value)} />
                <ZIcon photoUrlSelected={require('../Assets/clubiconselected.png')} photoUrlUnSelected={require('../Assets/clubicon.png')} iconText="Music Festival" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Music Festival', 3, value)} />
                <ZIcon photoUrlSelected={require('../Assets/pubiconselected.png')} photoUrlUnSelected={require('../Assets/pubicon.png')} iconText="Family Event" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Family Event', 4, value)} />
                <ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')} photoUrlUnSelected={require('../Assets/Certificatesicon.png')} iconText="Other" isSelected={this.state.isSelected} selectedIcon={(value) => this.getEventType('Other', 5, value)} />
              </ZSliderCard>
            </View>
          </View>
        **/
        }

        <View style={styles.body}>
        <ZHero text="Event Image" styles={{color: '#33314B'}}/>

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

        <View style={styles.plainBody}>
          <View style={{marginVertical: 10}}>
            <ZRoundedButton name="Create Event" onPress={()=>this.onSaveEvent()} styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', width: 200, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
          </View>
        </View>


      </ScrollView>
    )
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
