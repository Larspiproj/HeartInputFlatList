//returnKeyType='next'?
//fix containers and styles (-Values-)
//fix display data
//fix refs functions {}
//apolipoproteiner

import React from 'react'
import { ScrollView, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage, TouchableOpacity,
TextInput, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      key: null,
      id: null,
      date: "",
      kolesterol: "",
      LDL_kolesterol: "",
      HDL_kolesterol: "",
      triglycerider: "",
      apolipoproteiner: "",
      bloodpressure: "",
      HbA1c_bloodsugar: "",
      waist: "",
    }

    this.focusNextField = this.focusNextField.bind(this); 
    this.inputs = {};

  }

  focusNextField(field) {
    this.inputs[field].focus();  
  }

  componentDidMount() {
    console.log("Component Did Mount");
    this._initialState().done();
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  _initialState = async() =>{
    try {
      const nextKey = await AsyncStorage.getItem('nextKey');
      if (!nextKey) {
        await AsyncStorage.setItem('nextKey', JSON.stringify(0))
        .then(() =>  
          this.setState ({
            id: 0,
            key: 0,
          }));
      console.log("key and id set to: ", this.state.key, this.state.id);
      }
    }
    catch(error) {
      console.log("error _initialState: ", error);  
    }  
  }

  _saveInputs = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    }
    catch(error) {
      console.log("error _saveInputs: ", error);  
    }  
  }

  _saveNextKey = async(nextKey) => {
    try {
      await AsyncStorage.setItem('nextKey', JSON.stringify(nextKey));  
    }
    catch(error) {
      console.log("error _saveNextKey: ", error);  
    }
  }

  _getNextKey = async() => {
    try {
      const key = await AsyncStorage.getItem('nextKey')
      .then((key) =>
      this.setState({'key': JSON.parse(key), 'id': JSON.parse(key)})) 
    }
    catch(error) {
      console.log("error _getNextKey: ", error);  
    }
  }

  _submit = async() => {
    try {

      await this._getNextKey()
      console.log("1 this.state.key, id: ", this.state.key, this.state.id);

      const inputs = {
        id: this.state.id,
        date: this.state.date,
        kolesterol: this.state.kolesterol ,
        LDL_kolesterol: this.state.LDL_kolesterol,
        HDL_kolesterol: this.state.HDL_kolesterol,
        triglycerider: this.state.triglycerider,
        apolipoproteiner: this.state.apolipoproteiner,
        bloodpressure: this.state.bloodpressure,
        HbA1c_bloodsugar: this.state.HbA1c_bloodsugar,
        waist: this.state.waist,
      };
        console.log("2 inputs: ", inputs);
        console.log("3 key and id: ", this.state.key, this.state.id);

      await this._saveInputs(this.state.key.toString(), JSON.stringify(inputs));

      const nextKey = (this.state.key += 1);
      console.log("4 nextKey: ", nextKey);
      await this._saveNextKey(nextKey)
      .then(() =>
        this.setState({
          key: null,
          id: null,
          date: "",
          kolesterol: "",
          LDL_kolesterol: "",
          HDL_kolesterol: "",
          triglycerider: "",
          apolipoproteiner: "",
          bloodpressure: "",
          HbA1c_bloodsugar: "",
          waist: "",
        }));
      console.log("5 key and id: ", this.state.key, this.state.id);
    } catch(error) {
        console.log("error _submit: ", error);  
    }
  }

  _displayData = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        if (keys.length<1) {
          console.log("keys empty");
        }
        const filtered = [];
        const keyNrarray = [];
        const keysSortedArray = [];
        const values = [];
        const keyArray = [];
        filtered = keys.filter(function(value) {
          return value != "nextKey";  
        });
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
        const latestKey = keyNrArray.slice(-1)[0];
        console.log("latestKey: ", latestKey);
        console.log("values: ", values);
        console.log("values[5]: ", values[5].kolesterol);
    }

    catch(error) {
      console.log("error _displayData: ", error);  
    }
  }

  _removeData = async() => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        console.log("Keys to remove empty");  
      }
      console.log("Keys to remove: ", keys);
      await AsyncStorage.multiRemove(keys);
    }
    catch(error) {
      alert(error);
    } 
  }

  render() {
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <Text style={styles.header}>-Input values-</Text>
          <Text style = {{fontSize: 16, fontWeight: 'bold', color: '#fff',
            marginBottom: 30}}>
            Swipe up to see all inputfields
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder='yyyymmdd'
            placeholderTextColor='#2f2f2f'
            value={this.state.date}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('kolesterol')}
            onChangeText={
              (date) => this.setState({date})}
            ref={
             (input) => this.inputs['yyyymmdd'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='kolesterol'
            placeholderTextColor='#2f2f2f'
            value={this.state.kolesterol}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('LDL-kolesterol')}
            onChangeText={
              (kolesterol) => this.setState({kolesterol})}
            ref={
              (input) => this.inputs['kolesterol'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='LDL-kolesterol'
            placeholderTextColor='#2f2f2f'
            value={this.state.LDL_kolesterol}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('HDL-kolesterol')}
            onChangeText={
              (LDL_kolesterol) => this.setState({LDL_kolesterol})}
            ref={
              (input) => this.inputs['LDL-kolesterol'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='HDL-kolesterol'
            placeholderTextColor='#2f2f2f'
            value={this.state.HDL_kolesterol}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('triglycerider')}
            onChangeText={
              (HDL_kolesterol) => this.setState({HDL_kolesterol})}
            ref={
              (input) => this.inputs['HDL-kolesterol'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='triglycerider'
            placeholderTextColor='#2f2f2f'
            value={this.state.triglycerider}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('apolipoproteiner')}
            onChangeText={
              (triglycerider) => this.setState({triglycerider})}
            ref={
              (input) => this.inputs['triglycerider'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='apolipoproteiner'
            placeholderTextColor='#2f2f2f'
            value={this.state.apolipoproteiner}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('bloodpressure')}
            onChangeText={
              (apolipoproteiner) => this.setState({apolipoproteiner})}
            ref={
              (input) => this.inputs['apolipoproteiner'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='bloodpressure'
            placeholderTextColor='#2f2f2f'
            value={this.state.bloodpressure}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('HbA1c-bloodsugar')}
            onChangeText={
              (bloodpressure) => this.setState({bloodpressure})}
            ref={
              (input) => this.inputs['bloodpressure'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='HbA1c-bloodsugar'
            placeholderTextColor='#2f2f2f'
            value={this.state.HbA1c_bloodsugar}
            //onEndEditing={this._submit}
            returnKeyType='next'
            underlineColorAndroid='transparent'
            blurOnSubmit={ false }
            onSubmitEditing={
              () => this.focusNextField('waist')}
            onChangeText={
              (HbA1c_bloodsugar) => this.setState({HbA1c_bloodsugar})}
            ref={
              (input) => this.inputs['HbA1c-bloodsugar'] = input}
          />

          <TextInput
            style={styles.textInput}
            placeholder='waist'
            placeholderTextColor='#2f2f2f'
            value={this.state.waist}
            //onEndEditing={this._submit}
            returnKeyType='done'
            underlineColorAndroid='transparent'
            blurOnSubmit={ true }
            onChangeText={
              (waist) => this.setState({waist})}
            ref={
              (input) => this.inputs['waist'] = input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={this._submit}>
            <Text>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={this._displayData}>
            <Text>Display stored data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={this._removeData}>
            <Text>Remove stored data</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,  
  },
  contentContainer: {
    //flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#2896d3',
    backgroundColor: '#990000',
    //paddingLeft: 40,
    //paddingRight: 40,    
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fdfdfd',
    fontWeight: 'bold',    
  },
  textInput: {
    flex: 1,
    //alignSelf: 'stretch',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fdfdfd',
    width: 200,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    //alignSelf: 'stretch',
    //backgroundColor: '#01c853',  
    backgroundColor: '#008000',  
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 10,
  },
});
