import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

import HostActivityScreen from "../screens/HostActivityScreen";
import MapScreen from "../screens/MapScreen";
import PickLocationScreen from "../screens/PickLocationScreen";
import RequestScreen from "../screens/RequestScreen";

import SignInStackHeader from "../components/header/SignInStackHeader";

const Stack = createNativeStackNavigator(); 

/**
 **
 * @returns A stack that contains all the screens nested in the home screen
 */
const HomeHostJoinStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeCopy" 
                component={HomeScreen}
                options={{ header: (props) => <SignInStackHeader {...props}/> }}
            />
            <Stack.Screen
                name="HostActivity"
                component={HostActivityScreen}
                options={{ header: (props) => <SignInStackHeader {...props}/> }}
            />
            <Stack.Screen
                name="Map" 
                component={MapScreen}
                options={{ header: (props) => <SignInStackHeader {...props}/> }} 
            />
            <Stack.Screen
                name="PickLocation" 
                component={PickLocationScreen}
            />
            <Stack.Screen
                name="Request"
                component={RequestScreen}
                options={{ header: (props) => <SignInStackHeader {...props}/> }} 
            />
        </Stack.Navigator>
    )
}

export default HomeHostJoinStack;