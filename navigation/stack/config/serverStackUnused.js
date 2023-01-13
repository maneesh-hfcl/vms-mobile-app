import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import EditSrvrScreen from "../../../screen/configuration/server/editSrvrScreen";
import ServerScreen from "../../../screen/configuration/serverScreen";

const Stack = createNativeStackNavigator()

const serverStackUnused = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="server" component={ServerScreen}
                options={{
                    title:'Server',
                    headerShown:false
                }}
            />
            <Stack.Screen name="editServer" component={EditSrvrScreen}
                options={{
                    title:'Edit Server',
                    
                    
                }}
            />
        </Stack.Navigator>
    )
}

export default serverStackUnused;