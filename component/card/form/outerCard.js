import React from "react";  
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../../style/globalstyle";

const FormOuterCard = ({children})=>{
    return(
        <View style={[globalStyles.container_form,{}]}>
            {children}
        </View>
    )
}

export default FormOuterCard;

const styles = StyleSheet.create({

})