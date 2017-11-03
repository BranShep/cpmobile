import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Dimensions
} from 'react-native';
import KeyboardNumber from './KeyboardNumber';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class PaymentAmountModal extends Component {
    state = {
        paymentAmount: '0',
        color: '#ddd',
        decimal: false,
        cents: '.00',
        centsCounter: 0,
        centOne: '0',
        centTwo: '0',
        centOneColor: '#ddd',
        centTwoColor: '#ddd',
        total: '0'
    }

    setDecimal(bool) {
        this.setState({
            decimal: bool
        });
    }

    renderDecimals() {
        if (this.state.decimal) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 60 }}>
                        <Text style={{ fontSize: 30, color: this.state.centOneColor, fontFamily: 'AppleSDGothicNeo-Light' }}>{this.state.centOne}</Text>
                    </View>

                    <View style={{ height: 60 }}>
                        <Text style={{ fontSize: 30, color: this.state.centTwoColor, fontFamily: 'AppleSDGothicNeo-Light' }}>{this.state.centTwo}</Text>
                    </View>
                </View>

            );
        } else {
            return null;
        }
    }

    setPaymentAmount(number) {
        if (this.state.decimal) {
            if (this.state.centOne === '0' && this.state.centsCounter === 0) {
                this.setState({
                    centOne: '' + number,
                    centsCounter: 1,
                    centOneColor: 'black',
                    color: 'black',
                    total: this.state.paymentAmount + '.' + number + '0'
                });
            } else if (this.state.centsCounter === 1) {
                this.setState({
                    centTwo: '' + number,
                    centsCounter: 2,
                    centTwoColor: 'black',
                    total: this.state.paymentAmount + '.' + this.state.centOne + number
                });
            }
        } else {
            const paymentAmount = this.state.paymentAmount;
            
            if (paymentAmount === '0') {
                this.setState({
                    paymentAmount: number,
                    total: number,
                    color: 'black'
                });
            } else if (paymentAmount.length === 3) {
               const firstNumber = paymentAmount.slice(0, -2);
               const lastNumbers = paymentAmount.slice(1, 3);
               
               this.setState({
                    paymentAmount: '' + firstNumber + ',' + lastNumbers + number,
                    total: '' + firstNumber + ',' + lastNumbers + number
                });
            } else if (paymentAmount.length > 4 && paymentAmount.length < 8) {
                switch (paymentAmount.length) {
                    case 5:
                        const firstNumber = paymentAmount.slice(0, 1);
                        const lastNumbers = paymentAmount.slice(3, 5);
                        const secondNumber = paymentAmount.slice(2, 3);
    
                        this.setState({
                            paymentAmount: '' + firstNumber + secondNumber + ',' + lastNumbers + number,
                            total: '' + firstNumber + secondNumber + ',' + lastNumbers + number
                        });
                        break;
                    case 6:
                        const firstNumbers = paymentAmount.slice(0, 2);
                        const lastNumberss = paymentAmount.slice(4, 6);
                        const thirdNumber = paymentAmount.slice(3, 4);
    
                        this.setState({
                            paymentAmount: '' + firstNumbers + thirdNumber + ',' + lastNumberss + number,
                            total: '' + firstNumbers + thirdNumber + ',' + lastNumberss + number
                        });
                        break;
                    case 7: 
                        const first = paymentAmount.slice(0, 1);
                        const nextThree = '' + paymentAmount.slice(1, 3) + paymentAmount.slice(4, 5);
                        const lastThree = '' + paymentAmount.slice(5, 8) + number;
                        
                        this.setState({
                            paymentAmount: '' + first + ',' + nextThree + ',' + lastThree,
                            total: '' + first + ',' + nextThree + ',' + lastThree
                        });
                }
            } else {
                this.setState({
                    paymentAmount: '' + paymentAmount + number,
                    total: '' + paymentAmount + number
                })
            }
        } 
    }

    deleteNumber() {
        const numLength = this.state.paymentAmount.length;
        const paymentAmount = this.state.paymentAmount;

        if (this.state.decimal) {
            if (this.state.centsCounter === 2) {
                this.setState({
                    centTwo: '0',
                    centsCounter: 1,
                    centTwoColor: '#ddd',
                    total: this.state.paymentAmount + '.' + this.state.centOne + '0' 
                })
            } else if (this.state.centsCounter === 1) {
                this.setState({
                    centOne: '0',
                    centsCounter: 0,
                    centOneColor: '#ddd',
                    total: this.state.paymentAmount + '.' + '0' + '0'
                })
            } else {
                if (this.state.paymentAmount === '0') {
                    this.setState({
                        color: '#ddd',
                        decimal: false
                    })
                } else {
                    this.setState({
                        decimal: false
                    })
                }
            }
        } else {
            if (numLength === 1) {
                if (paymentAmount !== '0') {
                    this.setState({
                        paymentAmount: '0',
                        total: '',
                        color: '#ddd'
                    })
                } else {
                    console.log('Nothing to delete');
                }  
            } else if (numLength === 9) {
                const firstThree = '' + paymentAmount.slice(0, 1) + paymentAmount.slice(2, 4);
                const lastThree = '' + paymentAmount.slice(4, 5) + paymentAmount.slice(6, 8);
    
                this.setState({
                    paymentAmount: '' + firstThree + ',' + lastThree,
                    total: '' + firstThree + ',' + lastThree + '.' + '0' + '0'
                });
            } else if (numLength === 7) {
                const firstTwo = '' + paymentAmount.slice(0, 2);
                const lastThree = '' + paymentAmount.slice(2, 3) + paymentAmount.slice(4, 6);
    
                this.setState({
                    paymentAmount: '' + firstTwo + ',' + lastThree,
                    total: '' + firstTwo + ',' + lastThree + '.' + '0' + '0'
                });
            } else if (numLength === 6) {
                const first = '' + paymentAmount.slice(0, 1);
                const lastThree = '' + paymentAmount.slice(1, 2) + paymentAmount.slice(3, 5);
    
                this.setState({
                    paymentAmount: '' + first + ',' + lastThree,
                    total: '' + first + ',' + lastThree + '.' + '0' + '0'
                });
            } else if (numLength === 5) {
                const first = paymentAmount.slice(0, 1);
                const lastTwo = paymentAmount.slice(2, 4);
    
                this.setState({
                    paymentAmount: '' + first + lastTwo,
                    total: '' + first + lastTwo + '.' + '0' + '0'
                });
            } else {
                const newNumber = paymentAmount.slice(0, -1);
    
                this.setState({
                    paymentAmount: newNumber,
                    total: newNumber + '.' + '0' + '0'
                })
            }
        }
    }

    renderDoneButton() {
        if (this.state.paymentAmount === '0') {
            return (
                <Text style={{ fontSize: 18, color: '#ddd' }}>Done</Text>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.setPaymentAmount(this.state.total)}>
                    <Text style={{ fontSize: 18, color: '#165831' }}>Done</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        const paymentLength = this.state.paymentAmount.length;

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.paymentModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{marginTop: 125, backgroundColor: 'white', flex: 1}}>
                            <View style={{ height: 60, width: width, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd' }} >
                                <TouchableOpacity onPress={() => this.props.setPaymentModalVisible(false)}>
                                    <Text style={{ fontSize: 18, color: '#165831' }}>Cancel</Text>
                                </TouchableOpacity>         
                                
                                <Text style={{ fontSize: 21 }}>Payment Amount</Text>

                                {this.renderDoneButton()}
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ height: 60 }}>
                                        <Text style={{ fontSize: 30, color: this.state.color, fontFamily: 'AppleSDGothicNeo-Light' }}>$</Text>
                                    </View>
                                    <Text style={{ fontSize: 60, color: this.state.color, fontFamily: 'AppleSDGothicNeo-Light' }}>{this.state.paymentAmount}</Text>
                                    {this.renderDecimals()}
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                    <KeyboardNumber number={'1'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'2'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'3'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'4'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'5'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'6'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'7'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'8'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'9'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'.'} setDecimal={this.setDecimal.bind(this)} />
                                    <KeyboardNumber number={'0'} setPaymentAmount={this.setPaymentAmount.bind(this)} />
                                    <KeyboardNumber number={'x'} deleteNumber={this.deleteNumber.bind(this)} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
          </View>
        );
    }
}

export default PaymentAmountModal;