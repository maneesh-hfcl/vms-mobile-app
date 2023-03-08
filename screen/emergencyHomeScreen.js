import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
//import { globalStyles } from '../style/global';

const EmergencyHome = ()=>{
    const[hasPermission, setHasPermission] = useState(null)
    const[type, setType] = useState(CameraType.back)
    const[camera, setCamera] = useState(null)
    const[image, setImage] = useState([])
    const[curImageIndx, setCurImageIndx] = useState(-1)

    useEffect(()=>{
        (async()=>{
            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    },[])

    if(hasPermission === null){
        return <View>
            <Text>No Permission</Text>
        </View>
    }

    if(hasPermission === false){
        return <View>
            <Text>No access to camera</Text>
        </View>
    }

    const takePic = async ()=>{
//        Alert.alert("Taking picture")
        if(camera){
            const data = await camera.takePictureAsync(null)
            //console.log(data);
            setImage([data.uri, ...image])
            //console.log(image)
        }
    }

    const imgPress = (item, index)=>{
        console.log(image[index]);
        setCurImageIndx(index)
        
    }

    const delImg = (item, index)=>{
        let filteredItems = image.splice(curImageIndx, 1)
        console.log(filteredItems)
       // setImage(filteredItems)
        setCurImageIndx(-1)
        
        
    }

    const renderItem = ({item, index})=>{
            return(
                <View style={{marginVertical:5, marginHorizontal:1}}>
                    <TouchableOpacity onPress={() => imgPress(item, index)}>
                        {
                            (curImageIndx == index)?(
                            <Image source={{uri:item}} style={{width:70, 
                                height:70, borderRadius:3, borderWidth:2,
                                borderColor:'orange'
                            
                            }} />
                            ):
                            (
                                <Image source={{uri:item}} style={{width:70, 
                                    height:70, borderRadius:3,
                                
                                }} />
                            )
                        }
                    </TouchableOpacity>
                </View>
            )
    }

    const closeImg = ()=>{
       // Alert.alert(curImage)
       setCurImageIndx(-1)
    }

    return(

        <View style={{flex:1}}>
            <View style={{flex:0.1}}></View>
            { curImageIndx == -1 &&
                <Camera type={type} style={{flex:1}} ref={ref=> setCamera(ref)}></Camera>
            }
            { curImageIndx > -1 && 
                <View style={{flex:1}} >
                    
                    <Image source={{uri:image[curImageIndx]}} style={{flex:1}} /> 
                    <View style={{position:"absolute", bottom:14, backgroundColor:'black'
                        , flexDirection:"row", 
                        width:'100%',
                        justifyContent:"space-between",
                        marginHorizontal:0,
                        opacity:0.2,
                        paddingVertical:12,
                        }}>
                            <Text></Text>
                    </View>
                    <View style={{position:"absolute", bottom:15, 
                         flexDirection:"row", 
                        width:'100%',
                        justifyContent:"space-between",
                        marginHorizontal:0,
                        
                        }}>
                        <Text></Text>
                        <TouchableOpacity  onPress={delImg} style={{marginLeft:30}}>
                            <MaterialIcons name="delete" size={34} color="red" style={{borderWidth:0}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeImg} style={{marginRight:10}}>
                            {/* <Text style={{color:'red', fontWeight:'bold', alignSelf:'center', fontSize:22}}>X</Text> */}
                            <FontAwesome name="remove" size={30} color="white" style={{borderWidth:0, alignSelf:"center", marginRight:0}} />
                        </TouchableOpacity>
                    </View>

                </View>    
            }

            <View style={{flex:0.28}}>
                <View style={{flexDirection:"row"}}>
                    <View style={[styles.vw_btn,{flexDirection:'row', flex:0.7, alignItems:'center'}]}>
                        <Ionicons name="chevron-back-sharp" size={26} color="black" />
                        <Text style={styles.vw_text}>Back</Text>
                    </View>
                    <View style={[styles.vw_btn,{flex:1}]}>
                        <TouchableOpacity onPress={takePic}>
                            {/* <MaterialIcons name="camera" size={34} color="red" /> */}
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <View style={styles.vw_capture_icon}></View>
                           
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.vw_btn,{flexDirection:'row', flex:0.25, alignItems:'center'}]}>
                        <TouchableOpacity onPress={()=> type == CameraType.back? setType(CameraType.front):setType(CameraType.back)}>
                            <MaterialIcons name="flip-camera-android" size={25}
                                            style={{alignSelf:"center"}}
                                        color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.vw_btn, {flexDirection:'row', flex:0.7, alignItems:'center', backgroundColor:'#ffe7ad'}]}>
                        <MaterialIcons name="save-alt" size={26} color="black" style={{alignContent:'center'}} />
                        <Text style={styles.vw_text}>Save</Text>
                    </View>
                    
                </View>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={image}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                />
            </View>
            {/* {image && 
                image.map((item) =>{
                    return(
                        <Image source={{url:item}} style={{flex:1}} />
                    )
                })

            } */}
        </View>
    )
}

export default EmergencyHome;

const styles = StyleSheet.create({
    capture_btn:{

    },
    vw_capture_icon:{
        backgroundColor:'#3289ed',
        borderWidth:5,
        borderColor:"#79b4f7",
        height:40,
        width:40,
        borderRadius:20,
        alignSelf:'center'
    },
    vw_btn:{
        borderRightWidth:1,
        paddingLeft:10,
        borderBottomWidth:1,
        borderTopWidth:1,
        flex:1,
        paddingHorizontal:5,
        paddingVertical:0,
        borderColor:"#d9d9d9",
        backgroundColor:"#e9f0f7"
    },
    vw_text:{
        marginHorizontal:5,
        marginVertical:5
    }
}) 