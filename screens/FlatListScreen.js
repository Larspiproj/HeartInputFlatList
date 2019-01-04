import React, { Component } from 'react';
import { Alert, Image, ActivityIndicator, AsyncStorage, TouchableOpacity,
        FlatList, StyleSheet, Text, View } from 'react-native';

//import FocusStateLabel from './withNavigationFocus';
import header from '../styles/header.js';
import { AntDesign } from '@expo/vector-icons';

class FlatListScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      refreshing: false,
      dataSource: [] 
    }
  };

  componentDidMount() {
    console.log("FlatListScreen componentDidMount")  
    //this._initialState().done();
    this._latestAnalysis();
  };

  componentDidUpdate() {
    console.log("FlatListScreen componentDidUpdate");  
  };

  /*
  _initialState = async() => {
    try {
      const nextKey = await AsyncStorage.getItem('nextKey');
      if (!nextKey) {
        await AsyncStorage.multiSet([['nextKey', JSON.stringify(0)],
        ['nextId', JSON.stringify(0)]])
        .then(() =>
          this.setState ({
            id: 0,
            key: 0 
          }));
      }  
    }
    catch(error) {
      console.log("error _initialState: ", error);  
    }
  }

  _latestAnalysis = async() => {
    try {
        const latestKey = await AsyncStorage.getItem('latestKey');
        if (!latestKey) {
          //alert("No values to show yet");
          this.setState ({
            isLoading: false,
            refreshing: false,  
            dataSource: [{analysis: "No data yet.", result: "Go to inputs", id: 0}],
          });
        } else {
          const latestValues = await AsyncStorage.getItem(latestKey.toString());
          const dataSource = JSON.parse(latestValues);
          this.setState ({
            isLoading: false,
            refreshing: false,
            dataSource: dataSource,  
          });
        }
    }

    catch(error) {
      console.log("error _latestAnalysis: ", error);  
    }
  };
  */

  _latestAnalysis = async() => {
    try {
        const latestKey = await AsyncStorage.getItem('latestKey');
        if (!latestKey) {
          this.setState ({
            isLoading: false,
            refreshing: false,  
            dataSource: [{analysis: "No data yet.", result: "Go to inputs", id: 0}],
          });
        } else {
          const latestValues = await AsyncStorage.getItem(latestKey.toString());
          const dataSource = JSON.parse(latestValues);
          this.setState ({
            isLoading: false,
            refreshing: false,
            dataSource: dataSource,  
          });
        }
    }

    catch(error) {
      console.log("error _latestAnalysis: ", error);  
    }
  };

  _handleRefresh = () => {
    this.setState({
      refreshing: true,  
    },
    () => {
      this._latestAnalysis();  
    });  
  };

  _renderSeparator = () => {
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
    console.log("FlatListScreen render executed");
    //console.log("dataSource from FlatListScreen: ", this.state.dataSource);
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
            <Image
              source={require('../images/heart.jpeg')}
              style={{ width: 32, height: 30 }}  
            />
          </View>
          <View style={header.headerCenter}>
            <Text style={{fontSize: 18}}>Senaste värden</Text>
          </View>
          <View style={header.headerRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Help')}>
              <Text>
              <AntDesign name="question" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            //ListEmptyComponent={() => Alert.alert("No Data")}
            data={this.state.dataSource}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this._renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this._handleRefresh}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => {
              console.log("Item =", JSON.stringify(item), "index =", item.id);
              this.props.navigation.navigate('Analysis', {
                  analysis: item.analysis,
                  key: item.key,
                  result: item.result,
                  date: this.state.dataSource[0].result,
                  id: item.id,
              });
            }}
            >
              <View style={{
                flex: 1,
                //backgroundColor: this.props.index % 2 == 0 ? '#fdfdfd' : '#990000'  
              }}>
                <View style={styles.rowsContainer}>
                  <Text style={styles.analysis}>
                    {item.analysis}</Text>
                  <Text style={styles.result}>
                    {item.result}</Text>
                  <TouchableOpacity onPress={() => {
                    Alert.alert("Button Pressed");}}>
                    <Text>Button</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
  flatListContainer: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row", 
  },
  analysis: {
    flex: 3,
    textAlign: "left",
    alignItems: "center",
    padding: 15,
    marginLeft: 10,
    fontSize: 18,
  },
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
  },
});

export default FlatListScreen;
