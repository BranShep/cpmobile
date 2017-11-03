import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    findNodeHandle,
    Keyboard,
    Image
} from 'react-native';

import { Icon } from 'react-native-elements';
import Icons from "./Icons";

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class InputLarge extends Component {
    state = {
        text: ''
    }

    renderCardIcon() {
        if (this.props.iconName === 'visa') {
            return (
                <Image style={styles.icon}
                    source={{ uri: Icons.visa }} />
            )
        } else if (this.props.iconName === 'discover') {
            return (
                <Image style={styles.icon}
                    source={{ uri: Icons.discover }} />
            )
        } else if (this.props.iconName === 'mastercard') {
            return (
                <Image style={styles.icon}
                    source={{ uri: Icons['master-card'] }} />
            )
        } else if (this.props.iconName === 'amex') {
            return (
                <Image style={styles.icon}
                    source={{ uri: Icons['american-express'] }} />
            )
        } else {
            return (
                <Icon 
                    name={'credit-card'}
                    type='font-awesome'
                    size={16}
                />
            )
        }
    }

    renderCheck() {
        if (this.props.cardValidated) {
            return (
                <Icon
                    name="check"
                    type="font-awesome"
                    size={16}
                    color='green'
                    containerStyle={{ paddingRight: 10 }}
                />
            );
        } else {
            return null;
        }
    }

    render() {
        if (this.props.hasLabelIcon) {
            if (this.props.inputName === 'cardNumber') {
                return (
                    <View style={styles.inputStyleWithLabel}>
                        <View style={styles.inputLabelStyle}>
                            {this.renderCardIcon()}
                        </View>
                        <TextInput 
                            style={{ flex: 1, paddingLeft: 10, paddingTop: 3, backgroundColor: this.props.textColor, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
                            onChangeText={(text) => this.props.onChangeText(text, this.props.inputName)}
                            value={this.props.value}    
                            placeholder={this.props.placeholder}  
                            keyboardType={this.props.keyboardType}
                            returnKeyType={'done'}
                            maxLength={this.props.maxLength}
                            blurOnSubmit={ false }
                            ref={ input => {
                                this.props.inputs[this.props.inputNumber] = input;
                            }}
                            onSubmitEditing={() => {
                                this.props.focusNextField(this.props.nextInput);
                            }}
                        />
                        {this.renderCheck()}
                    </View>
                );
            } else {
                return (
                    <View style={styles.inputStyleWithLabel}>
                        <View style={styles.inputLabelStyle}>
                            <Icon 
                                name={this.props.iconName}
                                type='font-awesome'
                                size={16}
                            />
                        </View>
                        <TextInput 
                            style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                            onChangeText={(text) => this.props.onChangeText(text, this.props.inputName)}
                            value={this.props.value}    
                            placeholder={this.props.placeholder}  
                            keyboardType={this.props.keyboardType}
                            returnKeyType={'done'}
                            blurOnSubmit={ false }
                            ref={ input => {
                                this.props.inputs[this.props.inputNumber] = input;
                            }}
                            onSubmitEditing={() => {
                                this.props.focusNextField(this.props.nextInput);
                            }}
                        />
                    </View>
                );
            }
        } else if (this.props.hasLabelWord) {
            return (
                <View style={styles.inputStyleWithLabel}>
                    <View style={styles.inputLabelStyle}>
                        <Text>{this.props.labelWord}</Text>
                    </View>
                    <TextInput 
                        style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                        onChangeText={(text) => this.setState({text})}
                        value={this.props.value}    
                        placeholder={this.props.placeholder}  
                        keyboardType={this.props.keyboardType}
                        returnKeyType={this.props.returnKeyType}
                        blurOnSubmit={ false }
                        ref={ input => {
                            this.props.inputs[this.props.inputNumber] = input;
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                </View>
            );
        } else {
            return (
                <TextInput 
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({text})}
                    value={this.props.value}    
                    placeholder={this.props.placeholder}  
                    keyboardType={this.props.keyboardType}
                    returnKeyType={this.props.returnKeyType}
                    blurOnSubmit={ false }
                    ref={ input => {
                        this.props.inputs[this.props.inputNumber] = input;
                    }}
                    onSubmitEditing={() => {
                        this.props.focusNextField(this.props.nextInput);
                    }}
                />
            );
        }
    }
}

const styles = {
    inputStyle: {
        height: 50, 
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginTop: 10, 
        width: inputWidth,
        paddingHorizontal: 5
    },
    inputStyleWithLabel: {
        height: 50, 
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginTop: 10, 
        width: inputWidth,
        flexDirection: 'row'
    },
    inputLabelStyle: {
        height: 48,
        width: 50,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0
    },
    icon: {
        width: 25,
        height: 20,
        resizeMode: "contain",
    }
}

export default InputLarge;