import React from "react";
import {Text, View, StyleSheet} from 'react-native'
import MenuCardComponent from "../component/card/menuCard";
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons, Foundation, FontAwesome,Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ConfigHomeScreen = ()=>{
    return(
        <View style={globalStyles.container_login_view}>
            <View>
                <MenuCardComponent menuText='Server'>
                    <Ionicons name="server" size={24} color="black" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Workstations'> 
                    <MaterialIcons name="computer" size={24} color="purple" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Users'>
                    <FontAwesome name="user" size={24} color="blue" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Groups'>
                    <FontAwesome5 name="users" size={24} color="brown" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Objects'>
                    <FontAwesome name="object-ungroup" size={24} color="gray" />
                </MenuCardComponent>

            </View>
        </View>
    )
}

export default ConfigHomeScreen;