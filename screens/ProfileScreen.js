import { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

import ProfileForm from "../components/profile/ProfileForm";

import { UserContext } from "../contexts/userContext";

const ProfileScreen = () => {
    
  const [visible, setVisible] = useState(false);

  const { user } = useContext(UserContext)

  console.log(user)

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

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
        <Button style={{marginTop: 30}} onPress={showModal}>
        Update Status 
        </Button>
    </View>

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