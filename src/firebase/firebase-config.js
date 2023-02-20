import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCMIPoY4fTc8sUWhJ1l95D8T9RIhcRm9LI',
  authDomain: 'guq-research.firebaseapp.com',
  projectId: 'guq-research',
  storageBucket: 'guq-research.appspot.com',
  messagingSenderId: '471485275985',
  appId: '1:471485275985:web:8d97bf5d414b3e65a93d70',
  measurementId: 'G-KWHM8L2XN3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
