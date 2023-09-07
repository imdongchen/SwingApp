import {Box, HStack, Icon, ScrollView, Text, VStack} from 'native-base';
import React, {useMemo} from 'react';
import {ProfileAvatar} from '../../components/ProfileAvatar';
import {CheckIn, useCheckins} from '../../hooks/useCheckins';
import {formatDistance} from 'date-fns';
import IonIcon from 'react-native-vector-icons/Ionicons';

const actions = ['Flied', 'Blasted', 'Crushed'];

export function Feed() {
  const checkins = useCheckins();
  return (
    <ScrollView>
      {checkins.map(checkin => (
        <Box mb={4} key={checkin.id}>
          <FeedItem {...checkin} />
        </Box>
      ))}
    </ScrollView>
  );
}

function FeedItem({
  createdBy,
  feeling,
  distance,
  duration,
  note,
  id,
  createdAt,
  location,
}: CheckIn) {
  const action = getAction();

  return useMemo(
    () => (
      <HStack space={2} alignItems="flex-start">
        <Box mt={1}>
          <ProfileAvatar {...createdBy} size="sm" />
        </Box>
        <VStack>
          <HStack space={2} alignItems="baseline">
            <Text fontWeight="bold">{createdBy?.displayName}</Text>

            <Text fontSize="xs" color="coolGray.500">
              {formatDistance(createdAt, new Date(), {addSuffix: true})}
            </Text>
          </HStack>
          <Text>
            {action} {distance}yds for {duration}min
          </Text>
          {location && (
            <HStack space={0.5} alignItems="center">
              <Icon
                as={<IonIcon name="location-outline" />}
                size="xs"
                color="gray.600"
              />
              <Text fontSize="xs" color="gray.600">
                {location}
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  );
}

function getAction() {
  return actions[Math.floor(Math.random() * actions.length)];
}
