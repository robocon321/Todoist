/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import Home from './screens/Home';
import Login from './screens/Login';
import AddLabel from './screens/AddLabel';

const store = createStore(reducer);
const App = () => {
  const Stack = createStackNavigator();
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //       initialRouteName="Login">
    //       <Stack.Screen name="Home" component={Home} />
    //       <Stack.Screen name="Login" component={Login} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <View style={styles.container}>
      <AddLabel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
