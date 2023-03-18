import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Pressable} from 'react-native'
import { globalStyles } from "../style/globalstyle";
import RecordingBar from "./recordingBar";
import { AntDesign, FontAwesome, Ionicons, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatetTimePickerModal from 'react-native-modal-datetime-picker'
import { Picker } from "@react-native-picker/picker";

const ModalComponent = ({navigation, route})=>{
    const{selCam} = route.params;
    const [date, setDate] = useState((new Date()).toDateString());
    const[recdate, setRecdate] = useState(new Date());
    const[showDate, setShowDate] = useState(false);
    const platform = (Platform.OS == "ios")
    const[time, setTime] = useState(new Date());
    const[mode, setMode] = useState('date')
    const[showTime, setShowTime] = useState(false)
    const[recBarTime, setRecBarTime] = useState(null)
    
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

    const showDatePickerDate = ()=>{
        setShowTime(false)    
        setShowDate(true)

    }

    const hideDatePickerDate = ()=>{
        setShowDate(false)
        setShowTime(false)
    }

    const handleConfirmDate = (value)=>{
        console.log(value);
        var dt = new Date(value)
        setRecdate(value)
//        console.log(dt.toISOString());
            setDate(value.toDateString())
        
        setShowDate(false)
    }

    const showDatePickerTime = ()=>{
       // Alert.alert('showing time only')
       setShowDate(false)
        setShowTime(true)
    }

    const hideDatePickerTime = ()=>{
        setShowDate(false)
        setShowTime(false)
    }

    const handleConfirmTime = (value)=>{
        console.log(value.toTimeString())
        setTime(value)
        setRecBarTime(value);
        setShowTime(false)
    }


    const pressPlyRec = (startTime,endTime)=>{
        //Alert.alert('hello')
        console.log(startTime +":"+endTime)
    }

    const selRecTime = (selTime)=>{
        //Alert.alert(selTime)
        console.log('Sel rec time:' + selTime)
        setTime(selTime)
        let obj = new Date(selTime)
        //setDate(obj)
        console.log(obj.getHours())
      //  Alert.alert('play recording time')
    }

    const handlePlayPress = ()=>{
        console.log("play video for time: " + time + "-" + recdate)
        navigation.navigate('MapHome',{cam:selCam, recdt:recdate, rectime:time});
    }

    return(
        <View style={styles.modal_view}>
            <View style={{opacity:0.6,backgroundColor:'black', flex:1}}>
                
            </View>
            <View style={styles.modal_header}>
                <View style={{flex:1, flexDirection:'row', paddingVertical:20}}>
                    <View style={{flex:1}}>
                        <View style={{ flexDirection:'row', backgroundColor:'transparent', marginBottom:20, justifyContent:'center' }}>
                            <Entypo name="video-camera" size={18} color="gray" style={{alignSelf:'center'}} />
                            <Text style={{color:'#b7b7b7', fontSize:18, marginHorizontal:8}}>{route.params && selCam}</Text>
                            
                        </View>
                        <View style={{ flexDirection:'row'}}>
                            <View style={{ flexDirection:'row', flex:1, 
                                        backgroundColor:'transparent', alignItems:'center',
                                        
                                        justifyContent:'space-between'
                                        }}>
                                <View style={{flexDirection:'row'}}>            
                                    <Fontisto name="date" size={17} color="cyan" style={{}} />
                                    {/* <Text style={{color:'white', flex:0.70, marginHorizontal:10}}>{date.toDateString()}</Text> */}
                                    <TouchableOpacity style={{}} onPress={showDatePickerDate}>
                                        <Text style={{color:'white', marginHorizontal:10}}>{date}</Text>
                                    </TouchableOpacity>                                    
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Ionicons name="time-outline" size={18} color="cyan" style={{}} />
                                    <TouchableOpacity onPress={showDatePickerTime} style={{}}>
                                        <Text style={{color:'#fff', marginHorizontal:5}} >{time.toTimeString().substring(0,5)}</Text>
                                    </TouchableOpacity>
                                </View>        
                                <Pressable style={styles.circle_btn} onPress={handlePlayPress}>
                                    <View style={{flexDirection:'row',  alignItems:'center'}}>
                                        <Text style={[styles.play_btn]}>Play</Text>
                                        <MaterialIcons name="play-arrow" size={24} style={styles.icon_color} />
                                    </View>
                                </Pressable>

                            </View>
                        </View>

                    </View>
                </View>
                <TouchableOpacity onPress={pressCloseDialog}>
                    <Ionicons name="close" size={25} color="#fff" style={{marginHorizontal:0, marginVertical:5}} />
                </TouchableOpacity>
             </View>
             { date && <RecordingBar camId={selCam} recDate={recdate} recTime={recBarTime} pressPlyRec={pressPlyRec} selRecTime={selRecTime} /> } 
            
             
            <DatetTimePickerModal 
                isVisible = {showDate}
                mode='date'
                onConfirm = {handleConfirmDate}
                onCancel = {hideDatePickerDate}
                textColor="#4a4a4a"
            />

            <DatetTimePickerModal 
                isVisible = {showTime}
                mode='time'
                onConfirm = {handleConfirmTime}
                onCancel = {hideDatePickerTime}
                textColor="#4a4a4a"
                date={time}
            />
            
        </View>


    )
}

export default ModalComponent;

const styles = StyleSheet.create({
    modal_view:{
        flex:1,
        justifyContent:'flex-end',        
        backgroundColor:'transparent',
        opacity:1,

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
        paddingBottom:20

    },
    play_btn:{
        color:'yellow'
    },
    icon_color:{
        color:'#fac79d'
    },
    circle_btn:{
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:5,
        borderWidth:1,
        backgroundColor:'#303030',
        borderColor:'#454545'
    }
    
})