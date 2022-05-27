import { 
    StyleSheet,
    Text,
    View,
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
import { NavigationContainer } from '@react-navigation/native';


const supabaseUrl = "https://aqeopdkkfhradtlezpil.supabase.co"
const supabaseAnonKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZW9wZGtrZmhyYWR0bGV6cGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0NTIxMTEsImV4cCI6MTk2OTAyODExMX0.MZZovcPnuGFnM2wDyabFZAuL8ei9vZqlfxql4I849wA"

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const AuthScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // check if possible log in
    async function signInWithEmail() {
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert('Invalid Email / Password')
        } else {
            navigation.navigate("Home")
        }
    }

    // check if sign up passed through
    async function signUpWithEmail() {

        if (!email.includes("@u.nus.edu")) {
            Alert.alert("NUS email required");
        } else {
            const { user, error } = await supabase.auth.signUp({ 
                email: email,
                password: password,
            }) 

            error ? Alert.alert(error.message) : 
                Alert.alert("Sign Up Sucessful!")
        }

        restoreForm(); 
    }
    

    const restoreForm = () => {
        setEmail(''); 
        setPassword('')
        Keyboard.dismiss(); 
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
                    placeholder='Email'
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
                    onPressHandler={signInWithEmail}    
                    title={'SIGN IN'}
                />
                <AuthPressable
                    onPressHandler={signUpWithEmail}    
                    title={'SIGN UP WITH NUS EMAIL'}
                />
            </View>
        </KeyboardAvoidingView>
    )
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