import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

import ProfileForm from "../components/profile/ProfileForm";

import Avatar from '../components/profile/Avatar';

import { supabase } from "../utils/supabase";

import { UserContext } from "../contexts/userContext";
import OutlinedButton from "../components/Buttons/OutlinedButton";

// import { ActivityIndicator } from 'react-native-paper';

/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';


const ProfileScreen = () => {
    
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null)
  const [details, setDetails] = useState('Tell us more about yourself!')
  const [loading, setLoading] = useState(true); 
  

  const { user } = useContext(UserContext)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  useEffect(() => {
    const getUserData = async () => {
      const { error, data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)

        setUserData(data)
        setLoading(false)
        setDetails(data[0].status)   
    }

    getUserData();
  }, [])

  useEffect(() => {
        const subscription = supabase
            .from('users')
            .on('UPDATE', (payload) => {
                setDetails(() => setDetails(payload.new.status))
            })
            .subscribe();
        
        return () => {
            supabase.removeSubscription(subscription)
        }

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

    {loading ? <ActivityIndicator size="small" color="#0000ff" /> :

      <View style={styles.entireContainer}>
        <Avatar data={userData}/>
        <View style={styles.statusContainer}>
          <Text style={styles.title}>Username: </Text>
          <Text style={styles.body}>{user.user_metadata.username} </Text>
          <Text style={styles.title}>About me: </Text>
          <Text style={styles.body}>{details} </Text>
        </View>

        <View style = {styles.updatebutton}>

          <OutlinedButton icon="create" onPress={showModal}>
            Update Status
          </OutlinedButton>

        </View>

      </View>
      }
    </Provider>
  );
}

export default ProfileScreen; 


const styles = StyleSheet.create({

entireContainer:{ 
  flex: 1,
  backgroundColor:"#b1f2ff" 
  //alignItems: 'center', 
  //justifyContent: 'center' 
},

statusContainer: { 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center' 
},
  
title: {
    fontSize: 30, 
    textAlign: 'center',
    marginBottom: 5
},

body: {
  fontSize: 20, 
  fontFamily: "AvenirNext-Italic",
  textAlign: 'center',
  marginBottom: 20
},

updatebutton:{
  marginBottom: 80
}


});