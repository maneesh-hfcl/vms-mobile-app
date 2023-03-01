import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const WrkstnScreen = ()=>{
    const[stnLst, setStnLst] = useState(null)
    const initLst = [
        {id:1, sym:'M3SVMS01', name:'M3S VMS Workstation_M3SVMS01'
            , ipaddress:'172.17.6.61', port:8001, type:'VMS', status:'Ready to use' },
        {id:2, sym:'M3SVMS02', name:'M3S VMS Workstation_M3SVMS02'
            , ipaddress:'172.17.16.61', port:8002, type:'VMS', status:'Operational' },
    ]
    useEffect(()=>{
        setStnLst(initLst)
    },[])

    const renderItems = (item)=>{
        return(
            <View style={{flexDirection:'row',
                borderBottomWidth:1,
                borderBottomColor:'#c7c7c7'
            }}>
                <React.Fragment>
                    {/* <Image source={require("../../assets/icons/logo.png")} 
                        resizeMode="contain"
                        style={{backgroundColor:'#000', width:80, 
                        height:80, marginVertical:5}}
                    /> */}
                    <View style={{
                        borderWidth:1,
                        borderColor:'#c7c7c7',
                        marginHorizontal:5,
                        marginVertical:5,
                        borderRadius:5,
                        width:60, height:60,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#c7c7c7'
                    }}>
                        <MaterialIcons name="desktop-mac" size={24} color="black" />
                    </View>
                </React.Fragment>
                <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
                    <Text style={{fontSize:18}}> {item.sym} </Text>
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        
                        <Text style={{fontSize:13, color:'#808080'}}> {item.name} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.type} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.status} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.ipaddress} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.port} </Text>
                    </View>
                </View>
            </View>
        
        )
    }

    return(
        <View style={globalStyles.container_main}>
            <FlatList 
                data={stnLst}
                keyExtractor={item=> item.id}
                renderItem = {({item})=> renderItems(item)}
            />

        </View>
    )
}

export default WrkstnScreen;

const styles = StyleSheet.create({

})