import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';

import { useContext, useState, useEffect } from 'react';

import RequestCard from '../components/hostActivity/RequestCard';
import ProfileModal from '../components/profile/ProfileModal';

import { supabase } from '../utils/supabase';

import { UserContext } from '../contexts/userContext';
import { RequestContext } from '../contexts/requestContext';

import { ActivityIndicator } from 'react-native-paper';



const RequestScreen = () => {

    const { user } = useContext(UserContext)
    const { requestsData, setRequestsData } = useContext(RequestContext)
    
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const getRequestsData = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .select('*, hostActivity!inner(*), users!joinActivity_user_id_fkey(username, avatar_url, status)')
                .eq('hostActivity.user_id', user.id )
                .eq('accepted', 'pending')  
          
            setRequestsData(data)
            setLoading(false)
        }
    
          getRequestsData(); 
    
    }, [])
    


    return (
        <ScrollView> 
            <SafeAreaView>

                { 
                    loading ? <ActivityIndicator/> : 

                    showModal && 
                    <ProfileModal
                        userProfileData={requestsData}  
                        onCancelHandler={() => setShowModal(false)}
                    />
                }

                <Text style={styles.joinedTitle}>REQUESTS TO JOIN MY ACTIVITIES</Text>
                
                { 
    
                    requestsData.map((activity) => {

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
        backgroundColor: '#81ebe0',
        color: "#20232a",
        textAlign: "center",
        fontSize: 27,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    }
})