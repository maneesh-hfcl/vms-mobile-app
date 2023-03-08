import { createNativeStackNavigator } from "@react-navigation/native-stack";    
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
        </Stack.Navigator>
    )
}

export default EmergencyStack;