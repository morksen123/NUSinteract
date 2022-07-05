import {
    Text, 
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

import { useContext, useState } from 'react';

import OutlinedButton from '../Buttons/OutlinedButton';

import { HostIDContext } from '../../contexts/hostIDContext';
import { supabase } from '../../utils/supabase';
import { UserContext } from '../../contexts/userContext';

const THEME = '#3F3F3F';


const ChatBox = ({ onPressHandler }) => {

    const [message, setMessage] = useState('');

    const { user } = useContext(UserContext)

    const { hostID } = useContext(HostIDContext);


    const onSendMessageHandler = () => {

        const getUsername = async () => {
            const { data, error } = await supabase  
                .from('users')
                .select('username')
                .or(`id.eq.{${user.id}}, id.eq.{${hostID}}`)
                .order()

            console.log(data)
        }

        getUsername()

        const uploadMessage = async () => {
            const { data, error } = await supabase  
                .from('chatlog')
                .insert([{
                    sender_id: user.id,
                    receiver_id: hostID,
                    content: message
                }])
        }

        uploadMessage();
        onPressHandler();
    }
    
    return (
        
        <View style={styles.container}>

            <Text style = {styles.title}>Send Message To Host</Text>

            <TextInput
                style={styles.additionalDetails}
                placeholder='How long would the activity last?' 
                value={message}
                onChangeText={setMessage}
                selectionColor={THEME}
            />

            <View style={styles.buttons}>

                <OutlinedButton onPress={onSendMessageHandler}>
                    Send Message
                </OutlinedButton>

                <OutlinedButton onPress={onPressHandler}>
                    Cancel
                </OutlinedButton>
        
            </View>
            

        </View>
    )
}

export default ChatBox; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white" ,
        height: '100%',
        justifyContent: 'center',
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