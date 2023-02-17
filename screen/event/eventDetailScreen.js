import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";  
import ItemRowTemplateComponent from "../../component/card/itemRowTemplate";
import { LoadApiData } from "../../shared/fetchUrl";
import { globalStyles } from "../../style/globalstyle";
import Config from '../../configuration/config'
import { Video } from "expo-av";

const EventDetailScreen = ({navigation, route})=>{
    const{type, elem} = route.params;
    const[itmDetail,setItmDetail] = useState(null)

    useEffect(()=>{
        loadData()
    },[])

    const loadData = async ()=>{
        let jsonData = await LoadApiData("/evtd/35148")
        console.log(jsonData)
    }

    const pressDialogClose = ()=>{
        navigation.goBack();
    }

    return(
        <View style={{flex:1,backgroundColor:'transparent'}}>
            
            <Pressable style={{height:200,backgroundColor:'#fff', opacity:0.8}} onPress={pressDialogClose}> 
            </Pressable>

            <View style={[styles.modal_dialog,{}]}>
                <View style={{alignItems:'center',marginTop:20, flex:1,
                shadowOffset:{width:3, height:3},
                shadowOpacity: 0.4,
                shadowRadius: 5,
                shadowColor:'#000'
            }}>
                { type=='details'?(
                    <Image 
                        style={styles.image}
                        source={{ uri: Config.ApiUrl +'/image/7b3baad1-38b0-4969-a42e-ff0c4dca2db2.jpg'}}
                    />
                )
                
                :(
                    <Video
                    source={{ uri: Config.ApiUrl +'/video/test2.mp4' }}
                    style={styles.image}
                    useNativeControls
                    isLooping
                    shouldPlay
                      />
                )
                }
        
                </View>
                <View>
                    <ItemRowTemplateComponent title={'Id'} content={elem.id} />
                    <ItemRowTemplateComponent title={'Time'} content={elem.evtime} />
                    <ItemRowTemplateComponent title={'Name'} content={elem.evtype} />
                    <ItemRowTemplateComponent title={'Camera'} content={elem.objids} />
                </View>
            </View>

        </View>
    )
}

 export default EventDetailScreen;

const styles = StyleSheet.create({
    modal_dialog:{
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,

      borderWidth:1,
      borderColor:"#c7c7c7",
      paddingHorizontal:10,
      paddingVertical:10,
      
    },
    modal_item_vw:{
        flexDirection:'row', 
        backgroundColor:'#e7e7e7',
        justifyContent:'center',
        marginVertical:1,

    },
    text_left_vw:{
        borderRightWidth:2,
        borderRightColor:'#fff',
        flex:0.4,
        alignItems:'flex-end'
    },
    text_left:{
        marginHorizontal:10,
        marginVertical:5
    },
    text_right:{
        flex:0.6,
        paddingLeft:10,
        backgroundColor:'#d7d7d7',
        paddingTop:5,
    },
    image:{
        width:'90%', 
        height:'90%', 
        

    }
})