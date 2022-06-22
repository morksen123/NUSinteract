import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Text } from "react-native-paper";
import { current } from "@reduxjs/toolkit";

const Messages = () => {

    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('messages').select('*')
            setMessages(data)
        }
        
        getData()
    }, [])

    useEffect(() => {
        const subscription = supabase
            .from('messages')
            .on('INSERT', (payload) => {
                setMessages((current) => [...current, payload.new])
            })
            .subscribe();

        return () => {
            supabase.removeSubscription(subscription)
        }
    }, [])

    return (
        messages.map((message) =>
         <Text key={message.id}>
            {message.content} {message.user_id}
         </Text>
        )
    )
}

export default Messages;