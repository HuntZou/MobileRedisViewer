import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button,
    Icon
} from 'react-native-elements'

export default class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipValidationMessageDisplay: false,
            portValidationMessageDisplay: false
        }
    }

    checkIp(text) {
        this.setState({
            ipValidationMessageDisplay: !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(text)
        });
    }

    checkPort(text) {
        this.setState({
            portValidationMessageDisplay: !/^\d+$/g.test(text)
        });
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={{paddingTop:30}}>
                <View id="ipInputBox">
                    <FormLabel labelStyle={{ fontSize:18 }}>IP</FormLabel>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:4}}>
                            <FormInput
                                ref={input=>this.ipInputBox = input}
                                onChangeText={(text)=>this.checkIp(text)}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button style={{ height:50,width:50 }} backgroundColor="black" title="x" onPress={()=>this.ipInputBox.clearText()}/>
                        </View>
                    </View>
                    {this.state.ipValidationMessageDisplay ?
                        <FormValidationMessage>{'This field is required'}</FormValidationMessage> : null}
                </View>
                <View id="portInputBox">
                    <FormLabel labelStyle={{ fontSize:18 }}>PORT</FormLabel>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:4}}>
                            <FormInput
                                onChangeText={(text)=>this.checkPort(text)}
                                ref={input=>this.portInputBox = input}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button backgroundColor="black" title="x" onPress={()=>this.portInputBox.clearText()}/>
                        </View>
                    </View>
                    {this.state.portValidationMessageDisplay ?
                        <FormValidationMessage>{'This field is required'}</FormValidationMessage> : null}
                </View>
                <View id="passwdInputBox">
                    <FormLabel labelStyle={{ fontSize:18 }}>PASSWD</FormLabel>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:4}}>
                            <FormInput
                                ref={input=>this.pwdInputBox = input}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button backgroundColor="black" title="x" onPress={()=>this.pwdInputBox.clearText()}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:30}}>
                    <Button backgroundColor='red' title="SUBMIT" onPress={()=>navigate('ShowDBs')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clearInputBtn: {
        backgroundColor: 'red'
    }
});
