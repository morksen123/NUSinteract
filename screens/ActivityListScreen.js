import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import OutlinedButton from '../components/Buttons/OutlinedButton';
import DeleteActivityButton from '../components/Buttons/DeleteActivityButton';

import CustomModal from '../components/Dialog/CustomModal';

import { useIsFocused } from '@react-navigation/native';

const ActivityListScreen = () => {
    
    const { user } = useContext(UserContext);
    
    const [data, setData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from('joinActivity')
                .select(`
                    activity_id,
                    accepted,
                    hostActivity (
                        activity_details
                    )
                `)
                .eq('user_id', user.id)
                
                const filteredData = data.filter((activity) => activity.accepted === 'true')
                setData(filteredData)
        }

        getData();

    }, [isFocused])


    function leaveActivityHandler(key) {

        const deleteData = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .delete()
                .match({ user_id: user.id, activity_id: key })
        }

        const temp = data.filter((activity) => activity['activity_id'] !== key)
        setData(temp);
        deleteData()  
    }

    // function allows host to delete activities
    const deleteActivity = async (activityID) => {
        deleteAllMessages(activityID);
        removeUsersFromActivity(activityID)
        deleteHostAcitivtyData(activityID)

        const temp = data.filter((activity) => activity['activity_id'] !== activityID)
        setData(temp);
        
    }

    const deleteHostAcitivtyData = async (activityID) => {
        const { data, error } = await supabase
        .from('hostActivity')
        .delete()
        .match({ activity_id: activityID })
    }
    
    // function to remove users fronm joined activity
    const removeUsersFromActivity = async (activityID) => {
        const { data, error } = await supabase  
          .from('joinActivity')
          .delete()
          .match({ activity_id: activityID })

          error ? alert(error.message) : null
    }

    // function to remove all messages in chat room
    const deleteAllMessages = async (activityID) => {
        const { data, error } = await supabase  
          .from('messages')
          .delete()
          .match({ room_id: activityID })

          error ? alert(error.message) : null
    }

    /*
    ** returns a button that allows the removal of activities if 
    ** the activity shown is hosted by the user logged in
    */
    const checkIfActivityHost = (activity) => {
        if (activity.user_id === activity.hostActivity.user_id) {
            return (
                <DeleteActivityButton
                    onPress={() => setShowDeleteModal(true)}
                > 
                    Delete Activity 
                </DeleteActivityButton>
        )} else {
            return (
                <OutlinedButton 
                    icon="log-out" 
                    onPress={() => setShowModal(true)}
                > 
                    Leave Activity 
                </OutlinedButton>
        )}   
    }


    if (!data) {
        return (
            <View style = {styles.container}>
                <Text> List Of Joined Activities </Text>
                <Text> You have not joined any activities yet! </Text>               
            </View>
        )
    } 


    return (
        
        <ScrollView>
            <SafeAreaView>

                <View style={styles.container}>
                    <View>
                        <Text style ={styles.joinedTitle}> Joined Activities </Text>
                        {data.map((activity) => (

                            <View styles={styles.activity} key={activity['activity_id']}>
                                <View style= {styles.activitybubble}> 
                                    <View style={styles.paddingTop}>
                                        <Text> 
                                            Activity Title: {activity['hostActivity']['activity_details']['title']} 
                                        </Text>
                                    </View>

                                    <View> 
                                        <Text> 
                                            Time: {activity['hostActivity']['activity_details']['time']} 
                                        </Text>
                                    </View>

                                    <View>
                                        <Text> 
                                            Details: {activity['hostActivity']['activity_details']['details']} 
                                        </Text>
                                    </View>

                                    <View style= {styles.paddingBottom}>
                                        <Text> 
                                            Location: {activity['hostActivity']['activity_details']['location_details']} 
                                        </Text>
                                    </View>
                                </View>

                                {checkIfActivityHost(activity)}

                                {
                                    showModal &&

                                    <CustomModal
                                        onDoneHandler={() => leaveActivityHandler(activity['activity_id'])}
                                        onCancelHandler={() => setShowModal(false)}
                                        body={'Are you sure you want to leave this activity?'}
                                        title={'Leave Activity'}
                                    />

                                }

                                {
                                    showDeleteModal && 

                                    <CustomModal
                                        onDoneHandler={() => deleteActivity(activity['activity_id'])}
                                        onCancelHandler={() => setShowDeleteModal(false)}
                                        body={'This activity will be deleted'}
                                        title={'Delete Activity'}
                                    />
                                }
                                
                            </View>
                        ))}
                    </View>
                </View> 
            </SafeAreaView>
        </ScrollView>  
     )
}

export default ActivityListScreen; 


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    joinedTitle: {
        marginTop: 5,
        paddingHorizontal: 10,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: '#81ebe0',
        color: "#20232a",
        textAlign: "center",
        fontSize: 27,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    },

    activity: {
        marginTop: 10,
        marginBottom: 10,   
    },

    activitybubble:{
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: '#81ebe0',
        paddingHorizontal: 10
    },

    formContainer: {
        backgroundColor: 'white', padding: 20, flex: 1,

    },

    paddingTop: {
        paddingTop: 10
    },

    paddingBottom: {
        paddingBottom: 10
    }

});