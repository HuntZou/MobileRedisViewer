import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import formPage from './formPage';
import home from './homePage.js';
import showDBs from './showDBsPage.js';
import showKeys from './dbkeysPage'
export default App = StackNavigator({
    Home: {
        screen: home,
        navigationOptions: {
            headerTitle: 'HOME'
        }
    },
    FormPage: {
        screen: formPage,
        navigationOptions: {
            headerTitle: 'FORM'
        }
    },
    ShowDBs: {
        screen: showDBs,
        navigationOptions: {
            headerTitle: 'DATABASES'
        }
    },
    ShowKeys: {
        screen: showKeys,
        navigationOptions: {
            headerTitle: 'KEYS'
        }
    }
});