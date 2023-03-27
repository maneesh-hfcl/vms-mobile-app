import { Video } from "expo-av";
import React from "react";  
import {View, Text, StyleSheet, Pressable} from 'react-native'
import DialogOuterCard from "../../component/card/dialogOuterCard";
import PlayVideo from "./playVideo";
import { Feather } from '@expo/vector-icons';

const PTZScreen  = ({navigation,route})=>{
    const {cam} = route.params

    const pressCloseDialog = ()=>{
        navigation.pop()
    }
    const closeCam = ()=>{

    }

    return(
        <DialogOuterCard pressCloseDialog={pressCloseDialog}>
            
            <View style={{flex:1,backgroundColor:'#000'}}>
                <PlayVideo camToPlay ={cam} isRec={false} 
                            closeCam={closeCam} dateRec={''} />
            </View>
            <View style={{flexDirection:'row', 
                justifyContent:'space-evenly', paddingVertical:40
                , borderTopWidth:5,borderColor:'#a7a7a7',
                backgroundColor:'#ededed'
                }}>
                <View>
                <View style={{flexDirection:'row'}}>
                    <Feather name="arrow-up-left" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="arrow-up" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="arrow-up-right" size={24} color="black" style={styles.arrow_outer} />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Feather name="arrow-left" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="home" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="arrow-right" size={24} color="black" style={styles.arrow_outer} />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Feather name="arrow-down-left" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="arrow-down" size={24} color="black" style={styles.arrow_outer} />
                    <Feather name="arrow-down-right" size={24} color="black" style={styles.arrow_outer} />
                </View>
                </View>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Feather name="plus" size={24} color="black" style={styles.arrow_outer} />
                        <Text style={{marginHorizontal:10}}>Zoom</Text>
                        <Feather name="minus" size={24} color="black" style={styles.arrow_outer} />
                    </View>
                </View>

            </View>
        </DialogOuterCard>
    )
}

export default PTZScreen;

const styles = StyleSheet.create({
    arrow_outer:{
        paddingHorizontal:5,
        paddingVertical:5,
        borderWidth:1,
        borderColor:"#a7a7a7",
        color:"#4a4a4a",
        marginHorizontal:3,
        marginVertical:3,
        fontSize:20,
        backgroundColor:'#fff'
        
    }
})