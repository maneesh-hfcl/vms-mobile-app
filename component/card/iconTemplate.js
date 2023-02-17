import React from "react";
import { Text, View, StyleSheet } from "react-native";

const IconTemplateComponent = ()=>{
    return(
        <View>
            <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
        </View>
    )
}

export default IconTemplateComponent;