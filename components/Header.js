import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { Icon } from 'react-native-elements';

const {height, width} = Dimensions.get('window');

class Header extends Component {
    onPressNext() {
        if (this.props.scrollViewRef === 'small') {
            this.props.refs._scrollView.scrollToEnd();

            this.props.setScrollViewRef('large');
        } else {
            this.props.refs._scrollViewLarge.scrollToEnd();
        }
        
        
        Keyboard.dismiss();
    }

    renderNext() {
        if (this.props.next === true) {
            return (
                <TouchableOpacity onPress={() => this.onPressNext()}>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Next
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (this.props.next === false) {
            return (
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'white', fontSize: 18, opacity: 0.4 }}>
                        Next
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#165831', height: 60, width: width, flexDirection: 'row', paddingBottom: 10, paddingHorizontal: 15 }}>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                    <Icon
                        type="font-awesome"   
                        name="bars"
                        color="white"
                    />
                </View>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }} >
                        {this.props.title}
                    </Text>
                </View>
                {this.renderNext()}
            </View>
        );
    }
}

export default Header;