import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

// Static Firebase configuration for project "ibtikar-web"
// Hardcoded directly for static GitHub Pages / static hosting without environment variables
export const firebaseConfig = {
  apiKey: "AIzaSyDzYTWkvQ-NLWybz1FL4YL6Jbh-B4ntd7M",
  authDomain: "ibtikar-web.firebaseapp.com",
  projectId: "ibtikar-web",
  storageBucket: "ibtikar-web.firebasestorage.app",
  messagingSenderId: "251036400964",
  appId: "1:251036400964:web:d5ed3bd27ed84daf8ceb11"
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Confirm Firebase initialization in the browser console
console.log(`[Firebase Initialized] Project ID: "${firebaseConfig.projectId}" | Auth Domain: "${firebaseConfig.authDomain}"`);

// Initialize Auth with local persistence for persistent sessions
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Firebase persistence warning:', err);
});

// Initialize Cloud Firestore database for project ibtikar-web
export const db = getFirestore(app);

// Operation Types for error diagnosis
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Profile model stored in Firestore under /users/{userId}
export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  authProvider: 'phone' | 'email';
  createdAt: string;
  updatedAt?: string;
}

// Fetch user profile from Firestore
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, docPath);
  }
}

// Create or save user profile in Firestore
export async function saveUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const dataToSave: Record<string, any> = {
      id: userId,
      name: profile.name || 'عميل ابتكار',
      authProvider: profile.authProvider || 'phone',
      createdAt: profile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (profile.phone) dataToSave.phone = profile.phone;
    if (profile.email) dataToSave.email = profile.email;

    await setDoc(docRef, dataToSave, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

// Update user profile name in Firestore
export async function updateUserProfileName(userId: string, newName: string): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      name: newName,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  }
}
