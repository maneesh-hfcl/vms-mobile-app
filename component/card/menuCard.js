import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const MenuCardComponent = ({children,menuText,onMenuPress})=>{
    return(
        <View style={styles.card_menu_view}>
            <TouchableOpacity onPress={onMenuPress}>
                <View style={{flexDirection:'row'}}>
                    {children}
                    <Text style={styles.card_menu_text}>{menuText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MenuCardComponent;

const styles = StyleSheet.create({
    card_menu_text:{
        marginVertical:5,
        marginHorizontal:10,
        fontSize:16
    },
    card_menu_view:{
        backgroundColor:'#dfdfdf',
        marginHorizontal:10,
        marginVertical:10,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10
    }
})