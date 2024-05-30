import React, { useContext, useEffect, useRef, useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList, Pressable, Dimensions} from 'react-native'
import { Camera, CameraType, Constants } from 'expo-camera'
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../style/globalstyle';
import { LnkBtnCard } from '../component/card/lnkBtnCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';


//import { globalStyles } from '../style/global';
const vidIcon = require('../assets/icon.png')

const EmergencyHome = ({navigation, route})=>{
    const[hasPermission, setHasPermission] = useState(null)
    const[hasAudioPermission, setHasAudioPermission] = useState(null)
    const[type, setType] = useState(CameraType.back)
    const[camera, setCamera] = useState(null)
    const[image, setImage] = useState([])
    const[curImageIndx, setCurImageIndx] = useState(-1)
    const[camLayout, setCamLayout] = useState(null)
    const[isFocussed, setIsFocussed] = useState(false)
    const[recVideo, setRecVideo] = useState(false)
    const[playStatus, setPlayStatus] = useState({});
    const[vidUri, setVidUri] = useState("");
    const videoref = useRef(null);


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [thumbnail, setThumbnail] = useState(null);
    const[lastVid, setLastVid] = useState(null)
    const[thumbnailArr, setThumbnailArr] = useState([])


    const getVidThumbnail = async ()=>{
       // let tempAll = [...image];
        console.log("video thumbnail function");
        console.log(lastVid)
        try
        {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                    lastVid
                    ,
                    {
                        time:1500,
                    }
                );
            console.log("Video Image thumbnail");
        //console.log(uri);
   //     setThumbnail(uri);
            setThumbnailArr([uri, ...thumbnailArr])   
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            console.log("calling focus screen")
            setIsFocussed(true)      
        });

        (async()=>{

            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')

            const {audioStatus} = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus === 'granted')

            })()
        return unsubscribe;
    },[])

    useEffect(()=>{
//        console.log("you are calling the useffect screen");
     //   getVidThumbnail2();
        setRecVideo(false);
        console.log("you are here!!!!");
        console.log("useffect recvideo: " + recVideo);
        if(route.params?.retVal == "added")
        {
            console.log("Record added to the system");
            setImage([])
            setCurImageIndx(-1)
        }
    },[route.params?.rnd])

    if(hasPermission === null){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Requesting to open camera</Text>
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
         //   const options = {quality: 0}
            const{lytHeight, lytWidth} = camLayout
            const options = { quality: 2, skipProcessing: true };
            
            const data = await camera.takePictureAsync(options)
            console.log(`data to show: `)
            console.log(data)
            let {height, uri, width} =data;
//            let new_height = 640
//            let new_width = width/height * new_height
            console.log("saving image to low resolution")
            const manipResult = await manipulateAsync(
                uri,
                [{ resize: { width: lytWidth, height: lytHeight } }],
                { format: 'jpeg', compress:0.5 }
            );
            console.log(manipResult);
            setImage([manipResult.uri, ...image])
            //console.log(image)
        }
    }

 

    const imgPress = (item, index)=>{
        console.log(image[index]);
        setCurImageIndx(index);
        setVidUri(image[index]);
        
    }

    const delImg = (item, index)=>{
        let filteredItems = image.splice(curImageIndx, 1)
        console.log(filteredItems)
       // setImage(filteredItems)
        setCurImageIndx(-1)
        
        
    }


    const getVidThumbnail2 = async (viduri)=>{
        console.log("video uri => " + viduri)
        try
        {
          const { uri } = await VideoThumbnails.getThumbnailAsync(
            'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
            ,
            {
                time:1
            }
            );
        console.log("Video Image thumbnail");
        console.log(uri);
            return undefined
        }
        catch(e){
            console.log(e);
        }
    }

    const renderItem = ({item, index})=>{
            return(
                <View style={{marginVertical:1, marginHorizontal:1}}>
                    <TouchableOpacity onPress={() => imgPress(item, index)}>
                        {
                            (curImageIndx == index)?(
                            <Image source={{uri:item}} style={{width:60, 
                                height:60, borderRadius:30, borderWidth:3,
                                borderColor:'orange',
                                marginHorizontal:2
                            
                            }} />
                            ):
                            (
                                !item.includes(".mp4")?(
                                <Image source={{uri:item}} style={{width:60, 
                                    height:60, borderRadius:30,
                                    borderWidth:3, borderColor:'#fff',
                                    marginHorizontal:2
                                }} />
                                ):
                                (
                                    <View style={{width:60, 
                                        height:60, borderRadius:30,
                                        borderWidth:3, borderColor:'#fff',
                                        alignItems:'center',
                                        alignSelf:'center',
                                        justifyContent:'center',
                                        backgroundColor:'black'
                                    }}>
                                        {/* <Video 
                                            source={{
                                                uri: item,
                                            }}
                                            useNativeControls
                                            resizeMode="contain"

                                        />  */}
                                        { thumbnailArr &&
                                        <Image source={{uri:thumbnailArr[index]}} style={{width:60, 
                                            height:60, borderRadius:30,
                                            borderWidth:3, borderColor:'#fff',
                                            marginHorizontal:2
                                        }} />   
                                        }
                                        {/* <MaterialCommunityIcons name="record-rec" size={40} color="red" /> */}
                                    </View>
                                )
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

    const pressLnkViewReport = async ()=>{
      //  await savePicturesAsync()
        setIsFocussed(false)
        navigation.navigate("EmergencyReport")
    }

    const savePicturesAsync = async ()=>{
        try{
            const jsonVal = JSON.stringify( [
                {
                    text: "Accident occured in platform 3",
                    location:"Unknow",
                    images : image,
                    videos : image
                },
                {
                    text: "Rust in tracks1",
                    location:"Outer station",
                    images : image,
                    videos : image
                },
                {
                    text: "A railway track or railroad track (American English), also known as a train track, permanent way or simply track, is the structure on a railway or railroad",
                    location:"Unknow",
                    images : image,
                    videos : image
                },
                {
                    text: "Rust in tracks",
                    location:"Outer station",
                    images : image,
                    videos : image
                }
            ])
            await AsyncStorage.setItem('@stored_img', jsonVal)
        }
        catch(e){

        }
    }

    const pressShowModal = ()=>{
        //Alert.alert('showing modal')
        let tempAll = [...image];
        console.log("start -> tempAll")
        console.log(tempAll);
        let findImg = tempAll.filter(x=> !x.includes(".mp4"))
        let findVid = tempAll.filter(x=> x.includes(".mp4"))
        console.log("findImg ->")
        console.log(findImg)
        console.log("findVid ->")
        console.log(findVid)
       // console.log(user)
       // setImage([])
        navigation.navigate("AddEmergency",{img:findImg, vid:findVid})
        console.log("saving all image -> ")
        console.log(image);

    }

    const delData = ()=>{
        console.log("Deleting data");
    }

    const getCameraLayout = (event)=>{
     //   console.log(event.nativeEvent.layout);
        const {height, width, x, y} = event.nativeEvent.layout;
        setCamLayout({"lytHeight": height,"lytWidth": width})
        console.log("camera layout")
    }

    const startRec =async ()=>{
        console.log("Starting video recording");

        if(camera){
             setRecVideo(true);
            //   const options = {quality: 0}
               const{lytHeight, lytWidth} = camLayout
               const options = { 
//                    VideoQuality:['480p']
                    quality: Constants.VideoQuality['480p'],
                    videoBitrate: 0.25*1000*1000
                };
               
               const data = await camera.recordAsync(options);
               console.log(`data to show: `)
               console.log(data);
               console.log(data.uri)
               setLastVid(data.uri);
               setImage([data.uri, ...image])
               setRecVideo(false);
               getVidThumbnail(); 
//                const {height, uri, width} =data;
//    //            let new_height = 640
//    //            let new_width = width/height * new_height
//                console.log("saving image to low resolution")
//                const manipResult = await manipulateAsync(
//                    uri,
//                    [{ resize: { width: lytWidth, height: lytHeight } }],
//                    { format: 'jpeg', compress:0.5 }
//                );
//                console.log(manipResult);
//                setImage([manipResult.uri, ...image])
               //console.log(image)
           }
           
     }

    const pressIn = ()=>{
        console.log("Press in the button");
    }

    const pressOut = async ()=>{
        console.log("on press out event")
        if(camera) camera.stopRecording();

        setRecVideo(false);

    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    
    return(

        <View style={globalStyles.container_main}>

            { curImageIndx < 0 &&
                <View style={{flex:1}}>
                    { curImageIndx == -1 && isFocussed ?(
                        
                            <Camera onLayout={getCameraLayout} type={type} style={{flex:1, backgroundColor:"yellow"}} 
                                ref={ref=> setCamera(ref)}
                               useCamera2Api = {true}
                                ></Camera>
                        
                    ):(
                        curImageIndx < 0 &&
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text>Opening camera .... </Text>
                        </View>    
                    )
                    }

                    <View style={{bottom:0, alignItems:'center', 
                                width:'100%',
                                position:'absolute', backgroundColor:'#e7e7e7', marginBottom:0}}>
                        {
                            !recVideo?(
                                <Text style={{color:"#555", padding:1, fontSize:13}}>
                                    Press to click picture. Long press to record video.
                                </Text>
                            ):(
                                <Text style={{color:"red", padding:1,}}>Recording started</Text>
                            )
                        }

                    </View>
                    
                </View>
            }
            {/* {thumbnail && <Image source={{uri:thumbnail}} style={{flex:1}} /> } */}
            
            { curImageIndx > -1 && 
                <View style={{flex:1}} >
                    {!image[curImageIndx].includes(".mp4")?
                        (
                            <Image source={{uri:image[curImageIndx]}} style={{flex:1}} /> 
                        ):
                        (
                            <View style={{justifyContent:"center"}}>
                                                                { vidUri && 
                                <Video ref={videoref}
                                    style={{width: windowWidth, height: windowHeight}}
                                    source={{
                                       uri: vidUri //"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" 
                                    }}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping = {false}
                                    onPlaybackStatusUpdate={playStatus =>{ 
                                            //console.log(playStatus);
                                            setPlayStatus(() => playStatus)}
                                    }
                                />
                                }


                            </View>
                        )
                    }

                    {image[curImageIndx].includes(".mp4") &&
                    <View style={{position:"absolute", justifyContent:"center",  flexDirection:"row", 
                        width:'100%',
                        opacity:0.7,
                        marginHorizontal:0,
                        opacity:1,
                        marginVertical:30,
                        alignContent:'center',
                        
                        }}>
                               
                            <AntDesign
                            name={playStatus.isPlaying?"pausecircle":"caretright"} size={45} color="#afe69e" 
                                onPress={() =>
                                 playStatus.isPlaying? videoref.current.pauseAsync()
                                 :
                                 playStatus?.didJustFinish?videoref.current.playFromPositionAsync(0):
                                 videoref.current.playAsync()} />
                    
                        </View>    

                    }
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
                <View style={{flex:0.5, alignItems:'stretch', justifyContent:'center', backgroundColor:'#000'}}>
                    <LnkBtnCard 
                        iconName={'report'}
                        iconSize={25}
                        iconColor={'yellow'}
                        label="View Reported"
                        labelColor={'#ededed'}
                        
                        pressLnkHandler={pressLnkViewReport}
                    />

                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={takePic} onLongPress={startRec} onPressOut={pressOut} onPressIn={pressIn} >
                        {/* <MaterialIcons name="camera" size={34} color="red" /> */}
                        <View style={[styles.vw_capture_icon , {backgroundColor:"red"} ]}></View>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.5, alignItems:'stretch'}}>
                    
                    <Pressable onPress={toggleCameraType}>
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
                     paddingHorizontal:20,
                     backgroundColor:'transparent'
                     }}>
                    <Pressable onPress={pressShowModal} style={{alignItems:'center', justifyContent:'center'}}>                     
                        <MaterialIcons name="save-alt" size={20} color="black" style={{alignItems:'center'}} />
                        <Text style={styles.vw_text}>Save</Text>
                    </Pressable>
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
    },
    video: {
        flex:1,
        borderWidth:2,
        borderColor:'green'
    }
}) 