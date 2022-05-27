import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <NavigationContainer>  
      <View>
        <AuthScreen/>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

export default App; 

