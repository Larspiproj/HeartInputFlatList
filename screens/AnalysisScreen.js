import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, Text }
    from 'react-native';

class AnalysisScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('analysis'),
    };
  };

  //_history=() => {
    //this.props.navigation.navigate('History', {
      //id: { id }  
    //});

  _facts=() => {
    this.props.navigation.navigate('Facts');  
  };

  render() {
    const { navigation } = this.props;
    const analysis = navigation.getParam('analysis');
    const result = navigation.getParam('result');
    const date = navigation.getParam('date');
    const id = navigation.getParam('id');
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text>AnalysisScreen</Text>
          <Text>{ analysis }</Text>
          <Text>{ result }</Text>
          <Text>{ date }</Text>
          <Text>{ id }</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('History', {
                id: id  
            });
          }}>
            <Text>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={this._facts}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 3,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#ff0000',
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 5,  
  },
});

export default AnalysisScreen;
