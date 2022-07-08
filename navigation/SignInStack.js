import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';

import ChatStack from "./ChatStack";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityListScreen from "../screens/ActivityListScreen";
import HomeHostJoinStack from "./HomeHostJoinStack";

import SignInStackHeader from "../components/header/SignInStackHeader";

const fullScreenWidth = Dimensions.get('window').width; 

const Tab = createBottomTabNavigator(); 


const SignInStack = () => {
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
                
                tabBarActiveTintColor: '#7058DE',
                tabBarInactiveTintColor: 'black',
                style: {width: fullScreenWidth},
                header: (props) => <SignInStackHeader {...props}/>
            })}>
            
            <Tab.Screen name="Home" component={HomeHostJoinStack}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="Chat" component={ChatStack}/> 
            <Tab.Screen name="Activities" component={ActivityListScreen}/>
        </Tab.Navigator>
    )
}

export default SignInStack;