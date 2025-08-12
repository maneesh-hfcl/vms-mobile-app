import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity, Modal, Pressable} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, Ionicons, MaterialIcons, Feather, FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import MapComponent from "../../component/mapComponent";
import StackMap from "../../navigation/stack/mapStack";
import PlayVideo from "./playVideo";


const LiveScreen = ({navigation, route})=>{
    const initTileCam = [
        {indx:0, cam:'Select', isCurSel:false,  isRec:false, dateRec: '' },
         {indx:1, cam:'Select', isCurSel:false, isRec:false, dateRec: '' },
         {indx:2, cam:'Select', isCurSel:false, isRec:false, dateRec: ''},
         {indx:3, cam:'Select', isCurSel:false, isRec:false, dateRec: ''} ,
         {indx:4, cam:'Select', isCurSel:false, isRec:false, dateRec: ''},
         {indx:5, cam:'Select', isCurSel:false, isRec:false, dateRec: ''},
        // {indx:6, cam:'Select', isCurSel:false},
        // {indx:7, cam:'Select', isCurSel:false},
        // {indx:8, cam:'Select', isCurSel:false},
        // {indx:9, cam:'Select', isCurSel:false},
        // {indx:10, cam:'Select', isCurSel:false},
        
    ]
    const[tileCam, setTileCam] = useState([])
    const[isModalVisible, setIsModalVisible] = useState(false)
    const[numColumns,setNumColumns] = useState(2)
//    const{selRecCamera,selRecdate,selRectime} = route.params;
    
    useEffect(()=>{
      //  Alert.alert('Loading camera tiles')
        console.log("This is the load data screen");
        loadData();

    },[])
 
    useEffect(()=>{
        console.log("calling route id")
        console.log(route.params?.camId)
        if(route.params?.camId != null)
        {
            console.log("camera present");
            camNamePressHandler(route.params.camId)
        }
//        pressHandlerCam(route.params?.camId)
    },[route.params?.camId, route.params?.rnd])

    useEffect(()=>{
        if(typeof route.params?.selRecCamera != "undefined")
        {
            const {selRecCamera, recdt, rectime} = route.params
       //     console.log(reccam)
//        const{selRecCamera,selRecdate,selRectime} = route.params;
        camNameRecPressHandler(selRecCamera, recdt, rectime)
        }
    },[route.params?.selRecCamera, route.params?.recdt, route.params?.rectime])

    const loadData =()=>{
        setTileCam(initTileCam)
        console.log(tileCam)
    }

    const pressHandlerCam = (itm)=>{
           let tempTileCam = [...tileCam]
           let selItm = tempTileCam.find(x=> x.indx == itm.indx)

           selItm.isCurSel = true
           setTileCam(tempTileCam)
           console.log(tileCam) 
           //setIsModalVisible(true)
           //Alert.alert('push')
           navigation.push("MapHome",{mapid:0, count:1 })
        
    }

    const pressMapHandler = ()=>{
        Alert.alert('u pressed map')
    }

    const camNamePressHandler = (elemCam)=>{
        let tempTileCam = [...tileCam];
        console.log('cam name press handler');
        console.log(tempTileCam);
        let findCam = tempTileCam.find(x=>x.isCurSel == true)
        console.log(findCam)
        if(findCam != null)
        {
        findCam.cam = elemCam?elemCam:'Select'
        setTileCam(tempTileCam)
//        Alert.alert("u have pressed the camera");
        console.log(elemCam)
        }
        dialogClose();
    }

    const camNameRecPressHandler = (elemCam,recdate, rectime)=>{
        console.log(`Cam: ${elemCam}, Recdate: ${recdate}, Rectime: ${rectime}`)
        var recdt = new Date(recdate);
        var rectt = new Date(rectime)
        let trecdt = (recdt.getFullYear()+"/"+(recdt.getMonth()+1) +"/" + recdt.getDate());
        let trect = (rectt.getHours()+":"+rectt.getMinutes()+":" + rectt.getSeconds())
        let dtrecpass = trecdt+" " + trect;
        let dtofrec = rectt //new Date(rectime)
        
        console.log("Date: " + trecdt+" " + trect);
        console.log("calling date")
        console.log(dtofrec);
        let tempTileCam = [...tileCam];

        let findCam = tempTileCam.find(x=>x.isCurSel == true)
        findCam.cam = elemCam;
        //return;
        console.log('finding camera: ')
        console.log(findCam?.cam + "/" + dtofrec.toISOString())
        if(findCam != null)
        {
            findCam.cam = elemCam?elemCam:'Select'
            findCam.isRec = true
            findCam.dateRec = dtofrec.toISOString()
            setTileCam(tempTileCam)
//        Alert.alert("u have pressed the camera");
            console.log('finding cam')
            console.log(findCam)
        }

        dialogClose();
    }

    const closeCam = (camToClose)=>{
        console.log(`closing cam: ${camToClose}`);

        let tempTileCam = [...tileCam];

        let findCam = tempTileCam.find(x=>x.cam == camToClose)
        console.log(findCam)
        if(findCam != null)
        {
            findCam.cam = 'Select'
            findCam.isRec = false
            findCam.dateRec = ''
            console.log(findCam)
            setTileCam(tempTileCam)
//        Alert.alert("u have pressed the camera");
//            console.log(elemCam)
        }


    }

    const pressHandlerFullScreen = (itm)=>{
//        Alert.alert(itm.cam)
        console.log("You clicked the full screen icon")
        console.log(itm)
        navigation.push("PTZ", {cam:itm.cam, isRec:itm.isRec,dateRec:itm.dateRec})
       // navigation.push("MapHome",{mapid:0, count:1 })
     
 }

    const renderItems = (item)=>{
        return(
            // <View style={[styles.vw_tile_inner, numColumns==1?{height:200}:{}]}>
            //     <View style={{flex:1}}>
            //         {/* <Entypo name="video-camera" size={30} color="#c7c7c7" /> */}
            //         {/* <WebView style={{flex:1}}
            //             source={{uri:"http://192.168.2.205:5000/htmlvideostream/video.html"}}
            //         /> */}
            //         {
            //             item.cam != 'Select' &&
            //             <PlayVideo camToPlay ={item.cam}/>
            //         }

            //     </View>
            //     <TouchableOpacity onPress={() => pressHandlerCam(item)}>
            //         <View style={styles.vw_tile_text_container}>
            //             <Text style={styles.vw_tile_text}>{item.cam}</Text>
            //         </View>
            //     </TouchableOpacity>
            // </View>

            <View key={item.indx} style={[styles.vw_tile_inner,
                {width:'50%'}
                ,numColumns==1?{height:200, width:'100%'}:{}]}>
                <View style={{flex:1}}>
                    {/* <Entypo name="video-camera" size={30} color="#c7c7c7" /> */}
                    {/* <WebView style={{flex:1}}
                        source={{uri:"http://192.168.2.205:5000/htmlvideostream/video.html"}}
                    /> */}
                    {
                        item.cam != 'Select' &&
                        <PlayVideo camToPlay ={item.cam} isRec={item.isRec} 
                            closeCam={closeCam} dateRec={item.dateRec} />
                    }

                </View>
                <View style={{flexDirection:'row', backgroundColor:'#394a66', }}>
                    
                    <Pressable
                        android_ripple={{color: 'black', borderless: true}}
                    onPress={() => pressHandlerCam(item)} 
                        style={[styles.vw_tile_text_container, {flex:1}]}>
                        <Text style={styles.vw_tile_text}>{item.cam}</Text> 
                    </Pressable>
                    {
                      item.cam != 'Select' &&   
                    
                        <Pressable style={{backgroundColor:'#394a66', paddingHorizontal:3}}
                            onPress={ () => pressHandlerFullScreen(item)}
                        >
                                <MaterialIcons name="fullscreen" size={24} color="#d7d7d7" />
                        </Pressable>
                    }
                </View>
                </View>
        )
    }

    const dialogClose = ()=>{
//        Alert.alert('close the dialog')
        setIsModalVisible(false)
        let tempTileCam = [...tileCam]
        let selItm = tempTileCam.find(x=> x.isCurSel == true)
        if(selItm)
            selItm.isCurSel = false
        setTileCam(tempTileCam)
    }

    return(
        // <View style={[styles.vw_tile, styles.vw_tile_outer]}>  
        //     { tileCam.length > 0 &&
        //         tileCam.map((elem, indx) =>(
        //             <View style={[styles.vw_tile_inner]} key={elem.indx}>
        //                 <View style={{flex:1}}>
        //                 </View>
        //                 <View style={styles.vw_tile_text_container}>
        //                     <Text style={styles.vw_tile_text}>{elem.cam}</Text>
        //                 </View>
        //             </View>
        //         ))
        //     } 
      
        // </View>
        <View style={[globalStyles.container_main, {flex:1, paddingTop:0}]}>
            <View style={{flexDirection:'row', justifyContent:'flex-end', 
                marginHorizontal:10, marginVertical:10}}>
                <FontAwesome5 name="columns" size={18} color={numColumns==2?"#394a66":"#a7a7a7"} 
                    style={{marginHorizontal:8}} onPress={()=> setNumColumns(2)} />
                <MaterialIcons name="table-rows" size={18} 
                    color={numColumns==1?"#394a66":"#a7a7a7"} 
                    style={{marginHorizontal:1}}
                    onPress={()=> setNumColumns(1)}
                />
            </View>
            {/* <FlatList key={numColumns} numColumns={numColumns} showsVerticalScrollIndicator={true}
                data={tileCam}
                keyExtractor={item => item.indx}
                renderItem={({item}) => (renderItems(item)) }
            /> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flexDirection:'row', flexWrap:'wrap'
                }}>
                    {
                        tileCam.map(item=>(
                            renderItems(item)
                        ))
                    }
                </View>
            </ScrollView>

            {/* <Modal
                transparent={false} 
                visible={isModalVisible} 
            >
                <View style={globalStyles.modalContent}  >
                   <MapComponent pressHanderClose={dialogClose} camNamePressHandler={camNamePressHandler} />
                   <StackMap /> 

                </View>
            </Modal> */}

            {/* <Modal
                transparent={false} 
                visible={isModalVisible} 
            >
                <View style={globalStyles.modalContent}>
                    <Text>Hello, modal</Text>
                </View>
            </Modal> */}

        </View>

    )
}

export default LiveScreen;

const styles = StyleSheet.create({
    vw_tile:{
        flex:1,
       
    },
    vw_tile_outer:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingTop:10,

    },
    vw_tile_inner:{
        borderWidth:0.5,
        borderColor:"#909090",
        backgroundColor:'#000',
        height:150,
       

    },
    vw_tile_text_container:{
        backgroundColor:'#394a66',
        alignItems:'center',
        paddingVertical:3,

        borderBottomWidth:0.5,
        marginVertical:0,
        marginHorizontal:0,
        borderBottomColor:'#909090',
        
    
    },
    vw_tile_text:{
        color:'#a7a7a7',
        fontWeight:'bold',
        
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
      text: {
        fontSize: 42,
      },

})