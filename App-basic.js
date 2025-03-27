import {Text, View} from 'react-native';
import { useEffect } from 'react';

export default function App(){
    useEffect(()=>{
        console.log("hello");
    });
    return(
        <View>
            <Text>This is the expo</Text>
            <Text>This is the expo</Text>
            <Text>This is the expo</Text>
            <Text>This is the expo</Text>
        </View>
    )
}