import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login screen.</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="gray"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="gray"
        autoCapitalize="none"
        secureTextEntry={true}
      ></TextInput>
      <Button onPress={() => login(email, password)} title="Login" />
      <Button
        onPress={() => navigation.navigate('StackSignup')}
        title="Go to Signup page"
      />
    </View>
  );
}