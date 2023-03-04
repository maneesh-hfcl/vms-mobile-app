import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import FormOuterCard from "./form/outerCard";
import TextCard from "./form/textCard";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons, Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { LnkBtnCard } from "./lnkBtnCard";

const ItemEventTemplate = ({elem, pressLnkHandler})=>{
    const ConverToDate = (date)=>{
        let dt = new Date(date)
        return dt.getMonth() + "/" + dt.getDay() + "/" + dt.getFullYear() 
                + " "+ dt.getHours()+":"+ dt.getMinutes()+":"+ dt.getSeconds()
    }

    return(


        <View style={{marginVertical:0, marginHorizontal:0,
            borderBottomWidth:1,
            borderBottomColor:'#c7c7c7',
            padding:0,
            backgroundColor:'#fff',
            paddingHorizontal:5,
            flex:1

        }}>
                    
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Pressable style={{ flex:1,backgroundColor:'#fff'}}>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <MaterialCommunityIcons name="alert" size={20} color="#b32700" />
                                
                                <Text style={{fontSize:15, marginLeft:8}}>{elem.evtname} </Text>
                                
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:13, color:'#808080'}}> {ConverToDate(elem.evtime)} </Text>
                                <Entypo name="dot-single" size={18} color="black" />
                                <Text style={{fontSize:13, color:'#808080'}}> {elem.objids?elem.objids:"Camera 17"} </Text>
                            </View>
                        </Pressable>
                        <View style={{marginVertical:5,
                                alignItems:'flex-start'
                                , justifyContent:'flex-end'
                                
                                , borderRadius:5
                                }}>
                            <View style={{
                                backgroundColor:'#f5f3f2',
                                borderRadius:5
                            }}>        
                            <LnkBtnCard iconName={'add'} 
                            iconColor={'#395fb3'}
                            color={''}
                            labelColor={'#395fb3'}
                            iconSize={15}
                            
                            label='View' pressLnkHandler={() => pressLnkHandler('details', elem)} />
                            </View>
                            <View style={{marginVertical:5,
                                borderTopWidth:0,
                                borderColor:'#fff',
                                backgroundColor:'#f2fcf3',
                                borderRadius:5
                                }}>
                                <LnkBtnCard iconName={'play-arrow'} 
                                iconColor={'green'} color=''
                                    labelColor={'green'}
                                iconSize={15} label='Play ' pressLnkHandler={() => pressLnkHandler('play', elem)} />
                            </View>
                        </View>
                        {/* <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {'Ready to use'} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvip} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvpt} </Text> */}
                    </View>

                    
            </View>




            
        
    )
}

export default ItemEventTemplate;

const styles = StyleSheet.create({
    itemOuter_vw : {

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:'#e9e9e9',
        borderWidth:2,
        backgroundColor:'#fff',
        
    },
    itemText:{
        marginHorizontal:10,
        flex:0.3
    }
})