import React, { Component } from 'react';
import { Image, View } from 'react-native';

class ImageHeart extends Component {
  render() {
    return (
      <View style={{marginLeft: 20}}>
        <Image
          source={require('../images/heart.jpeg')}
          style={{ width: 32, height: 30 }}  
        />
      </View>
    );  
  }  
}

export default ImageHeart;
