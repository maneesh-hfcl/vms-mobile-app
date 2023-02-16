import Checkbox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { View,  StyleSheet, Text, Alert, FlatList } from "react-native";
import { globalStyles } from "../../style/globalstyle";
import ChkItemCardComponent from "../card/chkItemCard";

const EventTypeListComponent = ()=>{
    const eventJsonFile = require("../../assets/eventType.json")
    const[isChecked, setIsChecked] = useState(false);
    const[eventLst, setEventLst] = useState([])
    
    useEffect(()=>{
        const jsonFile = eventJsonFile;
        console.log(jsonFile.events[0].name)
        let jsonEvents = jsonFile.events;
        //let tempArr = [...jsonFile.events,{isChecked:false}]
        let tempArr =  jsonEvents.map(elem => {return {...elem, isChecked:false}})
        tempArr = [{
            id : 0,
            name: 'All',
            devnm: 'All'
        }, ...tempArr]
       // console.log(tempArr)
        setEventLst(tempArr)
    },[])

    const setIsCheckedChange = (elemId, value)=>{
        console.log(value);
        console.log(elemId)
        let tempArr = [... eventLst]
        let findElem = tempArr.find(el => el.id == elemId)
        findElem.isChecked = value;
        setEventLst(tempArr)
//       console.log(tempArr)
    }

    const renderItems = (elem)=>(
                <ChkItemCardComponent elem={elem} setIsCheckedChange={setIsCheckedChange} />
        
    )
    

    return(
            <View style={{ backgroundColor:'#fff',paddingHorizontal:20,paddingVertical:20}}>

                <View>
                        <FlatList style={{paddingBottom:10, marginBottom:5,height:'100%'}}
                            data={eventLst}
                            keyExtractor={item =>item.id}
                            renderItem={({item}) => (renderItems(item))}
                        />
                    </View>


                </View>
             // <View style={{flexDirection:'row'}}>
            //     <Checkbox
            //         value={isChecked}
            //         onValueChange = {setIsChecked}
            //         color={isChecked?'red': undefined}
            //     />
            //     <Text>First</Text>
            // </View>

    )
}

export default EventTypeListComponent;

const styles = StyleSheet.create({

})