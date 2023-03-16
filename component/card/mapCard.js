import React from "react";  
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const MapCard = ({children, menuText, menuId, pressMapHandler, iconType})=>{
    return(
        <View style={styles.card_menu_view}>
            <TouchableOpacity onPress={() => pressMapHandler(menuId)}>
                <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
                    {children}
                    
                    <FontAwesome name="map-marker" size={18} color="#014d17" 
                        style={{alignSelf:'center', paddingHorizontal:10}} />
                    
                    <View style={styles.card_menu_text}>
                    <Text style={{fontWeight:'bold', fontSize:13}}>{menuText}</Text>
                    </View>
                    {/* <FontAwesome5 name={iconType?'caret-up':'caret-right'} size={20} color="gray" style={styles.card_menu_down_icon} />  */}
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default MapCard;

const styles = StyleSheet.create({
    card_menu_text:{
        color:'black',
        marginHorizontal:0,
        fontWeight:'bold',
        marginVertical:0,
        fontSize:13,
        backgroundColor:'#fff',
        paddingVertical:10,
        paddingHorizontal:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,

justifyContent:'center'

    },
    card_menu_view:{

        backgroundColor:'#d7d7d7',
        borderRadius:10,
        borderColor:"#d7d7d7",
        borderWidth:1,
        marginHorizontal:10,
        paddingHorizontal:0,
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