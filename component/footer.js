import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const FooterScreen = ()=>{
    return(
        <View style={styles.container}>
            <Text style={{color:'lightgray'}}>Copyright @ 2024, HFCL, ver 1.0.4</Text>
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