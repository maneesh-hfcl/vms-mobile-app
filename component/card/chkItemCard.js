import Checkbox from "expo-checkbox";
import React, { useRef, useState } from "react";
import {Text, View, StyleSheet, Pressable} from 'react-native'

const ChkItemCardComponent = ({elem, setIsCheckedChange})=>{
    const[checkElem, setCheckElem] = useState(elem.isChecked)

    const setValueChange = ()=>{
        setCheckElem(!checkElem)
        setIsCheckedChange(elem.id, checkElem)
    }

    return(

            <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5}}>
                
                <Checkbox 
                    value={checkElem}
                    onValueChange = {setValueChange}
                    color={checkElem?'#46a3fa': '#a7a7a7'} 

                />
                <Pressable onPress={setValueChange}>
                    <Text style={{marginHorizontal:10}}>{elem.name}</Text>
                </Pressable>
            </View>
    )
}

export default ChkItemCardComponent;