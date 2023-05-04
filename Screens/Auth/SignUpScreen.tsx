import firebase from 'firebase/app';
import 'firebase/auth';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => signUp({email, password})}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const signUp = async ({email, password}: {email: string; password: string}) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // User signed up successfully
    const user = userCredential.user;
    console.log(`User ${user.uid} signed up successfully`);
  } catch (error) {
    console.error(error);
  }
};
