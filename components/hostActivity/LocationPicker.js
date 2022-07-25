import { useEffect, useState} from 'react';
import { Image, Text, Alert, View, StyleSheet} from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getAddress, getMapPreview } from '../map/location';

import OutlinedButton from '../Buttons/OutlinedButton';

function LocationPicker({onPickLocation}) {
    const navigation = useNavigation();
    const route = useRoute();

    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused(); //false when you enter PickLocationScreen, true when this component is in a screen which has it(when come back from PickLocationScreen)

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();



    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({...pickedLocation, address:address });
            }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation]);


    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED || locationPermissionInformation.status === PermissionStatus.DENIED ){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('PickLocation');
    }

    let locationPreview = <Text> No Location Picked Yet </Text>; 
    if (pickedLocation) {
       locationPreview = ( 
            <Image
                style = {styles.image} 
                  source = {{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                 }} 
            />
    
        );
    }

    return( 
        <View>
            <View style = {styles.mapPreview}>
                {locationPreview}
            </View>
            <View style = {styles.actions}>
                <OutlinedButton icon = "location" onPress={getLocationHandler}> Your Location </OutlinedButton>
                <OutlinedButton icon = "map" onPress = {pickOnMapHandler}> Pick Location</OutlinedButton>
            </View> 
            
        </View>
    );

}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    actions: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10
    },
    image: {
        width: '100%',
        height: '100%'
    }

});