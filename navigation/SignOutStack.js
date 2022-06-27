import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator(); 

const SignOutStack = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{header: () => null}}/>
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{
            title: 'Sign Up With NUSinteract!',
            headerStyle: {
              backgroundColor: '#b1f2ff'
            }}}
        />
    </Stack.Navigator>
  )
}


export default SignOutStack; 

