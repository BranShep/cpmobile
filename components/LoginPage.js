import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native';

const {height, width} = Dimensions.get('window');

const inputWidth = width - 20;

class LoginPage extends Component {
    renderLoginButton() {
        if (this.props.loggingIn) {
            return (
                <ActivityIndicator
                    animating={true}
                    color={'white'}
                    size={'small'}
                />
            )
        } else {
            return (
                <Text style={{ color: 'white' }}>Login</Text>
            )
        }
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../images/CPTeller_CPLogo.png')}
                        style={{ width: width }}
                        resizeMode="contain"
                    />
                    <View style={{ height: 40, width: inputWidth - 50, borderRadius: 5, borderColor: '#ddd', borderWidth: 1, marginTop: 60 }}>
                        <TextInput
                            placeholder={'Username'}
                            value={this.props.username}
                            style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                            onChangeText={(text) => this.props.setUsername(text)}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View style={{ height: 40, width: inputWidth - 50, borderRadius: 5, borderColor: '#ddd', borderWidth: 1, marginTop: 10, marginBottom: 60 }}>
                        <TextInput
                            placeholder={'Password'}
                            value={this.props.password}
                            style={{ flex: 1, paddingLeft: 10, paddingTop: 3 }}
                            onChangeText={(text) => this.props.setPassword(text)}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.props.login(this.props.username, this.props.password)}>
                        <View style={{ width: inputWidth - 50, height: 40, backgroundColor: '#165831', justifyContent: 'center', alignItems: 'center' }}>
                            {this.renderLoginButton()}
                        </View>
                    </TouchableOpacity>
                </View>
             </Modal>

        );
    }
}

export default LoginPage;