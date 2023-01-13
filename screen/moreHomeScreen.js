import { Video } from "expo-av";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {WebView} from "react-native-webview";
import { globalStyles } from "../style/globalstyle";

const MoreHomeScreen = ({navigation})=>{
    const[data, setData] = useState([])
    let web_url = "http://192.168.2.205:5000"
    const pressHandler = ()=>{
          navigation.navigate('Login');
    }

    const pressHandlerAPI = ()=>{
   //     Alert.alert('call movies api')
  //      getMovies()
        getWebToken();
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

    const getWebToken = ()=>{
        const camId = "ITEM_hap"
        const type = 'L'
        const encParams = "1920:-1:-1.0"
        const mseSupport = true
        const time = ''
                
        let webtokenUrl = getWebServiceRequest(mseSupport, type, camId, encParams,time)
        console.log(webtokenUrl)
        getTokenFromUrl(webtokenUrl)
//        let token = getWebToken(webtokenUrl)
    }

    const getTokenFromUrl = async (tokenUrl) =>{
        try{
            console.log(`Token ${tokenUrl}`);
            const response = await fetch(tokenUrl,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                  },
            })

            const json = await response.text()
            console.log(json)
        }
        catch(error){
            console.error(error)
        }
        finally{
            console.log('final block occured')
        }


    // fetch(tokenUrl, {
    //   method: 'POST',
    //   //Request Type
    // })
    //   .then((response) =>{ response.json()})
    //   //If response is in json then in success
    //   .then((responseJson) => {
    //     //Success
    //     JSON.stringify(responseJson);
    //     console.log(responseJson);
    //   })
    //   //If response is not in json then in error
    //   .catch((error) => {
    //     //Error
    //     alert(JSON.stringify(error));
    //     console.error(error);
    //   });
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

    return(
        <View style={globalStyles.container_main}>
            <Text style={[globalStyles.text,{alignSelf:'center'}]}>Click to logout from the application</Text>
            <TouchableOpacity style={[globalStyles.touchable_btn, globalStyles.touchable_btn_logout]} onPress={pressHandler}>
                <Text style={globalStyles.text_btn}>Logout again</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressHandlerAPI}>
                <Text>Get Rest data</Text>
            </TouchableOpacity>
           
        </View>
    )
}

export default MoreHomeScreen;

const styles = StyleSheet.create({

})