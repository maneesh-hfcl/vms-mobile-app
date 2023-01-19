import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const PlayVideo = ()=>{
    const[dataBlob, setDataBlob] = useState([])
    const web_url = "http://192.168.2.205:5005"
    const ws_url = "ws://192.168.2.205:7008/"
    const url_token = "QtjEq1mDWNYh0f8qidy+WhmCnENl5YwMEzu0CNYGxdurTfK2mSuJHhzxpqvmZR1P7qd62c6koaGudqEmKNx/kLzMnhoXI0F5bX+PTOH5Tho=";

    const video = useRef(null)

    var ws ;
    const[base64Encode, setBase64Encode] = useState('');
    const[count,setCount] = useState(0)
    
    let boolFirst = false;

    const getWebToken = ()=>{
        const camId = "ITEM_hap"
        const type = 'L'
//        const encParams = "1920:-1:-1.0"
        const encParams = ""
        const mseSupport = true
        const time = ''
                
        const webtokenUrl = getWebServiceRequest(mseSupport, type, camId, encParams,time)
        console.log(webtokenUrl)
        getTokenFromUrl(webtokenUrl)
//        let token = getWebToken(webtokenUrl)
    }

    const getTokenFromUrl = async (tokenUrl) =>{
        try{
            console.log(`Token ${tokenUrl}`);
            const response = await fetch(
                tokenUrl,
                {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                  }
                }
            )
            console.log(response);
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            console.log(jsonResponse["sm"]);
            connectWebSocket(jsonResponse["sm"]);
        }
        catch(error){
            console.error(error)
        }
        finally{
            console.log('final block occured')
        }

    }

    const getWebServiceRequest = (mseSupport, type, camId, encParams, time)=>{
        let sURL = web_url + "/vm/vmd/pvss?spc=" + (mseSupport ? "M" : "H") + ";" + type + ";" + camId;
        if (type === "V") {
            sURL += ";" + time;
        }
        if (encParams !== "") {
            sURL += ";" + encParams;
        }

        return sURL;
    }
    
    
    const pressHandlerSocketConn = ()=>{
//        var ws_url= "ws://192.168.2.205:7008";
    
    
        getWebToken();
  
    }

    const pressHandlerDisconnect = ()=>{
        //alert('Disconnecting alarm')
//        console.log(base64Encode);
        delStoreData()
        if(ws)
        {
            console.log("closing websocket");   
            ws.close()
        }
        else{
//            ws.close()
            console.log("ws undefined")
        }
    }

    const connectWebSocket = (token)=>{
        const reader = new FileReader();
        var boolFirst = false;
        console.log(ws_url);
        ws = new WebSocket(ws_url);
        ws.binaryType = 'blob';
        //ws.url = ws_url
        ws.onopen = () => {
        // connection opened
            console.log('connected');
            //ws.send('123'); // send a message
            console.log(token)
            ws.send(token)

            
        };

        ws.onmessage = e => {
        // a message was received
       // console.log(e)

            if(typeof(e.data) != 'string')
            {
                reader.readAsDataURL(e.data);
                
                // Alert.alert(`fetching`)
               // console.log(count)
            }
            //reader.readAsArrayBuffer(e.data);


            reader.onloadend = () => {

                 //console.log(base64);
               //  if(base64Encde == null)
               //if(typeof(e.data) != 'string')
              // {
               // ws.close()
                let base64 = reader.result
//                URL.createObjectURL(reader.result)            
                    //storeData(base64)
              // } 
                base64 = base64.replace('data:application/octet-stream','data:video/mp4')
                //console.log(base64)
                //setBase64Encode(prev => [...prev, base64]);
                
                setDataBlob(prev => [...prev, base64])
                //storeData(base64)
                if(boolFirst == false)

                    setBase64Encode(base64);

                boolFirst = true;             
            };

            

        };

        ws.onerror = e => {
        // an error occurred
            console.log("Error occured");
            console.log(e.message);
        };

        ws.onclose = e => {
        // connection closed
            
            console.log(e.code, e.reason);
        };
    }

    const storeData =  (value)=>{
        try{
//            console.log(value)
            setDataBlob(prevVal =>[...prevVal, value])
           // console.log(dataBlob)
           // await AsyncStorage.setItem('@blob', JSON.stringify(dataBlob));
            getFirstStoreData()  
        }
        catch(e){
        }
    }

    const getStoreData = async ()=>{
        try{
            const value = await AsyncStorage.getItem('@blob')
        //    const value = JSON.parse(val);
            if(value != null)
            {
                console.log(`Stored value:${value}`)
                return value
            }
            else{
                console.log("No data")
            }
        }
        catch(e){

        }
    }

    const delStoreData = async ()=>{
//        await AsyncStorage.removeItem('@blob')
        setBase64Encode('')
        setDataBlob([])
        setCount(0)
    }

    const getFirstStoreData = ()=>{
        //const value = await AsyncStorage.getItem('@blob')
        //const value = dataBlob;
        //console.log(value)
        //const arr = JSON.parse(value)
        //console.log(arr.length)
    //getFirstStoreData()
        setBase64Encode(dataBlob[0])
        video.current.playAsync();
    }

    const playVideo = ()=>{
        console.log('Loading items')
        video.current.playAsync()
    }

    const chkPlaybackStatus = (status)=>{
        
        console.log(status.isPlaying)
        if(status['didJustFinish'])
        {
            setCount(prevcount => (prevcount + 1))
            
            console.log('finished')
           playNextVideo()
        }
    }

    const playNextVideo = () =>{
        //console.log(dataBlob.length);
        console.log(`Count: ${count}`)
        let count1 = 1
      console.log(dataBlob[count1])
       setBase64Encode(dataBlob[count1])
       console.log(base64Encode)
        //playVideo()
    }

    return(
        <View style={{flex:1}}>
            <Text>Playing video</Text>
            {base64Encode.length > 0 &&
                <Video style={{ height:200}} ref={video}
                    onLoad = {playVideo}
                    source={{
                        uri: base64Encode
                    }}
                    on
                    useNativeControls
                    resizeMode="contain"
                    isLooping={false}
                    onPlaybackStatusUpdate={status => chkPlaybackStatus(status)}
                />
            }
            <TouchableOpacity onPress={pressHandlerSocketConn} style={{marginVertical:20, alignItems:'center'}}>
                <Text>Connect socket</Text>
                <Text>{count}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getFirstStoreData} style={{marginVertical:10, alignItems:'center'}} >
                <Text>Get first data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressHandlerDisconnect} style={{marginVertical:100,
                 alignItems:'center',
              
                 }}>
                <Text>Disconnect</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PlayVideo;

const styles = StyleSheet.create({

})