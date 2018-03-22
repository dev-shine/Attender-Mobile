import ZHeader from 'ZHeader';
import ZHeader2 from 'ZHeader2';
import ZTextInput from 'ZTextInput';
import ZHero from 'ZHero';
import ZIcon from 'ZIcon';
import ZSliderCard from 'ZSliderCard';
import ZSubText from 'ZSubText';
import ZMuteText from 'ZMuteText';
import ZText from 'ZText';
import ZTextMedium from 'ZTextMedium';
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
import ZModal from 'ZModal';
import API from 'API';

var moment = require('moment');
import Calendar from 'react-native-calendar';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    LayoutAnimation,
    TextInput,
    TouchableOpacity,
    Modal,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

const ws = require('adonis-websocket-client');
const io = ws('https://staging.attender.com.au');
export const client = io.channel('chat').connect();

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log("TESTING", props.navigation.state.params)
        this.state = {
            selected: false,
            data: [],
            messages: [],
            isSelected: false,
            selectedTab: (this.props.navigation.state.params ? this.props.navigation.state.params.selectedTab : 'Staff'),
            isSelectedStaff: (this.props.navigation.state.params ? (this.props.navigation.state.params.selectedTab == 'Staff' ? true : false) : true),
            isSelectedMessages: (this.props.navigation.state.params ? (this.props.navigation.state.params.selectedTab == 'Messages' ? true : false) : false),
            isSelectedVenue: (this.props.navigation.state.params ? (this.props.navigation.state.params.selectedTab == 'Venue' ? true : false) : false),
            selectedDate: moment().format(),
            isModalOpen: false,
            isStaffRosterModal: false,
            isShowCalendarEvents: false,
            userName: 'Lorreta Miles',
            isShowStaffSchedule: false,
            isShowEditSchedule: false,
            filters: [],
            userData: [],
            isLoading: true,
            refreshing: false,
            isArchived: false,
            archived: [],
            filterMessages: [],
            isBartender: false,
            isManager: false,
            isWaiter: false,
            isChef: false,
            isKitchen: false,
            isBarback: false,
            isHost: false,
            isShowLanguage: false,
            myStaffs: {
                bartender: [],
                manager: [],
                waiter: [],
                chef: [],
                kitchen: [],
                barback: [],
                host: []
            },
            totalStafffs: 0,
            isLanguage: false,
            isLicense: false,
            isCertificate: false,
            isVideo: false
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount = () => {
        var self = this;
        client.on('message', function (room, message) {
            console.log('room', room, 'message', message);
            if (room == self.state.userData._id) {
                self.getVenueThreadMessages();
            }
            if (message == "refresh-messages") {

            }
        })

        this.getVenueProfile();
        this.getVenueThreadMessages();
        this.getMyStaffs();

    }

    getMyStaffs = () => {
        API.get('my-staffs').then((res) => {
            console.log('my-staffs', res);
            if (res.status) {
                this.setState({myStaffs: res.staffs, totalStafffs: res.total});
            }
        });
    }

    getVenueThreadMessages = () => {
        API.get(`venue-messages?positions=${this.state.filterMessages.join()}`).then((res) => {
            console.log('messages', res);
            if (res.status) {
                this.setState({messages: res.threads})
            }
        });
    }

    getAllStaffs = () => {
        API.get(`staffs?positions=${this.state.filters.join()}`).then((res) => {
            console.log('staffs', res);
            if (res.status) {
                this.setState({data: res.staffs, isLoading: false})
            }
        });
    }

    getVenueProfile = () => {
        API.get('auth/current').then((res) => {
            console.log('User', res);
            if (res.status) {
                client.joinRoom(res.data._id, {}, console.log);

                this.setState({userData: res.data});
                this.getAllStaffs();
            }
        });
    }

    getAllArchived = () => {
        API.get('venue-archives').then((res) => {
            if (res.status) {
                this.setState({archived: res.threads});
            }
        })
    }

    onArchivedMessage = ($id) => {
        API.post(`conversation/${$id}/archive`, {}).then((res) => {
            if (res.status) {
                this.getAllArchived();
                this.getVenueThreadMessages();
            } else {
                alert('Something went wrong');
            }
        })
    }

    onDeleteMessage = ($id) => {
        API.post(`conversation/${$id}/delete`, {}).then((res) => {
            if (res.status) {
                this.getAllArchived();
                this.getVenueThreadMessages();
            } else {
                alert('Something went wrong');
            }
        })
    }

    onRestoreMessage = ($id) => {
        API.post(`conversation/${$id}/restore`, {}).then((res) => {
            console.log(res);
            if (res.status) {
                this.getAllArchived();
                this.getVenueThreadMessages();
            } else {
                alert('Something went wrong');
            }
        })
    }

    onSelectTab = (tab) => {
        switch (tab) {
            case 'Staff': {
                this.setState({
                    selectedTab: tab,
                    isSelectedStaff: true,
                    isSelectedMessages: false,
                    isSelectedVenue: false
                });
            }
                break;
            case 'Messages': {
                this.setState({
                    selectedTab: tab,
                    isSelectedStaff: false,
                    isSelectedMessages: true,
                    isSelectedVenue: false
                });
            }
                break;
            case 'Venue': {
                this.setState({
                    selectedTab: tab,
                    isSelectedStaff: false,
                    isSelectedMessages: false,
                    isSelectedVenue: true
                });
            }
                break;
            default:

        }
    }

    getFilterBy = (filterBy, id, value) => {
        var $filterBy = this.state.filters;
        switch (filterBy) {
            case 'Position': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Price/h': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Availability': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'All': {
                if (!value) {
                    $filterBy.push(filterBy.toLowerCase());
                } else {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                }
            }
                break;
            case 'Bartender': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Manager': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Waiter': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Chef': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Kitchen': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Barback': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            case 'Host': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy.toLowerCase());
                }
            }
                break;
            default:

        }
        console.log($filterBy);
        this.getAllStaffs();
    }

    getFilterMessage = (filterMessage, id, value) => {
        var $filterMessage = this.state.filterMessages;
        switch (filterMessage) {
            case 'All time': {
                if (!value) {
                    $filterMessage.push(filterMessage.toLowerCase());
                } else {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                }
            }
                break;
            case 'Part time': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Full time': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Event': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'All type': {
                if (!value) {
                    $filterMessage.push(filterMessage.toLowerCase());
                } else {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                }
            }
                break;
            case 'Bartender': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Manager': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Waiter': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Chef': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Kitchen': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Barback': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            case 'Host': {
                if (!value) {
                    var index = $filterMessage.indexOf(filterMessage);
                    $filterMessage.splice(index, 1)
                } else {
                    $filterMessage.push(filterMessage.toLowerCase());
                }
            }
                break;
            default:
        }
        console.log($filterMessage);
        this.getVenueThreadMessages();
    }

    calendar = () => {
        const customStyle = {
            calendarContainer: {
                backgroundColor: 'white',
            },
            currentDayCircle: {
                backgroundColor: 'red',
            },
            currentDayText: {
                color: 'red',
            },
            weekendDayButton: {
                backgroundColor: 'transparent',
            },
            selectedDayCircle: {
                backgroundColor: 'red'
            },
            calendarHeading: {
                borderTopWidth: 0,
                borderBottomWidth: 0
            },
            dayButton: {
                borderTopWidth: 0
            },

        }
        return <Calendar
            customStyle={customStyle}
            showControls
            eventDates={['2017-06-10', '2017-06-11', '2017-6-12']}
            events={[{date: '2017-06-15', hasEventCircle: {backgroundColor: 'gray'}}]}
            onDateSelect={(date) => this.onSelectDateEvents(date)}

        />
    }

    onSelectDateEvents = (date) => {
        this.setState({isShowCalendarEvents: true, selectedDate: date});
    }

    renderCalendarEvents = () => {
        return (
            <Modal
                transparent={true}
                animationType='slide'
                visible={this.state.isShowCalendarEvents}
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
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#F5F5F5',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ZText text={moment(this.state.selectedDate).format('D')}
                                       styles={{color: '#5FDAE9', fontSize: 18, fontWeight: 'bold'}}/>
                                <ZText text={moment(this.state.selectedDate).format('MMM').toUpperCase()}
                                       styles={{color: '#5FDAE9', fontSize: 12}}/>
                            </View>

                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                                <ZText text="Event for this day"
                                       styles={{marginTop: 1, fontSize: 18, fontWeight: 'bold'}}/>
                            </View>

                        </View>

                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{backgroundColor: '#F5F5F5', margin: 15, marginTop: 0, borderRadius: 5}}>

                                <View style={{padding: 10, marginVertical: 10, marginBottom: 15}}>
                                    <ZText text="Winery Party" styles={{
                                        color: '#5FDAE9',
                                        backgroundColor: 'transparent',
                                        marginTop: 1,
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}/>
                                    <ZText text="6:30 AM - 11:00 PM"
                                           styles={{color: '#9996A0', marginTop: 5, fontSize: 13}}/>
                                </View>

                                <View style={{marginBottom: 40}}>
                                    <ZText text="Your staff for the day"
                                           styles={{marginTop: 1, fontSize: 15, fontWeight: 'bold'}}/>
                                </View>

                                <View>
                                    <View style={{flexDirection: 'row', borderColor: '#9996A0', marginBottom: 20}}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{marginVertical: 5}}>
                                                <TouchableOpacity>
                                                    <Image style={{width: 60, height: 60, borderRadius: 30}}
                                                           source={{uri: 'https://randomuser.me/api/portraits/men/71.jpg'}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <ZHero text="Andrew O."
                                                   styles={{fontSize: 15, color: '#33314B', marginVertical: 5}}/>

                                            <View style={{borderColor: '#9996A0'}}>
                                                <ZRoundedButton name="Send Message"
                                                                normalButtonStyle={{width: 130, alignSelf: 'center'}}
                                                                miniButton={true} isSelected={this.state.selected}
                                                                selectedColor="#5F5FBA" selectedButton={() => {
                                                }}/>
                                            </View>
                                        </View>

                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{marginVertical: 5}}>
                                                <TouchableOpacity>
                                                    <Image style={{width: 60, height: 60, borderRadius: 30}}
                                                           source={{uri: 'https://randomuser.me/api/portraits/men/71.jpg'}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <ZHero text="Sophie F."
                                                   styles={{fontSize: 15, color: '#33314B', marginVertical: 5}}/>

                                            <View style={{borderColor: '#9996A0'}}>
                                                <ZRoundedButton name="Send Message"
                                                                normalButtonStyle={{width: 130, alignSelf: 'center'}}
                                                                miniButton={true} isSelected={this.state.selected}
                                                                selectedColor="#5F5FBA" selectedButton={() => {
                                                }}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View style={{flexDirection: 'row', borderColor: '#9996A0', marginBottom: 50}}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{marginVertical: 5}}>
                                                <TouchableOpacity>
                                                    <Image style={{width: 60, height: 60, borderRadius: 30}}
                                                           source={{uri: 'https://randomuser.me/api/portraits/men/71.jpg'}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <ZHero text="Andrew O."
                                                   styles={{fontSize: 15, color: '#33314B', marginVertical: 5}}/>

                                            <View style={{borderColor: '#9996A0'}}>
                                                <ZRoundedButton name="Send Message"
                                                                normalButtonStyle={{width: 130, alignSelf: 'center'}}
                                                                miniButton={true} isSelected={this.state.selected}
                                                                selectedColor="#5F5FBA" selectedButton={() => {
                                                }}/>
                                            </View>
                                        </View>

                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{marginVertical: 5}}>
                                                <TouchableOpacity>
                                                    <Image style={{width: 60, height: 60, borderRadius: 30}}
                                                           source={{uri: 'https://randomuser.me/api/portraits/men/71.jpg'}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <ZHero text="Sophie F."
                                                   styles={{fontSize: 15, color: '#33314B', marginVertical: 5}}/>

                                            <View style={{borderColor: '#9996A0'}}>
                                                <ZRoundedButton name="Send Message"
                                                                normalButtonStyle={{width: 130, alignSelf: 'center'}}
                                                                miniButton={true} isSelected={this.state.selected}
                                                                selectedColor="#5F5FBA" selectedButton={() => {
                                                }}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <TouchableOpacity style={{top: -497, left: -20, position: 'absolute'}}>
                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 50,
                                                height: 50,
                                                backgroundColor: 'transparent'
                                            }}>
                                                <Image source={require('./Assets/editiconpopup.png')}
                                                       style={{height: 40, width: 40, resizeMode: 'stretch'}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{top: -500, right: -20, position: 'absolute'}}
                                                          onPress={() => {
                                                              this.setState({isShowCalendarEvents: false})
                                                          }}>
                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 50,
                                                height: 50,
                                                backgroundColor: 'transparent'
                                            }}>
                                                <View style={{
                                                    backgroundColor: '#F5F5F5',
                                                    margin: 10,
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 15,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Icon name='ios-close-outline' size={35}
                                                          style={{backgroundColor: 'transparent'}}/>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderOnShowLoading = () => {
        if (this.state.isLoading) {
            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }}>
                    <ActivityIndicator animating={this.state.isLoading} size="large" color="white"/>
                    <Text style={{fontSize: 10, marginTop: 5, color: 'white'}}>Loading data...</Text>
                </View>
            )
        }
    }

    renderBartender = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isBartender) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.bartender.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>

                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.bartender.length} Bartenders ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderManager = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isManager) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.manager.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>

                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.manager.length} Managers ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderWaiter = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isWaiter) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.waiter.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>
                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.waiter.length} Waiters ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderChef = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isChef) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.chef.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>
                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.chef.length} Kitchens ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderKitchen = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isKitchen) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.kitchen.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>
                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.kitchen.length} Kitchens ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderBarback = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isBarback) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.barback.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>
                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.barback.length} Barbacks ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    renderHost = () => {
        const {navigate} = this.props.navigation;
        if (this.state.isHost) {
            return (
                <View style={styles.plainBody}>
                    <ZSliderCard>
                        {
                            this.state.myStaffs.host.map((res, id) => {
                                return (
                                    <ZCard key={id}
                                           styles={{borderWidth: 0, backgroundColor: 'white', marginRight: 10}}>
                                        <ZAvatar source={this.renderStaffAvatar(res.staff)} hideIndicator={true}/>
                                        <ZText text={res.staff.fullname} styles={{fontSize: 14}}/>
                                        <ZRater/>
                                        <ZMuteText text={res.staff.frequency}/>
                                        <View style={{marginVertical: 10}}>
                                            <ZRoundedButton name="Send Message" styles={{marginRight: 0}} normal={true}
                                                            isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                        </View>
                                    </ZCard>
                                )
                            })
                        }
                    </ZSliderCard>
                    <ZButtonOutline name={`See all ${this.state.myStaffs.host.length} Hosts ↓`} styles={{
                        borderColor: '#D5D4D9',
                        backgroundColor: '#F4F4F4',
                        padding: 10,
                        width: 200,
                        height: 40,
                        alignSelf: 'center'
                    }} textStyles={{color: '#A4A1A9'}} onPress={() => navigate('VStaff', {userData: userProfile})}/>
                </View>
            )
        }
    }

    onButtonPress = (type) => {
        if (type == 'Bartender') {
            if (this.state.isBartender) {
                this.setState({isBartender: false})
            } else {
                this.setState({isBartender: true})
            }
        } else if (type == 'Manager') {
            if (this.state.isManager) {
                this.setState({isManager: false})
            } else {
                this.setState({isManager: true})
            }
        } else if (type == 'Waiter') {
            if (this.state.isWaiter) {
                this.setState({isWaiter: false})
            } else {
                this.setState({isWaiter: true})
            }
        } else if (type == 'Chef') {
            if (this.state.isChef) {
                this.setState({isChef: false})
            } else {
                this.setState({isChef: true})
            }
        } else if (type == 'Kitchen') {
            if (this.state.isKitchen) {
                this.setState({isKitchen: false})
            } else {
                this.setState({isKitchen: true})
            }
        } else if (type == 'Barback') {
            if (this.state.isBarback) {
                this.setState({isBarback: false})
            } else {
                this.setState({isBarback: true})
            }
        } else if (type == 'Host') {
            if (this.state.isHost) {
                this.setState({isHost: false})
            } else {
                this.setState({isHost: true})
            }
        }
    }

    renderStaffAvatar = (data) => {
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

    renderMessageAvatar = (data) => {
        if (data.uavatar == '' || data.uavatar == 'undefined') {
            return (
                'https://www.nztcc.org/themes/kos/images/avatar.png'
            )
        } else {
            return (
                data.uavatar
            )
        }
    }

    onPressLeftIcon = () => {
        const {navigate} = this.props.navigation;
        if (this.props.navigation.state.params.navigateToMenu) {
            this.props.navigation.dispatch({
                type: 'Navigation/RESET',
                index: 0,
                actions: [{type: 'Navigate', routeName: 'HomeEmployer'}]
            });
        } else {
            // this.props.navigation.state.params.onGoBack()
            this.props.navigation.goBack();
        }
    }

    renderLanguage = (skills) => {
        return (
            <Modal
                transparent={true}
                animationType='slide'
                visible={this.state.isLanguage}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.9,
                    backgroundColor: '#F5F5F5'
                }}/>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{alignItems: 'center', marginLeft: 30}}>
                        <ZIcon photoUrlSelected={require('./Assets/languageiconselected.png')}
                               photoUrlUnSelected={require('./Assets/languageicon.png')} isSelected={false}/>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                        <ZText text='Languages' styles={{marginTop: 1, fontSize: 18, fontWeight: 'bold'}}/>
                    </View>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '90%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 20,
                                backgroundColor: 'white',
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
                                                <Text style={{color: '#22252C', fontSize: 14}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({isLanguage: false})
                }} style={{position: 'absolute'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: 'transparent',
                        top: 300,
                        right: -320
                    }}>
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            margin: 10,
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='ios-close-outline' size={35} style={{backgroundColor: 'transparent'}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderLicense = (skills) => {
        return (
            <Modal
                transparent={true}
                animationType='slide'
                visible={this.state.isLicense}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.9,
                    backgroundColor: '#F5F5F5'
                }}/>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '90%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 20,
                                backgroundColor: 'white',
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
                                                <Text style={{color: '#22252C', fontSize: 14}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({isLicense: false})
                }} style={{position: 'absolute'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: 'transparent',
                        top: 300,
                        right: -320
                    }}>
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            margin: 10,
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='ios-close-outline' size={35} style={{backgroundColor: 'transparent'}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderCertificate = (skills) => {
        return (
            <Modal
                transparent={true}
                animationType='slide'
                visible={this.state.isCertificate}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.9,
                    backgroundColor: '#F5F5F5'
                }}/>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '90%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 20,
                                backgroundColor: 'white',
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
                                                <Text style={{color: '#22252C', fontSize: 14}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({isCertificate: false})
                }} style={{position: 'absolute'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: 'transparent',
                        top: 300,
                        right: -320
                    }}>
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            margin: 10,
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='ios-close-outline' size={35} style={{backgroundColor: 'transparent'}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderVideo = (skills) => {
        return (
            <Modal
                transparent={true}
                animationType='slide'
                visible={this.state.isVideo}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.9,
                    backgroundColor: '#F5F5F5'
                }}/>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        (skills.length > 0) ?
                            <View style={{
                                width: '90%',
                                marginHorizontal: 10,
                                marginBottom: 10,
                                padding: 20,
                                backgroundColor: 'white',
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
                                                <Text style={{color: '#22252C', fontSize: 14}}>{res}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            null
                    }
                </View>
                <TouchableOpacity onPress={() => {
                    this.setState({isVideo: false})
                }} style={{position: 'absolute'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: 'transparent',
                        top: 300,
                        right: -320
                    }}>
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            margin: 10,
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='ios-close-outline' size={35} style={{backgroundColor: 'transparent'}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderContent = () => {
        const {navigate} = this.props.navigation;
        let userProfile = this.state.userData;
        switch (this.state.selectedTab) {
            case 'Staff': {
                LayoutAnimation.easeInEaseOut();
                return (
                    <View style={{flex: 1}}>
                        <ZHeader
                            leftIcon="ios-arrow-round-back-outline"
                            leftIconColor="white"
                            leftIconPress={() => this.onPressLeftIcon()}
                            headerTitle={`Hello ${userProfile.fullname}`}
                            subTitle="We see you're looking for staff, based on your selection we've listed the most compatible staff below."
                            subStyles={{fontSize: 16}}
                            footerText={false}
                        />
                        <ScrollView
                            style={styles.container}
                            contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}
                        >
                            <View style={styles.body}>
                                <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
                                <ZSliderCard>
                                    <ZRoundedButton name="Position" isSelected={this.state.selected}
                                                    selectedColor="#5F5FBA"
                                                    selectedButton={(value) => this.getFilterBy('Position', 0, value)}/>
                                    <ZRoundedButton name="Price/h" isSelected={this.state.selected}
                                                    selectedColor="#5F5FBA"
                                                    selectedButton={(value) => this.getFilterBy('Price/h', 1, value)}/>
                                    <ZRoundedButton name="Availability" isSelected={this.state.selected}
                                                    selectedColor="#5F5FBA"
                                                    selectedButton={(value) => this.getFilterBy('Availability', 2, value)}/>
                                </ZSliderCard>
                                <ZSliderCard>
                                    <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7"
                                                    selectedButton={(value) => this.getFilterBy('All', 3, value)}/>
                                    <ZRoundedButton name="Bartender" isSelected={this.state.selected}
                                                    selectedColor="#64DAE7" height={35}
                                                    selectedButton={(value) => this.getFilterBy('Bartender', 4, value)}/>
                                    <ZRoundedButton name="Manager" isSelected={this.state.selected}
                                                    selectedColor="#64DAE7" height={35}
                                                    selectedButton={(value) => this.getFilterBy('Manager', 5, value)}/>
                                    <ZRoundedButton name="Waiter" isSelected={this.state.selected}
                                                    selectedColor="#64DAE7" height={35}
                                                    selectedButton={(value) => this.getFilterBy('Waiter', 6, value)}/>
                                    <ZRoundedButton name="Chef" isSelected={this.state.selected} selectedColor="#64DAE7"
                                                    height={35}
                                                    selectedButton={(value) => this.getFilterBy('Chef', 7, value)}/>
                                    <ZRoundedButton name="Kitchen" isSelected={this.state.selected}
                                                    selectedColor="#64DAE7" height={35}
                                                    selectedButton={(value) => this.getFilterBy('Kitchen', 8, value)}/>
                                    <ZRoundedButton name="Barback" isSelected={this.state.selected}
                                                    selectedColor="#64DAE7" height={35}
                                                    selectedButton={(value) => this.getFilterBy('Barback', 9, value)}/>
                                    <ZRoundedButton name="Host" isSelected={this.state.selected} selectedColor="#64DAE7"
                                                    height={35}
                                                    selectedButton={(value) => this.getFilterBy('Host', 10, value)}/>
                                </ZSliderCard>
                            </View>
                            {
                                this.state.data.map((data, id) => {
                                    console.log("userProfile",data)
                                    console.log("myProfile",userProfile)
                                    return (
                                        <View key={id} style={styles.body}>
                                            <ZFullCard isLanguage={(value) => this.setState({isLanguage: value})}
                                                       isLicense={(value) => this.setState({isLicense: value})}
                                                       isCertificate={(value) => this.setState({isCertificate: value})}
                                                       isVideo={(value) => this.setState({isVideo: value})} staff
                                                       avatar={this.renderStaffAvatar(data)} fullname={data.fullname}
                                                       skills={data.skills} exp={data.experience} rate={data.rateBadge}
                                                       job={data.position.join(' ')} jobType={data.frequency}
                                                       rsa={data.description.join(' / ')}
                                                       onPress={() => navigate('SProfile', {
                                                           userProfile: data,
                                                           myProfile: userProfile
                                                       })}/>
                                            {this.renderLanguage(data.languages)}
                                            {this.renderLicense(data.licenses)}
                                            {this.renderCertificate(data.certificates)}
                                            {this.renderVideo(data.videos)}
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                )
            }
                break;
            case 'Messages': {
                LayoutAnimation.easeInEaseOut();

                if (this.state.isArchived) {
                    const rightButtons = ($id) => {
                        return [
                            <TouchableOpacity onPress={() => this.onRestoreMessage($id)}>
                                <View style={{
                                    backgroundColor: '#6E6F92',
                                    width: 120,
                                    height: 70,
                                    padding: 13,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='ios-archive-outline' color='white' size={30}/>
                                    <Text style={{fontSize: 12, color: 'white'}}>Restore</Text>
                                </View>
                            </TouchableOpacity>,

                            <TouchableOpacity onPress={() => this.onDeleteMessage($id)}>
                                <View style={{
                                    backgroundColor: '#F00010',
                                    width: 120,
                                    height: 70,
                                    padding: 13,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='ios-trash-outline' color='white' size={30}/>
                                    <Text style={{fontSize: 12, color: 'white'}}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        ];
                    }
                    return (
                        <View style={{flex: 1}}>
                            <ZCustomHeader
                                rightIcon="ios-mail-outline"
                                rightIconColor="white"
                                rightIconText="Message"
                                leftIcon="ios-archive-outline"
                                leftIconColor="white"
                                leftIconText='Inbox'
                                SubleftIcon="ios-arrow-round-back-outline"
                                subLeftIconColor="white"
                                onSubLeftIconPress={() => [this.props.navigation.goBack()]}
                                onLeftIconPress={() => {
                                    this.setState({isArchived: false})
                                }}
                                onRightIconPress={() => navigate('NMessage', {name: 'NMessage'})}
                            >

                                <View style={{
                                    flex: 1,
                                    borderRadius: 2,
                                    width: '90%',
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextInput placeholder="Search"
                                               style={{textAlign: 'center', height: 40, width: '90%'}}
                                               onChangeText={(text) => this.setState({text})}/>
                                </View>

                            </ZCustomHeader>

                            <ScrollView style={styles.container}
                                        contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    width: '100%',
                                    paddingTop: 20,
                                    paddingBottom: 5,
                                    paddingHorizontal: 20,
                                    marginBottom: 10
                                }}>

                                    <ZMuteText text="ARCHIVED" styles={{textAlign: 'left'}}/>

                                </View>

                                <View style={styles.body2}>
                                    {
                                        this.state.archived.map((res, index) => {
                                            return (
                                                <Swipeable key={res._id} rightButtons={rightButtons(res._id)}
                                                           rightButtonWidth={120}>
                                                    <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate('ChatBox', {
                                                            messageDetails: res,
                                                            userData: userProfile,
                                                            type: 'Venue',
                                                            newMessage: false,
                                                            staff: res.staff
                                                        })}>
                                                        <ZMessageCard avatar={this.renderMessageAvatar(res)}
                                                                      fullname={res.uname} previewMessage={res.message}
                                                                      dataTime={moment(res.latest).fromNow()}
                                                                      isChecked={res.delivered} seen={res.seen}/>
                                                    </TouchableOpacity>
                                                </Swipeable>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    )
                } else {
                    const rightButtons = ($id) => {
                        return [
                            <TouchableOpacity onPress={() => this.onArchivedMessage($id)}>
                                <View style={{
                                    backgroundColor: '#6E6F92',
                                    width: 120,
                                    height: 70,
                                    padding: 13,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='ios-archive-outline' color='white' size={30}/>
                                    <Text style={{fontSize: 12, color: 'white'}}>Archived</Text>
                                </View>
                            </TouchableOpacity>,

                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: '#5352B5',
                                    width: 120,
                                    height: 70,
                                    padding: 13,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='ios-mail-outline' color='white' size={30}/>
                                    <Text style={{fontSize: 12, color: 'white'}}>Mark as Unread</Text>
                                </View>
                            </TouchableOpacity>
                        ];
                    }
                    return (
                        <View style={{flex: 1}}>
                            <ZCustomHeader
                                rightIcon="ios-mail-outline"
                                rightIconColor="white"
                                rightIconText="Message"
                                leftIcon="ios-archive-outline"
                                leftIconColor="white"
                                leftIconText='Archived'
                                SubleftIcon="ios-arrow-round-back-outline"
                                subLeftIconColor="white"
                                onSubLeftIconPress={() => [this.props.navigation.goBack()]}
                                onLeftIconPress={() => [this.setState({isArchived: true}), this.getAllArchived()]}
                                onRightIconPress={() => navigate('NMessage', {name: 'NMessage', userProfile})}
                            >

                                <View style={{
                                    flex: 1,
                                    borderRadius: 2,
                                    width: '90%',
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextInput placeholder="Search"
                                               style={{textAlign: 'center', height: 40, width: '90%'}}
                                               onChangeText={(text) => this.setState({text})}/>
                                </View>

                            </ZCustomHeader>

                            <ScrollView style={styles.container}
                                        contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    width: '100%',
                                    paddingTop: 20,
                                    paddingBottom: 5,
                                    paddingHorizontal: 20,
                                    marginBottom: 10
                                }}>

                                    <ZMuteText text="FAVORITES" styles={{textAlign: 'left'}}/>

                                    <ZSliderCard>
                                        {
                                            this.state.messages.map((res, index) => {
                                                return (
                                                    <TouchableOpacity key={res._id}>
                                                        <ZAvatar source={this.renderMessageAvatar(res)} text="B"
                                                                 avatarName={res.uname}/>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ZSliderCard>

                                </View>

                                <View style={styles.body}>
                                    <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
                                    <ZSliderCard>
                                        <ZRoundedButton name="All" isSelected={true} selectedColor="#5F5FBA" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('All time', 0, value)}/>
                                        <ZRoundedButton name="Partime" isSelected={this.state.selected}
                                                        selectedColor="#5F5FBA" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Part time', 1, value)}/>
                                        <ZRoundedButton name="Full time" isSelected={this.state.selected}
                                                        selectedColor="#5F5FBA" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Full time', 2, value)}/>
                                        <ZRoundedButton name="Casual" isSelected={this.state.selected}
                                                        selectedColor="#5F5FBA" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Casual', 3, value)}/>
                                        <ZRoundedButton name="Event" isSelected={this.state.selected}
                                                        selectedColor="#5F5FBA" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Event', 4, value)}/>
                                    </ZSliderCard>
                                    <ZSliderCard>
                                        <ZRoundedButton name="All" isSelected={true} selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('All type', 5, value)}/>
                                        <ZRoundedButton name="Bartender" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Bartender', 6, value)}/>
                                        <ZRoundedButton name="Manager" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Manager', 7, value)}/>
                                        <ZRoundedButton name="Waiter" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Waiter', 8, value)}/>
                                        <ZRoundedButton name="Chef" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Chef', 9, value)}/>
                                        <ZRoundedButton name="Kitchen" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Kitchen', 10, value)}/>
                                        <ZRoundedButton name="Barback" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Barback', 11, value)}/>
                                        <ZRoundedButton name="Host" isSelected={this.state.selected}
                                                        selectedColor="#64DAE7" height={35}
                                                        selectedButton={(value) => this.getFilterMessage('Host', 12, value)}/>
                                    </ZSliderCard>
                                </View>

                                <View style={styles.body2}>
                                    {
                                        this.state.messages.map((res, index) => {

                                            return (
                                                <Swipeable key={res._id} rightButtons={rightButtons(res._id)}
                                                           rightButtonWidth={120}>
                                                    <TouchableOpacity
                                                        onPress={() => this.props.navigation.navigate('ChatBox', {
                                                            messageDetails: res,
                                                            userData: userProfile,
                                                            type: 'Venue',
                                                            newMessage: false,
                                                            venue: res.meta,
                                                            staff: res.staff
                                                        })}>
                                                        <ZMessageCard avatar={this.renderMessageAvatar(res)}
                                                                      fullname={res.uname} previewMessage={res.message}
                                                                      venue={res.meta}
                                                                      dataTime={moment(res.latest).fromNow()}
                                                                      isChecked={res.delivered} seen={res.seen}/>
                                                    </TouchableOpacity>
                                                </Swipeable>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
            }
                break;
            case 'Venue': {
                LayoutAnimation.easeInEaseOut();
                return (
                    <ScrollView style={styles.container}
                                contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
                        <ZHeader2
                            leftIcon="ios-arrow-round-back-outline"
                            leftIconColor="white"
                            leftIconPress={() => [, this.props.navigation.goBack()]}
                            rightIcon={this.props.navigation.state.params.isVenue ? "ios-more" : ''}
                            rightIconColor="white"
                            onPress={() => navigate('Setup', {
                                editMode: true,
                                venueEditShortcut: true,
                                userData: this.props.navigation.state.params.userData
                            })}
                            headerTitle="The Venue"
                            titleStyle={{fontSize: 16, fontWeight: '500'}}
                        />
                        <View style={styles.body3}>
                            <ZPhoto imageUrl={userProfile.employer ? userProfile.employer.image : ''}
                                    styles={{width: '100%', height: 200, marginTop: -40}}/>
                            <ZHero text={userProfile.employer ? userProfile.employer.name : ''}
                                   styles={{color: '#33314B', marginVertical: 10, marginTop: 20}}/>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#E9E9E9',
                                paddingBottom: 20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 10
                                }}>
                                    <Icon name="ios-radio-button-on" size={10} color="cyan" style={{marginRight: 10}}/>
                                    <Text style={{
                                        color: '#7C7885',
                                        fontSize: 14,
                                        fontWeight: '500'
                                    }}>{userProfile.employer ? userProfile.employer.tag1 : ''}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name="ios-radio-button-on" size={10} color="cyan" style={{marginRight: 10}}/>
                                    <Text style={{
                                        color: '#7C7885',
                                        fontSize: 14,
                                        fontWeight: '500'
                                    }}>{userProfile.employer ? userProfile.employer.tag2 : ''}</Text>
                                </View>
                            </View>
                            <ZCard>
                                <Text style={{textAlign: 'center', color: '#33314B', fontSize: 14, fontWeight: '100'}}>
                                    {userProfile.employer ? userProfile.employer.info : ''}
                                </Text>
                            </ZCard>
                        </View>

                        <View style={styles.body}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <ZHero text="Your Staff" styles={{color: '#33314B', marginRight: 10}}/>

                                <TouchableOpacity
                                    onPress={() => navigate('VStaff', {name: 'VenueStaff', userData: userProfile})}>
                                    <View style={{
                                        backgroundColor: '#423F4F',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 11,
                                            fontWeight: 'bold',
                                            color: 'white',
                                            backgroundColor: 'transparent'
                                        }}>{this.state.totalStafffs}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <ZSliderCard>
                                    <ZIcon photoUrlSelected={require('./Assets/Bartendericonselected.png')}
                                           photoUrlUnSelected={require('./Assets/Bartendericon.png')}
                                           iconText="Bartenders" isSelected={this.state.isBartender}
                                           selectedIcon={() => this.onButtonPress('Bartender')}
                                           badge={this.state.myStaffs.bartender.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/managericonselected.png')}
                                           photoUrlUnSelected={require('./Assets/managericon.png')} iconText="Manager"
                                           isSelected={this.state.isManager}
                                           selectedIcon={() => this.onButtonPress('Manager')}
                                           badge={this.state.myStaffs.manager.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/waitericonselected.png')}
                                           photoUrlUnSelected={require('./Assets/waitericon.png')} iconText="Waiter"
                                           isSelected={this.state.isWaiter}
                                           selectedIcon={() => this.onButtonPress('Waiter')}
                                           badge={this.state.myStaffs.waiter.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/cookiconselected.png')}
                                           photoUrlUnSelected={require('./Assets/cookicon.png')} iconText="Chef"
                                           isSelected={this.state.isKitchen}
                                           selectedIcon={() => this.onButtonPress('Chef')}
                                           badge={this.state.myStaffs.chef.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/cookiconselected.png')}
                                           photoUrlUnSelected={require('./Assets/cookicon.png')} iconText="Kitchen"
                                           isSelected={this.state.isKitchen}
                                           selectedIcon={() => this.onButtonPress('Kitchen')}
                                           badge={this.state.myStaffs.kitchen.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/barbackiconselected.png')}
                                           photoUrlUnSelected={require('./Assets/barbackicon.png')} iconText="Barback"
                                           isSelected={this.state.isBarback}
                                           selectedIcon={() => this.onButtonPress('Barback')}
                                           badge={this.state.myStaffs.barback.length}/>
                                    <ZIcon photoUrlSelected={require('./Assets/hosticonselected.png')}
                                           photoUrlUnSelected={require('./Assets/hosticon.png')} iconText="Host"
                                           isSelected={this.state.isHost}
                                           selectedIcon={() => this.onButtonPress('Host')}
                                           badge={this.state.myStaffs.host.length}/>
                                </ZSliderCard>
                            </View>
                        </View>

                        {this.renderBartender()}
                        {this.renderManager()}
                        {this.renderWaiter()}
                        {this.renderChef()}
                        {this.renderKitchen()}
                        {this.renderBarback()}
                        {this.renderHost()}

                        <View style={styles.body}>
                            <ZCard styles={{paddingTop: -10, paddingBottom: 10}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ZHero text="Calendar of your events" styles={{color: '#33314B', fontSize: 22}}/>
                                    <TouchableOpacity onPress={() => navigate('CreatEvent', {name: 'CreatEvent'})}>
                                        <View style={{
                                            marginLeft: 30,
                                            marginTop: -5,
                                            padding: 5,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: '#64DAE7',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name="md-add" size={20} color="white"/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ZCard>

                            <ZCard styles={{}}>
                                <Text style={{textAlign: 'center', color: '#33314B', fontSize: 14, fontWeight: '100'}}>
                                    New event coming up on the 15th of March Position needed to be filled: <Text
                                    style={{color: '#7E7FDA'}}>2 bartenders, 1 waitress</Text>
                                </Text>
                                <View style={{marginTop: 10}}>

                                    <ZRoundedButton name="View Bar Staff" onPress={() => navigate('VStaff', {
                                        name: 'VenueStaff',
                                        userData: userProfile
                                    })} styles={{marginRight: 0, width: 150, alignSelf: 'center'}} normal={true}
                                                    isSelected={this.state.selected} selectedColor="#5F5FBA"/>
                                </View>
                            </ZCard>

                            <ZCard>
                                {this.calendar()}
                            </ZCard>

                        </View>
                        <ZModal modalVisible={this.state.isStaffRosterModal}>
                            <ZHero text="Andrew O." styles={{color: '#33314B', fontSize: 22}}/>
                        </ZModal>
                        {this.renderCalendarEvents()}
                    </ScrollView>
                )
            }
                break;
            default:
        }

    }

    // <ZModal modalVisible={this.state.isModalOpen} >
    //   <ZHero text="Languages" styles={{color: '#33314B', fontSize: 22}}/>
    // </ZModal>

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderContent()}
                <ZTab>
                    <ZTabItem name="ios-people-outline" text="Staff" onPress={() => this.onSelectTab('Staff')}
                              selected={this.state.isSelectedStaff}/>
                    <ZTabItem name="ios-chatbubbles-outline" text="Messages"
                              onPress={() => this.onSelectTab('Messages')} selected={this.state.isSelectedMessages}/>
                    <ZTabItem name="ios-wine-outline" text="The Venue" onPress={() => this.onSelectTab('Venue')}
                              selected={this.state.isSelectedVenue}/>
                </ZTab>
                {this.renderOnShowLoading()}
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
