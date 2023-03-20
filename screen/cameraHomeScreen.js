import React from "react";
import {View, Text, StyleSheet, Alert} from 'react-native'
import MenuCardComponent from "../component/card/menuCard";
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import DesignCirComponent from "../component/designCirComponent";
import {Svg, G, Path, Polygon, Circle} from 'react-native-svg';
import DesignTriComponent from "../component/designTriComponent";


const CameraHomeScreen = ({navigation})=>{

    const menuPressHandler = (param)=>{
       // Alert.alert("menu clicked " + param);
        navigation.navigate('live');
    }

    return(
        <View style={[globalStyles.container_login_view,{backgroundColor:'#fff'}]}>
            <View style={{marginHorizontal:20, marginTop:20,flex:1}}>
                <MenuCardComponent menuText='Live . Recording' onMenuPress={() => menuPressHandler('live')}>
                    <MaterialIcons name="featured-video" size={30} color="green" />
                </MenuCardComponent>
                {/* <MenuCardComponent menuText='Recording'>
                    <Foundation name="record" size={30} color="red" />
                </MenuCardComponent> */}

                <MenuCardComponent menuText='Recording Bookmark'>
                    <FontAwesome name="bookmark" size={30} color="gray" />
                </MenuCardComponent>
            </View>
            <DesignTriComponent />
            
        </View>
    )
}

export default CameraHomeScreen;

const styles = StyleSheet.create({

})
