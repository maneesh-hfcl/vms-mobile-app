import React, { Children } from "react";
import {View, Text, StyleSheet} from 'react-native'
import { globalStyles } from "../../../style/globalstyle";

const TextCard = ({children,heading, flx, align})=>{
    return(
        <Text 
            style={heading ? [globalStyles.text_form, (align == 'right') ? {justifyContent:'flex-end', alignItems:'flex-end'
            , flex:1, textAlign:'right'}:
            {flex:1}]: 
                [globalStyles.text_form, globalStyles.text_form_input,(align == 'right') ? {justifyContent:'flex-end', alignItems:'flex-end'
                , flex:1, textAlign:'right'}:
                {flex:1}]}>
            {children}
        </Text>
    )
}   

export default TextCard;

const styles = StyleSheet.create({

})