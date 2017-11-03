import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { Icon } from 'react-native-elements';

var Spinner = require('react-native-spinkit');

class SwipeCardModal extends Component {
    renderContent() {
        if (this.props.timedOut) {
            return (
                <View style={{ width: 250, height: 125, backgroundColor: 'white', borderRadius: 10 }}>
                    <View style={{ flex: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>The swipe read has timed out! Do you still wish to swipe a card?</Text>
                    </View>
                    <View style={{ height: 50, width: 250, flexDirection: 'row', borderTopColor: '#ddd', borderTopWidth: 1 }}>
                        <TouchableOpacity onPress={() => this.props.stopReader()}>
                            <View style={{ width: 124.5, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>No</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: 1, height: 50, backgroundColor: '#ddd'}}></View>

                        <TouchableOpacity onPress={() => this.props.restartReader()}>
                            <View style={{ width: 124.5, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Yes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            if (this.props.cardSwipeDetected) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator animating={true} size={'large'} color={'white'} />
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            type="font-awesome"
                            name="credit-card"
                            color="white"
                            size={100}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 30 }}>Swipe Card</Text>
                        </View>
                        <Spinner isVisible={true} size={60} type={'ThreeBounce'} color={'white'}/>
                    </View>
                )
            }
        }
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    {this.renderContent()}
                </View>
          </Modal>
        );
    }
}

var styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d35400',
    },
  
    btn: {
      marginTop: 20
    },
  
    text: {
      color: "white"
    }
};

export default SwipeCardModal;