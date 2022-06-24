import { 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import { useContext, useState } from 'react';

import HostActivityPressable from './HostActivityPressable';

import { UserContext } from '../../contexts/userContext';

import { supabase } from '../../utils/supabase';

const THEME = '#3F3F3F';


const HostActivityForm = ({ onPressHandler }) => {

    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');

    const { user } = useContext(UserContext) ;

    const onConfirmHandler = async () => {
        const { data, error } = await supabase
            .from('hostActivity')
            .insert([
                {
                    user_id: user.id,
                    activity: {
                        name: 'Entertainment',
                        pax: 2
                    }

                }
            ])

            console.log({data, error})
    }
    

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
                onPressHandler={onConfirmHandler}
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