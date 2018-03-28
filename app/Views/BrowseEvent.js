import ZHero from 'ZHero';
import ZSliderCard from 'ZSliderCard';
import ZMuteText from 'ZMuteText';
import ZRoundedButton from 'ZRoundedButton';
import ZModal from 'ZModal';
import ZEventCard from 'ZEventCard';
import ZFullHeader from 'ZFullHeader';
import ZIcon from 'ZIcon';
import API from 'API';

var moment = require('moment');
import Calendar from 'react-native-calendar';
import Icon from 'react-native-vector-icons/Ionicons';

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
    ActivityIndicator,
    Modal,
    Image
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

export default class BrowseEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            data: [],
            messages: [],
            isSelected: false,
            selectedTab: 'Staff',
            isSelectedStaff: true,
            isSelectedMessages: false,
            isSelectedVenue: false,
            selectedDate: moment().format(),
            isModalOpen: false,
            isStaffRosterModal: false,
            isLoading: true,
            filters: [],
            modalVisible: false,
        }
    }

    componentDidMount = () => {
        //API.get('staff');
        var results = [
            {
                event: 'Chris and Anne Wedding',
                skills: true,
                experience: false,
                location: 'Surry Hills'
            },
            {
                event: 'Adobe Training Program',
                skills: true,
                experience: false,
                location: 'Sydney CBD'
            },
            {
                event: 'Tinas 60th Birthday',
                skills: true,
                experience: false,
                location: 'Sydney CBD'
            },
            {
                event: 'Zook Out',
                skills: true,
                experience: false,
                location: 'Darling Harbour'
            },
        ]

        this.getAllEvents();
    }

    getAllEvents = () => {
        API.get(`events?types=${this.state.filters.join()}`).then((res) => {
            console.log('events', res)
            if (res.status) {
                this.setState({data: res.events, isLoading: false})
            }
        });
    }

    onSelectInterested = (_id) => {
        API.post(`events/${_id}/interest`, {}).then((res) => {
            console.log('interested', res)
            if (res.status) {
                //  this.setState({data: res.interested})
                this.getAllEvents();
            }
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    getFilterBy = (filterBy, id, value) => {
        var $filterBy = this.state.filters;
        switch (filterBy) {
            case 'Events near you': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;
            case 'Upcoming Events': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;
            case 'Positions needed': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;
            case 'All': {
                if (!value) {
                    $filterBy.push(filterBy);
                } else {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                }
            }
                break;

            case 'Birthday': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;

            case 'Wedding': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;

            case 'Conference': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;

            case 'Music Festival': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;

            case 'Family Event': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;

            case 'Other': {
                if (!value) {
                    var index = $filterBy.indexOf(filterBy);
                    $filterBy.splice(index, 1)
                } else {
                    $filterBy.push(filterBy);
                }
            }
                break;
            default:
        }
        console.log($filterBy);
        this.getAllEvents();
    }

    static navigationOptions = {
        header: null,
    };

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

    renderPeopleNeededModal = () => {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
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
                        opacity: 0.95,
                        backgroundColor: 'white'
                    }}/>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginVertical: 10, fontSize: 25, fontWeight: '500'}}>Services</Text>
                        <View style={{
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F5F5F5'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingTop: 40,
                                paddingBottom: 15,
                                paddingHorizontal: 40
                            }}>
                                <View>
                                    <ZIcon photoUrlSelected={require('../Assets/Bartendericon.png')}
                                           photoUrlUnSelected={require('../Assets/Bartendericonselected.png')}
                                           isSelected={false} size={50}/>
                                    <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Bartender</Text>
                                </View>
                                <View>
                                    <ZIcon photoUrlSelected={require('../Assets/waitericon.png')}
                                           photoUrlUnSelected={require('../Assets/waitericonselected.png')}
                                           isSelected={false} size={50}/>
                                    <Text style={{paddingLeft: 7, color: '#5E5CBD', fontWeight: '500'}}>Waiter</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.setState({modalVisible: false})}
                                              style={{position: 'absolute', bottom: 75, left: 65}}>
                                <View style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
                                    <Icon name='ios-close-outline' size={50} style={{backgroundColor: 'transparent'}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderContent = () => {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.container}
                        contentContainerStyle={[styles.scrollContent, {top: 0, paddingBottom: 50}]}>
                <ZFullHeader
                    leftIcon="ios-arrow-round-back-outline" leftIconColor="white"
                    leftIconPress={() => this.props.navigation.goBack()}
                    headerTitle={this.props.navigation.state.params.fullname + ','}
                    subTitle="Here you can see events near you or upcoming events based on your filter"
                    subStyles={{fontSize: 16}}
                />
                <View style={styles.body}>
                    <ZMuteText text="FILTER BY:" styles={{textAlign: 'left'}}/>
                    <ZSliderCard>
                        <ZRoundedButton name="Events near you" isSelected={this.state.selected} selectedColor="#5F5FBA"
                                        selectedButton={(value) => this.getFilterBy('Events near you', 0, value)}/>
                        <ZRoundedButton name="Upcoming Events" isSelected={this.state.selected} selectedColor="#5F5FBA"
                                        selectedButton={(value) => this.getFilterBy('Upcoming Events', 1, value)}/>
                        <ZRoundedButton name="Positions needed" isSelected={this.state.selected} selectedColor="#5F5FBA"
                                        selectedButton={(value) => this.getFilterBy('Positions needed', 2, value)}/>
                    </ZSliderCard>
                    <ZSliderCard>
                        <ZRoundedButton name="All" isSelected={this.state.selected} selectedColor="#64DAE7" height={35}
                                        selectedButton={(value) => this.getFilterBy('All', 3, value)}/>
                        <ZRoundedButton name="Birthday" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35} selectedButton={(value) => this.getFilterBy('Birthday', 4, value)}/>
                        <ZRoundedButton name="Wedding" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35} selectedButton={(value) => this.getFilterBy('Wedding', 5, value)}/>
                        <ZRoundedButton name="Conference" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35}
                                        selectedButton={(value) => this.getFilterBy('Conference', 6, value)}/>
                        <ZRoundedButton name="Music Festival" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35}
                                        selectedButton={(value) => this.getFilterBy('Music Festival', 7, value)}/>
                        <ZRoundedButton name="Family Event" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35}
                                        selectedButton={(value) => this.getFilterBy('Family Event', 8, value)}/>
                        <ZRoundedButton name="Other" isSelected={this.state.selected} selectedColor="#64DAE7"
                                        height={35} selectedButton={(value) => this.getFilterBy('Other', 9, value)}/>
                    </ZSliderCard>
                </View>
                {this.renderPeopleNeededModal()}
                {
                    this.state.data.map((data, id) => {
                        let date = `${moment(data.date).format('MMMM DD YYYY')}`
                        let time = `${data.time.start} - ${data.time.end}`
                        let isInterested = false;
                        if (data.interested != undefined) {
                            if (data.interested[this.props.navigation.state.params.userId] != undefined) {
                                isInterested = data.interested[this.props.navigation.state.params.userId].interestedAt.length > 0;
                            }
                        }

                        return (
                            <View key={id} style={styles.body}>
                                <ZEventCard event={data.name} image={data.image} type={null} interested={true}
                                            skills={true} exp={false} job={date} jobType={time} rsa={null}
                                            location={null}
                                            isInterested={isInterested}
                                            onPressInterested={() => this.onSelectInterested(data._id)}
                                            onPressEvent={() => this.setState({modalVisible: true})}
                                            onPress={() => navigate('EProfile', {
                                                userProfile: data,
                                                myProfile: this.props.navigation.state.params.userProfile,
                                                refresh: this.getAllEvents
                                            })}/>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderContent()}
                <ZModal modalVisible={this.state.isModalOpen}>
                    <ZHero text="Languages" styles={{color: '#33314B', fontSize: 22}}/>
                </ZModal>
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
