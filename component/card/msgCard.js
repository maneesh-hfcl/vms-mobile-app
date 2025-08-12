import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { globalStyles } from "../../style/globalstyle";

const MsgCardComponent = ({children, msg, fontColor})=>{
    return(
        <>
        {fontColor=="save"?(
            <View style={[globalStyles.vw_msg, {backgroundColor:'#fff', borderWidth:5,paddingVertical:15}]}>
                <Text style={[globalStyles.vw_msg_text, fontColor?{color:"red"}:{}]}> {msg} </Text>
                {children}
            </View>
            ):(
            <View style={[globalStyles.vw_msg]}>
                <Text style={[globalStyles.vw_msg_text, fontColor?{color:fontColor}:{}]}> {msg} </Text>
                {children}
            </View>
            )}

        </>
    ) 
}

export default MsgCardComponent;

const styles = StyleSheet.create({

})