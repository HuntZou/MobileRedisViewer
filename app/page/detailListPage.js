/**
 * Created by Administrator on 2017/9/1.
 */
import React,{Component} from 'react';
import {View,Text,FlatList} from 'react-native';
import {Grid, Col} from 'react-native-elements';

export default class DetailText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    render() {
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

        fetch("http://192.168.1.133:1995/" + reqUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'ip=192.168.1.139&port=6379&dbindex=0&key=' + params.key
        }).then((resp)=>resp.json()).then((respJson)=> {
            let datasource = new Array();
            for (let key in respJson.content) {
                datasource.push({
                    key: key,
                    value: respJson.content[key]
                });
            }
            //console.log(datasource)
            this.setState({
                dataSource: datasource
            });
        });

        return params.type == 'string' ? this.createStringView(params.key) : this.createListView(params.type);

    }

    createStringView(key) {
        return (<Text>{this.state.dataSource[key]}</Text>);
    }

    createListView(type) {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item})=>this.createListItemView(type,item)}/>
            </View>
        );
    }

    createListItemView(type, item) {
        return (
            'list' == type || 'set' == type ? (<Grid><Col>{item.key}</Col><Col>{item.value}</Col></Grid>) : (
                <Grid><Col>{item.key}</Col><Col>{item.value}</Col><Col>{item.value}</Col></Grid>)
        );
    }
}

//{
//    "content": {
//    "a": 2,
//        "dsd": 1,
//        "f": 3
//},
//    "status": "success"
//}