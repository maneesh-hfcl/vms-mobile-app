import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FormOuterCard from "./form/outerCard";
import TextCard from "./form/textCard";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { LnkBtnCard } from "./lnkBtnCard";

const ItemEventTemplate = ({elem, pressLnkHandler})=>{
    const ConverToDate = (date)=>{
        let dt = new Date(date)
        return dt.getMonth() + "/" + dt.getDay() + "/" + dt.getFullYear() 
                + " "+ dt.getHours()+":"+ dt.getMinutes()+":"+ dt.getSeconds()
    }

    return(

        <View> 
            <Text>{elem.evtname}</Text>
            <Text>{elem.evtname}</Text>
            <Text>{elem.evtname}</Text>
            <Text>{elem.evtname}</Text>
            <Text>{elem.evtime}</Text>

        </View>





            
        
    )
}

export default ItemEventTemplate;

const styles = StyleSheet.create({
    itemOuter_vw : {

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:'#e9e9e9',
        borderWidth:2,
        backgroundColor:'#fff',
        
    },
    itemText:{
        marginHorizontal:10,
        flex:0.3
    }
})