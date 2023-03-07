import React, { useState } from "react";
import { Text, View, StyleSheet,Alert, Modal, TouchableOpacity, Pressable } from "react-native";
import { globalStyles } from "../../style/globalstyle";
import {LnkBtnCard} from "../card/lnkBtnCard";
import EventTypeListComponent from "./eventTypeListComponent";
import { AntDesign, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import CloseIconComponent from "../closeIconComponent";
import TabSearchEvent from "../../navigation/tab/searchTab";
import { RadioButton } from "react-native-paper";

const EvtSearchBarComponent = ({navigation, pressLnkHandler, pressLnkRemHandler, fltrEvnt,fltrCam, pressSortLnkHandler, sortByName, isFltrAppld})=>{
    const[isModalVisible, setIsModalVisible] = useState(false)
    const[isChecked, setIsChecked] = useState(sortByName)

    const pressOpenSortLnkHandler = (type)=>{
        setIsModalVisible(true)
    }
    const pressDialogClose = ()=>{
        setIsModalVisible(false)
    }
    const pressSortHandler = (sortname, dir, name)=>{
       // console.log(sortname, dir)
        pressDialogClose()
        pressSortLnkHandler(sortname, dir, name)
    }

    return(
        <View>
            <View style={styles.srch_header}>
              
                <View style={{}}>
                    
                    { isFltrAppld && 
                        <LnkBtnCard pressLnkHandler={pressLnkRemHandler}
                            iconName={'highlight-remove'}
                            iconSize={18}
                            iconColor={'#ad8db3'}
                            label={"Remove filter"}
                            color={'#e7e7e7'}

                        />

                    }

                </View>
                <View style={{flex:1}}></View>
                
                <LnkBtnCard pressLnkHandler={pressLnkHandler} label='Filter' 
                iconSize={18}
                iconName={'filter-list'}
                color={'#e7e7e7'}
                iconColor={'#505050'}
                />

                <LnkBtnCard pressLnkHandler={pressOpenSortLnkHandler} label='Sort by' 
                iconSize={18}
                iconName={'sort-by-alpha'}
                iconColor={'#505050'}
                color={'#e7e7e7'}
                />
                


                {/* <Pressable onPress={() =>{ navigation.navigate("EventHome",{filter:Math.random()*100})}}>
                    <Text>calling event screen</Text>
                </Pressable> */}

            </View>
            {
                <Modal
                    transparent

                    animationType="slide"
                    visible={isModalVisible}
                >
                    <Pressable style={{flex:1, backgroundColor:'#fff', opacity:0.8}} onPress={pressDialogClose}>
                    </Pressable>
                    <View style={[styles.modal_dialog,{backgroundColor:'#fff', paddingBottom:50}]}>
                        <View style={{
                                borderBottomWidth:1, borderBottomColor:"#e7e7e7"
                                , alignItems:'center', marginBottom:20,
                                backgroundColor:'#f7f7f7'}}>
                            <Text style={{
                                marginVertical:10,
                                marginHorizontal:10,
                                color:'#303030', fontWeight:'bold',
                                
                            }}>Sort by</Text>
                        </View>
                        <Pressable onPress={() => pressSortHandler('','','Default')} style={[styles.sort_element]}>
                            <Text style={[globalStyles.text_sort,{flex:1}]}>Default</Text>
                            <RadioButton color="#04cf37"
                            value="Default"
                            status={sortByName === "Default"?'checked':'unchecked'}
                            
                        />

                        </Pressable>
                                            
                        <Pressable onPress={() => pressSortHandler('event','asc', 'Event name - [Asc]')} style={[styles.sort_element]}>
                            <Text style={[globalStyles.text_sort,{flex:1}]}>Event name - [Asc]</Text>
                            <RadioButton color="#04cf37"
                            value="Event name - [Asc]"
                            status={sortByName === "Event name - [Asc]"?'checked':'unchecked'}
                             />
                        </Pressable>
                        <Pressable onPress={() => pressSortHandler('event','desc','Event name - [Desc]')} style={[styles.sort_element]}>
                            <Text style={[globalStyles.text_sort,{flex:1}]}>Event name - [Desc]</Text>
                            <RadioButton color="#04cf37"
                            value="Event name - [Desc]"
                            status={sortByName === "Event name - [Desc]"?'checked':'unchecked'}
                            />
                        </Pressable>
                        
                        <Pressable onPress={() => pressSortHandler('camera','asc', 'Camera name - [Asc]')} style={[styles.sort_element]}>
                            <Text style={[globalStyles.text_sort,{flex:1}]}>Camera name - [Asc]</Text>
                            <RadioButton color="#04cf37"
                            value="Camera name - [Asc]"
                            status={sortByName === "Camera name - [Asc]"?'checked':'unchecked'}
                             />
                        </Pressable>
                        <Pressable onPress={() => pressSortHandler('camera','desc','Camera name - [Desc]')} style={[styles.sort_element]}>
                        <Text style={[globalStyles.text_sort,{flex:1}]}>Camera name - [Desc]</Text>
                            <RadioButton color="#04cf37"
                            value="Camera name - [Desc]"
                            status={sortByName === "Camera name - [Desc]"?'checked':'unchecked'}
                             />
                        </Pressable>
                        <Pressable onPress={() => pressSortHandler('date','asc', 'Date - [Asc]')} style={[styles.sort_element]}>
                        <Text style={[globalStyles.text_sort,{flex:1}]}>Date - [Asc]</Text>
                            <RadioButton color="#04cf37"
                            value="Date - [Asc]"
                            status={sortByName === "Date - [Asc]"?'checked':'unchecked'}
                            />
                        </Pressable>
                        <Pressable onPress={() => pressSortHandler('date','desc', 'Date - [Desc]')} style={[styles.sort_element]}>
                            <Text style={[globalStyles.text_sort,{flex:1}]}>Date - [Desc]</Text>
                            <RadioButton color="#04cf37"
                            value="Date - [Desc]"
                            status={sortByName === "Date - [Desc]"?'checked':'unchecked'}
                            onPress={()=> setIsChecked('Date - [Desc]') } />
                        </Pressable>

                    </View>
                </Modal>
            }
        </View>
    )
}

export default EvtSearchBarComponent;

const styles = StyleSheet.create({
    srch_header:{
        flexDirection:'row',
        paddingHorizontal:0,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#d7d7d7',
        borderRadius:8,
        alignItems:'center',
        marginBottom:10
        
    },
    modal_dialog:{

        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,
       borderWidth:1,
      borderColor:"#d7d7d7",
      paddingHorizontal:0,
      paddingVertical:0,
      
  },
  sort_element:{
    flexDirection:'row',
    marginHorizontal:0,

    borderBottomWidth:0,

    borderColor:'#e7e7e7',
    backgroundColor:'#fff',
    padding:0,
    paddingHorizontal:20,
    borderRadius:0,
    alignItems:'center',
    marginHorizontal:20
  }

})