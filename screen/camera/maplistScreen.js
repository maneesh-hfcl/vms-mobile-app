import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert, TouchableOpacity, Modal} from 'react-native'
import MapComponent from "../../component/mapComponent";
import { globalStyles } from "../../style/globalstyle";
import { StackActions } from "@react-navigation/native";
import CamListComponent from "../../component/camlistComponent";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const MapListScreen = ({navigation, route})=>{
    const{mapid, count, onSelectCam} = route.params;
    const[countTimes, setCountTimes] = useState(0)
    const[camMapId, setCamMapId] = useState(0)
    const[isModalVisible, setIsModalVisible] = useState(false)

    useEffect(()=>{
      //  alert(route.params?.mapid)
//        Alert.alert('hello')
//        setMapid(route.params?.mapid)
  //      console.log(`count: ${route.params?.count}`);
        setCountTimes(count)

    },[route])

    const pressMapHandler = (itmId)=>{
   //     Alert.alert("map pressed" + itmId);
      //  setCountTimes(route))
       // console.log(`countTimes: ${countTimes}`);
        navigation.push("MapHome",{mapid:itmId, count:count + 1})

    }

    const pressCloseDialog = ()=>{
//        console.log(StackActions.)

        const popAction = StackActions.pop(countTimes);

        navigation.dispatch(popAction);
        //navigation.pop();
    }

    const pressCloseDialogCurr = ()=>{
                navigation.pop();
    }

    const pressHandlerCamLive = (devsym)=>{
//        Alert.alert('cam press')
        // navigation.dispatch(
        //     StackActions.replace('live',{selCamera:'abcd'})
        // )
        navigation.navigate('live',{selCamera:devsym});
    }

    const pressHandlerCamRec = (devsym)=>{
     //   navigation.navigate('live', {selCamera:devsym})
        navigation.push("ModalRecording",{selCam:devsym})
    }


    const loadCamMapId = (mapid)=>{
        //Alert.alert("loading cams" + mapid)
        setCamMapId(mapid);
    }

    return(
        <View style={[globalStyles.modalContent,{backgroundColor:'#fff', marginTop:150, flex:0.95}]}>
            <View style={{flexDirection:"row",justifyContent:'flex-end'}}>
                { count > 1 &&
                <TouchableOpacity onPress={pressCloseDialogCurr} style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                 
                    <Ionicons name="chevron-back-sharp" size={23} color="blue" style={{ marginLeft:5, marginVertical:5}} />
                    <Text style={{marginVertical:9, color:'blue'}}>Back</Text> 
                </TouchableOpacity>
                }
                <TouchableOpacity onPress={pressCloseDialog} style="{{}}">
                    <Ionicons name="close" size={23} color="black" style={{marginHorizontal:15, marginVertical:5}} />
                </TouchableOpacity>
            </View>


            <MapComponent mapid={mapid} pressMapHandler={pressMapHandler}
                pressCloseDialog={pressCloseDialog}
                pressCloseDialogCurr={pressCloseDialogCurr}
                loadCamMapId = {loadCamMapId}
                
                />
            {camMapId>0 && 
                <CamListComponent mapId={camMapId} pressHandlerCamLive={pressHandlerCamLive}
                pressHandlerCamRec={pressHandlerCamRec}
                />  
            } 



        </View>
    )
}

export default MapListScreen;

const styles = StyleSheet.create({
    modalScreen:{
        height:'100%',
        borderTopColor:'red',
        borderTopWidth:1,
        backgroundColor:'#fff',
        marginTop:'40%'
    }
})