import React from "react";
import { Text,View, StyleSheet, Pressable } from "react-native";

const DialogOuterCard = ({children, pressCloseDialog})=>{
    return(
        <View style={[{ flex:1}]}>
            <Pressable onPress={pressCloseDialog} style={{position:"absolute",backgroundColor:'black', height:'100%'
                , width:'100%', opacity:0.4}}>
                
            </Pressable>
            <View style={[styles.modal_dialog,{ marginTop:100}]}>
               {children} 
            </View>
        </View>
    )
}

export default DialogOuterCard;

const styles = StyleSheet.create({
    modalScreen:{
        height:'100%',
        borderTopColor:'red',
        borderTopWidth:1,
        backgroundColor:'#fff',
        marginTop:'40%'
    },
    modal_dialog:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,

      borderWidth:1,
      borderColor:"#e7e7e7",
      paddingHorizontal:0,
      paddingVertical:10,
      
  }
})