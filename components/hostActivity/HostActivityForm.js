import {
    ScrollView, 
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

import { useCallback, useContext, useState } from 'react';

//import HostActivityPressable from './HostActivityPressable';
import LocationPicker from './LocationPicker';

import { UserContext } from '../../contexts/userContext';

import { supabase } from '../../utils/supabase';

import OutlinedButton from '../Buttons/OutlinedButton';

const THEME = '#3F3F3F';


const HostActivityForm = ({ onPressHandler }) => {

    const [enteredTitle, setTitle] = useState('');
    const [enteredTime, setTime] = useState('');
    const [enteredDetails, setDetails] = useState('');    
    const [pickedLocation, setPickedLocation] = useState();

    const { user } = useContext(UserContext) ;

    async function HostActivityHandler() {

        const { data, error } = await supabase
            .from('hostActivity')
            .insert([{
                user_id: user.id,
                coordinates: {
                    latitude: pickedLocation.lat, 
                    longitude: pickedLocation.lng
                },
                activity_details: {
                    title: enteredTitle,
                    time: enteredTime,
                    details: enteredDetails,  
                    location_details: pickedLocation.address,
                }
            }])

            console.log({data, error})
            onPressHandler();
    }

        
    function changeTitleHandler(enteredTitle) {
        setTitle(enteredTitle);
    }

    function changeTimeHandler(enteredTime) {
        setTime(enteredTime);
    }
    function changeDetailsHandler(enteredDetails) {
        setDetails(enteredDetails);
    }

    const pickLocationHandler = useCallback ((location) => {
        setPickedLocation(location);
    }, []);


    return (
        <ScrollView>

            <View style={styles.container}>
                <Text>
                    Activity Name
                </Text>
                <View style = {styles.pad}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='e.g MAHJONG SESSION' 
                        value={enteredTitle}
                        onChangeText={changeTitleHandler}
                        selectionColor={THEME}
                        required
                    />
                
                </View>

                <Text>
                    Time Of Activity
                </Text>
                <View style = {styles.pad}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='e.g 2pm' 
                        value={enteredTime}
                        onChangeText={changeTimeHandler}
                        selectionColor={THEME}
                    />
             
                </View>
                <Text>
                    Additional Details About Activity
                </Text>
                <View style = {styles.pad}>
                    <TextInput
                        style={styles.additionalDetails}
                        placeholder='e.g Basketball Session, 4 Pax' 
                        value={enteredDetails}
                        onChangeText={changeDetailsHandler}
                        selectionColor={THEME}
                    />

                </View>
                <Text >
                    Location Of Activity
                </Text>

                <View style = {styles.padlocation} >
                    <LocationPicker onPickLocation={pickLocationHandler}/>
                </View>

                <View style = {styles.buttons}>
                    <View style = {styles.hostActivity}>           
                        <OutlinedButton
                            icon="people-circle"
                            onPress = {HostActivityHandler}
                        >
                        Confirm Activity
                        </OutlinedButton> 
                    </View>  
                    
                    <View style = {styles.cancelActivity}>
                        <OutlinedButton
                            icon="close"
                            onPress = {onPressHandler}
                        >
                            Cancel Form
                        </OutlinedButton> 
                    </View>

                </View>

            </View>
        </ScrollView>

    )
}

export default HostActivityForm; 

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        
    },

    pad: {
        paddingTop:10,
        paddingBottom:10,
        width: "100%"
    },

    padlocation: {
        paddingTop:10,
        width: "100%"
    },

    textInput: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 40, 
        paddingHorizontal: 8, 
        marginBottom: 10
    },

    additionalDetails: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: THEME, 
        borderRadius: 4, 
        width: '80%',
        height: 80, 
        paddingHorizontal: 8, 
        marginBottom: 10

    },

    buttons : {
        flexDirection:'row',

    },

    hostActivity:{
        marginRight: 16

    },

    cancelActivity:{
        //marginRight:
    }

});