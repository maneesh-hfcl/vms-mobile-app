import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, SafeAreaViewBase } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AppMain from './screen/AppMain';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const[appIsReady, setAppIsReady] = useState(false);

  useEffect(()=>{
    async function prepare(){
      try{
        await new Promise(resolve => setTimeout(resolve, 2000))
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

  const onLayoutRootView = useCallback(async()=>{
    if(appIsReady){
      await SplashScreen.hideAsync()
    }
  },[appIsReady])

  if(!appIsReady){
    return null
  }

  return (
    <>
        <View onLayout={onLayoutRootView}>
        </View>
        <AppMain />
     </> 
  );
}


