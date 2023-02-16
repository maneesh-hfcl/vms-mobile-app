import Checkbox from "expo-checkbox";
import React from "react";
import {Text, View, StyleSheet} from 'react-native'

const ChkItemCardComponent = ({elem, setIsCheckedChange})=>{
    return(
            <View style={{flexDirection:'row', marginHorizontal:10, marginVertical:5}}>
                <Checkbox
                    value={elem.isChecked}
                    onValueChange = {(value) => setIsCheckedChange(elem.id, value)}
                    color={elem.isChecked?'#46a3fa': '#a7a7a7'}
                />
                <Text style={{marginHorizontal:10}}>{elem.name}</Text>
            </View>
    )
}

export default ChkItemCardComponent;