import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Pressable, Dimensions, TextInput, TouchableOpacity} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import MapView, {Marker} from "react-native-maps"
import * as Location from 'expo-location'

const AddEmergencyScreen = ({navigation})=>{
    const[location, setLocation] = useState(null);
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
    },[])
    
    const pressCloseDialog = ()=>{
        navigation.pop()
    }


    return(
        <View style={[{ flex:1}]}>
            <Pressable onPress={pressCloseDialog} style={{position:"absolute",backgroundColor:'black', height:'100%'
                , width:'100%', opacity:0.4}}>
            </Pressable>
            <View style={{flex:0.25}}/>
            <View style={[styles.modal_dialog,{ flex:0.75}]}>
                {
                    mapLoc && 
                    <View>
                        <View style={{borderWidth:0, borderColor:'#e7e7e7', 
                            alignSelf:'stretch', 
                            justifyContent:'center',
                            alignItems:'center',
                            marginVertical:5,
                            width: Dimensions.get('screen').width-20,
                             height:180,

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

                </View>
                    <Text>Location</Text>
                    <TextInput placeholder="Enter location name" 
                        style={[globalStyles.text_input,{borderWidth:1}]} />
                    <Text style={{marginTop:10
                    }}>Description*</Text>
                    <TextInput style={[globalStyles.text_input,
                                    {width:Dimensions.get('screen').width-20, 
                                    height:100, borderWidth:1, textAlignVertical:'top'}]} 
                                multiline 
                                placeholder="Enter description of incident"
                                />
                    <View style={{marginVertical:20}}>
                        <TouchableOpacity style={globalStyles.form_btn}>
                            <Text style={[globalStyles.form_btn_text,{padding:5}]}>Save All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
        </View>
    )
}

export default AddEmergencyScreen;

const styles=StyleSheet.create({
    modal_dialog:{
        borderRadius:25,
        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,

      borderWidth:1,
      borderColor:"#e7e7e7",
      paddingHorizontal:10,
      paddingVertical:10,
      
  }
})