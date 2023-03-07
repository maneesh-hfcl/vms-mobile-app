import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { LoadApiData, LoadApiPostData } from "../../shared/fetchUrl";
import { globalStyles } from "../../style/globalstyle";
import ActivityIndicatorComponent from "../activityIndicatorComponent";
import ItemEventTemplate from "../card/itemEventTemplate";
import LoadingDialogComponent from "../loadingDialogComponent";

const EventDataComponent = ({pressLnkHandler, setHideLoadingVisible, sortBy, sortDir, fltrEvnt, fltrCam })=>{
    const[evtLst, setEvtLst] = useState([]);
   // const[isLoadingVisible, setIsLoadingVisible] = useState(isLoadingVisible)
    useEffect(()=>{
   //     setIsLoadingVisible(true)
        loadData()
    },[sortBy, sortDir, fltrEvnt, fltrCam])

    const loadData = async()=>{
        let sortByDir = (sortDir!=""?("/"+sortBy+"/"+sortDir):"");

        let eventUrl = "/evtlog" + sortByDir
        console.log(sortByDir)
        console.log("eventurl: " + eventUrl);
        let filterVal = "";
        if(fltrEvnt.length > 0 || fltrCam.length > 0)
        {
            filterVal = {
                "events": fltrEvnt,
                "cameras": fltrCam
            }
        }
        console.log("filterVal");
        console.log(filterVal)
        let jsonData;
        if(filterVal == "")
            jsonData = await LoadApiData(eventUrl, "POST")
        else
            jsonData = await LoadApiPostData(eventUrl,"POST",filterVal)
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
        //Alert.alert("hiding visible")
    }



    const renderItems = (elem)=>{
        return(
            <ItemEventTemplate elem={elem} pressLnkHandler={pressLnkHandler} />
            )
    }

    const EmptyList = ()=>{
        return(
            <View style={[globalStyles.container_form, {marginHorizontal:50, marginVertical:80,justifyContent:'center', alignItems:'center'}]}>
                <Text style={globalStyles.card_cam_text_empty}>No event present</Text>
                <Text style={globalStyles.card_cam_text_empty}>Kindly check the filter applied</Text>
            </View>
        )
    }

    return(
                <FlatList
                    data={evtLst}
                    keyExtractor={item => item.id}
                    renderItem ={({item})=> renderItems(item)}
                    ListEmptyComponent={EmptyList}
                />
            
    
    )
}

export default EventDataComponent;