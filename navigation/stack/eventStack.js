import { createNativeStackNavigator } from "@react-navigation/native-stack";    
import EventDetailScreen from "../../screen/event/eventDetailScreen";
import EventHomeScreen from "../../screen/eventHomeScreen";

const Stack = createNativeStackNavigator()

const EventStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="EventHome" component={EventHomeScreen} options={{headerShown: false}}
            />
            <Stack.Group screenOptions={{presentation:'transparentModal', animation:"slide_from_bottom"}}>
                <Stack.Screen name="EventDetails" component={EventDetailScreen} options={{headerShown:false}} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default EventStack;