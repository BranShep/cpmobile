import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class WhatsThisModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#165831', height: 60, width: width, flexDirection: 'row', paddingBottom: 10, paddingHorizontal: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ padding: 15, alignItems: 'center' }} style={{ flex: 1, width: width }}>
                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>Visa®, Mastercard®, and Discover® cardholders: </Text>Turn your card over and look at the signature box. You should see either the enitre 16-digit credit card number or just the last four digits followed by a special 3-digit code. This 3-digit code is your CVV number / Card Security Code.
                    </Text>

                    <Image
                        source={require('../images/cvv_visa.gif')}
                        style={{ width: inputWidth }}
                        resizeMode="contain"
                    />

                    <Text>
                        <Text style={{ fontWeight: 'bold' }}>American Express® cardholders: </Text>Look for the 4-digit code printed on the front of your card just above and to the right of your main credit card number. This 4-digit code is your Card Identification Number (CID). The CID is the four-digit code printed just above the Account Number.
                    </Text>

                    <Image
                        source={require('../images/cvv_amex.gif')}
                        style={{ width: inputWidth, marginTop: 15 }}
                        resizeMode="contain"
                    />
                </ScrollView>
            </View>
        );
    }
}

export default WhatsThisModal;

const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
    }
}