import React, { Component } from 'react';
import { servers } from '../compoent/config.js'
import {
    View,
    StyleSheet,
    Alert,
    Modal,
    Text,
    Image,
    AsyncStorage,
} from 'react-native';

import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button,
    Icon,
    CheckBox
} from 'react-native-elements'

export default class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipValidationMessageDisplay: false,
            portValidationMessageDisplay: false,
            showLoadingModal: false,
            rememberMe: false,
            defaultIp: '',
            defaultPort: '',
            defaultPwd: ''
        }
    }

    checkIp(text) {
        this.ip = text;
        this.setState({
            ipValidationMessageDisplay: !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(text)
        });
    }

    checkPort(text) {
        this.port = text;
        this.setState({
            portValidationMessageDisplay: !/^\d+$/g.test(text)
        });
    }

    //初始化表单数据
    componentWillMount() {
        AsyncStorage.getItem('ip', (error, result)=> {
            this.ip = result;
            this.setState({
                defaultIp: result
            })
        });
        AsyncStorage.getItem('port', (error, result)=> {
            this.port = result;
            this.setState({
                defaultPort: result
            })
        });
        AsyncStorage.getItem('pwd', (error, result)=> {
            this.pwd = (typeof(result) == 'undefined' || result == null ? '' : result);
            this.setState({
                defaultPwd: result
            })
        });
        AsyncStorage.getItem('rememberMe', (error, result)=> {
            if (!error) {
                if ('y' == result && !this.state.rememberMe) {
                    this.setState({
                        rememberMe: true
                    });
                }
                if ('n' == result && this.state.rememberMe) {
                    this.setState({
                        rememberMe: false
                    });
                }
            }
        });
    }

    render() {
        console.log("render");
        return (
            <View style={{paddingTop:30}}>
                <View id="ipInputBox">
                    <FormLabel labelStyle={{ fontSize:18 }}>IP</FormLabel>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:4}}>
                            <FormInput
                                defaultValue={this.state.defaultIp}
                                ref={input=>this.ipInputBox = input}
                                onChangeText={(text)=>this.checkIp(text)}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button style={{ height:50,width:50 }} backgroundColor="black" title="x"
                                    onPress={()=>this.ipInputBox.clearText()}/>
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
                                defaultValue={this.state.defaultPort}
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
                                defaultValue={this.state.defaultPwd}
                                onChangeText={(text)=>this.pwd=text}
                                ref={input=>this.pwdInputBox = input}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button backgroundColor="black" title="x" onPress={()=>this.pwdInputBox.clearText()}/>
                        </View>
                    </View>
                </View>
                <View>
                    <CheckBox
                        title='remember me'
                        checked={this.state.rememberMe}
                        onPress={()=>{
                            //持久化rememberme选中状态
                            AsyncStorage.setItem('rememberMe',!this.state.rememberMe?'y':'n');
                            this.setState({
                                rememberMe:!this.state.rememberMe
                            })
                        }
                        }
                    />
                </View>
                <View style={{marginTop:30}}>
                    <Button backgroundColor='red' title="SUBMIT" onPress={()=>this.doSubmit()}/>
                </View>

                <Modal visible={this.state.showLoadingModal} transparent={ true }
                       onRequestClose={() => this.setState({showLoadingModal: false})}>
                    <View
                        style={{ flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#000000',opacity:0.5}}>
                        <Image source={require('../imgs/loading.gif')}/>
                    </View>
                </Modal>

            </View>
        )
    }

    doSubmit() {
        this.setState({
            showLoadingModal: true
        });

        fetch(servers + "testConnection", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ip=' + this.ip + '&port=' + this.port + '&pwd=' + (typeof(this.pwd) == 'undefined' ? '' : this.pwd) + '&dbindex=0'
        }).then((resp)=>resp.json()).then((respJson)=> {
            this.setState({
                showLoadingModal: false
            });
            //验证成功
            if ('success' == respJson.status) {

                if (this.state.rememberMe) {
                    AsyncStorage.setItem('ip', this.ip);
                    AsyncStorage.setItem('port', this.port);
                    AsyncStorage.setItem('pwd', this.pwd);
                } else {
                    //如果选择不保存表单数据，则清空原本保存的数据
                    AsyncStorage.multiRemove(["ip", "port", "pwd"]);
                }

                this.props.navigation.navigate('ShowDBs', {
                    ip: this.ip,
                    port: this.port,
                    pwd: (typeof(this.pwd) == 'undefined' ? '' : this.pwd)
                });
            } else {
                Alert.alert('连接失败', '请检查您所填写的内容');
            }
        });

    }

}
