import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

const numberWidth = (width / 3) - 20;

class KeyboardNumber extends Component {
    render() {
        if (this.props.number === 'x') {
            return (
                <TouchableOpacity onPress={() => this.props.deleteNumber()}>
                    <View style={{ height: 60, width: numberWidth, borderBottomWidth: 1, borderBottomColor: '#599A3C', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon
                            name='backspace'
                            size={30}
                            color='#599A3C'
                        />
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.number === '.') {
            return (
                <TouchableOpacity onPress={() => this.props.setDecimal(true)}>
                    <View style={{ height: 60, width: numberWidth, borderBottomWidth: 1, borderBottomColor: '#599A3C', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 30 }}>{this.props.number}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.setPaymentAmount(this.props.number)}>
                    <View style={{ height: 60, width: numberWidth, borderBottomWidth: 1, borderBottomColor: '#599A3C', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 30 }}>{this.props.number}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

export default KeyboardNumber;