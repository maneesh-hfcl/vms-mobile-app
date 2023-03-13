import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { globalStyles } from "../../style/globalstyle";
import { MaterialIcons, Feather, Entypo, AntDesign } from '@expo/vector-icons';
import { LnkBtnCard } from "../../component/card/lnkBtnCard";

const ReportedScreen = ({navigation})=>{
    const[reportLst, setReportLst] = useState(null)
    const[curImageIndx, setCurImageIndx] = useState(-1)

    useEffect(()=>{
        getStorageData()
    },[])

    const getStorageData = async ()=>{
        try
        {
            const jsonVal = await AsyncStorage.getItem("@stored_img")
            if(jsonVal == null)
            {
                console.log("No value present")
            }
            else{
                let idCount = 1
                //console.log()
            //    console.log(JSON.parse(jsonVal))
                let initLst = []
                try
                {
                    initLst = JSON.parse(jsonVal).map((elem,index) =>({
                        id : index + 1,
                        images : elem.images,
                        videos : [],
                        text : elem.text,
                        showImgVid: false
                        })
                    )
                }
                catch(e){
                    console.log(e)
                } 
                console.log('Emergency list coming here')
//                 console.log(initLst)

//                setImgLst(initLst)
                setReportLst(initLst)
            }
        }
        catch(e){

        }
    }

    const imgPress = (img)=>{
        navigation.navigate("ViewEmergencyImage",{imageUrl:img})
//        console.log(img);
    }

    const renderItem = ({item, index})=>{
        return(
            
            <View style={{marginVertical:1, marginHorizontal:1}}>
                <TouchableOpacity onPress={() => imgPress(item, index)}>
                    {
                        (curImageIndx == index)?(
                        <Image source={{uri:item}} style={{width:60, 
                            height:60, borderRadius:30, borderWidth:3,
                            borderColor:'orange',
                            marginHorizontal:2
                        
                        }} />
                        ):
                        (
                            <Image source={{uri:item}} style={{width:60, 
                                height:60, borderRadius:30,
                                borderWidth:3, borderColor:'#fff',
                                marginHorizontal:2
                            }} />
                        )
                    }
                </TouchableOpacity>
            </View>
        )
    }

    const renderItemVideo = ({item, index})=>{
        return(
            
            <View style={{marginVertical:1, marginHorizontal:1}}>
                <TouchableOpacity onPress={() => imgPress(item, index)}>
                    {
                        (curImageIndx == index)?(
                        <Image source={{uri:item}} style={{width:60, 
                            height:60, borderRadius:5, borderWidth:3,
                            borderColor:'orange',
                            marginHorizontal:2
                        
                        }} />
                        ):
                        (
                            <View style={{width:60, 
                                height:60, borderRadius:30, borderWidth:3,
                                borderColor:'#fff',
                                marginHorizontal:2,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#ededed'
                            }}>
                                <Text style={{
                                    fontSize:12,
                                    color:'black',
                                    backgroundColor:'#d7d7d7',
                                    width:'100%',
                                    paddingVertical:2,
                                    textAlign:'center',
                                    fontWeight:'bold'
                                }}>Play</Text>
                            </View>
                        )
                    }
                </TouchableOpacity>
            </View>
        )
    }

const handleVidImgPress = (item)=>{
    console.log('handlePress called');
    let tempItem = item
    tempItem.showImgVid =!item.showImgVid
    console.log(tempItem);
    let tempArr = [...reportLst, tempItem]
    setReportLst(tempArr)
//    Alert.alert("hello")
}

const renderItemOuter = ({item, index}) =>{
    return(
        <View style={[globalStyles.container_form,{marginHorizontal:5, marginVertical:3
            ,borderWidth:0, borderBottomWidth:3, borderBottomColor:'#d9d9d9'
        }]}>
            <View style={{marginLeft:10, marginBottom:0, flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <Pressable style={{flexDirection:'row'}}  onPress={() => handleVidImgPress(item)} >
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row', alignItems:'center',}}>
                                <Feather name="alert-triangle" size={16} color="red" />
                                <Text style={{marginHorizontal:10, fontSize:15}}>{item.text}</Text>
                            </View>
                            
                            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
                                <MaterialIcons name="location-pin" size={20} color="green" />
                                <Text style={{marginHorizontal:10}}>{item.location}ww</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => handleVidImgPress(item)} style={{justifyContent:'center'}}>
                            <MaterialIcons name={item.showImgVid?"arrow-back-ios":"arrow-forward-ios"} size={18} 
                                style={{paddingHorizontal:10, paddingVertical:10}}
                            color="#a7a7a7" />
                        </Pressable>
                    </Pressable>
                    <View style={{justifyContent:'center', alignItems:'center'}}>  
                    {
                        item.showImgVid && 
                        <View style={{alignContent:'flex-start', flex:1,
                            backgroundColor:'#f2f2f2', marginRight:8
                        }}>
                        <View style={{flexDirection:'row', alignItems:'center'
                        , width:'100%',
                        paddingHorizontal:10}}>
                            <View style={{alignItems:'center',
                                         alignContent:'center'}}>
                                <View style={{flex:1, justifyContent:'center', marginRight:8}}>
                                <Entypo name="image" size={24} color="gray"  />
                                
                                </View>
                            </View>
                            <FlatList horizontal
                                data={item.images}
                                keyExtractor = {index => index}
                                renderItem={renderItem}
                                ListEmptyComponent={() => EmptyListImgVid("No image present")}
                            />
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center'
                                , marginHorizontal:10
                                , borderTopWidth:1, borderColor:'#d7d7d7', marginTop:5, paddingTop:5 }}>
                            <View style={{alignItems:'center',
                                         alignContent:'center'}}>
                                <View style={{flex:1, justifyContent:'center', marginRight:8}}>
                                <Entypo name="video" size={24} color="gray"  />
                                </View>
                            </View>
                            <FlatList horizontal
                                data={item.videos}
                                keyExtractor = {index => index}
                                renderItem={renderItemVideo}
                                ListEmptyComponent={() => EmptyListImgVid("No video present")}
                            />
                        </View>

                        
                        </View>
                       }         
                        <View style={{marginTop:10,alignSelf:'flex-end'}}>         
                        <LnkBtnCard 
                            iconName={'send-to-mobile'}
                            iconSize={22}
                            iconColor={'black'}
                            label={'Send to station'}
                            labelColor={'blue'}
                            color={"#b5e398"}
                        />
                        </View>
                    </View>
                </View>


            </View>
            {/* <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10}}>
                <View style={{alignItems:'center'}}>
                    <Entypo name="images" size={24} color="#c7572e" style={{marginRight:5}} />

                </View>
                <FlatList horizontal
                data={item.images}
                keyExtractor = {index => index}
                renderItem={renderItem}
            />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, marginVertical:5}}>
                <AntDesign name="play" size={20} color="purple" style={{marginRight:5}} />
                <FlatList horizontal
                data={item.images}
                keyExtractor = {index => index}
                renderItem={renderItemVideo}
            />
            </View> */}

        </View>
    )
}



const EmptyList = ()=>{
    return(
        <View style={[globalStyles.container_form, { marginHorizontal:100,paddingHorizontal:20, marginVertical:50,justifyContent:'center', alignItems:'center', height:50}]}>
            <Text style={globalStyles.card_cam_text_empty}>No record present</Text>

        </View>
    )
}

const EmptyListImgVid = (text)=>{
    return <Text style={[globalStyles.card_cam_text_empty,{fontSize:13, marginVertical:10}]}>{text}</Text>
}

    return(
        <View style= {[globalStyles.container_main,{backgroundColor:'#e7e7e7'}]}>

            <FlatList
                    
                    showsHorizontalScrollIndicator={false}
                    data={reportLst}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItemOuter}
                    ListEmptyComponent={EmptyList}
                />
        </View>
    )
}

export default ReportedScreen;