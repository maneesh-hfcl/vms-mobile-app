import React, { Children } from "react";
import {View, Text, StyleSheet} from 'react-native'
import { globalStyles } from "../../../style/globalstyle";

const TextCard = ({children,heading, flx})=>{
    return(
        <Text 
            style={heading ? [globalStyles.text_form,flx ? {flex:1}:{}]: 
                [globalStyles.text_form, globalStyles.text_form_input, flx ? {flex:1}:{}]}>
            {children}
        </Text>
    )
}

export default TextCard;

const styles = StyleSheet.create({

})