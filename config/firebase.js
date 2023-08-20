import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// firebase config

const apiKey = Constants.expoConfig.extra.apiKey;
const authDomain = Constants.expoConfig.extra.authDomain;
const projectId = Constants.expoConfig.extra.projectId;
const storageBucket = Constants.expoConfig.extra.storageBucket;
const messagingSenderId = Constants.expoConfig.extra.messagingSenderId;
const appId = Constants.expoConfig.extra.appId;

// Initialize Firebase with the retrieved keys
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
