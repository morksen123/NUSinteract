import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { supabase } from '../utils/supabase';

import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

import OutlinedButton

const HomeScreen = ({ navigation }) => {

    const { user, setUser } = useContext(UserContext);
    
    const signOutHandler = async () => {
      const { event } = await supabase.auth.signOut()
      setUser(null)
      console.log(event)
    } 
    
    return (
      <View style={styles.container}>
        <View style = {styles.titlecontainer}>
          <Text style = {styles.title}>Welcome to NUSinteract</Text>
        </View>
        
        <View style = {styles.buttonContainer}>
          <OutlinedButton icon="duplicate-outline" onPress={() => navigation.navigate("Map")}>Join Activity </OutlinedButton>
          <OutlinedButton icon="body-outline" onPress={() => navigation.navigate("HostActivity")}>Host Activity</OutlinedButton>
          <OutlinedButton icon= "exit-outline" onPress={signOutHandler}>Sign Out</OutlinedButton>
        </View>
      </View>
    )
}


export default HomeScreen; 


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  
  titlecontainer: {
    flex: 2,
    padding: 15,
    //backgroundColor: "#eaeaea",
    alignItems:"center",
    justifyContent: "center"
    
  },
    


  title: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"

  },

  buttonContainer: {
    flex: 7,
    alignItems:"center",
    justifyContent: "center"

  }
}
