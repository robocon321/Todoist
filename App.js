import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-native-paper";
import LeftNavigation from './components/LeftNavigation';
import Inbox from './screens/Inbox';
import Today from './screens/Today';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <Provider>
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator 
                drawerStyle={{width:"85%"}}
                initialRouteName="Today"  
                drawerContent={props => <LeftNavigation {...props} />}>
            <Drawer.Screen name="Today" component={Today}/>
            <Drawer.Screen name="Inbox" component={Inbox}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
