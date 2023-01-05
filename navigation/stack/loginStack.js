import React from "react";
import {View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../screen/loginScreen";
import HomeScreen from "../../screen/homeScreen";
import TabHome from "../tab/homeTab";


const Stack = createNativeStackNavigator()

const StackLogin = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={TabHome} />
        </Stack.Navigator>
    )
}

export default StackLogin;