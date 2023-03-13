import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from "../../style/globalstyle";
import ItemRowTemplateComponent from "../card/itemRowTemplate";

const UserDetailComponent = ({user})=>{
    return(
        <View style={{marginVertical:10, marginHorizontal:10
        }}>
            <Text style={[globalStyles.text_form,{textAlign:'center'}]}>You are currently logged in as</Text>
            <View style={{alignItems:'center', marginVertical:30}}>
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
            </View>
            

                <ItemRowTemplateComponent  title={"Username"} content={"Administrator"} />
                <ItemRowTemplateComponent  title={"Email"} content={"info@hfcl.com"} />
                <ItemRowTemplateComponent  title={"Tel"} content={"0124-24234234"} />
                <ItemRowTemplateComponent  title={"Mobile"} content={"80101010"} />


        </View>
    )

}

export default UserDetailComponent;