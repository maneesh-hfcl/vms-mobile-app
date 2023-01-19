import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView} from 'react-native'

const BaseContainer = ({children})=>{
    return(
        
            // <KeyboardAvoidingView style={styles.container}
            //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            //     >
            //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {children}
                    </View>
            //     </TouchableWithoutFeedback>
            // </KeyboardAvoidingView>
        
    )
}

export default BaseContainer;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
  
    },
  });