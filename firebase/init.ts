import {initializeApp, getApps} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
// import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCFIkm-xJlKjOzTw2zRuaEK-y47TVcYi40',
  authDomain: 'swing-2998e.firebaseapp.com',
  projectId: 'swing-2998e',
  storageBucket: 'swing-2998e.appspot.com',
  messagingSenderId: '820985468220',
  appId: '1:820985468220:web:2e1e26685e8fbf3553ba39',
  measurementId: 'G-P753XYGW2B',
};

function initialize() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return {firebaseApp, auth, firestore};
}

function connectToEmulators({
  firebaseApp,
  auth,
  firestore,
}: ReturnType<typeof initialize>) {
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
    connectFirestoreEmulator(firestore, 'localhost', 8089);
  }
  return {firebaseApp, auth, firestore};
}

export function getFirebase() {
  const existingApp = getApps()[0];
  if (existingApp) {
    return initialize();
  }
  return connectToEmulators(initialize());
}
