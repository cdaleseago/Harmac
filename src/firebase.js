// ============================================================================
//  FIREBASE SETUP  —  HARMAC Command Center  (keys filled in)
// ============================================================================

import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyAHYKAGiOjSuNi_vElmATUm31_QcIKx_gg",
  authDomain:        "harmac-87d4f.firebaseapp.com",
  projectId:         "harmac-87d4f",
  storageBucket:     "harmac-87d4f.firebasestorage.app",
  messagingSenderId: "92621109525",
  appId:             "1:92621109525:web:d26515a97e20a8c9ad511c",
  measurementId:     "G-NT4KNL9BZC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// All HARMAC data lives in one shared document so every device sees the same thing.
const DOC_REF = doc(db, "harmac", "commandCenter");

// cloudStore mirrors the old window.storage API the app uses,
// but reads/writes to Firebase so phone and desktop stay in sync.
export const cloudStore = {
  async get(key) {
    const snap = await getDoc(DOC_REF);
    const data = snap.exists() ? snap.data() : {};
    return key in data ? { key, value: data[key] } : null;
  },
  async set(key, value) {
    await setDoc(DOC_REF, { [key]: value }, { merge: true });
    return { key, value };
  },
};

// Live updates: whenever anyone changes the data, call back with the fresh copy.
export function subscribe(key, cb) {
  return onSnapshot(DOC_REF, (snap) => {
    const data = snap.exists() ? snap.data() : {};
    if (key in data) cb(data[key]);
  });
}
