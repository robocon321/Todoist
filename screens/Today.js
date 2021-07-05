import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import TodayTopbar from "../components/TodayTopbar";
import DayTask from "../components/DayTasks";

export default class Today extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar />
                <TodayTopbar />
                <DayTask />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    }
})