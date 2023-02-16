import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const CloseIconComponent = ({alignPos, pressDialogClose})=>{
    return(
        <TouchableOpacity onPress={pressDialogClose} style={{alignItems:alignPos}}>
            <Ionicons name="close" size={24} color="black" style={{marginHorizontal:0, marginVertical:0}} />
        </TouchableOpacity>
    )
}

export default CloseIconComponent;