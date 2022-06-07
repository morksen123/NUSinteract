import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import HostActivityScreen from "../screens/HostActivityScreen";
import ActivityListScreen from "../screens/ActivityListScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator(); 

const HomeHostJoinStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="HostActivity" component={HostActivityScreen}/>
            <Stack.Screen name="JoinActivity" component={ActivityListScreen}/>
            <Stack.Screen name="Map" component={MapScreen}/>
        </Stack.Navigator>
    )
}

export default HomeHostJoinStack;