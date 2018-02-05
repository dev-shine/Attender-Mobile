
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
  TouchableOpacity, colors
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class TermsAgreement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      isLoggined: false,
      email: 'admin@attender.com',
      password: 'password'
    }
  }

  static navigationOptions = {
    headerStyle: {
          backgroundColor: '#625BBA'
      },
      headerTitleStyle: {

      },
      headerTintColor: 'white',
      headerTitle:
      <Text style={{color: 'white'}}>Terms and Agreement</Text>
  };

  renderContent = () => {
    if (this.props.navigation.state.params.termsCondition == 'Business') {
      return(
        <View style={{marginTop: 10, marginBottom: 50, marginHorizontal: 40}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 18, fontWeight: 'bold', textAlign: 'center', }}>{`Terms and Conditions of Use\nBusinesses/Hosts`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender Pty Ltd ('Attender, we, us or our') provides a means for businesses and individuals seeking to employ the services of hospitality staff ('Business, you or your') to be matched with individuals looking for hospitality work ('Attendants') and for hospitality businesses it additionally affords (on a subscription basis) facilities to assist in on-going resourcing, scheduling and management of all staff in a venue or enterprise ('the Services').`}
            </Text>
          </View>


          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`1.   Contract with Attender`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`By using Attender, you agree to be bound by all these terms and conditions and the Attender Website Terms and Conditions of Use, each as varied, modified or updated by Attender from time to time (collectively, 'the Terms') and which form a contract between you and Attender. If you do not agree to these Terms, you may not access or use the Services. These Terms expressly replace any prior understanding, agreement or arrangement with you.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`2.   App and Web based Platform`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender is a mobile App and web based platform that connects Businesses directly with hospitality workers.  Attender is a digital venue only and does not guarantee or accept any liability or responsibility for the quality or legality of Attendants procured by Businesses through the Attender service.  Attender does not screen any Attendants on its platform or provide any checking or verification of information on Attendants provided by the Services including validity of RSA or RCG registration.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants who solicit work through Attender do so as completely independent workers.  The Attendants are not employees or subcontractors of Attender.  They are not in any agency, partnership, joint venture or other similar relationship with Attender.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants are not agents of Attender and are entirely free to determine which jobs they apply for and accept and how and when they fulfil their contractual obligations with a Business in compliance with these Terms.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender is not an employment or a labour hire agency.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender reserves the right to ban any Business from its platform service at its sole discretion.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`3.   Eligibility to use the Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Upon creation of a Business user account, the sole use of the account and its responsibility rests with the Business.  The Business cannot transfer their account or allow anyone other than the authorised Business to engage in activities on the platform service.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`4.   Responsibility to take out and maintain Insurance`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`It is your responsibility to have the appropriate insurances (such as workers compensation and public liability) in place to cover the Attendants you seek to secure the efforts of through use of the Attender Services. Attender accepts no responsibility for insurance cover for Attendants or Businesses.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`5.   Responsibility to maintain Business User Account credentials and password`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`A Business is solely responsible for the maintenance and confidentiality of all its credentials and passwords. Any misuse of a Business account is the sole responsibility of the Business and Attender accepts no liability arising from account misuse. If a Business suspects their account details have been compromised it must contact Attender immediately and/or reset their password using the Attender account resetting tool.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`6.   Responsibilities and Obligations of Businesses`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Businesses agree and undertake:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that all information provided on this site by the Business is truthful, accurate and up to date and not false, misleading or deceptive.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to abide by all laws, statutes and regulations governing its activities in relation to the use of this platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to not engage in any threatening, harassing or libellous behaviour while using the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to not compromise the Attender platform in any way.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that any and all information and communication provided by them on the platform is not threatening, harassing obscene, immoral, defamatory, misleading, deceptive, false or infringes on any confidentiality or intellectual property rights.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to ensure that their actions on the platform will not result in malicious code, viruses or information that affects the platform performance or corrupts its intended function.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that any and all images that are upload to or linked from the platform are not obscene, inappropriate, illegal or irrelevant to the stated purpose of the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`7.   Limitations of Attender Liability`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender will not be liable for any claim, injury, loss or damage as result of any activities conducted directly or indirectly via its Services.  All legal obligations and relevant laws, regulations and requirements must be met at all times by Businesses using the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Businesses agree and undertake to indemnify Attender and its officers and directors against any:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  legal violation or action that may arise either directly or indirectly through your use of the Services;`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 claim or liability with respect to taxation as a result of your use of the Services; and`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 damages, expenses or losses arising from a beach by you of the Terms.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`8.   Types of Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender is available for use by Businesses on either a Pay per Attendant Contract basis or on a Subscription basis.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`No fees are charged by us to the Attendant for use of the Attender Services.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`9.   Pay per Attendant Contract based service`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`A one-off service fee is payable by the Business to Attender for each Attendant contract arranged using Attender. This service fee is equal to 16.5% of the total contracted Attendant costs and is inclusive of GST ('Service Fee').`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`10.   Subscription Based Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender offers two levels of subscription services. Both services are available for a monthly fee payable in advance and cancellable upon one month's notice.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`10.1   Unlimited Attender Staff Finding`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`This subscription service affords to a Business unlimited use of the human resource matching and engagement capabilities of Attender at a fixed monthly cost of $49 (excluding GST). No additional payments are due to Attender irrespective of the number of Attendants or sessions contracted for using the Services during the subscription period.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`10.2   Unlimited Attender Staff Finding plus Management`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`This premium level service provides unlimited use of Attender's resource matching and engagement capabilities together with a suite of facilities to assist and simplify hospitality venue resource management. These facilities include integrated event calendar, staff scheduling and messaging services. This total service is available at a cost of $3 per month (excluding GST) for each hospitality worker providing services to such enterprise or covered by such Attender services during the relevant subscription month.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`10.3   Payment for Subscription Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`10.3.1 Where the option is given to you, you may make payment of the Subscription Fee by way of:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 70}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Electronic funds transfer into our nominated bank account`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 70}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Credit Card Payment`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`All payments made in the course of your use of the Services are made using Promise Pay Pty Ltd (trading as Assembly Payments). In making any payment in relation to your use of the Services, you warrant that you have read, understood and agree to be bound by the Assembly Payments terms and conditions which are available on their website`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`10.3.2 You acknowledge and agree that where a request for the payment of the Subscription Fee is returned or denied, for whatever reason, by your financial institution or is unpaid by you for any other reason, then you are liable for any costs, including banking fees and charges, associated with the Subscription Fee.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`10.3.3 You agree and acknowledge that Attender can vary the Subscription Fee at any time and that the varied Subscription Fee will come into effect following the conclusion of the existing Subscription Period.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`11.   Payment for Contracted services of Attendant`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Once the terms of a contract for services has been agreed by a Business and an Attendant, payment in full for the value of the contract plus Attender's Service Fee must be made by the Business by credit card in advance to the Attender escrow service account.  This account is managed on behalf of Attender by Promise Pay Pty Ltd (trading as Assembly Payments). In  making any payment in relation to  your use of the Services, you warrant that you have read, understood and agree to be bound by the Assembly Payments terms and conditions which are available on their website`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Upon completion of the contract, payment will be held for 2 working days before being released to the relevant Attendant. Should a Business wish to dispute a payment before being released to an Attendant it must do so within 24 hours of the event or matter giving rise to such wish using the Payment Dispute mechanism on the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender will provide a tax invoice to the Business for our fees payable to Attender. Attender reserves the right to adjust or change the fees or fee structure at any time and will notify Businesses of any changes.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`12.   Cancellation of Contract prior to Commencement`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If a Business cancels an agreed contract within 24 hours of the agreed commencement time of the fulfillment of the contract, a cancellation fee of $50 will be deducted from the Business's escrow payment before the balance of the payment is returned to the Business.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 $40 of this fee will be made payable to the Attendant (without any further deductions).`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 $10 of this fee will be levied and held by Attender.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`13.   Cancellation of a Contract after Commencement`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If a Business no longer requires an Attendant after commencement of the contract or part way through fulfilment of a contract, then payment for the contract will be made in full. However, should the Attendant fail to fulfil their obligations under the contract (e.g. fail to turn up or on their own volition depart prior to completion of the contract), the Business may lodge a Payment Dispute flag and upon determination may receive a full or partial refund. Payment Disputes must be registered with Attender within 24 hours of the event or matter giving rise to such.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`14.   Minimum Contract Value`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If a Business no longer requires an Attendant after commencement of the contract or part way through fulfilment of a contract, then payment for the contract will be made in full. However, should the Attendant fail to fulfil their obligations under the contract (e.g. fail to turn up or on their own volition depart prior to completion of the contract), the Business may lodge a Payment Dispute flag and upon determination may receive a full or partial refund. Payment Disputes must be registered with Attender within 24 hours of the event or matter giving rise to such.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`15.   Severability`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Should any provision of these Terms be held unenforceable or invalid for any reason then such Terms will be deemed modified to the extent that the remaining Terms become valid and enforceable.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`16.   No Warranty`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`All Services provided by Attender are provided ‘as is’ and without any warranty or guarantee of quality or level of service. Attender makes no representation of warranty of any kind.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`17.   Governing Law and Jurisdiction`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Australian law governs the Terms. The parties agree to submit to the jurisdiction of the Courts of New South Wales.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`18.   Privacy`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`By agreeing to these terms and conditions you also agree with Attender’s privacy policy located here http://www.Attender.com/privacy-statement/`}
            </Text>
          </View>

        </View>
      )
    }else if (this.props.navigation.state.params.termsCondition == 'Attendants') {
      return(
        <View style={{marginTop: 10, marginBottom: 50, marginHorizontal: 40}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 18, fontWeight: 'bold', textAlign: 'center', }}>{`Terms and Conditions of Use\nAttendants`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender Pty Ltd ('Attender, we, us or our') provides a means for individuals seeking work in hospitality ('Attendants or you') to be matched with businesses or hosts looking to employ the services of hospitality staff ('Businesses') and for hospitality businesses it additionally affords (on a subscription basis) facilities to assist in on-going resourcing, scheduling and management of all staff in a venue or enterprise ('the Services').`}
            </Text>
          </View>


          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`1.   Contract with Attender`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`By using Attender, you agree to be bound by all these terms and conditions and the Attender Website Terms and Conditions of Use, each as varied, modified or updated by Attender from time to time ('the Terms') and which forms a contract between you and Attender. If you do not agree to these Terms, you may not access or use the Services. These Terms expressly replace any prior understanding, agreement or arrangement with you.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`2.   App and Web based Platform`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender is a mobile App and web based platform that connects hospitality workers directly with Businesses. Attender is a digital venue only and does not guarantee or accept any liability or responsibility for the quality or legality of Businesses that procure Attendants through the Attender service.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants who solicit work through Attender do so as completely independent workers.  The Attendants are not employees or subcontractors of Attender.  They are not in any agency, partnership, joint venture or other similar relationship with Attender.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants are not agents of Attender and are entirely free to determine which jobs they apply for and accept and how and when they fulfil their contractual obligations with a Business in compliance with these Terms.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender is not an employment or a labour hire agency.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender reserves the right to ban any Attendant from its Services at its sole discretion.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`3.   Eligibility to use the Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`All Attendant's user accounts must be created and held by a person:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 with the capacity to form legally binding contracts under Australian law,`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  Having a valid Tax File Number and`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  Eligible to work within Australia.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender reserves the right to reject an Attendant’s application at its sole discretion.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Upon creation of an Attendant User Account, the sole use of the account and its responsibility rests with the Attendant.  The Attendant cannot transfer their account or allow anyone other than the authorised Attendant to engage in activities on the platform service.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`4.   Responsibility to maintain Attendant’s User Account credentials and password`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`The Attendant is solely responsible for the maintenance, update and confidentiality of all their credentials, profile information and passwords. Any misuse of an Attendant account is the sole responsibility of the Attendant and Attender accepts no liability arising from account misuse. If an Attendant suspects their account details has been compromised they must contact Attender immediately and/or reset their password using the Attender account resetting tool.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`5.   Attendant responsibilities and Obligations`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants agree and undertake:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that all information provided on this site by the Attendant is truthful, accurate and up to date and not false, misleading or deceptive.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to abide by all laws, statutes and regulations governing their activities in relation to the use of this platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to not engage in any threatening, harassing or libellous behaviour while using the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to not compromise the Attender platform in any way.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that any and all information and communication provided by them on the platform is not threatening, harassing obscene, immoral, defamatory, misleading, deceptive, false or infringes on any confidentiality or intellectual property rights.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 to ensure that their actions on the platform will not result in malicious code, viruses or information that affects the platform performance or corrupts its intended function.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  to ensure that any and all images that are upload to or linked from the platform are not obscene, inappropriate, illegal or irrelevant to the stated purpose of the platform.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`6.   Limitations of Attender Liability`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender will not be liable for any claim, injury, loss or damage as result of any activities conducted directly or indirectly via or arising from the use the Services.  All legal obligations and relevant laws, regulations and requirements must be met at all times by Attendants using the Services.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`You agree and undertake to indemnify Attender and its officers and directors against any:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022  legal violation or action that may arise either directly or indirectly through your use of the Services;`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 claim or liability with respect to taxation as a result of your use of the Services; and`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 damages, expenses or losses arising from a beach by you of the Terms.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`7.   Offer and Acceptance Constitute a Contract`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Once terms of engagement are agreed between an Attendant and a Business this forms a binding and legal agreement for services between the Attendant and the Business.  This contract for service does not bind Attender for the fulfilment of those services in anyway.  Attender is not party to the contract of service between the Attendant and the Business.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`8.   Payments for Attendant Services`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Upon completion of the contract, payment will be held for to 2 working days before being released to the Attendant. Delays due to weekends, public holidays or banking holidays may occur from time to time.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`9.   Cancellation of Contract prior to Commencement`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If a Business cancels an agreed contract within 24 hours of the agreed commencement time of the fulfillment of the contract, a cancellation fee of $50 will be deducted from the Business's escrow payment before the balance of the payment is returned to the Business.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 $40 of this fee will be made payable to the Attendant (without any further deductions).`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`\u2022 $10 of this fee will be levied and held by Attender.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`10.   Cancellation of a Contract after Commencement`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If a Business no longer requires an Attendant after commencement of the contract or part way through fulfilment of a contract, then payment for the contract will be made in full. However, should the Attendant fail to fulfil their obligations under the contract (e.g. fail to turn up or on their own volition depart prior to completion of the contract), the Business may lodge a Payment Dispute flag and upon determination may receive a full or partial refund.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`11.   Minimum Contract Value`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`The minimum value of any contract using the Attender platform service is $75.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`12.   Attendant Service Fees Payable to Attender`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`No fees are charged by Attender to the Attendant for use of the Services.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`13.   Superannuation`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`In some circumstances, Attendants may be eligible for superannuation payments from Businesses. Attender has no responsibility or liability in regard to any such entitlement or payments.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`14.   Insurance for Attendants`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attendants accept and acknowledge that they are not covered by any insurance held by Attender including workers compensation, general liability, public liability or professional indemnity insurance.  Should Attendants choose to take out their own insurance policies, they are free to do so.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`15.   Severability`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Should any provision of these Terms be held unenforceable or invalid for any reason then such Terms will be deemed modified to the extent that the remaining Terms become valid and enforceable.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`16.   No Warranty`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`All services provided by Attender in relation to its Services are provided ‘as is’ and without any warranty or guarantee of quality or level of service. Attender makes no representation of warranty of any kind.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`17.   Governing Law and Jurisdiction`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Australian law governs the Terms. The Attendants and Attender agree to submit to the jurisdiction of the Courts of New South Wales.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`18.   Privacy`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`By agreeing to these terms and conditions you also agree with Attender’s privacy policy located here http://www.Attender.com/privacy-statement/`}
            </Text>
          </View>

        </View>
      )
    }else {
      return(
        <View style={{marginTop: 10, marginBottom: 50, marginHorizontal: 40}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 18, fontWeight: 'bold', textAlign: 'center', }}>{`Attender Mobile App\nTerms and Conditions of Use`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 40}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`1.   About the App`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     1.1 Welcome to the Attender mobile software application ('the App'). The App provides a means for businesses and individuals seeking to employ the services of hospitality staff to be matched with individuals looking for hospitality work and for hospitality businesses it additionally affords (on a subscription basis) facilities to assist in on-going resourcing, scheduling and management of all staff in a venue or enterprise ('the Services').`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     1.1 The App is operated by Attender Pty Ltd ACN 619176859 ('Attender'). Access to and use of the App, or any of its associated products or Services, is provided by Attender. Please read these terms and conditions ('the Terms') carefully. By using, browsing and/or reading the App, this signifies that you have read, understood and agree to be bound by the Terms. If you do not agree with the Terms, you must cease usage of the Website, or any of the Services, immediately.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     1.2 Attender reserves the right to review and change any of the Terms at its sole discretion by updating this page. When Attender updates the Terms, it will use reasonable endeavours to provide you with notice of updates to the Terms. Any changes to the Terms take immediate effect from the date of their publication. Before you continue, we recommend you keep a copy of the Terms for your records.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`2.   Your obligations in using the App`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'left'}}>
            {`     2.1 In using the App, you agree to comply with the following:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(a) you will use the Services only for purposes that are permitted by:`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 70}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(i) the Terms; and `}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 70}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(ii) any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions; `}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(b) you have the sole responsibility for protecting the confidentiality of your password and/or email address. Use of your password by any other person may result in the immediate cancellation of the Services;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(c) access and use of the App is limited, non-transferable and allows for the sole use of the App by you for the purposes of Attender providing the Services;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(d) you will not use the Services or the App in connection with any commercial endeavours except those that are specifically endorsed or approved by the management of Attender;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(e) you will not use the Services or App for any illegal and/or unauthorised use which includes collecting email addresses of Members by electronic or other means for the purpose of sending unsolicited email or unauthorised framing of or linking to the App;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(f) you agree that commercial advertisements, affiliate links, and other forms of solicitation may be removed from the App without notice and may result in termination of the Services. Appropriate legal action will be taken by Attender for any illegal or unauthorised use of the App; and`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(g) you acknowledge and agree that any automated use of the App or its Services is prohibited.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`3.   Copyright and Intellectual Property`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     3.1 The App, the Services and all of the related products of Attender are subject to copyright. The material on the App is protected by copyright under the laws of Australia and through international treaties. Unless otherwise indicated, all rights (including copyright) in the Services and compilation of the App (including but not limited to text, graphics, logos, button icons, video images, audio clips, App, code, scripts, design elements and interactive features) or the Services are owned or controlled for these purposes, and are reserved by Attender or its contributors.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     3.2 All trademarks, service marks and trade names are owned, registered and/or licensed by Attender, who grants to you a worldwide, non-exclusive, royalty-free, revocable license to:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(a) use the App pursuant to the Terms;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(b) copy and store the App and the material contained in the App in your device's cache memory; and`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(c) print pages from the App for your own personal and non-commercial use.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     Attender does not grant you any other rights whatsoever in relation to the App or the Services. All other rights are expressly reserved by Attender.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     3.3 Attender retains all rights, title and interest in and to the App and all related Services.  Nothing you do on or in relation to the App will transfer any:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(a) business name, trading name, domain name, trade mark, industrial design, patent, registered design or copyright, or`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(b) right to use or exploit a business name, trading name, domain name, trademark or industrial design, or`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(c) thing, system or process that is the subject of a patent, registered design or copyright (or an adaptation or modification of such a thing, system or process), to you.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     3.4 You may not, without the prior written permission of Attender and the permission of any other relevant rights owners: broadcast, republish, up-load to a third party, transmit, post, distribute, show or play in public, adapt or change in any way the Services or third party Services for any purpose, unless otherwise provided by these Terms. This prohibition does not extend to materials on the App which are freely available for re-use or are in the public domain.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`4.   Privacy`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`Attender takes your privacy seriously and any information provided through your use of the App and/or Services are subject to Attender's Privacy Policy, which is available on the App.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`5.   General Disclaimer`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     5.1 Attender's total liability arising out of or in connection with the Services or these Terms, however arising, including under contract, tort (including negligence), in equity, under statute or otherwise, will not exceed the resupply of the Services to you.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     5.2 Nothing in the Terms limits or excludes any guarantees, warranties, representations or conditions implied or imposed by law, including the Australian Consumer Law (or any liability under them) which by law may not be limited or excluded.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     5.3 Subject to this clause, and to the extent permitted by law:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(a) all terms, guarantees, warranties, representations or conditions which are not expressly stated in the Terms are excluded; and`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(b) Attender will not be liable for any special, indirect or consequential loss or damage (unless such loss or damage is reasonably foreseeable resulting from our failure to meet an applicable Consumer Guarantee), loss of profit or opportunity, or damage to goodwill arising out of or in connection with the Services or these Terms (including as a result of not being able to use the Services or the late supply of the Services), whether at common law, under contract, tort (including negligence), in equity, pursuant to statute or otherwise.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`     5.4 Use of the App and the Services is at your own risk. Everything on the App and the Services is provided to you "as is" and "as available" without warranty or condition of any kind. None of the affiliates, directors, officers, employees, agents, contributors and licensors of Attender make any express or implied representation or warranty about the Services or any products or Services (including the products or Services of Attender) referred to on the App. This includes (but is not restricted to) loss or damage you might suffer as a result of any of the following:`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(a) failure of performance, error, omission, interruption, deletion, defect, failure to correct defects, delay in operation or transmission, computer virus or other harmful component, loss of data, communication line failure, unlawful third party conduct, or theft, destruction, alteration or unauthorised access to records;`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(b) the accuracy, suitability or currency of any information on the App, the Services, or any of its Services related products (including third party material and advertisements on the App);`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(c) costs incurred as a result of you using the App, the Services or any of the products of Attender; and`}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 10, paddingHorizontal: 30}}>
            <Text style={{color: '#878787', fontSize: 12, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`(d) the Services or operation in respect to links which are provided for your convenience.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`6.   Governing Law`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`The Terms are governed by the laws of New South Wales, Australia.  Any dispute, controversy, proceeding or claim of whatever nature arising out of or in any way relating to the Terms and the rights created hereby shall be governed, interpreted and construed by, under and pursuant to the laws of New South Wales, Australia, without reference to conflict of law principles, notwithstanding mandatory rules. The validity of this governing law clause is not contested. The Terms shall be binding to the benefit of the parties hereto and their successors and assigns.`}
            </Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 25}}>
            <Text style={{color: '#7A7A7A', fontSize: 13, lineHeight: 15, fontWeight: 'bold'}}>{`7.   Severance`}</Text>
          </View>

          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: '#878787', fontSize: 13, lineHeight: 15, fontStyle: 'normal', textAlign: 'justify'}}>
            {`If any part of these Terms is found to be void or unenforceable by a Court of competent jurisdiction, that part shall be severed and the rest of the Terms shall remain in force.`}
            </Text>
          </View>
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>

        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>

            <Image source={require('../Assets/attenderlogo.png')} style={{width: 85, height: 70, resizeMode: 'stretch', marginTop: 20}}/>
            <Text style={{color: '#5554B6', fontSize: 22, fontWeight: '500', textAlign: 'center', top: -15}}>Attender</Text>
            {this.renderContent()}
          </View>

        </ScrollView>
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
