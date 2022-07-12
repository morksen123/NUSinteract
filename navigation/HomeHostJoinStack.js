import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import HostActivityScreen from "../screens/HostActivityScreen";
import MapScreen from "../screens/MapScreen";
import PickLocationScreen from "../screens/PickLocationScreen";
import RequestScreen from "../screens/RequestScreen";

import SignInStackHeader from "../components/header/SignInStackHeader";

const Stack = createNativeStackNavigator(); 

const HomeHostJoinStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ header: (props) => <SignInStackHeader {...props}/> }}
        >
            <Stack.Screen name="HomeCopy" component={HomeScreen}/>
            <Stack.Screen name="HostActivity" component={HostActivityScreen}/>
            <Stack.Screen name="Map" component={MapScreen}/>
            <Stack.Screen name="PickLocation" component={PickLocationScreen}/>
            <Stack.Screen name="Request" component={RequestScreen}/>
        </Stack.Navigator>
    )
}

export default HomeHostJoinStack;