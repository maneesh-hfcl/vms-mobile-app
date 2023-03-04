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
            evtname: elem.evtname,
            evstate: elem.evstate,
            objids: elem.objids?.trim(),
            dtabf: elem.dtabf
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
                <FlatList style={{flex:1}}
                contentContainerStyle={{flexGrow: 1}}
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                    data={evtLst}
                    keyExtractor={item => item.id}
                    renderItem ={({item})=> renderItems(item)}
                    
                />
            
    
    )
}

export default EventDataComponent;