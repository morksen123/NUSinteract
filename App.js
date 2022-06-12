import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import NavigationTab from './navigation/NavigationTab';
import DummyScreen from './screens/DummyScreen';
import ProfileScreen from './screens/ProfileScreen';
import { supabase } from './utils/supabase';


const Stack = createNativeStackNavigator(); 

const App = () => {

  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{header: () => null}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="NavigationTab" component={NavigationTab} options={{header: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
   );
}


export default App; 

