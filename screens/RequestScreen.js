import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';

import { supabase } from '../utils/supabase';

import { useContext, useState, useEffect } from 'react';

import RequestCard from '../components/hostActivity/RequestCard';
import ProfileModal from '../components/profile/ProfileModal';

import { UserContext } from '../contexts/userContext';

import { ActivityIndicator } from 'react-native-paper';
import { NotificationContext } from '../contexts/notificationContext';


const RequestScreen = () => {

    const { user } = useContext(UserContext);

    const [hostActivityData, setHostActivityData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const { setNotiCount } = useContext(NotificationContext);

    useEffect(() => {

        const getHostActivityData = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .select('*, hostActivity!inner(*), users!joinActivity_user_id_fkey(username, avatar_url, status)')
                .eq('hostActivity.user_id', user.id )
                .eq('accepted', 'pending')  

            
            setNotiCount(hostActivityData.length)
            setHostActivityData(data)
            setLoading(false)
        }

        getHostActivityData() 

    }, [])

    return (
        <ScrollView> 
            <SafeAreaView>

                { 
                    showModal && 
                    <ProfileModal
                        userProfileData={hostActivityData}  
                        onCancelHandler={() => setShowModal(false)}
                    />
                }

                <Text style={styles.joinedTitle}>REQUESTS TO JOIN MY ACTIVITIES</Text>
                
                { 
                    loading ? <ActivityIndicator animating={true} color='red'/> : 

                    hostActivityData.map((activity) => {

                        const { 
                            activity_id,
                            user_id,
                            hostActivity: { activity_details },
                            users,
                            id 
                        } = activity;

                        return (
                            <RequestCard
                                key={id}
                                id={activity.id}
                                user={users}
                                title={activity_details.title}
                                userID={user_id}
                                activityID={activity_id}
                                hostActivityData={hostActivityData}
                                setHostActivityData={setHostActivityData}
                                setShowModal={setShowModal}                  
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
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: '#7FFFD4',
        color: "#20232a",
        textAlign: "center",
        fontSize: 27,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    }
})