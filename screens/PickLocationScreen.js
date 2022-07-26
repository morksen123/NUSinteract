import { Alert, Text, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/Buttons/IconButton';


/**
 * 
 * @returns a screen that allows users to choose where they want to host their activity
 */
const PickLocationScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState();

    const region = {
        latitude: 1.29692,  //preview of NUS MAP
        longitude: 103.77651 ,
        latitudeDelta: 0.00837,
        longitudeDelta: 0.01984

    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat:lat, lng:lng});
    }
    

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'No Location Picked!', 
                'Please pick an activity location by tapping on the map before saving.'
            );
            return;
        }
        
        
        navigation.navigate('HostActivity', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton 
                    icon = "save"
                    size = {24}
                    color = {tintColor}
                    onPress = {savePickedLocationHandler}
                />
            ),
        });
    }, [navigation, savePickedLocationHandler]);
    
    

    return (

        <MapView 
            style = {styles.map}
            initialRegion = {region}
            onPress = {selectLocationHandler}
        >
            {selectedLocation && (  //if user tapped on map, will have red icon marker
            <Marker
                title = "Picked Location" 
                coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} /> )}
        
        </MapView>
    );
}

export default PickLocationScreen;

const styles = StyleSheet.create({
    map: {
        flex:1
    }

});
