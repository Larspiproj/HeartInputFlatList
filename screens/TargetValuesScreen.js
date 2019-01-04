import React, { Component } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, AsyncStorage, TextInput,
TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class TargetValuesScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      //key: null,
      //id: null,
      //date: "",
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
    //this._storeTargetValues(); 
  };

  _storeTargetValues = async(targetValues) => {
    try{
      console.log("_storeTargetValues", targetValues);
      await AsyncStorage.multiSet(targetValues);
    } catch(error) {
      console.log("error _storeTargetValues: ", error);
    }
  }

  _submitData = async() => {
    console.log("_submitData");
    try {
      const targetValues = [
        ['kolesterol', this.state.kolesterol],
        ['LDL_kolesterol', this.state.LDL_kolesterol],
        ['HDL_kolesterol', this.state.HDL_kolesterol],
        ['triglycerider', this.state.triglycerider],
        ['apolipoproteiner', this.state.apolipoproteiner],
        ['bloodpressure', this.state.bloodpressure],
        ['HbA1c_bloodsugar', this.state.HbA1c_bloodsugar],
        ['waist', this.state.waist],
        ['vikt', this.state.vikt],  
      ];

      //console.log("targetValues: ", targetValues);

      await this._storeTargetValues(targetValues);

    } catch(error) {
      console.log("error _storeTargetValues", error);  
    }
  };

  _displayData = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        console.log("keys: ", keys);
        if (keys.length<1) {
          console.log("keys empty");
        }
        let filtered = [];
        const keyNrarray = [];
        let keysSorted = [];
        const values = [];
        const keyArray = [];
        const remove = ["nextKey", "nextId", "latestKey"]

        filtered = keys.filter(
          function(value) {
            return this.indexOf(value) < 0;
          },
          remove
        );

        //filtered = keys.filter(function(value) {
          //return value != "nextKey";  
        //});
        console.log("filtered: ", filtered);

        keysSorted = filtered.sort(function(a, b){return a-b});
        console.log("keysSorted: ", keysSorted);

        keyNrArray = filtered.map(Number);
        console.log("keyNrArray: ", keyNrArray);

        const items = await AsyncStorage.multiGet((keysSorted), (error, stores) => {
        stores.map((result, i, store) => {
          //console.log("stores: ", stores);
          //console.log("result", result);
          //console.log("i",i);
          //console.log("store", store);
          let key = store[i][0];
          //console.log("key: ", key);
          keyArray.push(key);
          let value = JSON.parse(store[i][1]);
          values.push(value);
          //console.log("value: ", value);  
          //keyNrArray = keysSortedArray.map(Number);
          //console.log("keyNrArray: ", keyNrArray);
        });
        });
        //const latestKey = keyNrArray.slice(-1)[0];
        //const latestKey = await AsyncStorage.getItem('latestKey');
        //console.log("latestKey: ", latestKey);
        console.log("keyArray: ", keyArray);
        console.log("values: ", values);
        console.log("state: ", this.state.kolesterol);

        //const latestValues = await AsyncStorage.getItem(latestKey.toString());
        //console.log("latest values: ", latestValues);
        //console.log("latest parsed values: ", JSON.parse(latestValues));

        //const dataSource = [JSON.parse(latestValues)];
        //console.log("dataSource: ", dataSource);
        //console.log("values[5]: ", values[5].kolesterol);
    }

    catch(error) {
      console.log("error _displayData: ", error);  
    }
  }

  _confirmRemoveData = () => {
    Alert.alert(
      'Raderar alla värden!',
      'Är det säkert du vill fortsätta?',
      [
        {text: 'Avbryt'},
        {text: 'Radera', onPress: () => this._removeData()},
      ],
      { cancelable: false }
    );  
  }

  _removeData = async() => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        console.log("Keys to remove empty");  
        alert("Nothing to delete");
      }
      console.log("Keys to remove: ", keys);
      await AsyncStorage.multiRemove(keys);
      this._initialState();
      Alert.alert('Data removed');
    }
    catch(error) {
      alert(error);
    } 
  }

  render() {
    //const { navigation } = this.props;
    //const analysis = navigation.getParam('analysis');
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView stickyHeaderIndices={[0]}
            contentContainerStyle={styles.contentContainer}>
          <View style={header.headerContainer}>
            <View style={header.innerHeaderContainer}>
              <View style={header.headerLeft}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text>
                  <AntDesign name="left" size={30} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={header.headerCenter}>
                <Text style={{fontSize: 18}}>Målvärden</Text>
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
          </View>
          <View style={styles.middleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={`kolesterol ${this.state.kolesterol}`}
              placeholderTextColor='#ced0ce'
              //value={`kolesterol ${this.state.kolesterol}`}
              //onEndEditing={this._submit}
              returnKeyType='done'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              //onSubmitEditing={
                //() => this.focusNextField('LDL-kolesterol')}
              onChangeText={
                (kolesterol) => this.setState({kolesterol})}
              //ref={
                //(input) => this.inputs['kolesterol'] = input}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={this._submitData}>
              <Text>Spara nya målvärden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this._displayData}>
              <Text>Visa målvärden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this._confirmRemoveData}>
              <Text>Radera målvärden</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );  
  }  
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 30,
    //backgroundColor: '#fdfdfd',
    //justifyContent: 'center',
    //alignItems: 'center',
  },  
  middleContainer: {
    flex: 7,
    alignItems: 'stretch', 
  },
  topContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 20,
    fontSize: 18,
    backgroundColor: '#fdfdfd',
    //width: 200,
    //borderRadius: 10,
  },
  btn: {
    flex: 1,
    //alignSelf: 'stretch',
    //backgroundColor: '#01c853',  
    //backgroundColor: '#008000',
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    alignItems: 'center',
    margin: 10,
    //width: '70%',
    borderRadius: 10,
    fontSize: 18,
    elevation: 2,
  },
});

export default TargetValuesScreen;
