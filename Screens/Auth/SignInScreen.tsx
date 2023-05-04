import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log('Signed in successfully'))
      .catch(error => console.log('Error signing in', error));
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
}
