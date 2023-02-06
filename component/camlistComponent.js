import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import { AntDesign, Octicons, Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import MapCard from "./card/mapCard";

const CamListComponent = ({mapId, camNamePress})=>{
    const camList =[
        {id:1, name:'Hfcl sec 32 6th floor cafeteria camera 2 times probable'},
        {id:2, name:'Cam_162'},
        {id:3, name:'Cam_163'},
        {id:4, name:'Cam_164'},
    ]
    
    const[camArr, setCamArr] = useState([])

    useEffect(()=>{
        setCamArr(camList)
    },[])

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

        <View style={styles.card_vw_cam}>
           { camArr.length > 0 &&
                camArr.map((elem, indx) =>(

                    
                        <View style={{ flexDirection:'row', borderBottomColor:'#d5d5d5',
                                     borderBottomWidth:1, marginVertical:5}}>
                            <View style={{flexDirection:'row', flex:1, alignItems:'center', 
                                        marginHorizontal:5,
                                        
                                        
                                        }}>
                                <MaterialCommunityIcons name="cctv" size={24} color="#3d488f" />
                                <TouchableOpacity onPress={() => camNamePress(elem)} key={indx}>
                                    <Text style={styles.card_cam_text} >{elem.name}</Text>
                                </TouchableOpacity>
                            </View>
                            
                                <View style={{flexDirection:'column', marginHorizontal:10, marginVertical:5}}>
                                    <Ionicons name="play-sharp" size={22} color="green" />
                                    <Text style={{fontSize:10, color:'#707070'}}>Live</Text>
                                </View>
                                <View style={{flexDirection:'column', marginHorizontal:10, marginVertical:5}}>
                                    <Foundation name="record" size={24} color="red" />
                                    <Text style={{fontSize:10, color:'#707070'}}>Rec</Text>
                                </View>
                            
                        </View>

                    
                ))
            } 
            {
                camArr.length < 1 &&
                <EmptyList />
            }
      
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
        paddingHorizontal:10,
        paddingVertical:0,
      
        marginHorizontal:0,
        paddingTop:5,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        
    },
    card_vw_cam:{
        flex:1,
        marginHorizontal:10,
        marginVertical:10
    },
    card_cam_text:{
        paddingHorizontal:4,
        paddingVertical:5,
        marginRight:20,
        color:'#3075db',
        fontSize:16,

    },
    card_cam_text_empty:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'gray',
        fontSize:15
    }


})