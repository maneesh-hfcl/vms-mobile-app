import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {View, Text, StyleSheet, Image} from 'react-native'
import { LoadApiData } from "../../shared/fetchUrl";
import { globalStyles } from "../../style/globalstyle";
import { Entypo, FontAwesome } from '@expo/vector-icons';

const GroupScreen = ()=>{
    const[grpLst, setGrpLst] = useState(null)
    const initLst = [
        {id:1, name:'Administrator', type:'System Administrator'},
        {id:2, name:'Users', type:'Members'},
    ]
    useEffect(()=>{
        loadData()
    },[])

    const loadData = ()=>{
        setGrpLst(initLst)
    }

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
                        <FontAwesome name="group" size={24} color="black" />
                    </View>
                </React.Fragment>
                <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
                
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Text style={{fontSize:13, color:'#808080'}}> {item.name} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.type} </Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style={globalStyles.container_main}>
            <FlatList
                data={grpLst}
                keyExtractor={item => item.id}
                renderItem = {({item}) => renderItems(item) }
            />
        </View>
    )
}

export default GroupScreen;

const styles = StyleSheet.create({

})