import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {WebView} from "react-native-webview";
import { globalStyles } from "../style/globalstyle";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MoreHomeScreen = ({navigation})=>{
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

    const pressHandler = ()=>{
          navigation.navigate('Login');
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


    return(
        <View style={globalStyles.container_main}>
            <Text style={[globalStyles.text,{alignSelf:'center'}]}>Click to logout from the application</Text>
            <TouchableOpacity style={[globalStyles.touchable_btn, globalStyles.touchable_btn_logout]} onPress={pressHandler}>
                <Text style={globalStyles.text_btn}>Logout</Text>
            </TouchableOpacity>
        
        </View>
    )
}

export default MoreHomeScreen;

const styles = StyleSheet.create({

})