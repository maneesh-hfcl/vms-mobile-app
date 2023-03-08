import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, Pressable} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../style/globalstyle';
import { LnkBtnCard } from '../component/card/lnkBtnCard';
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
                <View style={{marginVertical:1, marginHorizontal:1}}>
                    <TouchableOpacity onPress={() => imgPress(item, index)}>
                        {
                            (curImageIndx == index)?(
                            <Image source={{uri:item}} style={{width:50, 
                                height:50, borderRadius:25, borderWidth:3,
                                borderColor:'orange',
                                marginHorizontal:2
                            
                            }} />
                            ):
                            (
                                <Image source={{uri:item}} style={{width:50, 
                                    height:50, borderRadius:25,
                                    borderWidth:3, borderColor:'#fff',
                                    marginHorizontal:2
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

    const emptyTemplate = ()=>{
        return(
            <View style={{justifyContent:'center', alignItems:'center', 
                    marginLeft:50 }}> 
                <Text style={[globalStyles.text_form,{fontSize:12}]}>No image/video captured</Text>
            </View>
        )
    }

    return(

        <View style={globalStyles.container_main}>
            <View style={{}}></View>
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
            <View style={{backgroundColor:'#000',
                        flexDirection:'row',
                        paddingVertical:6,
                        justifyContent:'space-between',
                        alignItems:'center'

                }}>
                <View style={{flex:0.5, alignItems:'stretch', justifyContent:'center'}}>
                    <LnkBtnCard 
                    iconName={'report'}
                    iconSize={25}
                    iconColor={'yellow'}
                    label="View Reported"
                    labelColor={'#ededed'}
                    
                    />

                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={takePic}>
                        {/* <MaterialIcons name="camera" size={34} color="red" /> */}
                        
                            <View style={styles.vw_capture_icon}></View>
                        
                        
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.5, alignItems:'stretch'}}>
                    <Pressable onPress={()=> type == CameraType.back? setType(CameraType.front):setType(CameraType.back)}>
                        <MaterialIcons name="flip-camera-android" size={30}
                                        style={{alignSelf:"center"}}
                                    color="gray" />
                    </Pressable>
                </View>
            </View>



            <View style={{flexDirection:'row', backgroundColor:'#f9f9f9'}}>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={image}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                    ListEmptyComponent={emptyTemplate}
                />
                <View style={{marginHorizontal:0, justifyContent:'center',
                     alignItems:'center',
                     borderLeftWidth:1,
                     borderColor:'#ededed',
                     paddingHorizontal:10
                     }}>
                    <MaterialIcons name="save-alt" size={26} color="black" style={{alignContent:'center'}} />
                    <Text style={styles.vw_text}>Save</Text>
                </View>
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
        backgroundColor:'#a6d5ed',
        borderWidth:5,
        borderColor:"#a3bbc7",
        height:60,
        width:60,
        borderRadius:30,
        alignSelf:'center',
        
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