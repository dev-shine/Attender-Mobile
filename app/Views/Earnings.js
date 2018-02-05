
import ZText from 'ZText';
import ZTextMedium from 'ZTextMedium';
import ZTextInputWidth from 'ZTextInputWidth';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity, colors, Modal
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import API from 'API';
var moment = require('moment');

export default class TotalAvailableBalance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalsVisible: false,
      isShowConfirmWithdraw: false,
      isShowSuccessWithdraw: false,
      totalAvailBalance: 0,
      transactions: [],
      bankArray: [],
      accountName: '',
      bankName: '',
      bankBSB: '',
      bankAccount: '',
      totalEarnings: 0,
      withdrawAmount: 0,
      isShowBanks: false,
      withdrawTo: '',
      searchBank: false,
      withdrawToId: '',
      accountNumber: '',
      withdrawMultiple: false,
      bankIndex: 0,
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
      <Text style={{color: 'white'}}>Earnings</Text>
  };

  componentDidMount() {
    this.getAllEarnings();
    this.getAllTransactions();
  }

  // onChangeTextBanks = (value) => {
  //   this.setState({withdrawTo: value, searchBank: true})
  //   if (value.length > 2) {
  //     this.getAllEarnings(value)
  //   } else {
  //
  //   }
  // }

  getAllEarnings = (value) => {
  //   if (this.state.searchBank) {
  //     API.get(`earnings?query=${value}`).then((res) => {
  //       console.log(res);
  //       this.setState({totalAvailBalance: res.wallet.label, bankArray: res.banks, isShowBanks: true});
  //     })
  //   } else {
  let bankIndex = this.state.bankIndex;
      API.get('earnings').then((res) => {
        console.log(res);
        this.setState({
          totalAvailBalance: res.wallet.label,
          bankArray: res.banks,
          withdrawToId: res.banks.promiseId,
          withdrawTo: res.banks[bankIndex].bankMeta.bank_name,
          accountNumber: res.banks[bankIndex].bankMeta.account_number
        });
      })
    // }
  }

  getAllTransactions = () => {
    API.get('transactions').then((res) => {
      console.log('transactions', res);
      if (res.status) {
        var total = 0;
        res.transactions.items.map((res) => {
          if (res.state == 'completed') {
            total += res.amount/100;

          }
        })
        this.setState({transactions: res.transactions.items, totalEarnings: total.toFixed(2)});

      }
    })
  }

  // renderBankList = () => {
  //   if (this.state.isShowBanks) {
  //     return this.state.bankArray.map((res, id) => {
  //       return(
  //         <TouchableOpacity key={id} onPress={()=>this.onSelectBank(res)}>
  //           <View style={{paddingVertical: 8, paddingHorizontal: 5, borderBottomWidth: 0.5, borderColor: '#BCBBBE'}}>
  //             <Text style={{fontSize: 16}}>{res.bankMeta.account_name}</Text>
  //           </View>
  //         </TouchableOpacity>
  //       )
  //     })
  //   }
  // }

  // onSelectBank = (res) => {
  //   this.setState({
  //     withdrawTo: res.bankMeta.account_name,
  //     withdrawToId: res.promiseId,
  //     accountNumber: res.bankMeta.account_number,
  //     isShowBanks: false
  //   });
  // }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setModalsVisible(visible) {
    this.setState({modalsVisible: visible});
  }

  onPressWithdraw = () => {
    if (!this.state.withdrawMultiple) {
      API.post('withdraw', {account_id: this.state.withdrawToId, amount: this.state.withdrawAmount}).then((res) => {
        console.log('withdraw',res);
        if (res.status) {
          if (!this.state.isShowConfirmWithdraw) {
            this.setState({isShowConfirmWithdraw: true, withdrawMultiple: true});
          }
        } else {
          alert('Something went wrong!', res);
        }
      });
    } else {
      alert('No enough funds');
    }
  }

  onPressConfirmWithdraw = () => {
    var self = this;
    if (this.state.isShowSuccessWithdraw) {
      this.setState({isShowSuccessWithdraw: false});
      setTimeout(() => {
        self.setState({isShowConfirmWithdraw: false});
      }, 0);
    }else if (!this.state.isShowSuccessWithdraw) {
      this.setState({isShowSuccessWithdraw: true});
    }
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
        this.getAllEarnings();
        this.setState({modalsVisible: false});
      } else {
        alert('Invalid Input');
      }
    });
  }

  onRemoveBank= (id) => {
    API.post(`remove-bank/${id}`, {}).then((res) => {
      console.log(res);
      this.getAllEarnings();
    });
  }

  renderConfirmWithdraw = () => {
      return(
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isShowConfirmWithdraw}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.9, backgroundColor: 'white'}} />
            <View style={{backgroundColor: '#FFFFFF'}}>
              <View>
                <View style={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20}}>
                  <TouchableOpacity onPress={() => this.setState({isShowConfirmWithdraw: false})}>
                    <Icon name="ios-arrow-round-back" size={40} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <ZText text="Withdraw" styles={{color: '#777777', fontSize: 15, marginBottom: 10, fontWeight: 'bold'}}/>
                  <ZText text={`$`+ this.state.withdrawAmount} styles={{color: '#615AB9', fontSize: 35}}/>
                  <ZText text="funds to your" styles={{color: '#737373', fontSize: 15}}/>
                  <ZText text={this.state.withdrawTo} styles={{color: '#625BA1', fontSize: 19, fontWeight: '600'}}/>
                  <ZText text="with an account number of" styles={{color: '#737373', marginTop: 1, fontSize: 15}}/>
                  <ZText text={this.state.accountNumber} styles={{color: '#625BA1', fontSize: 17, fontWeight: '600'}}/>
                    <View style={{marginTop: 60, paddingBottom: 90}}>
                      <TouchableOpacity onPress={() => {this.onPressConfirmWithdraw()}}>
                        <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 120, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF'}}>Confirm</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
          </View>
          {this.renderSuccessWithdraw()}
        </Modal>
      )
  }

  renderSuccessWithdraw = () => {
    return(
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isShowSuccessWithdraw}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.9, backgroundColor: 'white'}} />
          <View style={{backgroundColor: '#FFFFFF'}}>
            <View style={{backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
              <View>
                <Icon name="ios-checkmark-outline" size={180} color="#63DBE8" style={{backgroundColor: 'transparent'}} />
              </View>
              <ZTextMedium text="Your have successful withdrawn" styles={{color: '#7C7C7C', fontWeight: '400', fontSize: 15}}/>
              <ZTextMedium text="funds to your bank account" styles={{color: '#7C7C7C', marginTop: 1, fontSize: 15, fontWeight: '400'}}/>
              <View style={{marginTop: 25, paddingBottom: 90}}>
                <TouchableOpacity onPress={() => {this.onPressConfirmWithdraw()}}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE9', padding: 5, margin: 10, paddingHorizontal: 10, width: 65, height: 30, borderRadius: 30}}>
                    <Text style={{fontSize: 14, fontWeight: '500', color: '#D9FFFF', textAlign: 'center'}}>OK</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderBank(res, id) {
    return(
        <View key={id} style={{borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingVertical: 5}}>
          <View style={{paddingHorizontal: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {
                  res.primary ?
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#B7BAC6', fontWeight: '500', marginRight: 8}}>{res.bankMeta.bank_name}</Text>
                    <Icon name="ios-checkmark-circle" size={15} color="#5EBD77" style={{backgroundColor: 'transparent', marginRight: 5}} />
                    <Text style={{fontSize: 10, color: '#B7BAC6', fontWeight: '500'}}>Primary</Text>
                  </View>
                  :
                  <Text style={{fontSize: 16, color: '#B7BAC6', fontWeight: '500', marginRight: 8}}>{res.bankMeta.bank_name}</Text>
                }

                <Text style={{fontSize: 13, color: '#B7BAC6', fontWeight: '500', marginTop: 5}}>{res.bankMeta.account_name}</Text>
                <Text style={{fontSize: 13, color: '#B7BAC6', fontWeight: '500', marginTop: 5}}>{res.bankMeta.account_type.toUpperCase()}: {res.bankMeta.account_number}</Text>
              </View>

              <TouchableOpacity onPress={() => this.onRemoveBank(res.promiseId)}>
                <View style={{backgroundColor:'#5D5CAA', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="ios-remove" size={15} color="white" style={{backgroundColor: 'transparent'}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }

  // <View style={{paddingBottom: 30, borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 5}}>
  //   <ZTextInputWidth placeholder="Account Name" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(accountName) => this.setState({accountName:accountName})} value={this.state.accountName}/>
  //   <ZTextInputWidth placeholder="Bank Name" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(bankName) => this.setState({bankName:bankName})} value={this.state.bankName} />
  //   <View style={{flexDirection: 'row'}}>
  //     <View style={{flex: 1, marginRight: 15}}>
  //       <ZTextInputWidth placeholder="BSB" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(bankBSB) => this.setState({bankBSB:bankBSB})} value={this.state.bankBSB} />
  //     </View>
  //     <View style={{flex: 1}}>
  //       <ZTextInputWidth placeholder="Account Number" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} onChangeText={(bankAccount) => this.setState({bankAccount:bankAccount})} value={this.state.bankAccount} />
  //     </View>
  //   </View>
  // </View>

  onNext = () => {
    let current =  this.state.bankIndex;
    let bankList = this.state.bankArray;
    if (current == bankList.length -1) {
      current = 0;
    } else {
      current++;
      this.setState({bankIndex: current});
    }
    console.log('next', this.state.bankIndex);
  }

  onPrev = () => {
    let current =  this.state.bankIndex;
    let bankList = this.state.bankArray;
    if (current == 0) {
      current = bankList.length -1;
    } else {
      current--;
      this.setState({bankIndex: current});
    }
    console.log('prev', this.state.bankIndex);
  }

  render() {
    const { navigate } = this.props.navigation;
    let bankIndex = this.state.bankIndex;
    return (
      <ScrollView style={{flex: 1, padding: 20, backgroundColor: '#FFFFFF'}}>
        <ZTextMedium text={`Total Available Balance: ${this.state.totalAvailBalance}`} styles={{color: '#717171', fontSize: 16, marginTop: 10, textAlign: 'justify'}}/>

        <View style={{alignItems: 'flex-end', marginTop: 10}}>
          <TouchableOpacity onPress={() => {this.setModalVisible()}}>
            <View style={{borderRadius: 5, backgroundColor: '#5FDAE7', padding: 5, paddingHorizontal: 10, width: 120, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#D9FFFF'}}>Withdraw Funds</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingBottom: 20}}>
          <ZTextMedium text="Total Withdraw:" styles={{color: '#717171', fontSize: 15, marginTop: 10, textAlign: 'justify'}}/>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20}}>
            <View style={{flex: 1}}>
              <ZTextMedium text={`Total Earnings:`} styles={{color: '#838383', fontSize: 15, textAlign: 'left'}}/>
            </View>
            <ZTextMedium text={`$${this.state.totalEarnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} styles={{color: '#C2C2C2', fontSize: 15, textAlign: 'right'}}/>
          </View>
        </View>

        <ScrollView style={{height: 300}}>
          {this.state.transactions.map((res, id) => {
            if (res.state == 'completed') {

              return (
                <View key={id} style={{flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#BCBBBE', paddingBottom: 30, paddingTop: 10}}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#717171', fontSize: 12, fontWeight: '500'}}>Transfer from <Text style={{color: '#717171', fontSize: 14, fontWeight: 'bold'}}>{res.buyer_name}</Text></Text>
                    <Text style={{color: '#717171', fontSize: 10, fontWeight: '500'}}>Completed {moment(res.updated_at).format('D MMMM YYYY')}</Text>
                  </View>
                  <Text style={{color: '#717171', fontSize: 12, fontWeight: '500'}}>${(res.amount/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
              )
            }
          })}
        </ScrollView>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, marginTop: 5}}>
            <Text style={{fontSize: 13, fontWeight: '500', color: '#878A91'}}>Add another Bank Account</Text>
          </View>
          <View style={{marginTop: 5}}>
            <TouchableOpacity onPress={() => {this.setModalsVisible(true)}}>
              <Image source={require('../Assets/plusicon.png')} style={{resizeMode: 'stretch', width: 20, height: 20}}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginTop: 30}}>
          <TouchableOpacity>
            <ZText text="Saved Account" styles={{color: '#717171', fontSize: 14, marginTop: 5, marginBottom: 10, textAlign: 'justify'}}/>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 100}}>
            <View style={{flex: 1, marginTop: 5}}>
              {
                this.state.bankArray.map((res, id) => {
                  return this.renderBank(res, id)
                })
              }
            </View>

        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalsVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.9, backgroundColor: 'white'}} />
            <View style={{paddingHorizontal: 20, backgroundColor: '#FFFFFF'}}>
              <View style={{marginBottom: 10}}>
                <TouchableOpacity onPress={() => {this.setState({modalsVisible: false})}} style={{alignItems: 'flex-end'}}>
                  <View style={{marginTop: 10, marginBottom: 20}}>
                    <Image
                      source={require('../Assets/Closeicon.png')}
                      style={{width: 15, height: 15}}
                    />
                  </View>
                </TouchableOpacity>
              </View>

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

              <View style={{borderWidth: 0.5, borderColor: '#B7B7B7', width: '100%', marginVertical: 30}} />

              <View style={{alignItems: 'flex-end', marginBottom: 30}}>
                <TouchableOpacity onPress={() => this.onAddAccount()}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE7', padding: 5, paddingHorizontal: 10, width: 110, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.9, backgroundColor: 'white'}} />
            <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 20}}>
              <View style={{marginBottom: 10}}>
                <TouchableOpacity onPress={() => {this.setState({modalVisible: false})}} style={{alignItems: 'flex-end'}}>
                  <View style={{marginTop: 10, marginBottom: 20}}>
                    <Image
                      source={require('../Assets/Closeicon.png')}
                      style={{width: 15, height: 15}}
                    />
                  </View>
                </TouchableOpacity>
                <ZText text="Withdraw Funds" styles={{color: '#747474', fontSize: 16, textAlign: 'justify', fontWeight: '600'}}/>
                <ZText text={`Available Balance: ${this.state.totalAvailBalance}`} styles={{color: '#747474', fontSize: 13, marginTop: 20, textAlign: 'justify'}}/>
              </View>

              <View style={{paddingBottom: 30, borderBottomWidth: 0.5, borderColor: '#BCBBBE', marginBottom: 5}}>
                <ZTextInputWidth dollarSign placeholder="Withdrawal Amount" style={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} value={this.state.withdrawAmount} onChangeText={(withdrawAmount) => this.setState({withdrawAmount})}/>
                <View>
                  <ZTextInputWidth onPressUp={()=>this.onNext()} onPressDown={()=>this.onPrev()} nextPrev placeholder="Withdraw to Bank Account" styles={{backgroundColor:'#FAFAFA', borderWidth: 0.5, borderColor: '#BCBBBE'}} value={(this.state.bankArray.length > 0 ? this.state.bankArray[bankIndex].bankMeta.account_name : '') + `   ` + (this.state.bankArray.length > 0 ? this.state.bankArray[bankIndex].bankMeta.account_number : '')}/>
                  {
                    this.state.isShowBanks ?
                    <View style={{borderWidth: 0.5, borderColor: '#BCBBBE'}}>
                     {this.renderBankList()}
                    </View>
                    :
                    null
                  }
                </View>
              </View>

              <View style={{marginTop: 15, alignItems: 'flex-end', marginBottom: 30}}>
                <TouchableOpacity onPress={() => this.onPressWithdraw()}>
                  <View style={{borderRadius: 5, backgroundColor: '#5FDAE7', padding: 5, paddingHorizontal: 10, width: 110, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 13, fontWeight: '400', color: '#D9FFFF'}}>Withdraw</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          {this.renderConfirmWithdraw()}
        </Modal>
      </ScrollView>
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
