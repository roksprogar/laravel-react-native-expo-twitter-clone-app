import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function register(email, username, password, confirmPassword) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Register Logic here');
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 130, width: 260 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.personImage}
            source={require('../../assets/login-person.png')}
          ></Image>
        </View>
        <View style={{ marginTop: 40 }}>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <TextInput
            style={[styles.inputBox, styles.mt4]}
            onChangeText={setName}
            value={name}
            placeholder="Name"
            placeholderTextColor="gray"
          />
          <TextInput
            style={[styles.inputBox, styles.mt4]}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="gray"
          />
          <TextInput
            style={[styles.inputBox, styles.mt4]}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="gray"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.inputBox, styles.mt4]}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            style={[styles.inputBox, styles.mt4]}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => register(email, username, password, confirmPassword)}
          style={[styles.signupButton, styles.mt5]}
        >
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ marginRight: 18 }}
            />
          )}
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Text style={[styles.loginText]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('StackLogin')}>
            <Text style={styles.loginTextLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d9fb1',
    alignItems: 'center',
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 20,
  },
  personImage: {
    width: 100,
    height: 100,
  },
  inputBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  signupButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084b3',
    padding: 12,
    borderRadius: 5,
  },
  signupButtonText: {
    color: 'white',
  },
  loginText: {
    fontSize: 12,
  },
  loginTextLink: {
    fontSize: 12,
    color: 'white',
    textDecorationLine: 'underline',
  },
});
