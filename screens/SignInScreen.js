import { 
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform, 
    Alert,
    Image,
    TextInput,
} from 'react-native';

import { useState } from 'react';

import AuthPressable from '../components/auth/AuthPressable';

import { supabase } from '../utils/supabase';

const THEME = '#3F3F3F';

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signInWithEmail() {
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        // console.log(supabase.auth.user());

        if (error) {
            Alert.alert('Invalid Email / Password')
        } else {
            navigation.navigate("NavigationTab")
        }
    }


    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.container}>
             
                <Image
                    source = {require('../assets/logo.png')}
                    style = {{width: 200, height: 220, bottom: 15}}
                />

                <Text style={[styles.title, styles.boldText]}>
                    NUSinteract
                </Text>

                <TextInput
                    style={styles.textInput}
                    placeholder='Email' 
                    KeyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                    selectionColor={THEME}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder='Password' 
                    value={password}
                    onChangeText={setPassword}
                    selectionColor={THEME}
                    secureTextEntry
                />

                <AuthPressable
                    onPressHandler={signInWithEmail}    
                    title={'SIGN IN'}
                />
                <AuthPressable
                    onPressHandler={navigateToSignUp}    
                    title={'SIGN UP WITH NUS EMAIL'}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#7FFFD4',
        height: '100%',
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