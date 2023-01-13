import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity, Modal} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import MapComponent from "../../component/mapComponent";
import {WebView} from "react-native-webview";


const LiveScreen = ()=>{
    const initTileCam = [
        {indx:0, cam:'Select', isCurSel:false},
        {indx:1, cam:'Select', isCurSel:false},
        {indx:2, cam:'Select', isCurSel:false},
        {indx:3, cam:'Select', isCurSel:false},
        {indx:4, cam:'Select', isCurSel:false},
        {indx:5, cam:'Select', isCurSel:false},
        {indx:6, cam:'Select', isCurSel:false},
        {indx:7, cam:'Select', isCurSel:false},
        {indx:8, cam:'Select', isCurSel:false},
        {indx:9, cam:'Select', isCurSel:false},
        {indx:10, cam:'Select', isCurSel:false},
        
    ]
    const[tileCam, setTileCam] = useState([])
    const[isModalVisible, setIsModalVisible] = useState(false)

    useEffect(()=>{
// //        Alert.alert('Loading camera tiles')
        loadData();

    },[])

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
           setIsModalVisible(true)
    }

    const camNamePressHandler = (elemCam)=>{
        let tempTileCam = [...tileCam];
        let findCam = tempTileCam.find(x=>x.isCurSel == true)
        findCam.cam = elemCam.name
        setTileCam(tempTileCam)
//        Alert.alert("u have pressed the camera");
        console.log(elemCam)
        dialogClose();
    }

    const renderItems = (item)=>{
        return(
            <View style={[styles.vw_tile_inner]}>
                <View style={{flex:1}}>
                    {/* <Entypo name="video-camera" size={30} color="#c7c7c7" /> */}
                    <WebView style={{flex:1}}
                        source={{uri:"http://192.168.2.205:5000/htmlvideostream/video.html"}}
                    />
                </View>
                <TouchableOpacity onPress={() => pressHandlerCam(item)}>
                    <View style={styles.vw_tile_text_container}>
                        <Text style={styles.vw_tile_text}>{item.cam}</Text>
                    </View>
                </TouchableOpacity>
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
        <View style={{marginVertical:20, marginHorizontal:3, flex:1}}>
            <FlatList numColumns={2} showsVerticalScrollIndicator={true}
                data={tileCam}
                renderItem={({item}) => (renderItems(item)) }
            />

            <Modal
                transparent={true} 
                visible={isModalVisible} 
            >
                <View style={globalStyles.modalContent}  >
                   <MapComponent pressHanderClose={dialogClose} camNamePressHandler={camNamePressHandler} />
                </View>
            </Modal>
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
        borderWidth:1,
        borderColor:"#fff",
        backgroundColor:'#808080',
        height:150,
       flex:1,
       marginVertical:1
    },
    vw_tile_text_container:{
        backgroundColor:'#e4e9f7',
        alignItems:'center',
        paddingVertical:4,
        borderBottomColor:'lightgray',
        borderBottomWidth:0,
        marginVertical:1,
        marginHorizontal:0

    },
    vw_tile_text:{
        color:'#404040',
        fontSize:14,
        fontWeight:'bold'
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
      text: {
        fontSize: 42,
      },

})