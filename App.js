import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Login from "./screens/Login";
import Home from "./screens/Home";


export default function App() {
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("account_id");
      return value;
    } catch (error) {
        console.log(error);
        return null;
    }
  }

  const value = _retrieveData();
  if(value != null){
    return (
      <View style={styles.container}>
        <Login />
      </View>
    )
  
  }else{
    return (
      <View style={styles.container}>
        <Home />
      </View>
    )  
  }

};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }});
