import React,{Component} from 'react';
import { servers } from '../compoent/config.js'
import {
    StyleSheet,
    View,
    Text,
    SectionList,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class ShowDbKeys extends Component {

    constructor(props) {
        super(props);
        this.alive = true;
        this.state = {
            sections: this.initDataSource()
        }
    }

    //在组件将要装载的时候加载数据
    componentWillMount() {
        this.getAllKeys();
    }

    //组件将要被卸载触发的事件
    componentWillUnmount() {
        this.alive = false;
    }

    render() {

        return (
            <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
                <SectionList
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={this.state.sections}
                    refreshing={true}/>
            </View>
        );
    }

    getAllKeys() {

        fetch(servers + "getKeys", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ip=' + this.props.navigation.state.params.ip + '&port=' + this.props.navigation.state.params.port + '&pwd=' + this.props.navigation.state.params.pwd + '&dbindex=' + this.props.navigation.state.params.dbindex
        }).then((resp)=>resp.json()).then((respJson)=> {
            let copy_sections = this.initDataSource();
            for (var key in respJson.content) {
                let type = respJson.content[key];
                switch (type) {
                    case 'string':
                        copy_sections[0].data.push({key: key});
                        break;
                    case 'hash':
                        copy_sections[1].data.push({key: key});
                        break;
                    case 'list':
                        copy_sections[2].data.push({key: key});
                        break;
                    case 'set':
                        copy_sections[3].data.push({key: key});
                        break;
                    case 'zset':
                        copy_sections[4].data.push({key: key});
                        break;
                }
            }
            //如果组件被卸载则不用继续刷新
            if (this.alive)
                this.setState({
                    sections: copy_sections
                });
        });
    }

    _sectionComp = (info) => {
        return <Text
            style={{ fontSize:20,fontWeight:'800',color:'red',borderBottomWidth:2,borderBottomColor:'#ADADAD'}}>{info.section.key}</Text>
    };

    _renderItem = (info) => {
        return <TouchableOpacity onPress={()=>this.toDetailPage(info)}>
            <View>
                <View
                    style={{
                height: 40,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1
            }}>
                    <View style={{ flexDirection:'row',alignItems:'center' }}>
                        <Text style={{ marginLeft:10,fontSize:16 }}>{ info.item.key }</Text>
                    </View>
                    <Icon color="#838B8B" name='navigate-next'/>
                </View>
            </View>
        </TouchableOpacity>
    };


    initDataSource() {
        return [
            {key: 'string', data: []},
            {key: 'hash', data: []},
            {key: 'list', data: []},
            {key: 'set', data: []},
            {key: 'zset', data: []}
        ];
    }

    //跳转到显示详细数据页面
    toDetailPage(info) {

        this.props.navigation.navigate("DetailList", {
            type: info.section.key,
            key: info.item.key,
            ip: this.props.navigation.state.params.ip,
            port: this.props.navigation.state.params.port,
            pwd: this.props.navigation.state.params.pwd,
            dbindex: this.props.navigation.state.params.dbindex
        });
    }

}