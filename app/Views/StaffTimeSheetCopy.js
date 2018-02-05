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
  TouchableOpacity,
  colors,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

var {height, width} = Dimensions.get('window');

export default class TrialPeriod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timesheet: {
        days: [],
        banksArray: [],
        isLoadingPayment: false,
      },
      next: false,
      prev: false,
      monStartTime: '',
      monEndTime: '',
      monBreakTime: '',
      monPayableHours: '',
      isEditWorkingHour: false,
      isEditPayableHour: false,
      isEditRate: false
    }
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    this.getStaffTimeSheet();
    this.getAllBanks()
  }

  getAllBanks = () => {
    API.get('banks').then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({
          banksArray: res.banks,
        });
      } else {
        alert('Something went wrong');
      }
    });
  }

  onPayStaff = (timesheet, props) => {
    var totalAmount = timesheet.totalPayableHours * props.staff.startRate;
    var promiseId = this.state.banksArray[0].promiseId;
    this.setState({isLoadingPayment: true});
    if (this.state.banksArray.length > 0) {
      API.post(`timesheet/${timesheet.id}/make_payment`, {amount: totalAmount, account_id: promiseId})
      .then((res) => {
        if(res.status) {
          alert('Payment Transfered.');
          this.setState({isLoadingPayment: false});
          this.props.navigation.goBack();
        } else {
          alert(`There is no total amount to be paid.`);
          this.setState({isLoadingPayment: false});
        }
        console.log('Pay staff', res);
      });
    } else {
      alert('Please add bank account on payment setting.');
    }

  }

  getStaffTimeSheet = () => {
    console.log(`management/${this.props.navigation.state.params.managementId}/timesheet/current`);
    API.get(`management/${this.props.navigation.state.params.managementId}/timesheet/current`)
    .then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({timesheet: res.timesheet, next: res.actions.next, prev: res.actions.previous});
      }
    })
  }

  getNextOrPreviousTimeSheet = (id) => {
    this.setState({isLoadingPayment: true});
    API.get(`timesheet/${id}`)
    .then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({
          timesheet: res.timesheet,
          next: res.actions.next,
          prev: res.actions.previous,
          isLoadingPayment: false,
        });
      }
    })
  }

  renderTimeSheet = () => {
    if (this.state.timesheet.days.length > 0) {
      return this.state.timesheet.days.map((res, id) => {
          switch (res.isoWeekPeriod) {
            case "1":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>M</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "2":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>T</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "3":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>W</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "4":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>TH</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "5":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>F</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "6":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>S</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            case "7":
              {
                return (
                  <View key={res.isoWeekPeriod} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                      <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>Su</Text>
                      <Text style={{fontSize: 12, color: '#34314A', fontWeight: '600'}}>{moment(res.date).format('MMM DD')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                    {
                      res.schedules.map((schedule, id) => {
                        return (
                          <View key={id} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3}}>
                            <View style={{flex: 2, paddingHorizontal: 20}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#BBBBBB', fontWeight: '400', textAlign: 'center'}} value={schedule.startTime + ` - ` + schedule.endTime} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 5}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{padding: 5, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), fontSize: 14, color: '#79787D', fontWeight: '400', textAlign: 'center'}} value={`` + schedule.break + ``} />
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                              <TextInput editable={this.state.isEditWorkingHour ? true : false} style={{paddingRight: 10, borderRadius: 3, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), height: 29, fontSize: 20, color: '#35334C', fontWeight: '400', textAlign: 'right'}} value={`` + schedule.payableHours + ``} />
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                )
              }
              break;
            default:

          }
        })
    }
  }

  renderOnShowLoadingPayment = () => {
    if(this.state.isLoadingPayment){
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoadingPayment} size="large" color="#242424"/>
        </View>
      )
    }
  }

  renderNextAndPrevButton = () => {
    return (
      <View style={{position: 'absolute', top: 100, left: 0, right: 0, flexDirection: 'row'}}>
        {
          this.state.prev ?
          <TouchableOpacity onPress={()=>this.getNextOrPreviousTimeSheet(this.state.prev)}>
            <View style={{alignItems: 'flex-start', justifyContent: 'center', marginLeft: 15}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Previous</Text>
            </View>
          </TouchableOpacity>
          :
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#eee'}}>Previous</Text>
          </View>
        }


        {
          this.state.next ?
          <TouchableOpacity onPress={()=>this.getNextOrPreviousTimeSheet(this.state.next)}>
            <View style={{alignItems: 'flex-end', justifyContent: 'center', marginRight: 15}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Next</Text>
            </View>
          </TouchableOpacity>
          :
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#eee'}}>Next</Text>
          </View>
        }

      </View>
    )
  }

  render() {
    let props = this.props.navigation.state.params.props;
    let timesheet = this.state.timesheet;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <ZHeader
          headerTitle={`${props.staff.fullname} Time Sheet`}
          titleStyle={{fontSize: 16, fontWeight: '500'}}
          leftIcon="ios-arrow-round-back-outline"
          leftIconColor="white"
          leftIconPress={()=>this.props.navigation.goBack()}
        />

        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <TextInput style={{padding: 5, borderRadius: 5, fontSize: 22, borderWidth: (this.state.isEditWorkingHour ? 0.5 : 0), width: 200, color: '#34314A', fontWeight: '500', textAlign: 'center'}} value={timesheet.label} />
          </View>

          {
            !this.state.isEditWorkingHour ?
            <TouchableOpacity onPress={()=>this.setState({isEditWorkingHour: true})}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Working Hours</Text>
                <Icon name="ios-create-outline" size={20} color="#65DAE8" style={{marginLeft: 5, backgroundColor: 'transparent'}} />
              </View>
            </TouchableOpacity>
            : null
          }

          {
            !this.state.isEditWorkingHour ?
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 16, color: 'green', fontWeight: '500'}}>{timesheet.days.length > 0 ? timesheet.paymentStatus.toUpperCase() : ''}</Text>
            </View>
            : null
          }

          <View style={{padding: 10, marginTop: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#79787D', paddingBottom: 10, marginBottom: 10}}>
              <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '600'}}>Date and Time</Text>
              </View>
              <View style={{flex: 1, marginRight: 65}}>
                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '400', textAlign: 'center'}}></Text>
              </View>
              <View style={{flex: 2, paddingLeft: 20}}>
                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '400', textAlign: 'center'}}>Break hr(s)</Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '400', textAlign: 'center'}}>Payable Hours</Text>
              </View>
            </View>
            {this.renderTimeSheet()}
          </View>

          {
            !this.state.isEditWorkingHour ?
              <View style={{paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, color: '#9A9A9A'}}>The hours are calculated on the original schedules, however you can update the hours and the rate.</Text>
              </View>
            :
              <View style={{marginBottom: 20, marginTop: 20}}>
                <ZRoundedButton name="Save" normalButtonStyle={{width: 100, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.setState({isEditWorkingHour: false})} />
              </View>
          }

          <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
           <View style={{flex: 1}}>
             <View style={{alignItems: 'flex-start'}}>
               <Text style={{fontSize: 16, color: '#34314A', fontWeight: '500'}}>Total Payable Hours :</Text>
             </View>

             <TouchableOpacity onPress={()=>this.setState({isEditPayableHour: true})}>
               <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5}}>
                 <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Payable Hours</Text>
                 <Icon name="ios-create-outline" size={20} color="#65DAE8" style={{marginLeft: 5, backgroundColor: 'transparent'}} />
               </View>
             </TouchableOpacity>
           </View>

           <View style={{alignItems: 'center'}}>
             <TextInput editable={this.state.isEditPayableHour ? true : false} style={{width: 70, padding: 5, borderRadius: 3, borderWidth: (this.state.isEditPayableHour ? 0.5 : 0), fontSize: 18, color: '#34314A', fontWeight: '500', textAlign: 'center'}} value={`` + timesheet.totalPayableHours + ``} />
           </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
           <View style={{flex: 1}}>
             <View style={{alignItems: 'flex-start'}}>
               <Text style={{fontSize: 16, color: '#34314A', fontWeight: '500'}}>Rate Per Hours :</Text>
             </View>

             <TouchableOpacity onPress={()=>this.setState({isEditRate: true})}>
               <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5}}>
                 <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Rate</Text>
                 <Icon name="ios-create-outline" size={20} color="#65DAE8" style={{marginLeft: 5, backgroundColor: 'transparent'}} />
               </View>
             </TouchableOpacity>
           </View>

           <View style={{alignItems: 'center'}}>
             <TextInput editable={this.state.isEditRate ? true : false} style={{width: 70, padding: 5, borderRadius: 3, borderWidth: (this.state.isEditRate ? 0.5 : 0), fontSize: 14, color: '#34314A', fontWeight: '500', textAlign: 'center'}} value={`$` + props.staff.startRate + `/Hr`} />
           </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
           <View style={{flex: 1}}>
             <View style={{alignItems: 'flex-start'}}>
               <Text style={{fontSize: 20, color: '#34314A', fontWeight: '500'}}>Total to be sent :</Text>
             </View>
           </View>

           {
             !this.state.isEditPayableHour && !this.state.isEditRate ?
               <View style={{alignItems: 'center'}}>
                 <Text style={{fontSize: 22, color: '#34314A', fontWeight: '500'}}>AUD ${(timesheet.totalPayableHours * props.staff.startRate)}</Text>
               </View>
              : null
           }
          </View>

          {
            !this.state.isEditPayableHour && !this.state.isEditRate ?
            <View style={{marginBottom: 20, marginTop: 20}}>
              <ZRoundedButton name="Pay Staff" normalButtonStyle={{width: 150, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"  onPress={() => this.onPayStaff(timesheet, props)} />
            </View>
            :
            <View style={{marginBottom: 20, marginTop: 20}}>
              <ZRoundedButton name="Save" normalButtonStyle={{width: 100, flex: 1, alignSelf: 'center'}} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA" onPress={()=>this.setState({isEditPayableHour: false, isEditRate: false})} />
            </View>
          }

          {
            !this.state.isEditWorkingHour ?
            this.renderNextAndPrevButton()
            : null
          }

        </ScrollView>
        {this.renderOnShowLoadingPayment()}
      </View>
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
