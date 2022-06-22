import {
    Text, 
    View,
    SafeAreaView, 
    TextInput, 
    StyleSheet, 
    Button 
} from 'react-native';
import { supabase } from '../utils/supabase';
import { useState } from 'react';

import Messages from '../components/messages/messages';

const THEME = '#3F3F3F'

const ChatScreen = () => {

    const [message, setMessage] = useState(''); 

    const onPressHandler = async () => {

        const { error, data } = await supabase
            .from('messages')
            .insert({ 
                content: message,
                user_id: supabase.auth.user().id
             })

            //  console.log({ error, data })
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <Text>Chat Screen</Text>
            
            <TextInput 
                style={styles.textInput}
                selectionColor={THEME}
                value={message}
                onChangeText={setMessage}
            />

            <Button onPress={onPressHandler} title="Send Message"/>
            <Messages/>
            
        </SafeAreaView>  
    )
}

export default ChatScreen; 


const styles = StyleSheet.create({

    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '90%',
        height: 40, 
        paddingHorizontal: 8, 
    },

    
    title: {
        fontSize: 35, 
        fontFamily: "AvenirNext-Italic",
        textAlign: 'center',
        marginBottom: 20
    },

    boldText: {
        fontWeight: '500'
    }
});
