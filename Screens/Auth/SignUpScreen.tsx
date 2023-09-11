import React, {useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {getFirebase} from '../../firebase/init';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
} from 'native-base';
import {setDoc, doc} from 'firebase/firestore';

export const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="300">
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

        <VStack space={3} mt="5" w="100%">
          {/* FIXME remove 48%, make flex children fill the space */}
          <HStack space={2} w="48%">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input onChangeText={setFirstName} value={firstName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input onChangeText={setLastName} value={lastName} />
            </FormControl>
          </HStack>
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
            onPress={() => signUp({email, password, firstName, lastName})}>
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
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const {auth, firestore} = getFirebase();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // User signed up successfully
    const user = userCredential.user;
    updateProfile(user, {displayName: `${firstName} ${lastName}`});

    setDoc(doc(firestore, 'users', user.uid), {
      firstName,
      lastName,
      email,
    });
  } catch (error) {
    console.error(error);
  }
};
