/**
 * Created by Administrator on 2017/8/31.
 */
import React, {Component} from 'react';
import {View,FlatList,Text,TouchableOpacity} from 'react-native'
import { Icon,Button } from 'react-native-elements'
export default class ShowDBs extends Component {



    //渲染列表元素
    _renderItem = ({item})=>(
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShowKeys')}>
            <View
                style={{
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1
            }}>
                <View style={{ flexDirection:'row',alignItems:'center' }}>
                    <Icon name='dns'/>
                    <Text style={{ marginLeft:10,fontSize:20 }}>{ item.dbName }</Text>
                </View>
                <Icon color="#838B8B" name='navigate-next'/>
            </View>
        </TouchableOpacity>
    )

    render() {

        var dbList = new Array();
        for (let i = 0; i < 16; i++) {
            dbList.push({
                key: i,
                dbName: 'db' + i
            });
        }
        return (
            <View>
                <FlatList
                    data={dbList}
                    renderItem={this._renderItem}/>
            </View>
        );
    }
}
