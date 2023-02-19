import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, Alert } from "react-native";
import CloseIconComponent from "../component/closeIconComponent";
import EventDataComponent from "../component/event/eventDataComponent";
import EvtSearchBarComponent from "../component/event/searchBarComponent";
import LoadingDialogComponent from "../component/loadingDialogComponent";
import TabSearchEvent from "../navigation/tab/searchTab";
import { globalStyles } from "../style/globalstyle";
import PlayVideo from "./camera/playVideo";

const EventHomeScreen = ({navigation})=>{
    const htmlPage = require("../assets/eventType.json")
    const[isModalVisible, setIsModalVisible] = useState(false)
    const[isLoadingVisible, setIsLoadingVisible] = useState(false)
    const[fltrEvnt, setFltrEvnt] = useState([])
    const[fltrCam, setFltrCam] = useState([])
    const[fltrSdt, setFltrSdt] = useState(null)
    const[fltrEdt, setFltrEdt] = useState(null)
    
    const pressLnkHandler = (type)=>{
        setIsLoadingVisible(true)
        setIsModalVisible(true)
        setIsLoadingVisible(false)
    }

    const pressDialogClose = ()=>{
        setIsModalVisible(false)
    }

    const pressChkboxItem = (type, elem)=>{
//        Alert.alert('You pressed the checkbox')
        if(type == 'event')
        {
            fltrEvnt.push(elem.name)
            setFltrEvnt(fltrEvnt)
        }

    }

    const pressLnkHandlerBtn = (type, elem)=>{
        setIsLoadingVisible(false)
        navigation.navigate('EventDetails',{type:type, elem:elem})
    }

    return(
        <View style={[globalStyles.container_main,{backgroundColor:'#fff'}]}>
            <View style={{marginHorizontal:10, marginBottom:10}}>
                <EvtSearchBarComponent fltrEvnt={fltrEvnt} fltrCam={fltrCam} pressLnkHandler={pressLnkHandler} />
            </View>
            <EventDataComponent pressLnkHandler={pressLnkHandlerBtn} />
            <LoadingDialogComponent isVisible={isLoadingVisible} />
            {
                <Modal animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    
                >
                    <Pressable style={{flex:0.5, backgroundColor:'#fff', opacity:0.7}} onPress={pressDialogClose}>
 
                    </Pressable>
                    <View style={[styles.modal_dialog]}>

                        <TabSearchEvent pressChkboxItem={pressChkboxItem} />
                    </View>
        
                </Modal>
            }

        </View>

    )
}

export default EventHomeScreen;

const styles = StyleSheet.create({
    modal_dialog:{
          borderRadius:25,
          backgroundColor:'#fff',
            flex:1,
     //   borderTopRightRadius:10,
  
        borderWidth:1,
        borderColor:"#e7e7e7",
        paddingHorizontal:10,
        paddingVertical:10,
        
    }
})