import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import Topbar from "../components/Topbar";
import DayTask from "../components/DayTasks";

export default class Today extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar />
                <Topbar />
                <DayTask />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    }
})