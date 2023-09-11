import {UserInfo} from 'firebase/auth';
import {
  collectionGroup,
  limit,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {getFirebase} from '../firebase/init';

export type CheckIn = {
  id: string;
  createdAt: Date;
  createdBy: UserInfo;
  feeling?: string;
  note?: string;
  duration?: string;
  location?: string;
  distance?: string;
  isNotePrivate?: boolean;
  private?: {
    note?: string;
  };
};

export const checkInConverter = {
  toFirestore(checkIn: CheckIn) {
    const {
      auth: {currentUser},
    } = getFirebase();
    return {
      createdBy: {
        uid: currentUser?.uid,
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
        email: currentUser?.email,
      },
      createdAt: serverTimestamp(),
      feeling: checkIn.feeling || '',
      duration: checkIn.duration || '',
      location: checkIn.location || '',
      distance: checkIn.distance || '',
      note: checkIn.note || '',
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): CheckIn {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      createdAt: data.createdAt?.toDate(),
      feeling: data.feeling,
      note: data.private?.note || data.note,
      duration: data.duration,
      location: data.location,
      distance: data.distance,
      createdBy: data.createdBy,
    };
  },
};

export function useCheckins() {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);

  useEffect(() => {
    const {firestore} = getFirebase();
    const checkinsQuery = query(
      collectionGroup(firestore, 'checkins').withConverter(checkInConverter),
      limit(200),
    );
    return onSnapshot(checkinsQuery, snapshot => {
      setCheckins(snapshot.docs.map(doc => doc.data()));
    });
  }, []);
  console.log('checkins', checkins);
  return checkins;
}
