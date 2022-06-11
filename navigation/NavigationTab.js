import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';

import DummyScreen from "../screens/DummyScreen";

import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityListScreen from "../screens/ActivityListScreen";
import HomeHostJoinStack from "./HomeHostJoinStack";
import HomeScreen from "../screens/HomeScreen";

const fullScreenWidth = Dimensions.get('window').width; 

const Tab = createBottomTabNavigator(); 


const NavigationTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (route.name === 'Activities') {
                        iconName = focused ? 'list' : 'list-outline'
                    } else {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                    }

                    return (
                        <Icon
                            name={iconName} 
                            size={size} 
                            color={color} 
                        />
                    )
                },
                
                tabBarActiveTintColor: 'seagreen',
                tabBarInactiveTintColor: 'black',
                style: {width: fullScreenWidth}
            })}>
            
            <Tab.Screen name="Home" component={HomeHostJoinStack}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="Chat" component={ChatScreen}/>
            <Tab.Screen name="Activities" component={ActivityListScreen}/>
        </Tab.Navigator>
    )
}

export default NavigationTab; 