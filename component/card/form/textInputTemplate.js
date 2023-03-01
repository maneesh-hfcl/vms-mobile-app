import React from "react";
import {View, TextInput, StyleSheet} from 'react-native'
import { globalStyles } from "../../../style/globalstyle";

const TextInputTemplate = ({isSelect, setFocusName, setChangeText, setValErr})=>{
    return(
        <TextInput 
            style={[globalStyles.text_input,
            ,isSelect==true?{borderColor:'#8ccc83'}:{}
            ,setValErr?{borderColor:'red'}:{}    
        ]} 
            onFocus={setFocusName}
            onChangeText={setChangeText}
            defaultValue=''                         
        />

    )
}

export default TextInputTemplate;