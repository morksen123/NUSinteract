import { Text, View, Button, Alert } from 'react-native';
import { supabase } from '../utils/supabase';


const HomeScreen = ({ navigation }) => {

    const signOutHandler = async () => {
      const { event } = await supabase.auth.signOut()
      console.log(event)
      navigation.navigate("SignIn")
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

