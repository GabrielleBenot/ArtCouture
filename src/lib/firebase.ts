import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-oS2Jpi30WH-UU8A82vJGSChbOPwprXw",
  authDomain: "art-couture-new-website.firebaseapp.com",
  projectId: "art-couture-new-website",
  storageBucket: "art-couture-new-website.firebasestorage.app",
  messagingSenderId: "419442496394",
  appId: "1:419442496394:web:135637c56d81064d71ee73"
};

// Initialize Firebase (SSR-safe check)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
