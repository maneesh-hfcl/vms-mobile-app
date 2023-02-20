import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export const LnkBtnCard = ({children,label, iconSize, iconName, iconColor, pressLnkHandler, color, labelColor})=>{
    return(
        <View style={[styles.lnk_outer,color?{backgroundColor:color}:{}]}>
            <Pressable onPress={() => pressLnkHandler(label)} style={{flexDirection:'row', alignItems:'center'}} >
                <MaterialIcons name={iconName} size={iconSize} color={iconColor} style={{}} />
                { label != '' && 
                    <Text style={[styles.lnk_text,{color:labelColor},
                        iconName=='app-registration'?{fontSize:15, marginVertical:8,paddingHorizontal:5}:''
                    ]}>{label}</Text>
                }
            </Pressable>
            {children}
        </View>    
    )
}

const styles = StyleSheet.create({
    lnk_outer:{
        marginHorizontal:5,
        marginVertical:0,
        borderWidth:1,
        borderColor:'#b7b7b7',
        borderRadius:10,
        backgroundColor:'#c7c7c7',
        flexDirection:'row',
        paddingVertical:1,
        paddingHorizontal:1,
        alignItems:'center'
    },
    lnk_text:{
        marginLeft:1,
        marginRight:6,
        marginVertical:2,
        color:'black',
        fontSize:13   
    }
})