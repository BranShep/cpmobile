import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Keyboard
} from 'react-native';

import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class PaymentInput extends Component {
    onFocusInput() {  
        this.props.setPaymentModalVisible(true);
    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.onFocusInput()} activeOpacity={1} underlayColor={'white'} selectionColor={'white'}>
                <View pointerEvents="none" style={styles.inputStyle}>
                    <View style={styles.inputLabelStyle}>
                        <Icon 
                            name='usd'
                            type='font-awesome'
                            size={16}
                        />
                    </View>
                    <TextInput 
                        style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                        onChangeText={(text) => this.setState({text})}
                        value={this.props.value}    
                        placeholder={'0.00'}  
                        keyboardType={'numeric'}
                        returnKeyType={'next'}
                        blurOnSubmit={ false }
                        ref={ input => {
                            this.props.inputs[this.props.inputNumber] = input;
                        }}
                        onSubmitEditing={() => {
                            this.props.focusNextField(this.props.nextInput);
                        }}
                        onFocus={() => this.onFocusInput()}
                    />
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    inputStyle: {
        height: 40, 
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginTop: 10, 
        width: inputWidth,
        paddingRight: 5,
        flexDirection: 'row'
    },
    inputLabelStyle: {
        height: 38,
        width: 40,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default PaymentInput;