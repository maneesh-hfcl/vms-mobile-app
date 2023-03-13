import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { globalStyles } from "../../style/globalstyle";

const MsgCardComponent = ({children, msg})=>{
    return(
        <View style={globalStyles.vw_msg}>
            <Text style={globalStyles.vw_mst_text}> {msg} </Text>
            {children}
        </View>
    )
}

export default MsgCardComponent;

const styles = StyleSheet.create({

})