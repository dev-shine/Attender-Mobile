import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZHeader from 'ZHeader';
import ZMuteText from 'ZMuteText';
import ZSliderCard from 'ZSliderCard';
import ZRoundedButton from 'ZRoundedButton';
import ZNumericStepperBadge from 'ZNumericStepperBadge';

import React, { Component } from 'react';
import {
StyleSheet,
ScrollView,
View,
Text,
LayoutAnimation,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class SearchStaff extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffTypes: [],
      bartendersValue: 0,
      managersValue: 0,
      waitersValue: 0,
      kitchensValue: 0,
      barbacksValue: 0,
      hostsValue: 0,
      isBartender: false,
      isManager: false,
      isWaiter: false,
      isKitchen: false,
      isBarback: false,
      isHost: false
    }
  }

  static navigationOptions = {
    header: null,
  };

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

  renderBartender = () => {
    if (this.state.isBartender) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Bartender" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.bartendersValue} onChangeValue={(value) => this.setState({bartendersValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  renderManager = () => {
    if (this.state.isManager) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Manager" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.managersValue} onChangeValue={(value) => this.setState({managersValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  renderWaiter = () => {
    if (this.state.isWaiter) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Waiter" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.waitersValue} onChangeValue={(value) => this.setState({waitersValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  renderKitchen = () => {
    if (this.state.isKitchen) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Kitchen" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.kitchensValue} onChangeValue={(value) => this.setState({kitchensValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  renderBarback = () => {
    if (this.state.isBarback) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Barback" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.barbacksValue} onChangeValue={(value) => this.setState({barbacksValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  renderHost = () => {
    if (this.state.isHost) {
      return(
        <View style={styles.body}>
          <View style={{flex: 1}}>
            <ZHero text="Host" styles={{color: '#33314B'}}/>
            <View style={{marginVertical: 15}}>
              <ZNumericStepperBadge value={this.state.hostsValue} onChangeValue={(value) => this.setState({hostsValue: value})}/>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={{flex: 1}}>
        <ZHeader
          headerTitle='Find your staff'
          subTitle="Select each staff of interest and let us know how many of each you require."
          subStyles={{fontSize: 16}}
          rightText="SKIP"
          onPress={()=>navigate('Dashboard',{selectedTab: 'Staff', navigateToMenu: true})}
        />

        <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
          <View style={styles.body}>
            <ZHero text="Staff of interest" styles={{color: '#33314B'}}/>
            <ZMuteText text="Tap on the staff that you are looking for" styles={{marginVertical: 5}}/>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <ZSliderCard>
                <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartender" isSelected={this.state.isBartender} selectedIcon={(value) => [this.getStaffType('Bartender', 0, value), this.onIconPress('Bartender')]} />
                <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')} photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager" isSelected={this.state.isManager} selectedIcon={(value) => [this.getStaffType('Manager', 1, value), this.onIconPress('Manager')]} />
                <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')} photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter" isSelected={this.state.isWaiter} selectedIcon={(value) => [this.getStaffType('Waiter', 2, value), this.onIconPress('Waiter')]} />
                <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')} photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen" isSelected={this.state.isKitchen} selectedIcon={(value) => [this.getStaffType('Kitchen', 3, value), this.onIconPress('Kitchen')]} />
                <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')} photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barback" isSelected={this.state.isBarback} selectedIcon={(value) => [this.getStaffType('Barback', 4, value), this.onIconPress('Barback')]} />
                <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')} photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host" isSelected={this.state.isHost} selectedIcon={(value) => [this.getStaffType('Host', 5, value), this.onIconPress('Host')]} />
              </ZSliderCard>
            </View>
          </View>

          {
            this.state.staffTypes.length > 0 ?
              <View style={{flex: 1, width: '100%'}}>
                {this.renderBartender()}
                {this.renderManager()}
                {this.renderWaiter()}
                {this.renderKitchen()}
                {this.renderBarback()}
                {this.renderHost()}
              </View>
            : null
          }

          <View style={styles.plainBody}>
            <View style={{marginVertical: 10}}>
              <ZRoundedButton name="Search" styles={{marginRight: 0}} normalButtonStyle={{backgroundColor: '#64DAE7', width: 200, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  />
            </View>
          </View>
        </ScrollView>
      </View>
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
  body: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5,
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
});
