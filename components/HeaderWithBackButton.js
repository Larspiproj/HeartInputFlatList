import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View } from 'react-native';

const HeaderWithBackButton = props => {
  return (
    <View
      style={{
        height: 56,
        marginTop: 50  
      }}
    >
      <Header {...props} />
    </View>
  );  
};

export default HeaderWithBackButton;
