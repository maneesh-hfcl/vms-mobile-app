import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Pressable, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import MapView, {Marker} from "react-native-maps"
import * as Location from 'expo-location'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Formik } from "formik";
import * as yup from 'yup';

const AddEmergencyScreen = ({navigation, route})=>{
    const[location, setLocation] = useState(null);
    const{imgCount, vidCount} =  route.params;
    const[mapLoc, setMapLoc] = useState(null)

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
        console.log("Imagecount" + imgCount)
    },[])
    
    const pressCloseDialog = ()=>{
        navigation.pop()
    }


    return(
        <View style={[{ flex:1}]}>
            
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

                }}
            >
                {(formikProps)=>(

                
                    <View>
                 
                
                <View style={{marginHorizontal:0, marginTop:20}}>

                    <View style={{}}>  

                    <Text style={{marginVertical:3}}>Description*</Text>
                    <TextInput style={[globalStyles.text_input,
                                    {width:Dimensions.get('screen').width-20, 
                                    height:100, borderWidth:1, textAlignVertical:'top'}]} 
                                multiline 
                                placeholder="Enter description of incident"
                                />
                    <Text style={[ {marginTop:10, marginVertical:3}]}>Location</Text>
                    <TextInput placeholder="Enter location name" 
                        style={[globalStyles.text_input,{borderWidth:1}]} />
                    <View style={{flexDirection:'row', marginTop:15, alignItems:'center'}}>
                        <Text style={{}}>Attachment</Text>
                        <View style={{ flexDirection:'row', justifyContent:'space-around', flex:1}}>
                            <View style={{flexDirection:'row', alignItems:'flex-end', marginLeft:20}}>
                                <Entypo name="image" size={24} color="green" />
                                <Text style={{marginHorizontal:5, color:'gray'}}>Total: {imgCount}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                                    <Entypo name="video" size={24} color="red" />
                                    <Text style={{marginHorizontal:5, color:'gray'}}>Total: {vidCount}</Text>
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
                        
                        <Text style={globalStyles.text_form}>Coordinates (lat - long)</Text>
                        <Text>{mapLoc.latitude.toFixed(4)} - {mapLoc.longitude.toFixed(4)} </Text>
                
                </View>
            }
                </View>
                    <View style={{marginVertical:20}}>
                        <TouchableOpacity style={globalStyles.form_btn}>
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