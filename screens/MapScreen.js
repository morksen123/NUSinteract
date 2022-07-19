import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';


const MapScreen = () => {

    const [data, setData] = useState([])
    const [queryIfJoinedData, setQueryIfJoinedData] = useState(null)

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            const { error, data } = await supabase
                .from('hostActivity')
                .select('*')
                setData(data)
        }

        getData();

    }, [])


    const region = {
        latitude: 1.29692,  //preview of NUS MAP
        longitude: 103.77651 ,
        latitudeDelta: 0.00837,
        longitudeDelta: 0.01984
    };

    // joins the activity in supabase
    const joinActivity = async (activityID) => {
        const { data, error } = await supabase
            .from('joinActivity')
            .insert([{
                'user_id': user.id,
                'activity_id': activityID
            }])

            
            error ? alert(error.message) : alert('Success!')
    }

    const checkIfActivityJoined = async (activityID) => {
        const { data, error } = await supabase
            .from('joinActivity')
            .select('*')
            .match({ user_id: user.id, activity_id: activityID})
            
            setQueryIfJoinedData(data)
    }

    function onPressMarkerHandler(activityID) { 

        checkIfActivityJoined(activityID);
        console.log(queryIfJoinedData)

        if (queryIfJoinedData === null) {
            joinActivity(activityID);
        } else {
            alert('You have already joined the activity')
        }
    }

    return (
        <MapView 
            style={styles.map}
            initialRegion = {region}
            provider = {PROVIDER_GOOGLE}
        >
           {data.map((marker) => (

                <Marker
                    key={marker.activity_id} 
                    coordinate={marker.coordinates}
                >
                    <Callout tooltip onPress={() => onPressMarkerHandler(marker.activity_id)}>
                        <View style={styles.bubble}>
                            <Text>{marker.activity_details.title}</Text>
                            <Text>{marker.activity_details.time}</Text>
                            <Text>{marker.activity_details.location_details}</Text>
                            <Text>{marker.activity_details.details}</Text> 
                            <Text style={{fontWeight: '700'}}>Tap To Join</Text> 
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>  
    )
}

export default MapScreen;


const styles = StyleSheet.create({
    map: {
        flex:1
    },

    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        borderColor: 'blue'
    },
});
