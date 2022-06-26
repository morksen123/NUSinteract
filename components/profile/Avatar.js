import React, { useState, useContext, useEffect } from 'react';

import { Button, Image, View, Alert, Text } from 'react-native';

import { supabase } from '../../utils/supabase';

import * as ImagePicker from 'expo-image-picker';

import { UserContext } from '../../contexts/userContext';

/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState(""); 

  const { user } = useContext(UserContext);

  // Loads existing profile picture in database
  useEffect(() => {
    const getData = async () => {
        const { data } = await supabase
            .from('users')
            .select('avatar_url')
            .eq('id', user.id) 

        // let a = data; 
        data.map((avatar) => setAvatarUrl(avatar.avatar_url))
        console.log(data)
    }
    
    getData()

}, [])


  const pickImage = async () => {
      
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // uploads image to supabase storage if there's no error with imagePicker
    if (!result.cancelled) {

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

      if (error) {
          Alert.alert(error.message);
      } else {
          setAvatarUrl(data.Key); 
      }
    }
    
    // updates avatarUrl associated with profile 
    const { data, error } = await supabase.from('users').upsert({
        id: user.id, 
        avatar_url: avatarUrl
    })

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Choose Profile Picture" onPress={pickImage} />
        {<Image 
          source={{ uri: `https://aqeopdkkfhradtlezpil.supabase.co/storage/v1/object/public/${avatarUrl}`}} 
          style={{width: 200, height: 200, borderRadius: 200 / 2}} 
          />}
    </View>
  );
}

export default Avatar;