import { StatusBar } from 'expo-status-bar';
import React,{useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, FAB } from "react-native-paper";
import LeftNavigation from './components/LeftNavigation';
import TaskBottomPopUp_Add from './components/TaskBottomPopUp_Add';
import Inbox from './screens/Inbox';
import Today from './screens/Today';
import * as COLOR from "./constants/colors";

export default function App() {
  const Drawer = createDrawerNavigator();
  const addTaskPopup = useRef(null);

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
        <TaskBottomPopUp_Add ref={addTaskPopup} />
        <FAB  
          color={"white"}   
          style={styles.fab}
          icon="plus"
          onPress={()=>addTaskPopup.current.onShowPopup()}/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.red_light
  },
});
