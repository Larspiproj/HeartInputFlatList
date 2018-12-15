import React, { Component }from 'react'
import { Image, ScrollView, KeyboardAvoidingView, Keyboard, Alert, AsyncStorage,
   TouchableOpacity, TextInput, StyleSheet, Text, View, DatePickerAndroid }
   from 'react-native';
   
//import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class TargetValuesScreen extends Component {
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
      vikt: "",
    }

    this.focusNextField = this.focusNextField.bind(this); 
    this.inputs = {};

  }

  focusNextField(field) {
    this.inputs[field].focus();  
  }

  componentDidUpdate() {
    console.log("TargetValuesScreen DidUpdate");  
  }

  _submit = async() => {
    try {
      const targetValues = [
        ['date', JSON.stringify(this.state.date)],
        ['kolesterol', JSON.stringify(this.state.kolesterol)],
        ['LDL-kolesterol', JSON.stringify(this.state.LDL-kolesterol)],
        ['HDL-kolesterol', JSON.stringify(this.state.HDL-kolesterol)],
        ['triglycerider', JSON.stringify(this.state.triglycerider)],
        ['apolipoproteiner', JSON.stringify(this.state.apolipoproteiner)],
        ['bloodpressure', JSON.stringify(this.state.bloodpressure)],
        ['HbA1c-bloodsugar', JSON.stringify(this.state.bloodsugar)],
        ['waist', JSON.stringify(this.state.waist)],
        ['vikt', JSON.stringify(this.state.vikt)],  
      ];

      await AsyncStorage.multiSet(targetValues);
        
    } catch(error) {
      console.log("error _submit: ", error);  
    }  
  };

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
        <ScrollView stickyHeaderIndices={[0]}
            contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.innerHeaderContainer}>
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text>
                  <AntDesign name="left" size={30} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headerCenter}>
                <Text style={{fontSize: 18}}>Målvärden</Text>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TargetValuesHelp')}>
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

            <TextInput
              style={styles.textInput}
              placeholder='målvärde kolesterol'
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
              placeholder='målvärde LDL-kolesterol'
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
              placeholder='målvärde HDL-kolesterol'
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
              placeholder='målvärde triglycerider'
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
              placeholder='målvärde apolipoproteiner'
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
              placeholder='målvärde bloodpressure'
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
              placeholder='målvärde HbA1c-bloodsugar'
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
              placeholder='målvärde waist'
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
              placeholder='målvärde vikt'
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
              <Text>Spara målvärden</Text>
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
    marginTop: 30,
    //alignItems: 'stretch',
    //backgroundColor: '#fdfdfd',
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
