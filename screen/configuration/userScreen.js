import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { LoadApiData } from "../../shared/fetchUrl";
import { globalStyles } from "../../style/globalstyle";
import { Entypo } from '@expo/vector-icons';

const UserScreen = ()=>{
    const[usrLst, setUsrLst] = useState(null)

    useEffect(()=>{
        loadData()
    },[])

    const loadData = async()=>{
        try{
            const jsondata = await LoadApiData("/users")
            //console.log(jsondata)
            let initLst = jsondata.map((elem)=>({
                id : elem.id,
                login: elem.login?.trim(),
                type: elem.usrname?.trim(),
                email: elem.usreml?.trim()
            }))
            console.log(initLst)
            setUsrLst(initLst)
        }
        catch{

        }
    }

    const renderItems = (item)=>{
        return(
            <View style={{flexDirection:'row',
                borderBottomWidth:1,
                borderBottomColor:'#c7c7c7'
            }}>
                <React.Fragment>
                    <Image source={require("../../assets/icons/logo.png")} 
                        resizeMode="contain"
                        style={{backgroundColor:'#000', width:80, 
                        height:80, marginVertical:5,
                        borderRadius:5,
                    }}
                    />
                </React.Fragment>
                <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
                    <Text style={{fontSize:18}}> {item.login} </Text>
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Text style={{fontSize:13, color:'#808080'}}> {item.type} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {'Administrator'} </Text>
                        <Entypo name="dot-single" size={18} color="black" />
                        <Text style={{fontSize:13, color:'#808080'}}> {item.email} </Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style={[globalStyles.container_main, {paddingHorizontal:10}]}>
            <FlatList 
                data={usrLst}
                keyExtractor={item => item.id}
                renderItem = {({item})=> renderItems(item)}
            />
        </View>
    )
}

export default UserScreen;

const styles= StyleSheet.create({

})