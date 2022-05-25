import { 
    StyleSheet,
    Text,
    View,
    ToastAndroid, 
    Keyboard,
    KeyboardAvoidingView,
    Platform, 
    Alert,
    Image
} from 'react-native';

import { useState } from 'react';

import AuthTextInput from '../components/auth/AuthTextInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
import AuthPressable from '../components/auth/AuthPressable';


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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <View style={styles.container}>
             
                <Image
                    source = {require('../assets/test.png')}
                    style = {{width: 200, height: 220, bottom: 15}}
                />

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
                <AuthPressable
                    onPressHandler={isLogin ? signInWithEmail : signUpWithEmail}    
                    title={'Proceed'}
                />
                <AuthPressable
                    onPressHandler={isLogin ? signInWithEmail : signUpWithEmail}    
                    title={`Switch to ${isLogin ? 'Sign Up' : 'Login'}`}
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
        backgroundColor: '#7FFFD4',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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