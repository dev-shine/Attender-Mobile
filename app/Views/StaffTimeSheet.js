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

import React, {Component} from 'react';

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
import DateTimePicker from 'react-native-modal-datetime-picker';

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
            isShowConfirmation: false,
            accName: '',
            accNumber: '',
            isShowEditButton: true,
            currentTime: new Date(),
            type: '',
            isTimePicker: false
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
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
        this.setState({isLoadingPayment: true});

        if (this.state.banksArray.length > 0) {
            console.log(timesheet)
            var totalAmount = timesheet.totalPayableHours * props.staff.startRate;
            var promiseId = this.state.banksArray[0].promiseId;

            API.post(`timesheet/${timesheet.id}/make_payment`, {amount: totalAmount, account_id: promiseId})
                .then((res) => {
                    if (res.status) {
                        alert('Payment Transferred.');
                        this.setState({isLoadingPayment: false});
                        this.props.navigation.goBack();
                    } else {
                        alert(`There is no total amount to be paid.`);
                        this.setState({isLoadingPayment: false});
                    }
                    console.log('Pay staff', res);
                });
        } else {
            alert('Please add atleast (1) bank account');
            this.setState({isLoadingPayment: false});
        }

    }

    getStaffTimeSheet = () => {
        console.log(`management/${this.props.navigation.state.params.managementId}/timesheet/current`);
        API.get(`management/${this.props.navigation.state.params.managementId}/timesheet/current`)
            .then((res) => {
                console.log('management', res);
                if (res.status) {
                    this.setState({timesheet: res.timesheet, next: res.actions.next, prev: res.actions.previous});
                }
            })
    }

    getNextOrPreviousTimeSheet = (id) => {
        this.setState({isLoadingPayment: true});
        API.get(`timesheet/${id}`)
            .then((res) => {
                console.log('timesheet', res);
                if (res.status) {
                    this.setState({
                        timesheet: res.timesheet,
                        next: res.actions.next,
                        prev: res.actions.previous,
                        isLoadingPayment: false
                    });
                }
            })
    }

    onShowTimePicker = (type, startOrEnd, currentTime) => {
        this.setState({isTimePicker: true, type: type, startOrEnd: startOrEnd, currentTime: currentTime});
    }


    timeFormatter = (time) => {
        if (time != '') {
            return moment(time).format('hh A');
        } else {
            return time;
        }
    }

    getPayableHours(startTime, endTime) {
        let start = moment(startTime, ['hh:mm A', 'hh A'])
        let end = moment(endTime, ['hh:mm A', 'hh A'])
        let payableHours = (start.isValid() && end.isValid()) ? moment.duration(end.diff(start)).asHours() : 0
        payableHours = payableHours < 0 ? payableHours + 24 : payableHours
        return payableHours;
    }

    getTotalPayableHours() {
        let totalPayableHours = 0
        if (this.state.timesheet.days.length > 0) {
            this.state.timesheet.days.map((res) => {
                switch (res.isoWeekPeriod) {
                    case "1": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["monstartTime" + (id + 1)]) startTime = this.state["monstartTime" + (id + 1)]
                            if (this.state["monendTime" + (id + 1)]) endTime = this.state["monendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    case "2": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["tuestartTime" + (id + 1)]) startTime = this.state["tuestartTime" + (id + 1)]
                            if (this.state["tueendTime" + (id + 1)]) endTime = this.state["tueendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    case "3": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["wedstartTime" + (id + 1)]) startTime = this.state["wedstartTime" + (id + 1)]
                            if (this.state["wedendTime" + (id + 1)]) endTime = this.state["wedendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    case "4": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["thustartTime" + (id + 1)]) startTime = this.state["thustartTime" + (id + 1)]
                            if (this.state["thuendTime" + (id + 1)]) endTime = this.state["thuendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    case "5": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["fristartTime" + (id + 1)]) startTime = this.state["fristartTime" + (id + 1)]
                            if (this.state["friendTime" + (id + 1)]) endTime = this.state["friendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours

                        })
                    }
                        break;
                    case "6": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["satstartTime" + (id + 1)]) startTime = this.state["satstartTime" + (id + 1)]
                            if (this.state["satendTime" + (id + 1)]) endTime = this.state["satendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    case "7": {
                        res.schedules.map((schedule, id) => {
                            let startTime = schedule.startTime
                            let endTime = schedule.endTime
                            if (this.state["sunstartTime" + (id + 1)]) startTime = this.state["sunstartTime" + (id + 1)]
                            if (this.state["sunendTime" + (id + 1)]) endTime = this.state["sunendTime" + (id + 1)]
                            let payableHours = this.getPayableHours(startTime, endTime)
                            totalPayableHours +=payableHours
                        })
                    }
                        break;
                    default:

                }
            })
        }
        return totalPayableHours
    }

    onSelectTime = (time) => {
        console.log(this.state)
        switch (this.state.type) {
            case 'Monday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({monstartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({monendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Monday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({monstartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({monendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Tuesday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({tuestartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({tueendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Tuesday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({tuestartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({tueendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Wednesday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({wedstartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({wedendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Wednesday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({wedstartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({wedendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Thursday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({thustartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({thuendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Thursday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({thustartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({thuendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Friday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({fristartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({friendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Friday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({fristartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({friendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Saturday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({satstartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({satendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Saturday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({satstartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({satendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Sunday1': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({sunstartTime1: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({sunendTime1: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            case 'Sunday2': {
                if (this.state.startOrEnd == 'start') {
                    this.setState({sunstartTime2: this.timeFormatter(time), isTimePicker: false});
                } else {
                    this.setState({sunendTime2: this.timeFormatter(time), isTimePicker: false});
                }
            }
                break;
            default:

        }

    }
    renderConfirmTransfer = () => {
        let props = this.props.navigation.state.params.props;
        let timesheet = this.state.timesheet;
        timesheet.totalPayableHours = this.getTotalPayableHours()
        let totalAmount = timesheet.totalPayableHours * props.staff.startRate;

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isShowConfirmation}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.9,
                        backgroundColor: 'white'
                    }}/>
                    <View style={{backgroundColor: '#FFFFFF', height: '60%', justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            <View>
                                <ZText text="Transfer" styles={{color: '#777777', fontSize: 16, fontWeight: 'bold'}}/>
                                <ZText text={`$` + totalAmount} styles={{color: '#615AB9', fontSize: 35}}/>
                                <ZText text="from your Bank Account to"
                                       styles={{color: '#737373', fontSize: 15, textAlign: 'center'}}/>
                                <ZText text={props.staff.fullname} styles={{color: '#625BA1', fontSize: 18}}/>
                                <ZText text={this.state.accName} styles={{
                                    color: '#625BA1',
                                    fontSize: 19,
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}/>
                                <ZText text="with an account number of"
                                       styles={{color: '#737373', fontSize: 15, marginTop: 1, textAlign: 'center'}}/>
                                <ZText text={this.state.accNumber} styles={{color: '#625BA1', fontSize: 18}}/>
                            </View>

                            <View style={{marginTop: 60}}>
                                <TouchableOpacity
                                    onPress={() => [this.onPayStaff(timesheet, props), this.setState({isShowConfirmation: false})]}>
                                    <View style={{
                                        borderRadius: 5,
                                        backgroundColor: '#5FDAE9',
                                        padding: 5,
                                        margin: 10,
                                        paddingHorizontal: 10,
                                        width: 120,
                                        height: 35,
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={{position: 'absolute'}}
                                                  onPress={() => this.setState({isShowConfirmation: false})}>
                                    <View style={{
                                        backgroundColor: 'transparent',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                        top: -330,
                                        left: 125
                                    }}>
                                        <Image source={require('../Assets/Closeicon.png')}
                                               style={{width: 15, height: 15}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderTimeSheet = () => {
        if (this.state.timesheet.days.length > 0) {
            return this.state.timesheet.days.map((res, id) => {
                switch (res.isoWeekPeriod) {
                    case "1": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>M</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {
                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["monstartTime" + (id + 1)]) startTime = this.state["monstartTime" + (id + 1)]
                                            if (this.state["monendTime" + (id + 1)]) endTime = this.state["monendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)

                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Monday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Monday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "2": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>T</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {
                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["tuestartTime" + (id + 1)]) startTime = this.state["tuestartTime" + (id + 1)]
                                            if (this.state["tueendTime" + (id + 1)]) endTime = this.state["tueendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)

                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Tuesday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Tuesday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "3": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>W</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {

                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["wedstartTime" + (id + 1)]) startTime = this.state["wedstartTime" + (id + 1)]
                                            if (this.state["wedendTime" + (id + 1)]) endTime = this.state["wedendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)
                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Wednesday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Wednesday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{schedule.startTime} - {schedule.endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "4": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>TH</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {

                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["thustartTime" + (id + 1)]) startTime = this.state["thustartTime" + (id + 1)]
                                            if (this.state["thuendTime" + (id + 1)]) endTime = this.state["thuendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)
                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Thursday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Thursday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "5": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>F</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {

                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["fristartTime" + (id + 1)]) startTime = this.state["fristartTime" + (id + 1)]
                                            if (this.state["friendTime" + (id + 1)]) endTime = this.state["friendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)
                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Friday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Friday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "6": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>S</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {

                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["satstartTime" + (id + 1)]) startTime = this.state["satstartTime" + (id + 1)]
                                            if (this.state["satendTime" + (id + 1)]) endTime = this.state["satendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)
                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Saturday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Saturday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
                    case "7": {
                        return (
                            <View key={res.isoWeekPeriod} style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#79787D',
                                paddingBottom: 10,
                                marginBottom: 10
                            }}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 26, color: '#34314A', fontWeight: '600'}}>Su</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#34314A',
                                        fontWeight: '600'
                                    }}>{moment(res.date).format('MMM DD')}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {
                                        res.schedules.map((schedule, id) => {

                                            let startTime = schedule.startTime
                                            let endTime = schedule.endTime
                                            if (this.state["sunstartTime" + (id + 1)]) startTime = this.state["sunstartTime" + (id + 1)]
                                            if (this.state["sunendTime" + (id + 1)]) endTime = this.state["sunendTime" + (id + 1)]
                                            let payableHours = this.getPayableHours(startTime, endTime)
                                            return (
                                                <View key={id} style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 3
                                                }}>
                                                    {!this.state.isShowEditButton ?
                                                        <View style={{
                                                            flex: 2,
                                                            flexDirection: 'row',
                                                            margin: "auto",
                                                            paddingVertical: 5,
                                                            alignItems: 'center'
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Sunday' + (id + 1), 'start', startTime)}>
                                                                <ZMuteText text={startTime + ' - '}/>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => this.onShowTimePicker('Sunday' + (id + 1), 'end', endTime)}>
                                                                <ZMuteText text={endTime}/>
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View style={{flex: 2}}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                color: '#BBBBBB',
                                                                fontWeight: '400',
                                                                textAlign: 'center'
                                                            }}>{startTime} - {endTime}</Text>
                                                        </View>
                                                    }
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#79787D',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{schedule.break}</Text>
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: '#35334C',
                                                            fontWeight: '400',
                                                            textAlign: 'center'
                                                        }}>{payableHours}</Text>
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
        if (this.state.isLoadingPayment) {
            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#eee',
                    opacity: 0.5
                }}>
                    <ActivityIndicator animating={this.state.isLoadingPayment} size="large" color="#242424"/>
                </View>
            )
        }
    }

    onPressPayStaff = (status) => {
        if (status == 'paid') {
            alert('Staff already paid for this week')
        } else {
            if (this.state.banksArray.length > 0) {
                this.setState({
                    accName: this.state.banksArray[0].bankMeta.account_name,
                    accNumber: this.state.banksArray[0].bankMeta.account_number
                })
            }
            this.setState({isShowConfirmation: true})
        }
    }

    renderNextAndPrevButton = () => {
        return (
            <View style={{position: 'absolute', top: 100, left: 0, right: 0, flexDirection: 'row'}}>
                {
                    this.state.prev ?
                        <TouchableOpacity onPress={() => this.getNextOrPreviousTimeSheet(this.state.prev)}>
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
                        <TouchableOpacity onPress={() => this.getNextOrPreviousTimeSheet(this.state.next)}>
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
                    leftIconPress={() => this.props.navigation.goBack()}
                />

                <ScrollView style={{flex: 1}}>
                    <View style={{alignItems: 'center', marginTop: 15}}>
                        <Text style={{fontSize: 22, color: '#34314A', fontWeight: '500'}}>{timesheet.label}</Text>
                    </View>


                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <TouchableOpacity
                            onPress={() => this.setState({isShowEditButton: !this.state.isShowEditButton})}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Working
                                    Hours</Text>
                                <Icon name="ios-create-outline" size={20} color="#65DAE8"
                                      style={{marginLeft: 5, backgroundColor: 'transparent'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={{
                            fontSize: 16,
                            color: 'green',
                            fontWeight: '500'
                        }}>{timesheet.days.length > 0 ? timesheet.paymentStatus.toUpperCase() : ''}</Text>
                    </View>

                    <View style={{padding: 10, marginTop: 20}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#79787D',
                            paddingBottom: 10,
                            marginBottom: 10
                        }}>
                            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '600'}}>Date and Time</Text>
                            </View>
                            <View style={{flex: 1, marginRight: 65}}>
                                <Text style={{
                                    fontSize: 10,
                                    color: '#79787D',
                                    fontWeight: '400',
                                    textAlign: 'center'
                                }}></Text>
                            </View>
                            <View style={{flex: 2, paddingLeft: 20}}>
                                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '400', textAlign: 'center'}}>Break
                                    hr(s)</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Text style={{fontSize: 10, color: '#79787D', fontWeight: '400', textAlign: 'center'}}>Payable
                                    Hours</Text>
                            </View>
                        </View>
                        {this.renderTimeSheet()}
                    </View>

                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{fontSize: 12, color: '#9A9A9A'}}>The hours are calculated on the original
                            schedules, however you can update the hours and the rate.</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 16, color: '#34314A', fontWeight: '500'}}>Total Payable Hours
                                    :</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Payable
                                    Hours</Text>
                                <Icon name="ios-create-outline" size={20} color="#65DAE8"
                                      style={{marginLeft: 5, backgroundColor: 'transparent'}}/>
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 18,
                                color: '#34314A',
                                fontWeight: '500'
                            }}>{this.getTotalPayableHours()}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 16, color: '#34314A', fontWeight: '500'}}>Rate Per Hours
                                    :</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <Text style={{fontSize: 14, color: '#65DAE8', fontWeight: '500'}}>Edit Rate</Text>
                                <Icon name="ios-create-outline" size={20} color="#65DAE8"
                                      style={{marginLeft: 5, backgroundColor: 'transparent'}}/>
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 18, color: '#34314A', fontWeight: '500'}}>${props.staff.startRate}/Hr</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 30}}>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 20, color: '#34314A', fontWeight: '500'}}>Total to be sent
                                    :</Text>
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 22, color: '#34314A', fontWeight: '500'}}>AUD
                                ${(this.getTotalPayableHours() * props.staff.startRate)}</Text>
                        </View>
                    </View>

                    <View style={{marginBottom: 20, marginTop: 20}}>
                        <ZRoundedButton name="Pay Staff" normalButtonStyle={{width: 150, flex: 1, alignSelf: 'center'}}
                                        normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"
                                        onPress={() => this.onPressPayStaff(timesheet.paymentStatus)}/>
                    </View>

                    {this.renderNextAndPrevButton()}

                </ScrollView>

                <DateTimePicker
                    mode="time"
                    date={new Date(moment(this.state.currentTime, 'hh A').format())}
                    isVisible={this.state.isTimePicker}
                    onConfirm={this.onSelectTime}
                    onCancel={() => this.setState({isTimePicker: false})}
                />
                {this.renderOnShowLoadingPayment()}
                {this.renderConfirmTransfer()}
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
