import React from "react";
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity } from "react-native";
import * as COLOR from "../constants/colors";
import * as ICON from "../constants/icons";
import * as OTHER from "../constants/others"
import MenuItem from "./MenuItem";

export default class MenuGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDropdown: new Animated.Value(0)
        }
    }

    onDropdown = () => {
        if(this.state.isDropdown._value){
            Animated.timing(this.state.isDropdown, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }else{
            Animated.timing(this.state.isDropdown, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        }

    }

    render(){
        const {content, children} = this.props;
        const dropdown = this.state.isDropdown.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"]
        });
        
        const height = this.state.isDropdown.interpolate({
            inputRange: [0, 1],
            outputRange: [0,OTHER.HEIGHT_MENU*children.length]
        });
        return (
            <View>
                <View style={styles.wrap}>
                    <Text style={styles.text}>{content}</Text>
                    <View style={styles.wrapImage}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onDropdown}>
                            <Animated.Image source={ICON.down} style={[styles.image, {
                                transform: [{rotateZ: dropdown}]
                            }]}/>
                        </TouchableOpacity>
                        <Image source={ICON.add} style={styles.image} />
                    </View>
                </View>
                <Animated.View style={styles.dropdown(height)}>
                    {children}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap:{
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    text:{
        fontSize: 20,
        fontWeight: "bold"
    },
    wrapImage:{
        flexDirection: "row"
    },
    image:  {
        width: 30,
        height: 30,
        tintColor: COLOR.gray_dark,
        padding: 20
    },
    dropdown: (height)=> {
        return {
            overflow: "hidden",
            height: height
        }
    
    }
})
