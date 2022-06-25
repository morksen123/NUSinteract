import { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';


const MapScreen = () => {

    const [data, setData] = useState([])

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            const { error, data } = await supabase
                .from('hostActivity')
                .select('*')
        
                console.log(data)
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

    const onPressMarkerHandler = async (activityID) => {
        
        let { data, error } = await supabase
            .from('joinActivity')
            .insert([{
                'user_id': user.id,
                'activity_id': activityID
            }])
        console.log({data, error})
        
    }


   // TO BE REPLACED BY FETCHED DATE FROM DATABASE
    const state = {
        markers: [{
            user: "A",
            time: "2pm",
            title: 'STUDY BUDDY NEEDED AT SOC!!',
            additionaldetails: "FINDING A STUDY BUDDY TO TEACH ME BT2102 CAUSE TA DESTROYED ME IN MY GRADES :(  ",
            address: "SOC", 
            coordinates: {
                latitude: 1.29493165020572,
                longitude: 103.7736465889889
            },
        },

        {   user: "B",
            time: "10pm",
            title: 'MAHJONG SESSION AT RAFFLES HALL',
            additionaldetails: "10PM MAHJONG SESSION, 1 MORE PAX NEEDED! MAHJONG KAKIS WHERE YOU AT! ",
            address: "RAFFLES HALL", 
            coordinates: {
                latitude: 1.3001989691076348,
                longitude: 103.77361624622463
            },  
        },
        {   user: "C",
            time: "12pm",
            title: 'FINDING SOMEONE TO EAT WITH',
            additionaldetails: "Im heading out for lunch nearby PGPR, finding 1 or 2 lunch kakis!",
            address: "PGPR", 
            coordinates: {
                latitude: 1.291294212675484, 
                longitude: 103.77981260199456
            },  
        },

        {   user: "D",
            time: "5pm",
            title: 'BASKETBALL MATCH 2PAX NEEDED',
            additionaldetails: "We are hosting a 4v4 baskeball match, 2 MORE PAX NEEDED! Join us if you have some free time to play!",
            address: "NUS Basketball Court", 
            coordinates: {
                latitude: 1.300113122265099, 
                longitude: 103.77702049650675
            },  
        },

        {   user: "E",
            time: "10pm",
            title: 'CARD GAMES AT TEMASEK HALL',
            additionaldetails: "CARD GAME AT TEMASEK HALL, WE ARE PLAYING BLACKJACK, 2 MORE PAX NEEDED",
            address: "TEMASEK HALL", 
            coordinates: {
                latitude: 1.2929022143422442,
                longitude: 103.77134573197812
            },  
        }]
      }


    return (
        <MapView 
            style={styles.map}
            initialRegion = {region}
            provider = {PROVIDER_GOOGLE}
        >
           {data.map((marker,index) => (

                <Marker
                    key={marker.activity_id} 
                    coordinate={marker.coordinates}
                    title={marker.activity_details.title}
                    description = {marker.activity_details.details}
                >
                    <Callout tooltip onPress={() => onPressMarkerHandler(marker.activity_id)}>
                        <View style={styles.bubble}>
                            <Text>{marker.activity_details.title}</Text>
                            <Text>{marker.activity_details.time}</Text>
                            <Text>{marker.activity_details.location_details}</Text>
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
    }

});
