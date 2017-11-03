import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Dimensions,
    Modal,
    Picker,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;


class ExpirationDate extends Component {
    state = {
        modalVisible: false,
        expirationDate: false,
        expirationDateText: '',
        month: '',
        year: ''
    }

    onPressDone() {
        const expirationDate = '' + this.state.month + '/' + this.state.year;

        if (this.state.month === '' && this.state.year === '') {
            this.setState({
                expirationDateText: '',
                expirationDate: false
            });
        } else {
            this.setState({
                expirationDateText: expirationDate,
                expirationDate: true
            });
        }
        

        this.props.setExpirationModalVisible(false, true, this.state.month, this.state.year);
    }

    renderDoneButton() {
        if (this.state.paymentAmount === '0') {
            return (
                <Text style={{ fontSize: 18, color: '#ddd' }}>Done</Text>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => this.onPressDone()}>
                    <Text style={{ fontSize: 18, color: '#165831' }}>Done</Text>
                </TouchableOpacity>
            );
        }
    }

    renderText() {
        if (this.state.expirationDate) {
            return (
                <Text style={{ color: 'black', fontSize: 17, paddingLeft: 10 }}>{this.state.expirationDateText}</Text>
            );
        } else {
            return (
                <Text style={{ color: '#C7C7CD', fontSize: 17, paddingLeft: 10 }}>*MM/YY</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.inputStyleWithLabel}>
                <View style={styles.inputLabelStyle}>
                    <Icon 
                        name={'calendar'}
                        type='font-awesome'
                        size={16}
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.setExpirationModalVisible(true)} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        {this.renderText()}
                    </View>
                </TouchableOpacity>
                <Icon 
                    name='caret-down'
                    type='font-awesome'
                    size={10}
                    containerStyle={{ paddingRight: 5 }}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.expirationModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{ marginTop: 260, backgroundColor: 'white', flex: 1}}>
                        <View style={{ height: 60, width: width, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd' }} >
                            <TouchableOpacity onPress={() => this.props.setExpirationModalVisible(false)}>
                                <Text style={{ fontSize: 18, color: '#165831' }}>Cancel</Text>
                            </TouchableOpacity>         
                            
                            <Text style={{ fontSize: 21 }}>Expiration Date</Text>

                            {this.renderDoneButton()}
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Picker
                                selectedValue={this.state.month}
                                onValueChange={(month) => this.setState({month: month})}
                                style={{ height: 200, width: width / 2 }}
                            >
                                <Picker.Item label="January" value="01" />
                                <Picker.Item label="February" value="02" />
                                <Picker.Item label="March" value="03" />
                                <Picker.Item label="April" value="04" />
                                <Picker.Item label="May" value="05" />
                                <Picker.Item label="June" value="06" />
                                <Picker.Item label="July" value="07" />
                                <Picker.Item label="August" value="08" />
                                <Picker.Item label="September" value="09" />
                                <Picker.Item label="October" value="10" />
                                <Picker.Item label="November" value="11" />
                                <Picker.Item label="December" value="12" />
                            </Picker>

                            <Picker
                                selectedValue={this.state.year}
                                onValueChange={(year) => this.setState({year: year})}
                                style={{ height: 200, width: width / 2 }}
                            >
                                <Picker.Item label="2017" value="2017" />
                                <Picker.Item label="2018" value="2018" />
                                <Picker.Item label="2020" value="2020" />
                                <Picker.Item label="2021" value="2021" />
                                <Picker.Item label="2022" value="2022" />
                                <Picker.Item label="2023" value="2023" />
                                <Picker.Item label="2024" value="2024" />
                                <Picker.Item label="2025" value="2025" />
                                <Picker.Item label="2026" value="2026" />
                                <Picker.Item label="2027" value="2027" />
                                <Picker.Item label="2028" value="2028" />
                                <Picker.Item label="2029" value="2029" />
                                <Picker.Item label="2030" value="2030" />
                                <Picker.Item label="2031" value="2031" />
                                <Picker.Item label="2032" value="2032" />
                                <Picker.Item label="2033" value="2033" />
                                <Picker.Item label="2034" value="2034" />
                                <Picker.Item label="2035" value="2035" />
                                <Picker.Item label="2036" value="2036" />
                                <Picker.Item label="2037" value="2037" />
                            </Picker>
                        </View>
                    </View>
                </Modal>
            </View>
        );
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
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

export default ExpirationDate;