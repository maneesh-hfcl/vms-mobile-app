import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, ActivityIndicator} from "react-native";  
import ItemRowTemplateComponent from "../../component/card/itemRowTemplate";
import { LoadApiData } from "../../shared/fetchUrl";
import { globalStyles } from "../../style/globalstyle";
import Config from '../../configuration/config'
import { Video } from "expo-av";
import PlayVideo from "../../screen/camera/playVideo";

const loadingIcon = require('../../assets/icons/loading.gif')


const EventDetailScreen = ({navigation, route})=>{
    const{type, elem} = route.params;
    const[itmDetail,setItmDetail] = useState(null)
    const[isImgLoading, setIsImgLoading] = useState(true)
    const[playrec, setPlayrec] = useState("")

    useEffect(()=>{
        console.log("event detail per event");
        console.log(elem);
        loadData()
    },[])

    const loadData = async ()=>{
        let jsonData = await LoadApiData("/recvideo/"+elem.id+"/"+elem.objids);
        setPlayrec(jsonData);
        console.log(jsonData);
    }

    const pressDialogClose = ()=>{
        navigation.goBack();
    }

    return(
        <View style={{flex:1,backgroundColor:'transparent'}}>
            
            <Pressable style={{height:'100%',
                backgroundColor:'#000',
                
                
                opacity:0.3}} onPress={pressDialogClose}> 
            </Pressable>

            <View style={[styles.modal_dialog,{
                position:'absolute',
                flex:1,
                bottom:0,
                width:'100%',
                height:'80%',
                justifyContent:'center',
                alignContent:'center',

            }]}>
                <View style={{alignItems:'center',marginVertical:20,
                shadowOffset:{width:3, height:3},
                flex:1,

            }}>
                { type=='details'?(
                    <View style={{width:'100%', height:'100%'}}>

                     { isImgLoading && 
                        <View style={{marginVertical:50, 
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:"column"}}>
                            <ActivityIndicator  />
                            <Text style={{marginVertical:10, marginHorizontal:10, color:'#787878'}}>Loading Image ... </Text>
                        </View>
                     }

                    <Image on
                        onLoadEnd={() => setIsImgLoading(false)}
                                               
                        style={!isImgLoading && styles.image}
                        resizeMode = "contain"
                        
                        source={{ uri: Config.ApiUrl +'/image/' + elem.id}}
                    />

                    </View>
                )
                
                :(
                    <View style={{justifyContent:"center", alignItems:"center", alignContent:"center",
                        width:'100%', height:'100%'}}>
                        {/* <Video
                        source={{ uri: playrec }}
                        style={{width:'80%', height:'80%'}}
                        useNativeControls
                        isLooping
                        shouldPlay
                        /> */}

                        <PlayVideo camToPlay ={elem.objids} isRec={true} 
                             dateRec={elem.evtime} />
                    </View>
                )
                }
        
                </View>
                <View style={{flex:0, marginBottom:10}}>

                    <ItemRowTemplateComponent title={'Id'} content={elem.id} />
                    <ItemRowTemplateComponent title={'Time'} content={elem.dtmestr} />
                    <ItemRowTemplateComponent title={'Name'} content={elem.evtname} />
                    <ItemRowTemplateComponent title={'Camera'} content={elem.objids} />
                    <ItemRowTemplateComponent title={'Description'} content={elem.dtabf.split("$")[0]} />
                    
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
        width:'100%', 
        height:'100%', 

        marginHorizontal:0,
        marginVertical:0
    }
})