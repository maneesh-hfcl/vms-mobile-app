import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView} from 'react-native'

const BaseContainer = ({children})=>{
    return(
        
            <KeyboardAvoidingView style={styles.container}
                //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={[styles.container, {}]}>
                        {children}
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        
    )
}

export default BaseContainer;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#fff',
      paddingTop:0 

    },
  });


  