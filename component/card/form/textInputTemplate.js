import React from "react";
import {View, TextInput, StyleSheet} from 'react-native'
import { globalStyles } from "../../../style/globalstyle";

const TextInputTemplate = ({isSelect, setFocusName, setChangeText, setValErr,password})=>{
    const pass = password == null?false: true;
    return(
        <TextInput 
            style={[globalStyles.text_input,
            ,isSelect==true?{borderColor:'#8ccc83'}:{}
            ,setValErr?{borderColor:'red'}:{}    
        ]} 
            onFocus={setFocusName}
            onChangeText={setChangeText}
            defaultValue=''   
            secureTextEntry = {pass}                      
        />

    )
}

export default TextInputTemplate;