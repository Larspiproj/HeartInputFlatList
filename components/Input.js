import React, { Component }from 'react'
import { View, TextInput, Text, StyleSheet, DatePickerAndroid } from 'react-native';

/*
const Input = ({ label, value, onChangeText, placeholder,
                placeholderTextColor, returnKeyType, underlineColorAndroid,
                blurOnSubmit, onFocus, onSubmitEditing }) => {
*/

class Input extends Component {
  render() {
    return (
      <TextInput
        style={styles.textInputTest}
        placeholder={this.props.placeholder}
        //placeholderTextColor='#ced0ce'
        value={this.props.value}
        returnKeyType={this.props.returnKeyType}
        underlineColorAndroid={this.props.underlineColorAndroid}
        //underlineColorAndroid='#ced0ce'
        blurOnSubmit={false}
        onFocus={this.props.onFocus}
        onSubmitEditing={this.props.onSubmitEditing}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInputTest: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 15,
    fontSize: 18,
    backgroundColor: '#fdfdfd',
    //backgroundColor: 'red',
    //width: 200,
    //borderRadius: 10,
  },
  
});

Input.defaultProps = {
  placeholderTextColor: '#ced0ce',
  underlineColorAndroid: '#ced0ce',
  };

export default Input;
