import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const MenuCardComponent = ({children,menuText,onMenuPress})=>{
    return(
        <View style={styles.card_menu_view}>
            <TouchableOpacity onPress={onMenuPress}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:0.15}}>
                        {children}
                    </View>
                    <Text style={styles.card_menu_text}>{menuText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MenuCardComponent;

const styles = StyleSheet.create({
    card_menu_text:{
        fontSize:16,
        flex:1,
        marginHorizontal:5,
        alignSelf:'center'
    },
    card_menu_view:{
        backgroundColor:'#f7f7f7',
        marginHorizontal:10,
        marginVertical:10,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#e7e7e7'
    }
})