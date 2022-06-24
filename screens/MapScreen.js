import { StyleSheet, Text, View } from 'react-native';


import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';



const MapScreen = () => {
    const region = {
        latitude: 1.29692,  //preview of NUS MAP
        longitude: 103.77651 ,
        latitudeDelta: 0.00837,
        longitudeDelta: 0.01984
    };

    // TO BE REPLACED BY FETCHED DATE FROM DATABASE
    const DEMODATA = { appusers: [
        {id: 1, user: "A", time: "2pm", additionaldetails: "AAAA", location: {lat: 1.29493165020572, lng: 103.7736465889889}, address: "SOC" },
        {id: 2, user: "B", time: "10am", additionaldetails: "BBBB", location: {lat: 1.3001989691076348 , lng: 103.77361624622463}, address: "Raffles Hall" },
        {id: 3, user: "C", time: "5pm", additionaldetails: "CCCC", location: {lat: 1.2929022143422442, lng: 103.77134573197812}, address: "Temasek Hall" }

    ]};


   // TO BE REPLACED BY FETCHED DATE FROM DATABASE
    this.state = {
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
           {this.state.markers.map((marker,index) => (
                <MapView.Marker
                key = {index} 
                coordinate={marker.coordinates}
                title={marker.title}
                description = {marker.additionaldetails}
                />
            ))}
        </MapView>  
    )
}

export default MapScreen;


const styles = StyleSheet.create({
    map: {
        flex:1
    }

});
