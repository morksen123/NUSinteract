import {Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function DisabledButton ({ icon, children }) {
    return (
        <Pressable 
            style={styles.button}
            disabled={true}
        >
            <Ionicons style={styles.icon} name={icon} size={30} colour= {'#407BFF'} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );

}

export default DisabledButton;

const styles = StyleSheet.create({ 
    button: {
        paddingHorizontal:12,
        paddingVertical: 6,
        margin:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#787473'
        
    },
    
    icon : {
        marginRight: 6
    },

    text: {
        color: 'white',
    }

});