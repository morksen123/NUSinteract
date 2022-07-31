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

import { useContext, useState } from 'react';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import OutlinedButton from '../components/Buttons/OutlinedButton';

const THEME = '#3F3F3F';

const SignInScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmail = async () => {
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password,
        })

        setUser(user); 

        if (error) {
            Alert.alert('Invalid Email / Password')
        } 
    }

    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.container}>

                <View style={styles.imagecontainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={{ width: 200, height: 220, left: 21, bottom: 10, borderWidth: 3 }}
                    />
                </View>

                <Text style={styles.title}>
                    NUSinteract
                </Text>

                <View style = {styles.fillup}>
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

                    <View style={styles.OutlinedButton}>
                        <OutlinedButton 
                            icon="enter"
                            onPress={signInWithEmail}    
                            
                        >
                            SIGN IN
                        </OutlinedButton>

                        <OutlinedButton
                            icon="document-text"
                            onPress={navigateToSignUp}
                            colour='red'    
                            
                        >
                            SIGN UP WITH NUS EMAIL
                        </OutlinedButton>                    
                    </View>

                    

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
    },
    imagecontainer:{
         marginLeft:95,
    },

    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 45, 
        paddingHorizontal: 8, 
        marginBottom: 10
    },

    title: {
        fontSize: 35, 
        fontFamily: "AvenirNext-Italic",
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '700',    
        alignSelf: 'center'
    },

    OutlinedButton: {
        width: '82%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});