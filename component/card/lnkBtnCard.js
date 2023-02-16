import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export const LnkBtnCard = ({label, iconSize, iconName, iconColor, pressLnkHandler})=>{
    return(
        <Pressable onPress={() => pressLnkHandler(label)} style={styles.lnk_outer}>
            <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
            <Text style={styles.lnk_text}>{label}</Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    lnk_outer:{
        marginHorizontal:5,
        marginVertical:5,
        borderWidth:1,
        borderColor:'#d7d7d7',
        borderRadius:10,
        backgroundColor:'#e7e7e7',
        flexDirection:'row',
        paddingVertical:3,
        paddingHorizontal:5,
        alignItems:'center'
    },
    lnk_text:{

        marginHorizontal:5,
        marginVertical:5,
        color:'black'
    }
})