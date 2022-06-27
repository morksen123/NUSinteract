
import { Button, StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import OutlinedButton from '../components/Buttons/OutlinedButton';

const ActivityListScreen = () => {
    
    const { user } = useContext(UserContext);


    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from('joinActivity')
                .select(`
                    activity_id,
                    hostActivity (
                        activity_details
                    )
                `)
                .eq('user_id', user.id)

                setData(data)
        }

        getData();

    }, [])


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
        
        <ScrollView style = {styles.bg}>
            <SafeAreaView>
                <View style={styles.container}>
                    
                    <Text style ={styles.title}> Joined Activities </Text>
                    

                    <View>
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
                                    onPress={() => leaveActivityHandler(activity['activity_id'])}
                                > 
                                    Leave Activity 
                                </OutlinedButton>
                        
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

    bg:{
        backgroundColor:"#b1f2ff" 
    },

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    title: {
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 20,
        //paddingVertical: 30,
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

    },

    activity: {
        
        marginTop: 10,
        marginBottom: 10,
        

    },

    activitybubble:{
        //alignItems: 'center',
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

    paddingTop: {
        paddingTop: 10
    },

    paddingBottom: {
        paddingBottom: 10
    }

});