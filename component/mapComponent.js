import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native'
import MapCard from "./card/mapCard";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import CamListComponent from "./camlistComponent";

const MapComponent = ({pressHanderClose, camNamePressHandler})=>{

    const initMapLst = [
        {id:1, sym:'map 1', name:'map 1', lat:'0', long:'0', isSelect:false, camArr:[]},
        {id:2, sym:'map 2', name:'map 2', lat:'0', long:'0', isSelect:false, camArr:[]},
        {id:3, sym:'map 3', name:'map three comes here', lat:'0', long:'0', isSelect:false, camArr:[]},
        {id:4, sym:'map 4', name:'map four', lat:'0', long:'0', isSelect: false, camArr:[]},
        {id:5, sym:'map 5', name:'map 5', lat:'0', long:'0', isSelect: false, camArr:[]},
        {id:6, sym:'map 6', name:'map 6', lat:'0', long:'0', isSelect: false, camArr:[]},
    ]

    const initCamMap1Lst=[
        {id:1, sym:'cam1 map1', name:'cam1 map1', iSelect:false},
        {id:2, sym:'cam2 map1', name:'cam2 map1', iSelect:false},
        {id:3, sym:'cam3 map1', name:'cam3 map1', iSelect:false},
        {id:4, sym:'ca4 map1', name:'cam4 map1', iSelect:false},
    ]

    const initCamMap2Lst=[
        {id:1, sym:'cam1 map2', name:'cam1 map2', iSelect:false},
        {id:2, sym:'cam2 map2', name:'cam2 map2', iSelect:false},
        {id:3, sym:'cam3 map2', name:'cam3 map2', iSelect:false},
        {id:4, sym:'cam4 map2', name:'cam4 map2', iSelect:false},
    ]

    const initCamMap3Lst=[
        {id:1, sym:'cam1 map3', name:'cam1 12334 map3', iSelect:false},
        {id:2, sym:'cam2 map3', name:'cam2 map3', iSelect:false},
        {id:3, sym:'cam3 map3', name:'cam3 map3', iSelect:false},
        {id:4, sym:'ca4 map3', name:'cam4 map3', iSelect:false},
        {id:5, sym:'ca5 map3', name:'cam5 map3', iSelect:false},
        {id:6, sym:'ca6 map3', name:'cam6 map3', iSelect:false},
        {id:7, sym:'ca7 map3', name:'cam7 map3', iSelect:false},
        {id:8, sym:'ca8 map3', name:'cam8 map3', iSelect:false},
    ]

    const[maplst, setMaplst] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = ()=>{
        setMaplst(initMapLst)
    }

    const renderItems = (item)=>{
        return(
            <View>
                <MapCard menuText={item.name} 
                    pressMapHandler={pressMapHandler} iconType={item.isSelect} 
                />
                {
                    item.isSelect && 
                    <CamListComponent camList={loadCamArr(item.id)} key={item.id} camNamePress={camNamePressHandler} />
                    
                }
            </View>
        )
    }

    const loadCamArr = (id)=>{
        if(id == 1) 
            return initCamMap1Lst;
        else if(id==2)
            return initCamMap2Lst;
        else if(id==3)
            return initCamMap3Lst;
        else
            return []
        }

    const pressMapHandler = (itm)=>{
       // Alert.alert(item);

       let tempArr = maplst.map((item) => {
            return item.name == itm ? { ...item, isSelect: (!item.isSelect),
                camArr:loadCamArr(item.id)
            
            } : item
        })
//    setUsers(tempArr);
       setMaplst(tempArr)
    }

    return(
        <View style={{flex:1,marginBottom:10}}>
            <TouchableOpacity onPress={pressHanderClose}>
                <Ionicons name="close" size={26} color="red" style={{alignSelf:'flex-end', marginHorizontal:15, marginVertical:5}} />
            </TouchableOpacity>
            <FlatList 
                data={maplst}
                keyExtractor = {item=>item.id}
                renderItem = {({item}) => (
                    renderItems(item)
                )}
            />
        </View>    
    )
}

export default MapComponent;

const styles = StyleSheet.create({

})