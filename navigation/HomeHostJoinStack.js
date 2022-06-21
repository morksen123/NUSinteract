import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import HostActivityScreen from "../screens/HostActivityScreen";
import MapScreen from "../screens/MapScreen";
import PickLocationScreen from "../screens/PickLocationScreen";

const Stack = createNativeStackNavigator(); 

const HomeHostJoinStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeCopy" component={HomeScreen} options={{header: () => null}}/>
            <Stack.Screen name="HostActivity" component={HostActivityScreen}/>
            <Stack.Screen name="Map" component={MapScreen}/>
            <Stack.Screen name = "PickLocation" component= {PickLocationScreen} />
        </Stack.Navigator>
    )
}

export default HomeHostJoinStack;