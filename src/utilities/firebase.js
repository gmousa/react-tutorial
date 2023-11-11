// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase, onValue, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { signInWithCredential } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlN9NINcM6GOoFhwQ2TOriYXouEIykskg",
  authDomain: "react-tutorial-106a0.firebaseapp.com",
  projectId: "react-tutorial-106a0",
  storageBucket: "react-tutorial-106a0.appspot.com",
  messagingSenderId: "173330008721",
  appId: "1:173330008721:web:22234b2232354aa9070d30",
  measurementId: "G-726NTNNLHW"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "sgwSfwiNBnjdMROf883vcYwEZZ34", "email": "test@test.com", "displayName":"Test User", "email_verified": true}'
  ));
    globalThis.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [database, path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    console.log("Attempting to update data at path:", path, "with value:", value);
    update(ref(database, path), value)
      .then(() => {
        console.log("Update successful");
        setResult(makeResult());
      })
      .catch((error) => {
        console.error("Update failed with error:", error);
        setResult(makeResult(error));
      });
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};

export const isAdminUser = (uid) => {
  return new Promise((resolve, reject) => {
    onValue(ref(database, 'administrators/' + uid), (snapshot) => {
      if (snapshot.val() === true) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
};


