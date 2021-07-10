/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';

const App = () => {
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('account_id');
      return value;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const value = _retrieveData();
  if (value != null) {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
