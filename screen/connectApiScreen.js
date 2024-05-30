import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import { globalStyles } from "../style/globalstyle";
import HeaderCardComponent from "../component/card/headerCard";
const logoIcon = require('../assets/icons/logo.png')
import { Formik } from "formik";
import * as yup from 'yup';
import TextInputTemplate from "../component/card/form/textInputTemplate";
import config from "../configuration/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DesignTriComponent from "../component/designTriComponent";
import { Ionicons } from '@expo/vector-icons';
import { Com_SaveApiStorage, Com_SetAppApi, Com_GetAPIFrmStorage, LoadApiData, LoadApiDataFrmURL, LoadApiDataFrmWeb } from "../shared/fetchUrl";


const validationSchema = yup.object().shape({
    ipaddress : yup.string().required()
})

const ConnectApiScreen = ({navigation, route})=>{
    const[ipaddr, setip] = useState(null)
    const[error, setError] = useState(null)
    const[log, setLog] = useState("")

    var initialValues={
        ipaddress: ''
    };

    useEffect(()=>{
        if(route.params != null)
        {
            console.log("ConnectApiScreen useEffect method");
            const{resetVal} =route.params;
            GetAPIFrmStorage(resetVal)
        }
        else{
            console.log("else part in useffect")
            GetAPIFrmStorage('')
        }
    },[route.params])

    const GetAPIFrmStorage = async(val)=>{
        try{
//            let value = await AsyncStorage.getItem("@webapi")
 
            let initLst = await Com_GetAPIFrmStorage()

            if(initLst.webapi != null)
            {
                if(val != '')
                {
                    getExistingIP(initLst.webapi)
                }
                else{
                    setAppApi(initLst)
                }
            }
            
        }
        catch(e){
            console.log("eXCEPT")
        }
        finally{

        }
    }

    const onPressSubmit= async (values, action)=>{
        try
        {
            let ip = values.ipaddress.trim()
           
            setError("")
            setLog("1: "+ ip + " | ");
            config.ApiUrl = (ip.includes("http")?ip:"http://" + ip)
            setLog(log  => log + "2: "+ config.ApiUrl + " | ");
            //config.ApiUrl = values.ipaddress.trim()
        //    Alert.alert(config.ApiUrl)
            console.log(`config apiurl: ${config.ApiUrl}`)
            let apiurl = (ip.includes("http")?ip:"http://" + ip)
           
 //          let jsondata = await LoadApiData("/getallurl")
            setLog(log => log  + "3: posting json data: "+ values.ipaddress.trim()  + " | ");
            let jsondata = await LoadApiDataFrmURL(values, "POST")
         //   Alert.alert("jsondata ")
         //   let urlpath = "/getallurl";
        //    let jsonData = await LoadApiDataFrmURL(urlpath,"POST", values);
            //jsondata = "error";
            if (jsondata != "error"){
           //     Alert.alert("Inside if ")
               setLog(log => log + "4: error json data "); 
               console.log(jsondata) 
                
               console.log("Inside jsondata")
                let initLst = {
                    webapi : jsondata.webapi.trimEnd(),
                    weburl : jsondata.webapp.trimEnd(),
                    socketurl : jsondata.socket.trimEnd()
                }

                console.log(initLst);
             //   Alert.alert("initLst found ")
                await Com_SaveApiStorage(initLst);
                setAppApi(initLst)
            }
            else{
              //  Alert.alert("inside else part ")
                setError("error")
            }
            console.log()
            action.setSubmitting(false);
            
        }
        catch(e){
          //  Alert.alert("inside catch ")
            Alert.alert("2:"+e.message)
            console.log(e.message)
        }
        finally{

        }
    }

    const setAppApi = (iplst)=>{
        if(iplst != null)
        {
            // config.ApiUrl = (iplst.webapi.includes("http")?iplst.webapi:"http://" + iplst.webapi);// + ":8060",
            // config.WebUrl = (iplst.weburl.includes("http")?iplst.weburl:"http://" + iplst.weburl);// + ":8010",
            // config.WebsocketUrl = (iplst.socketurl.includes("http")?iplst.socketurl:"http://" + iplst.socketurl); // + ":8050",
            // config.VideoUrl = config.WebUrl +"/hls"; // + ":8010/hls"
            let configuration = Com_SetAppApi(iplst);
            console.log("start:setAppApi setting configuration here");
            console.log(configuration);
            setip(configuration.ApiUrl);
            navigation.navigate("Login");
        }

    }

    const getExistingIP = (ip)=>{
        setip(ip)
     //   navigation.navigate("Login")

    }

    return(
        <View style={[globalStyles.container_main,{flex:1}]}>
            <View style={[globalStyles.container_screen]}>
                <HeaderCardComponent>
                    <Image source={logoIcon} />
                </HeaderCardComponent>
            </View> 
            <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center', marginTop:20}}>
                Mobile App Server
            </Text>

            <View style={[globalStyles.container_main,{marginHorizontal:50, marginTop:80}]}>
                <Formik 
                    initialValues={initialValues}
                    
                    onSubmit={(values, action)=>{
                        console.log('submitting values')
                        let tvalues = values;
                        console.log(tvalues);
                        onPressSubmit(tvalues, action)

                    }}
                    validationSchema={validationSchema}
                >
                    {(formikProps)=>(
                        <View>
                            <Text style={[globalStyles.text,{marginVertical:20}]}>Enter server address to start the application</Text>
                            <TextInputTemplate 
                                setValue={formikProps.values.ipaddress}
                                setChangeText={formikProps.handleChange("ipaddress")}

                                setValErr={formikProps.touched && formikProps.errors.ipaddress}   
                                setPlaceHolder="e.g: 192.168.0.0:8010"
                            />
                        <View style={{marginTop:30}}>
                            {formikProps.isSubmitting?(
                                <ActivityIndicator />
                            ):(

                                <TouchableOpacity style={globalStyles.touchable_btn} 
                                onPress={formikProps.handleSubmit}>
                                    <Text style={globalStyles.text_btn}>Save</Text>
                                </TouchableOpacity>
                            )}

                            {
                                error =="error" &&
                                <Text style={[globalStyles.error_text,{marginVertical:10}]}>
                                    Unable to connect to the server.
                                </Text>
                            }
                            <Text style={[globalStyles.small_text,{marginVertical:20}]}>
                                After saving, you will be able to sign in.
                            </Text>
                        </View>

                        </View>
                    )}

                </Formik>
                {
                    ipaddr != null && ipaddr!='' &&
                    <>
                        <Text style={{marginVertical:30}}>
                            You were connected to existing server: {ipaddr}
                        </Text>
                        <View style={{marginVertical:20, marginHorizontal:20,backgroundColor:'#f7f7f7'
                                , alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login',{resetVal:'true'})}
                                style={{ flexDirection:'row', paddingVertical:10}}>
                                <Ionicons name="chevron-back-outline" size={20} color="gray" />
                                <Text style={[globalStyles.lnk_btn,{textAlign:'center', fontSize:14}]}>
                                     Back to Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <React.Fragment>
                            {/* <DesignTriComponent />  */}
                            {/* <Text>{log}</Text> */}
                        </React.Fragment>
                    </>
                }
                
            </View>

           
        </View>
    )
}

export default ConnectApiScreen;

const styles = StyleSheet.create({
    text:{
        color:'red',
        fontSize:15
    }
})