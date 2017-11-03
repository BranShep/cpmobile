/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  Picker,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  Image,
  TextInput
} from 'react-native';
import Header from './components/Header';
import InputLarge from './components/InputLarge';
import InputSmall from './components/InputSmall';
import DropDown from './components/DropDown';
import WhatsThisModal from './components/WhatsThisModal';
import SwipeCardModal from './components/SwipeCardModal';
import { ButtonGroup, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PaymentAmountModal from './components/PaymentAmountModal';
import PaymentInput from './components/PaymentInput';
import ExpirationDate from './components/ExpirationDate';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';
import Icons from "./components/Icons";
import SInfo from 'react-native-sensitive-info';
import LoginPage from './components/LoginPage';

var creditcardutils = require('creditcardutils');

const {height, width} = Dimensions.get('window');
const inputWidth = width - 20;

const ss = require('NativeModules').StringProvider;
const poo = require('NativeModules').ReaderDeploymentViewController;
const { CalendarManager } = NativeModules;

const devicePluggedEmitter = new NativeEventEmitter(CalendarManager);


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'nothing yet',
      deviceDetectedString: '',
      deviceDetected: false,
      cardHolderName: '',
      cardNumber: '',
      expirationDate: '',
      zip: '',
      cvv: '',
      maskedPAN: null,
      statePickerVisible: false,
      selectedIndex: 0,
      selectedIndexACH: 0,
      modalVisible: false,
      paymentModalVisible: false,
      readerButtonColor: '#165831',
      paymentAmount: '0.00',
      creditCardButtonStyle: 'buttonFocused',
      achButtonStyle: 'buttonUnfocused',
      textColorCC: 'white',
      textColorACH: 'grey',
      expirationModalVisible: false,
      creditCardType: 'none',
      cardInputTextColor: '#EFDFDF',
      cardValidated: false,
      maxLength: 25,
      next: false,
      scrollViewRef: 'small',
      paymentAmountHeight: 205,
      comments: '',
      swipeCardModalVisible: false,
      timedOut: false,
      cardSwipeDetected: false,
      merchantInfo: {},
      loginModalVisible: false,
      merchantkey: '',
      apikey: '',
      username: '',
      loggingIn: false ,
      user: '',
      password: ''
    }

    this.keyboardHeight = new Animated.Value(0);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateIndexACH = this.updateIndexACH.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  componentWillMount() {
    //this.login('bstest', 'ciHCJBuormRp14$');
    //this.logout();

    SInfo.getItem('merchantkey',{}).then(merchantkey => {
      SInfo.getItem('apikey',{}).then(apikey => {
        SInfo.getItem('username',{}).then(username => {
            this.checkIfLoggedIn(merchantkey, apikey, username);
         });
      });
    });

    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);

    ss.getSomeString(deviceDetectedString => {
      this.setState({
        deviceDetectedString
      });
    });

    poo.initializeReader(deviceDetectedString => {
      this.setState({
        deviceDetectedString
      });
    });

    const subscription = devicePluggedEmitter.addListener(
      'test',
      (deviceDetectedString) => this.onDeviceUnplugged(deviceDetectedString)
    );

    const subscriptionTwo = devicePluggedEmitter.addListener(
      'cardSwipped',
      (cardInfo) => {
        //Format card holder name
        const index = cardInfo[0].indexOf('/');
        const lastName = cardInfo[0].slice(0, index);
        const firstName = cardInfo[0].slice(index + 1, cardInfo[0].length);
        const first = firstName.trim();
        const fullName = first + ' ' + lastName;
        //Format expiry date
        const firstTwo = cardInfo[2].slice(2, cardInfo[2].length);
        const secondTwo = cardInfo[2].slice(0, 2);
        const expiry = firstTwo + ' / ' + secondTwo;

        this.setState({
          cardHolderName: fullName,
          cardNumber: cardInfo[1],
          expirationDate: expiry,
          readerButtonColor: '#165831',
          deviceDetectedString: 'Swipe Card',
          swipeCardModalVisible: false,
          cardSwipeDetected: false,
          cardValidated: true,
          cardInputTextColor: 'white',
          next: true
        });
      }
    );

    const subscriptionThree = devicePluggedEmitter.addListener(
      'timedOut',
      (timedOutString) => this.onTimeout()
    );

    const subscriptionFour = devicePluggedEmitter.addListener(
      'cardSwipeDetected',
      (cardSwipeDetectedString) => this.setState({ cardSwipeDetected: true })
    );
  }

  componentDidMount() {
    if (height === 568) {
      this.setState({
        paymentAmountHeight: 110
      })
    }

    poo.detect(someString => {
      if (someString === 'DEVICE PLUGGED') {
        this.setState({
          deviceDetected: true
        });
      } else {
        this.setState({
          deviceDetected: false
        })
      }
      
    });

    var visaCards = creditCardType('4111');
  }

  checkIfLoggedIn(merchantkey, apikey, username) {  
    console.log('heeeeeeey!', apikey, merchantkey, username);

    if (merchantkey === undefined && apikey === undefined) {
      this.setState({
        loginModalVisible: true
      })
    } else {
      
      fetch(`https://secure.cpteller.com/api/24/webapi.cfc?method=merchant_read&apikey=${apikey}&merchantkey=${merchantkey}`)
      .then((merchantInfo) => merchantInfo.json())
      .then((merchantInfoJson) => {
        console.log(merchantInfoJson);
        this.setState({
          merchantInfo: merchantInfoJson,
          username: username,
          loginModalVisible: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  login(username, password) {
    this.setLoggingIn(true);

    fetch(`https://secure.cpteller.com/api/24/webapi.cfc?method=login&password=${password}&username=${username}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('this is the response!!!!!!!!!!!!', responseJson);
        if (responseJson.merchantkey !== '' && responseJson.apikey !== '') {
          SInfo.setItem('username', username, {});
          SInfo.setItem('password', password, {});
          SInfo.setItem('apikey', responseJson.apikey, {});
          SInfo.setItem('merchantkey', responseJson.merchantkey, {});
  
          fetch(`https://secure.cpteller.com/api/24/webapi.cfc?method=merchant_read&apikey=${responseJson.apikey}&merchantkey=${responseJson.merchantkey}`)
            .then((merchantInfo) => merchantInfo.json())
            .then((merchantInfoJson) => {
              console.log(merchantInfoJson);
              this.setState({
                merchantInfo: merchantInfoJson,
                username: username,
                loginModalVisible: false,
                loggingIn: false,
                password: '',
                user: ''
              });
            })
            .catch((error) => {
              console.log('THIS IS THE ERRORR MESSAGE!!', error);
            });
        } else {
          Alert.alert(
            'Incorrect Username or Password',
            'Please try again',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            { cancelable: false }
          );

          this.setState({
            loggingIn: false
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    SInfo.deleteItem('merchantkey', {});
    SInfo.deleteItem('apikey', {});
    SInfo.deleteItem('username', {});
    SInfo.deleteItem('password', {});

    this.setState({
      merchantInfo: {},
      username: '',
      loginModalVisible: true,
      apikey: '',
      merchantkey: '',
      password: ''
    });
  }

  setLoggingIn(bool) {
    this.setState({
      loggingIn: bool
    });
  }

  setUsername(text) {
    this.setState({
      user: text
    })
  }

  setPassword(text) {
    this.setState({
      password: text
    })
  }

  scrollToInput (reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  getCreditCardType(text) {

      var formattedNumber = creditcardutils.formatCardNumber(text);
      var cardValidation = creditcardutils.validateCardNumber(text);
      var cardType = creditcardutils.parseCardType(text);

      if (cardType !== null) {
        this.setState({
          creditCardType: cardType,
          cardNumber: formattedNumber
        })
      } else {
        this.setState({
          creditCardType: 'credit-card',
          cardNumber: formattedNumber
        })
      }

      if (cardValidation) {
        this.setState({
          cardValidated: true,
          maxLength: formattedNumber.length,
          cardInputTextColor: 'white',
          next: true
        });
      } else {
        this.setState({
          cardValidated: false,
          maxLength: 25,
          cardInputTextColor: '#EFDFDF'
        })
      }

      console.log(cardValidation, cardType, formattedNumber);
  }

  onDeviceUnplugged(deviceDetectedString) {
    this.setState({
      deviceDetectedString,
      deviceDetected: true,
      readerButtonColor: '#165831'
    });

    if (deviceDetectedString === "No Swipe Reader") {
      Alert.alert(
        'The card swipe reader was unplugged. Please re-insert the reader if you wish to pay by swiping.',
        null,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: false }
      );

      this.setState({
        deviceDetected: false
      });
    }
  }

  onTimeout() {
    this.setState({
      readerButtonColor: '#165831',
      deviceDetectedString: 'Swipe Card',
      timedOut: true
    })
  }
  
  setPaymentAmount(value) {
    this.setState({
      paymentAmount: value,
      paymentModalVisible: false
    })
  }

  componentWillUnmount() {
    subscription.remove();
  }

  focusNextField(id) {
      this.inputs[id].focus();
  }

  focusZipInput() {
    this.inputs['nine'].focus();
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  updateIndexACH (selectedIndexACH) {
    this.setState({selectedIndexACH});
  }

  onPressButton() {
    poo.testMethod(someString => {
      this.setState({
        deviceDetectedString: someString,
        readerButtonColor: '#36BC54',
        swipeCardModalVisible: true
      });
    });
  }

  onPressReviewPayment() {
    this.refs._scrollViewLarge.scrollToEnd();

    this.setState({
      next: 'none'
    })
  }

  restartReader() {
    poo.testMethod(someString => {
      this.setState({
        deviceDetectedString: someString,
        readerButtonColor: '#36BC54',
        timedOut: false
      })
    });
  }

  stopReader() {
    this.setState({
      timedOut: false,
      swipeCardModalVisible: false
    })
  }

  onPressWhatsThis() {
    this.setState({ modalVisible: true });
  }

  onPressEditCardButton() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
    this.setState({
      scrollViewRef: 'small'
    })
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  setLoginModalVisible(bool) {
    this.setState({
      loginModalVisible: bool
    })
  }

  setPaymentModalVisible(bool) {
    this.setState({
      paymentModalVisible: bool
    });
  }

  setSwipeCardModalVisible(bool) {
    this.setState({
      swipeCardModalVisible: bool
    })
  }

  setExpirationModalVisible(bool, boolTwo, month, year) {
    const expirationDate = '' + month + '/' + year;

    this.setState({
      expirationModalVisible: bool,
      expirationDate: expirationDate
    });

    if (boolTwo) {
      this.focusZipInput();
    }
  }

  setScrollViewRef(value) {
    this.setState({
      scrollViewRef: value
    })
  }

  focusOnButton(type) {
    if (type === 'ach') {
      this.setState({
        achButtonStyle: 'buttonFocused',
        creditCardButtonStyle: 'buttonUnfocused',
        textColorACH: 'white',
        textColorCC: 'grey',
        selectedIndex: 1
      })
    } else if (type === 'card') {
      this.setState({
        creditCardButtonStyle: 'buttonFocused',
        achButtonStyle: 'buttonUnfocused',
        textColorACH: 'grey',
        textColorCC: 'white',
        selectedIndex: 0
      })
    }
  }

  onChangeText(text, name) {
    console.log(text);

    if (name === 'cardNumber') {
      this.setState({
        [name]: text
      });

      this.getCreditCardType(text);
    } else {
      this.setState({
        [name]: text
      })
    }
    
  }

  renderReaderButton() {
    if (this.state.deviceDetected) {
      return (
        <TouchableOpacity onPress={() => this.onPressButton()}>
          <View style={[styles.swipeButtonStyle, {backgroundColor: this.state.readerButtonColor}]} >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {this.state.deviceDetectedString}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (!this.state.deviceDetected) {
      return (
          <View style={[styles.swipeButtonStyle, {backgroundColor: '#165831', opacity: 0.4}]} >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {this.state.deviceDetectedString}
            </Text>
          </View>
      );
    }
  }

  renderButtonGroupFields() {
    if (this.state.selectedIndex === 0) {
      return (
         <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
        >
          <Text>{this.state.merchantInfo.companyname}</Text>
           <InputLarge 
            placeholder={"*Name on card"} 
            value={this.state.cardHolderName}
            onChangeText={this.onChangeText.bind(this)}
            inputName={'cardHolderName'}
            keyboardType={"default"}
            returnKeyType={"next"}
            inputNumber={"six"}
            nextInput={"seven"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
            scrollY={100}
            hasLabelIcon={true}
            iconName={'user-o'}
          />
          <InputLarge 
            placeholder={"*Card Number"} 
            value={this.state.cardNumber}
            onChangeText={this.onChangeText.bind(this)}
            inputName={'cardNumber'} 
            keyboardType={"number-pad"}
            returnKeyType={"done"}
            inputNumber={"seven"}
            nextInput={"eight"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
            scrollY={160}
            hasLabelIcon={true}
            iconName={this.state.creditCardType}
            nextFieldExpiration={true}
            getCreditCardType={this.getCreditCardType.bind(this)}
            textColor={this.state.cardInputTextColor}
            cardValidated={this.state.cardValidated}
            maxLength={this.state.maxLength}
          />
          <View style={{ flexDirection: 'row', width: inputWidth, justifyContent: 'center' }}>
            <Image style={styles.icon} source={{ uri: Icons.visa }} />
            <Image style={styles.icon} source={{ uri: Icons['master-card'] }} />
            <Image style={styles.icon} source={{ uri: Icons.discover }} />
            <Image style={styles.icon} source={{ uri: Icons['american-express'] }} />
          </View>
          <View style={{ width: inputWidth, height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputSmall
              placeholder={"*MM/YY"} 
              value={this.state.expirationDate}
              onChangeText={this.onChangeText.bind(this)}
              inputName={'expirationDate'} 
              keyboardType={"number-pad"}
              returnKeyType={"done"}
              inputNumber={"eight"}
              nextInput={"nine"}
              focusNextField={this.focusNextField.bind(this)}
              inputs={this.inputs}
              refs={this.refs}
              hasLabelIcon={true}
              iconName={'calendar'}
            />
            <InputSmall
              placeholder={"*CVV Code"} 
              value={this.state.cvv}
              onChangeText={this.onChangeText.bind(this)}
              inputName={'cvv'} 
              keyboardType={"number-pad"}
              returnKeyType={"done"}
              inputNumber={"nine"}
              nextInput={"ten"}
              focusNextField={this.focusNextField.bind(this)}
              inputs={this.inputs}
              refs={this.refs}
              scrollY={310}
              hasLabelWord={true}
              labelWord={'CVV'}
              onPressWhatsThis={this.onPressWhatsThis.bind(this)}
            />
          </View>
          
          <InputLarge 
            placeholder={"*Billing Zip Code"} 
            value={this.state.billingZip}
            onChangeText={this.onChangeText.bind(this)}
            inputName={'zip'} 
            keyboardType={"number-pad"}
            returnKeyType={"done"}
            inputNumber={"ten"}
            nextInput={"none"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
            scrollY={260}
            hasLabelWord={true}
            labelWord={'Zip'}
          />
          
          {this.renderReaderButton()}

          <TouchableOpacity onPress={() => this.logout()}>
            <View style={[styles.swipeButtonStyle, {backgroundColor: this.state.readerButtonColor}]} >
              <Text style={{ color: 'white', fontSize: 20 }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={{ height: 10, width: inputWidth }}></View>
         </ScrollView>
      );
    } else if (this.state.selectedIndex === 1) {
      const buttonsACH = ['Checking', 'Savings'];
      const { selectedIndexACH } = this.state;

      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <DropDown 
            placeholder={'*Authorization Type'} 
            type={'auth'}
            inputNumber={"six"}
            nextInput={"seven"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
            ref={'auth'}
          />
          <InputLarge 
            placeholder={"*Routing Number"} 
            value={this.state.routingNumber} 
            keyboardType={"number-pad"}
            returnKeyType={"done"}
            inputNumber={"seven"}
            nextInput={"eight"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
          />
          <InputLarge 
            placeholder={"*Bank Acct Number"} 
            value={this.state.bankAcctNumber} 
            keyboardType={"number-pad"}
            returnKeyType={"done"}
            inputNumber={"eight"}
            nextInput={"nine"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
          />
          <InputLarge 
            placeholder={"*Name On Account"} 
            value={this.state.accountName} 
            keyboardType={"default"}
            returnKeyType={"next"}
            inputNumber={"nine"}
            nextInput={"one"}
            focusNextField={this.focusNextField.bind(this)}
            inputs={this.inputs}
            refs={this.refs}
          />
          <ButtonGroup
            onPress={this.updateIndexACH}
            selectedIndex={selectedIndexACH}
            buttons={buttonsACH}
            containerStyle={{height: 40, marginBottom: 10}}
            selectedBackgroundColor={'#165831'}
            selectedTextStyle={{ color: 'white' }}
            textStyle={{ color: '#165831' }}
            containerStyle={{ marginTop: 10, marginBottom: 0 }}
            containerBorderRadius={5} 
          />
        </View>
      );
    } else if (this.state.selectedIndex === 2) {
      return (
        <View style={{ height: 260, justifyContent: 'center', alignItems: 'center' }}>
          {this.renderReaderButton()}
          <View>
            <Text>
              {this.state.cardHolderName}
            </Text>

            <Text>
              {this.state.maskedPAN}
            </Text>

            <Text>
              {this.state.expirationDate}
            </Text>
          </View>
        </View>
      )
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      })
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      })
    ]).start();
  };

  render() {
    const buttons = ['Card Number', 'ACH/E-Check', 'Swipe'];
    const { selectedIndex } = this.state;

    return (
      <View style={styles.container}>
        <Header 
          title={"Payment Terminal"} 
          refs={this.refs} 
          next={this.state.next} 
          scrollViewRef={this.state.scrollViewRef}
          setScrollViewRef={this.setScrollViewRef.bind(this)} 
        />
        <KeyboardAwareScrollView 
            style={{ flex: 1 }}
            keyboardOpeningTime={0}  
            keyboardDismissMode={'on-drag'}
            scrollEnabled={false}
            horizontal={true} 
            pagingEnabled={true} 
            ref='_scrollViewLarge'
        >
          <View style={{ width: width}}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: width, height: this.state.paymentAmountHeight, backgroundColor:'#165831' }}>
                <TouchableOpacity 
                  onPress={() => this.setPaymentModalVisible(true)}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                >
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <View style={{ height: 60 }}>
                          <Text style={{ fontSize: 30, color: 'white', fontFamily: 'AppleSDGothicNeo-Light' }}>$</Text>
                      </View>
                      <Text style={{ fontSize: 60, color: 'white', fontFamily: 'AppleSDGothicNeo-Light' }}>{this.state.paymentAmount}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView 
                style={{ flex: 1 }} 
                horizontal={true} 
                pagingEnabled={true} 
                ref='_scrollView' 
                keyboardDismissMode={'on-drag'}
                scrollEnabled={false}
            >
              <View>
                <View style={{ width: width, height: 60, flexDirection: 'row', backgroundColor: '#165831' }}>
                    <TouchableOpacity onPress={() => this.focusOnButton('card')} style={styles[this.state.creditCardButtonStyle]}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: this.state.textColorCC }}>Credit Card</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.focusOnButton('ach')} style={styles[this.state.achButtonStyle]}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: this.state.textColorACH }}>ACH/E-Check</Text>
                      </View>
                    </TouchableOpacity>
                </View>
                {this.renderButtonGroupFields()}
              </View>

              <View style={{ width: width, alignItems: 'center' }}>
                <View 
                  style={{ 
                    height: 60, 
                    width: width, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#165831',
                    borderBottomWidth: 3, 
                    borderBottomColor: '#599A3C', 
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 1 
                  }}
                >
                    <Text style={{ fontWeight: '600', color: 'white' }}>Customer Information</Text>
                </View>
                <InputLarge 
                  placeholder={"Resident Number"} 
                  keyboardType={"default"}
                  returnKeyType={"next"} 
                  inputNumber={"two"} 
                  nextInput={"three"}
                  focusNextField={this.focusNextField.bind(this)}
                  inputs={this.inputs}
                  refs={this.refs}
                  scrollY={0}
                  hasLabelWord={true}
                  labelWord={'RN'}
                />
                <InputLarge 
                  placeholder={"Email"} 
                  keyboardType={"email-address"}
                  returnKeyType={"next"} 
                  inputNumber={"three"} 
                  nextInput={"four"}
                  focusNextField={this.focusNextField.bind(this)}
                  inputs={this.inputs}
                  refs={this.refs}
                  scrollY={0}
                  hasLabelIcon={true}
                  iconName={'envelope-o'}
                />
                <DropDown 
                  placeholder={'*State'} 
                  type={'state'}
                  inputNumber={"four"}
                  nextInput={"five"}
                  focusNextField={this.focusNextField.bind(this)}
                  inputs={this.inputs} 
                  refs={this.refs}
                  ref={'state'}
                />
                <View 
                  style={{
                    width: inputWidth,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 80,
                    padding: 10,
                    marginTop: 10
                  }}
                >
                    <TextInput
                      placeholder={"Comments"}
                      value={this.state.comments}
                      keyboardType={"default"}
                      returnKeyType={"next"}
                      inputNumber={"five"}
                      nextInput={"six"}
                      multiline={true}
                      focusNextField={this.focusNextField.bind(this)}
                      inputs={this.inputs}
                      refs={this.refs}
                      numberOfLines = {4}
                      onChangeText={(text) => this.setState({ comments: text })}
                      style={{ fontSize: 16 }}
                    />
                </View>
                <View style={{ height: 40, width: inputWidth, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => this.onPressEditCardButton()}>
                    <View style={{ height: 50, width: (inputWidth / 2) - 5, backgroundColor: '#599A3C', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white' }}>Edit Card Info</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.onPressReviewPayment()}>
                    <View style={{ height: 50, width: (inputWidth / 2) - 5, backgroundColor: '#165831', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white' }}>Review Payment</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ width: width, alignItems: 'center', flex: 1, padding: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 30 }}>Payment Total:</Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{this.state.paymentAmount}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Customer Info</Text>
                <Text>{this.state.cardHolderName}</Text>
                <Text>{this.state.cardNumber}</Text>
                <Text>{this.state.expirationDate}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>Credit Card Info</Text>
                <Text>{this.state.cardHolderName}</Text>
                <Text>{this.state.cardNumber}</Text>
                <Text>{this.state.expirationDate}</Text>
              </View>
              

              <TouchableOpacity onPress={() => this.refs._scrollViewLarge.scrollToPosition(0, 0, true)}>
                    <View style={{ height: 40, width: (inputWidth / 2) - 5, backgroundColor: '#599A3C', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white' }}>Back</Text>
                    </View>
              </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <WhatsThisModal closeModal={this.closeModal.bind(this)}/>
        </Modal>

        <PaymentAmountModal 
          paymentModalVisible={this.state.paymentModalVisible} 
          setPaymentModalVisible={this.setPaymentModalVisible.bind(this)}
          setPaymentAmount={this.setPaymentAmount.bind(this)}
        />

        <SwipeCardModal
          modalVisible={this.state.swipeCardModalVisible}
          setModalVisible={this.setSwipeCardModalVisible.bind(this)}
          timedOut={this.state.timedOut}
          restartReader={this.restartReader.bind(this)}
          stopReader={this.stopReader.bind(this)}
          cardSwipeDetected={this.state.cardSwipeDetected}
        />

        <LoginPage
          modalVisible={this.state.loginModalVisible}
          setModalVisible={this.setLoginModalVisible.bind(this)}
          login={this.login.bind(this)}
          loggingIn={this.state.loggingIn}
          username={this.state.user}
          password={this.state.password}
          setUsername={this.setUsername.bind(this)}
          setPassword={this.setPassword.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  swipeButtonStyle: { 
    height: 40, 
    borderRadius: 5, 
    paddingLeft: 45, 
    paddingRight: 45, 
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  buttonFocused: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomWidth: 3, 
    borderBottomColor: '#599A3C', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  buttonUnfocused: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 50,
    resizeMode: "contain",
  }
};
