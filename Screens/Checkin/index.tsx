import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Slide,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {collection, doc, addDoc} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {getFirebase} from '../../firebase/init';
import {CheckIn, checkInConverter} from '../../hooks/useCheckins';
import {RootStackScreenProps} from '../../types/routes';

type CheckInFormData = Pick<
  CheckIn,
  'feeling' | 'distance' | 'duration' | 'note'
>;

export function CheckInForm({navigation}: RootStackScreenProps<'Checkin'>) {
  const [formData, setFormData] = useState<CheckInFormData>({});
  const [checkedIn, setCheckedIn] = useState(false);
  const {firestore, auth} = getFirebase();
  const handleSubmit = async () => {
    if (!auth.currentUser?.uid) {
      return;
    }
    const userDoc = doc(firestore, 'users', auth.currentUser.uid);
    await addDoc(
      collection(userDoc, 'checkins').withConverter(checkInConverter),
      formData,
    );
    setCheckedIn(true);
    setFormData({});
    navigation.navigate('Home' as const);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (checkedIn) {
      timeout = setTimeout(() => {
        setCheckedIn(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [checkedIn]);

  return (
    <Box>
      <VStack space={3} mt="5" p={2}>
        <FormControl>
          <FormControl.Label>How you feel?</FormControl.Label>
          <Input
            value={formData.feeling}
            variant="underlined"
            onChangeText={value => setFormData({...formData, feeling: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Distance</FormControl.Label>
          <Input
            value={formData.distance}
            variant="underlined"
            onChangeText={value => setFormData({...formData, distance: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Duration</FormControl.Label>
          <Input
            value={formData.duration}
            variant="underlined"
            onChangeText={value => setFormData({...formData, duration: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Note</FormControl.Label>
          <TextArea
            value={formData.note}
            h={20}
            autoCompleteType
            onChangeText={value => setFormData({...formData, note: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Photo</FormControl.Label>
          <Input
            variant="underlined"
            onChangeText={value => setFormData({...formData, distance: value})}
          />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
          Check in
        </Button>
      </VStack>
      <SuccessCheckinSlide isOpen={checkedIn} />
    </Box>
  );
}

function SuccessCheckinSlide({isOpen}: {isOpen: boolean}) {
  return (
    <Slide in={isOpen} placement="top">
      <Box
        w="100%"
        position="absolute"
        p="2"
        borderRadius="xs"
        bg="emerald.100"
        alignItems="center"
        justifyContent="center"
        _dark={{
          bg: 'emerald.200',
        }}
        safeArea>
        <HStack space={2}>
          <CheckIcon
            size="4"
            color="emerald.600"
            mt="1"
            _dark={{
              color: 'emerald.700',
            }}
          />
          <Text
            color="emerald.600"
            textAlign="center"
            _dark={{
              color: 'emerald.700',
            }}
            fontWeight="medium">
            Checked in successfully!
          </Text>
        </HStack>
      </Box>
    </Slide>
  );
}
