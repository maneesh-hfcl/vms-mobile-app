import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { globalStyles } from "../../style/globalstyle";

const HeaderCardComponent = ({children})=>{
    return(
        <View style={globalStyles.container_header}>
            {children}
        </View>
    )
}

export default HeaderCardComponent;

const styles = StyleSheet.create({

})

