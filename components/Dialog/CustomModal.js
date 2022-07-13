import * as React from 'react';
import { View } from 'react-native';
import { 
    Button,
    Paragraph,
    Dialog,
    Portal
} from 'react-native-paper';

const CustomModal = ({ body, title, onCancelHandler, onDoneHandler, error }) => {

  return (
      <View> 
        <Portal>
          <Dialog visible={true}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{body}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onCancelHandler}>Cancel</Button>
              <Button onPress={onDoneHandler}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default CustomModal;