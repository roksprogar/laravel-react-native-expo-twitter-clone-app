import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const DATA = [
        { id: '1', title: 'Tweet 1' },
        { id: '2', title: 'Tweet 2' },
        { id: '3', title: 'Tweet 3' },
        { id: '4', title: 'Tweet 4' },
        { id: '5', title: 'Tweet 5' },
        { id: '6', title: 'Tweet 6' },
        { id: '7', title: 'Tweet 7' },
        { id: '8', title: 'Tweet 8' },
        { id: '9', title: 'Tweet 9' },
        { id: '10', title: 'Tweet 10' },
    ];

    const goToProfile = () => navigation.navigate('StackProfile')
    const goToSingleTweet = () => navigation.navigate('StackTweet')
    const goToNewTweet = () => navigation.navigate('StackNewTweet')

    const renderItem = ({item}) => (
        <View style={styles.tweetContainer}>
            <TouchableOpacity onPress={goToProfile}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png'
                    }}
                />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.flexRow} onPress={goToSingleTweet}>
                    <Text numberOfLines={1} style={styles.tweetName}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.tweetHandle}>@roksprogar</Text>
                    <Text>&middot;</Text>
                    <Text numberOfLines={1} style={styles.tweetHandle}>9m</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetContentContainer} onPress={goToSingleTweet}>
                    <Text style={styles.tweetContent}>tweet content tweet content tweet content tweet content tweet content tweet content tweet content tweet content tweet content</Text>
                </TouchableOpacity>
                <View style={styles.tweetEngagement}>
                    <TouchableOpacity style={styles.flexRow}>
                        <EvilIcons
                            name="comment"
                            size={22}
                            color="gray"
                            style={{ marginRight: 2 }}
                        />
                        <Text style={styles.textGray}>456</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons
                            name="retweet"
                            size={22}
                            color="gray"
                            style={{ marginRight: 2 }}
                        />
                        <Text style={styles.textGray}>32</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons
                            name="heart"
                            size={22}
                            color="gray"
                            style={{ marginRight: 2 }}
                        />
                        <Text style={styles.textGray}>4,456</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons
                            name={Platform.OS === 'ios' ? "share-apple" : "share-google"}
                            size={22}
                            color="gray"
                            style={{ marginRight: 2 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.tweetSeparator}></View>}
            />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={goToNewTweet}
            >
                <AntDesign name="plus" size={26} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flexRow: {
        flexDirection: 'row',
    },
    textGray: {
        color: 'gray',
    },
    ml4: {
        marginLeft: 16,
    },
    tweetContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        borderRadius: 21,
    },
    tweetName: {
        fontWeight: 'bold',
        color: '#222222',
    },
    tweetHandle: {
        marginHorizontal: 8,
        color: 'gray'
    },
    tweetContentContainer: {
        margintop: 4,
    },
    tweetContent: {
        lineHeight: 20,
    },
    tweetEngagement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    tweetSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 20,
        right: 12,
    },
})

export default HomeScreen