import React,{useState, useEffect, useRef} from "react";
import {View, Text, StyleSheet, ScrollView, Alert, Button, TouchableOpacity} from 'react-native'
import { globalStyles } from "../style/globalstyle";
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LoadApiData } from "../shared/fetchUrl";
import ActivityIndicatorComponent from "./activityIndicatorComponent";

import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { RectButton } from "react-native-gesture-handler";

export default function RecordingBar({camId, recDate, pressPlyRec, selRecTime, recTime}){
    const initialState = 24;
    const extraScale = 2
    const barWidth = 150
    const sliderScrollview = useRef(null);
    const[leftPos, setLeftPos] = useState(0)
    const[vwWidth, setvwWidth] = useState(0)
    const[centerPos, setCenterPos] = useState(0)


    const initialRecrdArr =[
        {
            starTime:'4:00',
            endTime:'8:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'9:00',
            endTime:'11:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'12:00',
            endTime:'14:00',
            duration: 4.5,
            startX:0,
            endX:0
        },
        {
            starTime:'15:00',
            endTime:'23:00',
            duration: 4.5,
            startX:0,
            endX:0
        }
    ]
    const[totBar, setTotBar] = useState(initialState);
    const[totBarRecrdng, setTotBarRecrdng] = useState(2);
    const[recrdArr, setRecrdArr] = useState([]);
    const[isLoading, setIsLoading] = useState(true)
    const[selectedPickerVal, setSelectedPickerVal] = useState(1)

    const pickerRef = useRef();
    const extrArr = [1,1]


    useEffect(()=>{
        //alert('You have called this function on screen load');
        //calcXYPos();
        console.log("Loading recordings")
        loadRecordings();
    },[])

    useEffect(()=>{
        //alert('You have called this function on screen load');
        //calcXYPos();
        //loadRecordings();
        console.log('calling use effect')
        if(recrdArr.length > 0){
            calcXYPos(recrdArr);
//            let extraLen = 
            
                sliderScrollview.current?.scrollTo({x: 0})
        }
        console.log('recTime: ' + recTime)
        recTime = null
        console.log('End of recTime: ' + recTime)
    },[totBar])

    useEffect(()=>{
        //alert('You have called this function on screen load');
        //calcXYPos();
        //loadRecordings();
        console.log('calling use effect rec time')
        let width = recTime != undefined ? calcX(recTime?.toTimeString().substring(0,5)):-1
        if(width > -1)
            sliderScrollview.current?.scrollTo({x: width })
        //console.log('recTime: ' + recTime?.toTimeString().substring(0,5))

    },[recTime])



    const loadRecordings = async() =>{
       // Alert.alert(camId)
        console.log(`cameraId: ${camId}`);
        console.log(`date: ${recDate}}`)

        try {
           // console.log(mapid);
            camId = 'item_hap'
            recDate = '2023-02-08'
            jsondata = await LoadApiData(`/GetCamRecordings/${camId}/${recDate}`)
           //console.log(jsondata.timings);
           
            let initLst = jsondata.timings.map((elem) =>({
                    starTime:elem.tmb,
                    endTime:elem.tme,
                    duration: 4.5,
                    startX:0,
                    endX:0
                })
            );//.filter( elem => elem.parentId == mapid)
     //       console.log(initLst);
           // setRecrdArr(initLst)
//            return json.movies;
          //  setIsLoading(false)
            calcXYPos(initLst)

         //   console.log(sliderScrollview.current)
          } catch (error) {
            console.error(error);
          }
    }

    const calcXYPos = (recrdArr) =>{
       // console.log(r)
        let tempArr = recrdArr.map((elem) =>
            {
                return {...elem, startX:calcX(elem.starTime), endX:calcX(elem.endTime)}
            }
        );

//        console.log(tempArr);
        setRecrdArr(tempArr);
        setIsLoading(false)
    }

    const calcX = (timeVal) =>{
     //   console.log('Timeval:' + timeVal)
//        console.log(timeVal)
        let secondsInVal = calcSeconds(timeVal);
        let width = barWidth;
        let rangeEachWidth = 24/totBar
        let totWidth = width*totBar;
        let totSecondsInDay = 24*60*60;
        let startX = secondsInVal*totWidth/totSecondsInDay;
      //  console.log(secondsInVal + '::' + totWidth + '::' + startX +'::' + totSecondsInDay);
     // console.log(extrArr.length * 150, startX);
        let extraLen = extrArr.length * barWidth
        return (startX + extraLen);
    }

    const calcSeconds = (timeVal) =>{
        let splitTime = timeVal.split(':');
        if(splitTime.length == 2)
        {
            return splitTime[0]*60*60 + splitTime[1]*60
        }
        else
            return splitTime[0]*60*60 + splitTime[1]*60 + splitTime[2]*1
    }

    const onChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        //alert("onchange called");
        setShowDate(false);
//        alert(showDate);
    }

    function open() {
        pickerRef.current.focus();
      }
      
      function close() {
        pickerRef.current.blur();
      }
    
    const selPickerValue = (itemValue)=>{
       // setSelectedPickerVal(itemValue)
        setTotBar(24/itemValue)
    }

    const reCalcBar = (value)=>{
        setTotBar(24/value)
        console.log(`Width of view: ${vwWidth}`)
    }

    const GetScrollPos = ()=>{
        let scrollElem = sliderScrollview?.current;
        if(scrollElem)
        {
            const{x, y, animated} = scrollElem.contentOffset
            console.log()
        }
    }

    const onScrollView = (event)=>{
        
  //      console.log(sliderScrollview.current.width)
//        console.log(sliderScrollview.current.nativeEvent.layout);
    }

    const onScrollViewEnd = (event)=>{
       // if(recTime != null){ recTime = null; return};
        const{x,y} = event.nativeEvent.contentOffset
  //      console.log(vwWidth);
  //      console.log(extrArr.length)
        console.log('scrollviewend')
        var dt = new Date();
        if(centerPos+x > barWidth*extrArr.length)
        {
            let getTotSeconds = getTimePosScroll(centerPos + x - (barWidth*extrArr.length - 2));
            let hours = Math.floor( getTotSeconds/3600)
            let minutes = Math.floor((getTotSeconds-(hours*60*60))/60)
            let seconds = getTotSeconds - ((minutes*60) + (hours*60*60))
            dt.setHours(hours);
            dt.setMinutes(minutes);
            dt.setSeconds(seconds);
   //         console.log(centerPos, centerPos + x, getTimePosScroll(centerPos + x - barWidth*extrArr.length ) )
   //         console.log(dt.toString())
        }
            selRecTime(dt)
    }

    const getTimePosScroll = (elemX)=>{
        let width = barWidth;
        let totWidth = width*totBar;
        console.log(`totWidth: ${totWidth}`);
        let totSecondsInDay = 24*60*60;
        let secondsInVal = elemX*totSecondsInDay/totWidth 
        return secondsInVal
    }

    const getScrollVwLayout = (event)=>{
        const {height, width, x, y} = event.nativeEvent.layout;
        setvwWidth(width);
        setCenterPos(Math.floor(width/2))
    }

    return(
        <View style={{ paddingHorizontal:0, paddingBottom:8,backgroundColor:'black',}}>
        {isLoading?
            <View style={{marginVertical:20}}>
                <ActivityIndicatorComponent />
            </View>
            :(
                <View>
                <ScrollView onLayout={getScrollVwLayout} 
                    onScrollBeginDrag={onScrollView} 
                    onScrollEndDrag={onScrollViewEnd}
                    onMomentumScrollEnd={onScrollViewEnd}
                horizontal={true}  ref={sliderScrollview} 
                 style={{ backgroundColor:'', paddingBottom:5,}}>
                <View style={{backgroundColor:'black', marginHorizontal:0}}>
                    <View style={{flexDirection:'row', marginTop:2}}>

                        {
                            extrArr.map((value, indx) =>
                                <View style={[styles.vwBarScale]} key={indx}>
                                </View>                            
                            )
                        }


                        {
                        [...Array(totBar)].map((value, indx) =>
    
                            <View style={[styles.vwBarScale,(indx == 0)?styles.borderLeftOnly:'']} key={indx}>
                                <Text style={styles.vwBarScaleText}>{indx*(24/totBar)}</Text>
                                {
                                    (indx == totBar-1)?(
                                        <Text style={[styles.vwBarScaleText,{right:0, position:'absolute'}]}>{(indx+1)*(24/totBar)}</Text>
                                    ):(
                                        <Text></Text>
                                    )
                                }
                            </View>    
                        )
    
                    }
                    {
                        extrArr.map((value, indx) =>
                            <View style={[styles.vwBarScale,styles]} key={indx}>
                            </View>                            
                        )
                    }
                        
                    </View>

                    <View style={{flexDirection:'row'}}>

                        {
                            extrArr.map((value, indx) =>
                            <View style={[styles.vwBar,
                                {backgroundColor:'#404040'}]} key={indx}>
                            </View>                           
                            )
                        }


                   
                    {

                        
                        [...Array(totBar)].map((value, indx) =>
                            <View style={[styles.vwBar,(indx == 0)?styles.borderLeftOnly:'',
                            {backgroundColor:'#404040'}
                            ]} key={indx}>

                            </View>    
                        )
    
                    }

                        {
                            extrArr.map((value, indx) =>
                            <View style={[styles.vwBar,
                                {backgroundColor:'#404040'}]} key={indx}>
                            </View>                           
                            )
                        }

                    
                    </View>
    
                    {recrdArr.length > 0 && 
                    <View style={{flex:1, position:'absolute', top:22, zIndex:1, backgroundColor:'black'}}>
                    {
    
                        // <View style={[styles.vwRecordingBar,{width:200, left:200}]}>
                        // </View>
                         recrdArr.map((item, indx) =>
                                 <View key={indx}
                                    style={[styles.vwRecordingBar,{left:item.startX, width:(item.endX - item.startX)}]} 
                                    
                                    >
                                </View>

                                )
                        
                        }
                    </View>
                    }

                    

                </View>
    
            </ScrollView>
                    
                    <View style={{
                        position:'absolute',
                        left:'50%',
                        backgroundColor:'#f57fd8',
                        height:'100%',
                        width:1

                    }}>
                        
                    </View>
            </View>
            )
        }    

         {!isLoading  &&   
            <View style={styles.modal_footer}>
            
                <Text style={{color:'gray', fontSize:12}}>Show records in interval (hours){24/totBar}</Text>
                <View style={{flexDirection:'row', marginVertical:10}}>
                    <TouchableOpacity onPress={()=> reCalcBar(1)}>
                        <View style={(24/totBar == 1)? [styles.lnk_interval_sel_vw, styles.lnk_interval_vw]:[styles.lnk_interval_vw]}>
                            <Text style={(24/totBar == 1)? [styles.lnk_interval, styles.lnk_interval_sel]:[styles.lnk_interval]}>1</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => reCalcBar(2)}>
                        <View style={(24/totBar == 2)? [styles.lnk_interval_sel_vw, styles.lnk_interval_vw]:[styles.lnk_interval_vw]}>
                            <Text style={(24/totBar == 2)? [styles.lnk_interval, styles.lnk_interval_sel]:[styles.lnk_interval]}>2</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => reCalcBar(3)}>
                        <View style={(24/totBar == 3)? [styles.lnk_interval_sel_vw, styles.lnk_interval_vw]:[styles.lnk_interval_vw]}>
                            <Text style={(24/totBar == 3)? [styles.lnk_interval, styles.lnk_interval_sel]:[styles.lnk_interval]}>3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => reCalcBar(4)}>
                        <View style={(24/totBar == 4)? [styles.lnk_interval_sel_vw, styles.lnk_interval_vw]:[styles.lnk_interval_vw]}>
                            <Text style={(24/totBar == 4)? [styles.lnk_interval, styles.lnk_interval_sel]:[styles.lnk_interval]}>4</Text>
                        </View>
                    </TouchableOpacity>
                </View>

 
            </View>

            }
    </View>
    )
}

const styles = StyleSheet.create({
    vwBar:{
        borderStyle:'solid',
        
        borderColor:'gray',
        height:10,
        color:'#eee',
        width:150,
        borderRightWidth:1,
        borderBottomWidth:1,
        backgroundColor:'#454545',
        borderWidth:0,
        
    },
    vwBarScale:{
        borderStyle:'solid',
        backgroundColor:'transparent',
        borderColor:'gray',
        borderWidth:1,
        height:20,
        color:'#eee',
        width:150,
        borderLeftWidth:0

    },
    vwBarScaleText:{
        marginHorizontal:5, 
        color:'gray',
        fontSize:12,
        fontWeight:'bold'
    },
    card:{
        width:100,
        margin:10,
        borderWidth:1
    },
    borderLeftOnly:{
      //  borderLeftWidth:1,
    },
    vwRecordingBar:{
        borderStyle:'solid',
        position:'absolute',      
        borderColor:'#e9e9e9',
        height:8,
            color:'red',
  
        backgroundColor:'#5ff700',
        
        
    },
    modal_footer:{
        backgroundColor:'#000',
        alignItems:'center',
        paddingVertical:5,
        paddingBottom:20

    },
    lnk_interval:{
        color:'#8dccf7',
        
        textAlign:'center',
        marginHorizontal:2,
        marginVertical:1,
        fontSize:13,
        width:16
        
    },
    lnk_interval_sel:{
        color:'black',
        
    },
    lnk_interval_sel_vw:{
        backgroundColor:'#8dccf7',
  
    },
    lnk_interval_vw:{
        borderRadius:16,
        borderColor:'#8dccf7',
        borderWidth:1,
        marginHorizontal:10,
        padding:2,
        
    }

})