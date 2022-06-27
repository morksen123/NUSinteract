import * as React from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import HostActivityForm from '../components/hostActivity/HostActivityForm';
import { Text,View, StyleSheet } from 'react-native';
import OutlinedButton from '../components/Buttons/OutlinedButton';

const HostActivityScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  //const containerStyle = {backgroundColor: 'white', padding: 20, flex: 1};

  return (
    <View style = {styles.container}>
      <Provider>
        <Portal>
          <Modal visible={visible} contentContainerStyle={styles.formContainer}>
            <HostActivityForm 
              onPressHandler={hideModal}
            />
          </Modal>
        </Portal>

        <Text style = {styles.categoryTitle}> Category Of Activity </Text>
        <Text style = {styles.captionTitle1}> Select the category of activity you are hosting! </Text>
        <Text style = {styles.captionTitle2}> Then fill up the activity details form! </Text>
        <View style = {styles.buttons}>
          
          <OutlinedButton icon="library" onPress={showModal}>Study </OutlinedButton>
          <OutlinedButton icon="restaurant" onPress={showModal}>Meal </OutlinedButton>
          <OutlinedButton icon="tennisball" onPress={showModal}>Entertainment</OutlinedButton>

        </View>


      </Provider>
    </View>

  );
};

export default HostActivityScreen; 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#b1f2ff",
    
  },

  formContainer: {
    backgroundColor: 'white', padding: 20, flex: 1

  },

  captionTitle1:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:100,
      paddingLeft:40,
      //paddingBottom:0,

  },

  captionTitle2:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    paddingLeft:70,
    //paddingBottom:0,

},

  categoryTitle:{
      //alignItems: 'center',
      //justifyContent: 'center',

      marginTop: 50,
      //paddingVertical: 30,
      paddingHorizontal: 10,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: '#7FFFD4',
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      fontFamily: "AvenirNext-Italic",

  },
  buttons:{
    flexDirection:'column',
    marginTop: 70
    //alignItems:'center',
    //justifyContent:'center'
  }

  
});
