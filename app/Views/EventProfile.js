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

import Icon from 'react-native-vector-icons/Ionicons';

var moment = require('moment');
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import API from 'API';

export default class EventProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: true,
            experience: [],
            skills: [],
            venues: [],
            references: [],
            reviews: [],
// Experiece
            isVenue: false,
            isReference: false,
            isReview: false,
// Skills
            isLanguage: false,
            isLicense: false,
            isCertificate: false,
            isVideo: false
        }
    }

    componentDidMount = () => {

    }

    getConversationId = (userProfile, myProfile) => {
        API.get(`open-convo/${userProfile.user._id}`).then((res) => {
            if (res.status) {
                this.props.navigation.navigate('ChatBox', {
                    messageDetails: {
                        usid: userProfile.user._id,
                        uselect: userProfile._id,
                        _id: res.conversation
                    }, staff: userProfile, userData: myProfile, type: 'Venue', newMessage: true
                })
            }
        });
    }

    getAllStaffVenue = (userProfile) => {
        API.get(`staff/${userProfile._id}/managements`).then((res) => {
            if (res.status) {
                this.setState({venues: res.managements});
            }
            console.log('aa', res);
        })
    }

    getAllStaffReview = (userProfile) => {
        API.get(`staff/${userProfile._id}/reviews`).then((res) => {
            if (res.status) {
                this.setState({reviews: res.ratings});
            }
            console.log('aa', this.state.reviews);
        })
    }


    static navigationOptions = {
        header: null,
    };

    renderDetails = (userProfile) => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                    fontSize: 14,
                    marginVertical: 5
                }}>{userProfile.staffInterest.map((elem) => elem.quantity + " of " + elem.staff).join(' | ')} <Text
                    style={{fontSize: 14, color: '#78757E'}}>{userProfile.frequency}</Text></Text>
                <NRater/>
                <Text style={{fontSize: 14}}><Text
                    style={{fontSize: 14, color: '#78757E'}}>{userProfile.type.join(' / ')}</Text></Text>
            </View>
        )
    }

    renderVenue = (position) => {
        if (this.state.isVenue) {
            return this.state.venues.map((res, index) => {
                console.log('img', res);
                return (
                    <View key={index} style={{flex: 1, width: '100%'}}>
                        <View style={{
                            flexDirection: 'row',
                            width: '95%',
                            marginHorizontal: 10,
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{marginRight: 10}}>
                                <Image style={{width: 60, height: 60, borderRadius: 5}}
                                       source={{uri: res.employer.image || 'https://www.uratex.com.ph/wp-content/themes/uratex-custom/img/placeholder.jpg'}}/>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={{color: '#22252C', fontWeight: '500', fontSize: 14, marginBottom: 5}}>Bar:
                                    <Text style={{
                                        color: '#96939D',
                                        fontSize: 14,
                                        fontWeight: 'normal'
                                    }}>{res.employer.name}</Text></Text>
                                <Text style={{color: '#22252C', fontWeight: '500', fontSize: 14, marginBottom: 5}}>Duration:
                                    <Text style={{
                                        color: '#96939D',
                                        fontSize: 14,
                                        fontWeight: 'normal'
                                    }}>{moment(res.hiredDate).format('MMMM DD YYYY')}</Text></Text>
                                <Text style={{color: '#22252C', fontWeight: '500', fontSize: 14, marginBottom: 5}}>Position:
                                    <Text
                                        style={{color: '#96939D', fontSize: 14, fontWeight: 'normal'}}>{position}</Text></Text>
                            </View>
                        </View>
                    </View>
                )
            })
        }
    }

    renderReview = () => {
        if (this.state.isReview) {
            return this.state.reviews.map((res, index) => {
                return (
                    <View key={index} style={{flex: 1, width: '100%'}}>
                        <View style={{
                            flexDirection: 'row',
                            width: '95%',
                            marginHorizontal: 10,
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{marginRight: 10}}>
                                <Image style={{width: 60, height: 60, borderRadius: 30}}
                                       source={{uri: res.employer.image || 'https://www.uratex.com.ph/wp-content/themes/uratex-custom/img/placeholder.jpg'}}/>
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={{color: '#22252C', fontWeight: '500', fontSize: 14, marginBottom: 5}}>Venue:
                                    <Text style={{
                                        color: '#96939D',
                                        fontSize: 14,
                                        fontWeight: 'normal'
                                    }}>{res.employer.name}</Text></Text>
                                <NRater/>
                                <Text style={{color: '#22252C', fontWeight: '500', fontSize: 14, marginTop: 5}}>Review:
                                    <Text style={{
                                        color: '#96939D',
                                        fontSize: 14,
                                        fontWeight: 'normal'
                                    }}>{res.review}</Text></Text>
                            </View>
                        </View>
                    </View>
                )
            })
        }
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

    renderSendMessage = () => {
        const {userProfile, myProfile} = this.props.navigation.state.params;
        console.log('userProfile', userProfile, 'myProfile', myProfile)
        if (this.props.navigation.state.params.isSendMessage) {

        } else {
            return (
                <View style={{marginVertical: 10}}>
                    <ZRoundedButton
                        name="Send Message"
                        normal={true}
                        isSelected={this.state.selected}
                        selectedColor="#5F5FBA"
                        // onPress={() => this.getConversationId(userProfile, myProfile)}
                    />
                </View>
            )
        }
    }

    renderAvatar = (userProfile) => {
        if (userProfile.image == '' || userProfile.image == 'undefined') {
            return (
                <ZAvatar largeAvatar={'https://www.nztcc.org/themes/kos/images/avatar.png'}/>
            )
        } else {
            return (
                <ZAvatar largeAvatar={userProfile.image}/>
            )
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {userProfile, myProfile} = this.props.navigation.state.params;

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <ZHeader
                    headerTitle={`${userProfile.name}'s Profile`}
                    titleStyle={{fontSize: 14, fontWeight: 'normal'}}
                    rightIcon={this.props.navigation.state.params.isUserProfile ? "ios-more" : ""}
                    rightIconColor="white"
                    onPress={() => navigate('ProfileSetup', {
                        editMode: true,
                        props: this.props.navigation.state.params.user
                    })}
                    leftIcon="ios-arrow-round-back-outline"
                    leftIconColor="white"
                    leftIconPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.body}>
                    <ZProfileCard styles={{marginTop: -50}}>
                        {this.renderAvatar(userProfile)}
                        <ZHero text={userProfile.name} styles={{color: '#33314B'}}/>
                        {this.renderDetails(userProfile)}
                        {this.renderSendMessage()}

                    </ZProfileCard>
                    <ZCard>
                        <Text style={{textAlign: 'center', color: '#676679', fontSize: 12}}>{userProfile.info}</Text>
                    </ZCard>

                </View>


                {/*{this.renderVenue(userProfile.position)}*/}
                {/*{this.renderReview()}*/}

                {/*<View style={styles.body}>*/}
                {/*<ZHero text="Skills" styles={{color: '#33314B'}}/>*/}
                {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20, marginLeft: 20}}>*/}
                {/*<ZIcon photoUrlSelected={require('../Assets/languageiconselected.png')} photoUrlUnSelected={require('../Assets/languageicon.png')} iconText="Languages" isSelected={this.state.isLanguage} selectedIcon={()=>this.setState({isLanguage: this.state.isLanguage ? false : true})} />*/}
                {/*<ZIcon photoUrlSelected={require('../Assets/cardidicon.png')} photoUrlUnSelected={require('../Assets/cardidicon.png')} iconText="Licence" isSelected={this.state.isLicense} selectedIcon={()=>this.setState({isLicense: this.state.isLicense ? false : true})} />*/}
                {/*<ZIcon photoUrlSelected={require('../Assets/Certificatesiconselected.png')} photoUrlUnSelected={require('../Assets/Certificatesicon.png')} iconText="Certificates" isSelected={this.state.isCertificate} selectedIcon={()=>this.setState({isCertificate: this.state.isCertificate ? false : true})}/>*/}
                {/*<ZIcon photoUrlSelected={require('../Assets/cardvideoicon.png')} photoUrlUnSelected={require('../Assets/cardvideoicon.png')} iconText="Videos" isSelected={this.state.isVideo} selectedIcon={()=>this.setState({isVideo: this.state.isVideo ? false : true})} />*/}
                {/*</View>*/}
                {/*</View>*/}

                {/*<View style={{flex: 1, width: '100%', marginBottom: 40}}>*/}
                {/*{this.renderLanguage(userProfile.languages)}*/}
                {/*{this.renderLicense(userProfile.licenses)}*/}
                {/*{this.renderCertificate(userProfile.certificates)}*/}
                {/*{this.renderVideo(userProfile.videos)}*/}
                {/*</View>*/}

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
