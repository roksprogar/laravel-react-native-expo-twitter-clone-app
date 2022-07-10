import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '../helpers/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        isLoading,
        login: (email, password) => {
          setError(null);
          setIsLoading(true);
          axiosConfig
            .post('/login', {
              email,
              password,
              device_name: 'mobile',
            })
            .then((response) => {
              const userResponse = {
                token: response.data.token,
                id: response.data.user.id,
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
                avatar: response.data.user.avatar,
              };
              setUser(userResponse);
              setError(null);
              SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            })
            .catch((error) => {
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
        logout: () => {
          setIsLoading(true);
          axiosConfig.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${user.token}`;
          axiosConfig
            .post('/logout')
            .then((response) => {
              setError(null);
            })
            .catch((error) => {
              console.log(error.response.data.message);
            })
            .finally(() => {
              setUser(null);
              SecureStore.deleteItemAsync('user');
              setIsLoading(false);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
