
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
import ZProfileCard from 'ZProfileCard';
import ZAvatar from 'ZAvatar';
import NRater from 'NRater';
import ZCard from 'ZCard';

import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Keyboard
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import API from 'API';

export default class MonthlyReview extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: true,
      reviewProcedures: 0,
      reviewPunctuality: 0,
      reviewTeamwork: 0,
      reviewAttitude: 0,
      reviewSkill: 0,
      starCount: 1,
      shortReview: '',
      keyboardHeight: 0
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount = () => {

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({keyboardHeight: e.startCoordinates.height});
  }

  _keyboardDidHide = (e) => {
    this.setState({keyboardHeight: 0});
  }

  onSendReview = (id) => {
    var monthlyReview = {
      items: JSON.stringify([
        {item: 'Procedures', score: this.state.reviewProcedures},
        {item: 'Punctuality', score: this.state.reviewPunctuality},
        {item: 'Team Work', score: this.state.reviewTeamwork},
        {item: 'Attitude', score: this.state.reviewAttitude},
        {item: 'Skill', score: this.state.reviewSkill},
      ]),
      review: this.state.shortReview,
      overall: this.state.starCount
    }

    console.log(monthlyReview);
    API.post(`add-rating/monthly/${id}`, monthlyReview).then((res) => {
      console.log(res);
      alert('Added Monthly Rate.');
      this.props.navigation.goBack();
    })
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    let props = this.props.navigation.state.params.props;
    return (
      <ScrollView style={styles.container} contentInset={{top: 0, right: 0, left: 0, bottom: this.state.keyboardHeight}} contentContainerStyle={styles.scrollContent}>
        <ZHeader
          headerTitle={`${props.staff.fullname} Monthly Review`}
          titleStyle={{fontSize: 14, fontWeight: 'normal'}}
          rightIconColor="white"
          leftIcon="ios-arrow-round-back-outline"
          leftIconColor="white"
          leftIconPress={()=>this.props.navigation.goBack()}
        />
        <View style={styles.body}>

          <View style={{flexDirection: 'row', borderColor: '#9996A0' ,borderBottomWidth: 0.3, marginBottom: 20}}>
            <View style={{flex: 1}}>
              <ZHero text="Procedures/ Policies" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25}}>
                <ZNumericStepperBadge monthlyRateLimit size={60} value={this.state.reviewProcedures} onChangeValue={(value) => this.setState({reviewProcedures: value})}/>
              </View>
            </View>

            <View style={{flex: 1}}>
              <ZHero text="Punctuality" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25}}>
                <ZNumericStepperBadge monthlyRateLimit size={60} value={this.state.reviewPunctuality} onChangeValue={(value) => this.setState({reviewPunctuality: value})}/>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', borderColor: '#9996A0' ,borderBottomWidth: 0.3, marginBottom: 20}}>
            <View style={{flex: 1}}>
              <ZHero text="Team Work" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25}}>
                <ZNumericStepperBadge monthlyRateLimit size={60} value={this.state.reviewTeamwork} onChangeValue={(value) => this.setState({reviewTeamwork: value})}/>
              </View>
            </View>

            <View style={{flex: 1}}>
              <ZHero text="Attitude" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25}}>
                <ZNumericStepperBadge monthlyRateLimit size={60} value={this.state.reviewAttitude} onChangeValue={(value) => this.setState({reviewAttitude: value})}/>
              </View>
            </View>
          </View>

          <View style={{borderColor: '#9996A0' ,borderBottomWidth: 0.3, marginBottom: 20}}>
            <View>
              <ZHero text="Skill" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25}}>
                <ZNumericStepperBadge monthlyRateLimit size={60} value={this.state.reviewSkill} onChangeValue={(value) => this.setState({reviewSkill: value})}/>
              </View>
            </View>
          </View>

          <View style={{borderColor: '#9996A0' ,borderBottomWidth: 0.3, marginBottom: 20}}>
            <View>
              <ZHero text="Overall Performance" styles={{fontSize: 15, color: '#33314B'}}/>
              <View style={{marginVertical: 25, alignItems: 'center', justifyContent: 'center'}}>
                <StarRating
                  disabled={false}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  starColor={'red'}
                  starSize={25}
                />
              </View>
            </View>
          </View>

          <View style={{borderColor: '#9996A0', marginBottom: 10}}>
            <View>
              <ZHero text="Write a review" styles={{fontSize: 15, color: '#33314B'}}/>
                <View style={{marginVertical: 25}}>
                  <TextInput multiline={true} placeholder='Short review about Andrew...' style={{fontSize: 15, padding: 20, paddingTop: 20, backgroundColor: '#F5F5F5', height: 120, color: '#33314B', fontSize: 15}} onChangeText={(shortReview) => this.setState({shortReview})}/>
                </View>
            </View>
          </View>

          <View style={{borderColor: '#9996A0', marginBottom: 20}}>
            <ZRoundedButton name="Send Review" normalButtonStyle={{width: 150, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={() => this.onSendReview(props._id)} />
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  footer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});
