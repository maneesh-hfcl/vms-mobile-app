import React from "react";
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

import LoadingDialogComponent from "../../../component/loadingDialogComponent";
import { globalStyles } from "../../../style/globalstyle";


const AddSrvrScreen = ()=>{
    return (
        <View style={globalStyles.container_main}>
            <Text>Add server screen</Text>
            <TextInput />
        </View>
    )
}

export default AddSrvrScreen;