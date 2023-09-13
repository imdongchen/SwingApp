import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from 'native-base';
import {signOut, updateProfile} from 'firebase/auth';
import {getFirebase} from '../../firebase/init';
import {ProfileAvatar} from '../../components/ProfileAvatar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function ProfileScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TheProfile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="UpdateName"
        component={UpdateName}
        options={{title: 'Update Name'}}
      />
    </Stack.Navigator>
  );
}

function Profile({navigation}) {
  const {
    auth: {currentUser},
  } = getFirebase();
  if (!currentUser) {
    return null;
  }

  // This will trigger a re-render when back from update screen and display the latest user info
  useIsFocused();

  return (
    <Box p={2}>
      <VStack space={3}>
        <HStack alignItems="center" space={3}>
          <ProfileAvatar {...currentUser} />
          <Heading>{currentUser?.displayName || currentUser?.email}</Heading>
          <IconButton
            icon={<Icon as={<IonIcon name="pencil-outline" />} />}
            onPress={() => {
              navigation.push('UpdateName');
            }}
          />
        </HStack>
        <Logout />
      </VStack>
    </Box>
  );
}

function UpdateName({navigation}) {
  const {
    auth: {currentUser},
  } = getFirebase();

  const [name, setName] = useState(currentUser?.displayName);
  const [error, setError] = useState(null);

  if (!currentUser) {
    return null;
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="300">
        <FormControl>
          <FormControl.Label>Full Name</FormControl.Label>
          <Input onChangeText={setName} value={name} />
          {error && (
            <FormControl.ErrorMessage>
              {error.message || 'Something goes wrong. Please try again.'}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={async () => {
            try {
              await updateProfile(currentUser, {
                displayName: name,
              });
              navigation.goBack();
            } catch (e) {
              setError(e);
            }
          }}>
          Update
        </Button>
      </Box>
    </Center>
  );
}

function Logout() {
  const {auth} = getFirebase();
  return (
    <Button
      colorScheme="danger"
      onPress={() => {
        signOut(auth);
      }}>
      Logout
    </Button>
  );
}
