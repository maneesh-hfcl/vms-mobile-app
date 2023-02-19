import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigHomeScreen from "../../screen/configHomeScreen";
import ServerScreen from "../../screen/configuration/serverScreen";
import WrkstnScreen from "../../screen/configuration/wrkstnScreen";
import UserScreen from "../../screen/configuration/userScreen";
import GroupScreen from "../../screen/configuration/groupScreen";
import EditSrvrScreen from "../../screen/configuration/server/editSrvrScreen";
import NavHeaderIcon from "../../component/card/navHeaderIcon";
import { MaterialIcons } from '@expo/vector-icons';
import AddSrvrScreen from "../../screen/configuration/server/addSrvrScreen";

const Stack = createNativeStackNavigator()


const ConfigStack = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name="configHome" component={ConfigHomeScreen} options={{headerShown:false }} />
            <Stack.Screen name="server" component={ServerScreen}
                options={{
                    title:'Server'
                    
                }}
            />
            <Stack.Screen name="workstation" component={WrkstnScreen}
                options={{
                    title:'Workstation'
                }}
            />
            <Stack.Screen name="users" component={UserScreen}
                options={{
                    title:'Users'
                }}
            />
            <Stack.Screen name="group" component={GroupScreen}
                options={{
                    title:'Group'
                }}
            />
            <Stack.Screen name="editServer" component={EditSrvrScreen}
                options={{
                    title:'Edit Server'
                }}
            />
            <Stack.Screen name="addServer" component={AddSrvrScreen}
                options={{
                    title:'Add Server'
                }}
            />
        </Stack.Navigator>
    )
}

export default ConfigStack;