import React, { Component } from 'react';
import { Image, AsyncStorage, Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null  
  }

  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      dataSource: '',  
    }  
  }

  componentDidMount() {
    console.log('HomeScreen componentDidMount');  
  }

  componentDidUpdate() {
    console.log('HomeScreen componentDidUpdate');  
  }


  /*
  _load = async(endpoint) => {
    try {
        const API_STEM = await AsyncStorage.getItem('API_STEM');
        let response = await fetch(`${API_STEM}${endpoint}`);
        let responseJson = await response.text();

        this.setState({
        isLoading: false,
        dataSource: responseJson,
        refreshing: false,
        }, function() {
            console.log('dataSource: ', responseJson);
            console.log('dataSource: ', typeof responseJson);
            Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        console.error(error);    
        Alert.alert("Check address in settings.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text>Tracer MPPT regulator</Text>
        </View>
        <View style={styles.middleContainer}>
          <TouchableOpacity
            underlayColor = 'white'
            //onPress={() => this._load("/load_on")}
            onPress={() => {
              AsyncStorage.setItem('ENDPOINT', '/load_on')
              this.props.navigation.navigate('Load')}}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Load On</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor = 'white'
            //onPress={() => this._load("/load_off")}
            onPress={() => {
              AsyncStorage.setItem('ENDPOINT', '/load_off')
              this.props.navigation.navigate('Load')}}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Load Off</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );  
  }
  */

  render() {
    return(
      <View style={styles.container}>
        <View style={header.headerContainer}>
          <View style={header.headerLeft}>
            <Image
              source={require('../images/heart.jpeg')}
              style={{ width: 32, height: 30 }}  
            />
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>Hjärtboken</Text>
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
    marginTop: 25,
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
