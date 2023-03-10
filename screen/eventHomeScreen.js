import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, Alert, TouchableHighlight, ActivityIndicator } from "react-native";
import { LnkBtnCard } from "../component/card/lnkBtnCard";
import CloseIconComponent from "../component/closeIconComponent";
import EventDataComponent from "../component/event/eventDataComponent";
import EvtSearchBarComponent from "../component/event/searchBarComponent";
import LoadingDialogComponent from "../component/loadingDialogComponent";
import TabSearchEvent from "../navigation/tab/searchTab";
import { LoadApiData } from "../shared/fetchUrl";
import { globalStyles } from "../style/globalstyle";
import PlayVideo from "./camera/playVideo";

const EventHomeScreen = ({navigation, route})=>{
    const htmlPage = require("../assets/eventType.json")
    const[isModalVisible, setIsModalVisible] = useState(false)
    const[isLoadingVisible, setIsLoadingVisible] = useState(true)
    const[fltrEvnt, setFltrEvnt] = useState([])
    const[fltrCam, setFltrCam] = useState([])
    const[fltrSdt, setFltrSdt] = useState(null)
    const[fltrEdt, setFltrEdt] = useState(null)
    const[tempFltrEvnt, setTempFltrEvnt] = useState([]);
    const[tempFltrCam, setTempFltrCam] = useState([]); 
    const refModal = useRef(null);
    const eventJsonFile = require("../assets/eventType.json")
    const[isChecked, setIsChecked] = useState(false);
    const[eventLst, setEventLst] = useState([])
    const[camLst, setCamLst] = useState([])
    const[isFltrAppld, setIsFltrAppld] = useState(false)
    const[sortBy, setSortBy] = useState('')
    const[sortDir, setSortDir] = useState('')
    const[sortByName, setSortByName] = useState('Default')
    
    useEffect(()=>{
      //  tempFltrCam = []
      //  tempFltrEvnt = []
        //console.log(tempFltrEvnt)
        console.log("loading data")
        loadData();
        loadDataCam();
    },[])

    // useEffect(()=>{
    //     //  tempFltrCam = []
    //     //  tempFltrEvnt = []
    //       console.log('from filter sreen')
    //       setIsModalVisible(true)
    //   },[route.params?.filter])

    const loadData = ()=>{
        const jsonFile = eventJsonFile;
//        console.log(jsonFile.events[0].name)
        let jsonEvents = jsonFile.events;
        //let tempArr = [...jsonFile.events,{isChecked:false}]
        let tempArr =  jsonEvents.map(elem => {return {...elem, isChecked:false}})
        // tempArr = [{
        //     id : 0,
        //     name: 'All',
        //     devnm: 'All'
        // }, ...tempArr]
  //     console.log(tempArr)
       setEventLst(tempArr)
//        setIsLoading(false)
    }


    const loadDataCam= async ()=>{
        let jsonData = await LoadApiData("/devices")
//        console.log(jsonData);

        let initLst = jsonData.map(elem=>({
            id : elem.id,
            name: elem.devsym.trim(),
            devnm: elem.devnm.trim()
        })
        )
        let tempArr =  initLst.map(elem => {return {...elem, isChecked:false}})
        // initLst = [{
        //     id : 0,
        //     name: 'All',
        //     devnm: 'All'
        // }, ...initLst]
        setCamLst(tempArr);
//        setIsLoading(false)
    }

    const pressLnkHandler = (type)=>{
      //  setIsLoadingVisible(true)
     
        setIsModalVisible(true)
     //   setIsLoadingVisible(false)
        setFltrEvnt([])
     
//        setIsCompLoad(true)
      //  setTempFltrEvnt([])
      //  setTempFltrCam([])
    }

    const pressDialogClose = ()=>{
   //     alert('close')
        setIsModalVisible(false)
    }

    const pressChkboxItem = (type, elem, value)=>{
       // Alert.alert('You pressed the checkbox' + type)
       // console.log(elem.isChecked)
        if(type == 'event')
        {
           // fltrEvnt.push(elem.name)
           // setFltrEvnt(fltrEvnt)
           //console.log(value)
//           tempFltrEvnt.push({id:elem.id, name: elem.name})
           // tempFltrEvnt.push(elem.id)
          // let tempArr = tempFltrEvnt
            if(value){
               let tempArr = tempFltrEvnt.filter(x => x != elem.id)
                //tempFltrEvnt = tempArr;
//                tempFltrCam.push(temparr)
                setTempFltrEvnt(tempArr)
            }
            else{
                let tempArr = [...tempFltrEvnt, elem.id]
                setTempFltrEvnt(tempArr)
            }
          //  console.log(tempFltrEvnt)
            
        }
        else if(type == 'camera'){
            console.log('start')
            console.log(elem + "-" + value)
            console.log('end')
            if(value){
                let temparr = tempFltrCam.filter(x => x != elem)
                setTempFltrCam(temparr)

//                tempFltrCam.push(temparr)

            }
            else{
                let tempArr = [...tempFltrCam, elem]
                setTempFltrCam(tempArr)
            }
           // console.log(tempFltrCam)
            //setTempFltrCam(tempFltrCam)
        }
    //    console.log(tempFltrEvnt)

    }

    const pressLnkHandlerBtn = (type, elem)=>{
        setIsLoadingVisible(false)
        navigation.navigate('EventDetails',{type:type, elem:elem})
    }   

    const setHideLoadingVisible = (isVisible)=>{
        setIsLoadingVisible(isVisible)
    }

    const pressApplyFilter = ()=>{
        console.log(tempFltrCam)
       // setFltrEvnt(tempFltrEvnt)
       //let tempArr = maplst.map((item) => {
        //             return item.id == itmId ? { ...item, isSelect: (!item.isSelect),
        //                 camArr:loadCamArr(item.id)
                    
        //             } : item
        //         })
       let tempArr = eventLst.map((elem) => {
                        return elem.id == (tempFltrEvnt.find(item => item == elem.id)) ? {...elem, isChecked:true}:{...elem, isChecked:false}
                    })
        setEventLst(tempArr)

        let tempArrCam = camLst.map((elem) => {
            return elem.name == (tempFltrCam.find(item => item == elem.name)) ? {...elem, isChecked:true}:{...elem, isChecked:false}
        })
        setCamLst(tempArrCam)

        console.log("posting data to server")
        let tempFltrEvntPost = tempArr.filter(elem => elem.isChecked).map(elem => elem.id)
        // console.log(tempFltrEvntPost)
        setFltrEvnt(tempFltrEvntPost)

        let tempFltrCamPost = tempArrCam.filter(elem => elem.isChecked).map(elem => elem.name)
        // console.log(tempFltrCamPost);
        setFltrCam(tempFltrCamPost)
        setIsFltrAppld(true)
        pressDialogClose()
        setIsLoadingVisible(true)
    }

    const onComponentLoading = ()=>{
     // Alert.alert("Loading component");
      //setIsModalVisible(true);
    }

    const pressSortHandler = (sortby, dir, name)=>{
        console.log("sort by: " + sortby+"/"+dir+"/"+name);
        setIsLoadingVisible(true)
        setSortBy(sortby)
        setSortDir(dir)
        setSortByName(name);
        
        

    }

    const pressLnkRemHandler = ()=>{
        setFltrEvnt([])
        setFltrCam([])
        
        let tempArr = eventLst.map((elem) => {
            return {...elem, isChecked:false}
        })
        setEventLst(tempArr)

        let tempArrCam = camLst.map((elem) => {
            return {...elem, isChecked:false}
        })
        setCamLst(tempArrCam)

//        console.log(tempArr)
        setTempFltrEvnt([])
        setTempFltrCam([])
        setIsFltrAppld(false)
        setIsLoadingVisible(true)
    }

    return(
        <View style={[globalStyles.container_main,{backgroundColor:'#fff',flex:1}]}>
            <View style={{marginHorizontal:10, marginBottom:10}}>
                <EvtSearchBarComponent navigation={navigation}
                    eventLst={eventLst} camLst={camLst}
                  pressLnkHandler={pressLnkHandler} 
                 pressSortLnkHandler={pressSortHandler}
                 sortByName={sortByName}
                 isFltrAppld={isFltrAppld}
                 pressLnkRemHandler={pressLnkRemHandler}
                 />
            </View>
            <View style={{flex:1}}>
            <EventDataComponent pressLnkHandler={pressLnkHandlerBtn} fltrEvnt={fltrEvnt} fltrCam={fltrCam}
                setHideLoadingVisible={setHideLoadingVisible} sortBy={sortBy} sortDir={sortDir} />
            </View>
            <LoadingDialogComponent isVisible={isLoadingVisible} />
           
            {
             //   isModalVisible &&
                <Modal animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                >
                    
                    <Pressable style={{flex:0.5, backgroundColor:'#fff', opacity:0.7}} onPress={pressDialogClose}>
 
                    </Pressable>
                    <View style={[styles.modal_dialog,{backgroundColor:'#fff', paddingBottom:50}]}>


                        <TabSearchEvent eventLst={eventLst} 
                            camLst={camLst} onComponentLoading = {onComponentLoading}
                         pressChkboxItem={pressChkboxItem} />

                    <TouchableOpacity 
                        onPress={pressApplyFilter}
                        style={[globalStyles.form_btn, {
                         marginHorizontal:10
                        }]}>
                            <Text style={[globalStyles.text_btn,{padding:3}]}>Apply filter</Text>
                        </TouchableOpacity>
                        </View>
                </Modal> 
            }

        </View>

    )
}

export default EventHomeScreen;

const styles = StyleSheet.create({
    modal_dialog:{
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
          backgroundColor:'#fff',
            flex:1,
     //   borderTopRightRadius:10,
  
        borderWidth:1,
        borderColor:"#d7d7d7",
        paddingHorizontal:10,
        paddingVertical:10,
        
    }
})