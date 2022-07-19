import { Card, Button, Text } from 'react-native-paper';

import { StyleSheet } from 'react-native';
import { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-animatable';
import { supabase } from '../../utils/supabase';

import { RequestContext } from '../../contexts/requestContext';

const RequestCard = (props) => {

    const {
        user,
        title, 
        userID,
        activityID,
        id, 
        setShowModal
    } = props;

    const { requestsData, setRequestsData } = useContext(RequestContext)
    

    /**
     * @desc Upon accepting request, updates accepted column in 
     * joinActivity table to true, and deletes the request from screen
     */
    const onAcceptHandler = () => {

            acceptRequest();
            addUserToChatGroup();
                
            const filteredData = requestsData.filter((activity) => activity.id !== id)
            setRequestsData(filteredData)     
    }

    const acceptRequest = async () => {
        const { error, data } = await supabase
            .from('joinActivity')
            .update({
                accepted: 'true'
            }) 
            .match({ user_id: userID, activity_id: activityID })
    }

    const addUserToChatGroup = async () => {
        const { error, data } = await supabase
            .from('messages')
            .insert([{
                room_id: activityID,
                user_id: userID,
                content: 'auto-generated: I am a new member'
            }])
    }

    const onDeclineHandler = () => {

        const declineRequest = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .update({
                    accepted: 'false'
                })
                .match({ user_id: userID, activity_id: activityID })
                
                const filteredData = requestsData.filter((activity) => activity.id !== id)
                setRequestsData(filteredData)     
        }

        declineRequest()

    }
               

    return (
        <SafeAreaView>
            <Card>
                <View style={styles.text}>
                    <Text style={{ paddingLeft: 17 }}>User: {user.username}</Text>
                    <Text style={{ paddingLeft: 17 }}>Activity: {title}</Text>
                    <Button 
                        style={{ alignSelf: 'flex-start' }}
                        onPress={() => setShowModal(true)}
                    >
                        Profile
                    </Button>
                </View>
                <Card.Actions style={{ justifyContent:'flex-end' }}>
                    <Button 
                        style={styles.button} 
                        mode='contained'
                        onPress={onAcceptHandler}
                    >
                        Accept
                    </Button>
                    <Button 
                        style={styles.button} 
                        mode='outlined'
                        onPress={onDeclineHandler}
                    >
                        Decline
                    </Button>
                </Card.Actions>
            </Card>
    </SafeAreaView> 
    )   
};

export default RequestCard;

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 20,
    },
    
    text: {
        fontSize: 20,
        paddingTop: 8
        
    }
})