import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import MapCard from "./card/mapCard";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import CamListComponent from "./camlistComponent";
import Config from ".././configuration/config";
import {LoadApiData} from ".././shared/fetchUrl";
import ActivityIndicatorComponent from "./activityIndicatorComponent";

const MapComponent = ({pressMapHandler,mapid, camMapId,loadCamMapId})=>{

    const[maplst, setMaplst] = useState([])
    const[selMap, setSelMap] = useState(null)
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        console.log(mapid);
       // Alert.alert(mapid)
       // if(route.params?.mapid != null)
       loadData(mapid);

    },[])

    const loadData = (mapid)=>{
        //setMaplst(initMapLst)
       // Alert.alert(mapid);
        loadMap(mapid);
    }

    const loadMap = async(mapid)=>{
        try {
//            let uri = Config.ApiUrl + "/users"
            console.log("good:" +mapid);
            jsondata = await LoadApiData("/map")
          // console.log(jsondata);
           
            let initLst = jsondata.map((elem) =>({
                id : elem.id,
                mapsym : elem.mapsym.trimEnd(),
                mapname : elem.mapname.trimEnd(),
                isparent: elem.mapown==mapid?true:false,
                parentId: elem.mapown
                })
            );//.filter( elem => elem.parentId == mapid)

            let rootMap = initLst.filter(elem => 
                mapid == 0?(elem.parentId == mapid):(elem.id == mapid))[0]
            console.log(rootMap);
            console.log(rootMap.id);
            console.log(initLst)
            camMapId = rootMap.id;    
            let initLstFilter = initLst.filter(elem => elem.parentId == rootMap.id)
            console.log(initLstFilter);
            setSelMap(rootMap);
            setMaplst(initLstFilter)
//            return json.movies;
            loadCamMapId(rootMap.id)

            setIsLoading(false);
          } catch (error) {
            console.error(error);
          }
    }

    const renderItems = (item)=>{
        return(
            <View>
                <MapCard menuText={item.mapname} menuId={item.id}
                    pressMapHandler={pressMapHandler} iconType={item.isSelect} 
                />

            </View>
        )
    }

    const EmptyList = ()=>{
        return(
            <Text style={styles.card_cam_text_empty}>No map present</Text>
        )
    }
//     const pressMapHandler = (itmId)=>{
//         console.log(itmId)
//         let tempMapArr = maplst.filter(elem => elem.parentId == itmId)
//         console.log(tempMapArr);
//         let tempArr = maplst.map((item) => {
//             return item.id == itmId ? { ...item, isSelect: (!item.isSelect),
//                 camArr:loadCamArr(item.id)
            
//             } : item
//         })
// //    setUsers(tempArr);
//        setMaplst(tempArr)
//     }

    return(
        <View style={{marginBottom:5}}>
            {isLoading ?(
                <ActivityIndicatorComponent />
            ):(
            <View style={{}}>
            {selMap &&
            <View style={{marginHorizontal:25}}> 
                <View style={styles.selmap_view}>
                    <Text style={{alignSelf:'center', marginHorizontal:5}}>You are in map:</Text>
                    <View style={{ flexDirection:'row', flex:1}}>
                        <FontAwesome name="map-marker" size={18} color="#014d17" style={{alignSelf:'center'}} />
                        <Text style={styles.selmap_view_text}>{selMap.mapname}</Text>
                    </View>
                </View>
            
             </View>
        
            
            }

            <View  style={styles.listText}>
                <Text style={{color:"#dedede", fontSize:12, fontStyle:'italic'}}>Maps in above map</Text>
            </View>
            <FlatList 
                horizontal
                data={maplst}
                keyExtractor = {item=>item.id}
                renderItem = {({item}) => (
                    renderItems(item)
                )}
                style={{marginHorizontal:10}}
                ListEmptyComponent = {EmptyList}
            />
            </View>
            )
        }
                
        </View>    
    )
}

export default MapComponent;

const styles = StyleSheet.create({
    selmap_view:{
        marginHorizontal:0,
        marginVertical:5,
        flexDirection:'row',
        borderColor:'#e7e7e7',
        borderWidth:1,
        paddingVertical:5,
        borderRadius:20,
        paddingHorizontal:10
    },
    selmap_view_text:{
        fontWeight:'bold',
        color:'brown',
        
        marginHorizontal:8,
        fontSize:15
    },
    listText:{
        backgroundColor:'#23026b',
        alignSelf:'flex-start',
        color:'#fff',
        marginHorizontal:0,
        marginVertical:5,
        paddingVertical:5,
        paddingHorizontal:10,
        borderBottomEndRadius:15,
        borderTopRightRadius:15,
        
    },
    card_cam_text_empty:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'gray',
        fontSize:12,
        marginBottom:10
    },

})