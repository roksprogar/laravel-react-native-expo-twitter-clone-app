import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen / Feed</Text>
            <Button title="New Tweet Screen" onPress={() => navigation.navigate('StackNewTweet')} />
            <Button title="Tweet Screen" onPress={() => navigation.navigate('StackTweet')} />
            <Button title="Profile Screen" onPress={() => navigation.navigate('StackProfile')} />
        </View>
    )
}

export default HomeScreen