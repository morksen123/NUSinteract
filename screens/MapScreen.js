import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';



const MapScreen = ({navigation}) => {

    const [data, setData] = useState([])

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            const { error, data } = await supabase
                .from('hostActivity')
                .select('*')
        
                // console.log(data)
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

    function onPressMarkerHandler(activityID) { 
        
        //join activity handler
        const joinActivity = async () => {
        
            const { data, error } = await supabase
                .from('joinActivity')
                .insert([{
                    'user_id': user.id,
                    'activity_id': activityID
                }])
        }

        joinActivity()

        navigation.navigate("Activities")
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
