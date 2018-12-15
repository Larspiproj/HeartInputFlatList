import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import header from '../styles/header.js';
import { Ionicons, AntDesign } from '@expo/vector-icons';

class TargetValuesHelpScreen extends Component {

  render() {
    //const { navigation } = this.props;
    //const analysis = navigation.getParam('analysis');
    return(
      <View style={styles.container}>
        <View style={header.headerContainer}>
          <View style={header.headerLeft}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Text>
              <AntDesign name="left" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>Hjälp</Text>
          </View>
          <View style={header.headerRight}>
          </View>
        </View>
        <View style={styles.topContainer}>
          <Text>TargetValuesHelpScreen</Text>
        </View>
      </View>
    );  
  }  
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  topContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TargetValuesHelpScreen;
