import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import HostActivityScreen from "../screens/HostActivityScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator(); 

const HomeHostJoinStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeCopy" component={HomeScreen} options={{header: () => null}}/>
            <Stack.Screen name="HostActivity" component={HostActivityScreen}/>
            <Stack.Screen name="Map" component={MapScreen}/>
        </Stack.Navigator>
    )
}

export default HomeHostJoinStack;