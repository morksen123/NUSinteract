import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from '../utils/supabase';



export default function ProfileScreen() {
  const [user, setUser] = useState("");

  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session(); 
    setSession(session)
    setUser(session?.user ?? null);

    const { data: authListender } = supabase.auth.onAuthStateChange(
        (event, session) => {
            console.log(event)
            setSession(session)
            setUser(session?.user ?? null);
        })

        return () => {
            authListender.unsubscribe();
        }
  }, [])
  console.log(session)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{session ? user.user_metadata.username : 'nothing'}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});