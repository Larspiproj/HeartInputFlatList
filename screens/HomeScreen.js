import React, { Component } from 'react';
import { Image, AsyncStorage, Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      kolesterol: "1",
      LDL_kolesterol: "1",
      HDL_kolesterol: "1",
      triglycerider: "1",
      apolipoproteiner: "1",
      bloodpressure: "1",
      HbA1c_bloodsugar: "1",
      waist: "1",
      vikt: "1",
    }  
  }

  componentDidMount() {
    console.log('HomeScreen componentDidMount');  
    //console.log("States", this.state.kolesterol);
  }

  componentDidUpdate() {
    console.log('HomeScreen componentDidUpdate');  
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={header.headerContainer}>
          <View style={header.headerLeft}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}>
              <Text>
              <AntDesign name="setting" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>Hjärtboken Hem</Text>
          </View>
          <View style={header.headerRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeHelp')}>
              <Text>
              <AntDesign name="question" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text>HomeScreen</Text>
        </View>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd'
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',  
  },
  middleContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',  
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    //backgroundColor: 'green',  
  },
  button: {
    backgroundColor: 'green',
    padding: 5,
    margin: 10,
    width: 120,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    //fontWeight: 'bold',  
  },
});

export default HomeScreen;
