import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class HartBookScreen extends Component {

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
              onPress={() => this.props.navigation.goBack()}>
              <Text>
              <AntDesign name="question" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topContainer}>
          <Text>HartBookScreen</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Chapter1', {
                chapter: 'Chapter1',
              });
            }}>
            <Text>Chapter1</Text>
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

export default HartBookScreen;
