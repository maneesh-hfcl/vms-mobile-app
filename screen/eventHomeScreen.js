import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from "react-native";
import CloseIconComponent from "../component/closeIconComponent";
import EvtSearchBarComponent from "../component/event/searchBarComponent";
import TabSearchEvent from "../navigation/tab/searchTab";
import { globalStyles } from "../style/globalstyle";
import PlayVideo from "./camera/playVideo";

const EventHomeScreen = ()=>{
    const htmlPage = require("../assets/eventType.json")
    const[isModalVisible, setIsModalVisible] = useState(false)
    
    const pressLnkHandler = (type)=>{
        
          setIsModalVisible(true)
    }

    const pressDialogClose = ()=>{
        setIsModalVisible(false)
    }



    return(
        <View style={globalStyles.container_main}>
            <EvtSearchBarComponent pressLnkHandler={pressLnkHandler} />
           
            {
                <Modal animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onb
                >
                    <Pressable style={{flex:0.5}} onPress={pressDialogClose}>
 
                    </Pressable>
                    <View style={[styles.modal_dialog]}>

                        <TabSearchEvent />
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