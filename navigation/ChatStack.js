import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InboxScreen from "../screens/InboxScreen";
import ChatScreen from "../screens/ChatScreen";

import SignInStackHeader from "../components/header/SignInStackHeader";

const Stack = createNativeStackNavigator(); 

/**
 * 
 * @returns a stack which contains the list of chatrooms and the chat screen 
 */
const ChatStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{header: (props) => <SignInStackHeader {...props}/>}}
        >
            <Stack.Screen name="Inbox" component={InboxScreen}/>
            <Stack.Screen
                name="Messages"
                component={ChatScreen}
                options={({route}) => ({title: route.params.name})}
            />
        </Stack.Navigator>
    )
}

export default ChatStack;