import SignInStack from './navigation/SignInStack';
import SignOutStack from './navigation/SignOutStack';

import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './contexts/userContext';
import { HostIDProvider } from './contexts/hostIDContext';

import { UserContext } from './contexts/userContext';

import { useContext } from 'react';

const AppWrapper = () => {
  return (
    <UserProvider>
      <HostIDProvider>
        <App/>
      </HostIDProvider>
    </UserProvider>
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

