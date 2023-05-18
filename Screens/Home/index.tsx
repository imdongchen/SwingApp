import {Box} from 'native-base';
import React from 'react';
import {Feed} from './Feed';

export function HomeScreen() {
  return (
    <Box p={3}>
      <Feed />
    </Box>
  );
}
