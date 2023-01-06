import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity, Modal} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import MapComponent from "../../component/mapComponent";


const LiveScreen = ()=>{
    const initTileCam = [
        {indx:0, cam:'Select'},
        {indx:1, cam:'Select'},
        {indx:2, cam:'Select'},
        {indx:3, cam:'Select'},
        {indx:4, cam:'Select'},
        {indx:5, cam:'Select'},
        {indx:6, cam:'Select'},
        {indx:7, cam:'Select'},
        {indx:8, cam:'Select'},
        {indx:9, cam:'Select'},
        {indx:10, cam:'Select'},
        
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

    const pressHandlerCam = ()=>{
//        Alert.alert('you have pressed cam')
        setIsModalVisible(true)
    }

    const renderItems = (item)=>{
        return(
            <View style={[styles.vw_tile_inner]}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Entypo name="video-camera" size={30} color="#c7c7c7" />
                </View>
                <TouchableOpacity onPress={pressHandlerCam}>
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
        <View style={{marginVertical:20, marginHorizontal:3}}>
            <FlatList numColumns={2} showsVerticalScrollIndicator={true}
                data={tileCam}
                renderItem={({item}) => (renderItems(item)) }
            />

            <Modal
                transparent={true} 
                visible={isModalVisible} 
            >
                <View style={globalStyles.modalContent}  >
                   <MapComponent pressHanderClose={dialogClose} />
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