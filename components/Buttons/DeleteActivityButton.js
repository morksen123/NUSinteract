import {Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function DeleteActivityButton ({onPress, children }) {
    return (
        <Pressable 
            style={({pressed}) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}>
            <Ionicons style={styles.icon} name='close-outline' size={30} colour= {'#407BFF'} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );

}

export default DeleteActivityButton;

const styles = StyleSheet.create({ 
    button: {
        paddingHorizontal:12,
        paddingVertical: 6,
        margin:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#FF451D'
    },
    
    pressed: {
        opacity:0.5
    },
    
    icon : {
        marginRight:6
    },

    text: {
        color: 'black',
    }

});