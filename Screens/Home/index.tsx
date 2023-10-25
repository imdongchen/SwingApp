import {Box, Fab, Icon} from 'native-base';
import React from 'react';
import {Feed} from './Feed';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckInForm} from '../Checkin';

const Stack = createNativeStackNavigator();

export function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkin"
        component={CheckInForm}
        options={{title: 'Check in'}}
      />
    </Stack.Navigator>
  );
}

function FeedScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  return (
    <Box p={3} safeArea>
      <Feed />
      {isFocused && (
        <Fab
          bottom={20}
          shadow={2}
          size="sm"
          icon={
            <Icon color="white" as={<IonIcon name="add-outline" />} size="9" />
          }
          onPress={() => navigation.navigate('Checkin' as const)}
        />
      )}
    </Box>
  );
}
