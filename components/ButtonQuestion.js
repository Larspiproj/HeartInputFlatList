import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class ButtonQuestion extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <View style={{marginRight: 20}}>
          <Text>
          <AntDesign name="question" size={30} />
          </Text>
        </View>
      </TouchableOpacity>
    );  
  }  
}

export default ButtonQuestion;
