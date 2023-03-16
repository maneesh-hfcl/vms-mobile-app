import React, { useContext, useEffect, useState } from "react";
import {View, Text, StyleSheet, Pressable, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import MapView, {Marker} from "react-native-maps"
import * as Location from 'expo-location'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Formik } from "formik";
import * as yup from 'yup';
import UserContext  from "../../shared/usrContext";
import Config from "../../configuration/config"
import MsgCardComponent from "../../component/card/msgCard";


const AddEmergencyScreen = ({navigation, route})=>{
    const[location, setLocation] = useState(null);
    const{img, vid, delData} =  route.params;
    const[mapLoc, setMapLoc] = useState(null)
    const {userVal, setUserVal} = useContext(UserContext);

    
    const initialValues = {
       description: '',
       location: '' 
    }


    const validationSchema = yup.object().shape({
        description: yup.string().required(),
        location: yup.string().required()
    })

    useEffect(()=>{
        

        (async()=>{
            let {status} = await Location.requestForegroundPermissionsAsync()
            if(status === 'granted'){
                let location = await Location.getCurrentPositionAsync()
                setLocation(location)
                console.log(location.coords.latitude)
                setMapLoc({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta:0.005,
                })
            }
            else{
                Alert.alert('Permission not granted for location access')
            }
        })()
        console.log("userval")
        console.log(userVal.id)
    },[])
    
    const pressCloseDialog = ()=>{
        navigation.pop()
    }

    const submitForm = (values, action)=>{
        //let imgs =
     //   console.log(img);
//        let urlPath = "http://192.168.2.197:5006/upload/"
        //let configAPIUrl = Config.ApiUrl;
        //console.log(configAPIUrl);
        action.setSubmitting(true);
        let urlPath = Config.ApiUrl +  "/emergency/add"
        const formData = new FormData()
        formData.append("description", values.description)
        formData.append("location", values.location)
        formData.append("lat", mapLoc.latitude.toFixed(4))
        formData.append("long", mapLoc.longitude.toFixed(4))
        formData.append("userid", userVal.id)
        let i = 1;
        for(let image of img)
        {
            formData.append(`file${i}`,{ 
                uri: image, 
                name: image.split('/')[image.split('/').length - 1], 
                type: `image/jpg` 
              })
            i++;
        }


        console.log(formData);
        console.log("posting values")
        
        fetch(urlPath,{
            method:'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
              },
        })
        .then((response) => response.json())
        .then((result) => {

            console.log(result)
            
            action.setSubmitting(false);
            if( result == "Success")
            {
                //pressCloseDialog(); 
                navigation.navigate("EmergencyHome",{retVal:'added'})
                  
            }
        })
        .catch((error) => {
            console.error("Error: ", error)
        })
    }

    return(
        <View style={[{ flex:1}]}>
            {/* <UserContext.Consumer>
                {
                    user =>{
                        console.log(user)
                    }
                }
            </UserContext.Consumer> */}
            <Pressable onPress={Keyboard.dismiss} style={{position:"absolute",backgroundColor:'black', height:'100%'
                , width:'100%', opacity:0.4}}>
                
            </Pressable>
            <View style={{marginTop:110, alignItems:'center', marginHorizontal:10, marginVertical:10}}>
                <FontAwesome onPress={pressCloseDialog} name="close" size={30} color="#fff" />
            </View>
            <View style={[styles.modal_dialog,{ flex:1, marginTop:0}]}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, action)=>{
                    //Alert.alert("posting values");
                    submitForm(values, action)
                }}
                validationSchema={validationSchema}
            >
                {(formikProps)=>(
       
                    <View>
                
                <View style={{marginHorizontal:0, marginTop:20}}>

                    <View style={{}}>  

                    <Text style={{marginVertical:3}}>Description*</Text>
                    <TextInput style={[globalStyles.text_input,
                                    {width:Dimensions.get('screen').width-20, 
                                    height:80, borderWidth:1, textAlignVertical:'top',
                                    
                                    },
                                    (formikProps.errors.description?{borderColor:'red'}:{})
                                ]} 
                                multiline 
                                placeholder="Enter description of incident"
                                value={formikProps.values.description}
                                onChangeText={formikProps.handleChange("description")}
                                
                                />

                    <Text style={[ {marginTop:10, marginVertical:3}]}>Location*</Text>
                    <TextInput multiline placeholder="Enter location name" 
                        value={formikProps.values.location}
                        onChangeText={formikProps.handleChange("location")}                    
                        style={[globalStyles.text_input,{borderWidth:1, height:50}
                            , (formikProps.errors.location?{borderColor:'red'}:{})
                        ]} />
                    <View style={{flexDirection:'row', marginTop:15, alignItems:'flex-end', marginHorizontal:2}}>
                        <Text style={{}}>Attachment</Text>
                        <View style={{ flexDirection:'row', alignItems:'flex-end', justifyContent:'space-around', flex:1}}>
                            <View style={{flexDirection:'row', alignItems:'center', marginLeft:20}}>
                                <Entypo name="image" size={24} color="green" />
                                <Text style={{marginHorizontal:5, color:'gray'}}>Total: {img.length}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Entypo name="video" size={24} color="red" />
                                    <Text style={{marginHorizontal:5, color:'gray'}}>Total: {vid.length}</Text>
                            </View>
                        </View>
                    </View>
                    
                   
                </View>
                { !mapLoc &&
                    <View style={{marginVertical:20, justifyContent:'center', alignItems:'center'}}> 
                        <ActivityIndicator />
                        <Text style={{color:'gray', marginVertical:10}}>Loading map...please wait</Text>
                    </View>
                }
                {
                    mapLoc && 
                <View style={{borderWidth:0, borderColor:'#e7e7e7', 
                            alignSelf:'stretch', 
                            justifyContent:'center',
                            alignItems:'center',
                            marginVertical:0,
                            width: Dimensions.get('screen').width-20,
                             height:200,
                            marginLeft:0
                            }}
                        >
                        <MapView 
                        initialRegion={mapLoc} 
                        style={{alignSelf:'stretch', 
                        flex:1, borderWidth:1, borderColor:'#e5e5e5', marginVertical:20}}
                        >
                        
                            <Marker coordinate={mapLoc}
                                pinColor='red'
                            />
                        
                        </MapView>
                        
                        <Text style={globalStyles.text_form}>Position (lat - long)</Text>
                        <Text>{mapLoc.latitude.toFixed(4)} - {mapLoc.longitude.toFixed(4)} </Text>
                
                </View>
            }
                </View>
                    { formikProps.isSubmitting && 
                    <MsgCardComponent msg="Kindly wait. Saving data to server ....">
                        <ActivityIndicator  />
                    </MsgCardComponent>
                    }
                    <View style={{marginVertical:10}}>
                        <TouchableOpacity style={globalStyles.form_btn}
                            onPress={formikProps.handleSubmit}
                        >
                            <Text style={[globalStyles.text_btn,{padding:5}]}>Save All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
                </Formik>    
            </View>

        </View>
    )
}

export default AddEmergencyScreen;

const styles=StyleSheet.create({
    modal_dialog:{
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,

      borderWidth:1,
      borderColor:"#e7e7e7",
      paddingHorizontal:10,
      paddingVertical:0,
      
  }
})