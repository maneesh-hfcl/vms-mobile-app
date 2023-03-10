import React from "react";
import {View, Text, StyleSheet, Pressable, Keyboard, Image} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome } from '@expo/vector-icons';

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
            <View style={{marginTop:50, alignItems:'center', marginHorizontal:2, marginVertical:10}}>
                <FontAwesome onPress={pressCloseDialog} name="close" size={30} color="#fff" />
            </View>
            <View style={[globalStyles.modal_dialog,{ flex:1}]}>
                <Image source={{uri:imageUrl}} style={{flex:1}} resizeMode="contain" />
            </View>
        </View>
    )
}

export default ViewEmergencyImage;