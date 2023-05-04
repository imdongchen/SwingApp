import React, {useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {getFirebase} from '../../firebase/init';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base';

export const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Just one step away from swinging!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input onChangeText={setName} value={name} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={setEmail} value={email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => signUp({email, password, name})}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const {auth} = getFirebase();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // User signed up successfully
    const user = userCredential.user;
    await updateProfile(user, {displayName: name});
    console.log(`User ${user.uid} signed up successfully`);
  } catch (error) {
    console.error(error);
  }
};
