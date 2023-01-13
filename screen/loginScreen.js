import React, { useEffect } from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import HeaderCardComponent from "../component/card/headerCard";
import FooterScreen from "../component/footer";
import { globalStyles } from "../style/globalstyle";

const logoIcon = require('../assets/icons/logo.png')

const LoginScreen = ({navigation})=>{

    useEffect(()=>{

    },[])

    const pressHandler = ()=>{
  
        navigation.navigate("Home");
    }

    return(
        <View style={{flex:1}}>
                <View style={globalStyles.container_screen}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                    </HeaderCardComponent>
                </View> 
                <View style={[globalStyles.container_login_view, globalStyles.view_padding_top]}>
                    <Text style={globalStyles.text}>Username</Text>
                    <TextInput style={globalStyles.text_input} defaultValue='' />
                    <Text style={globalStyles.text}>Password</Text>
                    <TextInput style={globalStyles.text_input} defaultValue='' />
                    <TouchableOpacity style={globalStyles.touchable_btn} onPress={pressHandler}>
                        <Text style={globalStyles.text_btn}>Go</Text>
                    </TouchableOpacity>
                </View>
            
            <View>
                <FooterScreen />
            </View>
        </View>
    )
}

export default LoginScreen; 

const styles = StyleSheet.create({
   
})