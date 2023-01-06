import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native'
import MapCard from "./card/mapCard";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const MapComponent = ({pressHanderClose})=>{

    const initLst = [
        {id:1, sym:'map 1', name:'map 1', lat:'0', long:'0', isSelect:false},
        {id:2, sym:'map 2', name:'map 2', lat:'0', long:'0', isSelect:false},
        {id:3, sym:'map 3', name:'map three comes here', lat:'0', long:'0', isSelect:false},
        {id:4, sym:'map 4', name:'map four', lat:'0', long:'0', isSelect: false},
        {id:5, sym:'map 5', name:'map 5', lat:'0', long:'0', isSelect: false},
        {id:6, sym:'map 6', name:'map 6', lat:'0', long:'0', isSelect: false},
    ]

    const[maplst, setMaplst] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = ()=>{
        setMaplst(initLst)
    }

    const renderItems = (item)=>{
        return(
            <MapCard menuText={item.name} pressMapHandler={pressMapHandler} iconType={item.isSelect} />
        )
    }

    const pressMapHandler = (itm)=>{
       // Alert.alert(item);

       let tempArr = maplst.map((item) => {
            return item.name == itm ? { ...item, isSelect: (!item.isSelect)  } : item
        })
//    setUsers(tempArr);
       setMaplst(tempArr)
    }

    return(
        <View style={{flex:1}}>
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