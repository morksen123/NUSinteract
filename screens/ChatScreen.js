import React, { useState, useCallback, useEffect, useContext } from 'react'

import { UserContext } from '../contexts/userContext';

import { supabase } from '../utils/supabase';

import { GiftedChat } from 'react-native-gifted-chat'


const ChatScreen = (props) => {

  const { route: { params: { activity_id }}} = props
  
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
        const { error, data } = await supabase
          .from('messages')
          .select('*, users(username)')
          .match({ room_id: activity_id })
          .order('created_at', { ascending: false})

        let messageData = data

        setMessages(messageData.map(doc => ({
            _id: doc.id,
            text: doc.content,
            createdAt: doc.created_at,
            user: { 
                _id: doc.user_id,
                name: doc.users.username,
            }
        })))
    }

    getData()
  }, [])

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from('users')
        .select('id, username')

      setParticipants(data)
    }

    fetchParticipants()

  }, [])


  /*
  ** Enabling realtime on messages with supabase
  */
  useEffect(() => {
    const subscription = supabase
        .from('messages')
        .on('INSERT', (payload) => {
            let userObject = participants.filter(participant => participant.id === payload.new.user_id)      
            let newMessage = {
              _id: payload.new.id,
              createdAt: payload.new.created_at,
              text: payload.new.content,
              user: {
                _id: payload.new.user_id,
              }
            }

            console.log(newMessage)

            if (payload.new.user_id != user.id) {
              setMessages((current) => [...current, newMessage]) 
              console.log(messages)
            }
        })
        .subscribe();

    return () => {
        supabase.removeSubscription(subscription)
    }
  }, [])


  /*
  ** stores message in database
  */
  const onSendHandler = async (message) => {
        const { error, data } = await supabase
            .from('messages')
            .insert({                 
                content: message,
                user_id: user.id,
                room_id: activity_id
            })            
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => 
      GiftedChat.append(previousMessages, messages)
    )
    onSendHandler(messages[0].text); 
    
  }, [])

  return (
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        renderUsernameOnMessage={true}
        user={{
          _id: user.id,
          name: user.user_metadata.username
        }} 
      />
    
  )
}

export default ChatScreen; 