import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import flatListData from '../data/flatListData';

class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
      }}>
        <View style={styles.rowsContainer}>
            <Text style={[styles.flatListItem, styles.param]}>
              {this.props.item.param}:</Text>
            <Text style={[styles.flatListItem, styles.solar]}>
              {this.props.item.solar}</Text>
        </View>
      </View>
    );  
  }  
}

export default class BasicFlatList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={flatListData}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => {
          console.log("Item =", JSON.stringify(item), "index =", item.key);
            return (
              <FlatListItem
                item={item}
                index={item.key}
              />
            );
          }}
          >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  rows: {
    flex: 1,
    //backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
  },
  flatListItem: {
    color: "white",
    padding: 10,
    fontSize: 16  
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row", 
  },
  param: {
    flex: 2,
    textAlign: "left",
    alignItems: "center",
  },
  solar: {
    flex: 3,
    textAlign: "left",  
    alignItems: "center",
  },
});
