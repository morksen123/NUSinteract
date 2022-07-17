import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

import PreviewProfile from './PreviewProfile';

const ProfileModal = ({ userProfileData, onCancelHandler }) => {

  return (
    
      <Portal>  
        <Modal visible={true}>
            <PreviewProfile
                userProfileData={userProfileData}
                onCancelHandler={onCancelHandler}
            />  
        </Modal>
      </Portal>
  );
};

export default ProfileModal;
