import React, { useState } from "react";
import { Text, View, StyleSheet,Alert, Modal, TouchableOpacity } from "react-native";
import { globalStyles } from "../../style/globalstyle";
import {LnkBtnCard} from "../card/lnkBtnCard";
import EventTypeListComponent from "./eventTypeListComponent";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import CloseIconComponent from "../closeIconComponent";
import TabSearchEvent from "../../navigation/tab/searchTab";

const EvtSearchBarComponent = ({navigation, pressLnkHandler})=>{
    return(
        <View>
            <View style={styles.srch_header}>
                <Text style={{flex:1}}>Filter by: </Text>
                <LnkBtnCard label='Date'
                    pressLnkHandler={pressLnkHandler}
                iconName={'date-range'} iconSize={20} iconColor={'#505050'} />                
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Type' iconName={'event-available'} iconSize={20} iconColor={'#505050'} />
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Camera' iconName={'photo-camera'} iconSize={22} iconColor={'#505050'} />
            </View>
        </View>
    )
}

export default EvtSearchBarComponent;

const styles = StyleSheet.create({
    srch_header:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e7e7e7',
        borderRadius:8,
        alignItems:'center'
        
    }

})