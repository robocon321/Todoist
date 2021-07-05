import React from "react";
import { StyleSheet, View, Image, Text, ScrollView} from "react-native";
import * as IMAGE from "../constants/images";
import * as ICON from "../constants/icons";
import * as COLOR from "../constants/colors";
import MenuItem from "./MenuItem";
import MenuGroup from "./MenuGroup";

export default class LeftNavigaiton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return ( 
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.wrap}>
                        <Image style={styles.avatar} source={IMAGE.avatar}/>
                        <View style={styles.info}>
                            <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                            <Text style={styles.completed}>Hoàn thành: <Text>3/5</Text></Text>
                        </View>
                    </View>
                    <MenuItem icon={ICON.inbox} leftContent="Inbox" rightContent="3" color={COLOR.blue_light}/>
                    <MenuItem icon={ICON.today} leftContent="Today" rightContent="2" color={COLOR.green_light}/>
                    <MenuItem icon={ICON.calendar} leftContent="Upcoming" rightContent="" color={COLOR.purple_light}/>
                    <MenuGroup content="Projects">
                        <MenuItem icon={ICON.dot} leftContent="Welcome" rightContent="9" color={COLOR.gray_dark}/>
                        <MenuItem icon={ICON.setting} leftContent="Manage projects" rightContent="" color={COLOR.gray_dark}/>
                    </MenuGroup>
                    <MenuGroup content="Labels">
                        <MenuItem icon={ICON.label} leftContent="a" rightContent="2" color={COLOR.gray_dark}/>
                        <MenuItem icon={ICON.label} leftContent="b" rightContent="1" color={COLOR.gray_dark}/>
                        <MenuItem icon={ICON.setting} leftContent="Manage labels" rightContent="" color={COLOR.gray_dark}/>
                    </MenuGroup>
                    <MenuGroup content="Filters">
                        <MenuItem icon={ICON.priority} leftContent="Assigned to me" rightContent="2" color={COLOR.gray_dark}/>
                        <MenuItem icon={ICON.priority} leftContent="Assigned to others" rightContent="1" color={COLOR.gray_dark}/>
                        <MenuItem icon={ICON.priority} leftContent="Priority 1" rightContent="" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.priority} leftContent="Priority 2" rightContent="2" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.priority} leftContent="Priority 3" rightContent="" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.priority} leftContent="Priority 4" rightContent="9" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.priority} leftContent="View all" rightContent="12" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.priority} leftContent="No due date" rightContent="1" color={COLOR.blue_light}/>
                        <MenuItem icon={ICON.setting} leftContent="Manage filters" rightContent="" color={COLOR.gray_dark}/>
                    </MenuGroup>         
                     <View style={styles.break}/>          
                    <MenuItem icon={ICON.setting} leftContent="Settings" rightContent="" color={COLOR.black}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    wrap:{
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: COLOR.red_light,
    },
    avatar: {
        width: 50, 
        height: 50,
        borderRadius: 50
    },
    info:{
        marginLeft: 20        
    },
    name:{
        fontSize: 18,
        color: COLOR.white,
        fontWeight: "bold"
    },
    completed: {
        fontSize: 15,
        color: COLOR.white
    },
    break:{
        height: 0.5,
        backgroundColor: COLOR.gray_light
    }
})