import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import InboxTopbar from "../components/InboxTopbar";
import Task from "../components/Task";

export default class Inbox extends React.Component{
    constructor(props){
        super(props);
    }

    openSideNav = ()=>{
        this.props.navigation.openDrawer();
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar />
                <InboxTopbar openSideNav={this.openSideNav}/>
                <Task />
                <Task />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    }
})