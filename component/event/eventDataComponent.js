import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { LoadApiData } from "../../shared/fetchUrl";
import ItemEventTemplate from "../card/itemEventTemplate";

const EventDataComponent = ({pressLnkHandler})=>{
    const[evtLst, setEvtLst] = useState([]);
    useEffect(()=>{
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
            objids: elem.objids.trim(),
            

        })
        )

        setEvtLst(initLst);
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