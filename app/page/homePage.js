import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

export default class HomePage extends Component {

    render() {

        const { navigate } = this.props.navigation;

        setTimeout(function () {
            navigate('FormPage');
        }, 1000);

        return (
            <View style={{ flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#F5FCFF' }}>
                <Text>Thank for you use RedisViewer</Text>
            </View>
        );
    }
}
