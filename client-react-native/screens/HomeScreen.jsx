import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import axiosConfig from '../helpers/axiosConfig';
import { AntDesign } from '@expo/vector-icons';

import RenderItem from '../components/RenderItem';
import { AuthContext } from '../context/AuthProvider';

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const { user } = useContext(AuthContext);

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
    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;

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

    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;

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

  const goToNewTweet = () => {
    navigation.navigate('StackNewTweet');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={(props) => <RenderItem {...props} />} // Because of the useNavigation hook in the RenderItem component.
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeparator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.001} // If set to 0, the handleEnd will only fire once.
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
