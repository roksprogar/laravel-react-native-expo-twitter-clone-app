import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import NewTweetScreen from './screens/NewTweetScreen';
import TweetScreen from './screens/TweetScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { AuthContext } from './context/AuthProvider';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="StackLogin"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StackSignup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="StackTab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StackNewTweet"
        component={NewTweetScreen}
        options={{ title: '' }} // Hide the title, leave the back button.
      />
      <Stack.Screen
        name="StackTweet"
        component={TweetScreen}
        options={{ title: '' }} // Hide the title, leave the back button.
      />
      <Stack.Screen
        name="StackProfile"
        component={ProfileScreen}
        options={{ title: '' }} // Hide the title, leave the back button.
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="TabSearch"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="TabNotification"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext); // useContext(AuthContext) will only work in a component wrapped by the AuthProvider.

  useEffect(() => {
    // TODO: Check if a user is logged in or not.
    // TODO: Check SecureStore for the user object/token.
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="gray"></ActivityIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Drawer.Screen name="Home" component={StackNavigator} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}
