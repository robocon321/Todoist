import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Modal, TouchableWithoutFeedback } from "react-native";
import * as COLOR from "../constants/colors";
import * as ICON  from "../constants/icons";

const {height} = Dimensions.get("window");
export default class TaskBottomPopUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bottom: 0,
            currentPopUpY: 0,
            visible: true
        }
    }

    onPress = (e) =>{
        const {locationY} = e.nativeEvent
        this.setState({
            ...this.state,
            currentPopUpY: locationY
        })
        
    }

    onMove = (e) =>{
        const {pageY} = e.nativeEvent
        const {currentPopUpY} = this.state
        this.setState({
            ...this.state,
            bottom: height - pageY - (this.heightComponent - currentPopUpY)
        })
    }

    onRelease = (e) =>{
        const {bottom} = this.state;
        if(bottom < this.levelBottom[0]) {
            this.setState({
                ...this.state,
                bottom : -this.heightComponent,
                visible: false
            })
        }else if(bottom > this.levelBottom[0] && bottom < this.levelBottom[1]+150){
            this.setState({
                ...this.state,
                bottom : this.levelBottom[1]
            })
        }else {
            this.setState({
                ...this.state,
                bottom : this.levelBottom[2]
            })
        }
    }

    onShowPopup = () =>{
        this.setState({
            ...this.state,
            bottom: this.levelBottom[1]
        })
    }

    onClosePopup = ()=>{
        this.setState({
            ...this.state,
            visible: false
        })
    }

    onLayout = (e) =>{
        const {layout} = e.nativeEvent;
        this.heightComponent = layout.height
        this.levelBottom = [-this.heightComponent/1.5, -this.heightComponent/2+30, 0]
    } 

    render(){
        const {bottom, visible} = this.state;
        return (
            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "#000000AA",
                    justifyContent: "flex-end"
                }}>
                    <TouchableWithoutFeedback onPress={this.onClosePopup}>
                        <View style={{flex: 1, width: "100%"}}></View>
                    </TouchableWithoutFeedback>
                    <View 
                        style={[styles.container, {bottom: bottom}]} 
                        onLayout={this.onLayout}
                        onStartShouldSetResponder={()=>true}
                        onMoveShouldSetResponder={()=>true}
                        onResponderGrant={this.onPress}
                        onResponderRelease={this.onRelease}
                        onResponderMove={this.onMove}
                    >
                        <View style={styles.project}>
                            <Image style={styles.iconProject} source={ICON.inbox}/>
                            <Text style={styles.textProject}>Inbox</Text>
                        </View>
                        <View style={styles.wrap}>
                            <View style={styles.row}>
                                <Image style={styles.check} source={ICON.o}/>
                                <View style={styles.col2}>
                                    <Text style={styles.title}>Read book</Text>
                                    <View style={styles.time}>
                                        <Image style={styles.iconTime} source={ICON.yesterday}/>
                                        <Text style={styles.textTime}>Yesterday</Text>
                                    </View>
                                    <View style={styles.label}>
                                        <Text style={styles.labelItem}>a</Text>
                                        <Text style={styles.labelItem}>b</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Image style={[styles.iconOption, {marginRight: 30}]} source={ICON.label}/>
                                        <Image style={[styles.iconOption, {marginRight: 30}]} source={ICON.flag}/>
                                        <Image style={[styles.iconOption, {marginRight: 30}]} source={ICON.alarm}/>
                                        <Image style={[styles.iconOption, {marginRight: 30}]} source={ICON.comment}/>                            
                                    </View>
                                </View>
                            </View>
                            <View style={styles.col3}>
                                <Image style={styles.iconOption} source={ICON.option}/>
                            </View>
                        </View>
                        <View>
                            <View style={styles.sub}>
                                <Image style={styles.iconSub} source={ICON.branch}/>
                                <Text style={styles.titleSub}>Sub-tasks</Text>
                            </View>
                            <View>
                                <View style={{marginLeft: 40}}>
                                    <View style={styles.sub}>
                                        <Image style={styles.iconSub} source={ICON.o}/>
                                        <Text style={styles.titleSub}>To do Item</Text>
                                    </View>
                                    <View style={[styles.row, {marginLeft: 60, alignItems: "center", paddingBottom: 10}]}>
                                        <View style={[styles.row, {alignItems: "center"}]}>
                                            <Image style={styles.imgCmtSub} source={ICON.comment}/>
                                            <Text style={styles.textCmtSub}>0</Text>
                                        </View>
                                        <View style={[styles.row, {alignItems: "center"}]}>
                                            <Image style={styles.imgCmtSub} source={ICON.branch}/>
                                            <Text style={styles.textCmtSub}>0/2</Text>
                                        </View>
                                    </View>             
                                    <View style={styles.sub}>
                                        <Image style={[styles.iconSub,{tintColor: COLOR.gray_dark}]} source={ICON.add}/>
                                        <Text style={[styles.titleSub,{color: COLOR.gray_dark}]}>Add sub-task</Text>
                                    </View>                        
                                </View>
                            </View>
                        </View>                
                    </View>

                </View>
            </Modal>

        )
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection: "row"
    },
    container: {
        position: "absolute",
        width: "100%",
        height: 500,
        backgroundColor: COLOR.white,
        elevation: 4,
        borderRadius: 20,
    }, 
    wrap:{
        flexDirection:"row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    project: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 20
    },
    iconProject:{
        width: 30,
        height: 30,
        tintColor: COLOR.blue_dark
    },
    textProject:{
        color: COLOR.black,
        fontSize: 20,
        marginLeft: 20
    },
    check: {
        width: 35,
        height: 35,
        tintColor: COLOR.black,
        borderRadius: 50,
        backgroundColor: "#fff5f5"
    },
    col2:{
        paddingHorizontal: 10
    },
    title:{
        paddingVertical: 0,
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10
    },
    time: {
        width: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR.gray_dark,
    },
    iconTime:{
        width: 15,
        height: 15,
        tintColor: COLOR.red_light
    },
    textTime:{
        color: COLOR.red_light,
        fontSize: 15,
        marginLeft: 5
    },
    label:{
        flexDirection: "row",
        marginBottom: 20
    },
    labelItem:{
        width: 40,
        height: 40,
        marginRight: 10,
        paddingTop: 5,
        fontSize: 20,
        textAlign: "center",
        borderRadius: 5,
        backgroundColor: COLOR.gray_light,
        color: COLOR.black
    },
    col3:{
        flexDirection:"row",
        alignSelf: "flex-end"
    },
    iconOption:{
        width: 30,
        height: 30,
        tintColor: COLOR.gray_dark
    },

    sub: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: COLOR.gray_light,
        borderTopWidth: 1
    },
    iconSub:{
        width: 20,
        height: 20,
        tintColor: COLOR.black
    },
    titleSub:{
        color: COLOR.black,
        fontSize: 20,
        marginLeft: 20
    },
    imgCmtSub:{
        width: 20,
        height: 20,
        tintColor: COLOR.gray_dark,
        marginRight: 5
    },
    textCmtSub:{
        fontSize: 20,
        color: COLOR.gray_dark,
        marginRight: 20
    }
})