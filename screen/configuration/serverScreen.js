import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Pressable} from 'react-native'
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import FormOuterCard from "../../component/card/form/outerCard";
import TextCard from "../../component/card/form/textCard";
import FormBtn from "../../component/card/form/touchableCard";
import { LnkBtnCard } from "../../component/card/lnkBtnCard";
import { LoadApiData } from "../../shared/fetchUrl";
import { MaterialIcons } from '@expo/vector-icons';
import ActivityIndicatorComponent from "../../component/activityIndicatorComponent";
import LoadingDialogComponent from "../../component/loadingDialogComponent";

const ServerScreen = ({navigation})=>{

    const initLst = []

    const[srvrLst, setSrvrLst] = useState([])
    const[isLoading, setIsLoading] = useState(false)

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
            setIsLoading(false)
        }
        catch{

        }
//        setSrvrLst(initLst);
    }

    const pressHandlerEdit = ()=>{
//        Alert.alert("Edit button goes here")
        navigation.navigate("editServer")
    }

    const renderItemsOld = (item)=>{
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

    const renderItems = (item)=>{
        return(
            <View style={{flexDirection:'row',
                borderBottomWidth:1,
                borderBottomColor:'#c7c7c7',
                padding:0
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
                        <FontAwesome5 name="server" size={24} color="black" />
                    </View>
                </React.Fragment>
                <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
                    <View style={{flexDirection:'row', marginBottom:5}}>
                        <Text style={{fontSize:18, flex:1}}> {item.nvsym} </Text>
                        <LnkBtnCard iconName={'edit'} 
                                iconColor={'#707070'}
                                color={'#fff'}
                                labelColor={'#395fb3'}
                                iconSize={18}
                                
                                label='Modify' pressLnkHandler={pressHandlerEdit} 
                            />
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvdsc} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvtype} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {'Ready to use'} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvip} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.nvpt} </Text>
                    </View>
                    
                </View>
            </View>
        
        )
    }

    return(
            <View style={[globalStyles.container_main]}>
                <LoadingDialogComponent isVisible={isLoading} />
                {srvrLst.length > 0 &&
                <FlatList 
                    data={srvrLst}
                    keyExtractor={item => item.id}
                    renderItem = {({item})=>(renderItems(item))}
                />
                }
            </View>

    )
}

export default ServerScreen;

const styles= StyleSheet.create({

})