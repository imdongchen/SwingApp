import {collectionGroup, limit, onSnapshot, query} from 'firebase/firestore';
import {Box} from 'native-base';
import React, {useState} from 'react';
import {getFirebase} from '../../firebase/init';

export function Feed() {
  const checkins = useFeed();
  return <Box>{JSON.stringify(checkins)}</Box>;
}

function useFeed() {
  const [checkins, setCheckins] = useState<any[]>([]);
  const {firestore} = getFirebase();
  const checkinsQuery = query(
    collectionGroup(firestore, 'checkins'),
    limit(200),
  );
  onSnapshot(checkinsQuery, snapshot => {
    setCheckins(snapshot.docs.map(doc => doc.data()));
  });
  return checkins;
}
