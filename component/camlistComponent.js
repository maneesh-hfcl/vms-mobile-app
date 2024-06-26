import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Modal, Pressable, FlatList} from 'react-native'
import { AntDesign, Octicons, Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import MapCard from "./card/mapCard";
import {LoadApiData} from ".././shared/fetchUrl";
import ActivityIndicatorComponent from "./activityIndicatorComponent";
import { globalStyles } from "../style/globalstyle";

const CamListComponent = ({mapId, camNamePress, pressHandlerCamLive, pressHandlerCamRec})=>{
    const camList =[
        {id:1, name:'Hfcl sec 32 6th floor cafeteria camera 2 times probable'},
        {id:2, name:'Cam_162'},
        {id:3, name:'Cam_163'},
        {id:4, name:'Cam_164'},
        {id:5, name:'Cam_164'},
        {id:6, name:'Cam_164'},
        {id:7, name:'Cam_164'},
        {id:8, name:'Cam_164'},
        {id:9, name:'Cam_1641'},
    ]
        
    const[camArr, setCamArr] = useState([])
    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        //Alert.alert("good")
        loadData(mapId);
       // setCamArr(camList)
    },[])

    const loadData = (mapid)=>{
        loadCam(mapid)
    }

    const loadCam = async(mapid)=>{
        try {
            console.log("Loading cameras in map")
            console.log(`You are in map: ${mapid}`);
            jsondata = await LoadApiData("/devicesMap/"+mapid)
         //   console.log(jsondata);
           
            let initLst = jsondata.map((elem) =>({
                id : Math.random()*20,
                devsym : elem.devsym.trimEnd(),
                devname : elem.devnm.trimEnd()
            })
            );//.filter( elem => elem.parentId == mapid)
            
            setCamArr(initLst)
//            return json.movies;
            setIsLoading(false)
          } catch (error) {
            console.error(error);
          }
    }

   
    const EmptyList = ()=>{
        return(
            <Text style={styles.card_cam_text_empty}>No cameras present</Text>
        )
    }

    const renderItems = (elem)=>{
        return(
            <Pressable>
            <View style={{ flexDirection:'row', borderBottomColor:'#d5d5d5',
            borderBottomWidth:1, marginVertical:3,}}>
                
                <View style={{flexDirection:'row', flex:1, alignItems:'center', 
                            marginHorizontal:3,
                            
                            }}>
                    <MaterialCommunityIcons name="cctv" size={24} color="#3d488f" />
                    <TouchableOpacity>
                        <Text style={styles.card_cam_text} >[{elem.devsym}] {elem.devname}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'column', marginHorizontal:10, marginVertical:3}}>
                    <TouchableOpacity onPress={() => pressHandlerCamLive(elem.devsym)}>
                        <Ionicons name="play-sharp" size={22} color="green" />
                        <Text style={{fontSize:10, color:'#707070'}}>Live</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column', marginHorizontal:15, marginVertical:3}}>
                    <TouchableOpacity onPress={()=> pressHandlerCamRec(elem.devsym)}>
                        {/* <Foundation name="record" size={24} color="red" /> */}
                        <Text style={{fontSize:10, color:'#707070'}}>Rec</Text>
                    </TouchableOpacity>
                </View>

            </View>
            </Pressable>
        )

    }

    return(
        <View style={styles.card_vw_cam}>
        {isLoading? 
            (
                <ActivityIndicatorComponent />
        ):(
                <View style={{}}>
                    <View  style={styles.listText}>
                        <Text style={{color:"#dedede", fontSize:13, fontStyle:'italic'}}>Cameras in above map</Text>
                    </View>
                    <FlatList 
                        style={{backgroundColor:'#fff'}}
                        data={camArr}
                        keyExtractor={item => item.id}
                        renderItem = {({item}) =>(
                            renderItems(item)
                        )}
                        ListEmptyComponent = {EmptyList}
                    />
           {/* { camArr.length > 0 &&
                camArr.map((elem, indx) =>(
                ))
            } 
            {
                camArr.length < 1 &&
                <EmptyList />
            } */}

             </View>
        )

        }

        </View>
    )
        
}

export default CamListComponent;

const styles = StyleSheet.create({
    card_vw_outer:{
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        backgroundColor: '#fff',
        borderColor:'#e7e7e7',
        paddingHorizontal:10,
        paddingVertical:0,
      
        marginHorizontal:10,
        paddingTop:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        
    },
    card_vw_cam:{
        

    },
    card_cam_text:{
        paddingHorizontal:4,
        paddingVertical:5,
        marginRight:20,
        color:'#000',
        fontSize:14,

    },
    card_cam_text_empty:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'gray',
        fontSize:15
    },
    listText:{
        backgroundColor:'green',
        alignSelf:'flex-start',
        color:'#fff',
        marginHorizontal:0,
        marginVertical:5,
        paddingVertical:5,
        paddingHorizontal:10,
        borderBottomEndRadius:15,
        borderTopRightRadius:15,
        
    }


})