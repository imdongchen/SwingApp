import React from 'react';
import {Box, Button, Heading, HStack, VStack} from 'native-base';
import {signOut} from 'firebase/auth';
import {getFirebase} from '../../firebase/init';
import {ProfileAvatar} from '../../components/ProfileAvatar';

export function ProfileScreen() {
  const {
    auth: {currentUser},
  } = getFirebase();
  if (!currentUser) {
    return null;
  }
  return (
    <Box p={2}>
      <VStack space={3}>
        <HStack alignItems="center" space={3}>
          <ProfileAvatar {...currentUser} />
          <Heading>{currentUser?.displayName || currentUser?.email}</Heading>
        </HStack>
        <Logout />
      </VStack>
    </Box>
  );
}

function Logout() {
  const {auth} = getFirebase();
  return (
    <Button
      onPress={() => {
        signOut(auth);
      }}>
      Logout
    </Button>
  );
}
