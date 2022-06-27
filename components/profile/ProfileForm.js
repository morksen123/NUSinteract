import {
    Text, 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import { useContext, useState, useEffect } from 'react';

import HostActivityPressable from '../hostActivity/HostActivityPressable';

import { supabase } from '../../utils/supabase';

import { UserContext } from '../../contexts/userContext';

import OutlinedButton from '../Buttons/OutlinedButton';

const THEME = '#3F3F3F';


const ProfileForm = ({ onPressHandler }) => {

    const [details, setDetails] = useState('');

    const { user } = useContext(UserContext);

    const onUpdateHandler = async () => {

        const { error, data } = await supabase
            .from('users')
            .upsert({ 
                status: details,
                id: user.id
             })

            onPressHandler()
    }
    

    return (
        
        <View style={styles.container}>

            <Text style = {styles.title}>Update your status!</Text>

            <TextInput
                style={styles.additionalDetails}
                placeholder='About me: looking for mj kaki' 
                value={details}
                onChangeText={setDetails}
                selectionColor={THEME}
            />

            <View style = {styles.buttons}>
                <OutlinedButton icon="pencil" onPress={onUpdateHandler}>Update </OutlinedButton>
                <OutlinedButton icon="close" onPress={onPressHandler}>Cancel</OutlinedButton>
            </View>

        </View>
    )
}

export default ProfileForm; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white" ,
        height: '100%',
        justifyContent: 'center',
    
        //alignItems: 'center',
    },

    title:{
        justifyContent:'center',
        alignItems: 'center',
        marginLeft:100,
        paddingBottom:20


    },

    buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly'
        
    },

    additionalDetails: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 120, 
        paddingHorizontal: 8, 
        marginBottom: 10

    }
});