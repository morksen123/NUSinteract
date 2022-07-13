import React, { useState, useContext, useEffect } from 'react';

import {StyleSheet, Image, View, Alert, Text } from 'react-native';

import { supabase } from '../../utils/supabase';

import * as ImagePicker from 'expo-image-picker';

import { UserContext } from '../../contexts/userContext';

import OutlinedButton from '../Buttons/OutlinedButton';


/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';
import { ActivityIndicator } from 'react-native-paper';

const Avatar = ({ data }) => {

  const [avatarUrl, setAvatarUrl] = useState(data[0].avatar_url);
  const [loading, setLoading] = useState(true)

  const { user } = useContext(UserContext);


  /*
  ** Allows picking of image from photo gallery
  */
  const pickImage = async () => {

    setLoading(true)
      
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let avatarUrl = '';
    // uploads image to supabase storage if there's no error with imagePicker
    if (!result.cancelled) {

      alert('Uploading Profile Picture...')

      const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);

      const fileName = result.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
          uri: result.uri,
          name: fileName, 
          type: result.type ? `image/${ext}` : `video/${ext}`,
      })

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, formData)

      if (data) {
        setAvatarUrl(data.Key); 
        avatarUrl = data.Key
      }

      setLoading(false)
    }
    
    // updates avatarUrl associated with profile 
    const { data, error } = await supabase.from('users').upsert({
        id: user.id, 
        avatar_url: avatarUrl
    })

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {
        <View>
         {loading &&

         <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
          /> }

          <Image 
            source={{ uri: `https://aqeopdkkfhradtlezpil.supabase.co/storage/v1/object/public/${avatarUrl}`}} 
            style={{width: 200, height: 200, borderRadius: 200 / 2}} 
            onLoad={() => setLoading(false)}
          />
          
        </View>
          
      }

      <View style={styles.button}>
        <OutlinedButton icon="person-circle" onPress={pickImage}>Choose Profile Picture</OutlinedButton>
        <Text style={styles.username}>{user.user_metadata.username} </Text> 
      </View>

    </View>
  );
}

export default Avatar;


const styles = StyleSheet.create({

  button:{
    marginTop: 10
  },

  username : {
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600'
  },

});