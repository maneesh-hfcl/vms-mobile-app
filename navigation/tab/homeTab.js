import React from "react";
import {View, Text, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import CameraStack from "../stack/cameraStack";
import ConfigStack from "../stack/configStack";
import { globalStyles } from "../../style/globalstyle";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import EventHomeScreen from "../../screen/eventHomeScreen";
import MoreHomeScreen from "../../screen/moreHomeScreen";
import EventStack from "../stack/eventStack";
import EmergencyStack from "../stack/emergencyStack";

const Tab = createBottomTabNavigator();

const CameraScreen = ()=>{
    return(
        <View>
            <Text>Camera screen</Text>
        </View>
    )
}

const ConfigScreen = ()=>{
    return(
        <View>
            <Text>Configuration screen</Text>
        </View>
    )
}

const LogoTitle = (route)=>{
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Camera';
   // console.log(routeName)
    if(routeName == 'Camera' || routeName == 'cameraHome' )
        return true
    else
        return false    
}

const TabHome = ({navigation})=>{

    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{paddingVertical:5},
            tabBarLabelStyle:{paddingVertical:3,fontSize:11}
            
            }}>
            <Tab.Screen name="Camera" component={CameraStack}  
                options={({route})=>({
                    title: route.name,
                   // headerShown:LogoTitle(route) ,
                    tabBarLabel:'Camera',
                    tabBarIcon:()=> <Entypo name="video-camera" size={20} color="black" />
                    
                })}
            />
            <Tab.Screen name="Config" component={ConfigStack} 
                options={{title:'Configuration', 
                        tabBarLabel:'Config',
                        tabBarIcon:()=> <Ionicons name="settings" size={20} color="black" />
                    }} 
                /> 
            <Tab.Screen name="Events" component={EventStack}
                options={{
                    tabBarIcon:()=>(<MaterialIcons name="event-available" size={20} color="black" />)
                }}
            />
            <Tab.Screen name="Emergency" component={EmergencyStack}
                options={{
                    tabBarIcon:()=>(<MaterialIcons name="railway-alert" size={20} color="red" />)
                }}
            />
            <Tab.Screen name="More" component={MoreHomeScreen}
                options={{
                    tabBarIcon:()=>(<Feather name="more-horizontal" size={20} color="black" />)
                }}
            />    
        </Tab.Navigator>
    )
}

export default TabHome;