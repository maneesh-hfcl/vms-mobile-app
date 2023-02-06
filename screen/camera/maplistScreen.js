import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Alert} from 'react-native'
import MapComponent from "../../component/mapComponent";
import { globalStyles } from "../../style/globalstyle";
import { StackActions } from "@react-navigation/native";
import CamListComponent from "../../component/camlistComponent";

const MapListScreen = ({navigation, route})=>{
    const[mapid, setMapid] = useState(-1)
    const[countTimes, setCountTimes] = useState(0)

    useEffect(()=>{
      //  alert(route.params?.mapid)
//        Alert.alert('hello')
        setMapid(route.params?.mapid)
        console.log(`count: ${route.params?.count}`);
        setCountTimes(route.params?.count)
    },[route])

    const pressMapHandler = (itmId)=>{
        Alert.alert("map pressed" + itmId);
      //  setCountTimes(route))
       // console.log(`countTimes: ${countTimes}`);
//        navigation.push("MapHome",{mapid:itmId, count:route.params.count + 1})

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

    const camNamePress = ()=>{
        Alert.alert('cam press')
    }

    return(
        <View style={[globalStyles.modalContent,{backgroundColor:'#fff', height:'80%'}]}>
            <Text>{mapid}</Text>

            <MapComponent mapid={mapid} pressMapHandler={pressMapHandler}
                pressCloseDialog={pressCloseDialog}
                pressCloseDialogCurr={pressCloseDialogCurr}
                />
            {/* <CamListComponent camNamePress={camNamePress} mapId={mapid} />    */}
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