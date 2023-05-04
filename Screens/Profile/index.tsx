import React from 'react';
import {Avatar, Box, Button, Heading, HStack, VStack} from 'native-base';
import {signOut} from 'firebase/auth';
import {getFirebase} from '../../firebase/init';

export function ProfileScreen() {
  const {
    auth: {currentUser},
  } = getFirebase();
  return (
    <Box p={2}>
      <VStack space={3}>
        <HStack alignItems="center" space={3}>
          <Avatar bg="lightBlue.400" size="md">
            {getInitials(currentUser?.displayName || '')}
          </Avatar>
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

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('');
}
