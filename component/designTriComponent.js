import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import Svg, { Circle, Rect, Path, Polygon } from 'react-native-svg';

const DesignTriComponent = ()=>{
    return(
        <View style={{flex:1}}>
            <Svg style={{ width:'100%',height:'100%',
             backgroundColor:'transparent',opacity:0.5,
                }} viewBox="0 0 90 90">
                <Polygon
                points="100,85 120,140 -20,60"
                fill="#d2f5a4"
                stroke="red"
                strokeWidth="0"
                />
                <Polygon
                points="100,90 0,140 100,50"
                fill="#fad15f"
                stroke="purple"
                strokeWidth="0"
                />
          
            </Svg>
        </View>
    )
}

export default DesignTriComponent;