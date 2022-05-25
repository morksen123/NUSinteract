import { 
    StyleSheet,
    Text,
    View,
    ToastAndroid, 
    Keyboard,
    KeyboardAvoidingView,
    Platform, 
    Alert
} from 'react-native';

import { useState } from 'react';

import AuthTextInput from '../components/auth/AuthTextInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://aqeopdkkfhradtlezpil.supabase.co"
const supabaseAnonKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZW9wZGtrZmhyYWR0bGV6cGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0NTIxMTEsImV4cCI6MTk2OTAyODExMX0.MZZovcPnuGFnM2wDyabFZAuL8ei9vZqlfxql4I849wA"

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);


    // check if possible log in
    async function signInWithEmail() {
        setIsLogin(true)
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setIsLogin(false)
    }

    // check if sign up passed through
    async function signUpWithEmail() {
        setIsLogin(true)
        const { user, error } = await supabase.auth.signUp({ 
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setIsLogin(false)
    }


    return (
        <KeyboardAvoidingView
            // change to android? 
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
/*
    // messages
    const signUpToast = () => {
        ToastAndroid.show(
            'Sign Up Successfully completed!', 
            ToastAndroid.SHORT
        );
    };

    const missingFieldsToast = () => {
        ToastAndroid.show(
            'Missing Fields, please try again!',
            ToastAndroid.SHORT
        );
    };
    */
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