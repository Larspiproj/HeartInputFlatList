import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IconLeft = () => {
  return (
    <AntDesign name="left" size={30} />
  );
}

const IconQuestion = () => {
  return (
    <AntDesign name="question" size={30} />
  );
}

export { IconLeft, IconQuestion };
