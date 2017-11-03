import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class InputSmall extends Component {
    state = {
        text: ''
    }

    render() {
        if (this.props.hasLabelWord) {
            return (
                <View style={styles.inputStyleWithLabel}>
                    <View style={styles.inputLabelStyle}>
                        <Text>{this.props.labelWord}</Text>
                    </View>
                    <TextInput 
                        style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                        onChangeText={(text) => this.props.onChangeText(text, this.props.inputName)}
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
                    <TouchableOpacity onPress={() => this.props.onPressWhatsThis()}>
                        <View style={{ width: 25, height: 48, justifyContent: 'center', alignItems: 'center' }} >
                            <Icon
                                name="question-circle-o"
                                type="font-awesome"
                                size={16}
                                color='#599A3C'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.props.hasLabelIcon) {
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
                        returnKeyType={this.props.returnKeyType}
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
        } else {
            return (
                <TextInput 
                    style={styles.inputStyle}
                    onChangeText={(text) => this.props.onChangeText(text, this.props.inputName)}
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
        flex: 1, 
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        paddingHorizontal: 5
    },
    inputStyleWithLabel: {
        height: 50,
        width: (inputWidth / 2) - 5,
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        paddingRight: 5,
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
    }
}

export default InputSmall;