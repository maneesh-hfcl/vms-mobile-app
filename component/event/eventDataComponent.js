import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { LoadApiData } from "../../shared/fetchUrl";
import ActivityIndicatorComponent from "../activityIndicatorComponent";
import ItemEventTemplate from "../card/itemEventTemplate";
import LoadingDialogComponent from "../loadingDialogComponent";

const EventDataComponent = ({pressLnkHandler})=>{
    const[evtLst, setEvtLst] = useState([]);
    const[isLoadingVisible, setIsLoadingVisible] = useState(false)
    useEffect(()=>{
        setIsLoadingVisible(true)
        loadData()
    },[])

    const loadData = async()=>{
        let jsonData = await LoadApiData("/evtlog")
        //console.log(jsonData)
        let initLst = jsonData.map((elem)=>({
            id: elem.id,
            evtime: elem.evtime,
            evtype: 'Intrusion Detection',//elem.evtype,
            evstate: elem.evstate,
            objids: elem.objids?.trim(),
        })
        )

        setEvtLst(initLst);
        setIsLoadingVisible(false)
    }



    const renderItems = (elem)=>{
        return(
            <ItemEventTemplate elem={elem} pressLnkHandler={pressLnkHandler} />
            )
    }

    return(
            <View style={{flex:1}}>
                <LoadingDialogComponent isVisible={isLoadingVisible} />
                <FlatList
                    data={evtLst}
                    keyExtractor={item => item.id}
                    renderItem ={({item})=> renderItems(item)}
                    
                />
            </View>
    
    )
}

export default EventDataComponent;