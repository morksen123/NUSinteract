import { Image, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/Buttons/OutlinedButton';


const HomeScreen = ({ navigation }) => {
    
    return (
      <View style={styles.container}>

        <View style = {styles.top}>
        
            <View style = {styles.topimage}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{width: 200, height: 220, left: 17, borderWidth: 3}}
                />
            </View>
        
        </View>


        <View style={styles.mid}>
          <Text style={styles.title}>You Host, I Join!</Text>
        </View>
        

        <View style = {styles.bottom}>
          <Text style={{fontSize: 16}}> Press any activity bubble on the map to join an activity! </Text>

          <View style = {styles.buttonActivities}>
            <OutlinedButton icon="person-add" onPress={() => navigation.navigate("Map")}>Join Activity </OutlinedButton>
          </View>

          <Text style={{fontSize: 16}}> Fill up the activity details form to host an activity! </Text>
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
    backgroundColor: 'white'
  },

  top:{
    flex: 4,
    flexDirection: 'row',
 
  },

  topimage:{
    flex: 10,
    marginTop: 110,
    marginLeft: 95,

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
    marginBottom: 30,
    flex:4
  },

  buttonActivities: {
    paddingTop:10,
    paddingBottom:10,

  },

  title: {
    marginTop: 20,
    paddingHorizontal: 10,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#81ebe0",
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

