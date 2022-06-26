import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import OutlinedButton from '../components/Buttons/OutlinedButton';

const ActivityListScreen = () => {
    
    const { user } = useContext(UserContext);

    const [data, setData] = useState()

    useEffect(() => {
        const getData = async () => {
            const { error, data } = await supabase
                .from('joinActivity')
                .select(`
                    activity_id,
                    hostActivity (
                        activity_details
                    )
                `)
                .eq('user_id', user.id)

                console.log({ error, data })

                setData(data)
        }

        getData();

    }, [])


    // async function leaveActivityHandler() {

    //     const { error, data } = await supabase
    //          .from('joinActivity')
    //          .delete()
    //          .match({ user_id: user.id, activity_id: key })
        
    //     console.log({ error, data }); 

    // }

    return (

        data ? 
        
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style ={styles.title}>
                        <Text> List Of Joined Activities </Text>
                    </View>
                     
                    <View>

                        {data.map((activity) => (

                            <View styles={styles.activity} key={activity.activity_id}> 
                                <View style={styles.paddingTop}>
                                    <Text> 
                                        Activity Title: {activity.hostActivity.activity_details.title} 
                                    </Text>
                                </View>

                                <View> 
                                    <Text> 
                                        Time: {activity.hostActivity.activity_details.time} 
                                    </Text>
                                </View>

                                <View>
                                    <Text> 
                                        Details: {activity.hostActivity.activity_details.details} 
                                    </Text>
                                </View>

                                <View style= {styles.paddingBottom}>
                                    <Text> 
                                        Location: {activity.hostActivity.activity_details.location_details} 
                                    </Text>
                                </View>

                                <OutlinedButton 
                                    icon="log-out-outline" 
                                    onPress={leaveActivityHandler}
                                > 
                                    Leave Activity 
                                </OutlinedButton>
                        
                            </View>

                        ))} 
                    </View> 


                </View>
            </SafeAreaView>
        </ScrollView>  : 
        <View style = {styles.flex}>
            <Text>
                hello
            </Text>
        </View>
    )
}

export default ActivityListScreen; 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        alignItems: 'center',
        justifyContent: 'center',
    
        paddingTop:10,
        paddingBottom:10

    },

    activity: {
        
        marginTop: 20,
        marginBottom: 20

    },

    paddingTop: {
        paddingTop: 30
    },

    paddingBottom: {
        paddingBottom: 30
    },

    flex: {
        flex:1
    }

});