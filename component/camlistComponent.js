import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import { AntDesign, Octicons } from '@expo/vector-icons';
import MapCard from "./card/mapCard";

const CamListComponent = ({camList, camNamePress})=>{
    const[camArr, setCamArr] = useState([])
    useEffect(()=>{
        setCamArr(camList)
    },[camList])

    const renderItems = (item)=>{
        return(
            <Text>{item.name}</Text>
        )
    }

    const EmptyList = ()=>{
        return(
           
                <Text style={styles.card_cam_text_empty}>No cameras present</Text>
           
        )
    }

    return(
        <View style={styles.card_vw_outer}>
            <MapCard menuText="Child" menuId={2}
                 iconType={true}  />
            {/* <FlatList numColumns={} 
                data={camArr}
                keyExtractor = {item => item.id}
                renderItem = {({item})=>(renderItems(item))}
                ListEmptyComponent = {emptyList}
    /> */}
        <View style={styles.card_vw_cam}>
           { camArr.length > 0 &&
                camArr.map((elem, indx) =>(

                    <TouchableOpacity onPress={() => camNamePress(elem)} key={indx}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Octicons name="device-camera-video" size={15} color="green" />
                            <Text style={styles.card_cam_text} >{elem.name}</Text>
                        </View>
                    </TouchableOpacity>
                    
                ))
            } 
            {
                camArr.length < 1 &&
                <EmptyList />
            }
      
         </View>
         </View>
    )
}

export default CamListComponent;

const styles = StyleSheet.create({
    card_vw_outer:{
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        backgroundColor: '#fff',
        borderColor:'#dfdfdf',
        paddingHorizontal:0,
        paddingVertical:0,
      
        marginHorizontal:5,
        paddingTop:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        
    },
    card_vw_cam:{
        flexWrap:"wrap",
        flexDirection:"row",
        marginHorizontal:10,
        marginVertical:10
    },
    card_cam_text:{
        paddingHorizontal:4,
        paddingVertical:5,
        marginRight:20,
        color:'#3075db',
        fontSize:16,
        textDecorationLine:'underline'
    },
    card_cam_text_empty:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'gray',
        fontSize:15
    }


})