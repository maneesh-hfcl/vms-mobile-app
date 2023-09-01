import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, SafeAreaViewBase, Button } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AppMain from './screen/AppMain';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './shared/useNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification:async ()=>{
    return{
      shouldShowAlert:true,
      shouldPlaySound:true,
      shouldSetBadge:true
    };
  }

})

export default function App() {
  const[appIsReady, setAppIsReady] = useState(false);

  useEffect(()=>{
    async function prepare(){
      try{
//        await new Promise(resolve => setTimeout(resolve, 2000))
        
      }
      catch(e){
        console.log(e)
      }
      finally{
        setAppIsReady(true);
      }
    }

    prepare()
  },[])

  useEffect(()=>{
    getpushToken();

  })

  const getpushToken = async ()=>{
    try{
      let pushToken = await registerForPushNotificationsAsync();
      console.log("getting push token")
      console.log(pushToken);
      if(pushToken == null){
        pushToken = "offline"
      }
      console.log(`push token: ${pushToken}`)
    
      await AsyncStorage.setItem("@reg_dev", pushToken);
    }
    catch(e){
      try{
        await AsyncStorage.setItem("@reg_dev", "offline");
      }
      catch(e){
        console.log("error occured inside asyncstorage")        
      }
      console.log("error occured")
    }
  }

  useEffect(()=>{
    const subscriptionReceived =  Notifications.addNotificationReceivedListener((notification)=>{
      console.log('Notification Recvd')
      console.log(notification)
      console.log(notification.request.content.data)
    });

    const subscriptionRespReceived = Notifications.addNotificationResponseReceivedListener((response)=>{
      console.log("RESPONSE BY USER")
      console.log(response)
      console.log(response.notification.request.content.data.userName)
    });

    return ()=>{
      subscriptionReceived.remove()
      subscriptionRespReceived.remove()
    };
   },[])

  const onLayoutRootView = useCallback(async()=>{
    if(appIsReady){
      await SplashScreen.hideAsync()
    }
  },[appIsReady])

  if(!appIsReady){
    return null
  }

  const scheduleNotificationHandler = async ()=>{
    Notifications.scheduleNotificationAsync({
      content:{
        title:'My first local notification',
        body:'This is the body of notification',
        data:{userName:'Max'}
      },
      trigger: {
        seconds:5
      }
    })
  }

  return (
    <>
         
         <AppMain />
         <View onLayout={onLayoutRootView}>
          {/* <Text>hello sir</Text>
          <Button title='Schedule Notification' onPress={scheduleNotificationHandler} /> */}
        </View>
     </> 
  );
}


