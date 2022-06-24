import {
    ScrollView, 
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

import { useContext, useState } from 'react';

import HostActivityPressable from './HostActivityPressable';
import LocationPicker from './LocationPicker';

import { UserContext } from '../../contexts/userContext';

import { supabase } from '../../utils/supabase';

const THEME = '#3F3F3F';


const HostActivityForm = ({ onPressHandler }) => {


    const [enteredTime, setTime] = useState('');
    const [enteredDetails, setDetails] = useState('');

    
    const [location, setLocation] = useState('');
    

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

    
    function changeTimeHandler(enteredTime) {
        setTime(enteredTime);
    }
    function changeDetailsHandler(enteredDetails) {
        setDetails(enteredDetails);
    }



    return (
        <ScrollView>

            <View style={styles.container}>
                <Text>
                    Time Of Activity
                </Text>
                <View style = {styles.pad}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='e.g 2pm' 
                        value={enteredTime}
                        onChangeText={changeTimeHandler}
                        selectionColor={THEME}
                    />
             
                </View>
                <Text>
                    Additional Details About Activity
                </Text>
                <View style = {styles.pad}>
                    <TextInput
                        style={styles.additionalDetails}
                        placeholder='e.g Basketball Session, 4 Pax' 
                        value={enteredDetails}
                        onChangeText={changeDetailsHandler}
                        selectionColor={THEME}
                    />

                </View>
                <Text >
                    Location Of Activity
                </Text>

                <View style = {styles.padlocation} >
                    <LocationPicker/>
                </View>

                <View style = {styles.buttons}>             
                    <HostActivityPressable  
                    title={'Host Activity'}
                    />

                    <HostActivityPressable  
                    title={'Cancel'}
                    onPressHandler={onPressHandler}
                    />
                </View>
   

            </View>
        </ScrollView>

    )
}

export default HostActivityForm; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        
    },

    pad: {
        paddingTop:10,
        paddingBottom:10,
        width: "100%"
    },

    padlocation: {
        paddingTop:10,
        width: "100%"
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

    },

    buttons : {
        flexDirection: 'row'
    }
});