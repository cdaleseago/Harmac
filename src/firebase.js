// ============================================================================
//  FIREBASE SETUP  —  THIS IS THE ONLY FILE YOU EDIT BY HAND
// ============================================================================
//
//  Paste your own Firebase keys below (see SETUP_STEPS.md, Step 3).
//  Everything between the quotes gets replaced with YOUR project's values.
//  Get them from: Firebase console -> Project settings -> "Your apps" -> Web app.
//
// ============================================================================

import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot,
} from "firebase/firestore";

// 👇👇👇  PASTE YOUR FIREBASE KEYS HERE  👇👇👇
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE",
};
// 👆👆👆  PASTE YOUR FIREBASE KEYS HERE  👆👆👆

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// All HARMAC data lives in one shared document so every device sees the same thing.
// (Simple + reliable for a small team. A developer can split this later if needed.)
const DOC_REF = doc(db, "harmac", "commandCenter");

// cloudStore mirrors the old window.storage API the app already uses,
// but reads/writes to Firebase so your phone and desktop stay in sync.
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
