import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import FormOuterCard from "../../component/card/form/outerCard";
import TextCard from "../../component/card/form/textCard";
import FormBtn from "../../component/card/form/touchableCard";

const ServerScreen = ({navigation})=>{

    const initLst = [
        {'Sym':'Server 1','Name':'Server 1 Centre', 'IPAddr':'127.0.0.1', 'Status':'Operational', 'Type':'Recorder NVR/DVR'},
        {'Sym':'Server 2','Name':'Server 2 Centre', 'IPAddr':'127.0.0.1', 'Status':'Operational', 'Type':'Message Server'},
        {'Sym':'Server 3','Name':'Server 3 Centre', 'IPAddr':'127.0.0.1', 'Status':'Operational', 'Type':'Recorder NVR/DVR'}
    ]

    const[srvrLst, setSrvrLst] = useState([])

    useEffect(()=>{
        loadData()
    },[])

    const loadData = ()=>{
        setSrvrLst(initLst);
    }

    const pressHandlerEdit = ()=>{
//        Alert.alert("Edit button goes here")
        navigation.navigate("editServer")
    }

    const renderItems = (item)=>{
        return(
            <FormOuterCard>
                <View>
                    <TextCard heading={true}>SYM</TextCard>
                    <TextCard>{item.Sym}</TextCard>
                </View>
                <View>
                    <TextCard heading={true}>NAME</TextCard>
                    <TextCard>{item.Name}</TextCard>
                </View>

                <View style={{flexDirection:'row'}}>
                    <TextCard heading={true} flx={true}>IP Address</TextCard>
                    <TextCard heading={true} >Status</TextCard>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextCard flx={true}>{item.IPAddr}</TextCard>
                    <TextCard>{item.Status}</TextCard>
                </View>
                <View>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <TextCard heading={true}>Type</TextCard>
                            <TextCard>{item.Type}</TextCard>
                        </View>
                            <FormBtn text="Edit" pressHandlerBtn={pressHandlerEdit}>
                                <Entypo name="edit" size={15} color="lightgreen" />
                            </FormBtn>

                    </View>
                </View>
            </FormOuterCard>
        )
    }

    return(
            <View style={globalStyles.container_main}>
                <FlatList 
                    data={srvrLst}
                    keyExtractor={item => item.Sym}
                    renderItem = {({item})=>(renderItems(item))}
                />
            </View>

    )
}

export default ServerScreen;

const styles= StyleSheet.create({

})