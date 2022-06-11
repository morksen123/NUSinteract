import { Text, View, Button } from 'react-native';


const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        <Button title="Join Activity" onPress={() => navigation.navigate("Map")}/>
        <Button title="Host Activity" onPress={() => navigation.navigate("HostActivity")}/>
      </View>
    )
}

export default HomeScreen; 

