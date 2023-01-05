import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigHomeScreen from "../../screen/configHomeScreen";

const Stack = createNativeStackNavigator()

const ConfigStack = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="configHome" component={ConfigHomeScreen} />
        </Stack.Navigator>
    )
}

export default ConfigStack;