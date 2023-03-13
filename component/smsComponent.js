import React, { useEffect } from "react";
import {View, Text, StyleSheet} from 'react-native'
import * as SMS from "expo-sms";

const SmsComponent = ()=>{
    useEffect(()=>{
        checkSMSSupport()
    })

    const checkSMSSupport = async()=>{
        const isAvailable = await SMS.isAvailableAsync();
        if(isAvailable)
        {
            const{ result } = await SMS.sendSMSAsync(
                ['8010347937'],
                'My sample application'
                );
            console.log(result);
        }
    }

    return(
        <View>
            <Text>SMS component</Text>
        </View>
    )
}

export default SmsComponent;