import React, { useEffect, useRef, useState } from "react";
import {View, Text, StyleSheet, Image, Alert, Platform, Button, TextInput} from 'react-native'
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
import {useForm, Controller} from 'react-hook-form'
import DesignTriComponent from "../component/designTriComponent";
import SmsComponent from "../component/smsComponent";
import { LoadApiPostData } from "../shared/fetchUrl";


const RegDeviceScreen = ({navigation, route})=>{
    const[isLoading, setIsLoading] = useState(true)    
    const[expoPushToken, setExpoPushToken] = useState(null)
    const[notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()
    const[showComment, setShowComment] = useState(false)
    const{usrId} = route.params;
   // const {register, handleSubmit, setValue, errors} = useForm();
   const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
        }
    });

    useEffect(()=>{
        getRegDeviceId()

    },[])

    const getRegDeviceId = async()=>{
        try{
            const value = await AsyncStorage.getItem("@reg_dev")
            if(value != null)
            {
    //            setIsLoading(false)
    //            navigation.navigate('Home')
                setExpoPushToken(value)
            }
        }
        catch(e){
            console.log("Error occured in getRegDeviceId");
        }

    }

    const regDeviceId = async()=>{
        try
        {

            await AsyncStorage.setItem("@reg_dev", JSON.stringify(values.ipaddress.trim()))
            setAppApi(values.ipaddress.trim())
        }
        catch(e){

        }
        finally{

        }
    }

    const pressLnkHandler = async ()=>{
        try{
//            let unqDevId = (Constants.sessionId) 
 //           await AsyncStorage.setItem("@reg_dev", unqDevId);
//            let unqDevId = await AsyncStorage.getItem("@reg_dev")
            if(expoPushToken==null)
            {
                console.log("Device Id is null");
                //expoPushToken = "offline"
              //  setExpoPushToken("offline")
            }
            let urlPath = "/regDvc"
            let dataToPost = {
                "userId":usrId,
                "devToken": expoPushToken
            }
            console.log(dataToPost)
            let jsonResp = await LoadApiPostData(urlPath,"POST", dataToPost)
            console.log(jsonResp);
            if(jsonResp == 1)
                navigation.navigate('Login');
            else{
                
            }
        }
        catch(e){

        }
    }

    const onSubmit = (data)=>{
       // console.log(errors)
       // console.log("Error above")
       // console.log(data)
    }

    return(
        
        <View style={[globalStyles.container_main,{flex:1}]}>
                
                <View style={[globalStyles.container_screen]}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                    </HeaderCardComponent>
                </View> 
                {/* <SmsComponent /> */}
                <View style={{justifyContent:'flex-start', alignItems:'center', marginVertical:30, marginHorizontal:30, flex:1}}>
                    {
                        isLoading?(
                    <View>    
                    <Text style={[globalStyles.text, {textAlign:'justify', marginBottom:40, marginHorizontal:20}]}>
                        This is the first time, you are login from this device.
                        Kindly register the device to proceed further.
                    </Text>
                    {expoPushToken != null && 
                        <Text>Your unique device id is: {expoPushToken}</Text>
                    }        
                    <View style={{alignItems:'center', marginVertical:20,
                
                }}>
                        <MaterialIcons name="device-unknown" size={40} color="gray" style={{marginVertical:20}} />
                        <View style={{borderWidth:1, borderRadius:15, borderColor:'#d7d7d7'}}>
                            <LnkBtnCard label={'Register Device'} iconColor='#0646b8'
                            iconName={'app-registration'}
                            iconSize={24}
                            labelColor={'black'}
                            
                            color={'white'} pressLnkHandler={pressLnkHandler} />
                        </View>
                    </View>
                    </View>
                        ):(
                            <Text style={{textAlign:'justify', marginVertical:20, marginHorizontal:20}}>
                            Checking registerd device
                        </Text>
                        )

                    }
                </View>

{ showComment &&
            <View>
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
}

                <DesignTriComponent />

         </View>     
                  
    )
}

export default RegDeviceScreen;

const styles = StyleSheet.create({
  input:{
    borderWidth:1
  }  
})