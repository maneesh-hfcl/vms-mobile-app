import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LnkBtnCard } from "../../component/card/lnkBtnCard";
import EventTypeListComponent from "../../component/event/eventTypeListComponent";
import CamlistSrchComponent from "../../component/event/camlistSrchComponent";
import { useEffect } from "react";

const Tab = createMaterialTopTabNavigator()

const DateSearchComponent = ()=>{
    return(
        <View>
            <Text>Date search screen</Text>
        </View>
    )
}

const CameraSearchComponent = ()=>{
    return(
        <View>
            <Text>Camera search screen</Text>
        </View>
    )
}

const TabSearchEvent = ({pressChkboxItem, fltrEvnt, eventLst, camLst,onComponentLoading})=>{
    // useEffect(()=>{
    //     onComponentLoading()
    // },[])
    return(
        <Tab.Navigator>
            <Tab.Screen name="eventSearch" 
                children={()=> <EventTypeListComponent 
                    eventLst={eventLst}
                    fltrEvnt={fltrEvnt} itemchecked={pressChkboxItem} />}
                options={{
                    title:'Event',
                    tabBarLabel:()=>(<Text>Event</Text>)
            
            }}
            />
            
            <Tab.Screen name="camSearch"
                children={()=> <CamlistSrchComponent
                        camLst={camLst}
                    itemchecked={pressChkboxItem} /> }
                options={{
                    tabBarLabel : ()=>(
                        <Text>Camera</Text>

                )
            }}
            />
            <Tab.Screen name="dateSearch" component={DateSearchComponent}
                options={{
                    title:'Date',
                    tabBarLabel:()=>(<Text>Date</Text>)

            }}
            />
        </Tab.Navigator>
    )
}

export default TabSearchEvent;