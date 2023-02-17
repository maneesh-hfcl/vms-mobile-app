import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FormOuterCard from "./form/outerCard";
import TextCard from "./form/textCard";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LnkBtnCard } from "./lnkBtnCard";

const ItemEventTemplate = ({elem, pressLnkHandler})=>{
    const ConverToDate = (date)=>{
        let dt = new Date(date)
        return dt.getMonth() + "/" + dt.getDay() + "/" + dt.getFullYear() 
                + " "+ dt.getHours()+":"+ dt.getMinutes()+":"+ dt.getSeconds()
    }

    return(
        <View style={styles.itemOuter_vw}>
            <View style={{flexDirection:'row'}}>
                <View style={{ width:'46%'}}>
                    <View style={{flexDirection:'row', marginVertical:3}}>
                        <MaterialIcons name={'date-range'} size={18} color={'#808080'} />
                        <Text style={[styles.itemText, {flex:1}]}>{ConverToDate(elem.evtime)}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginVertical:3}}>
                        <MaterialIcons name={'photo-camera'} size={18} color={'#808080'} />
                        <Text style={[styles.itemText, {flex:1}]}>{elem.objids}</Text>
                    </View>
                </View>
                <View style={{width:'54%'}}>
                    <View style={{ flexDirection:'row', marginVertical:3}}>
                        <MaterialIcons style={{}}  name={'event-available'} size={18} color={'#808080'} />
                        <Text style={[styles.itemText,{flex:1}]}>Fallen person detection</Text>
                    </View>
                    <View style={{marginVertical:3, flexDirection:'row', justifyContent:'flex-end'}}>
                        <LnkBtnCard iconName={'add'} 
                        iconColor={'#395fb3'}
                        color={'#fff'}
                        labelColor={'#395fb3'}
                         iconSize={20}
                         
                         label='Details' pressLnkHandler={() => pressLnkHandler('details', elem)} />
                        <LnkBtnCard iconName={'play-arrow'} iconColor={'green'} color='#fff'
                            labelColor={'green'}
                        iconSize={20} label='Play' pressLnkHandler={() => pressLnkHandler('play', elem)} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemEventTemplate;

const styles = StyleSheet.create({
    itemOuter_vw : {

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:'#e9e9e9',
        borderWidth:2,
        backgroundColor:'#fff',
        
    },
    itemText:{
        marginHorizontal:10,
        flex:0.3
    }
})