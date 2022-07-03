import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function SignupScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the signup screen.</Text>
      <Button
        onPress={() => navigation.navigate('StackLogin')}
        title="Go to Login page"
      />
    </View>
  );
}
