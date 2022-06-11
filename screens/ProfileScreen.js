import { Text, View } from 'react-native';


const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>  
    )
}

export default ProfileScreen; 


// import { useState, useEffect } from "react";
// import { StyleSheet, View, Alert } from "react-native";
// import { Button, Input } from "react-native-elements";
// import { ApiError, Session } from "@supabase/supabase-js";
// import { supabase } from '../utils/supabase';



// export default function ProfileScreen({ session }) {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (session) getProfile();
//   }, [session]);

//   async function getProfile() {
//     try {
//       const user = supabase.auth.user();
//       if (!user) throw new Error("No user on the session!");

//       let { data, error, status } = await supabase
//         .from("profiles")
//         .select(`username, website, avatar_url`)
//         .eq("id", user.id)
//         .single();
//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         setUsername(data.username);
//       }
//     } catch (error) {
//       Alert.alert(error.message);
//     } 
//   }


//   return (
//     <Text>{supabase.auth.user()}</Text>
      
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: "stretch",
//   },
//   mt20: {
//     marginTop: 20,
//   },
// });