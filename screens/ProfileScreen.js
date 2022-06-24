import { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

import ProfileForm from "../components/profile/ProfileForm";

import Avatar from '../components/profile/Avatar';

import { supabase } from "../utils/supabase";

import { UserContext } from "../contexts/userContext";


const ProfileScreen = () => {
    
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState('--empty--')

  const { user } = useContext(UserContext)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  useEffect(() => {
    const getDetails = async () => {
      const { error, data } = await supabase
        .from('users')
        .select('status')
        .eq('id', user.id)

        data.map(data => setDetails(data.status))
    }

    getDetails();
  }, [])

  return (
    <Provider>
    <Portal>
      <Modal visible={visible} contentContainerStyle={containerStyle}>
        <ProfileForm 
          onPressHandler={hideModal}
        />
      </Modal>
    </Portal>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Username: {user.user_metadata.username}  </Text>
        <Text>About me: {details} </Text>
        <Button style={{marginTop: 30}} onPress={showModal}>
        Update Status 
        </Button>
    </View>

    <Avatar/>

    

  </Provider>
  );
}

export default ProfileScreen; 


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});