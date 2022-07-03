import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axiosConfig from '../helpers/axiosConfig';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const flatListRef = useRef();

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      getAllTweetsRefresh();
      flatListRef.current.scrollToOffset({
        offset: 0,
      });
    }
  }, [route.params?.newTweetAdded]); // Optional chaining, the param only exists when a new tweet is added.

  function getAllTweets() {
    axiosConfig
      .get(`tweets?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setData(response.data.data);
        } else {
          setData([...data, ...response.data.data]);
        }

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }
      })
      .catch((error) => console.log(error.response))
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function getAllTweetsRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(false);

    axiosConfig
      .get(`tweets`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error.response))
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function handleRefresh() {
    page === 1 ? getAllTweets() : setPage(1);
    setIsRefreshing(true);
    setIsAtEndOfScrolling(false);
  }

  function handleEnd() {
    setPage(page + 1);
  }

  function goToProfile(userId) {
    navigation.navigate('StackProfile', {
      userId: userId,
    });
  }

  const goToSingleTweet = (tweetId) => {
    navigation.navigate('StackTweet', {
      tweetId: tweetId,
    });
  };

  const goToNewTweet = () => {
    navigation.navigate('StackNewTweet');
  };

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile(tweet.user.id)}>
        <Image
          style={styles.avatar}
          source={{
            uri: tweet.user.avatar,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToSingleTweet(tweet.id)}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {formatDistanceToNowStrict(new Date(tweet.created_at))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => goToSingleTweet(tweet.id)}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
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
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeparator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.001}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
        />
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={goToNewTweet}>
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

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
    color: 'gray',
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
    borderBottomColor: '#e5e7eb',
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
});

export default HomeScreen;
