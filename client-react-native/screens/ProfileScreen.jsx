import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axiosConfig from '../helpers/axiosConfig';
import { EvilIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    getUserProfile();
  }, []);

  function getUserProfile() {
    axiosConfig
      .get(`users/${route.params.userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error.response))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 20 }}>
      <Text>{item.title}</Text>
    </View>
  );

  const profileHeader = () => (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg',
            }}
          />

          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.avatar,
              }}
            />
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileHandle}>@{user.username}</Text>
          </View>

          <View style={styles.profileConainer}>
            <Text style={styles.profileContainerText}>{user.profile}</Text>
          </View>

          <View style={styles.locationContainer}>
            <EvilIcons name="location" size={24} color="gray" />
            <Text style={styles.textGray}>{user.location}</Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => Linking.openURL(user.link)}
            >
              <EvilIcons name="link" size={24} color="gray" />
              <Text style={styles.linkColor}>{user.link_text}</Text>
            </TouchableOpacity>
            <View style={[styles.linkItem, styles.ml4]}>
              <EvilIcons name="calendar" size={24} color="gray" />
              <Text style={styles.textGray}>Joined {format( new Date(user.created_at),'MMM yyyy')}</Text>
            </View>
          </View>

          <View style={styles.followContainer}>
            <View style={styles.followItem}>
              <Text style={styles.followItemNumber}>509</Text>
              <Text style={styles.followItemLabel}>Following</Text>
            </View>
            <View style={[styles.followItem, styles.ml4]}>
              <Text style={styles.followItemNumber}>2,509</Text>
              <Text style={styles.followItemLabel}>Folowers</Text>
            </View>
          </View>

          <View style={styles.separator}></View>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      ListHeaderComponent={profileHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textGray: {
    color: 'gray',
  },
  ml4: {
    marginLeft: 16,
  },
  backgroundImage: {
    width: 800,
    height: 120,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },
  followButton: {
    backgroundColor: '#0f1418',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1,
  },
  profileConainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 4,
  },
  linkColor: {
    color: '#1d9bf1',
  },
  linkItem: {
    flexDirection: 'row',
  },
  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: 'row',
  },
  followItemNumber: {
    fontWeight: 'bold',
  },
  followItemLabel: {
    marginLeft: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});

export default ProfileScreen;
