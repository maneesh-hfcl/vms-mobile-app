import React, { useEffect, useRef, useState } from "react";
import {View, Text, StyleSheet, Image, Alert, Platform, Button} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../style/globalstyle";
import HeaderCardComponent from "../component/card/headerCard";
import { LnkBtnCard } from "../component/card/lnkBtnCard";
const logoIcon = require('../assets/icons/logo.png')
import { MaterialIcons } from '@expo/vector-icons';
import  Constants  from "expo-constants";
import LoadingDialogComponent from "../component/loadingDialogComponent";
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'


Notifications.setNotificationHandler({
    handleNotification: async() =>({
        shouldShowAlert:true,
        shouldPlaySound:false,
        shouldSetBadge:false
    })
})

async function sendPushNotification(expoPushToken){
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
      };
      console.log(message)
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
    




async function registerForPushNotificationAsync(){
    let token;
    if (Device.isDevice){
        const{status:existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus
        if( existingStatus !=='granted')
        {
            const{status} = await Notifications.getPermissionsAsync();
            finalStatus = status
        }
        
        if(finalStatus !=='granted'){
            Alert.alert('failed to get notification');
           // return;
        }
        console.log(finalStatus)
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    }
    else{
        console.log('Must use physical device for Notification')
        Alert.alert('Must use physical device for Notification')
    }

    if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default',{
            name:'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0,250,250,250],
            lightColor:'#FF231F7C',
            enableLights:true
        })
    }

    return token
}

const RegDeviceScreen = ({navigation})=>{
    const[isLoading, setIsLoading] = useState(true)    
    const[expoPushToken, setExpoPushToken] = useState('')
    const[notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(()=>{
  
        
        registerForPushNotificationAsync().then(token => setExpoPushToken(token))
        
        notificationListener.current = Notifications.addNotificationReceivedListener(
            ()=> setNotification(notification)
        )

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            reponse => console.log(reponse)
        )

        getRegDeviceId()

        return ()=>{
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }

        

    },[])

    const notifySettings = async ()=>{
        
    }

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

                <View>
                    <Text>Your Expo push token: {expoPushToken}</Text>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Text>Title: {notification && notification.request.content.title} </Text>
                        <Text>Body: {notification && notification.request.content.body}</Text>
                        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                </View> 
                <Button title="Press to send Notification"
                    onPress={async()=>{
                        await sendPushNotification(expoPushToken)

                    }}
                >

                </Button>
         </View>
    )
}

export default RegDeviceScreen;

const styles = StyleSheet.create({
    
})