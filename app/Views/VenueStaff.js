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
import ZHeaderTab from 'ZHeaderTab';
import API from 'API';
import TrialPeriod from './TrialPeriod';

import DateTimePicker from 'react-native-modal-datetime-picker';

import Icon from 'react-native-vector-icons/Ionicons';

var moment = require('moment');
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Reducers/subscriptionActions';

const ws = require('adonis-websocket-client');
const io = ws('https://staging.attender.com.au');
export const client = io.channel('chat').connect();

class VenueStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            nullz: '',
            staffs: [],
            tabStaffSelected: true,
            tabTrialSelected: false,
            isShowStaffSchedule: false,
            isShowEditButton: true,
            showMonSched1: false,
            showMonSched2: false,
            showTueSched1: false,
            showTueSched2: false,
            showWedSched1: false,
            showWedSched2: false,
            showThuSched1: false,
            showThuSched2: false,
            showFriSched1: false,
            showFriSched2: false,
            showSatSched1: false,
            showSatSched2: false,
            showSunSched1: false,
            showSunSched2: false,
            monstartTime1: '',
            monendTime1: '',
            monstartTime2: '',
            monendTime2: '',
            tuestartTime1: '',
            tueendTime1: '',
            tuestartTime2: '',
            tueendTime2: '',
            wedstartTime1: '',
            wedendTime1: '',
            wedstartTime2: '',
            wedendTime2: '',
            thustartTime1: '',
            thuendTime1: '',
            thustartTime2: '',
            thuendTime2: '',
            fristartTime1: '',
            friendTime1: '',
            fristartTime2: '',
            friendTime2: '',
            satstartTime1: '',
            satendTime1: '',
            satstartTime2: '',
            satendTime2: '',
            sunstartTime1: '',
            sunendTime1: '',
            sunstartTime2: '',
            sunendTime2: '',
            isTrialShow: false,
            data1: [],
            data2: [],
            selectedStaff: {},
            editableState: false,
            type: '',
            task: '',
            suggestion: '',
            tasks: [],
            suggestions: [],
            isTimePicker: false,
            isEditButton: true,
            hideTaskButton: true,
            buttonStateTaskSuggest: true,
            isAddTask: false,
            isAddSuggest: false,
            descriptionTask: '',
            descriptionSuggest: '',
            userProfile: [],
            currentTime: new Date(),
            userData: [],
            bartenders: [],
            managers: [],
            waiters: [],
            chefs: [],
            kitchens: [],
            barbacks: [],
            hosts: [],
            bartenders2: [],
            managers2: [],
            waiters2: [],
            chefs2: [],
            kitchens2: [],
            barbacks2: [],
            hosts2: [],
            isBartender: true,
            isManager: true,
            isWaiter: true,
            isChef: false,
            isKitchen: true,
            isBarbacks: true,
            isHost: true,
            types: [],
            isLanguage: false,
            isLicense: false,
            isCertificate: false,
            isVideo: false
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.getActiveStaffs();
        this.getTrialStaffs();
        this.getVenueProfile();
    }

    onUnHire = () => {
        API.post(`remove-staff/${this.state.selectedStaff._id}`, {}).then((res) => {
            console.log(res);
            if (res.status) {
                this.setState({isTrialShow: false, isActiveContent: false})
                this.getActiveStaffs();
                this.getTrialStaffs();
                this.getVenueProfile();
            } else {
                alert('Something went wrong.');
            }
        });
    }

    onDirectHire = () => {
        API.post(`hire/${this.state.selectedStaff.staff._id}`, {}).then((res) => {
            console.warn('Something', res);
            if (res.status) {
                this.setState({isTrialShow: false, isActiveContent: true})
                this.getActiveStaffs();
                this.getTrialStaffs();
                this.getVenueProfile();
            } else {
                alert('Something went wrong.');
            }
        });
    }

    getVenueProfile = () => {
        API.get('auth/current').then((res) => {
            console.log('User', res);
            if (res.status) {
                client.joinRoom(res.data._id, {}, console.log);

                this.setState({userData: res.data});
                this.getActiveStaffs();
                this.getTrialStaffs();
            }
        });
    }

    // getConversationId = (userProfile) => {
    //   API.get(`open-convo/${userProfile.staff.user}`).then((res) => {
    //     if (res.status) {
    //       this.props.navigation.navigate('ChatBox', {messageDetails: {usid: userProfile.staff.user,  uselect: userProfile.staff._id, _id: res.conversation}, staff: userProfile, userData: this.state.userData, type: 'Venue'})
    //     }
    //   });
    // }

    getConversationId = (userProfile, myProfile) => {
        let profile = userProfile;
        if (userProfile instanceof Array) {
            profile = userProfile[0]
        }
        console.log("VenueStaff", profile)
        API.get(`open-convo/${profile.staff.user}`).then((res) => {
            console.log(res);
            if (res.status) {
                this.props.navigation.navigate('ChatBox', {
                    messageDetails: {
                        usid: profile.staff.user,
                        uselect: profile.staff._id,
                        _id: res.conversation
                    }, staff: profile.staff, userData: myProfile, type: 'Venue', newMessage: true
                })
            }
        });
    }

    getActiveStaffs = () => {
        API.get(`active-staffs?filters=${this.state.types.join()}`).then((res) => {
            console.log(res)
            if (res.status) {
                this.setState({
                    data1: res.staffs,
                    bartenders: res.managements.bartender,
                    managers: res.managements.manager,
                    waiters: res.managements.waiter,
                    chefs: res.managements.chefs,
                    kitchens: res.managements.kitchen,
                    barbacks: res.managements.barback,
                    hosts: res.managements.host
                });
            }
        })
    }

    getTrialStaffs = () => {
        API.get(`trial-staffs?filters=${this.state.types.join()}`).then((res) => {
            console.log('TrialStaff', res)
            if (res.status) {
                this.setState({
                    data2: res.staffs,
                    bartenders2: res.managements.bartender,
                    managers2: res.managements.manager,
                    waiters2: res.managements.waiter,
                    chefs2: res.managements.chefs,
                    kitchens2: res.managements.kitchen,
                    barbacks2: res.managements.barback,
                    hosts2: res.managements.host
                });
            }
        })
    }

    saveTasks = () => {
        var taskData = {
            description: this.state.tasks
        }
        console.log('Tasks', taskData);

        // API.post(`add-task/${_id}`, taskData).then((res)=>{
        //   if (res.status) {
        //     console.log()
        //   }else {
        //     alert('Something wrong');
        //   }
        // })
    }

    saveSuggestions = () => {
        var suggestData = {
            description: this.state.suggestions
        }
        console.log('Suggestions', suggestData);

        // API.post(`add-suggestion/${_id}`, suggestData).then((res)=>{
        //   if (res.status) {
        //     this.props.navigation.goBack()
        //   }else {
        //     alert('Something wrong');
        //   }
        // })
    }

    onSaveEvent = () => {
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
            eventImage: this.state.photo,
        }

        console.log(eventData);
        const {navigate} = this.props.navigation;

        API.post('events', eventData).then((res) => {
            console.log(res);
            if (res.status) {
                this.props.navigation.goBack()
            } else {
                alert('Something wrong');
            }
        });
    }

    timeFormatter = (time) => {
        if (time != '') {
            return moment(time).format('hh A');
        } else {
            return time;
        }
    }

    onSaveStaffSchedule = (managementId) => {
        var staffSchedule = {
            schedules: JSON.stringify({
                monday: [
                    {startTime: this.state.monstartTime1, endTime: this.state.monendTime1},
                    {startTime: this.state.monstartTime2, endTime: this.state.monendTime2}
                ],
                tuesday: [
                    {startTime: this.state.tuestartTime1, endTime: this.state.tueendTime1},
                    {startTime: this.state.tuestartTime2, endTime: this.state.tueendTime2}
                ],
                wednesday: [
                    {startTime: this.state.wedstartTime1, endTime: this.state.wedendTime1},
                    {startTime: this.state.wedstartTime2, endTime: this.state.wedendTime2}
                ],
                thursday: [
                    {startTime: this.state.thustartTime1, endTime: this.state.thuendTime1},
                    {startTime: this.state.thustartTime2, endTime: this.state.thuendTime2}
                ],
                friday: [
                    {startTime: this.state.fristartTime1, endTime: this.state.friendTime1},
                    {startTime: this.state.fristartTime2, endTime: this.state.friendTime2}
                ],
                saturday: [
                    {startTime: this.state.satstartTime1, endTime: this.state.satendTime1},
                    {startTime: this.state.satstartTime2, endTime: this.state.satendTime2}
                ],
                sunday: [
                    {startTime: this.state.sunstartTime1, endTime: this.state.sunendTime1},
                    {startTime: this.state.sunstartTime2, endTime: this.state.sunendTime2}
                ],
            })
        }
        API.post(`save-staff-sched/${managementId}`, staffSchedule)
            .then((res) => {
                console.log('save schedule', res);
                if (res.status) {
                    this.getActiveStaffs();
                    this.getTrialStaffs();
                    this.setState({isShowEditButton: true});
                }
            });

    }

    renderHeaderTabStaff = (text, state) => {
        if (this.state.tabStaffSelected) {
            return (
                <TouchableOpacity style={{flex: 1}} onPress={() => this.onSelectHeaderTab('Staff')}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 2.5,
                        borderColor: '#8F90FC',
                        padding: 20
                    }}>
                        <Text style={{fontSize: 17, color: 'white', fontWeight: '500'}}>{text}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{flex: 1}} onPress={() => this.onSelectHeaderTab('Staff')}>
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Text style={{fontSize: 17, color: '#9B9AA6', fontWeight: '500'}}>{text}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }

    renderHeaderTabTrial = (text, state) => {
        if (this.state.tabTrialSelected) {
            return (
                <TouchableOpacity style={{flex: 1}} onPress={() => this.onSelectHeaderTab('Trial')}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#8F90FC',
                        borderBottomWidth: 2.5,
                        borderColor: '#8F90FC',
                        padding: 20
                    }}>
                        <Text style={{fontSize: 17, color: 'white', fontWeight: '500'}}>{text}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{flex: 1}} onPress={() => this.onSelectHeaderTab('Trial')}>
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Text style={{fontSize: 17, color: '#9B9AA6', fontWeight: '500'}}>{text}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }

    onSelectHeaderTab = (type) => {
        if (type == 'Staff') {
            this.setState({tabStaffSelected: true, tabTrialSelected: false});
        } else {
            this.setState({tabStaffSelected: false, tabTrialSelected: true});
        }
    }

    timeToDateTime = (time) => {
        // if (time.length > 0) {
        //   return moment(time).format('hh A')
        // } else {
        //   return time;
        // }

        return time;
    }

    onSelectStaffSchedule = (res) => {
        let schedules = res.schedules || {};
        if (Object.keys(schedules).length > 0) {
            this.setState({
                isShowStaffSchedule: true,
                userProfile: res,
                monstartTime1: schedules.monday[0].startTime,
                monendTime1: schedules.monday[0].endTime,
                monstartTime2: schedules.monday[1].startTime,
                monendTime2: schedules.monday[1].endTime,
                tuestartTime1: schedules.tuesday[0].startTime,
                tueendTime1: schedules.tuesday[0].endTime,
                tuestartTime2: schedules.tuesday[1].startTime,
                tueendTime2: schedules.tuesday[1].endTime,
                wedstartTime1: schedules.wednesday[0].startTime,
                wedendTime1: schedules.wednesday[0].endTime,
                wedstartTime2: schedules.wednesday[1].startTime,
                wedendTime2: schedules.wednesday[1].endTime,
                thustartTime1: schedules.thursday[0].startTime,
                thuendTime1: schedules.thursday[0].endTime,
                thustartTime2: schedules.thursday[1].startTime,
                thuendTime2: schedules.thursday[1].endTime,
                fristartTime1: schedules.friday[0].startTime,
                friendTime1: schedules.friday[0].endTime,
                fristartTime2: schedules.friday[1].startTime,
                friendTime2: schedules.friday[1].endTime,
                satstartTime1: schedules.saturday[0].startTime,
                satendTime1: schedules.saturday[0].endTime,
                satstartTime2: schedules.saturday[1].startTime,
                satendTime2: schedules.saturday[1].endTime,
                sunstartTime1: schedules.sunday[0].startTime,
                sunendTime1: schedules.sunday[0].endTime,
                sunstartTime2: schedules.sunday[1].startTime,
                sunendTime2: schedules.sunday[1].endTime,
                showMonSched1: schedules.monday[0].startTime.length > 0 ? true : false,
                showMonSched2: schedules.monday[1].startTime.length > 0 ? true : false,
                showTueSched1: schedules.tuesday[0].startTime.length > 0 ? true : false,
                showTueSched2: schedules.tuesday[1].startTime.length > 0 ? true : false,
                showWedSched1: schedules.wednesday[0].startTime.length > 0 ? true : false,
                showWedSched2: schedules.wednesday[1].startTime.length > 0 ? true : false,
                showThuSched1: schedules.thursday[0].startTime.length > 0 ? true : false,
                showThuSched2: schedules.thursday[1].startTime.length > 0 ? true : false,
                showFriSched1: schedules.friday[0].startTime.length > 0 ? true : false,
                showFriSched2: schedules.friday[1].startTime.length > 0 ? true : false,
                showSatSched1: schedules.saturday[0].startTime.length > 0 ? true : false,
                showSatSched2: schedules.saturday[1].startTime.length > 0 ? true : false,
                showSunSched1: schedules.sunday[0].startTime.length > 0 ? true : false,
                showSunSched2: schedules.sunday[1].startTime.length > 0 ? true : false,
            })
        } else {
            this.setState({
                isShowStaffSchedule: true,
                userProfile: res,
                showMonSched1: false,
                showMonSched2: false,
                showTueSched1: false,
                showTueSched2: false,
                showWedSched1: false,
                showWedSched2: false,
                showThuSched1: false,
                showThuSched2: false,
                showFriSched1: false,
                showFriSched2: false,
                showSatSched1: false,
                showSatSched2: false,
                showSunSched1: false,
                showSunSched2: false,
                monstartTime1: '',
                monendTime1: '',
                monstartTime2: '',
                monendTime2: '',
                tuestartTime1: '',
                tueendTime1: '',
                tuestartTime2: '',
                tueendTime2: '',
                wedstartTime1: '',
                wedendTime1: '',
                wedstartTime2: '',
                wedendTime2: '',
                thustartTime1: '',
                thuendTime1: '',
                thustartTime2: '',
                thuendTime2: '',
                fristartTime1: '',
                friendTime1: '',
                fristartTime2: '',
                friendTime2: '',
                satstartTime1: '',
                satendTime1: '',
                satstartTime2: '',
                satendTime2: '',
                sunstartTime1: '',
                sunendTime1: '',
                sunstartTime2: '',
                sunendTime2: '',
            });
        }

    }

    onPayStaff = (res) => {
        this.props.navigation.navigate('StaffTimeSheet', {managementId: res._id, props: res});
    }

    renderDeleteMonSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showMonSched1: false, monstartTime1: '', monendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteMonSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showMonSched2: false, monstartTime2: '', monendTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteTueSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showTueSched1: false, tuestartTime1: '', tueendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteTueSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showTueSched2: false, tuestartTime2: '', tuestartTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteWedSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showWedSched1: false, wedstartTime1: '', wedendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteWedSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showWedSched2: false, wedstartTime2: '', wedstartTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteThuSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showThuSched1: false, thustartTime1: '', thuendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteThuSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showThuSched2: false, thustartTime2: '', thuendTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteFriSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showFriSched1: false, fristartTime1: '', friendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteFriSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showFriSched2: false, fristartTime2: '', friendTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteSatSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showSatSched1: false, satstartTime1: '', satendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteSatSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showSatSched2: false, satstartTime2: '', satendTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteSunSched1 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showSunSched1: false, sunstartTime1: '', sunendTime1: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    renderDeleteSunSched2 = () => {
        if (!this.state.isShowEditButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.setState({showSunSched2: false, sunstartTime2: '', sunendTime2: ''})}
                    style={{position: 'absolute'}}>
                    <View style={{
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        backgroundColor: '#5453B5',
                        alignItems: 'center',
                        left: 97,
                        top: -22
                    }}>
                        <Icon name='md-close' size={14} color='white' style={{backgroundColor: 'transparent'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    onShowTimePicker = (type, startOrEnd, currentTime) => {
        this.setState({isTimePicker: true, type: type, startOrEnd: startOrEnd, currentTime: currentTime});
    }

    onSelectTime = (time) => {
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

    renderMondaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.monstartTime1 == '' || this.state.monendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.monstartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.monendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showMonSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Monday1', 'start', this.state.monstartTime1)}>
                                <ZMuteText text={this.state.monstartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Monday1', 'end', this.state.monendTime1)}>
                                <ZMuteText text={this.state.monendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteMonSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showMonSched1: true,
                            monstartTime1: moment().format('hh A'),
                            monendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderMondaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.monstartTime2 == '' || this.state.monendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.monstartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.monendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showMonSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Monday2', 'start', this.state.monstartTime2)}>
                                <ZMuteText text={this.state.monstartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Monday2', 'end', this.state.monendTime2)}>
                                <ZMuteText text={this.state.monendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteMonSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showMonSched2: true,
                            monstartTime2: moment().format('hh A'),
                            monendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    renderTuesdaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.tuestartTime1 == '' || this.state.tueendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.tuestartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.tueendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showTueSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Tuesday1', 'start', this.state.tuestartTime1)}>
                                <ZMuteText text={this.state.tuestartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Tuesday1', 'end', this.state.tueendTime1)}>
                                <ZMuteText text={this.state.tueendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteTueSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showTueSched1: true,
                            tuestartTime1: moment().format('hh A'),
                            tueendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderTuesdaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.tuestartTime2 == '' || this.state.tueendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.tuestartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.tueendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showTueSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Tuesday2', 'start', this.state.tuestartTime2)}>
                                <ZMuteText text={this.state.tuestartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Tuesday2', 'end', this.state.tueendTime2)}>
                                <ZMuteText text={this.state.tueendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteTueSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showTueSched2: true,
                            tuestartTime2: moment().format('hh A'),
                            tueendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderWednesdaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.wedstartTime1 == '' || this.state.wedendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.wedstartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.wedendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showWedSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Wednesday1', 'start', this.state.wedstartTime1)}>
                                <ZMuteText text={this.state.wedstartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Wednesday1', 'end', this.state.wedendTime1)}>
                                <ZMuteText text={this.state.wedendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteWedSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showWedSched1: true,
                            wedstartTime1: moment().format('hh A'),
                            wedendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderWednesdaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.wedstartTime2 == '' || this.state.wedendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.wedstartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.wedendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showWedSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Wednesday2', 'start', this.state.wedstartTime2)}>
                                <ZMuteText text={this.state.wedstartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Wednesday2', 'end', this.state.wedendTime2)}>
                                <ZMuteText text={this.state.wedendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteWedSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showWedSched2: true,
                            wedstartTime2: moment().format('hh A'),
                            wedendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderThursdaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.thustartTime1 == '' || this.state.thuendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.thustartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.thuendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showThuSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Thursday1', 'start', this.state.thustartTime1)}>
                                <ZMuteText text={this.state.thustartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Thursday1', 'end', this.state.thuendTime1)}>
                                <ZMuteText text={this.state.thuendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteThuSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showThuSched1: true,
                            thustartTime1: moment().format('hh A'),
                            thuendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderThursdaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.thustartTime2 == '' || this.state.thuendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.thustartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.thuendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showThuSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Thursday2', 'start', this.state.thustartTime2)}>
                                <ZMuteText text={this.state.thustartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Thursday2', 'end', this.state.thuendTime2)}>
                                <ZMuteText text={this.state.thuendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteThuSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showThuSched2: true,
                            thustartTime2: moment().format('hh A'),
                            thuendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderFridaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.fristartTime1 == '' || this.state.friendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.fristartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.friendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showFriSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Friday1', 'start', this.state.fristartTime1)}>
                                <ZMuteText text={this.state.fristartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Friday1', 'end', this.state.friendTime1)}>
                                <ZMuteText text={this.state.friendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteFriSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showFriSched1: true,
                            fristartTime1: moment().format('hh A'),
                            friendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderFridaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.fristartTime2 == '' || this.state.friendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.fristartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.friendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showFriSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Friday2', 'start', this.state.fristartTime2)}>
                                <ZMuteText text={this.state.fristartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Friday2', 'end', this.state.friendTime2)}>
                                <ZMuteText text={this.state.friendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteFriSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showFriSched2: true,
                            fristartTime2: moment().format('hh A'),
                            friendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderSaturdaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.satstartTime1 == '' || this.state.satendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.satstartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.satendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showSatSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Saturday1', 'start', this.state.satstartTime1)}>
                                <ZMuteText text={this.state.satstartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Saturday1', 'end', this.state.satendTime1)}>
                                <ZMuteText text={this.state.satendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteSatSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showSatSched1: true,
                            satstartTime1: moment().format('hh A'),
                            satendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderSaturdaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.satstartTime2 == '' || this.state.satendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 5,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.satstartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.satendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showSatSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Saturday2', 'start', this.state.satstartTime2)}>
                                <ZMuteText text={this.state.satstartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Saturday2', 'end', this.state.satendTime2)}>
                                <ZMuteText text={this.state.satendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteSatSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showSatSched2: true,
                            satstartTime2: moment().format('hh A'),
                            satendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderSundaySched1 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.sunstartTime1 == '' || this.state.sunendTime1 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.sunstartTime1 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.sunendTime1}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showSunSched1) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Sunday1', 'start', this.state.sunstartTime1)}>
                                <ZMuteText text={this.state.sunstartTime1 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Sunday1', 'end', this.state.sunendTime1)}>
                                <ZMuteText text={this.state.sunendTime1}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteSunSched1()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showSunSched1: true,
                            sunstartTime1: moment().format('hh A'),
                            sunendTime1: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    renderSundaySched2 = () => {
        if (this.state.isShowEditButton) {
            if (this.state.sunstartTime2 == '' || this.state.sunendTime2 == '') {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF'
                    }}>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.nullz}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 8,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <ZMuteText text={this.state.sunstartTime2 + ' - '}/>
                        </View>
                        <View>
                            <ZMuteText text={this.state.sunendTime2}/>
                        </View>
                    </View>
                )
            }
        } else if (!this.state.isShowEditButton) {
            if (this.state.showSunSched2) {
                return (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        paddingVertical: 10,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Sunday2', 'start', this.state.sunstartTime2)}>
                                <ZMuteText text={this.state.sunstartTime2 + ' - '}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.onShowTimePicker('Sunday2', 'end', this.state.sunendTime2)}>
                                <ZMuteText text={this.state.sunendTime2}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderDeleteSunSched2()}
                    </View>
                )
            } else {
                return (
                    <View style={{flex: 1, margin: 2, paddingVertical: 5, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={() => this.setState({
                            showSunSched2: true,
                            sunstartTime2: moment().format('hh A'),
                            sunendTime2: moment().format('hh A')
                        })}>
                            <Image source={require('../Assets/plusiconcalendar.png')}
                                   style={{width: 20, height: 20, resizeMode: 'stretch', marginLeft: 6}}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    // <View style={{flex: 1, alignItems: 'flex-start'}}>
    //   <TouchableOpacity style={{position: 'absolute'}}>
    //     <Image source={require('./Assets/editiconpopup.png')} style={{height: 35, width: 35, resizeMode: 'stretch', top: -490, right: 12}}/>
    //   </TouchableOpacity>
    // </View>

    renderSaveButtton = (id) => {
        if (!this.state.isShowEditButton) {
            return (
                <ZRoundedButton name="Save" styles={{marginRight: 20}}
                                normalButtonStyle={{backgroundColor: '#64DAE7', width: 140, alignSelf: 'center'}}
                                normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"
                                onPress={() => this.onSaveStaffSchedule(id)}/>
            )
        }
    }

    onButtonPress = () => {
        if (this.state.isEditButton) {
            this.setState({
                buttonStateTaskSuggest: false,
                isEditButton: false,
                hideTaskButton: false,
                editableState: true,
            });
        } else {
            // this.saveTasks()
            // this.saveSuggestions()
            var $assignments = {
                assignments: JSON.stringify({
                    tasks: this.state.selectedStaff.assignments.tasks,
                    suggestions: this.state.selectedStaff.assignments.suggestions
                })
            }
            API.post(`save-staff-assignment/${this.state.selectedStaff._id}`, $assignments)
                .then((res) => {
                    console.log(res);
                });

            this.setState({
                buttonStateTaskSuggest: true,
                isEditButton: true,
                hideTaskButton: true,
                editableState: false
            });


        }
    }

    renderEditSaveButton = () => {
        if (this.state.isEditButton) {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
                        <TouchableOpacity onPress={() => this.onButtonPress()}>
                            <Image source={require('../Assets/editiconpopup.png')}
                                   style={{height: 25, width: 25, resizeMode: 'stretch'}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 16, color: '#818181'}}>Edit</Text>
                </View>
            )
        } else {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5}}>
                        <TouchableOpacity onPress={() => this.onButtonPress()}>
                            <Image source={require('../Assets/Save.png')}
                                   style={{margin: 4, height: 17, width: 17, resizeMode: 'stretch'}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 16, color: '#818181', marginLeft: 3}}>Save</Text>
                </View>
            )
        }
    }

    renderTasks = (tasks) => {
        return (
            <View style={{flex: 1}}>
                {
                    tasks.map((res, id) => {
                        return (
                            <View key={id} style={{
                                width: '100%',
                                marginHorizontal: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                <View style={{
                                    width: '95%',
                                    flexDirection: 'row',
                                    borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)
                                    }}>
                                        <Image source={require('../Assets/Donelisticon.png')} style={{
                                            height: 25,
                                            width: 25,
                                            resizeMode: 'stretch',
                                            margin: 15,
                                            padding: 10
                                        }}/>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <TextInput placeholder='type task here..' editable={this.state.editableState}
                                                   multiline={true}
                                                   onChangeText={(value) => this.onChangeTaskText(value, id)}
                                                   value={res.description} style={{
                                            width: 260,
                                            height: 40,
                                            fontSize: 15,
                                            color: '#393650',
                                            padding: 10
                                        }}/>
                                    </View>
                                    {
                                        this.state.editableState ?
                                            <View style={{alignItems: 'flex-end'}}>
                                                <TouchableOpacity onPress={() => this.onRemoveTaskPress(res._id)}
                                                                  style={{position: 'absolute', top: -9, left: -6}}>
                                                    <View style={{
                                                        backgroundColor: '#5D5CAA',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: 8,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon name="ios-remove" size={45} color="white" style={{
                                                            backgroundColor: 'transparent',
                                                            width: 10,
                                                            paddingTop: 5
                                                        }}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                        )
                    })
                }

                {this.renderAddTask()}
            </View>
        )
    }

    renderSuggestions = (suggestions) => {
        return (
            <View style={{flex: 1, marginBottom: 10}}>
                <View style={{marginVertical: 5, marginHorizontal: 10,}}>
                    <Text style={{fontSize: 15, color: '#AAA7AF'}}>SUGGESTION</Text>
                </View>
                {
                    suggestions.map((res, id) => {
                        return (
                            <View key={id} style={{
                                width: '100%',
                                marginHorizontal: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                <View style={{
                                    width: '95%',
                                    flexDirection: 'row',
                                    borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)
                                    }}>
                                        <Image source={require('../Assets/Donelisticon.png')} style={{
                                            height: 25,
                                            width: 25,
                                            resizeMode: 'stretch',
                                            margin: 15,
                                            padding: 10
                                        }}/>
                                    </View>
                                    <View style={{justifyContent: 'center'}}>
                                        <TextInput placeholder='type task here..' editable={this.state.editableState}
                                                   multiline={true}
                                                   onChangeText={(value) => this.onChangeSuggestionText(value, id)}
                                                   value={res.description} style={{
                                            width: 260,
                                            height: 40,
                                            fontSize: 15,
                                            color: '#393650',
                                            padding: 10
                                        }}/>
                                    </View>
                                    {
                                        this.state.editableState ?
                                            <View style={{alignItems: 'flex-end'}}>
                                                <TouchableOpacity onPress={() => this.onRemoveSuggestPress(res._id)}
                                                                  style={{position: 'absolute', top: -9, left: -6}}>
                                                    <View style={{
                                                        backgroundColor: '#5D5CAA',
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: 8,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Icon name="ios-remove" size={45} color="white" style={{
                                                            backgroundColor: 'transparent',
                                                            width: 10,
                                                            paddingTop: 5
                                                        }}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                        )
                    })
                }

                {this.renderAddSuggestion()}
            </View>
        )
    }

    onChangeTaskText = (value, id) => {
        var task = this.state.selectedStaff.assignments.tasks;
        task[id].description = value;
        this.setState({selectedStaff: this.state.selectedStaff});
    }

    onChangeSuggestionText = (value, id) => {
        var suggestion = this.state.selectedStaff.assignments.suggestions;
        suggestion[id].description = value;
        this.setState({selectedStaff: this.state.selectedStaff});
    }

    onRemoveTaskPress = (id) => {
        var task = this.state.selectedStaff;
        if (task.assignments.tasks.length < 0) {

        } else {
            task.assignments.tasks.splice(id, 1);
            this.setState({
                selectedStaff: task
            });
        }
    }

    onRemoveSuggestPress = (id) => {
        var suggest = this.state.selectedStaff;
        if (suggest.assignments.suggestions.length < 0) {

        } else {
            suggest.assignments.suggestions.splice(id, 1);
            this.setState({
                selectedStaff: suggest
            });
        }
    }

    onAddTaskPress = () => {
        var task = this.state.selectedStaff.assignments.tasks;

        var $task = {
            description: ''
        }
        task.push($task)
        this.setState({
            isAddTask: true
        })
        // tasks: task,
    }

    onAddSuggestionPress = () => {
        var suggest = this.state.selectedStaff.assignments.suggestions;
        var $suggest = {
            description: ''
        }
        suggest.push($suggest)
        this.setState({
            isAddSuggest: true
        })
    }

    // renderTaskInput = (task, key) => {
    //   if (this.state.isAddTask) {
    //     return(
    //       <View key={key} style={{flex: 1}}>
    //         <View style={{width: '100%', marginHorizontal: 10, padding: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
    //           <View style={{width: '95%', flexDirection: 'row', borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
    //             <View style={{justifyContent: 'center', borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
    //               <Image source={require('../Assets/Donelisticon.png')} style={{height: 25, width: 25, resizeMode: 'stretch', margin: 15, padding: 10}}/>
    //             </View>
    //             <View style={{justifyContent: 'center', alignItems: 'center'}}>
    //               <TextInput placeholder='type task here..' editable={this.state.editableState} multiline={true} onChangeText={(value) => this.setState({task: value})} style={{width: 260, height: 40, fontSize: 15, color: '#393650', padding: 10}}/>
    //             </View>
    //             <View style={{ alignItems: 'flex-end'}}>
    //               <TouchableOpacity onPress={()=>this.onRemoveTaskPress(key)} style={{position: 'absolute', top: -9, left: -6}}>
    //                 <View style={{backgroundColor:'#5D5CAA', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
    //                   <Icon name="ios-remove" size={45} color="white" style={{backgroundColor: 'transparent', width: 10, paddingTop: 5}} />
    //                 </View>
    //               </TouchableOpacity>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     )
    //   }
    // }

    // renderSuggestInput = (task, key) => {
    //   if (this.state.isAddSuggest) {
    //     return(
    //       <View key={key} style={{flex: 1}}>
    //         <View style={{width: '100%', marginHorizontal: 10, padding: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
    //           <View style={{width: '95%', flexDirection: 'row', borderWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
    //             <View style={{justifyContent: 'center', borderRightWidth: (this.state.buttonStateTaskSuggest ? 0 : 0.5)}}>
    //               <Image source={require('../Assets/Donelisticon.png')} style={{height: 25, width: 25, resizeMode: 'stretch', margin: 15, padding: 10}}/>
    //             </View>
    //             <View style={{justifyContent: 'center', alignItems: 'center'}}>
    //               <TextInput placeholder='type task here..' editable={this.state.editableState} multiline={true} onChangeText={(value) => this.setState({suggestion: value})} style={{width: 260, height: 40, fontSize: 15, color: '#393650', padding: 10}}/>
    //             </View>
    //             <View style={{ alignItems: 'flex-end'}}>
    //               <TouchableOpacity style={{position: 'absolute', top: -9, left: -6}}>
    //                 <View style={{backgroundColor:'#5D5CAA', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
    //                   <Icon name="ios-remove" size={45} color="white" style={{backgroundColor: 'transparent', width: 10, paddingTop: 5}} />
    //                 </View>
    //               </TouchableOpacity>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     )
    //   }
    // }

    renderAddTask = () => {
        if (!this.state.hideTaskButton) {
            return (
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
                    <TouchableOpacity onPress={() => this.onAddTaskPress()}>
                        <View style={{
                            backgroundColor: '#625BBA',
                            padding: 5,
                            paddingHorizontal: 10,
                            height: 40,
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120
                        }}>
                            <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>+ Add Task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderAddSuggestion = () => {
        if (!this.state.hideTaskButton) {
            return (
                <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
                    <TouchableOpacity onPress={() => this.onAddSuggestionPress()}>
                        <View style={{
                            backgroundColor: '#625BBA',
                            padding: 5,
                            paddingHorizontal: 10,
                            height: 40,
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 150
                        }}>
                            <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>+ Add Suggestion</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderStaffModal = () => {
        let res = this.state.userProfile;
        let schedule = res.schedules;
        LayoutAnimation.easeInEaseOut();
        if (this.state.isShowStaffSchedule) {
            return (
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={this.state.isShowStaffSchedule}
                >
                    <View style={{flex: 1}}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            opacity: 0.9,
                            backgroundColor: 'white'
                        }}/>

                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                                <Image style={{width: 60, height: 60, borderRadius: 30}}
                                       source={{uri: res.staff.avatar}}/>

                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                                    <ZText text={res.staff.fullname}
                                           styles={{marginTop: 1, fontSize: 18, fontWeight: 'bold'}}/>
                                </View>

                            </View>

                            <View style={{flex: 1}}>
                                <View
                                    style={{backgroundColor: 'white', marginBottom: 10, marginTop: 0, borderRadius: 5}}>
                                    <View style={{marginVertical: 20, padding: 15}}>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View style={{flex: 1}}>
                                                {
                                                    this.state.isShowEditButton ?
                                                        <TouchableOpacity
                                                            style={{position: 'absolute', top: -55, left: -15}}
                                                            onPress={() => this.setState({isShowEditButton: false})}>
                                                            <View style={{
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: 'transparent',
                                                                width: 50,
                                                                height: 50
                                                            }}>
                                                                <Image source={require('../Assets/editiconpopup.png')}
                                                                       style={{
                                                                           height: 40,
                                                                           width: 40,
                                                                           resizeMode: 'stretch'
                                                                       }}/>
                                                            </View>
                                                        </TouchableOpacity>
                                                        : null
                                                }
                                            </View>
                                            <View style={{flex: 1}}>
                                                <TouchableOpacity style={{position: 'absolute', top: -58, left: 138}}
                                                                  onPress={() => this.setState({isShowStaffSchedule: false})}>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#F5F5F5',
                                                        margin: 10,
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 15
                                                    }}>
                                                        <Icon name='ios-close-outline' size={35}
                                                              style={{backgroundColor: 'transparent'}}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{flexDirection: 'row', marginBottom: 15, marginTop: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Monday</Text>
                                            </View>
                                            {this.renderMondaySched1()}
                                            {this.renderMondaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Tuesday</Text>
                                            </View>
                                            {this.renderTuesdaySched1()}
                                            {this.renderTuesdaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Wednesday</Text>
                                            </View>
                                            {this.renderWednesdaySched1()}
                                            {this.renderWednesdaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Thursday</Text>
                                            </View>
                                            {this.renderThursdaySched1()}
                                            {this.renderThursdaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Friday</Text>
                                            </View>
                                            {this.renderFridaySched1()}
                                            {this.renderFridaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Saturday</Text>
                                            </View>
                                            {this.renderSaturdaySched1()}
                                            {this.renderSaturdaySched2()}
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <View style={{margin: 5, paddingVertical: 5, width: 100}}>
                                                <Text>Sunday</Text>
                                            </View>
                                            {this.renderSundaySched1()}
                                            {this.renderSundaySched2()}
                                        </View>
                                    </View>

                                    <DateTimePicker
                                        mode="time"
                                        date={new Date(moment(this.state.currentTime, 'hh A').format())}
                                        isVisible={this.state.isTimePicker}
                                        onConfirm={this.onSelectTime}
                                        onCancel={() => this.setState({isTimePicker: false})}
                                    />

                                    <View style={{marginBottom: 20, alignItems: 'center'}}>
                                        {this.renderSaveButtton(res._id)}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    renderAvatar = (data) => {
        if (data.avatar == '' || data.avatar == 'undefined') {
            return (
                'https://www.nztcc.org/themes/kos/images/avatar.png'
            )
        } else {
            return (
                data.avatar
            )
        }
    }
    getSelectedType = (type, id, value) => {
        var $type = this.state.types;
        switch (type) {
            case 'bartender':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isBartender: false});
                } else {
                    $type.push(type);
                    this.setState({isBartender: true});
                }
                break;
            case 'manager':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isManager: false});
                } else {
                    $type.push(type);
                    this.setState({isManager: true});
                }
                break;
            case 'waiter':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isWaiter: false});
                } else {
                    $type.push(type);
                    this.setState({isWaiter: true});
                }
                break;
            case 'chef':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isChef: false});
                } else {
                    $type.push(type);
                    this.setState({isChef: true});
                }
                break;
            case 'kitchen':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isKitchen: false});
                } else {
                    $type.push(type);
                    this.setState({isKitchen: true});
                }
                break;
            case 'barback':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isBarback: false});
                } else {
                    $type.push(type);
                    this.setState({isBarback: true});
                }
                break;
            case 'host':
                if (!value) {
                    var index = $type.indexOf(type);
                    $type.splice(index, 1);
                    this.setState({isHost: false});
                } else {
                    $type.push(type);
                    this.setState({isHost: true});
                }
                break;
            default:
        }
        console.log($type);
        this.getActiveStaffs();
        this.getTrialStaffs();
    }

    renderBartender = () => {
        let myProfile = this.state.userData;
        let userProfile = this.state.data1;
        return (
            <View style={styles.cardBody}>
                {
                    this.state.bartenders.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(userProfile, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderManager = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.managers.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderWaiter = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.waiters.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderChef = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.chefs.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderKitchen = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.kitchens.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderBarback = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.barbacks.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderHost = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.hosts.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: false,
                                    isActiveContent: true,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPayStaff(res)}
                                                  style={{position: 'absolute', top: 20, left: 10}}>
                                    <View>
                                        <Icon name="md-time" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderAllTrial = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.data2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }
    renderBartender2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.bartenders2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderManager2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.managers2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderWaiter2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.waiters2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderChef2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.chefs2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderKitchen2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.kitchens2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderBarback2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.barbacks2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderHost2 = () => {
        let myProfile = this.state.userData;

        return (
            <View style={styles.cardBody}>
                {
                    this.state.hosts2.map((res, index) => {
                        return (
                            <ZCard key={index} styles={{borderWidth: 0, backgroundColor: 'white', margin: 5}}>
                                <TouchableOpacity onPress={() => this.setState({
                                    isTrialShow: true,
                                    isActiveContent: false,
                                    selectedStaff: res
                                })}>
                                    <ZAvatar source={this.renderAvatar(res.staff)} hideIndicator={true}/>
                                    <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                </TouchableOpacity>
                                <ZRater/>
                                <ZMuteText text={res.staff.frequency}/>
                                <ZMuteText text={res.staff.rateBadge}/>
                                <View style={{marginVertical: 10}}>
                                    <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"
                                                    onPress={() => this.getConversationId(res, myProfile)}/>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MonthlyReview', {props: res})}>
                                    <View style={{borderBottomWidth: 1, borderColor: '#5F5FBA'}}>
                                        <Text style={{color: '#5F5FBA', fontSize: 13}}>Add monthly review</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onSelectStaffSchedule(res)}
                                                  style={{position: 'absolute', top: 20, right: 10}}>
                                    <View>
                                        <Icon name="md-calendar" size={30} color="#716D7B"/>
                                    </View>
                                </TouchableOpacity>

                            </ZCard>
                        )
                    })
                }
            </View>
        )
    }

    renderLanguage = (skills) => {
        if (this.state.isLanguage) {
            return (
                <View style={{flex: 1, width: '100%'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '95%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {
                                    skills.map((res, index) => {
                                        return (
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{color: '#22252C', fontSize: 13}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
            )
        }
    }

    renderLicense = (skills) => {
        if (this.state.isLicense) {
            return (
                <View style={{flex: 1, width: '100%'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '95%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {
                                    skills.map((res, index) => {
                                        return (
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{color: '#22252C', fontSize: 13}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
            )
        }
    }

    renderCertificate = (skills) => {
        if (this.state.isCertificate) {
            return (
                <View style={{flex: 1, width: '100%'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '95%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {
                                    skills.map((res, index) => {
                                        return (
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{color: '#22252C', fontSize: 13}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
            )
        }
    }

    renderVideo = (skills) => {
        if (this.state.isVideo) {
            return (
                <View style={{flex: 1, width: '100%'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '95%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {
                                    skills.map((res, index) => {
                                        return (
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{color: '#22252C', fontSize: 13}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
            )
        }
    }

    renderActiveStaff = () => {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}
                        contentContainerStyle={{top: 0, paddingBottom: 50, justifyContent: 'center', bottom: 50}}>
                {/**<ZHeaderTab
                 leftIcon="ios-arrow-round-back-outline"
                 leftIconColor="white"
                 leftIconPress={()=>this.props.navigation.goBack()}>

                 <View style={{flex: 1, flexDirection: 'row'}}>
                 {this.renderHeaderTabStaff('Active Staff (23)')}
                 {this.renderHeaderTabTrial('Trial Period (5)')}
                 </View>

                 </ZHeaderTab>**/}

                <View style={styles.plainBody}>

                    <ZMuteText text="TO" styles={{textAlign: 'left'}}/>

                    <ZSliderCard>

                        <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')}
                               photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartenders"
                               isSelected={this.state.isBartender}
                               selectedIcon={(value) => this.getSelectedType('bartender', 0, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')}
                               photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager"
                               isSelected={this.state.isManager}
                               selectedIcon={(value) => this.getSelectedType('manager', 1, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')}
                               photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter"
                               isSelected={this.state.isWaiter}
                               selectedIcon={(value) => this.getSelectedType('waiter', 2, value)}/>

                        <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')}
                               photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen"
                               isSelected={this.state.isKitchen}
                               selectedIcon={(value) => this.getSelectedType('kitchen', 4, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')}
                               photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barbacks"
                               isSelected={this.state.isBarbacks}
                               selectedIcon={(value) => this.getSelectedType('barback', 5, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')}
                               photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host"
                               isSelected={this.state.isHost}
                               selectedIcon={(value) => this.getSelectedType('host', 6, value)}/>

                    </ZSliderCard>

                </View>


                <View style={styles.cardBody}>
                    {this.state.isBartender ? this.renderBartender() : null}
                    {this.state.isManager ? this.renderManager() : null}
                    {this.state.isWaiter ? this.renderWaiter() : null}
                    {this.state.isChef ? this.renderChef() : null}
                    {this.state.isKitchen ? this.renderKitchen() : null}
                    {this.state.isBarback ? this.renderBarback() : null}
                    {this.state.isHost ? this.renderHost() : null}
                </View>
                {this.renderStaffModal()}
            </ScrollView>
        )
    }

    renderTrialStaff = () => {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}
                        contentContainerStyle={{top: 0, paddingBottom: 50, justifyContent: 'center', bottom: 50}}>

                {/**<ZHeaderTab
                 leftIcon="ios-arrow-round-back-outline"
                 leftIconColor="white"
                 leftIconPress={()=>this.props.navigation.goBack()}>

                 <View style={{flex: 1, flexDirection: 'row'}}>
                 {this.renderHeaderTabStaff('Active Staff (23)')}
                 {this.renderHeaderTabTrial('Trial Period (5)')}
                 </View>

                 </ZHeaderTab>**/}

                <View style={styles.plainBody}>

                    <ZMuteText text="TO" styles={{textAlign: 'left'}}/>

                    <ZSliderCard>

                        <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')}
                               photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Bartenders"
                               isSelected={this.state.isBartender}
                               selectedIcon={(value) => this.getSelectedType('bartender', 0, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/managericonselected.png')}
                               photoUrlUnSelected={require('../Assets/managericon.png')} iconText="Manager"
                               isSelected={this.state.isManager}
                               selectedIcon={(value) => this.getSelectedType('manager', 1, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/waitericonselected.png')}
                               photoUrlUnSelected={require('../Assets/waitericon.png')} iconText="Waiter"
                               isSelected={this.state.isWaiter}
                               selectedIcon={(value) => this.getSelectedType('waiter', 2, value)}/>

                        <ZIcon photoUrlSelected={require('../Assets/cookiconselected.png')}
                               photoUrlUnSelected={require('../Assets/cookicon.png')} iconText="Kitchen"
                               isSelected={this.state.isKitchen}
                               selectedIcon={(value) => this.getSelectedType('kitchen', 4, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/barbackiconselected.png')}
                               photoUrlUnSelected={require('../Assets/barbackicon.png')} iconText="Barbacks"
                               isSelected={this.state.isBarbacks}
                               selectedIcon={(value) => this.getSelectedType('barback', 5, value)}/>
                        <ZIcon photoUrlSelected={require('../Assets/hosticonselected.png')}
                               photoUrlUnSelected={require('../Assets/hosticon.png')} iconText="Host"
                               isSelected={this.state.isHost}
                               selectedIcon={(value) => this.getSelectedType('host', 6, value)}/>

                    </ZSliderCard>


                </View>


                <View style={styles.cardBody}>
                    {this.renderAllTrial()}
                </View>
                {this.renderStaffModal()}
            </ScrollView>
        )
    }

    renderActiveProfile = () => {
        if (this.state.isActiveContent) {
            return (
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                    <ScrollView style={styles.container}
                                contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>

                        <ZHeader
                            headerTitle="Active Staff"
                            titleStyle={{fontSize: 16, fontWeight: '500'}}
                            leftIcon="ios-arrow-round-back-outline"
                            leftIconColor="white"
                            leftIconPress={() => this.props.navigation.goBack()}
                        />

                        <View style={styles.body}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}}/>
                                    <ZMuteText text={moment(this.state.selectedStaff.hiredDate).format('DD MMM')}/>
                                </View>
                            </View>

                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 15
                            }}>

                                <View style={{flex: 1}}>
                                    <ZAvatar
                                        source={this.props.navigation.state.params ? this.props.navigation.state.params.userData.employer.image : 'https://www.nztcc.org/themes/kos/images/avatar.png'}
                                        hideIndicator={true}/>
                                    <ZText
                                        text={this.props.navigation.state.params ? this.props.navigation.state.params.userData.employer.name : ''}
                                        styles={{fontSize: 14}}/>
                                </View>

                                <View style={{flex: 1}}>
                                    <ZAvatar
                                        source={this.state.selectedStaff.staff.avatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'}
                                        hideIndicator={true}/>
                                    <ZText text={this.state.selectedStaff.staff.fullname} styles={{fontSize: 14}}/>
                                </View>

                            </View>
                        </View>

                        <View style={styles.body2}>
                            {this.renderEditSaveButton()}
                            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#33304B'}}>Todays Tasks</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                {this.renderTasks(this.state.selectedStaff.assignments.tasks)}

                                {this.renderSuggestions(this.state.selectedStaff.assignments.suggestions)}
                            </View>
                        </View>

                        <View style={styles.body}>
                            <ZHero text="Overall Rating 85/100"
                                   styles={{color: '#33314B', fontWeight: 'normal', fontSize: 16}}/>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 20,
                                marginLeft: 20
                            }}>
                                <ZIcon photoUrlSelected={require('../Assets/languageiconselected.png')}
                                       photoUrlUnSelected={require('../Assets/languageicon.png')} iconText="Languages"
                                       isSelected={this.state.isLanguage}
                                       selectedIcon={() => this.setState({isLanguage: this.state.isLanguage ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/cardidicon.png')}
                                       photoUrlUnSelected={require('../Assets/cardidicon.png')} iconText="Licence"
                                       isSelected={this.state.isLicense}
                                       selectedIcon={() => this.setState({isLicense: this.state.isLicense ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')}
                                       photoUrlUnSelected={require('../Assets/Certificatesicon.png')}
                                       iconText="Certificates" isSelected={this.state.isCertificate}
                                       selectedIcon={() => this.setState({isCertificate: this.state.isCertificate ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/cardvideoicon.png')}
                                       photoUrlUnSelected={require('../Assets/cardvideoicon.png')} iconText="Videos"
                                       isSelected={this.state.isVideo}
                                       selectedIcon={() => this.setState({isVideo: this.state.isVideo ? false : true})}/>
                            </View>
                        </View>

                        <View style={{flex: 1, width: '100%', marginBottom: 40}}>
                            {this.renderLanguage(this.state.selectedStaff.staff.languages)}
                            {this.renderLicense(this.state.selectedStaff.staff.licenses)}
                            {this.renderCertificate(this.state.selectedStaff.staff.certificates)}
                            {this.renderVideo(this.state.selectedStaff.staff.videos)}
                        </View>
                        <View style={{
                            marginVertical: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ZRoundedButton name="Unhire" styles={{marginRight: 20}} normalButtonStyle={{
                                backgroundColor: 'red',
                                width: 140,
                                alignSelf: 'center'
                            }} normal={true} isSelected={this.state.selected} selectedColor="#5F5FBA"
                                            onPress={() => this.onUnHire()}/>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderTrialProfile = () => {
        const { navigate } = this.props.navigation;
        if (this.state.isTrialShow) {
            return (
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white'}}>
                    <ScrollView style={styles.container}
                                contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>

                        <ZHeader
                            headerTitle="Trial Period"
                            titleStyle={{fontSize: 16, fontWeight: '500'}}
                            leftIcon="ios-arrow-round-back-outline"
                            leftIconColor="white"
                            leftIconPress={() => this.setState({isTrialShow: false})}
                        />

                        <View style={styles.body}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}}/>
                                    <ZMuteText text={moment(this.state.selectedStaff.trialStartDate).format('DD MMM')}/>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="md-calendar" size={25} color="#716D7B" style={{padding: 5}}/>
                                    <ZMuteText text={moment(this.state.selectedStaff.trialEndDate).format('DD MMM')}/>
                                </View>
                            </View>

                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 15
                            }}>

                                <View style={{flex: 1}}>
                                    <ZAvatar
                                        source={this.props.navigation.state.params ? this.props.navigation.state.params.userData.employer.image : 'https://www.nztcc.org/themes/kos/images/avatar.png'}
                                        hideIndicator={true}/>
                                    <ZText
                                        text={this.props.navigation.state.params ? this.props.navigation.state.params.userData.employer.name : ''}
                                        styles={{fontSize: 14}}/>
                                </View>

                                <View style={{flex: 1}}>
                                    <ZAvatar
                                        source={this.state.selectedStaff.staff.avatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'}
                                        hideIndicator={true}/>
                                    <ZText text={this.state.selectedStaff.staff.fullname} styles={{fontSize: 14}}/>
                                </View>

                            </View>
                        </View>

                        <View style={styles.body2}>
                            {this.renderEditSaveButton()}
                            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#33304B'}}>Todays Tasks</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                {this.renderTasks(this.state.selectedStaff.assignments.tasks)}
                                {this.renderSuggestions(this.state.selectedStaff.assignments.suggestions)}
                            </View>
                        </View>

                        <View style={styles.body}>
                            <ZHero text="Overall Rating 85/100"
                                   styles={{color: '#33314B', fontWeight: 'normal', fontSize: 16}}/>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 20,
                                marginLeft: 20
                            }}>
                                <ZIcon photoUrlSelected={require('../Assets/languageiconselected.png')}
                                       photoUrlUnSelected={require('../Assets/languageicon.png')} iconText="Languages"
                                       isSelected={this.state.isLanguage}
                                       selectedIcon={() => this.setState({isLanguage: this.state.isLanguage ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/cardidicon.png')}
                                       photoUrlUnSelected={require('../Assets/cardidicon.png')} iconText="Licence"
                                       isSelected={this.state.isLicense}
                                       selectedIcon={() => this.setState({isLicense: this.state.isLicense ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')}
                                       photoUrlUnSelected={require('../Assets/Certificatesicon.png')}
                                       iconText="Certificates" isSelected={this.state.isCertificate}
                                       selectedIcon={() => this.setState({isCertificate: this.state.isCertificate ? false : true})}/>
                                <ZIcon photoUrlSelected={require('../Assets/cardvideoicon.png')}
                                       photoUrlUnSelected={require('../Assets/cardvideoicon.png')} iconText="Videos"
                                       isSelected={this.state.isVideo}
                                       selectedIcon={() => this.setState({isVideo: this.state.isVideo ? false : true})}/>
                            </View>
                        </View>

                        <View style={{flex: 1, width: '100%', marginBottom: 40}}>
                            {this.renderLanguage(this.state.selectedStaff.staff.languages)}
                            {this.renderLicense(this.state.selectedStaff.staff.licenses)}
                            {this.renderCertificate(this.state.selectedStaff.staff.certificates)}
                            {this.renderVideo(this.state.selectedStaff.staff.videos)}
                        </View>

                        <View style={{
                            marginVertical: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ZRoundedButton 
                              name="Hire Now" 
                              styles={{marginRight: 20}} 
                              normalButtonStyle={{
                                backgroundColor: '#64DAE7',
                                width: 140,
                                alignSelf: 'center'
                              }} 
                              normal={true} 
                              isSelected={this.state.selected} 
                              selectedColor="#5F5FBA"
                              onPress={() => {
                                if (this.props.Auth.user.isVenue) {
                                  this.props.actions.checkStaffSubscription('MANAGE_STAFF', this.state.selectedStaff.staff._id, (data) => {
                                    if (data.status) {
                                      this.onDirectHire();
                                    } else {
                                      navigate('SubscriptionSubscribe', { type: 'manage', staffId: this.state.selectedStaff.staff._id });
                                    }
                                  });
                                } else {
                                  this.onDirectHire();
                                }
                              }}
                            />
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
    // <TrialPeriod selectedStaff={this.state.selectedStaff} venueName={this.props.navigation.state.params.userData.employer.name} />


    renderContent = () => {
        if (this.state.tabStaffSelected) {
            return this.renderActiveStaff()
        } else {
            return this.renderTrialStaff()
        }

    }

    // else {
    //   if (this.state.isActiveContent) {
    //
    //   }else {
    //
    //   }
    // }

    render() {
        return (
            <View style={{flex: 1}}>
                <ZHeaderTab
                    leftIcon="ios-arrow-round-back-outline"
                    leftIconColor="white"
                    leftIconPress={() => this.props.navigation.goBack()}>

                    <View style={{flexDirection: 'row'}}>
                        {this.renderHeaderTabStaff(`Active Staff (${this.state.data1.length})`)}
                        {this.renderHeaderTabTrial(`Trial Period (${this.state.data2.length})`)}
                    </View>

                </ZHeaderTab>
                {this.renderContent()}
                {this.renderActiveProfile()}
                {this.renderTrialProfile()}
            </View>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueStaff);

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
        width: '95%',
        paddingTop: 10,
        marginBottom: 10,
        marginHorizontal: 10
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
        paddingTop: 10,
        paddingHorizontal: 10
    },
    cardBody: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginVertical: 15,
        marginLeft: 2
    },
    footer: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});
