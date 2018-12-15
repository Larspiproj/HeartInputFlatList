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
import TargetValuesScreen from "./screens/TargetValuesScreen";
import HartBookScreen from "./screens/HartBookScreen";
import Chapter1Screen from "./screens/Chapter1Screen";
import TargetValuesHelpScreen from "./screens/TargetValuesHelpScreen";

const HomeStack = createStackNavigator (
  {
    Home: HomeScreen,
    HomeHelp: HomeHelpScreen,  
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: {
      tabBarLabel: 'Hem',  
    },
  }
);

const HartBookStack = createStackNavigator (
  {
    HartBook: HartBookScreen,
    Chapter1: Chapter1Screen,  
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: {
      tabBarLabel: 'Hjärtbok',  
    },
  }
);

const FlatListStack = createStackNavigator (
  {
    FlatList: FlatListScreen, 
    Analysis: AnalysisScreen, 
    History: HistoryScreen,
    Facts: FactsScreen,
    Help: HelpScreen,  
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: {
      tabBarLabel: 'Värden',
    },
  }
);

const TextInputStack = createStackNavigator (
  {
    Inputs: TextInputScreen,  
    InputsHelp: InputsHelpScreen,  
    TargetValues: TargetValuesScreen,
    TargetValuesHelp: TargetValuesHelpScreen,
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: {
      tabBarLabel: 'Skriv In',
    },
  }
);

const AppNavigator = createMaterialTopTabNavigator (
  {
    Home: HomeStack,
    HartBook: HartBookStack,
    Data: FlatListStack,
    Inputs: TextInputStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'HartBook':
            iconName = 'book';
            break;
          case 'Data':
            iconName = 'profile';
            break;
          case 'Inputs':
            iconName = 'form';
            break;  
        }
        return <AntDesign name={iconName} size={16} color={tintColor} />;
      },
    }),
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
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 12,  
      },
      tabStyle: {
        //height: 50,  
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />  
  }  
}
