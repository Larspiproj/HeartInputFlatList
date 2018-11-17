import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import flatListScreen from "./screens/flatListScreen";
import textInputScreen from "./screens/textInputScreen";

export default createMaterialTopTabNavigator ({
  Home: {
    screen: HomeScreen
  },
  Data: {
    screen: flatListScreen
  },
  Inputs: {
    screen: textInputScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon name="" color={tintcolor} size={24} />
      )
    }
  }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',  
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',  
      },
      indicatorStyle: {
        height: 0  
      },
      showIcon: false
    }
  });

