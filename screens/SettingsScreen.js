import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class SettingsScreen extends Component {

  render() {
    const { navigation } = this.props;
    const analysis = navigation.getParam('analysis');
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
            <Text style={{fontSize: 18}}>Inställningar</Text>
          </View>
          <View style={header.headerRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Text>
              <AntDesign name="question" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topContainer}>
          <Text>SettingsScreen</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('TargetValues');
          }}>
            <Text>Målvärden</Text>
          </TouchableOpacity>
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
  btn: {
    //alignSelf: 'center',
    backgroundColor: '#ff0000',
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 5,
    elevation: 2,
  },
});

export default SettingsScreen;
