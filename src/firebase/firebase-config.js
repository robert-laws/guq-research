// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// export const db = getFirestore(app);
