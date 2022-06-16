import { 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import { useState } from 'react';

import HostActivityPressable from '../hostActivity/HostActivityPressable';

const THEME = '#3F3F3F';


const ProfileForm = ({ onPressHandler }) => {

    const [details, setDetails] = useState('');
    

    return (
        
        <View style={styles.container}>

            <TextInput
                style={styles.additionalDetails}
                placeholder='Details' 
                value={details}
                onChangeText={setDetails}
                selectionColor={THEME}
            />

            <HostActivityPressable  
                title={'Update'}
            />

            <HostActivityPressable  
                title={'Cancel'}
                onPressHandler={onPressHandler}
            />
        </View>
    )
}

export default ProfileForm; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    additionalDetails: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 80, 
        paddingHorizontal: 8, 
        marginBottom: 10

    }
});