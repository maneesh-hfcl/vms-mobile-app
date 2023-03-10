import { createNativeStackNavigator } from "@react-navigation/native-stack";    
import AddEmergencyScreen from "../../screen/emergency/addEmergencyScreen";
import ReportedScreen from "../../screen/emergency/reportedScreen";
import ViewEmergencyImage from "../../screen/emergency/viewEmergencyScreen";
import EmergencyHome from "../../screen/emergencyHomeScreen";

const Stack = createNativeStackNavigator()

const EmergencyStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="EmergencyHome" component={EmergencyHome} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="EmergencyReport" component={ReportedScreen}
                options={{
                    headerTitle:'Reported Emergencies'
                }}
            />
            <Stack.Group screenOptions={{presentation:'transparentModal', animation:"slide_from_bottom"}}>
                <Stack.Screen name="AddEmergency" component={AddEmergencyScreen} options={{headerShown:false}} />
                <Stack.Screen name="ViewEmergencyImage" component={ViewEmergencyImage} options={{headerShown:false}} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default EmergencyStack;