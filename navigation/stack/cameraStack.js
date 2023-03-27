import React, { useState } from "react";
import {View, Text, Button, Alert} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraHomeScreen from "../../screen/cameraHomeScreen";
import LiveScreen from "../../screen/camera/liveScreen";
import MapListScreen from "../../screen/camera/maplistScreen";
import ModalComponent from "../../component/modalComponent";
import PTZScreen from "../../screen/camera/ptzScreen";

const Stack = createNativeStackNavigator()


const MapHome = ({navigation, route})=>{
    
    const pressHandler = ()=>{
//        Alert.alert('cam alert')
        const rnd = Math.floor( Math.random()*100)
       
        navigation.push('MapHome',{id:rnd})
    }
    const pressParentHandler = ()=>{
        const parent = navigation.getParent('camStck');
        console.log(parent)
        parent?.navigate("live", {camId: route.params?.id})
    }

    return(
        <View style={{ height:'100%', backgroundColor:'yellow', marginTop:300}}>
            <Text>Map home screen / {JSON.stringify(route.params?.id)}</Text>
            <Button title="Go to camera list" onPress={pressHandler} />
            <Button title="Go to camera list" onPress={pressParentHandler} />
            
        </View>
    )
}


const CamHome = ({navigation})=>{
        const pressHandler = ()=>{
        //        Alert.alert('cam alert')
                navigation.navigate('CamHome',{})
            }
    return(
        <View>
            <Text>Camera home screen</Text>
            <Button title="Go to camera list" onPress={pressHandler} />
        </View>
    )
}

const CameraStack = ()=>{
    const getCamId = ()=>{
        Alert.alert("camera id`")
     }
    return(
        <Stack.Navigator id="camStck">
            <Stack.Screen name="cameraHome" component={CameraHomeScreen} options={{headerShown:false}}  />
            <Stack.Screen name="live" component={LiveScreen} 
                options={{
                    title: 'Select camera in tile to play'
                }}
            />
            <Stack.Group screenOptions={{presentation:'transparentModal'}}>
                <Stack.Screen name="MapHome" component={MapListScreen} options={{headerShown:false}} />
                <Stack.Screen name="ModalRecording" component={ModalComponent} 
                    options={{headerShown:false}}
                />
                <Stack.Screen name="PTZ" component={PTZScreen} options={{headerShown:false}} />
            </Stack.Group>

        </Stack.Navigator>
    )
}

export default CameraStack;