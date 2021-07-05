import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Today from './screens/Today';
import LeftNavigaiton from './components/LeftNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <LeftNavigaiton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
