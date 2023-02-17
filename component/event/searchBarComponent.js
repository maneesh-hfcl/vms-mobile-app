import React, { useState } from "react";
import { Text, View, StyleSheet,Alert, Modal, TouchableOpacity, Pressable } from "react-native";
import { globalStyles } from "../../style/globalstyle";
import {LnkBtnCard} from "../card/lnkBtnCard";
import EventTypeListComponent from "./eventTypeListComponent";
import { AntDesign, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import CloseIconComponent from "../closeIconComponent";
import TabSearchEvent from "../../navigation/tab/searchTab";

const EvtSearchBarComponent = ({navigation, pressLnkHandler, fltrEvnt,fltrCam})=>{
    return(
        <View>
            <View style={styles.srch_header}>
                {
                    (fltrEvnt.length == 0 && fltrCam.length == 0)?
                    (
                        <Text style={{flex:1, color:'#979797', marginHorizontal:10}}>Use right icon to filter data</Text>
                    ):(
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row'}}>
                                <LnkBtnCard pressLnkHandler={pressLnkHandler} 
                                    label={'Event(' + fltrEvnt.length+')'} 
                                    iconSize={15}
                                    iconName={'event-available'}
                                    iconColor={'#a9a9a9'}
                                    color={'#4d4d4d'}
                                    labelColor={'#ededed'}
                                >
                                    <Pressable onPress={() => Alert.alert('u pressed the button')}>
                                        <Entypo name="cross" size={15} color="white" />
                                    </Pressable>

                                </LnkBtnCard>
                                <LnkBtnCard pressLnkHandler={pressLnkHandler} 
                                    label={'Cam(' + fltrEvnt.length+')' } 
                                    iconSize={15}
                                    iconName={'photo-camera'}
                                    iconColor={'#a9a9a9'}
                                    color={'#4d4d4d'}
                                    labelColor={'#ededed'}
                                >
                                        <Pressable onPress={() => Alert.alert('u pressed the button')}>
                                        <Entypo name="cross" size={15} color="white" />
                                    </Pressable>
                                </LnkBtnCard>
                                <LnkBtnCard pressLnkHandler={pressLnkHandler} 
                                    label={'Date'} 
                                    iconSize={15}
                                    iconName={'date-range'}
                                    iconColor={'#a9a9a9'}
                                    color={'#4d4d4d'}
                                    labelColor={'#ededed'}
                                >
                                    <Pressable onPress={() => Alert.alert('u pressed the button')}>
                                        <Entypo name="cross" size={15} color="white" />
                                    </Pressable>
                                </LnkBtnCard>
                            </View>
                        </View>
                    )
                }

                {/* <LnkBtnCard label='Date'
                    pressLnkHandler={pressLnkHandler}
                iconName={'date-range'} iconSize={20} iconColor={'#505050'} />                
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Type' iconName={'event-available'} iconSize={20} iconColor={'#505050'} />
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Camera' iconName={'photo-camera'} iconSize={22} iconColor={'#505050'} /> */}
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Filter' 
                iconSize={20}
                iconName={'filter-list'}
                color={'#e7e7e7'}
                />
            </View>
        </View>
    )
}

export default EvtSearchBarComponent;

const styles = StyleSheet.create({
    srch_header:{
        flexDirection:'row',
        paddingHorizontal:0,
        paddingVertical:5,
        backgroundColor:'#f7f7f7',
        borderWidth:1,
        borderColor:'#d7d7d7',
        borderRadius:8,
        alignItems:'center',
        marginBottom:10
        
    }

})