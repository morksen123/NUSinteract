import { Appbar } from 'react-native-paper';

import { useContext, useState, View } from 'react';

import { UserContext } from '../../contexts/userContext';

import { supabase } from '../../utils/supabase';

const SignInStackHeader = (props) => {

  const { navigation, back } = props

  const { setUser } = useContext(UserContext);

  const signOutHandler = async () => {
    const { event } = await supabase.auth.signOut()
    setUser(null)
    console.log(event)
  }
  
  const onPressAddHandler = () => {
    navigation.navigate("Dummy")
  }

  return (
    
    <Appbar.Header style={{backgroundColor: '#9E89FE'}} dark={false}>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title=''/>
            <Appbar.Action icon="account-multiple-plus" onPress={onPressAddHandler} />
            <Appbar.Action icon="logout" onPress={signOutHandler}/> 
    </Appbar.Header>

  );
};

export default SignInStackHeader;