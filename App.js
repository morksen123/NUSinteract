import SignInStack from './navigation/SignInStack';
import SignOutStack from './navigation/SignOutStack';

import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './contexts/userContext';
import { RequestProvider } from './contexts/requestContext';

import { Provider } from 'react-native-paper';

import { UserContext } from './contexts/userContext';

import { useContext } from 'react';

const AppWrapper = () => {
  return (
    <Provider>
      <UserProvider>
        <RequestProvider>
          <App/>
        </RequestProvider>
      </UserProvider>
    </Provider>
  )
}

const App = () => {

  const { user } = useContext(UserContext); 
  
  return (
    <NavigationContainer>
      { user ? <SignInStack/> : <SignOutStack/> } 
    </NavigationContainer>
   );
}


export default AppWrapper; 

