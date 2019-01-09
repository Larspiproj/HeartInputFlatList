import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import { AntDesign } from '@expo/vector-icons';
import { IconLeft, IconQuestion } from './components/Icons';
import ImageHeart from './components/ImageHeart';
import ButtonQuestion from './components/ButtonQuestion';
import HeaderWithBackButton from './components/HeaderWithBackButton';

import HomeScreen from "./screens/HomeScreen";
import HomeHelpScreen from "./screens/HomeHelpScreen";
import HartBookScreen from "./screens/HartBookScreen";
import Chapter1Screen from "./screens/Chapter1Screen";
import FlatListScreen from "./screens/FlatListScreen";
import HelpScreen from "./screens/HelpScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import HistoryScreen from "./screens/HistoryScreen";
import FactsScreen from "./screens/FactsScreen";
import TextInputScreen from "./screens/TextInputScreen";
import InputsHelpScreen from "./screens/InputsHelpScreen";
import TargetValuesScreen from "./screens/TargetValuesScreen";
import TargetValuesHelpScreen from "./screens/TargetValuesHelpScreen";
import SettingsScreen from "./screens/SettingsScreen";

const HomeStack = createStackNavigator (
  {
    Home: HomeScreen,
    HomeHelp: HomeHelpScreen,  
    Settings: SettingsScreen,
    TargetValues: TargetValuesScreen,
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
    FlatList: {
      screen: FlatListScreen,
      navigationOptions: {
        headerLeft: <ImageHeart />,  
      },
    },
    Analysis: AnalysisScreen, 
    History: HistoryScreen,
    Facts: {
      screen: FactsScreen,
      navigationOptions: {
        //title: 'Test',  
        //headerRight: <ButtonQuestion {onPress=alert("Button pressed")} />,
      },
    },
    Help: {
      screen: HelpScreen,
      //navigationOptions: {
        //title: 'Hjälp',  
        //header: props => <HeaderWithBackButton />
      //},
    },
  },
  {
    defaultNavigationOptions: {
        //headerRight: <ButtonQuestion />,
        //headerLeft: <IconLeft />,
        //headerLeft: <ImageHeart />,
        //headerBackImage: <IconLeft />,
        headerTitleStyle: {
          fontWeight: '100',
        },
      headerStyle: {
        backgroundColor: '#f2f2f2',  
      },
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
    //TargetValues: TargetValuesScreen,
    //TargetValuesHelp: TargetValuesHelpScreen,
  },
  {
    defaultNavigationOptions: {
      //header: null
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

export default class MainNavigator extends React.Component {
  render() {
    return <AppContainer />  
  }  
}
