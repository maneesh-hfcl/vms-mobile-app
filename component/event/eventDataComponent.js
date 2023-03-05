import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { LoadApiData } from "../../shared/fetchUrl";
import ActivityIndicatorComponent from "../activityIndicatorComponent";
import ItemEventTemplate from "../card/itemEventTemplate";
import LoadingDialogComponent from "../loadingDialogComponent";

const EventDataComponent = ({pressLnkHandler, setHideLoadingVisible })=>{
    const[evtLst, setEvtLst] = useState([]);
   // const[isLoadingVisible, setIsLoadingVisible] = useState(isLoadingVisible)
    useEffect(()=>{
   //     setIsLoadingVisible(true)
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
        setHideLoadingVisible(false)
    }



    const renderItems = (elem)=>{
        return(
            <ItemEventTemplate elem={elem} pressLnkHandler={pressLnkHandler} />
            )
    }

    return(
                <FlatList
                    data={evtLst}
                    keyExtractor={item => item.id}
                    renderItem ={({item})=> renderItems(item)}
                    
                />
            
    
    )
}

export default EventDataComponent;