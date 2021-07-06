import React from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import * as ICON from "../constants/icons";
import * as COLOR from "../constants/colors";

export default class Task extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {onShowPopup} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>onShowPopup()}>
                <View style={styles.container}>
                    <View style={styles.left}>
                        <Image style={styles.check} source={ICON.o}/>
                        <View style={styles.col2}>
                            <Text style={styles.title}>Read book</Text>
                            <View style={styles.yesterday}>
                                <Image style={styles.iconYesterday} source={ICON.yesterday}/>
                                <Text style={styles.textYesterday}>Yesterday</Text>
                            </View>
                            <View style={styles.label}>
                                <Text style={styles.labelItem}>a</Text>
                                <Text style={styles.labelItem}>b</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.col3}>
                        <Text style={styles.textInbox}>Inbox</Text>
                        <Image style={styles.iconInbox} source={ICON.inbox}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginLeft: 20,
        paddingVertical: 15,
        paddingRight: 20,
        justifyContent: "space-between",
        borderBottomColor: COLOR.gray_light,
        borderBottomWidth: 1
    },
    left:{
        flexDirection: "row"
    },
    check: {
        width: 35,
        height: 35,
        tintColor: COLOR.red_light,
        borderRadius: 50,
        backgroundColor: "#fff5f5"
    },
    col2:{
        paddingHorizontal: 10
    },
    title:{
        paddingVertical: 5,
        fontSize: 20
    },
    yesterday: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    iconYesterday:{
        width: 15,
        height: 15,
        tintColor: COLOR.red_light
    },
    textYesterday:{
        color: COLOR.red_light,
        fontSize: 15,
        marginLeft: 5
    },
    label:{
        flexDirection: "row"
    },
    labelItem:{
        color: COLOR.gray_dark,
        fontSize: 20,
        paddingRight: 10
    },
    col3:{
        flexDirection:"row",
        alignSelf: "flex-end"
    },
    textInbox:{
        fontSize: 15,
        color: COLOR.gray_dark,
        marginRight: 10
    },
    iconInbox:{
        width: 20,
        height: 20,
        tintColor: COLOR.gray_dark
    }
})
