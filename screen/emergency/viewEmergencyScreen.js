import React from "react";
import {View, Text, StyleSheet, Pressable, Keyboard, Image} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import MsgCardComponent from "../../component/card/msgCard";
import { ActivityIndicator } from "react-native-paper";

const ViewEmergencyImage = ({navigation, route})=>{
    const{imageUrl} = route.params;
    const pressCloseDialog = ()=>{
        navigation.pop()
    }
    return(
        <View style={[{ flex:1}]}>
            
            <Pressable onPress={pressCloseDialog} style={{position:"absolute",backgroundColor:'black', height:'100%'
                , width:'100%', opacity:0.4}}>
                
            </Pressable>
            <View style={{marginTop:80, alignItems:'center', marginHorizontal:2, marginVertical:10}}>
                <FontAwesome onPress={pressCloseDialog} name="close" size={30} color="#fff" />
            </View>
            <View style={[globalStyles.modal_dialog,{ flex:1, backgroundColor:'#000', borderWidth:0}]}>
               
                <View style={{position:'absolute', paddingVertical:50, paddingHorizontal:50,
                        zIndex:-1, top:'30%', left:'30%'}}>

                    <ActivityIndicator color="lime"size={20} />
                </View>
                <Image source={{uri:imageUrl}} style={{flex:1}} 
                
                resizeMode="contain" />
            </View>
        </View>
    )
}

export default ViewEmergencyImage;