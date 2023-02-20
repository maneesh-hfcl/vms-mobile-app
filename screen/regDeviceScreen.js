import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../style/globalstyle";
import HeaderCardComponent from "../component/card/headerCard";
import { LnkBtnCard } from "../component/card/lnkBtnCard";
const logoIcon = require('../assets/icons/logo.png')
import { MaterialIcons } from '@expo/vector-icons';
import  Constants  from "expo-constants";
import LoadingDialogComponent from "../component/loadingDialogComponent";

const RegDeviceScreen = ({navigation})=>{
    const[isLoading, setIsLoading] = useState(true)    


    useEffect(()=>{
        getRegDeviceId()
    },[])

    const getRegDeviceId = async()=>{
        const value = await AsyncStorage.getItem("@reg_dev")
        if(value != null)
        {
            setIsLoading(false)
            navigation.navigate('Home')
        }
    }

    const pressLnkHandler = async ()=>{
        try{
            await AsyncStorage.setItem("@reg_dev", Constants.sessionId.toString())
            navigation.navigate('Login')
        }
        catch(e){

        }
    }


    return(
        
        <View style={globalStyles.container_main}>
            
                
                <View style={[globalStyles.container_screen]}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                    </HeaderCardComponent>
                </View> 
                <View style={{justifyContent:'center', alignItems:'center', marginVertical:30, marginHorizontal:30}}>
                    {
                        isLoading?(
                    <View>    
                    <Text style={{textAlign:'justify', marginVertical:20, marginHorizontal:20}}>
                        This is the first time, you are login from this device.
                        Kindly register this device to proceed further.
                    </Text>
                
                    <View style={{alignItems:'center', marginVertical:30}}>
                        <MaterialIcons name="device-unknown" size={34} color="gray" style={{marginVertical:25}} />
                        <LnkBtnCard label={'Register Device'} iconColor='#0646b8'
                        iconName={'app-registration'}
                        iconSize={24}
                        labelColor={'black'}
                        
                        color={'white'} pressLnkHandler={pressLnkHandler} />
                    </View>
                    </View>
                        ):(
                            <Text style={{textAlign:'justify', marginVertical:20, marginHorizontal:20}}>
                            Checking registerd device
                        </Text>
                        )

                    }
                </View>
         </View>
    )
}

export default RegDeviceScreen;

const styles = StyleSheet.create({
    
})