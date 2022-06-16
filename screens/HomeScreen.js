import { Text, View, Button } from 'react-native';

import { supabase } from '../utils/supabase';

import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';


const HomeScreen = ({ navigation }) => {

    const { setUser } = useContext(UserContext);
    
    const signOutHandler = async () => {
      const { event } = await supabase.auth.signOut()
      setUser(null)
      console.log(event)
    } 
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        <Button title="Join Activity" onPress={() => navigation.navigate("Map")}/>
        <Button title="Host Activity" onPress={() => navigation.navigate("HostActivity")}/>
        <Button onPress={signOutHandler} title="Sign Out"/>
      </View>
    )
}

export default HomeScreen; 

