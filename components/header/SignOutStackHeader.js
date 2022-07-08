import * as React from 'react';
import { Appbar } from 'react-native-paper';

const SignOutStackHeader = ({ navigation, back }) => {

  return (
    <Appbar.Header style={{backgroundColor: '#9E89FE'}} dark={false}>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Sign Up"/>
    </Appbar.Header>
  );
};

export default SignOutStackHeader;