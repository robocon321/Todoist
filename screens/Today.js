import React from "react";
import { StyleSheet, View, StatusBar, Button, Text } from "react-native";
import TodayTopbar from "../components/TodayTopbar";
import DayTask from "../components/DayTasks";
import TaskBottomPopUp from "../components/TaskBottomPopUp";
import * as COLOR from "../constants/colors";

export default class Today extends React.Component{
    constructor(props){
        super(props);
        this.popup = React.createRef();
    }

    openSideNav = ()=>{
        this.props.navigation.openDrawer();
    }

    onShowPopup = () => {
        this.popup.current.onShowPopup();
    }

    render = () =>{
        return (
            <View style={styles.container}>
                <StatusBar />
                <TodayTopbar openSideNav={this.openSideNav}/>
                <DayTask onShowPopup={this.onShowPopup}/>
                <TaskBottomPopUp ref={this.popup}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLOR.white,
        position: "relative"
    }
})