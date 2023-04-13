import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import { globalStyles } from "../style/globalstyle";
import HeaderCardComponent from "../component/card/headerCard";
const logoIcon = require('../assets/icons/logo.png')
import { Formik } from "formik";
import * as yup from 'yup';
import TextInputTemplate from "../component/card/form/textInputTemplate";
import config from "../configuration/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DesignTriComponent from "../component/designTriComponent";


const validationSchema = yup.object().shape({
    ipaddress : yup.string().required()
})

const ConnectApiScreen = ({navigation, route})=>{
    const[ipaddr, setip] = useState(null)
    var initialValues;

    useEffect(()=>{
        if(route.params != null)
        {
            const{resetVal} =route.params;
            GetAPIFrmStorage(resetVal)
        }
        else{
            GetAPIFrmStorage('')
        }
    },[route.params])

    
 

    const GetAPIFrmStorage = async(val)=>{
        try{
            let value = await AsyncStorage.getItem("@api")
            if(value != null)
            {
                var elemVal = JSON.parse(value)
                if(val != '')
                {
                    getExistingIP(elemVal)
                }
                else{
                    setAppApi(elemVal)
                }
            }
        }
        catch(e){

        }
        finally{

        }
    }

    const onPressSubmit= async (values, action)=>{
        try
        {
            action.setSubmitting(false);
            await AsyncStorage.setItem("@api", JSON.stringify(values.ipaddress.trim()))
            setAppApi(values.ipaddress.trim())
        }
        catch(e){

        }
        finally{

        }
    }

    const setAppApi = (ip)=>{
        console.log(`ip: ${ip}`)
        config.ApiUrl = (ip.includes("http")?ip:"http://" + ip) + ":8060",
        config.WebUrl = (ip.includes("http")?ip:"http://" + ip) + ":8040",
        config.WebsocketUrl = (ip.includes("http")?ip:"http://" + ip) + ":8050",
        config.VideoUrl = (ip.includes("http")?ip:"http://" + ip) + ":8040/hls"
        console.log(config)
        console.log(`ip address: ${ip}`)
        
   
        setip(ip)
        navigation.navigate("Login")

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
            { ipaddr && 
            <View style={[globalStyles.container_main,{marginHorizontal:50, marginTop:80}]}>
                <Formik 
                    initialValues={{
                        ipaddress: ipaddr
                    }
                    }
                    
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
                                setPlaceHolder="e.g: 192.168.0.0"
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
                            <Text style={[globalStyles.small_text,{marginVertical:20}]}>
                                After saving, you will be able to sign in.
                            </Text>
                        </View>

                        </View>
                    )}

                </Formik>

                
            </View>
        }
            <React.Fragment>
                <DesignTriComponent /> 
            </React.Fragment>
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