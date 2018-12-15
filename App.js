import React, { Component } from 'react';
import { Icon, Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import { AntDesign } from '@expo/vector-icons';

import FlatListScreen from "./screens/FlatListScreen";
import TextInputScreen from "./screens/TextInputScreen";
import HomeScreen from "./screens/HomeScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import HistoryScreen from "./screens/HistoryScreen";
import FactsScreen from "./screens/FactsScreen";
import HelpScreen from "./screens/HelpScreen";
import InputsHelpScreen from "./screens/InputsHelpScreen";
import HomeHelpScreen from "./screens/HomeHelpScreen";

const FlatListStack = createStackNavigator ({
  FlatList: {
    screen: FlatListScreen, 
  },
  Analysis: {
    screen: AnalysisScreen, 
  },
  History: {
    screen: HistoryScreen,
  },
  Facts: {
    screen: FactsScreen,
  },
  Help: {
    screen: HelpScreen,  
  },
});

const TextInputStack = createStackNavigator ({
  Inputs: {
    screen: TextInputScreen,  
  },
  InputsHelp: {
    screen: InputsHelpScreen,  
  },
});

const HomeStack = createStackNavigator ({
  Home: {
    screen: HomeScreen,  
  },
  HomeHelp: {
    screen: HomeHelpScreen,  
  },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Test',
    }
  }
);

const AppNavigator = createMaterialTopTabNavigator ({
  Home: {
    screen: HomeStack
  },
  Data: {
    screen: FlatListStack
  },
  Inputs: {
    screen: TextInputStack,
  },
  },
  {
    defaultNavigationOptions: {
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#ff0000',  
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',  
      },
      indicatorStyle: {
        height: 0  
      },
      showIcon: true
    },
    navigationOptions: { 
      tabBarIcon: ({tintColor}) => (
        <Icon name="form" type="AntDesign" color={tintColor} size={24} />
      )
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />  
  }  
}
