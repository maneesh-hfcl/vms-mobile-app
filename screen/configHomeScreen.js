import React, { useEffect } from "react";
import {Text, View, StyleSheet} from 'react-native'
import MenuCardComponent from "../component/card/menuCard";
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons, Foundation, FontAwesome,Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Device from 'expo-device'
import  Constants  from "expo-constants";
import * as Cellular from 'expo-cellular'

const ConfigHomeScreen = ({navigation})=>{

    useEffect(()=>{
        console.log(Device.brand)
        console.log(Device.designName)
        console.log(Device.deviceName)
        console.log(Device.modelId)
        console.log(Device.totalMemory)
        console.log(Device.modelName)
        console.log(Constants.sessionId)
    },[])

    const pressMenuHandler = (menu)=>{
        navigation.navigate(menu)
    }

    return(
        <View style={[globalStyles.container_login_view, {backgroundColor:'#fff'}]}>
            <View>
                <MenuCardComponent menuText='Server' onMenuPress={() => pressMenuHandler('server')}>
                    <Ionicons name="server" size={24} color="black" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Workstation' onMenuPress={() => pressMenuHandler('workstation')}> 
                    <MaterialIcons name="computer" size={24} color="purple" />
                </MenuCardComponent>
                <MenuCardComponent menuText='User' onMenuPress={() => pressMenuHandler('users')}>
                    <FontAwesome name="user" size={24} color="blue" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Group' onMenuPress={() => pressMenuHandler('group')}>
                    <FontAwesome5 name="users" size={22} color="brown" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Object'>
                    <FontAwesome name="object-ungroup" size={22} color="gray" />
                </MenuCardComponent>

            </View>
        </View>
    )
}

export default ConfigHomeScreen;