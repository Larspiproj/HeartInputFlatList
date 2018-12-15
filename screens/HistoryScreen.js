import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      refreshing: false,
      dataSource: [],
      id: null,
    }
  };

  componentDidMount() {
    console.log("historyScreen componentDidMount")  
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    console.log("id: ", id);
    this.setState({
      id: id,  
    });
    this._historyAnalysis();
  };

  _historyAnalysis = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        if (keys.length<1) {
          console.log("keys empty");
        }
        console.log("getAllKeys: ", keys);
        let filtered = [];
        let keysSorted = [];
        //const kolesterol = [];
        const values = [];
        const keyArray = [];
        const remove = ["nextKey", "nextId", "latestKey"]
        const history = [];

        filtered = keys.filter(
          function(value) {
            return this.indexOf(value) < 0;
          },
          remove
        );

        keysSorted = filtered.sort(function(a, b){return a-b});

        const items = await AsyncStorage.multiGet((keysSorted), (error, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          keyArray.push(key);
          let value = JSON.parse(store[i][1]);
          values.push(value);
        });
        });
        for(var i = 0; i < values.length; i++) {
          let date = values[i][0];
          let parameter = values[i][this.state.id%10];
          history.push(parameter);
        }
        const dataSource = history;
        console.log("dataSource from HistoryScreen: ", dataSource);
        this.setState ({
          isLoading: false,
          refreshing: false,
          dataSource: dataSource,  
        });
    }

    catch(error) {
      console.log("error _historyAnalysis: ", error);  
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,  
    },
    () => {
      this._historyAnalysis(); 
    });  
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",  
          backgroundColor: "#ced0ce",
          marginLeft: "5%",
        }}
      />
    );  
  };

  render() {
    const { navigation } = this.props;
    const analysis = navigation.getParam('analysis');
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={header.headerContainer}>
          <View style={header.headerLeft}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Text>
              <AntDesign name="left" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>{ analysis }</Text>
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
        <View style={styles.flatListContainer}>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            renderItem={({item}) => 
              <View style={{
                flex: 1,
                //backgroundColor: this.props.index % 2 == 0 ? '#fdfdfd' : '#990000'  
              }}>
                <View style={styles.rowsContainer}>
                  <Text style={styles.analysis}>
                    {item.date}</Text>
                  <Text style={styles.result}>
                    {item.result}</Text>
                </View>
              </View>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fdfdfd',
    alignItems: 'stretch',
    //justifyContent: 'flex-end',
  },
  //rows: {
    //flex: 1,
    //backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
  //},
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    //borderBottomWidth: 2,
    //borderBottomColor: 'black',
  },
  flatListContainer: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  flatListItem: {
    //color: "white",
    padding: 10,
    marginLeft: 10,
    //fontSize: 16  
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row", 
  },
  analysisContainer: {
    flex: 3,
    flexDirection: 'column',  
  },
  analysis: {
    flex: 3,
    textAlign: "left",
    alignItems: "center",
    padding: 15,
    marginLeft: 10,
    fontSize: 18,
  },
  /*
  analysis: {
    flex: 1,
    textAlign: "left",
    alignItems: "center",
    fontSize: 18,
  },
  result: {
    flex: 2,
    textAlign: "left",  
    alignItems: "center",
    fontSize: 20,
  },
  */
  result: {
    flex: 2,
    textAlign: "left",  
    alignItems: "center",
    padding: 15,
    marginLeft: 10,
    fontSize: 20,
  },
  btn: {
    //flex: 1,
    alignSelf: 'center',
    //backgroundColor: '#01c853',  
    backgroundColor: '#008000',  
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: 200,
    borderRadius: 10,
    //elevation: 5,
  },
  /*
  dateText: {
    justifyContent: 'flex-end',
    marginLeft: 25,
    color: '#ced0ce',
  },
  */
});

export default HistoryScreen;
