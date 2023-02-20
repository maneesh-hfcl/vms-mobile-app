import React from "react";
import {View, Text, StyleSheet, Alert} from 'react-native'
import MenuCardComponent from "../component/card/menuCard";
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';


const CameraHomeScreen = ({navigation})=>{

    const menuPressHandler = (param)=>{
       // Alert.alert("menu clicked " + param);
        navigation.navigate('live');
    }

    return(
        <View style={[globalStyles.container_login_view,{backgroundColor:'#fff'}]}>
            <View>
                <MenuCardComponent menuText='Live view' onMenuPress={() => menuPressHandler('live')}>
                    <MaterialIcons name="featured-video" size={30} color="green" />
                </MenuCardComponent>
                <MenuCardComponent menuText='Recording'>
                    <Foundation name="record" size={30} color="red" />
                </MenuCardComponent>

                <MenuCardComponent menuText='Recording Bookmark'>
                    <FontAwesome name="bookmark" size={30} color="gray" />
                </MenuCardComponent>
            </View>
        </View>
    )
}

export default CameraHomeScreen;

const styles = StyleSheet.create({

})
