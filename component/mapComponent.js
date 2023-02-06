import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native'
import MapCard from "./card/mapCard";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import CamListComponent from "./camlistComponent";
import Config from ".././configuration/config";
import {LoadApiData} from ".././shared/fetchUrl";

const MapComponent = ({pressMapHandler, pressCloseDialog, pressCloseDialogCurr,mapid})=>{

    const[maplst, setMaplst] = useState([])

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
           console.log(jsondata);
           
            let initLst = jsondata.map((elem) =>({
                id : elem.id,
                mapsym : elem.mapsym.trimEnd(),
                mapname : elem.mapname.trimEnd(),
                isparent: elem.mapown==mapid?true:false,
                parentId: elem.mapown
                })
            );//.filter( elem => elem.parentId == mapid)
            let rootMap = initLst.filter(elem => elem.mapown == mapid)
            console.log(rootMap);
            initLst = initLst.filter(elem => elem.parentId == rootMap.id)
            console.log(initLst);
            setMaplst(initLst)
//            return json.movies;
          } catch (error) {
            console.error(error);
          }
    }

    const renderItems = (item)=>{
        return(
            <View>
                {
                    <MapCard menuText={item.mapname} menuId={item.id}
                        pressMapHandler={pressMapHandler} iconType={item.isSelect} 
                    />
                }

            </View>
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
        <View style={{marginBottom:10}}>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={pressCloseDialogCurr} style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                    <Ionicons name="chevron-back-sharp" size={23} color="blue" style={{ marginLeft:5, marginVertical:5}} />
                    <Text style={{marginVertical:9, color:'blue'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pressCloseDialog} style="{{}}">
                    <Ionicons name="close" size={23} color="black" style={{marginHorizontal:15, marginVertical:5}} />
                </TouchableOpacity>
            </View>
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