import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const header = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000',
    //height: 70,
  },
  headerLeft: {
    flex:1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  headerCenter: {
    flex:3, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerRight: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default header;
