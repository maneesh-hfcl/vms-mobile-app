import React from "react";
import {View, Text, StyleSheet, Pressable} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const NavHeaderIcon = ({title, iconName, pressHeaderHandler})=>{
    return(
        <View style={styles.header_outer}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.header_text}>{title}</Text>
            </View>

        </View>
    )
}

export default NavHeaderIcon;

const styles = StyleSheet.create({
    header_outer:{
        flex:0.9,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',

    },
    header_text:{
        color:'black',
        fontSize:16,
        fontWeight:'600'
    }
})