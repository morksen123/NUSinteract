import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../components/messages/inboxStyle';

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

const InboxScreen = ({ navigation }) => {

  const { user } = useContext(UserContext);

  const [InboxChatData, setInboxChatData] = useState(null)

  // useEffect(() => {

  //   const getListOfRoomsData = async () => {
  //     const { error, data } = await supabase 
  //       .from('joinActivity')
  //       .select(`
  //         activity_id,
  //         messages(content, created_at),
  //         users!joinActivity_user_id_fkey(username, avatar_url),
  //         hostActivity(activity_details)
  //         `)
  //       .match({ user_id: user.id, accepted: true })

  //     console.log({ error, data})  
      
  //     setInboxChatData(data)
  //   }
  //   getListOfRoomsData(); 

  // }, [])

  useEffect(() => {

    const getListOfRoomsData = async () => {
      const { error, data } = await supabase 
        .from('hostActivity')
        .select(`
          activity_details,
          users!hostActivity_user_id_fkey(avatar_url),
          joinActivity!inner(activity_id),
          messages!inner(content, created_at)
        `)
        .order('created_at', { foreignTable: 'messages', ascending: false})
        .eq('joinActivity.user_id', user.id)
        .eq('joinActivity.accepted', 'true')
      
      setInboxChatData(data)
    }
    getListOfRoomsData(); 

  }, [])


    return (
      <Container>
        <FlatList 
          data={InboxChatData}
          keyExtractor={item=>item.joinActivity[0].activity_id}
          renderItem={({item}) => (
            
            <Card 
              onPress={() => 
                navigation.navigate('Messages',
                  {
                    name: `${item.activity_details.title} Chatroom`,
                    activity_id: item.joinActivity[0].activity_id
                  })}
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg 
                    source={{ uri: `https://aqeopdkkfhradtlezpil.supabase.co/storage/v1/object/public/${item.users.avatar_url}`}}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>
                      {item.activity_details.title}
                    </UserName>
                    <PostTime>
                      {new Date(item.messages[0].created_at).toLocaleString()}
                    </PostTime>
                  </UserInfoText>
                  <MessageText>{item.messages[0].content}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});