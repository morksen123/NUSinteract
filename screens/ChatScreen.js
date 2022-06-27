import React, { useState, useCallback, useEffect, useContext } from 'react'

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('')

  const { user } = useContext(UserContext)

  

  useEffect(() => {
    const getData = async () => {
        const { data } = await supabase.from('messages').select('*')
        let messageData = data

        setMessages(messageData.map(doc => ({
            _id: doc.id,
            text: doc.content,
            createdAt: doc.created_at,
            user: { 
                _id: doc.user_id,
                name: user.user_metadata.username,
            }

        })))
    }
    

    getData()
  }, [])
          
  /*
  ** stores message in database
  */
  const onSendHandler = async () => {
        const { error, data } = await supabase
            .from('messages')
            .insert({ 
                id: messages[0]._id, 
                content: messages[0].text,
                user_id: user.id
            })
    }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    onSendHandler(); 
    // console.log(messages)
    
  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.id,
        name: user.user_metadata.username
      }} 
    />
  )
}

export default ChatScreen; 