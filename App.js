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
import reducer from './src/reducers/index';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import AddLabel from './src/screens/AddLabel';
import AddProject from './src/screens/AddProject';
import CommentTask from './src/screens/CommentTask';

const store = createStore(reducer);
const App = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddLabel" component={AddLabel} />
          <Stack.Screen name="AddProject" component={AddProject} />
          <Stack.Screen name="CommentTask" component={CommentTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
