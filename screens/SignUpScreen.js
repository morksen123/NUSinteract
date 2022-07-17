import { 
    StyleSheet,
    Text,
    View,
    Keyboard,
    Alert,
    TextInput
} from 'react-native';

import OutlinedButton from '../components/Buttons/OutlinedButton';

import { useState } from 'react';

import { supabase } from '../utils/supabase';

import CustomModal from '../components/Dialog/CustomModal';


const THEME = '#3F3F3F';


const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const confirmMessage = 'Your account details will be finalised and cannot be changed'
    const confirmTitle = 'Confirm Sign Up'

    // check if sign up passed through
    const signUpWithEmail = async () => {

        if (!email.includes("@u.nus.edu")) {
            Alert.alert("NUS email required");
        
        } else if (password != confirmPassword) {
            Alert.alert("Different passwords")
        
        } else if (username.length < 2) {
            alert("Invalid Username")

        } else {
            const { error } = await supabase.auth.signUp(
                { 
                    email: email,
                    password: confirmPassword,
                },
                {
                    data: { 
                    username: username
                    }
                }
            );   

            error ? Alert.alert(error.message) : 
                Alert.alert("Sign Up Sucessful!") 
        }

        restoreForm();
        setShowModal(false); 
    }
    

    const restoreForm = () => {
        setEmail(''); 
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        Keyboard.dismiss(); 
    }


    return (
        <View style={styles.container}>
            
            <Text style={[styles.title, styles.boldText]}>
                Create Your Account
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
                placeholder='Username' 
                value={username}
                onChangeText={setUsername}
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

            <TextInput
                style={styles.textInput}
                placeholder='Confirm password' 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                selectionColor={THEME}
                secureTextEntry
            />

            <View style={styles.OutlinedButton}>
                <OutlinedButton
                    icon="document-text"
                    onPress={() => setShowModal(true)}
                    >
                    Sign Up
                </OutlinedButton>
            </View>

            { 
                showModal && 
                <CustomModal
                    onDoneHandler={signUpWithEmail}
                    onCancelHandler={() => setShowModal(false)}
                    body={confirmMessage}
                    title={confirmTitle}
                />  
            }
        </View>
        
    )
}

export default SignUpScreen; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
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

    boldText: {
        fontWeight: '500'
    },

    OutlinedButton: {
        width: '82%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});