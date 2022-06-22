import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Text } from "react-native-paper";

const Messages = () => {

    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('messages').select('*')
            setMessages(data)
        }
        
        getData()
    }, [messages])

    return (
        messages.map((message) =>
         <Text key={message.id}>
            {message.content} {message.user_id}
         </Text>
        )
    )
}

export default Messages;