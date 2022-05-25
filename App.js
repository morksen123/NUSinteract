import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './screens/AuthScreen';

const App = () => {
  return (
    <View>
      <AuthScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

export default App; 

