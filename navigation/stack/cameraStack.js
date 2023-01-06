import React from "react";
import {View, Text} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraHomeScreen from "../../screen/cameraHomeScreen";
import LiveScreen from "../../screen/camera/liveScreen";

const Stack = createNativeStackNavigator()

const CameraStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="cameraHome" component={CameraHomeScreen} options={{headerShown:false}}  />
            <Stack.Screen name="live" component={LiveScreen}
                options={{
                    title: 'Select camera in tile to play'
                }}
            />
        </Stack.Navigator>
    )
}

export default CameraStack;