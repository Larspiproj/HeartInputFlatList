import React, { Component }from 'react'
import { Image, ScrollView, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage,
   TouchableOpacity, TextInput, StyleSheet, Text, View, DatePickerAndroid }
   from 'react-native';
   
//import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';
import Input from '../components/Input';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const state = {
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
  vikt: "",
}

class TextInputScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dina värden',
    }  
  }
  constructor(props) {
    super(props);
    this.state={ state }

    this.focusNextField = this.focusNextField.bind(this); 
    this.inputs = {};

  }

  focusNextField(field) {
    this.inputs[field].focus();  
  }

  componentDidMount() {
    console.log("TextInputScreen componentDidMount");
    this._initialState();
  }

  componentDidUpdate() {
    console.log("TextInputScreen componentDidUpdate");
  }

  _initialState = async() =>{
    try {
      const nextKey = await AsyncStorage.getItem('nextKey');
      if (!nextKey) {
        await AsyncStorage.multiSet([['nextKey', JSON.stringify(0)],
          ['nextId', JSON.stringify(0)]])
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

  _saveNextId = async(nextId) => {
    try {
      await AsyncStorage.setItem('nextId', JSON.stringify(nextId));  
    }
    catch(error) {
      console.log("error _saveNextId: ", error);  
    }
  }

  _getNextKey = async() => {
    try {
      const key = await AsyncStorage.getItem('nextKey')
      .then((key) =>
      this.setState({'key': JSON.parse(key)})) 
    }
    catch(error) {
      console.log("error _getNextKey: ", error);  
    }
  }

  _getNextId = async() => {
    try {
      const id = await AsyncStorage.getItem('nextId')
      .then((id) =>
      this.setState({'id': JSON.parse(id)})) 
    }
    catch(error) {
      console.log("error _getNextId: ", error);  
    }
  }

  _saveLatestKey = async() => {
    try {
      await AsyncStorage.setItem('latestKey', JSON.stringify(this.state.key));
    }
    catch(error) {
      console.log("error _saveLatestKey: ", error);
    }  
  }

  _submit = async() => {
    try {

      await this._getNextKey();
      await this._getNextId();
      console.log("1 this.state.key, id: ", this.state.key, this.state.id);

      const { id, date, kolesterol, LDL_kolesterol, HDL_kolesterol,
              triglycerider, apolipoproteiner, bloodpressure, HbA1c_bloodsugar,
              waist, vikt } = this.state;
      const inputs = [
        {"id": id, "analysis": "date", "result": date},
        {"id": id+1, "analysis": "kolesterol",
        "result": kolesterol, "date": date},
        {"id": id+2, "analysis": "LDL_kolesterol",
        "result": LDL_kolesterol, "date": date},
        {"id": id+3, "analysis": "HDL_kolesterol",
        "result": HDL_kolesterol, "date": date},
        {"id": id+4, "analysis": "triglycerider",
        "result": triglycerider, "date": date},
        {"id": id+5, "analysis": "apolipoproteiner",
        "result": apolipoproteiner, "date": date},
        {"id": id+6, "analysis": "bloodpressure",
        "result": bloodpressure, "date": date},
        {"id": id+7, "analysis": "HbA1c_bloodsugar",
        "result": HbA1c_bloodsugar, "date": date},
        {"id": id+8, "analysis": "waist", "result": waist,
        "date": date},
        {"id": id+9, "analysis": "vikt", "result": vikt,
        "date": date},
      ]
        console.log("2 inputs: ", inputs);
        console.log("3 key and id: ", this.state.key, this.state.id);

      await this._saveInputs(this.state.key.toString(), JSON.stringify(inputs));
      await this._saveLatestKey();

      const nextKey = (this.state.key + 1);
      console.log("4 nextKey: ", nextKey);
      const nextId = (this.state.id += 10);
      console.log("4 nextId: ", nextId);
      await this._saveNextKey(nextKey)
      await this._saveNextId(nextId)
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
                vikt: "",
         }));
      console.log("5 key and id: ", this.state.key, this.state.id);
      Alert.alert('Data submitted');
    } catch(error) {
        console.log("error _submit: ", error);  
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

  _datePicker = async() => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        //date: this.state.selectedDate
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
          const date = new Date(year, month,day);
          //this.setState({selectedDate: date.toLocaleDateString()});
          this.setState({date: date.toLocaleDateString()});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date Picker', message);  
    }
  }

  render() {
    console.log("TextInputScreen render executed");
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.Container}>
        <ScrollView keyboardShouldPersistTaps='always' stickyHeaderIndices={[1]}
            contentContainerStyle={styles.contentContainer}>
          <View style={styles.middleContainer}>
            <Input
              placeholder='date'
              value={this.state.date}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //blurOnSubmit={ false }
              onFocus={
                () => this._datePicker()}
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
              placeholderTextColor='#ced0ce'
              value={this.state.kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.LDL_kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.HDL_kolesterol}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.triglycerider}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.apolipoproteiner}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.bloodpressure}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.HbA1c_bloodsugar}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
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
              placeholderTextColor='#ced0ce'
              value={this.state.waist}
              //onEndEditing={this._submit}
              returnKeyType='next'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onSubmitEditing={
                () => this.focusNextField('vikt')}
              onChangeText={
                (waist) => this.setState({waist})}
              ref={
                (input) => this.inputs['waist'] = input}
            />

            <TextInput
              style={styles.textInput}
              placeholder='vikt'
              placeholderTextColor='#ced0ce'
              value={this.state.vikt}
              //onEndEditing={this._submit}
              returnKeyType='done'
              //underlineColorAndroid='transparent'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ true }
              onChangeText={
                (vikt) => this.setState({vikt})}
              ref={
                (input) => this.inputs['vikt'] = input}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={this._submit}>
              <Text>Spara dina värden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('TargetValues')}>
              <Text>Skriv in nya målvärden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this._confirmRemoveData}>
              <Text>Radera alla värden</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    //flexDirection: 'row',
    //marginTop: 30,
    //alignItems: 'stretch',
    backgroundColor: '#fdfdfd',
    //backgroundColor: 'red',
  },
  contentContainer: {
    //flex: 1,
    //paddingVertical: 50,
    //alignItems: 'stretch',
    //justifyContent: 'center',
    //backgroundColor: '#2896d3',
    //backgroundColor: '#990000',
    //backgroundColor: '#fdfdfd',
    //paddingLeft: 40,
    //paddingRight: 40,    
  },
  headerContainer: {
    //flex: 1,
    //flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000',
  },
  innerHeaderContainer: {
    //flex: 1,
    flexDirection: 'row',
    //padding: 15,
    height: 67,
  },
  headerLeft: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    //backgroundColor: 'red'
  },
  headerCenter: {
    flex:3, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    //backgroundColor: 'blue'
  },
  headerRight: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
    //backgroundColor: 'green'
  },
  middleContainer: {
    flex: 7,
    alignItems: 'stretch', 
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 15,
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

export default TextInputScreen;

/*
            <TextInput
              style={styles.textInput}
              placeholder='date'
              placeholderTextColor='#ced0ce'
              value={this.state.date}
              //onEndEditing={this._submit}
              returnKeyType='next'
              underlineColorAndroid='#ced0ce'
              blurOnSubmit={ false }
              onFocus={
                () => this._datePicker()}
              onSubmitEditing={
                () => this.focusNextField('kolesterol')}
              onChangeText={
                (date) => this.setState({date})}
              ref={
               (input) => this.inputs['yyyymmdd'] = input}
            />
*/
