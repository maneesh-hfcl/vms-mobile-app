import React from "react";  
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const MapCard = ({children, menuText, menuId, pressMapHandler, iconType})=>{
    return(
        <View style={styles.card_menu_view}>
            <TouchableOpacity onPress={() => pressMapHandler(menuId)}>
                <View style={{flexDirection:'row', alignContent:'center'}}>
                    {children}
                    <FontAwesome name="map-marker" size={18} color="#014d17" />
                    <Text style={styles.card_menu_text}>{menuText}/{menuId}</Text>
                    <FontAwesome5 name={iconType?'caret-up':'caret-right'} size={20} color="gray" style={styles.card_menu_down_icon} /> 
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default MapCard;

const styles = StyleSheet.create({
    card_menu_text:{

        flex:1,
        color:'black',
        marginHorizontal:5,
        fontWeight:'bold'
    },
    card_menu_view:{
        backgroundColor:'#fff',
        backgroundColor:'#d5dae3',
        borderRadius:10,
        borderColor:"#ccd4e6",
        borderWidth:2,
        paddingVertical:5,
        paddingHorizontal:10,
        marginHorizontal:10,
        marginVertical:10
    },
    card_menu_down_icon:{
        marginVertical:0,
        marginHorizontal:0,
        paddingBottom:0,
        
    },
    card_vw_cam:{
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        backgroundColor: '#fff',
        borderColor:'#dfdfdf',
        paddingHorizontal:10,
        paddingVertical:10,
        flexWrap:"wrap",
        flexDirection:"row"
    },
    card_cam_text:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'#3075db',
        fontSize:15
    }

})