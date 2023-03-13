import React, { useCallback, useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Dimensions, ActivityIndicator , KeyboardAvoidingView} from 'react-native';
import HeaderCardComponent from "../component/card/headerCard";
import FooterScreen from "../component/footer";
import { globalStyles } from "../style/globalstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const logoIcon = require('../assets/icons/logo.png')
import  Constants  from "expo-constants";
import * as SplashScreen from 'expo-splash-screen';

import TextInputTemplate from "../component/card/form/textInputTemplate";
import DesignCirComponent from "../component/designCirComponent";
import { Formik } from "formik";
import { LoadApiPostData } from "../shared/fetchUrl";
import MsgCardComponent from "../component/card/msgCard";
import DesignTriComponent from "../component/designTriComponent";


//SplashScreen.preventAutoHideAsync();
const WIDTH = Dimensions.get('screen').width;

const LoginScreen = ({navigation})=>{
    const[isAppReady, setIsAppReady] = useState(false)
    const[focusName, setFocusName] = useState('')
    const[isValid, setIsValid] = useState(true);

    useEffect(()=>{
        console.log(Constants.sessionId)
        getLoginFrmStorage()
    },[])

    async function getLoginFrmStorage(){
        try
        {
            let user = await AsyncStorage.getItem("@user")
            if(user!= null)
            {
                pressChkDvHandler();
            }
            else{
                setIsAppReady(true)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{

        }
    }

    const pressChkDvHandler = async ()=>{
     //   console.log(focusName)
        try{
            let chkDevReg = await AsyncStorage.getItem("@reg_dev")
            console.log("checking device registration");
            console.log(chkDevReg);
            setIsAppReady(true)
            if(chkDevReg == null)
            {
                console.log("inside if chkdevreg")
                navigation.navigate("RegDevice")
            }
            else{
                console.log("after checkdev reg")
               // Alert.alert("you are here")
                navigation.navigate("Home")
            }

        }
        catch(e){

        }

    }

    const onPressSubmit = async (values, action)=>{
        Alert.alert("hello")
        setIsValid(true);
        let urlpath = "/login";
        values.username = 'Administrator',
        values.password = 'I0wWt9ngHKfO6BJdS8fqaA=='
        
        let jsonData = await LoadApiPostData(urlpath,"POST", values);
        action.setSubmitting(false);
        if(jsonData != "error")
        {
           // setIsValid(true);
           try{
            await AsyncStorage.setItem("@user", JSON.stringify(jsonData))
            pressChkDvHandler()
           }
           catch(e){

           }

        }
        else{
            console.log("you have got an error");
            setIsValid(false);
        }

    }


    const LayoutRootView = useCallback( ()=>{
 //       SplashScreen.hideAsync()
    },[isAppReady])

    if(!isAppReady){
        return(
            <View style={[globalStyles.container_main, 
                globalStyles.container_header_logo,globalStyles.container_header,
                {justifyContent:'center', flex:1}
            ]}>
                <Image source={logoIcon} />
              
                <Text style={{color:'#909090',
                    fontSize:16, marginHorizontal:30, marginVertical:40
    
            
            }}>It is a modern, intelligent surveillance and monitoring system for remote supervision</Text>
            </View>
        )
    }

    return(
        <View style={{flex:1, backgroundColor:"#fff"}} onLayout={LayoutRootView}>  
                <View style={[globalStyles.container_screen, {

                }]}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                        
                    </HeaderCardComponent>
                    
                </View>

                <View style={[globalStyles.container_login_view
                    ,{backgroundColor:'#fff',
                    borderTopWidth:5,
                    borderColor:'#fc8f47',flex:1
                    }]}> 
                    <View style={{marginHorizontal:20, marginTop:10}}>
                    <View style={{marginVertical:15}}>
                        <Text style={{fontSize:25, fontWeight:'bold', color:'#e37734', 
                        marginHorizontal:10}}>Sign in</Text>
                        <Text style={{fontSize:13, color:'#856d39',marginVertical:10, marginHorizontal:10}}>
                            Enter your credentials to use the application
                        </Text>
                    </View>

                    <Formik
                        initialValues={{
                            username:'',
                            password: ''
                        }}
                        onSubmit = {(values, action)=>{
                            console.log('submitting values')
                            onPressSubmit(values, action);
                           // console.log(JSON.stringify(values))
                        }}
                    >
                        {(formikProps) =>(
                        <View>
                        <View style={{flexDirection:'row', alignItems:'flex-end', 
                            justifyContent:'flex-end', marginVertical:0,}}> 
                            <FontAwesome name="user-circle" size={22} color="green" 
                           style={{marginVertical:0, flex:0.1,
                           
                            marginHorizontal:10}}
                           />
                           <View style={{flex:1}}>
                               <TextInputTemplate isSelect={focusName=="username"} 
                               setChangeText = {formikProps.handleChange("username")}
                               setFocusName={() => {
                                   setFocusName("username")}}  />
                           </View> 
                       </View>

                       <View style={{flexDirection:'row', alignItems:'flex-end', 
                                    justifyContent:'flex-end',
                                    marginVertical:15}}>
                            <FontAwesome name="lock" size={23} color="#9c172d" 
                            style={{marginVertical:0, flex:0.1,
                                marginHorizontal:10}}
                            />
                            <View style={{flex:1}}>
                                <TextInputTemplate isSelect={focusName == "password"} 
                                    setChangeText={formikProps.handleChange("password")}
                                    setFocusName={() => setFocusName("password")} password={true} />
                            </View>
                        </View> 
                        <View style={{marginBottom:0, marginTop:10}}>
                        
                           
                                <TouchableOpacity style={[globalStyles.touchable_btn]} 
                                onPress={formikProps.handleSubmit}>
                                    <Text style={globalStyles.text_btn}>Go</Text>
                                </TouchableOpacity>

                            
                        

                    {
                        formikProps.isSubmitting && 
                        <View>
                            <MsgCardComponent msg="Validating user....">
                                <ActivityIndicator  />
                            </MsgCardComponent>
                        </View>
                    }
                    {
                        !isValid &&
                        <View>
                            <MsgCardComponent msg="Invalid user">
                                
                            </MsgCardComponent>
                        </View> 
                        
                    }


                        </View>

                    </View>

                        )}
                    </Formik>
                   

                    

                {/* </View> */}
                    
                </View>


                </View> 

                <DesignTriComponent /> 

                <FooterScreen />
        </View>
        
    )
}

export default LoginScreen; 

const styles = StyleSheet.create({
   
})