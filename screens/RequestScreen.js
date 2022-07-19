import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';

import { useContext, useState } from 'react';

import RequestCard from '../components/hostActivity/RequestCard';
import ProfileModal from '../components/profile/ProfileModal';

import { RequestContext } from '../contexts/requestContext';



const RequestScreen = () => {

    const { requestsData } = useContext(RequestContext)
    const [showModal, setShowModal] = useState(false)


    return (
        <ScrollView> 
            <SafeAreaView>

                { 
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
        backgroundColor: '#7FFFD4',
        color: "#20232a",
        textAlign: "center",
        fontSize: 27,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    }
})