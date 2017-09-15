/**
 * Created by Administrator on 2017/9/1.
 */
import React,{Component} from 'react';
import {View,Text,FlatList,AsyncStorage} from 'react-native';
import { servers } from '../compoent/config.js'

export default class DetailText extends Component {

    constructor(props) {
        super(props);
        this.alive = true;
        this.state = {
            dataSource: []
        }
    }

    //在组件将要装载的时候加载数据
    componentWillMount() {
        this.loadData();
    }

    componentWillUnmount() {
        this.alive = false;
    }

    render() {
        return (
            <View style={{ paddingLeft:10,paddingRight:10 }}>
                <View style={{ flexDirection:'row' }}>
                    <Text style={{ flex:1,fontSize:20 }}>key</Text>
                    <Text style={{ flex:4,fontSize:20,marginLeft:10 }}>value</Text>
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item})=>this.createListItemView(item)}/>
            </View>
        );
    }

    loadData() {
        const { params } = this.props.navigation.state;

        let reqUri = '';

        switch (params.type) {
            case 'string':
                reqUri = 'getStringValueByKey';
                break;
            case 'list':
                reqUri = 'getListValueByKey';
                break;
            case 'set':
                reqUri = 'getSetValueByKey';
                break;
            case 'zset':
                reqUri = 'getZsetValueByKey';
                break;
            case 'hash':
                reqUri = 'getHashValueByKey';
                break;
        }

        fetch(servers + reqUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ip=' + params.ip + '&port=' + params.port + '&pwd=' + params.pwd + '&key=' + params.key + '&dbindex=' + params.dbindex
        }).then((resp)=>resp.json()).then((respJson)=> {
            let datasource = new Array();
            for (let key in respJson.content) {
                datasource.push({
                    key: key,
                    value: respJson.content[key]
                });
            }
            if (this.alive)
                this.setState({
                    dataSource: datasource
                });
        });
    }

    createListItemView(item) {
        return (
            <View style={{ flexDirection:'row',borderWidth:1,borderColor:'black' }}>
                <Text style={{ flex:1,borderRightWidth:1,borderRightColor:'black' }}>{item.key}</Text>
                <Text style={{ flex:4,marginLeft:10 }}>{item.value}</Text>
            </View>
        );
    }
}