import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import header from '../styles/header.js';

class Header extends Component {
  render() {
    return (
        <View style={header.headerContainer}>
          <View style={header.headerLeft}>
            <TouchableOpacity
              onPress={ this.props.onPressLeft }>
              <Text>
              {this.props.children}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>{ this.props.analysis }</Text>
          </View>
          <View style={header.headerRight}>
            <TouchableOpacity
              onPress={ this.props.onPress }>
              <Text>
              {this.props.children}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );  
  }  
}

export default Header;
