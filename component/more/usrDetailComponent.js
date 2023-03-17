import React, { useContext, useEffect, useState } from "react";
import {View, Text, StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from "../../style/globalstyle";
import ItemRowTemplateComponent from "../card/itemRowTemplate";
import UserContext from "../../shared/usrContext";

const UserDetailComponent = ({user})=>{
    const {userVal, setUserVal} = useContext(UserContext);

    return(
        <View style={{marginVertical:30, marginHorizontal:5
        }}>
            <Text style={[globalStyles.text_form,{textAlign:'center'}]}>You are currently logged in as</Text>
            <View style={{alignItems:'center', marginVertical:15}}>
                <View style={{
                        borderWidth:1,
                        borderColor:'#d7d7d7',
                        marginHorizontal:5,
                        marginVertical:5,
                        borderRadius:40,
                        width:80, height:80,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#e6eefc',
                        
                    }}>
                    <FontAwesome name="user" size={30} color="gray" />
                    
                </View>
                <Text style={{fontSize:20, marginTop:15}}> {userVal.username} </Text>   
            </View>
                <ItemRowTemplateComponent  title={"Email"} content={userVal.email} />
                <ItemRowTemplateComponent  title={"Tel"} content={userVal.tel} />
                <ItemRowTemplateComponent  title={"Mobile"} content={userVal.mob} />
                <ItemRowTemplateComponent  title={"Description"} content={userVal.desc} />


        </View>
    )

}

export default UserDetailComponent;