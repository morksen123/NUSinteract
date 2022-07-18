import * as React from 'react';
import { Card, Button, Text } from 'react-native-paper';

import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-animatable';
import { supabase } from '../../utils/supabase';

const RequestCard = (props) => {

    const {
        user,
        title, 
        userID,
        activityID,
        hostActivityData,
        setHostActivityData,
        id, 
        setShowModal
    } = props;
    

    /**
     * @desc Upon accepting request, updates accepted column in 
     * joinActivity table to true, and deletes the request from screen
     */
    const onAcceptHandler = () => {

            acceptRequest();
            addUserToChatGroup();
                
            const filteredData = hostActivityData.filter((activity) => activity.id !== id)
            setHostActivityData(filteredData)     
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
                .upsert({
                    user_id: userID, 
                    activity_id: activityID,
                    accepted: 'false'
                }) 
                
                const filteredData = hostActivityData.filter((activity) => activity.id !== id)
                setHostActivityData(filteredData)     
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