import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
} from 'react-native';

export default class ShowDbKeys extends Component {

    constructor(props) {
        super(props);
    }

    _sectionComp = (info) => {
        return <Text>{info.section.key}</Text>
    }

    _renderItem = (info) => {
        return <Text>{info.item.key}</Text>
    }

    render() {
        this.connectionDB();

        var sections = [];
        sections.push({key: 'string', data: []});
        sections.push({key: 'hash', data: [{key: 'aa'}]});
        sections.push({key: 'list', data: [{key: 'aa'}]});
        sections.push({key: 'set', data: [{key: 'aa'}]});
        sections.push({key: 'sorted set', data: [{key: 'aa'}]});

        sections[0].data.push({key: 'name2'});

        return (
            <View style={{flex:1}}>
                <SectionList
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={sections}/>
            </View>
        );
    }

    /**
     * 连接redis数据库函数
     */
    connectionDB() {
        var redis = require('redis');
        //var client = redis.createClient('6379', '192.168.1.139');
        //client.on('error', function (error) {
        //    if (error) {
        //        console.log('connection redis error:' + error);
        //    }
        //});
        //
        //client.select('0', function (error) {
        //    if (error) {
        //        console.log(error);
        //    } else {
        //        client.set('name', 'zh', function (error, res) {
        //            if (error) {
        //                console.log(error)
        //            } else {
        //                console.log('res:' + res);
        //            }
        //            client.close();
        //        });
        //    }
        //});
    }

    getAllKeys() {

    }

}