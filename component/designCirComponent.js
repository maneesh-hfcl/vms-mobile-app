import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const DesignCirComponent = ()=>{
    return(
        <View style={{flex:1}}>
            <Svg style={{ width:'100%',height:'100%',
            opacity:0.3, backgroundColor:'transparent'
        }} viewBox="0 0 100 100">
            <Circle cx="-15" cy="60" r="18" stroke="#fff" strokeWidth="1" fill="red" />
            <Circle cx="125" cy="30" r="20" stroke="#fff" strokeWidth="1" fill="#3a099c" />
            
            <Circle cx="40" cy="30" r="12" stroke="#fff" strokeWidth="1" fill="orange" />
            <Circle cx="50" cy="45" r="15" stroke="#fff" strokeWidth="1"  fill="green" />
            <Circle cx="30" cy="80" r="6" stroke="#fff" strokeWidth="0" fill="#7d0254" />
            {/* <Rect x="15" y="15" width="70" height="70" stroke="#fff" strokeWidth="2" 
                fill="#bba8e0" /> */}
        </Svg>
    </View>
    )
}

export default DesignCirComponent;