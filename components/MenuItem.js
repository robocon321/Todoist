import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as COLOR from "../constants/colors";
import * as OTHER from "../constants/others";

export default class MenuItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {icon, leftContent, rightContent, color} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrap}>
                    <Image style={styles.image(color)} source ={icon}/>
                    <Text style={styles.textLeft}>{leftContent}</Text>
                </View>
                <Text style={styles.textRight}>{rightContent}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: OTHER.HEIGHT_MENU,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    wrap:{
        flexDirection: "row"
    },
    image: (color)=>{
        return {
            width: 30,
            height: 30,
            tintColor: color
        }
    },
    textLeft:{
        fontSize: 20,
        marginLeft: 20
    },
    textRight:{
        fontSize: 20,
        color: COLOR.gray_dark
    }
})
