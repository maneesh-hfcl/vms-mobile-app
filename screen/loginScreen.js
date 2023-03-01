import React, { useCallback, useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Dimensions, TextInputComponent} from 'react-native';
import HeaderCardComponent from "../component/card/headerCard";
import FooterScreen from "../component/footer";
import { globalStyles } from "../style/globalstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const logoIcon = require('../assets/icons/logo.png')
import  Constants  from "expo-constants";
import * as SplashScreen from 'expo-splash-screen';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import TextInputTemplate from "../component/card/form/textInputTemplate";


//SplashScreen.preventAutoHideAsync();
const WIDTH = Dimensions.get('screen').width;

const LoginScreen = ({navigation})=>{
    const[isAppReady, setIsAppReady] = useState(false)
    const[focusName, setFocusName] = useState('')
    useEffect(()=>{
        console.log(Constants.sessionId)
        prepare()
    },[])

    async function prepare(){
        try
        {
//            const value = AsyncStorage.getItem('@reg_devc')
//            if(value)
            await new Promise(resolve => setTimeout(()=>{setIsAppReady(true)}, 1000));
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsAppReady(true)
        }
    }

    const pressHandler = ()=>{
        console.log(focusName)
        navigation.navigate("RegDevice");
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
        <View style={{flex:1, backgroundColor:"#2a2e36"}} onLayout={LayoutRootView}>  
                <View style={globalStyles.container_screen}>
                    <HeaderCardComponent>
                        <Image source={logoIcon} />
                        
                    </HeaderCardComponent>
                    
                </View>

                {/* <Svg height="50%" width="100%" viewBox="0 0 100 400">
                    <Circle cx="0" cy="0" r="90"  stroke="blue" strokeWidth="2.5" fill="green" />
                    <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
                </Svg> */}
                {/* <Svg height={100} width={WIDTH}>
          {/* <Path
            d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 
                375 644H0C0 644 -66.5 724.5 -17.5 378.5Z" // put your path here
            fill="#f5e9d0"
            stroke="blue"
          />   

        </Svg> */}
            {/* <View style={{
                width:WIDTH,
                height:'100%',
                backgroundColor:'#fff',
                borderRadius:30,
                
                position:'absolute',
                zIndex:-1,
                top:100,
                left:0
            }}>

            </View> */}
            
            <View style={[{
                    backgroundColor:'#ededed',
                    borderTopEndRadius:50,
                    borderTopStartRadius:50,
                    paddingTop:100,
                    marginTop:20,
                    justifyContent:'flex-start',
                    paddingHorizontal:40,
                    paddingBottom:10
                                    
                }]}>

                    <Text style={{fontSize:25, fontWeight:'bold', color:'#e37734'}}>Login</Text>
                    <Text style={{fontSize:13, color:'#856d39',marginVertical:10}}>
                        Enter your credential to use the application
                    </Text>
                </View> 

                <View style={[globalStyles.container_login_view
                    ,{backgroundColor:'#ededed'}]}>
                    <View style={{flexDirection:'row', alignItems:'flex-end', 
                            justifyContent:'flex-end', marginVertical:10,}}>
                        <FontAwesome name="user-circle" size={23} color="green" 
                            style={{marginHorizontal:10,
                            flex:0.1}}
                        />
                            {/* <TextInput 
                                style={[globalStyles.text_input,{flex:1, marginHorizontal:10}
                                ,focusName=="username"?{borderColor:'#0981e3'}:{}]} 
                                onFocus={()=> setFocusName('username') }
                                defaultValue=''                         
                            /> */}
                        <View style={{flex:1}}>
                            <TextInputTemplate isSelect={focusName=="username"} setFocusName={() => {
                                setFocusName("username")}}  />
                        </View> 
                    </View>
                    <View style={{flexDirection:'row', alignItems:'flex-end', 
                                    justifyContent:'flex-end',
                                    marginVertical:10}}>
                        <FontAwesome name="lock" size={24} color="#9c172d" 
                        style={{marginVertical:0, flex:0.1,
                            marginHorizontal:10}}
                        />
                        <View style={{flex:1}}>
                            <TextInputTemplate isSelect={focusName == "password"} 
                                setFocusName={() => setFocusName("password")} />
                        </View>
                    </View>
                    <View style={{marginVertical:20}}>
                    <TouchableOpacity style={globalStyles.touchable_btn} onPress={pressHandler}>
                        <Text style={globalStyles.text_btn}>Go</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            
            <View>
                <FooterScreen />
            </View>
        </View>
    )
}

export default LoginScreen; 

const styles = StyleSheet.create({
   
})