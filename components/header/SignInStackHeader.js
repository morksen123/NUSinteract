import { Appbar } from 'react-native-paper';

import { useContext, useState, View } from 'react';

import { UserContext } from '../../contexts/userContext';

import { supabase } from '../../utils/supabase';

import CustomModal from '../Dialog/CustomModal';

import CustomBadge from '../badge/badge';

const SignInStackHeader = (props) => {

  const { navigation, back } = props

  const { setUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false)

  const signOutHandler = async () => {
    const { event } = await supabase.auth.signOut()
    setUser(null)
    console.log(event)
  }
  
  const onPressAddHandler = () => {
    navigation.navigate("Home")
    navigation.navigate("Request")
  }

  return (
    
    <Appbar.Header style={{backgroundColor: '#9E89FE'}} dark={false}>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title=''/>
            <Appbar.Action icon="account-multiple-plus" onPress={onPressAddHandler} />
            <CustomBadge/>
            <Appbar.Action icon="logout" onPress={() => setShowModal(true)}/>
            { 
              showModal && 
              <CustomModal
                  onDoneHandler={signOutHandler}
                  onCancelHandler={() => setShowModal(false)}
                  body={'Logout from NUSinteract?'}
                  title={'Confim Logout'}
              /> 
          }
    </Appbar.Header>

  );
};

export default SignInStackHeader;