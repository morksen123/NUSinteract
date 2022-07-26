import { ActivityIndicator, Appbar } from 'react-native-paper';

import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../contexts/userContext';
import { RequestContext } from '../../contexts/requestContext';

import { supabase } from '../../utils/supabase';

import CustomModal from '../Dialog/CustomModal';

import CustomBadge from '../badge/badge';


const SignInStackHeader = (props) => {

  const { navigation, back } = props

  const { user } = useContext(UserContext);
  const { setRequestsData } = useContext(RequestContext)

  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  

  useEffect(() => {

    /**
     * @desc fetches data to display the activity requests for hosted activities
     */
    const getRequestsData = async () => {
        const { error, data } = await supabase
            .from('joinActivity')
            .select('*, hostActivity!inner(*), users!joinActivity_user_id_fkey(username, avatar_url, status)')
            .eq('hostActivity.user_id', user.id )
            .eq('accepted', 'pending')  
      
        setRequestsData(data)
        setLoading(false)
    }

      getRequestsData(); 

}, [])

  const signOutHandler = async () => {
    return supabase.auth.signOut()
  }
  
  const onPressAddHandler = () => {
    navigation.navigate("Home")
    navigation.navigate("Request")
  }

  return (

    loading ? <ActivityIndicator/> : 
    
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