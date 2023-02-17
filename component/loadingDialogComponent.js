import React from "react";
import { Text, View, StyleSheet, Modal, ActivityIndicator } from "react-native";

const LoadingDialogComponent = ({isVisible}) =>{
    return(
        <Modal animationType="fade"
            transparent={true}
            visible={isVisible}
            
        >
            <View style={styles.modal_back}>
            </View>
            <View style={styles.modal_inner}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', flex:1}}>
                    <ActivityIndicator />
                    <Text style={styles.modal_text}>Please wait...</Text>
                </View>
            </View>
            
        </Modal>

    )
}

export default LoadingDialogComponent;

const styles = StyleSheet.create({
  modal_back:{
    backgroundColor:'gray',
    opacity:0.5,
    flex:1

    },
    modal_inner:{
        backgroundColor:'#fff',
        width:'100%',
        paddingVertical:20,

        borderWidth:1,
        borderColor:'#e7e7e7',
        position:'absolute',
        top:'45%',
        flexDirection:'row',

    },
    modal_text:{
        marginHorizontal:15, fontSize:18,
        color:'gray'
    }  
})