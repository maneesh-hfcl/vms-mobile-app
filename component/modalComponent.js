import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native'
import { globalStyles } from "../style/globalstyle";
import RecordingBar from "./recordingBar";
import { AntDesign, FontAwesome, Ionicons, Entypo, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const ModalComponent = ({navigation, route})=>{
    const{selCam} = route.params;
    const [date, setDate] = useState(new Date(1598051730000));
    const[showDate, setShowDate] = useState(false);
    const platform = (Platform.OS == "ios")
    
    const pressCloseDialog = ()=>{
                navigation.pop();
            }

    const onChange = (event, value) =>{
        
        //const currentDate = selectedDate || date;
        setDate(value);
        console.log(value);
        
        //alert("onchange called");
//        setShowDate(false);
//        alert(showDate);
    }

    const pressHandlerShowdate = ()=>{
        setShowDate(true)
    }

    return(
        <View style={styles.modal_view}>
            <View style={styles.modal_header}>
                <View style={{flex:1, flexDirection:'row', paddingVertical:20}}>
                    <View style={{flex:1}}>
                        <View style={{flex:0, flexDirection:'row', backgroundColor:'transparent', marginBottom:10 }}>
                            <Entypo name="video-camera" size={16} color="gray" />
                            <Text style={{color:'#fff', marginHorizontal:8}}>{route.params && selCam}</Text>
                            
                        </View>
                        <View style={{ flexDirection:'row', backgroundColor:'transparent'}}>
                            <View style={{ flexDirection:'row', flex:1, backgroundColor:'transparent'}}>
                                <Fontisto name="date" size={15} color="cyan" style={{}} />
                                <Text style={{color:'white', flex:0.70, marginHorizontal:10}}>{date.toDateString()}</Text>
                                <TouchableOpacity onPress={pressHandlerShowdate}>
                                    <Text style={{color:'white', flex:0.70, marginHorizontal:10}}>{date.length > 0 ? date:'Select date'}</Text>
                                 </TouchableOpacity>                                    
                               
                                <Ionicons name="time-outline" size={18} color="cyan" />
                                <Text style={{color:'#fff', marginHorizontal:10}} >{route.params && selCam}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <TouchableOpacity onPress={pressCloseDialog}>
                    <Ionicons name="close" size={25} color="#fff" style={{marginHorizontal:0, marginVertical:5}} />
                </TouchableOpacity>
            </View>
            <RecordingBar />
            <View style={styles.modal_footer}>
                <Text style={{color:'#dedede', fontSize:12}}>Recording is shown in hours{Platform.OS}</Text>
                
            </View>


            { showDate && platform &&

                <View style={{
                    position:"absolute",
                    alignSelf:'center',
                    shadowColor: 'gray',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity:0.5,
                    shadowRadius: 15,
                    backgroundColor:'white',
                    borderRadius:15,
                    paddingHorizontal:10,
                    
                    paddingVertical:10
                }}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                onChange={onChange}
                                textColor={'black'}
                                display={"spinner"}
                                style={{
                                    fontSize:11,
                                }}
                            />
                        <TouchableOpacity style={globalStyles.touchable_btn} onPress={()=>setShowDate(false)}>
                            <Text style={globalStyles.text_btn}>Ok</Text>
                        </TouchableOpacity>
                </View>
                
            }

        </View>


    )
}

export default ModalComponent;

const styles = StyleSheet.create({
    modal_view:{
        flex:1,
        justifyContent:'center',        
        backgroundColor:'transparent',
                
    },
    modal_header:{
        backgroundColor:'#000',
        borderTopWidth:1,
        flexDirection:'row',
        paddingHorizontal:10
    },
    modal_footer:{
        backgroundColor:'#000',
        alignItems:'center',
        paddingVertical:5,
        paddingBottom:10

    }
    
})