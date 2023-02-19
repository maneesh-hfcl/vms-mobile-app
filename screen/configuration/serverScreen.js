import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Pressable} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import FormOuterCard from "../../component/card/form/outerCard";
import TextCard from "../../component/card/form/textCard";
import FormBtn from "../../component/card/form/touchableCard";
import { LnkBtnCard } from "../../component/card/lnkBtnCard";
import { LoadApiData } from "../../shared/fetchUrl";
import { MaterialIcons } from '@expo/vector-icons';

const ServerScreen = ({navigation})=>{

    const initLst = []

    const[srvrLst, setSrvrLst] = useState([])

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                    <LnkBtnCard 
                        iconName={'add'} iconSize={20} iconColor="#707070" 
                        color={"#fff"} label={'Add'} labelColor="#395fb3"
                        pressLnkHandler={pressHeaderHandler}
                    />

            )
        })
        loadData()
    },[])

    const pressHeaderHandler = ()=>{
        navigation.navigate("addServer")
    }

    const loadData = async ()=>{
        try{
            const jsondata = await LoadApiData("/nvr")
            console.log(jsondata)        
            let initLst = jsondata.map((elem)=>({
                id:  elem.id,
                nvsym: elem.nvsym.trim(),
                nvtype: elem.nvtyp,
                nvip: elem.nvip.trim(),
                nvpt: elem.nvpt,
                nvdsc: elem.nvdsc.trim()    
                })
            )
            console.log(initLst)
            setSrvrLst(initLst)
        }
        catch{

        }
//        setSrvrLst(initLst);
    }

    const pressHandlerEdit = ()=>{
//        Alert.alert("Edit button goes here")
        navigation.navigate("editServer")
    }

    const renderItems = (item)=>{
        return(
            <FormOuterCard key={item.id}>
                <View style={{marginHorizontal:0}}>
                <View style={{flexDirection:'row'}}>
                    <TextCard heading={true} flx={true}>Sym</TextCard>
                    <TextCard heading={true} flx={true} align={'right'}>Name</TextCard>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextCard flx={true}>{item.nvsym}</TextCard>
                    <TextCard align={'right'}>{item.nvdsc}</TextCard>
                </View>

                <View style={{flexDirection:'row'}}>
                    <TextCard heading={true} flx={true}>IP Address</TextCard>
                    <TextCard heading={true} align={'right'} >Status</TextCard>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextCard flx={true}>{item.nvip}</TextCard>
                    <TextCard align={'right'}>{item.Status}</TextCard>
                </View>
                <View>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <TextCard heading={true}>Type</TextCard>
                            <TextCard>{item.nvtyp}</TextCard>
                        </View>
                        <View style={{alignItems:'center', justifyContent:'flex-end'}}>
                            <LnkBtnCard iconName={'edit'} 
                                iconColor={'#707070'}
                                color={'#fff'}
                                labelColor={'#395fb3'}
                                iconSize={18}
                                
                                label='Edit' pressLnkHandler={pressHandlerEdit} 
                            />
                        </View>
                    </View>
                </View>
                </View>
            </FormOuterCard>
        )
    }

    return(
            <View style={[globalStyles.container_main]}>
                <FlatList 
                    data={srvrLst}
                    keyExtractor={item => item.id}
                    renderItem = {({item})=>(renderItems(item))}
                />
            </View>

    )
}

export default ServerScreen;

const styles= StyleSheet.create({

})