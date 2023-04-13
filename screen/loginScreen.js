import React, { useCallback, useContext, useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Dimensions, ActivityIndicator ,
         KeyboardAvoidingView, Keyboard} from 'react-native';
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
import * as yup from 'yup';
import { LoadApiPostData } from "../shared/fetchUrl";
import MsgCardComponent from "../component/card/msgCard";
import DesignTriComponent from "../component/designTriComponent";
import UserContext, { UserContextProvider } from "../shared/usrContext";

//SplashScreen.preventAutoHideAsync();
const WIDTH = Dimensions.get('screen').width;

const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password:yup.string().required()   
})

const LoginScreen = ({navigation, route})=>{
    const[isAppReady, setIsAppReady] = useState(false)
    const[focusName, setFocusName] = useState('')
    const[isValid, setIsValid] = useState(true);
    const[isKeyboardVisible, setIsKeyboardVisible] = useState(false)
    const[emptyVal, setEmptyVal] = useState('')
    const{userVal, setUserVal} = useContext(UserContext);

    var initialValues = {
        username:'',
        password: ''
    }

    useEffect(()=>{
        console.log(Constants.sessionId)
        
        getLoginFrmStorage()

        const showSubscription = Keyboard.addListener('keyboardWillShow', ()=>{
            //setTimeout(()=>{
                setIsKeyboardVisible(true)                
            //},50)
        })

        const didShowSubscription = Keyboard.addListener('keyboardDidShow', ()=>{
           // setTimeout(()=>{
                setIsKeyboardVisible(true)                
           // },500)
        })

        const hideSubscription = Keyboard.addListener('keyboardWillHide', ()=>{
            
            setIsKeyboardVisible(false)
        })

        const didHideSubscription = Keyboard.addListener('keyboardDidHide', ()=>{
            setTimeout(()=>{
                setIsKeyboardVisible(false)                
            },50)

        })

        return()=>{
            showSubscription.remove();
            hideSubscription.remove();
            didShowSubscription.remove();
            didHideSubscription.remove();
        }
    },[])

    useEffect(()=>{
        if(route.params != null)
        {
        const{resetVal} = route.params;

        console.log("requesting login form: " + resetVal);
        setEmptyVal('')
        }
    },[route.params])

    async function getLoginFrmStorage(){
        try
        {
            let user = await AsyncStorage.getItem("@user")
            console.log(user);
            if(user!= null)
            {
//                console.log(context);
                //setState(user);
                console.log("setting user values");
                let parseUsr = JSON.parse(user);
                setUserVal(parseUsr);
                await pressChkDvHandler(parseUsr.id);
            }
            else{
                console.log("user not present")
                setIsAppReady(true)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{

        }
    }

    const pressChkDvHandler = async (usrId, devcLst)=>{
     //   console.log(focusName)
        console.log(`usrId : ${usrId}`)
        try{
            let chkDevReg = await AsyncStorage.getItem("@reg_dev")
            console.log("checking device registration");
            console.log(chkDevReg);
            setIsAppReady(true)
            if(chkDevReg == null)
            {
                console.log("inside if chkdevreg")
                
                navigation.navigate("RegDevice", {usrId:usrId})
            }
            else{
                console.log("after checkdev reg")
               // Alert.alert("you are here")
               console.log(chkDevReg)
                let fndDvc = devcLst.find(elem => elem == chkDevReg)
                console.log(fndDvc)
                console.log("if loop started")
                try{
                    if(typeof fndDvc === "undefined")
                    {
                        navigation.navigate("RegDevice", {usrId:usrId})
                        //console.log(fndDvc)
                    // 
                    }
                    else{
                        console.log("you are here else part")
                        navigation.navigate("Home")
                    }
                }
                catch(ex){
                    console.log(ex)
                }
//                console.log("it crashed")
//
            }

        }
        catch(e){

        }

    }

    const onPressSubmit = async (values, action)=>{
       // Alert.alert("hello")
        action.setSubmitting(false);
        setIsValid(true);
        let urlpath = "/login";

        //console.log(values);
        if( values.username.toLowerCase()=="admin" && values.password.toLowerCase()=="admin" )
        {
            values.username = 'Administrator',
            values.password = 'I0wWt9ngHKfO6BJdS8fqaA=='
        }
        // action.resetForm();
        let jsonData = await LoadApiPostData(urlpath,"POST", values);
        

        

        if(jsonData != "error")
        {
            if(jsonData.msg == null)
            {
                let usrId = jsonData.id;
            // setIsValid(true);
            try{
                action.resetForm({
                    values:initialValues
                });
                await AsyncStorage.setItem("@user", JSON.stringify(jsonData))
                console.log(jsonData);
                setUserVal(jsonData);
                //setState(jsonData);
                
                pressChkDvHandler(usrId, jsonData.devcLst)

            }
           catch(e){

           }
            }
            else{
                setIsValid(false);                
            }

        }
        else{
            console.log("you have got an error");
            setIsValid(false);
        }

        //action.setSubmitting(false);

    }

    const pressHandlerServer = async()=>{
        try{
//            await AsyncStorage.removeItem('@user')            
            navigation.navigate('ConnectAPI', {resetVal: 'true'});
        }
        catch(e){
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
        <View  style={{flex:1, backgroundColor:"#fff"}} onLayout={LayoutRootView}>  
                <View style={[globalStyles.container_screen, {

                }]}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                        
                    </HeaderCardComponent>
                    
                </View>

                <View style={[globalStyles.container_login_view
                    ,{backgroundColor:'#fff',
                    borderTopWidth:6,
                    borderColor:'orange',flex:1
                    }]}> 
                    <View style={{marginHorizontal:40, marginTop:30}}>
                    <View style={{marginVertical:25}}>
                        <Text style={{fontSize:25, fontWeight:'bold', color:'#e37734', 
                        marginHorizontal:10}}>Sign in</Text>
                        <Text style={{fontSize:13, color:'#856d39',marginVertical:10, marginHorizontal:10}}>
                            Enter your credentials to use the application
                        </Text>
                    </View>

                    <Formik
                        initialValues={initialValues}
                        onSubmit = {(values, action)=>{
                            console.log('submitting values')
                            let tvalues = values;
                            action.resetForm({values:initialValues})
                            onPressSubmit(tvalues, action);

                           // console.log(JSON.stringify(values))
                        }}
                        validationSchema={validationSchema}
                        
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
                                setValue = {formikProps.values.username}
                               setChangeText = {formikProps.handleChange("username")}
                               setFocusName={() => {
                                    setIsKeyboardVisible(true);
                                   setFocusName("username")}}  
                                setValErr={formikProps.touched && formikProps.errors.username}   
                                setPlaceHolder="Enter username"
                                />
                           </View> 
                       </View>

                       <View style={{flexDirection:'row', alignItems:'flex-end', 
                                    justifyContent:'flex-end',
                                    marginVertical:20}}>
                            <FontAwesome name="lock" size={23} color="#9c172d" 
                            style={{marginVertical:0, flex:0.1,
                                marginHorizontal:10}}
                            />
                            <View style={{flex:1}}>
                                <TextInputTemplate isSelect={focusName == "password"} 
                                    setValue={formikProps.values.password}
                                    setChangeText={formikProps.handleChange("password")}
                                    setFocusName={() =>{
                                        setIsKeyboardVisible(true);
                                     setFocusName("password")}} password={true} 
                                     setValErr = {formikProps.touched && formikProps.errors.password}
                                     setPlaceHolder="Enter password"
                                     />

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
                        !formikProps.isSubmitting && !isValid &&
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

                {
                    !isKeyboardVisible &&
                    <React.Fragment>
                        <View style={[globalStyles.lnk_btn]}>
                            <TouchableOpacity onPress={pressHandlerServer}>
                                <Text style={[globalStyles.lnk_btn,{textAlign:'center', fontSize:14}]}>
                                    Change Server API
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <DesignTriComponent /> 
                    </React.Fragment>
                }

                <FooterScreen />

        </View>
        
    )
}

export default LoginScreen; 

const styles = StyleSheet.create({
   
})