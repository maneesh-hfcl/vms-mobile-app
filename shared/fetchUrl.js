import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../configuration/config";
import * as Linking from 'expo-linking';

export const LoadApiData = async(urlpath, type)=>{
    try {
            let uri = config.ApiUrl + `${urlpath}`
            console.log("LoadApiData - " + uri);
            const response = await fetch(
                uri,
                {
                    method: type == null?"GET":type
                    
                }
            );

            return await response.json();
        //            return json.movies;
        } catch (error) {
            return "error"
        }

}


export const LoadApiDataFrmURL = async(values, type)=>{
    let ip = values.ipaddress.trim()
    // Alert.alert("urplath: " + urlpath);
 

    let uri = (ip.includes("http")?ip:"http://" + ip)+"/getallurlp";
    try {
          //  uri = "http://192.168.0.106:8060/getallurl";
          //  uri = "https://reactnative.dev/movies.json"
            // Alert.alert("Inside LoadApiFrmURL")
            // Alert.alert(uri)
//            Alert.alert("LoadApiFrmURL - " + uri);
            const response = await fetch(
                uri,
                {
                    method: type,
                    headers:{
                        "Content-Type": "application/json"
                    }
                    
                }
            );
            // const jsonmovies = await response.json();
            // console.log(jsonmovies.movies);
            // Alert.alert(jsonmovies.movies);
            // return jsonmovies;
            return await response.json();
        //            return json.movies;
        } catch (error) {
           // Alert.alert("In LoadApiFrmURL error" + uri);
           // Alert.alert("11: " + error.message)
           // console.error(error.message);
            return "error"
        }

}


export const LoadApiDataFrmWeb = async(urlpath, type)=>{
    try {
            console.log(config.WebUrl);
            let uri = config.WebUrl + `${urlpath}`
            console.log("LoadApiData - " + uri);
            const response = await fetch(
                uri,
                {
                    method: type == null?"GET":type,
                    headers:{
                        "Content-Type": "application/json"
                    }
                    
                }
            );
            return await response.json();
        //            return json.movies;
        } catch (error) {
            console.error(error);
            return "error"
        }

}

export const LoadApiPostData = async(urlpath, type, data)=>{
    try {
            console.log("Inside LoadApiPostData");
            console.log(config.ApiUrl);

            let uri = config.ApiUrl + `${urlpath}`
            console.log("goo")
            console.log(uri);
            
            console.log(JSON.stringify(data));
            const response = await fetch(
                uri,
                {
                    method: type == null?"GET":type,
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            
            

            return await response.json()
        //            return json.movies;
        } catch (error) {
            console.error(error);
            return "error"
        }

}

export const CurrentDateTime = (dt)=>{

    var date = new Date();
    if(dt != null )
    date = new Date(dt)
    var day = date.getDate();       // yields date
    var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    var year = date.getFullYear();  // yields year
    var hour = date.getHours();     // yields hours 
    var minute = date.getMinutes(); // yields minutes
    var second = date.getSeconds(); // yields seconds
    console.log("CurrentDateTime")
    // After this construct a string with the above results as below
    var datetime = year +"/" + ('00'+month).slice(-2) + "/" + day + " " + ('00'+hour).slice(-2) + ':' + ('00'+minute).slice(-2) + ':' 
        + ('00' + second).slice(-2); 
    console.log("date : "+ datetime);
    return datetime;
}


export const Com_GetAPIFrmStorage = async()=>{
    try{
//            let value = await AsyncStorage.getItem("@webapi")
        let webapi = await AsyncStorage.getItem("@webapi")
        let weburl = await AsyncStorage.getItem("@weburl")
        let socketurl = await AsyncStorage.getItem("@socketurl")

        let initLst = {
            webapi : JSON.parse(webapi),
            weburl : JSON.parse(weburl),
            socketurl : JSON.parse(socketurl)
          //  socketapi : JSON.parse(socketapi)
        }

        return initLst;        
    }
    catch(e){
        console.log(e);
        console.log("catch:Com_GetAPIFrmStorage: exception occured");
    }
    finally{
        
    }
}


export const Com_SetAppApi = (iplst)=>{
    if(iplst != null)
    {
        config.ApiUrl = (iplst.webapi.includes("http")?iplst.webapi:"http://" + iplst.webapi);// + ":8060",
        config.WebUrl = (iplst.weburl.includes("http")?iplst.weburl:"http://" + iplst.weburl);// + ":8010",
        config.WebsocketUrl = (iplst.socketurl.includes("http")?iplst.socketurl:"http://" + iplst.socketurl); // + ":8050",
        config.VideoUrl = config.WebUrl +"/hls"; // + ":8010/hls"
        console.log("start:Com_SetAppApi Setting api");
        console.log(config);
        return config;
        // setip(config.ApiUrl)
        // navigation.navigate("Login")
    }
    else
    {
        console.log("start:Com_SetAppApi: list of ip/webapi is null");
    }

}

export const Com_SaveApiStorage = async (initLst)=>{
    await AsyncStorage.setItem("@webapi", JSON.stringify(initLst.webapi))
    await AsyncStorage.setItem("@weburl", JSON.stringify(initLst.weburl))
    await AsyncStorage.setItem("@socketurl", JSON.stringify(initLst.socketurl))
}


export const PrivacyPolicy = ()=>{
    // Linking.openURL('https://expo.dev/');

    let uri = config.ApiUrl+"/privacy-policy.html";
    console.log(uri);
    Linking.openURL(uri);
//        navigation.navigate('MapHome',{cam:selCam, recdt:recdate, rectime:time});
}