import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../style/globalstyle";
import PlayVideo from "./camera/playVideo";

const EventHomeScreen = ()=>{
    return(
        <View style={globalStyles.container_main}>
            <Text>Event home screen</Text>
            <PlayVideo />
        </View>

    )
}

export default EventHomeScreen;

const styles = StyleSheet.create({

})