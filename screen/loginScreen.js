import React, { useCallback, useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import HeaderCardComponent from "../component/card/headerCard";
import FooterScreen from "../component/footer";
import { globalStyles } from "../style/globalstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoIcon = require('../assets/icons/logo.png')
import  Constants  from "expo-constants";
import * as SplashScreen from 'expo-splash-screen';


//SplashScreen.preventAutoHideAsync();

const LoginScreen = ({navigation})=>{
    const[isAppReady, setIsAppReady] = useState(false)
    
    useEffect(()=>{
        console.log(Constants.sessionId)
    

        prepare()
    },[])

    async function prepare(){
        try
        {
//            const value = AsyncStorage.getItem('@reg_devc')
//            if(value)
            await new Promise(resolve => setTimeout(()=>{setIsAppReady(true)}, 1000));
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsAppReady(true)
        }
    }

    const pressHandler = ()=>{
        
        navigation.navigate("RegDevice");
    }

    const LayoutRootView = useCallback( ()=>{
 //       SplashScreen.hideAsync()
    },[isAppReady])

    if(!isAppReady){
        return(
            <View style={[globalStyles.container_main, 
                globalStyles.container_header_logo,globalStyles.container_header,
                {justifyContent:'center'}
            ]}>
                <Image source={logoIcon} />
              
                <Text style={{color:'#909090',
                    fontSize:16, marginHorizontal:30, marginVertical:40
    
            
            }}>It is a modern, intelligent surveillance and monitoring system for remote supervision</Text>
            </View>
        )
    }

    return(
        <View style={{flex:1}} onLayout={LayoutRootView}>
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