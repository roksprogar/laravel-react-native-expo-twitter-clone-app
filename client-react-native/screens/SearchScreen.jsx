import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import axiosConfig from '../helpers/axiosConfig';
import * as SecureStore from 'expo-secure-store';

const SearchScreen = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
    axiosConfig
      .get('/user')
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
