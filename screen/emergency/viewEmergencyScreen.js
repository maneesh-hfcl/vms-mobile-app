import React, { useRef, useState } from "react";
import {View, Text, StyleSheet, Pressable, Keyboard, Image, Dimensions} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome,AntDesign } from '@expo/vector-icons';
import MsgCardComponent from "../../component/card/msgCard";
import { ActivityIndicator } from "react-native-paper";
import { ResizeMode, Video } from "expo-av";


const ViewEmergencyImage = ({navigation, route})=>{
    const{imageUrl, fileType} = route.params;
    const[playStatus, setPlayStatus] = useState({});
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const videoref = useRef(null);

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
                {
                    fileType == "image"?(
                        <Image source={{uri:imageUrl}} style={{flex:1}} 
                
                        resizeMode="contain" />
                    ):
                    (
                        <>
                            <Video ref={videoref}
                                    style={{width: windowWidth, height: windowHeight}}
                                    source={{
                                       uri: imageUrl //"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" 
                                    }}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping = {false}
                                    onPlaybackStatusUpdate={playStatus =>{ 
                                            //console.log(playStatus);
                                            setPlayStatus(() => playStatus)}
                                    }
                                />

                            <View style={{position:"absolute", justifyContent:"center",  
                                flexDirection:'row',
                                width:'100%',
                                opacity:0.5,
                                marginHorizontal:0,
                                marginBottom:20,
                                paddingTop:6,
                                paddingHorizontal:2,        
                                bottom:10,
                                backgroundColor:'gray',
                                borderWidth:5,
                                borderColor:"#a3bbc7",
                                height:70,
                                width:70,
                                borderRadius:35,
                                alignSelf:"center"   
                                }}>
                                       
                                    <AntDesign
                                    name={playStatus.isPlaying?"pausecircle":"caretright"} 
                                    size={45} color="#7bcf61" 
                                        onPress={() =>
                                         playStatus.isPlaying? videoref.current.pauseAsync()
                                         :
                                         playStatus?.didJustFinish?videoref.current.playFromPositionAsync(0):
                                         videoref.current.playAsync()} />
                            
                                </View>   
                            </> 
                    )

                }
 
            </View>
        </View>
    )
}

export default ViewEmergencyImage;