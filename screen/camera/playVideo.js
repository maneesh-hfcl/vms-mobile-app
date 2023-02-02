import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as FileSystem from 'expo-file-system';
import WebView from "react-native-webview";
//import RNFS from 'react-native-fs';

// ...

//const text = await FileSystem.readFile(Dirs.CacheDir + '/test.txt');



const PlayVideo = ()=>{
    const[dataBlob, setDataBlob] = useState([])
    const web_url = "http://192.168.244.25:5005"
    const ws_url = "ws://192.168.244.25:7008/"
    const url_token = "QtjEq1mDWNYh0f8qidy+WhmCnENl5YwMEzu0CNYGxdurTfK2mSuJHhzxpqvmZR1P7qd62c6koaGudqEmKNx/kLzMnhoXI0F5bX+PTOH5Tho=";
    const m3usUri = "http://192.168.244.25:5005/hls/"
    const video = useRef(null)

    var ws ;
    const[base64Encode, setBase64Encode] = useState('');
    const[count,setCount] = useState(0)
    const bufferStream = useRef('')
    const[indx,setIndx] = useState(0)
    
    let boolFirst = false;

    const getWebToken = ()=>{
        const camId = "ITEM_hap"
        const type = 'L'
        const encParams = "480:-1:-1.0"
//        const encParams = ""
        const mseSupport = false
        const time = ''
                
        const webtokenUrl = getWebServiceRequest(mseSupport, type, camId, encParams,time)
        console.log(webtokenUrl)
        getTokenFromUrl(webtokenUrl)
//        let token = getWebToken(webtokenUrl)
    }

    const writeToFile = async ()=>{
        // const fileName = "abc.txt"
        // const fileUri = `${FileSystem.documentDirectory}abc.txt`;
        // console.log(fileUri)
        // const contents = "hello, there, nice one"
    
        // await FileSystem.writeAsStringAsync(fileUri, contents)
       // console.log(output)

       // readData()
  //      console.log(RNFS.DocumentDirectoryPath);
    }

    const readData = async ()=>{
       // const fileUri = `${FileSystem.documentDirectory}abc.txt`;
       // const readTxt = await FileSystem.readFile(fileUri);
       // console.log(readTxt);
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
       // Alert.alert(URL.createObjectURL());
       // return;
    
        getWebToken();
  
    }

    const pressHandlerDisconnect = ()=>{
        //alert('Disconnecting alarm')
//        console.log(base64Encode);
       // writeToFile()
       // delStoreData()
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
        var chkItmRecv = 0;
        console.log(ws_url);
        ws = new WebSocket(ws_url);
        ws.binaryType = 'blob';
        var base64Append = ''
        //ws.url = ws_url
        ws.onopen = () => {
        // connection opened
            chkItmRecv = 0
            console.log('connected');
            //ws.send('123'); // send a message
            console.log(token)
            ws.send(token)

            
        };

        ws.onmessage = e => {
        // a message was received
        // console.log(e)

         if(typeof(e.data) == 'string')
         {
            if(e.data.includes('m3u8'))
            {
                let dataUri = m3usUri + e.data //"133196337947594084.m3u8"
                console.log(dataUri)
                setBase64Encode(dataUri)

            }
         }
//         console.log(base64Encode)
         return;
            
            if(typeof(e.data) != 'string')
            {
            
                reader.readAsDataURL(e.data);
              
              //  console.log('hello')
             //   console.log(video.current.source.uri)
                // Alert.alert(`fetching`)
                 //console.log(count)
            }
            //reader.readAsArrayBuffer(e.data);
            
            reader.onloadend = async() => {

                 //console.log(base64);
               //  if(base64Encde == null)
               //if(typeof(e.data) != 'string')
              // {
               //if(chkItmRecv == 0)
               // ws.close()
//                console.log(reader)
                let base64 = reader.result
               // console.log(base64)
                //video.current.source = {'uri': base64.replace('data:application/octet-stream','data:video/mp4')}
               // video.current.playAsync()            
                    //storeData(base64)
              // } 
//              let abc = URL.createObjectURL(e.data)
              
                //if(chkItmRecv == 0)
                //{

                    base64Append = base64.replace('data:application/octet-stream','data:video/mp4')
                //}
               //else
                    //base64Append += base64.replace('data:application/octet-stream','')
                  // base64Append += base64.replace('data:application/octet-stream;base64,','')
                
  //Sharing.shareAsync(fileUri);
                    console.log('abc')
                   // console.log(abc);
                    console.log('end abc')

                
//                 console.log(base64)
               // setBase64Encode(prev => [...prev, base64]);
    //            base64Append += base64
                //setDataBlob(prev => [...prev, base64Append])
                //storeData(base64)
                // if(chkItmRecv == 0){
                    
                // }

               // if(chkItmRecv == 0)
                {
                    console.log("chkItmRecv: " + chkItmRecv);
                    //console.log(base64Append);
                   // bufferStream.current = base64Append;
                    setBase64Encode(base64Append);
                 //   console.log(base64Encode)
//                    console.log(bufferStream.current)
                }
                //else{

//                bufferStream.current = bufferStream.current + base64Append
//               console.log(bufferStream.current.length);
               // }
                boolFirst = true;  
                chkItmRecv ++;           
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
            
            console.log('finished')
            setIndx(prev => prev + 1)
            playVideo()
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
          

            {/* <Video
                source={{ uri: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8' }}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                useNativeControls
                style={{ width: 300, height: 200, marginVertical:10}}
                
          /> */}

            {/* <Video
                source={{ uri: 'http://192.168.2.197:5005/hls/133196337947594084.m3u8' }}
                style={{ width: 300, height: 200, marginVertical:10}}
                useNativeControls
                isLooping
                onPlaybackStatusUpdate={status => console.log(status.isPlaying)}
          /> */}

            {base64Encode.length > 0 &&
                <Video ref={video}
                    source={{uri: base64Encode}}
                    rate={1.0}
                volume={1.0}
                isMuted={true}

                shouldPlay={true}
                style={{marginHorizontal:10, width:300, height:200}}
                useNativeControls
                isLooping
                    // onPlaybackStatusUpdate={chkPlaybackStatus}
              />
            }
            <TouchableOpacity onPress={pressHandlerSocketConn} style={{marginVertical:10, alignItems:'center'}}>
                <Text>Connect socket</Text>
                <Text>{count}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getFirstStoreData} style={{marginVertical:10, alignItems:'center'}} >
                <Text>Get first data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressHandlerDisconnect} 
                style={{
                    marginVertical:10,
                    alignItems:'center',
                 }}>
                <Text>Disconnect</Text>
            </TouchableOpacity>

            {/* <WebView  
                style={{flex:1}}
                source={{uri: "http://192.168.2.197:5005/video.html"}}
            /> */}


        </View>
    )
}

export default PlayVideo;

const styles = StyleSheet.create({

})