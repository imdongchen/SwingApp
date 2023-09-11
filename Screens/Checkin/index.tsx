import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  TextArea,
  VStack,
} from 'native-base';
import {collection, doc, addDoc} from 'firebase/firestore';
import React, {useState} from 'react';
import {getFirebase} from '../../firebase/init';
import {checkInConverter} from '../../hooks/useCheckins';

export function CheckInForm() {
  const [formData, setFormData] = useState({});
  const {firestore, auth} = getFirebase();
  const handleSubmit = () => {
    if (!auth.currentUser?.uid) {
      return;
    }
    console.log('checking in ', formData);
    const userDoc = doc(firestore, 'users', auth.currentUser.uid);
    addDoc(
      collection(userDoc, 'checkins').withConverter(checkInConverter),
      formData,
    );
  };
  return (
    <Box>
      <VStack space={3} mt="5" p={2}>
        <FormControl>
          <FormControl.Label>How you feel?</FormControl.Label>
          <Input
            variant="underlined"
            onChangeText={value => setFormData({...formData, feeling: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Distance</FormControl.Label>
          <Input
            variant="underlined"
            onChangeText={value => setFormData({...formData, distance: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Duration</FormControl.Label>
          <Input
            variant="underlined"
            onChangeText={value => setFormData({...formData, duration: value})}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Note</FormControl.Label>
          <TextArea
            h={20}
            autoCompleteType
            onChangeText={value => setFormData({...formData, note: value})}
          />
          <Checkbox
            value="private"
            my={2}
            onChange={value => {
              setFormData({...formData, private: value});
            }}>
            Keep to self
          </Checkbox>
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
    </Box>
  );
}
