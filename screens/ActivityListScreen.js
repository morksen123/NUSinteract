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


    function leaveActivityHandler() {

        // const { error, data } = await supabase
        //      .from('joinActivity')
        //      .delete()
        //      .match({ user_id: user.id, activity_id: key })
        
        // console.log({ error, data }); 

        return;

    }

    // const hero ={
    //     name: 'Batman'
    // };

    // function testfunction() {
    //     console.log(data)
    //     console.log(data[0])
    //     console.log(hero)
    //     console.log(hero.name)
    //     console.log(typeof hero)
    //     console.log(data[0]['hostActivity']['activity_details']['title'])
    // }

    //data is an array of objects

    if (!data) {
        return (
            <View style = {styles.container}>
                <Text> List Of Joined Activities </Text>
                <Text> You have not joined any activities yet! </Text>               
            </View>
        )
 
    }


    return (
        // <View style = { {flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //     <Text> Hello </Text>
        // </View>

        
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style ={styles.title}>
                        <Text> List Of Joined Activities </Text>
                        <Text> You have not joined any activities yet! </Text>
                    </View>

                    <View>
                        {data.map((activity) => (

                            <View styles={styles.activity}> 
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
        </ScrollView>  
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
    }

});