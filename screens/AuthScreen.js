import { 
    StyleSheet,
    Text,
    View,
    Keyboard,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';

import { useState } from 'react';

import AuthTextInput from '../components/auth/AuthTextInput';



const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <View style={styles.container}>
                <Text style={[styles.title, styles.boldText]}>
                    NUSinteract
                </Text>

                <AuthTextInput
                    value={email}
                    placeholder='Your Email'
                    textHandler={setEmail}
                    KeyboardType='email-address'
                />

                <AuthTextInput
                    value={password}
                    placeholder='password'
                    textHandler={setPassword}
                    secureTextEntry
                />    
            </View>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECF0',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
        
    title: {
        fontSize: 32, 
        textAlign: 'center',
        marginBottom: 20
    },

    boldText: {
        fontWeight: '400'
    }
});