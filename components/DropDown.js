import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ReactNative
} from 'react-native';
import Picker from 'react-native-picker';
import { Icon } from 'react-native-elements';

data = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
authType = ['Business', 'Signature', 'Phone'];
pickerData = [
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040]
];

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;



class DropDown extends Component {
    state = {
        language: "",
        selectedValue: '',
        isDateTimePickerVisible: false,
        valueSmall0: 'Poop'
    }

    componentWillMount() {
        if (this.props.type === 'state') {
            this.setState({ selectedValue: "*State" });
        } else if (this.props.type === 'date') {
            this.setState({ selectedValue: '*Expiration Date'});
        } else if (this.props.type === 'auth') {
            this.setState({ selectedValue: '*AuthorizationType'})
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    onPressPicker() {
        if (this.props.type === 'state') {
            Picker.init({
                pickerData: data,
                selectedValue: ['Alabama'],
                pickerConfirmBtnText: "Next",
                pickerCancelBtnText: 'Cancel',
                pickerTitleText: "State",
                pickerFontSize: 26,
                pickerCancelBtnColor: [22, 88, 49, 1],
                pickerConfirmBtnColor: [22, 88, 49, 1],
                onPickerConfirm: data => {

                },
                onPickerCancel: data => {
                    
                },
                onPickerSelect: data => {
                    this.setState({
                        selectedValue: data
                    });
                }
            });
            Picker.show();
        } else if (this.props.type === 'date') {
            Picker.init({
                pickerData: pickerData,
                selectedValue: ['January', 2017],
                pickerConfirmBtnText: "Next",
                pickerCancelBtnText: 'Cancel',
                pickerTitleText: "Expiration Date",
                pickerFontSize: 26,
                pickerCancelBtnColor: [22, 88, 49, 1],
                pickerConfirmBtnColor: [22, 88, 49, 1],
                onPickerConfirm: data => {

                },
                onPickerCancel: data => {

                },
                onPickerSelect: data => {
                    this.setState({
                        selectedValue: data
                    });
                },
                wheelFlex: [2, 1, 1]
            });
            Picker.show();
        } else if (this.props.type === 'auth') {
            Picker.init({
                pickerData: authType,
                selectedValue: ['Business'],
                pickerConfirmBtnText: "Next",
                pickerCancelBtnText: 'Cancel',
                pickerTitleText: "State",
                pickerFontSize: 26,
                pickerCancelBtnColor: [22, 88, 49, 1],
                pickerConfirmBtnColor: [22, 88, 49, 1],
                onPickerConfirm: data => {

                },
                onPickerCancel: data => {

                },
                onPickerSelect: data => {
                    this.setState({
                        selectedValue: data
                    });
                }
            });
            Picker.show();
        }
        
    }

    onSubmitEditingSmall0(value) {
        this.setState({
          valueSmall0: value
        });
      }
    
      getPickerOptions() {
        return [
            { value: 0, label: 'Apple'      },
            { value: 1, label: 'Banana'     },
            { value: 2, label: 'Orange'     },
            { value: 3, label: 'Strawberry' }
        ];
      }

    render() {
        return (
            <TouchableHighlight onPress={() => this.onPressPicker()} activeOpacity={1} underlayColor={'white'} selectionColor={'white'}>
                <View pointerEvents="none" style={styles.inputStyle}>
                    <TextInput 
                        style={{ flex: 1 }}
                        value={this.state.selectedValue.toString()}    
                        defaultValue={this.props.placeholder}  
                        keyboardType={this.props.keyboardType}
                        returnKeyType="next"
                        blurOnSubmit={ false }
                        ref={ input => {
                            this.props.inputs[this.props.inputNumber] = input;
                        }}
                        caretHidden={false}
                        onFocus={() => this.onPressPicker()}
                    />
                    <Icon 
                        name='caret-down'
                        type='font-awesome'
                        size={16}
                        containerStyle={{ paddingRight: 5 }}
                    />
                </View>
            </TouchableHighlight>
        );
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
        paddingHorizontal: 5,
        justifyContent: 'center',
        flexDirection: 'row'
    }
}

export default DropDown;