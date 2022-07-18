import { useState, useContext, useEffect } from "react";

import { StyleSheet, View, Text, Image } from "react-native";

import { Button } from "react-native-paper";

import { UserContext } from "../../contexts/userContext";


/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';


const PreviewProfile = ({ userProfileData, onCancelHandler }) => {

  const { users: { avatar_url, status } } = userProfileData[0];

  console.log(userProfileData)


  return (

    <View>
        <View style={styles.container}>
        <Image 
          source={{ uri: `https://aqeopdkkfhradtlezpil.supabase.co/storage/v1/object/public/${avatar_url}`}} 
          style={{width: 100, height: 100, borderRadius: 100 }} 
        />
            <Text style={styles.title}>About me </Text>
            <Text style={styles.body}>{status}</Text>
            <Button 
              onPress={onCancelHandler}
            >
              Close
            </Button>

        </View>
    </View>
  );
}

export default PreviewProfile; 


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    
    
},

  title: {
      fontSize: 20, 
      marginBottom: 5,
      fontWeight: '600',
      paddingTop: 5
  },

  body: {
    fontSize: 15,
    fontFamily: "AvenirNext-Italic",
    marginBottom: 30,
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: '400'
  },

});