import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator(); 

const App = () => {
  return (
    <NavigationContainer>  
      
        <HomeScreen/>
        <StatusBar style="auto" />
      
    </NavigationContainer>
  );
}

export default App; 

