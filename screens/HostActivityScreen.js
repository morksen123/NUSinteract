import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import HostActivityForm from '../components/hostActivity/HostActivityForm';


const HostActivityScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          <HostActivityForm 
            onPressHandler={hideModal}
          />
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Entertainment
      </Button>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Study
      </Button>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Meal
      </Button>
    </Provider>
  );
};

export default HostActivityScreen; 

