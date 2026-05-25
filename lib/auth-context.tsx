"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  xp: number;
  level: number;
  streak: number;
  totalLessons: number;
  totalPracticeMinutes: number;
  achievements: string[];
  preferredLanguage: string;
  bio?: string;
  publicProfile?: boolean;
  emailNotifications?: boolean;
  soundEnabled?: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      setUserData(userDoc.data() as UserData);
    }
  };

  const createUserDocument = async (user: User, displayName?: string) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUserData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || "Language Learner",
        photoURL: user.photoURL,
        xp: 0,
        level: 1,
        streak: 0,
        totalLessons: 0,
        totalPracticeMinutes: 0,
        achievements: ["welcome"],
        preferredLanguage: "english",
        createdAt: new Date(),
      };
      await setDoc(userRef, {
        ...newUserData,
        createdAt: serverTimestamp(),
      });
      setUserData(newUserData);
    } else {
      setUserData(userDoc.data() as UserData);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    await createUserDocument(result.user, displayName);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocument(result.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserData(null);
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.uid);
    }
  };

  const updateUserProfile = async (updates: Partial<UserData>) => {
    if (!user) throw new Error("No user logged in");
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, updates);
    await fetchUserData(user.uid);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        refreshUserData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
