import { StyleSheet, Text, Pressable } from "react-native"; 


const AuthPressable = ({ onPressHandler, title }) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPressHandler}
        >
             <Text style={styles.text}>{title}</Text>

        </Pressable>
    )
}

export default AuthPressable; 

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 5,
        paddingVertical: 10,
        width: '80%',
        height: 40,
        alignItems: 'center',
        borderRadius: 4
    },

    text: { 
        color: 'black'
        
    }

});
