import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, SafeAreaViewBase } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

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
    return(
    <View>
      <Text>Readying app</Text>
    </View>
    )
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}


