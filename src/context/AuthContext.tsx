import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isSyncing: boolean;
  error: string | null;
  setError: (msg: string | null) => void;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; phone?: string; photoURL?: string }) => Promise<void>;
  demoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setError(null);

      if (currentUser) {
        // Listen to User Profile document from Firestore
        const userRef = doc(db, 'users', currentUser.uid);

        unsubscribeDoc = onSnapshot(
          userRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.data() as UserProfile);
            } else {
              // Automatically initialize the user profile document according to rules
              const initialProfile: UserProfile = {
                uid: currentUser.uid,
                displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Athletic Member',
                email: currentUser.email || '',
                phone: currentUser.phoneNumber || '',
                photoURL: currentUser.photoURL || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              try {
                await setDoc(userRef, initialProfile);
                setProfile(initialProfile);
              } catch (e: any) {
                console.error('[Firestore] Error creating initial user document:', e);
              }
            }
            setLoading(false);
          },
          (err) => {
            console.warn('[Firestore] User profile listener error:', err);
            setLoading(false);
          }
        );
      } else {
        if (unsubscribeDoc) unsubscribeDoc();
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    setIsSyncing(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      setError(formatAuthError(err.message));
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, displayName?: string) => {
    setError(null);
    setIsSyncing(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (displayName) {
        await updateFirebaseProfile(cred.user, { displayName });
      }
      const initialProfile: UserProfile = {
        uid: cred.user.uid,
        displayName: displayName || email.split('@')[0],
        email: cred.user.email || email,
        phone: '',
        photoURL: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', cred.user.uid), initialProfile);
      setProfile(initialProfile);
    } catch (err: any) {
      setError(formatAuthError(err.message));
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    setIsSyncing(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', cred.user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        const initialProfile: UserProfile = {
          uid: cred.user.uid,
          displayName: cred.user.displayName || 'Athletic Member',
          email: cred.user.email || '',
          phone: cred.user.phoneNumber || '',
          photoURL: cred.user.photoURL || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userRef, initialProfile);
        setProfile(initialProfile);
      }
    } catch (err: any) {
      setError(formatAuthError(err.message));
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = async () => {
    setError(null);
    setIsSyncing(true);
    try {
      await signOut(auth);
      setProfile(null);
    } catch (err: any) {
      setError(formatAuthError(err.message));
    } finally {
      setIsSyncing(false);
    }
  };

  const updateUserProfile = async (data: { displayName?: string; phone?: string; photoURL?: string }) => {
    if (!user || !profile) throw new Error('You must be signed in to update your profile.');
    setError(null);
    setIsSyncing(true);
    try {
      if (data.displayName || data.photoURL) {
        await updateFirebaseProfile(user, {
          displayName: data.displayName ?? user.displayName,
          photoURL: data.photoURL ?? user.photoURL,
        });
      }

      const updatedProfile: UserProfile = {
        uid: user.uid,
        displayName: data.displayName ?? profile.displayName,
        email: user.email || profile.email,
        phone: data.phone ?? profile.phone ?? '',
        photoURL: data.photoURL ?? profile.photoURL ?? '',
        createdAt: profile.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), updatedProfile);
      setProfile(updatedProfile);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  // Demo Login Helper for YouTube Tutorials
  const demoLogin = async () => {
    const demoEmail = 'gym.member@demo.com';
    const demoPass = 'DemoPassword123!';
    try {
      await signInWithEmail(demoEmail, demoPass);
    } catch (err: any) {
      // If demo account doesn't exist yet, automatically create it
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        await signUpWithEmail(demoEmail, demoPass, 'Alex Vance (Pro Athlete)');
      } else {
        throw err;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isSyncing,
        error,
        setError,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        updateUserProfile,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

function formatAuthError(msg: string): string {
  if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
    return 'Invalid email or password. Please check and retry.';
  }
  if (msg.includes('auth/user-not-found')) {
    return 'No account registered with this email address.';
  }
  if (msg.includes('auth/email-already-in-use')) {
    return 'An account already exists with this email address.';
  }
  if (msg.includes('auth/weak-password')) {
    return 'Password is too short. Please provide at least 6 characters.';
  }
  if (msg.includes('auth/popup-closed-by-user')) {
    return 'Google sign-in popup was closed before completion.';
  }
  return msg;
}
