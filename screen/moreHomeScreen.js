import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {WebView} from "react-native-webview";
import { globalStyles } from "../style/globalstyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDetailComponent from "../component/more/usrDetailComponent";
import Svg, { Circle, Rect } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

const MoreHomeScreen = ({navigation, props})=>{
    const[dataBlob, setDataBlob] = useState([])
    const[htmlCode, setHtmlCode] = useState('')
    const htmlPage = require("../html/video.html")

    const htmlInitCode = `
        <html>
            <head>
                <script>
                    var mimeCodec = 'video/mp4; codecs="avc1.640028"';
                    alert(window)
                    console.log('hello')
                    var mediasource = new MediaSource();
                    alert('hello')
                    //alert(window.MediaSource)
                    window.onload = ()=>{
                        //alert('good')
                        alert(mimeCodec)
                        if(MediaSource.isTypeSupported(mimeCodec))
                        {
                            alert('yes')
                        }
                        else{
                            alert('false')
                        }
                    }
                </script>
            </head>
            <body>
                <p>Hello sir</p>
                <p>`+htmlPage+` </p>
                <iframe src="`+htmlPage+`" />
            </body>
        </html>
    `

    useEffect(()=>{

    },[])

    const pressHandler = async()=>{
        try{
            await AsyncStorage.removeItem('@user')            
            navigation.navigate('Login',{resetVal:'true'});
        }
        catch(e){

        }

    }

    const pressHandlerAPI = ()=>{
//        alert('random')
        let rnd = Math.floor(Math.random() * 100);
        console.log(rnd)
        storeData(rnd.toString())
    }

    const storeData = async (value)=>{
        try{
            setDataBlob(prevVal =>[...prevVal, value])
            console.log(dataBlob)
            await AsyncStorage.setItem('@blob', JSON.stringify(dataBlob));
        }
        catch(e){

        }
    }

    const getStoreData = async ()=>{
        try{
            const value = await AsyncStorage.getItem('@blob')
        //    const value = JSON.parse(val);
            if(value != null)
                console.log(`Stored value:${value}`)
            else{
                console.log("No data")
            }
        }
        catch(e){

        }
    }

    const delStoreData = async ()=>{
        await AsyncStorage.removeItem('@blob')
        setData([])
    }

    const getFirstStoreData = async ()=>{
        const value = await AsyncStorage.getItem('@blob')
        const arr = JSON.parse(value)
        console.log(arr[1])
    }

    const getMovies = async()=>{
        url = 'https://reactnative.dev/movies.json'
        console.log(url)
        try{
            console.log("start")
            const response = await fetch(url)
            console.log(response)
            const json = await response.json()
            console.log(json.movies)
        }
        catch(error){
//            console.log('error occured')
            console.error(error)
        }
        finally{
            console.log('finally block called')
        }
    }

    const pressClearHandler = async()=>{
        try{
            await AsyncStorage.removeItem("@reg_dev")
        }
        catch(e){

        }
    }


    return(
        <View style={globalStyles.container_main}>
            <UserDetailComponent />
            <View style={{flex:1}}>

            {/* <TouchableOpacity onPress={pressClearHandler}>
                <Text style={[globalStyles.lnk_btn,{marginTop:20,textAlign:'center'}]}>Clear storage key</Text>
                
            </TouchableOpacity> */}

            </View>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={globalStyles.vw_logout}>
                    <TouchableOpacity style={{alignItems:'flex-end', flex:1, justifyContent:'flex-end'}}>
                        <Text style={[globalStyles.lnk_btn,{textAlign:'center', fontSize:14}]}>
                            Change password
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.vw_logout}>
                    <TouchableOpacity onPress={pressHandler} style={{alignItems:'center'}}>
                        <MaterialIcons name="logout" size={20} color="gray" style={{marginVertical:5}} />
                        <Text style={[globalStyles.lnk_btn,{textAlign:'center', fontSize:14}]}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MoreHomeScreen;

const styles = StyleSheet.create({

})