import { Video } from "expo-av";
import React from "react";  
import {View, Text, StyleSheet, Pressable} from 'react-native'
import DialogOuterCard from "../../component/card/dialogOuterCard";
import PlayVideo from "./playVideo";
import { Feather } from '@expo/vector-icons';
import { LoadApiData, LoadApiDataFrmWeb } from "../../shared/fetchUrl";

const PTZScreen  = ({navigation,route})=>{
    const {cam} = route.params
    let ptzFtrCalled = false
    const pressCloseDialog = ()=>{
        navigation.pop()
    }
    const closeCam = ()=>{

    }

    const OpnPtz = async(dir, type)=>{
        console.log(`Direction: ${dir} - ${type}`)
        let sAct = dir.substring(2), sCmd = '', sCam = cam, sPrx = "oo";

        if(type == "in")
        {
            if(!ptzFtrCalled)
            {
                sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=otb${sAct}`; sPrx = "ot";
            }
            else{
                sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=oob${sAct}`;
            }

            ptzFtrCalled = true

            let jsonData = await LoadApiDataFrmWeb(sCmd, "POST")
            console.log(jsonData);
        }
        else {
            sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=oos${sAct}`;
            
            let jsonData2 = await LoadApiDataFrmWeb(sCmd, "POST")
            console.log(jsonData2);
        }

//        let jsonData = await LoadApiData(sCmd, "POST")
//        console.log(jsonData);
    }

    return(
        <DialogOuterCard pressCloseDialog={pressCloseDialog} diagBackColor={"#000"}>
            <View style={{flex:1, marginTop:20}}>
                <PlayVideo camToPlay ={cam} isRec={false} 
                            closeCam={closeCam} dateRec={''} />
            </View>
            <View style={{flexDirection:'row', 
                justifyContent:'space-evenly', paddingVertical:40
                , borderTopWidth:5,borderColor:'#a7a7a7',
                backgroundColor:'#ededed'
                }}>
                <View>
                <View style={{flexDirection:'row'}}>
                    <Pressable
                        onPressIn={() => OpnPtz('vplu','in')} onPressOut={() => OpnPtz('vplu', 'out')}
                    >
                        <Feather name="arrow-up-left" size={24} color="black"
                        style={styles.arrow_outer} />
                     </Pressable>
                     <Pressable
                        onPressIn={() => OpnPtz('vpup','in')} onPressOut={() => OpnPtz('vpup', 'out')}
                    >
                        <Feather name="arrow-up" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>
                    <Pressable
                        onPressIn={() => OpnPtz('vpru','in')} onPressOut={() => OpnPtz('vpru', 'out')}
                    >
                        <Feather name="arrow-up-right" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Pressable
                        onPressIn={() => OpnPtz('vplf','in')} onPressOut={() => OpnPtz('vplf', 'out')}
                    >
                        <Feather name="arrow-left" size={24} color="black"
                        style={styles.arrow_outer} />
                     </Pressable>
                     <Pressable
                        onPressIn={() => OpnPtz('vphm','in')} onPressOut={() => OpnPtz('vphm', 'out')}
                    >
                        <Feather name="home" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>
                    <Pressable
                        onPressIn={() => OpnPtz('vprt','in')} onPressOut={() => OpnPtz('vprt', 'out')}
                    >
                        <Feather name="arrow-right" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>

                </View>
                <View style={{flexDirection:'row'}}>
                    <Pressable
                        onPressIn={() => OpnPtz('vpld','in')} onPressOut={() => OpnPtz('vpld', 'out')}
                    >
                        <Feather name="arrow-down-left" size={24} color="black"
                        style={styles.arrow_outer} />
                     </Pressable>
                     <Pressable
                        onPressIn={() => OpnPtz('vpdn','in')} onPressOut={() => OpnPtz('vpdn', 'out')}
                    >
                        <Feather name="arrow-down" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>
                    <Pressable
                        onPressIn={() => OpnPtz('vprd','in')} onPressOut={() => OpnPtz('vprd', 'out')}
                    >
                        <Feather name="arrow-down-right" size={24} color="black" 
                        style={styles.arrow_outer} />
                    </Pressable>

                </View>
                </View>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Pressable
                            onPressIn={() => OpnPtz('vpzi','in')} onPressOut={() => OpnPtz('vpzi', 'out')}
                        >
                            <Feather name="plus" size={24} color="black" style={styles.arrow_outer} />
                        </Pressable>
                        <Text style={{marginHorizontal:5}}>Zoom</Text>
                        <Pressable
                            onPressIn={() => OpnPtz('vpzo','in')} onPressOut={() => OpnPtz('vpzo', 'out')}
                        >
                            <Feather name="minus" size={24} color="black" style={styles.arrow_outer} />
                        </Pressable>
                    </View>
                </View>

            </View>
            
        </DialogOuterCard>
    )
}

export default PTZScreen;

const styles = StyleSheet.create({
    arrow_outer:{
        paddingHorizontal:10,
        paddingVertical:8,
        borderWidth:1,
        borderColor:"#d7d7d7",
        color:"#7a7a7a",
        marginHorizontal:3,
        marginVertical:3,
        fontSize:20,
        backgroundColor:'#fff'
        
    }
})