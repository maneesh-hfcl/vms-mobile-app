import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../../style/globalstyle";

const FormBtn = ({children, text, pressHandlerBtn})=>{
    return(
        <View style={{justifyContent:'flex-end'}}>
        <TouchableOpacity style={[{flexDirection:'row'}, globalStyles.form_btn]}
            onPress={pressHandlerBtn}
        >
            {children}
            <Text style={globalStyles.form_btn_text}>{text}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default FormBtn;

const styles = StyleSheet.create({})