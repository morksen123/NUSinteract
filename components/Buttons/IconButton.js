import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function IconButton ({ icon, size, colour, onPress }) {
    return (
        <Pressable 
            style = {({pressed}) => [styles.button, pressed && styles.pressed]} 
            onPress = {onPress} 
        >
            <Ionicons name={icon} size = {size} colour= {colour} />
        </Pressable>
    );

}

export default IconButton;

const styles = StyleSheet.create ({
    button:{
        padding: 8,
        margin: 4,
        justifyContent:'center',
        alightItems: 'center'
    },
    pressed:{
        opacity : 0.5
    }


});

