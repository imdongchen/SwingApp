import {initializeApp} from 'firebase/app';
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

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export {firebaseApp};
