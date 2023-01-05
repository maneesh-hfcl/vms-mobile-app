import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import CameraStack from "../stack/cameraStack";
import ConfigStack from "../stack/configStack";
import { globalStyles } from "../../style/globalstyle";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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

const EventScreen = ()=>{
    return(
        <View>
            <Text>Event screen</Text>
        </View>
    )
}

const MoreScreen = ({navigation})=>{
    const pressHandler = ()=>{
        navigation.navigate('Login')
    }
    return(
        <View style={globalStyles.container_login_view}>
            <Text style={[globalStyles.text,{alignSelf:'center'}]}>Click to logout from the application</Text>
            <TouchableOpacity style={[globalStyles.touchable_btn, globalStyles.touchable_btn_logout]} onPress={pressHandler}>
                <Text style={globalStyles.text_btn}>Logout</Text>
            </TouchableOpacity>
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
                    headerShown:LogoTitle(route) ,
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
            <Tab.Screen name="Events" component={EventScreen}
                options={{
                    tabBarIcon:()=>(<MaterialIcons name="event-available" size={20} color="black" />)
                }}
            />
            <Tab.Screen name="More" component={MoreScreen}
                options={{
                    tabBarIcon:()=>(<Feather name="more-horizontal" size={20} color="black" />)
                }}
            />    
        </Tab.Navigator>
    )
}

export default TabHome;