import React from "react";  
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const MapCard = ({children, menuText, pressMapHandler, iconType})=>{
    return(
        <View style={styles.card_menu_view}>
            <TouchableOpacity onPress={() => pressMapHandler(menuText)}>
                <View style={{flexDirection:'row'}}>
                    {children}
                    <Text style={styles.card_menu_text}>{menuText}</Text>
                    <FontAwesome5 name={iconType?'caret-up':'caret-down'} size={24} color="gray" style={styles.card_menu_down_icon} />
                </View>
            </TouchableOpacity>
            {
                iconType &&
            
                <View style={styles.card_vw_cam}>
                    <TouchableOpacity>
                        <Text style={styles.card_cam_text}>Camera 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.card_cam_text}>Camera 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.card_cam_text}>Camera 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.card_cam_text}>Camera 1</Text>
                    </TouchableOpacity>
                    
                </View>
            }
        </View>
    )
}

export default MapCard;

const styles = StyleSheet.create({
    card_menu_text:{
        marginVertical:0,
        marginHorizontal:10,
        fontSize:16,
        flex:1,
        paddingBottom:10
    },
    card_menu_view:{
        backgroundColor:'#dfdfdf',
        marginHorizontal:10,
        marginVertical:8,
        paddingTop:10,
        paddingHorizontal:0,
        borderRadius:10
    },
    card_menu_down_icon:{
        marginVertical:0,
        marginHorizontal:10,
        paddingBottom:10
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