import ZCard from 'ZCard';
import ZFullHeader from 'ZFullHeader';
import ZEventCard from 'ZEventCard';
import ZText from 'ZText';
import ZTextInputWidth from 'ZTextInputWidth';
import API from 'API';

var moment = require('moment');
import Calendar from 'react-native-calendar';
import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  TextInput,
  TouchableOpacity, Image
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class calendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      selected: false,
      data: [],
      selectedDate: moment().format(),
      currentDate: moment().format()
    }
  }
  static navigationOptions = {
    headerStyle: {
          backgroundColor: '#625BBA',
      },
      headerTitleStyle: {
          color: 'white',
      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white', fontSize: 20}}>Calendar</Text>
  };
  componentDidMount = () => {
    this.getAllEvents();
  }

  getAllEvents = () => {
    console.log(this.state.currentDate);
    API.post('my-events', {date: this.state.currentDate}).then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({data: res.events, isLoading: false})
      }
    });
  }

  // getAllEvents = () => {
  //   API.get('events').then((res) => {
  //     console.log('events', res)
  //     if (res.status) {
  //       this.setState({data: res.events, isLoading: false})
  //     }
  //   });
  // }

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
        backgroundColor: 'white',
      },
      weekendDayText: {
        color: 'black',
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
            events={[{date: '2017-08-21', hasEventCircle: {backgroundColor: 'gray'}}]}
            onDateSelect={(date) => [this.setState({currentDate: date }), this.getAllEvents()]}
            />
  }

  renderCreateEventButton = () => {
    const { navigate } = this.props.navigation;
    if (this.props.navigation.state.params.isStaff) {

    }else {
      return(
        <View>
          <TouchableOpacity onPress={()=>navigate('CreatEvent', { name: 'CreatEvent' })}>
            <Image source={require('../Assets/plusiconcalendar.png')} style={{width: 30, height: 30, resizeMode: 'stretch'}}/>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 20}}>

            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 10}}>
                <TouchableOpacity>
                  <Image source={require('../Assets/search.png')} style={{width: 30, height: 30, resizeMode: 'stretch'}}/>
                </TouchableOpacity>
              </View>
              {this.renderCreateEventButton()}
            </View>

            <ZCard styles={{padding: 20, borderBottomWidth: 0}}>
            {this.calendar()}
            </ZCard>

            <View style={{marginTop: 30}}>
              <View style={{marginBottom: 35}}>
                <ZText text={`Events on the ${moment(this.state.currentDate).format('Do MMM')}`} styles={{color: '#777777', fontSize: 17, textAlign: 'justify'}}/>
              </View>
            </View>

            {
              this.state.data.map((data, id)=>{
                let date = `${moment(data.date).format('MMMM DD YYYY')}`
                let time = `${data.time.start} - ${data.time.end}`
                return (
                  <View key={id} style={styles.body}>
                    <ZEventCard event={data.name} image={data.image || 'http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png'} type={data.type.join('/')} job={date} jobType={time} rsa={data.name} location='No current location' />
                  </View>
                )
              })
            }

          </View>
        </ScrollView>
    );
  }

  // <View>
  //   <ZText text="Adobe Training Program" styles={{color: '#252526', fontSize: 14, textAlign: 'justify'}}/>
  //     <View style={{flex: 1, flexDirection: 'row', marginTop: 10, borderColor: '#777777', borderTopWidth: 0.5, borderBottomWidth: 0.5, padding: 12, paddingLeft: 0}}>
  //       <View style={{width: 100, height: 100, marginRight: 25}}>
  //         <Image source={require('../Assets/gen.jpg')} style={{width: 100, height: 100, resizeMode:'stretch'}}/>
  //       </View>
  //       <View>
  //         <ZText text="Conference" styles={{color: '#777777', fontSize: 14, textAlign: 'justify'}}/>
  //           <View style={{marginTop: 8, marginBottom: 8}}>
  //             <ZText text="August 15 2017  5PM - 10PM" styles={{color: '#777777', fontSize: 13.5, textAlign: 'justify'}}/>
  //           </View>
  //           <View style={{marginTop: 5, marginBottom: 5}}>
  //             <ZText text="Venue: Oasis Beach side" styles={{color: '#777777', fontSize: 10, textAlign: 'justify'}}/>
  //           </View>
  //           <View style={{flex: 1, flexDirection: 'row', marginTop: 8, marginBottom: 8}}>
  //             <View>
  //               <Image source={require('../Assets/Sliding-button.png')} style={{width: 10, height: 13, resizeMode: 'stretch', marginRight: 10}}/>
  //             </View>
  //             <View>
  //               <ZText text="Sydney CBD" styles={{color: '#777777', fontSize: 13.5, textAlign: 'justify'}}/>
  //             </View>
  //           </View>
  //       </View>
  //     </View>
  // </View>
  //
  // <View style={{marginTop: 10}}>
  //   <ZText text="Zook Out Rave Party" styles={{color: '#252526', fontSize: 14, textAlign: 'justify'}}/>
  //     <View style={{flex: 1, flexDirection: 'row', marginTop: 10, borderColor: '#777777', borderBottomWidth: 0.5, padding: 12, paddingLeft: 0}}>
  //       <View style={{width: 100, height: 100, marginRight: 25}}>
  //         <Image source={require('../Assets/gen.jpg')} style={{width: 100, height: 100, resizeMode:'stretch'}}/>
  //       </View>
  //       <View>
  //         <ZText text="Music Festival" styles={{color: '#777777', fontSize: 14, textAlign: 'justify'}}/>
  //           <View style={{marginTop: 8, marginBottom: 8}}>
  //             <ZText text="August 15 2017  10PM - 3PM" styles={{color: '#777777', fontSize: 13.5, textAlign: 'justify'}}/>
  //           </View>
  //           <View style={{marginTop: 5, marginBottom: 5}}>
  //             <ZText text="Venue: Oasis Beach side" styles={{color: '#777777', fontSize: 10, textAlign: 'justify'}}/>
  //           </View>
  //           <View style={{flex: 1, flexDirection: 'row', marginTop: 8, marginBottom: 8}}>
  //             <View>
  //               <Image source={require('../Assets/Sliding-button.png')} style={{width: 10, height: 13, resizeMode: 'stretch', marginRight: 10}}/>
  //             </View>
  //             <View>
  //               <ZText text="Sydney CBD" styles={{color: '#777777', fontSize: 13.5, textAlign: 'justify'}}/>
  //             </View>
  //           </View>
  //       </View>
  //     </View>
  // </View>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
});
