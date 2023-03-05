import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { LoadApiData } from "../../shared/fetchUrl";
import ActivityIndicatorComponent from "../activityIndicatorComponent";
import ChkItemCardComponent from "../card/chkItemCard";

const CamlistSrchComponent = ({itemchecked, camLst})=>{
//    const[camLst, setCamLst] = useState([])
    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      //  loadData()
    },[])

    const loadData = async ()=>{
        let jsonData = await LoadApiData("/devices")
//        console.log(jsonData);

        let initLst = jsonData.map(elem=>({
            id : elem.id,
            name: elem.devsym,
            devnm: elem.devnm
        })
        )

        // initLst = [{
        //     id : 0,
        //     name: 'All',
        //     devnm: 'All'
        // }, ...initLst]
       // setCamLst(initLst);
        setIsLoading(false)
    }

    const setIsCheckedChange = (elemId, value)=>{
        console.log(value);
        console.log(elemId)
        let tempArr = [... camLst]
        let findElem = tempArr.find(el => el.id == elemId)
        findElem.isChecked = value;
 //       setCamLst(tempArr)
        itemchecked('camera', findElem.name, value)
//       console.log(tempArr)
    }

    const renderItems = (elem)=>{
        return(
            <ChkItemCardComponent elem={elem} setIsCheckedChange={setIsCheckedChange} />
        )
    }

    return(
        <View style={{ backgroundColor:'#fff',paddingHorizontal:20,paddingVertical:20}}>
            <FlatList style={{paddingBottom:10, marginBottom:5,height:'100%'}}
                    data={camLst}
                    keyExtractor={item => item.id}
                    renderItem = {({item})=>(renderItems(item))}
                />
        </View>
    )
}

export default CamlistSrchComponent;
