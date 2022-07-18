
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import OutlinedButton from '../components/Buttons/OutlinedButton';

import CustomModal from '../components/Dialog/CustomModal';

import { useIsFocused } from '@react-navigation/native';

const ActivityListScreen = () => {
    
    const { user } = useContext(UserContext);
    
    const [data, setData] = useState(null)
    const [showModal, setShowModal] = useState(false)

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

        // console.log({ error, data }); 
        const temp = data.filter((activity) => activity['activity_id'] !== key)
        setData(temp);
        deleteData()  
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

                                <OutlinedButton 
                                    icon="log-out" 
                                    onPress={() => setShowModal(true)}
                                > 
                                    Leave Activity 
                                </OutlinedButton>

                                {
                                    showModal &&

                                    <CustomModal
                                        onDoneHandler={() => leaveActivityHandler(activity['activity_id'])}
                                        onCancelHandler={() => setShowModal(false)}
                                        body={'Are you sure you want to leave this activity?'}
                                        title={'Leave Activity'}
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
        backgroundColor: '#7FFFD4',
        color: "#20232a",
        textAlign: "center",
        fontSize: 27,
        fontWeight: "bold",
        fontFamily: "AvenirNext-Italic",
    },

    hostTitle: {
        marginTop: 20,
        paddingHorizontal: 10,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: '#F1836C',
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
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
        backgroundColor: '#7FFFD4',
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