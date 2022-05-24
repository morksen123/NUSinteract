import { TextInput, StyleSheet } from "react-native"; 

const THEME = '#3F3F3F';

const AuthTextInput = (props) => {
    const { secureTextEntry, placeholder, keyboardType, value, textHandler } = props;

    return (
        <TextInput
            style={styles.textInput}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder} 
            keyboardType={keyboardType}
            value={value}
            onChangeText={textHandler}
            selectionColor={THEME}
        />
    )
}

export default AuthTextInput; 


const styles = StyleSheet.create({
    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 40, 
        paddingHorizontal: 8, 
        marginBottom: 10
    }
});
