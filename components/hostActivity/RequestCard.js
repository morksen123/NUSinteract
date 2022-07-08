import * as React from 'react';
import { Card, Button, Text } from 'react-native-paper';

import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-animatable';
import { supabase } from '../../utils/supabase';

const RequestCard = (props) => {

    const {
        username,
        title, 
        userID,
        activityID,
        hostActivityData,
        setHostActivityData,
        id
    } = props;
    

    /**
     * @desc Upon accepting request, updates accepted column in 
     * joinActivity table to true, and deletes the request from screen
     */
    const onAcceptHandler = () => {

        const acceptRequest = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .upsert({
                    user_id: userID, 
                    activity_id: activityID,
                    accepted: 'true'
                }) 
                
                const filteredData = hostActivityData.filter((activity) => activity.id !== id)
                setHostActivityData(filteredData)     
        }

        acceptRequest()
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
            <View>
                <Text>User: {username}</Text>
                <Text>Activity: {title}</Text>
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
    }
})