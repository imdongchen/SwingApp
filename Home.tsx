import React from 'react';
import {RootStackScreenProps} from './types';
import {Button, Heading, VStack} from 'native-base';

export function Home({navigation}: RootStackScreenProps<'Home'>) {
  return (
    <VStack space={5} alignItems="center">
      <Heading size="lg"> Welcome home</Heading>
      <Button onPress={() => navigation.navigate('Calendar' as const)}>
        Check instructions
      </Button>
    </VStack>
  );
}
