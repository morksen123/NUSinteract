import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';

import { supabase } from '../utils/supabase';

import { useContext, useState, useEffect } from 'react';

import RequestCard from '../components/hostActivity/RequestCard';

import { UserContext } from '../contexts/userContext';

import { ActivityIndicator } from 'react-native-paper';

const RequestScreen = () => {

    const { user } = useContext(UserContext);

    const [hostActivityData, setHostActivityData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getHostActivityData = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .select('*, hostActivity!inner(*), users!joinActivity_user_id_fkey(username)')
                .eq('hostActivity.user_id', user.id )
                .eq('accepted', 'pending')  

            setHostActivityData(data)
            setLoading(false)
        }

        getHostActivityData() 

    }, [])


    return (
        <ScrollView> 
            <SafeAreaView>

                <Text style={styles.joinedTitle}>REQUESTS TO JOIN MY ACTIVITIES</Text>
                
                { 
                    loading ? <ActivityIndicator animating={true} color='red'/> : 

                    hostActivityData.map((activity) => {

                        const { 
                            activity_id,
                            user_id,
                            hostActivity: { activity_details },
                            users: { username } 
                        } = activity;

                        return (
                            <RequestCard
                                key={activity.id}
                                id={activity.id}
                                username={username}
                                title={activity_details.title}
                                userID={user_id}
                                activityID={activity_id}
                                hostActivityData={hostActivityData}
                                setHostActivityData={setHostActivityData}                    
                            />
                        )
                    })
                }            
            
            </SafeAreaView> 
        </ScrollView>
    )
};

export default RequestScreen;

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 20,
    },
    joinedTitle: {
        marginTop: 20,
        paddingHorizontal: 10,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: '#7FFFD4',
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    }
})