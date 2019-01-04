import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, Text }
    from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class AnalysisScreen extends Component {

  componentDidMount() {
    console.log("AnalysisScreen componentDidMount");
    this._displayTargetValue()  
  };

  _facts=() => {
    this.props.navigation.navigate('Facts');  
  };

  _displayTargetValue = async() => {
    try {
      const targetValue = await AsyncStorage.getItem('kolesterol');
      console.log("targetValue: ", targetValue);
    } catch(error) {
      console.log("error _displayTargetValues: ", error);  
    };  
  };

  render() {
    const { navigation } = this.props;
    const analysis = navigation.getParam('analysis');
    const result = navigation.getParam('result');
    const date = navigation.getParam('date');
    const id = navigation.getParam('id');
    const key = navigation.getParam('key');
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
            <Text style={{fontSize: 18}}>{ analysis }</Text>
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
          <Text>AnalysisScreen</Text>
          <Text>{ analysis }</Text>
          <Text>{ result }</Text>
          <Text>{ date }</Text>
          <Text>{ id }</Text>
          <Text>key: { key }</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('History', {
                id: id,
                analysis: analysis, 
            });
          }}>
            <Text>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Facts', {
                id: id,
                analysis: analysis,
            });
          }}>
            <Text>Facts</Text>
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 3,
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

export default AnalysisScreen;
