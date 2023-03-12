import React from "react";
import {View, Text, StyleSheet} from 'react-native'

const ItemRowTemplateComponent = ({title, content})=>{
    return(
            <View style={styles.modal_item_vw}>
                <View style={styles.text_left_vw}>
                    <Text style={styles.text_left}>{title}</Text>
                </View>
                <Text style={styles.text_right}>{content}</Text>
            </View>
    )
}

export default ItemRowTemplateComponent;

const styles = StyleSheet.create({
  
    modal_item_vw:{
        flexDirection:'row', 
        backgroundColor:'#f1f1f1',
        justifyContent:'center',
        marginVertical:0.5,


    },
    text_left_vw:{
        borderRightWidth:1,
        borderRightColor:'#fff',
        flex:0.4,
        alignItems:'flex-end'
    },
    text_left:{
        marginHorizontal:10,
        marginVertical:5,
        fontSize:15,
        color:'#202020'
    },
    text_right:{
        flex:0.6,
        paddingLeft:10,
        backgroundColor:'#e7e7e7',
        paddingTop:5,
        fontSize:15
    }
})