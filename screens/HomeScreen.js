import {Image, StyleSheet, Text, View, Button, Alert } from 'react-native';

import { supabase } from '../utils/supabase';

import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

import OutlinedButton from '../components/Buttons/OutlinedButton';
import IconButton from '../components/Buttons/IconButton';

const HomeScreen = ({ navigation }) => {

    const { user, setUser } = useContext(UserContext);
    
    const signOutHandler = async () => {
      const { event } = await supabase.auth.signOut()
      setUser(null)
      console.log(event)
    } 

    function helpHandler() {};
    
    return (
      <View style={styles.container}>


        <View style = {styles.top}>
        
            <View style = {styles.topimage}>
                <Image
                    source = {require('../assets/logo.png')}
                    style = {{width: 200, height: 220, bottom: 15}}
                />
            </View>
          

          <View style = {styles.topbuttons} >
          
            
            <IconButton icon= "log-out" onPress={signOutHandler}  size = {30} colour= "black"  />
            <IconButton icon= "help-outline" onPress={helpHandler}  size = {30} colour= "black"  />
            
              

          </View>
        </View>

        

        <View style = {styles.mid}>
          <Text style = {styles.title}>NUSinteract</Text>
        </View>
        

        <View style = {styles.bottom}>
          <Text> Press any activity bubble on the map to join an activity! </Text>

          <View style = {styles.buttonActivities}>
            <OutlinedButton icon="person-add" onPress={() => navigation.navigate("Map")}>Join Activity </OutlinedButton>
          </View>

          <Text> Fill up the activity details form to host an activity! </Text>
          <View style = {styles.buttonActivities}>
            <OutlinedButton icon="people" onPress={() => navigation.navigate("HostActivity")}>Host Activity</OutlinedButton>
          </View>

        </View>


    </View>
    )
}


export default HomeScreen; 


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#b1f2ff"
  },

  top:{
    flex: 4,
    flexDirection: 'row',
 
  },

  topimage:{
    flex: 10,
    marginTop: 110,
    marginLeft: 95,
    //alignItems:'center',
    //justifyContent:'center',
    //flexDirection:'row'
  },
  topbuttons:{
    flex:2.5,
    marginTop: 80,
    marginRight:1,
    
  },

  mid: {
    marginTop: 100,
    flex:3
  },
  bottom:{
    //alignItems: 'center',
    //justifyContent:'center',
    marginTop: 10,
    flex:4
  },

  buttonActivities: {
    paddingTop:10,
    paddingBottom:10,

  },


  title: {
    marginTop: 20,
    //paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#FFb347",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "AvenirNext-Italic",

  },

  buttonContainer: {
    flex: 7,
    alignItems:"center",
    justifyContent: "center"

  }
});

