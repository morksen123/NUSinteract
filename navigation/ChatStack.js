import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InboxScreen from "../screens/InboxScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator(); 

const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inbox" component={InboxScreen}/>
            <Stack.Screen name="Messages" component={ChatScreen}/>
        </Stack.Navigator>
    )
}

export default ChatStack;