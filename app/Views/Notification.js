import ZText from 'ZText';
import ZTextMedium from 'ZTextMedium';
import ZTextInputWidth from 'ZTextInputWidth';
import ZAvatar from 'ZAvatar';
import Swipeable from 'react-native-swipeable';
import ZCard from 'ZCard';
import NRater from 'NRater';
import ZHero from 'ZHero';

import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity, colors, Modal,
    TouchableHighlight
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import API from 'API';

var moment = require('moment');

export default class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personNotify: [],
            notifications: [],
            isStaffView: false,
            isEmployerView: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: '#625BBA',
                height: 80
            },
            headerTitleStyle: {
                color: 'white',
                height: 100,
                width: 140
            },
            headerTintColor: 'white',
            headerTitle:
                <Text style={{color: 'white'}}>Notifications</Text>,
            headerLeft: (
                <TouchableOpacity onPress={() => [navigation.state.params.onGoBack(), navigation.goBack()]}>
                    <Icon name="md-arrow-back" size={25} color="white"
                          style={{backgroundColor: 'transparent', marginLeft: 20}}/>
                </TouchableOpacity>
            )
        }
    }
    // static navigationOptions = {
    //   headerStyle: {
    //         backgroundColor: '#625BBA',
    //         height: 80
    //     },
    //     headerTitleStyle: {
    //         color: 'white',
    //         height: 100,
    //         width: 140
    //     },
    //     headerTintColor: 'white',
    //     headerTitle:
    //     <Text style={{color: 'white'}}>Notifications</Text>
    // };

    componentDidMount = () => {
        this.getAllNotifications();
    }

    getAllNotifications = () => {
        if (this.props.navigation.state.params.isStaff) {
            API.get('staff-notifications').then((res) => {
                console.log('staff-notif', res);
                this.setState({notifications: res.notifications})
            })
        } else {
            API.get('venue/notifications').then((res) => {
                console.log('venue-notif', res);
                this.setState({notifications: res.notifications})
            });
        }
    }

    onDeleteNotification = ($id) => {
        API.post(`venue/notification/${$id}/delete`, {}).then((res) => {
            if (res.status) {
                this.getAllNotifications();
            } else {
                alert('Something went wrong');
            }
        })
    }

    renderStaffView = (res) => {
        if (this.state.isStaffView) {
            return (
                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={this.state.isStaffView}
                >

                    <View style={{flex: 1}}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            opacity: 0.9,
                            backgroundColor: 'black'
                        }}/>

                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: '90%',
                                    height: '80%',
                                    marginTop: 50,
                                    borderRadius: 15
                                }}>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <TouchableOpacity onPress={() => this.setState({isStaffView: false})}>
                                            <View style={{marginRight: 10}}>
                                                <Icon name='ios-close-outline' size={35}
                                                      style={{backgroundColor: 'transparent'}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Image style={{width: '80%', height: 180}}
                                               source={{uri: res.employer.image || 'http://www.theemailcompany.com/wp-content/uploads/2016/02/no-image-placeholder-big-300x200.jpg'}}/>
                                        <ZHero text={res.employer.name} styles={{color: '#33314B'}}/>
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
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{
                                                    color: '#7C7885',
                                                    fontSize: 14,
                                                    fontWeight: '500'
                                                }}>{res.employer ? res.employer.tag1 : ''}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                marginVertical: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon name="ios-radio-button-on" size={10} color="cyan"
                                                      style={{marginRight: 10}}/>
                                                <Text style={{
                                                    color: '#7C7885',
                                                    fontSize: 14,
                                                    fontWeight: '500'
                                                }}>{res.employer ? res.employer.tag2 : ''}</Text>
                                            </View>
                                        </View>
                                        <ZCard>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#33314B',
                                                fontSize: 14,
                                                fontWeight: '100'
                                            }}>
                                                {res.employer ? res.employer.info : ''}
                                            </Text>
                                        </ZCard>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    renderEmployerView = (res) => {
        if (this.state.isEmployerView) {
            return (
                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={this.state.isEmployerView}
                >

                    <View style={{flex: 1}}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            opacity: 0.9,
                            backgroundColor: 'black'
                        }}/>

                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: '90%',
                                    height: '80%',
                                    marginTop: 50,
                                    borderRadius: 15
                                }}>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <TouchableOpacity onPress={() => this.setState({isEmployerView: false})}>
                                            <View style={{marginRight: 10}}>
                                                <Icon name='ios-close-outline' size={35}
                                                      style={{backgroundColor: 'transparent'}}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Image style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            borderWidth: 1,
                                            borderColor: 'white'
                                        }}
                                               source={{uri: res.staffId.avatar || 'https://www.nztcc.org/themes/kos/images/avatar.png'}}/>
                                        <ZHero text={res.staffId.fullname} styles={{color: '#33314B'}}/>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={{
                                                fontSize: 14,
                                                marginVertical: 5
                                            }}>{res.staffId.position.join(' | ')} <Text
                                                style={{fontSize: 14, color: '#78757E'}}>{res.staffId.frequency}</Text></Text>
                                            <NRater/>
                                            <Text style={{fontSize: 14}}>RSA Cerftified</Text>
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#78757E'
                                            }}>{res.staffId.description.join(' / ')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    renderContent = () => {
        if (this.props.navigation.state.params.isStaff) {
            const rightButtons = ($id) => {
                return [
                    <TouchableOpacity onPress={() => this.setState({isStaffView: true})}>
                        <View style={{
                            backgroundColor: '#6E6F92',
                            width: 120,
                            height: 80,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-eye-outline' color='white' size={30}/>
                            <Text style={{color: 'white'}}>View</Text>
                        </View>
                    </TouchableOpacity>,

                    <TouchableOpacity onPress={() => this.onDeleteNotification($id)}>
                        <View style={{
                            backgroundColor: '#F00010',
                            width: 120,
                            height: 80,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-trash-outline' color='white' size={30}/>
                            <Text style={{color: 'white'}}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                ];
            }
            return (
                <ScrollView>
                    {
                        this.state.notifications.length > 0 ?
                            this.state.notifications.map((res, index) => {
                                let status = '';
                                switch (res.type) {
                                    case 'message':
                                        status = 'has message';
                                        break;
                                    case 'transaction':
                                        if (res.paymentStatus == 'completed') {
                                            status = 'successfully received funds from';
                                        } else {
                                            status = 'has a pending funds from';
                                        }
                                        break;
                                    case 'payment':
                                        if (res.paymentStatus == 'completed') {
                                            status = 'was successfully paid by';
                                        } else {
                                            status = 'has a pending payment from';
                                        }
                                        break;
                                    case 'trial':
                                        status = 'started his/her trial work on';
                                        break;
                                    case 'hired':
                                        status = 'started to work on'
                                        break;
                                    default:
                                }
                                // if (res.type == 'venue-interest') {
                                //   status = 'is interested in your Venue at'
                                // } else if (res.type == 'event-interest') {
                                //   status = 'has shown interest in your';
                                // } else {
                                //   status = 'sent you a'
                                // }
                                return (
                                    <View key={index}>
                                        <Swipeable rightButtons={rightButtons(res._id)} rightButtonWidth={120}>
                                            <View style={{borderBottomWidth: 0.6, borderColor: '#c2c0cb'}}>
                                                <View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        alignItems: 'center',
                                                        marginVertical: 15,
                                                        marginHorizontal: 10
                                                    }}>
                                                        <View style={{paddingRight: 10}}>
                                                            <Image style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 25,
                                                                borderWidth: 1,
                                                                borderColor: 'white'
                                                            }} source={{uri: res.staffId.avatar}}/>
                                                        </View>
                                                        <View style={{flex: 1}}>
                                                            <Text>
                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    fontWeight: '500'
                                                                }}>{res.staffId.fullname}</Text>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    color: '#8C8C8C'
                                                                }}> {status} </Text>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    color: '#555DB9'
                                                                }}>{res.employer.name}.</Text>
                                                                <Text style={{
                                                                    fontSize: 10,
                                                                    color: '#8C8C8C',
                                                                    marginHorizontal: 10
                                                                }}>  {moment(res.createdAt).fromNow()}</Text>
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Swipeable>
                                        {this.renderStaffView(res)}
                                    </View>
                                )
                            })
                            :
                            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                                <Text style={{fontSize: 14, fontWeight: '500', color: '#C5C5C5'}}>You have 0
                                    Notifications.</Text>
                            </View>
                    }
                </ScrollView>
            )
        } else {
            const rightButtons = ($id) => {
                return [
                    <TouchableOpacity onPress={() => this.setState({isEmployerView: true})}>
                        <View style={{
                            backgroundColor: '#6E6F92',
                            width: 120,
                            height: 80,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-eye-outline' color='white' size={30}/>
                            <Text style={{color: 'white'}}>View</Text>
                        </View>
                    </TouchableOpacity>,

                    <TouchableOpacity onPress={() => this.onDeleteNotification($id)}>
                        <View style={{
                            backgroundColor: '#F00010',
                            width: 120,
                            height: 80,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='ios-trash-outline' color='white' size={30}/>
                            <Text style={{color: 'white'}}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                ];
            }
            return (
                <ScrollView>
                    {
                        this.state.notifications.length > 0 ?
                            this.state.notifications.map((res, index) => {
                                let status = '';
                                let predicate = res.employer.name
                                let subject = res.staffId.fullname
                                switch (res.type) {
                                    case 'venue-interest':
                                        status = 'is interested in your Venue at';
                                        break;
                                    case 'event-interest':
                                        status = 'has shown interest in your Event at';
                                        break;
                                    case 'transaction':
                                        subject = res.employer.name
                                        status = 'successfully transfer funds to';
                                        predicate = res.staffId.fullname
                                        break;
                                    case 'payment':
                                        subject = res.employer.name
                                        status = 'successfully pay staff';
                                        predicate = res.staffId.fullname
                                        break;
                                    case 'message':
                                        status = 'sent you a';
                                        predicate='message'
                                        break;
                                    case 'trial':
                                        subject = res.employer.name
                                        status = 'started a trial work for';
                                        predicate = res.staffId.fullname
                                        break;
                                    case 'hired':
                                        subject = res.employer.name
                                        status = 'hired';
                                        predicate = res.staffId.fullname
                                        break;
                                    default:
                                }

                                return (
                                    <View key={index}>
                                        <Swipeable rightButtons={rightButtons(res._id)} rightButtonWidth={120}>
                                            <View style={{borderBottomWidth: 0.6, borderColor: '#c2c0cb'}}>
                                                <View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        alignItems: 'center',
                                                        marginVertical: 15,
                                                        marginHorizontal: 10
                                                    }}>
                                                        <View style={{paddingRight: 10}}>
                                                            <Image style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 25,
                                                                borderWidth: 1,
                                                                borderColor: 'white'
                                                            }} source={{uri: res.staffId.avatar}}/>
                                                        </View>
                                                        <View style={{flex: 1}}>
                                                            <Text>
                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    fontWeight: '500'
                                                                }}>{subject}</Text>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    color: '#8C8C8C'
                                                                }}> {status} </Text>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    color: '#555DB9'
                                                                }}>{predicate}.</Text>
                                                                <Text style={{
                                                                    fontSize: 10,
                                                                    color: '#8C8C8C',
                                                                    marginHorizontal: 10
                                                                }}>  {moment(res.createdAt).fromNow()}</Text>
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Swipeable>
                                        {this.renderEmployerView(res)}
                                    </View>
                                )
                            })
                            :
                            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                                <Text style={{fontSize: 14, fontWeight: '500', color: '#C5C5C5'}}>You have 0
                                    Notifications.</Text>
                            </View>
                    }
                </ScrollView>
            )
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                {this.renderContent()}
            </View>
        );
    }
}

// <View style={{borderBottomWidth: 0.6, borderColor: '#c2c0cb'}}>
//   <TouchableOpacity>
//     <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginVertical: 15, marginHorizontal: 10}}>
//       <View style={{paddingRight: 10}}>
//         <ZAvatar small={true} />
//       </View>
//       <View style={{flex: 1}}>
//         <Text>
//           <Text style={{fontSize: 14, fontWeight: '500'}}>{this.state.user}</Text>
//           <Text style={{fontSize: 12, color: '#8C8C8C'}}> has shown interest in your </Text>
//           <Text style={{fontSize: 12, color: '#555DB9'}}>{this.state.event}</Text>
//           <Text style={{fontSize: 12}}> Event.</Text>
//           <Text style={{fontSize: 10, color: '#8C8C8C', marginHorizontal: 10}}> Just now</Text>
//         </Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    }
});
