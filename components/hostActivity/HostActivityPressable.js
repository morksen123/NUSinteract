import { StyleSheet, Text, Pressable } from "react-native"; 


const HostActivityPressable = ({ onPressHandler, title }) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPressHandler}
        >
             <Text style={styles.text}>{title}</Text>

        </Pressable>
    )
}

export default HostActivityPressable; 

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#407BFF',
        marginVertical: 5,
        paddingVertical: 15,
        alignItems: 'center',
        width: '30%',
        height: 50,
        borderRadius: 4,
    },

    text: {
        fontWeight: '600'
    }


});
