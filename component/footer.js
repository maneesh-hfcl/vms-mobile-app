import React from "react";
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import { globalStyles } from "../style/globalstyle";

const FooterScreen = ()=>{
    
    return(
        <View style={[styles.container, {flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}]}>
            <Text style={{color:'lightgray' }}>© HFCL, ver 1.0.5</Text>
        </View>
    )
}

export default FooterScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        paddingVertical:7,
        alignItems:'center'
    }
})