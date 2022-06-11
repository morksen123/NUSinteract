import { 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import { useState } from 'react';

import HostActivityPressable from './HostActivityPressable';


const THEME = '#3F3F3F';


const HostActivityForm = ( { onPressHandler }) => {

    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    

    return (

        <View style={styles.container}>

            <TextInput
                style={styles.textInput}
                placeholder='Time; e.g 1pm' 
                value={time}
                onChangeText={setTime}
                selectionColor={THEME}
            />

            <TextInput
                style={styles.textInput}
                placeholder='Location' 
                value={location}
                onChangeText={setLocation}
                selectionColor={THEME}
            />

            <TextInput
                style={styles.additionalDetails}
                placeholder='Additional details' 
                value={details}
                onChangeText={setDetails}
                selectionColor={THEME}
            />

            <HostActivityPressable  
                title={'Confirm'}
            />

            <HostActivityPressable  
                title={'Cancel'}
                onPressHandler={onPressHandler}
            />

        </View>
    )
}

export default HostActivityForm; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 40, 
        paddingHorizontal: 8, 
        marginBottom: 10
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