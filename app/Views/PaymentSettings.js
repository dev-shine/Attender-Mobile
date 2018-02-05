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
import ZInput from 'ZInput';
import ZTextMedium from 'ZTextMedium';
import ZTextInputWidth from 'ZTextInputWidth';
import ZHiText from 'ZHiText';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextMask} from 'react-native-masked-text';

var moment = require('moment');

import React, { Component } from 'react';
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
  Switch,
  Modal,
  ActivityIndicator,
  Keyboard,
  LayoutAnimation
} from 'react-native';

import API from 'API';

import {
  StackNavigator,
} from 'react-navigation';

export default class AppSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
//credit card
      selectedCard: 'visa',
      isVisa: false,
      isMaster: false,
      isExpress: false,

      cardName: '',
      cardNumber: '',
      cardDate: '',
      cardCV: '',
      cardArray: [],
//bank details
      accountName: '',
      bankName: '',
      bankBSB: '',
      bankAccount: '',
      bankArray: [],
      isLoading: false,
      keyboardHeight: 0,
      staffs: [],
      transferTo: '',
      isShowStaffs: false,
      amount: 0,
      bankTransferName: '',
      bankTransferBSB: '',
      bankTransferAccountName: '',
      bankTransferAccountNumbers: '',
      isLoadingPayment: false,
      isSuccessfulSentShow: false
    }
  }

  componentDidMount() {
    this.getAllBanks();
    this.getAllCards();
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({keyboardHeight: 250});
  }

  _keyboardDidHide = (e) => {
    this.setState({keyboardHeight: 0});
  }

  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }
  static navigationOptions = {
    title: 'PaymentSettings'
  };

  onCredit = (tab) => {
    if (tab == 'visa') {
      this.setState({selectedCard: tab, isVisa: true, isMaster: false, isExpress: false});
    } else if (tab == 'master') {
      this.setState({selectedCard: tab, isVisa: false, isMaster: true, isExpress: false});
    } else {
      this.setState({selectedCard: tab, isVisa: false, isMaster: false, isExpress: true});
    }
  }

  onRemoveCard = (id) => {
    API.post(`remove-card/${id}`, {}).then((res) => {
      console.log(res);
      this.getAllCards();
    });
  }

  onRemoveBank= (id) => {
    API.post(`remove-bank/${id}`, {}).then((res) => {
      console.log(res);
      this.getAllBanks();
    });
  }

  getAllBanks = () => {
    API.get('banks').then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({
          bankArray: res.banks,
          accountName: '',
          bankName: '',
          bankBSB: '',
          bankAccount: '',
          isLoading: false
        });
      } else {
        alert('Something went wrong');
        this.setState({isLoading: false});
      }
    });
  }

  getAllCards = () => {
    API.get('cards').then((res) => {
      console.log(res);
      if (res.status) {
        this.setState({
          cardArray: res.cards,
          cardName: '',
          cardNumber: '',
          cardDate: '',
          cardCV: '',
          isLoading: false
        });
      } else {
        alert('Something went wrong');
        this.setState({isLoading: false});
      }
    });
  }

  onAddCard = () => {
    var cardResult = this.state.cardDate.split("/");
    var cardDetails = {
      account_name: this.state.cardName,
      account_number: this.state.cardNumber,
      expiry_month: cardResult[0],
      expiry_year: 20 + cardResult[1],
      cvv: this.state.cardCV
    }

    console.log('yr',cardDetails);

    this.setState({isLoading: true});
    API.post('add-card', cardDetails).then((res) => {
      console.log('status', res);
      if (res.status) {
        this.getAllCards();
      }else {
        alert('Invalid Input');
        this.setState({isLoading: false});
      }
    });
  }

  onAddAccount = () => {
    var accountDetails = {
      account_name: this.state.accountName,
      bank_name: this.state.bankName,
      routing_number: this.state.bankBSB,
      account_number: this.state.bankAccount
    }
    this.setState({isLoading: true});
    API.post('add-bank', accountDetails).then((res) => {
      console.log('status', res);
      if (res.status) {
        this.getAllBanks();
      }else {
        alert('Invalid Input');
        this.setState({isLoading: false});
      }
    });
  }

  onDirectTransfer = () => {
    var accountDetails = {
      account_name: this.state.bankTransferAccountName,
      bank_name: this.state.bankTransferName,
      routing_number: this.state.bankTransferBSB,
      account_number: this.state.bankTransferAccountNumbers
    }
    this.setState({isLoadingPayment: true});
    API.post('add-bank', accountDetails).then((res) => {
      console.log('status', res);
      if (res.status) {
        API.post('transfer', {
          account_id: res.bank.promiseId,
          amount: this.state.amount,
          to_user: this.state.transferToId,
          from: 'bank'
        }).then((resPay) => {
          console.log('pay', resPay);
          if (resPay.status) {
            this.setState({isLoadingPayment: false, modalVisible: false});
            this.getAllBanks();
            var self = this;
            setTimeout(() => {
              self.setState({isSuccessfulSentShow: true});
            }, 500);

          }
        })
      }
      // this.getAllBanks();
    });
  }

  onChangeTextTransfer = (value) => {
    this.setState({transferTo: value});
    if (value.length > 2) {
      this.onGetAllTrialStaffs(value);
    } else {

    }
  }

  onGetAllTrialStaffs = (value) => {
    API.get(`trial-staffs?query=${value}`).then((res) => {
      console.log(res);
      if(res.status) {
        this.setState({staffs: res.staffs, isShowStaffs: true});
      }
    });
  }

  onSelectStaff = (res) => {
    this.setState({transferTo: res.fullname, transferToId: res.user, isShowStaffs: false});
  }

  renderVisa = () => {
    if (this.state.isVisa) {
      return(
        <Image source={require('../Assets/deliveredmessageicon.png')} style={{position: 'absolute', bottom: 0, right: -10, height: 15, width: 15, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderMaster = () => {
    if(this.state.isMaster) {
      return(
        <Image source={require('../Assets/deliveredmessageicon.png')} style={{position: 'absolute', bottom: 0, right: -10, height: 15, width: 15, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderExpress = () => {
    if(this.state.isExpress){
      return(
        <Image source={require('../Assets/deliveredmessageicon.png')} style={{position: 'absolute', bottom: 0, right: -10, height: 15, width: 15, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderCard(res, id) {
    // <Text>{res.cardNumber}</Text>
    return(
        <View key={id} style={{borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
          <View style={{paddingHorizontal: 5}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                {/**
                  res.primary ?
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                      {this.switchCredit(res.cardMeta.type)}
                      <Icon name="ios-checkmark-circle" size={15} color="#5EBD77" style={{backgroundColor: 'transparent', marginHorizontal: 5}} />
                      <Text style={{fontSize: 10, color: '#B7BAC6', fontWeight: '500'}}>Primary</Text>
                    </View>
                  :
                    <View>{this.switchCredit(res.cardMeta.type)}</View>
                **/}
                <View>{this.switchCredit(res.cardMeta.type)}</View>
              </View>
              <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
                {/**<TextMask
                  value={res.cardMeta.number}
                  type={'credit-card'}
                  options={{obfuscated: true}}
                />**/}
                <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
                  <Text>{res.cardMeta.number}</Text>
                </View>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.onRemoveCard(res.promiseId)}>
                <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    )
  }

  renderBank(res, id) {
    return(
        <View key={id} style={{borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
          <View style={{paddingHorizontal: 5}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, height: 45, justifyContent: 'center'}}>
                {/**
                  res.primary ?
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Text>{res.bankMeta.bank_name}</Text>
                      <Icon name="ios-checkmark-circle" size={15} color="#5EBD77" style={{backgroundColor: 'transparent', marginHorizontal: 5}} />
                      <Text style={{fontSize: 10, color: '#B7BAC6', fontWeight: '500'}}>Primary</Text>
                    </View>
                  :
                    <Text>{res.bankMeta.bank_name}</Text>
                **/}
                <Text>{res.bankMeta.bank_name}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
                <Text>{res.bankMeta.account_number}</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.onRemoveBank(res.promiseId)}>
                <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    )
  }


  switchCredit = (card) => {
    if (card == 'visa') {
      return(
        <Image source={require('../Assets/Visaicon.png')} style={{width: 50, height: 45, resizeMode: 'stretch'}}/>
      )
    }else if (card == 'master') {
      return(
        <Image source={require('../Assets/master.png')} style={{width: 50, height: 45, resizeMode: 'stretch'}}/>
      )
    }else {
      return(
        <Image source={require('../Assets/Expressicon.png')} style={{width: 50, height: 45, resizeMode: 'stretch'}}/>
      )
    }
  }

  renderOnShowLoading = () => {
    if(this.state.isLoading){
      return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', opacity: 0.5}}>
          <ActivityIndicator animating={this.state.isLoading} size="large" color="#242424"/>
        </View>
      )
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

  renderStaffList = () => {
    if (this.state.isShowStaffs) {
      return this.state.staffs.map((res, id) => {
        return (
          <TouchableOpacity key={id} onPress={()=>this.onSelectStaff(res.staff)}>
            <View style={{paddingVertical: 8, paddingHorizontal: 5, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
              <Text style={{fontSize: 16}}>{res.staff.fullname}</Text>
            </View>
          </TouchableOpacity>
        )
      })
    }
  }

  formatDate = (date) => {
    let formated = date;
      if(formated.length == 2){
         //formated = text +'/';
        if(this.state.cardDate.indexOf('/') == -1){
          formated = date +'/';
        }
      }
    this.setState({ cardDate: formated })
  }

  renderContent = () => {
    if (this.props.isStaff) {
      return (
        <ScrollView>
            <View style={{padding: 30}}>
              <View style={{marginBottom: 5}}>
                <ZTextMedium text="Add Bank Details" styles={{color: '#7A7A7A', fontSize: 17}}/>
              </View>

              <View>
                <View style={{paddingBottom: 5}}>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Account Name</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(accountName) => this.setState({accountName:accountName})} value={this.state.accountName} placeholder='John Snow'/>
                </View>
                <View>
                    <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Bank Name</Text>
                    <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankName) => this.setState({bankName:bankName})} value={this.state.bankName} placeholder='Bank of Australia' />
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>BSB</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankBSB) => this.setState({bankBSB:bankBSB})} value={this.state.bankBSB} placeholder='123456'/>
                </View>
                <View style={{flex: 1, marginLeft: 15}}>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Account Number</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankAccount) => this.setState({bankAccount:bankAccount})} value={this.state.bankAccount} placeholder='001234567'/>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'flex-end', marginTop: 15}}>
                <TouchableOpacity onPress={() => this.onAddAccount()}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Add Account</Text>
                  </View>
                </TouchableOpacity>
              </View>

                <View style={{marginBottom: 100}}>
                  <ZTextMedium text="Bank Transfer" styles={{color: '#747474', fontSize: 12, fontWeight: 'bold'}}/>
                    <View style={{flex: 1, borderTopWidth: 0.5, borderColor: '#BCBBBE', marginTop: 5}}>
                      {
                        this.state.bankArray.map((res, id) => {
                          return this.renderBank(res, id)
                        })
                      }
                    </View>

                </View>
              </View>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView>
          <View style={{padding: 30}}>

            <ZTextMedium text="Add Credit Card" styles={{color: '#787878', fontSize: 18}}/>
            <Text style={{color:'#787878', fontSize: 10, marginTop: 5}}>This connection is secure</Text>

            <View style={{flexDirection: 'row', marginVertical: 20}}>

              <TouchableOpacity onPress={() => this.onCredit('visa')}>
                <View>
                  {this.renderVisa()}
                    <Image source={require('../Assets/Visaicon.png')} style={{width: 55, height: 50, resizeMode: 'stretch'}}/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onCredit('master')}>
                <View style={{marginLeft: 30}}>
                  {this.renderMaster()}
                    <Image source={require('../Assets/master.png')} style={{width: 55, height: 50, resizeMode: 'stretch'}}/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onCredit('american_express')}>
                <View style={{marginLeft: 30}}>
                  {this.renderExpress()}
                    <Image source={require('../Assets/Expressicon.png')} style={{width: 55, height: 50, resizeMode: 'stretch'}}/>
              </View>
              </TouchableOpacity>

            </View>

            <View>

              <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
                  <TextInput placeholder="Name on the Card" style={{fontSize: 14, color: 'black' , height: 35, width: '100%'}} onChangeText={(cardName) => this.setState({cardName:cardName})} value={this.state.cardName}/>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 3}}>
                  <TextInput placeholder="Credit/Debit Card Number" style={{fontSize: 14, color: 'black' , height: 35, width: '100%'}} onChangeText={(cardNumber) => this.setState({cardNumber:cardNumber})} value={this.state.cardNumber} keyboardType={'numeric'}/>
                </View>
              </View>

            </View>

            <View style={{flexDirection: 'row',  paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginTop: 5,}}>

              <View style={{flex: 1, marginRight: 15}}>
                <Text style={{color: '#A8A5AE', paddingBottom: 5}}>Month/Year</Text>
                <TextInput style={{height: 40, backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(cardDate) => this.formatDate(cardDate)} value={this.state.cardDate} placeholder={moment(new Date()).format('MM / YY')} keyboardType={'numeric'} maxLength={5}/>
              </View>

              <View style={{flex: 1}}>
                <Text style={{color: '#A8A5AE', paddingBottom: 5}}>CVV</Text>
                <TextInput style={{height: 40, backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(cardCV) => this.setState({cardCV:cardCV})} value={this.state.cardCV} placeholder='123' keyboardType={'numeric'}/>
              </View>

            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginVertical: 15}}>

              <TouchableOpacity onPress={() => this.onAddCard()}>
                <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF'}}>Add Card</Text>
                </View>
              </TouchableOpacity>

            </View>

            <View style={{marginBottom: 5}}>
              <ZTextMedium text="Or add Bank Details" styles={{color: '#7A7A7A', fontSize: 17}}/>
            </View>

            <View>
              <View style={{paddingBottom: 5}}>
                <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Account Name</Text>
                <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(accountName) => this.setState({accountName:accountName})} value={this.state.accountName} placeholder='John Snow'/>
              </View>
                <View>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Bank Name</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankName) => this.setState({bankName:bankName})} value={this.state.bankName} placeholder='Bank of Australia' />
                </View>
            </View>


              <View style={{flexDirection: 'row', marginTop: 10}}>

                <View style={{flex: 1}}>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>BSB</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankBSB) => this.setState({bankBSB:bankBSB})} value={this.state.bankBSB} placeholder='123456'/>
                </View>

                <View style={{flex: 1, marginLeft: 15}}>
                  <Text style={{color: '#B7B7B7', paddingBottom: 5}}>Account Number</Text>
                  <TextInput style={{height: 40, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankAccount) => this.setState({bankAccount:bankAccount})} value={this.state.bankAccount} placeholder='001234567'/>
                </View>

              </View>

              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 15}}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this.setModalVisible()}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Direct Transfer</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onAddAccount()}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Add Account</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <ZTextMedium text="Payment Method" styles={{color: '#747474', fontSize: 15, fontWeight: 'bold'}}/>

                <ZTextMedium text="Credit Card" styles={{color: '#747474', fontSize: 12, fontWeight: 'bold'}}/>
                  <View style={{flex: 1, borderTopWidth: 0.5, borderColor: '#BCBBBE', marginTop: 5}}>
                    {
                      this.state.cardArray.map((res, id) => {
                        return this.renderCard(res, id)
                      })
                    }
                  </View>

              </View>

              <View style={{marginBottom: 100}}>
                <ZTextMedium text="Bank Transfer" styles={{color: '#747474', fontSize: 12, fontWeight: 'bold'}}/>
                  <View style={{flex: 1, borderTopWidth: 0.5, borderColor: '#BCBBBE', marginTop: 5}}>
                    {
                      this.state.bankArray.map((res, id) => {
                        return this.renderBank(res, id)
                      })
                    }
                  </View>

              </View>
          </View>
        </ScrollView>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    LayoutAnimation.easeInEaseOut();
    return (

      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

          {this.renderContent()}

          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >

           <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center'}}>

             <View style={[{backgroundColor: '#FFFFFF', padding: 10, width: '90%', marginBottom: this.state.keyboardHeight}, styles.shadowStyle]}>
               <View style={{marginTop: 40}}>

                 <ZText text="Transfer Money" styles={{color: '#777777', fontSize: 14, textAlign: 'justify', fontWeight: 'bold'}}/>
                 <ZTextMedium text="Bank Transfer" styles={{color: '#737373', marginTop: 1, fontSize: 13, fontWeight: '400'}}/>

                 <ZTextInputWidth placeholder="Amount" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(amount) => this.setState({amount})}/>

                 <View style={{height: this.state.isShowStaffs ? (this.state.staffs.length * 100) : null}}>
                   <ZTextInputWidth placeholder="Transfer to:" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} value={this.state.transferTo} onChangeText={(value) => this.onChangeTextTransfer(value)}/>
                   {
                     this.state.isShowStaffs ?
                     <View style={{borderWidth: 0.5, borderColor: '#BCBBBE'}}>
                      {this.renderStaffList()}
                     </View>
                     :
                     null
                   }
                 </View>

                 <ZTextInputWidth placeholder="Bank" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(bankTransferName) => this.setState({bankTransferName})}/>
                 <ZTextInputWidth placeholder="Account Name" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(bankTransferAccountName) => this.setState({bankTransferAccountName})}/>

                 <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderColor: '#A8AFB8', marginTop: 10}}>

                   <View style={{flex: 1}}>
                     <Text style={{color: '#A8A5AE', paddingBottom: 5}}>BSB</Text>
                     <TextInput style={{height: 45, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankTransferBSB) => this.setState({bankTransferBSB})} />
                   </View>

                   <View style={{flex: 1, marginLeft: 20}}>
                     <Text style={{color: '#A8A5AE', paddingBottom: 5}}>Account Numbers</Text>
                     <TextInput style={{height: 45, borderWidth: 0.5, borderColor: '#BCBBBE', backgroundColor: '#FAFAFA', padding: 10}} onChangeText={(bankTransferAccountNumbers) => this.setState({bankTransferAccountNumbers})} />
                   </View>

                 </View>

                 <View style={{marginTop: 15, alignItems: 'flex-end', justifyContent: 'center'}}>
                   <TouchableOpacity onPress={() => this.onDirectTransfer()}>
                     <View style={{borderRadius: 5, backgroundColor: '#65D9E6', padding: 5, paddingHorizontal: 10, height: 35, width: 180, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                       <Text style={{fontSize: 13, fontWeight: '500', color: '#D9FFFF'}}>Add Account and Send</Text>
                     </View>
                   </TouchableOpacity>
                 </View>
               </View>

               <TouchableOpacity style={{position: 'absolute', top: 0, right: 0}} onPress={()=>this.setModalVisible()}>
                 <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="md-close" size={25} color="black"/>
                 </View>
               </TouchableOpacity>

             </View>
             {this.renderOnShowLoadingPayment()}
           </View>
          </Modal>

          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isSuccessfulSentShow}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >

           <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center'}}>
             <View style={[{backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: '90%'}, styles.shadowStyle]}>

               <View>
                 <Icon name="ios-checkmark-outline" size={200} color="#5FDAEB" style={{backgroundColor: 'transparent'}} />
               </View>

               <ZText text="Sent!" styles={{color: '#747474', fontSize: 20, marginBottom: 30, fontWeight: 'bold'}}/>
               <ZTextMedium text={`Your request to transfer $${this.state.amount} to`} styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>
               <ZTextMedium text={`${this.state.transferTo} was successful.`} styles={{color: '#727272', marginTop: 1, fontSize: 15, fontWeight: '500'}}/>

               <View style={{marginVertical: 25}}>

                 <TouchableOpacity onPress={() => this.setState({isSuccessfulSentShow: false})}>
                   <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 65, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                     <Text style={{fontSize: 15, fontWeight: '500', color: '#D9FFFF'}}>OK</Text>
                   </View>
                 </TouchableOpacity>

               </View>
             </View>

           </View>
          </Modal>

          {this.renderOnShowLoading()}
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
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  shadowStyle: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
  }
});
