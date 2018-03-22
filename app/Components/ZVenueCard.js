/**
 * @providesModule ZVenueCard
 */

import Icon from 'react-native-vector-icons/Ionicons';
import NRater from 'NRater';
import ZSliderCard from 'ZSliderCard';
import ZButtonOutline from 'ZButtonOutline';
import ZIcon from 'ZIcon';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

export default class ZVenueCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    renderAvatar = () => {
        if (this.props.avatar) {
            return (
                <Image style={{width: 100, height: 100, resizeMode: 'stretch'}} source={{uri: this.props.avatar}}/>
            )
        } else {
            return (
                <Image style={{width: 100, height: 100, resizeMode: 'stretch'}}
                       source={{uri: 'https://www.uratex.com.ph/wp-content/themes/uratex-custom/img/placeholder.jpg'}}/>
            )
        }
    }

    renderVenue = () => {
        return (<Text style={{fontSize: 18, color: '#342F4D'}}>{this.props.venue}</Text>)
    }

    renderName = () => {
        return (<Text style={{fontSize: 13, color: '#898989', marginTop: 5}}>{this.props.name}</Text>)
    }

    renderLocation = () => {
        return (<Text style={{fontSize: 15, color: '#33314B', marginTop: 5}}>{this.props.location}</Text>)
    }

    renderSchedule = () => {
        return (<Text style={{fontSize: 13, color: '#898989', marginTop: 5}}>{this.props.schedule}</Text>)
    }
    renderSchedule1 = () => {
        return (<Text style={{fontSize: 13, color: '#898989', marginTop: 5}}>{this.props.schedule1}</Text>)
    }
    renderDetails = () => {
        return (
            <View>
                <Text style={{fontSize: 14, marginVertical: 5, color: '#78757E'}}> {this.props.job} <Text
                    style={{fontSize: 14, color: '#78757E'}}>{this.props.jobType}</Text></Text>
                <Text style={{fontSize: 14, color: '#78757E'}}> <Text
                    style={{fontSize: 14, color: '#78757E'}}>{this.props.rsa}</Text></Text>
            </View>
        )
    }

    renderServices = () => {
        if (this.props.services) {
            return (
                <View style={{flex: 1}}>
                    <ZSliderCard>
                        <Text style={{
                            fontSize: 16,
                            color: '#78757E',
                            alignSelf: 'center',
                            marginRight: 10,
                            paddingRight: 5
                        }}>Services :</Text>
                        <ZIcon photoUrlSelected={require('../Assets/alcoholicon.png')}
                               photoUrlUnSelected={require('../Assets/alcoholiconselected.png')}
                               isSelected={this.props.isAlcohol} small={true}/>
                        <ZIcon photoUrlSelected={require('../Assets/drinkingicon.png')}
                               photoUrlUnSelected={require('../Assets/drinkingiconselected.png')}
                               isSelected={this.props.isDrinks} small={true}/>
                        <ZIcon photoUrlSelected={require('../Assets/drinkicon.png')}
                               photoUrlUnSelected={require('../Assets/drinkiconselected.png')}
                               isSelected={this.props.isLunch} small={true}/>
                        <TouchableOpacity onPress={this.props.onPressMore}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                width: 35,
                                height: 35,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: '#AAA6C7',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
                                    <View style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: 4,
                                        borderWidth: 1.2,
                                        borderColor: '#5352B5'
                                    }}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: 4,
                                        borderWidth: 1.2,
                                        borderColor: '#5352B5'
                                    }}>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
                                    <View style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: 4,
                                        borderWidth: 1.2,
                                        borderColor: '#5352B5'
                                    }}>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ZSliderCard>
                </View>
            )
        }

    }

    renderInterestedButton = () => {
        if (this.props.isInterested) {
            return (<ZButtonOutline name="I'm Interested" onPress={this.props.onPressInterested}
                                    styles={{backgroundColor: '#5F5FBA'}} textStyles={{color: 'white'}}/>)
        } else {
            return (<ZButtonOutline name="I'm Interested" onPress={this.props.onPressInterested}/>)
        }
    }

    render() {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: 10}}>
                            {this.renderAvatar()}
                        </View>

                        <View style={{flex: 1}}>
                            {this.renderVenue()}
                            {this.renderName()}
                            {this.renderSchedule()}
                            {this.renderSchedule1()}
                            {this.renderLocation()}
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{
                    borderTopWidth: 1,
                    borderColor: '#E9E9E9',
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {this.renderServices()}
                    {this.renderInterestedButton()}
                </View>
                <View style={{position: 'absolute', right: -5}}>
                    <Text style={{fontSize: 18, color: '#33314B', fontWeight: '500'}}>{this.props.rate}</Text>
                </View>

            </View>
        );
    }

}
