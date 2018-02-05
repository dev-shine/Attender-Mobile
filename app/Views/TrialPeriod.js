import ZMuteText from 'ZMuteText';
import ZHeader from 'ZHeader';
import ZAvatar from 'ZAvatar';
import ZText from 'ZText';
import ZHero from 'ZHero';

import Validate from 'Validate';
import MultiSlider from 'react-native-multi-slider';
import Icon from 'react-native-vector-icons/Ionicons';

import ZRoundedButton from 'ZRoundedButton';
import SelectMultiple from 'react-native-select-multiple';
import API from 'API';

import React, { Component } from 'react';
var moment = require('moment');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity, colors, Dimensions,
  Modal,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

var {height, width} = Dimensions.get('window');

export default class TrialPeriod extends Component {

constructor(props) {
  super(props);
  this.state = {
    data: [],
    selected: false,
    rate1: '0',
    rate2: '0',
    rate3: '0',
    buttonStateTaskSuggest: true,
    buttonStateRatings: true,
    editableState: true,
    hideTaskButton: true,
    hideSuggestButton: true,
    validateState: false,
    showTask: false,
    showSuggest: false,
    tasks: [],
    suggests: [],
    isLanguage: false,
    isLicense: false,
    isCertificate: false,
    isVideo: false,
    isSelection: false,
    skillsData: [],
    selectedSkills: []
  }
}

  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {

  }

  getAllData = () => {
    API.get('active-staffs').then((res) => {
      if (res.status) {
        this.setState({data: res.staffs, isLoading: false})
      }
      console.log('getall', res)
    });
  }

  onSaveTrial = (_id) => {
    var trialData = Object.assign(
      {
        tasks: this.state.tasks.join(),
        suggestions: this.state.suggests.join()
      }
    )
     API.post(`trial/${_id}`, trialData).then((res)=>{
      if(res.status){
        // this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]})
      }else{
        alert('Something wrong');
        console.log('SAMPLE', this.state.tasks)
      }
    });
  }

  onSetRate = (value) => {
    this.setState({rate1: value[0]});
  }
  onSetRate1 = (value) => {
    this.setState({rate2: value[0]});
  }
  onSetRate2 = (value) => {
    this.setState({rate3: value[0]});
  }
  renderCustomMarker = () => {
    return (
      <View>
        <Image source={require('../Assets/Sliding-button.png')} style={{height: 16, width: 12, resizeMode: 'contain'}}/>
      </View>
    )
  }

  onSelectionsChange = (selectedSkills) => {
    // this.onValidateFields({'skills', selectedSkills});
    this.setState({skillsData: selectedSkills});
  }

  onSelectMutiple = () => {
    var data = this.state.selectedSkills;
    this.state.skillsData.map((res)=>{
      data.push(res.value);
    })
    this.setState({isSelection: false, selectedSkills: data});
  }

  onRemoveSkillsItem= (id) => {
    var obj = this.state.skillsData;
    if(obj.length < 0){

    }else{
      obj.splice(id, 1);
      this.setState({skillsData: obj});
    }
  }

  renderSkillsSelection = () => {
      var skills = [
        'Mixology Skills',
        'Punctuality',
        'Accuracy',
        'Costumer Service',
        'Energetic',
        'Flexible',
        'Multitasking',
        'Integrity',
        'Patience',
        'Social',
        'Stamina',
        'Teamwork',
        'Verbal'
      ];

      if (this.state.isSelection) {
        return (
          <Modal transparent={true} visible={this.state.isSelection}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: 0.3}} />
              <View style={{backgroundColor: 'white', width: '90%', height: 400, borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                <SelectMultiple items={skills} selectedItems={this.state.skillsData} onSelectionsChange={this.onSelectionsChange} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                  <ZRoundedButton name="Select" styles={{marginRight: 10}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.onSelectMutiple()} />
                  <ZRoundedButton name="Cancel" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', alignSelf: 'center', width: 150}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.setState({onShowMultiSelection: false, certificateData: []})} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }
  }

  renderSkillsItem = () => {
    return this.state.skillsData.map((res, id)=>{
      return (
        <View key={id}>
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', justifyContent: (this.state.buttonStateRatings ? 'center' : 'flex-start'), alignItems: 'center', marginVertical: 5}}>
              <ZMuteText text={res.value} styles={{color: '#33304B', textAlign: 'left', marginRight: 20, fontWeight: '500', fontSize: 18}} />
              <ZMuteText text={this.state.rate2} styles={{color: '#63DBE8', textAlign: 'left', fontWeight: '500', fontSize: 18}} />
              <ZMuteText text=" /100 " styles={{color: '#A8A5AE', fontWeight: '500', fontSize: 18}} />
              <TouchableOpacity onPress={()=>this.onRemoveSkillsItem(id)} style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.renderSkillsSlider()}
        </View>
      )
    })
  }

  renderAddScoreItem = () => {
    if(!this.state.buttonStateRatings){
      return(
        <View>
          <Text style={{color: '#A8A5AE', marginVertical: 15}}>Add the score item</Text>
            <TouchableOpacity onPress={()=>this.setState({isSelection: true})}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor:"#eee", marginBottom: 10}}>
                <TextInput underlineColorAndroid="transparent" editable={false} placeholder="Select" style={{flex: 1, height: 40, fontSize: 14, fontWeight: 'normal'}} />
                <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="ios-add" size={15} color="white" style={{backgroundColor: 'transparent'}} />
                </View>
              </View>
            </TouchableOpacity>
        </View>
      )
    }
  }

  renderTaskButton = () => {
    if(!this.state.hideTaskButton){
      return (
        <View>
          <TouchableOpacity onPress={() => this.onTaskPress()}>
            <View style={{backgroundColor: '#625BBA', padding: 5, paddingHorizontal: 10, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: 120}}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>+ Add Task</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderSuggestButton = () => {
    if(!this.state.hideSuggestButton){
      return (
        <View>
          <TouchableOpacity onPress={() => this.onSuggestPress()}>
            <View style={{backgroundColor: '#625BBA', padding: 5, paddingHorizontal: 10, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: 150}}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>+ Add Suggestion</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderTaskRemove = (task, key) => {
    if (!this.state.buttonStateTaskSuggest) {
      return(
        <View key={key} style={{ alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.onRemoveTask(key)} style={{position: 'absolute', top: -10, left: -15}}>
            <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-remove" size={50} color="white" style={{backgroundColor: 'transparent', width: 10, paddingTop: 5}} />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderSuggestRemove = (suggest, key) => {
    if (!this.state.buttonStateTaskSuggest) {
      return(
        <View key={key} style={{ alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.onRemoveSuggest(key)} style={{position: 'absolute', top: -10, left: -15}}>
            <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-remove" size={50} color="white" style={{backgroundColor: 'transparent', width: 10, paddingTop: 5}} />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderTask = (task, key) => {
    if(this.state.showTask){
      return (
        <View key={key} style={{flexDirection: 'row', marginVertical: 10, borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
          <View style={{padding: 10, borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
            <Image source={require('../Assets/Donelisticon.png')} style={{height: 20, width: 20, resizeMode: 'stretch', marginTop: 5, marginLeft: 5, padding: 10}}/>
          </View>
          <View style={{flex: 1, marginLeft: 5}}>
            <TextInput placeholder='type task here..' editable={this.state.editableState} multiline={true} onChangeText={(value) => this.onChangeTask(value, key)} style={{fontSize: 15, color: '#393650', height: 50, padding: 10}}/>
          </View>
          {this.renderTaskRemove()}
        </View>
      )
    }
  }

  renderSuggest = (suggest, key) => {
    if(this.state.showSuggest){
      return (
        <View key={key} style={{flexDirection: 'row', marginVertical: 10, borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
          <View style={{padding: 10, borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
            <Image source={require('../Assets/Donelisticon.png')} style={{height: 20, width: 20, resizeMode: 'stretch', marginTop: 5, marginLeft: 5, padding: 10}}/>
          </View>
          <View style={{flex: 1, marginLeft: 5}}>
            <TextInput placeholder='type suggestion here..' editable={this.state.editableState} multiline={true} onChangeText={(value) => this.onChangeSuggest(value, key)} style={{fontSize: 15, color: '#393650', height: 50, padding: 10}}/>
          </View>
          {this.renderSuggestRemove()}
        </View>
      )
    }
  }

  onButtonPress = () => {
    if (this.state.buttonStateTaskSuggest) {
      this.setState({
        buttonStateTaskSuggest: false,
        hideTaskButton: false,
        hideSuggestButton: false,
        editableState: true,
      });
    }else {
      this.setState({
        buttonStateTaskSuggest: true,
        hideTaskButton: true,
        hideSuggestButton: true,
        editableState: false
      });
    }
  }

  onButtonPressRatings = () => {
    if (this.state.buttonStateRatings) {
      this.setState({
        buttonStateRatings: false,
        validateState: true,
      });
    }else {
      this.setState({
        buttonStateRatings: true,
        validateState: false
      });
    }
  }

  onLanguagePress = () => {
    if (!this.state.isLanguage) {
      this.setState({
        isLanguage: true,
      })
    } else {
      this.setState({
        isLanguage: false,
      })
    }
  }

  onLicensePress = () => {
    if (!this.state.isLicense) {
      this.setState({
        isLicense: true,
      })
    } else {
      this.setState({
        isLicense: false,
      })
    }
  }

  onCertificatePress = () => {
    if (!this.state.isCertificate) {
      this.setState({
        isCertificate: true,
      })
    } else {
      this.setState({
        isCertificate: false,
      })
    }
  }

  onVideoPress = () => {
    if (!this.state.isVideo) {
      this.setState({
        isVideo: true,
      })
    } else {
      this.setState({
        isVideo: false,
      })
    }
  }

  renderSelectedLanguage = () => {
    if (this.state.isLanguage) {
      return(
        <Image source={require('../Assets/statuscheckicon.png')} style={{position: 'absolute', right: -5, top: -3, height: 18, width: 18, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderSelectedLicense = () => {
    if (this.state.isLicense) {
      return(
        <Image source={require('../Assets/statuscheckicon.png')} style={{position: 'absolute', right: -5, top: -3, height: 18, width: 18, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderSelectedCertificate = () => {
    if (this.state.isCertificate) {
      return(
        <Image source={require('../Assets/statuscheckicon.png')} style={{position: 'absolute', right: -5, top: -3, height: 18, width: 18, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderSelectedVideo = () => {
    if (this.state.isVideo) {
      return(
        <Image source={require('../Assets/statuscheckicon.png')} style={{position: 'absolute', right: -5, top: -3, height: 18, width: 18, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderRatings = () => {
    if (this.state.buttonStateRatings) {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
            <TouchableOpacity onPress={() => this.onButtonPressRatings()}>
              <Image source={require('../Assets/editiconpopup.png')} style={{height: 25, width: 25, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 16, color: '#818181'}}>Edit</Text>
        </View>
      )
    }else {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
            <TouchableOpacity onPress={() => this.onButtonPressRatings()}>
              <Image source={require('../Assets/Save.png')} style={{height: 20, width: 20, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 16, color: '#818181', marginLeft: 3}}>Save</Text>
        </View>
      )
    }
  }

  renderTaskSuggest = () => {
    if(this.state.buttonStateTaskSuggest){
      return(
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
            <TouchableOpacity onPress={() => this.onButtonPress()}>
              <Image source={require('../Assets/editiconpopup.png')} style={{height: 25, width: 25, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 16, color: '#818181'}}>Edit</Text>
        </View>
      )
    }else{
      return(
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
            <TouchableOpacity onPress={() => this.onButtonPress()}>
              <Image source={require('../Assets/Save.png')} style={{height: 17, width: 17, resizeMode: 'stretch'}}/>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 16, color: '#818181', marginLeft: 3}}>Save</Text>
        </View>
      )
    }
  }

  renderSliderOverall = () => {
    if (!this.state.buttonStateRatings) {
      return(
        <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', padding: 5}}><ZMuteText text="1" styles={{backgroundColor: 'transparent', color: '#33304B', textAlign: 'left', marginBottom: 26, fontWeight: '500'}} /></View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <MultiSlider
                max={100}
                step={1}
                sliderLength={(width *.75)}
                values={[this.state.rate1]}
                onValuesChange={(value)=>this.onSetRate(value)}
                selectedStyle={{backgroundColor: '#5FDAEB'}}
                unselectedStyle={{backgroundColor: '#C4C4C4'}}
                containerStyle={{height: 2}}
                trackStyle={{height: 4}}
                customMarker={this.renderCustomMarker}
                />
            </View>
        <View style={{justifyContent: 'center', padding: 5}}><ZMuteText text="100" styles={{backgroundColor: 'transparent', color: '#33304B', textAlign: 'right', marginBottom: 26, fontWeight: '500'}} /></View>
        </View>
      )
    }
  }

  renderSkillsSlider = () => {
    if(!this.state.buttonStateRatings){
      return(
        <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center', padding: 5}}><ZMuteText text="1" styles={{backgroundColor: 'transparent', color: '#33304B', textAlign: 'left', marginBottom: 26, fontWeight: '500'}} /></View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <MultiSlider
                max={100}
                step={1}
                sliderLength={(width *.75)}
                values={[this.state.rate2]}
                onValuesChange={(value)=>this.onSetRate1(value)}
                selectedStyle={{backgroundColor: '#5FDAEB'}}
                unselectedStyle={{backgroundColor: '#C4C4C4'}}
                containerStyle={{height: 2}}
                trackStyle={{height: 4}}
                customMarker={this.renderCustomMarker}
                />
            </View>
        <View style={{justifyContent: 'center', padding: 5}}><ZMuteText text="100" styles={{backgroundColor: 'transparent', color: '#33304B', textAlign: 'right', marginBottom: 26, fontWeight: '500'}} /></View>
        </View>
      )
    }
  }

  onChangeTask = (value, key) => {
    var tasks = this.state.tasks;
    var newTask = tasks[key];
    newTask.description = value;
    this.setState({tasks: tasks});
  }

  onChangeSuggest = (value, key) => {
    var suggests = this.state.suggests;
    var newSuggest = suggests[key];
    newSuggest.description = value;
    this.setState({suggests: suggests});
  }

  onTaskPress = () => {
    var tasks = this.state.tasks
    var $task = {
      description: ''
    }

    tasks.push($task)
    this.setState({
      showTask: true,
      tasks: tasks
    })
    console.log('Hello!',tasks)
  }

  onSuggestPress = () => {
    var suggests = this.state.suggests
    var $suggest = {
      description: ''
    }

    suggests.push($suggest)
    this.setState({
      showSuggest: true,
      suggests: suggests
    })
  }

  onRemoveSuggest = (key) => {
    var obj = this.state.suggests;
    if(obj.length < 0){

    }else{
      obj.splice(key, 1);
      this.setState({suggests: obj});
    }
  }

  onRemoveTask = (key) => {
    var obj = this.state.tasks;
    if(obj.length < 0){

    }else{
      obj.splice(key, 1);
      this.setState({tasks: obj});
    }
  }

  onPressAddScore = () => {

  }

  // <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
  //   <Image source={require('../Assets/calendariconsmall.png')} style={{height: 25, width: 25, resizeMode: 'stretch', justifyContent: 'space-between'}}/>
  //   <ZMuteText text={moment(this.state.selectedStaff.trialStartDate).format('DD MMM')} />
  //   <Text style={{fontSize: 25, marginHorizontal: 10, color: '#716D7B'}}>-</Text>
  //   <Image source={require('../Assets/calendariconsmall.png')} style={{height: 25, width: 25, resizeMode: 'stretch', justifyContent: 'space-between'}}/>
  //   <Text style={{fontSize: 16, marginLeft: 10, color: '#716D7B'}}>28 Mar</Text>
  // </View>

  render() {
    // const { navigate } = this.props.navigation;
    let props = this.props.selectedStaff;
    return (
      <ScrollView>
        <View style={{backgroundColor: 'white'}}>

          <ZHeader
            headerTitle="Day 7 of Trial Period"
            titleStyle={{fontSize: 16, fontWeight: '500'}}
            leftIcon="ios-arrow-round-back-outline"
            leftIconColor="white"
            leftIconPress={()=>{}}
          />

          <View style={{marginHorizontal: 30}}>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}}  />
                <ZMuteText text={moment(props.trialStartDate).format('DD MMM')} />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}}  />
                <ZMuteText text={moment(props.trialEndDate).format('DD MMM')} />
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15}}>
              <View style={{flex: 1}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text={this.props.venueName} styles={{fontSize: 14}}/>
              </View>
              <View style={{flex: 1}}>
                <ZAvatar small={true} hideIndicator={true} />
                <ZText text={props.staff.fullname} styles={{fontSize: 14}}/>
              </View>
            </View>

          </View>
        </View>

        {/**<View style={{backgroundColor: 'white', marginHorizontal: 10, marginVertical: 20}}>

          <View style={{padding: 10}}>

              {this.renderTaskSuggest()}

            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
              <ZHero text="Today's Tasks" styles={{color: '#33314B', marginRight: 10}}/>
            </View>

            <View>

              {
                this.state.tasks.map((val, key) => {
                  return this.renderTask(val, key)
                })
              }

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10}}>
                  {this.renderTaskButton()}
              </View>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 18, color: '#AAA7AF'}}>SUGGESTION</Text>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View style={{flex: 1}}>
              {
                this.state.suggests.map((val, key) => {
                  return this.renderSuggest(val, key)
                })
              }
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10}}>
                {this.renderSuggestButton()}
            </View>

          </View>
        </View>**/}

        <View style={{backgroundColor: 'white', marginHorizontal: 10, marginVertical: 20}}>
          <View style={{padding: 10}}>

            {this.renderRatings()}

              <View>
                <View style={{marginVertical: 10}}>
                  <Validate isValidated={this.state.validateState}>
                    <View style={{flexDirection: 'row', justifyContent: (this.state.buttonStateRatings ? 'center' : 'flex-start'), alignItems: 'center', marginVertical: 5}}>
                      <ZMuteText text="Overall Rating" styles={{color: '#33304B', textAlign: 'left', marginRight: 20, fontWeight: '500', fontSize: 18}} />
                      <ZMuteText text={this.state.rate1} styles={{color: '#63DBE8', textAlign: 'left', fontWeight: '500', fontSize: 18}} />
                      <ZMuteText text=" /100 " styles={{color: '#A8A5AE', fontWeight: '500', fontSize: 18}} />
                    </View>
                  </Validate>
                </View>

                {this.renderSliderOverall()}

                </View>

            <View style={{borderBottomWidth: 0.5, borderColor: '#A8A5AE', paddingBottom: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.onLanguagePress()}>
                      {this.renderSelectedLanguage()}
                      <Image source={require('../Assets/languageicon.png')} style={{height: 50, width: 50, resizeMode: 'stretch'}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.onLicensePress()}>
                      {this.renderSelectedLicense()}
                    <Image source={require('../Assets/idicon.png')} style={{height: 50, width: 50, resizeMode: 'stretch'}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.onCertificatePress()}>
                      {this.renderSelectedCertificate()}
                    <Image source={require('../Assets/cardnoteicon.png')} style={{height: 50, width: 50, resizeMode: 'stretch'}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.onVideoPress()}>
                      {this.renderSelectedVideo()}
                    <Image source={require('../Assets/cardvideoicon.png')} style={{height: 50, width: 50, resizeMode: 'stretch'}}/>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#A8A5AE'}}>Languages</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#A8A5AE'}}>Licence</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#A8A5AE'}}>Certificates</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#A8A5AE'}}>Videos</Text>
                </View>
              </View>
            </View>
              {this.renderAddScoreItem()}
              {this.renderSkillsSelection()}
              {this.renderSkillsItem()}
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 30}}>
          <TouchableOpacity onPress={() => this.onSaveTrial()}>
            <View style={{borderRadius: 5, backgroundColor: '#625BBA', padding: 5, paddingHorizontal: 10, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: 180}}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>Add todays score</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
