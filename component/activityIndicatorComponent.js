import React from "react";
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { globalStyles } from "../style/globalstyle";

const ActivityIndicatorComponent = ()=>{
    return(
        <View style={{alignItems:'center', marginVertical:20}}>
            <ActivityIndicator />
            <Text style={globalStyles.card_cam_text_empty}>Loading</Text>
        </View>
    )
}

export default ActivityIndicatorComponent;

