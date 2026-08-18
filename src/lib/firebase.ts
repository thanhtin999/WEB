import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';

// ==============================================================================
// 1. FIREBASE CONFIGURATION
// ==============================================================================
// Replace the values below with your Firebase Project configuration or define
// them in your environment variables (.env / .env.local).
//
// In Vite: VITE_FIREBASE_*
// In Next.js / Vercel: NEXT_PUBLIC_FIREBASE_*
// ==============================================================================

const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : ({} as any);

export const firebaseConfig = {
  apiKey:
    env.VITE_FIREBASE_API_KEY ||
    env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyAi9bMCyHaUzKOKovNcWmor7pAC-n0Mhs4", // REPLACE_WITH_YOUR_FIREBASE_API_KEY
  authDomain:
    env.VITE_FIREBASE_AUTH_DOMAIN ||
    env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "web-ban-hang-35793.firebaseapp.com", // REPLACE_WITH_YOUR_FIREBASE_AUTH_DOMAIN
  projectId:
    env.VITE_FIREBASE_PROJECT_ID ||
    env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "web-ban-hang-35793", // REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID
  storageBucket:
    env.VITE_FIREBASE_STORAGE_BUCKET ||
    env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "web-ban-hang-35793.firebasestorage.app", // REPLACE_WITH_YOUR_FIREBASE_STORAGE_BUCKET
  messagingSenderId:
    env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "758590209091", // REPLACE_WITH_YOUR_FIREBASE_MESSAGING_SENDER_ID
  appId:
    env.VITE_FIREBASE_APP_ID ||
    env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:758590209091:web:6c222f9936ac2c07c6a8f6", // REPLACE_WITH_YOUR_FIREBASE_APP_ID
  measurementId:
    env.VITE_FIREBASE_MEASUREMENT_ID ||
    env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    "G-Q34619MR2E" // REPLACE_WITH_YOUR_FIREBASE_MEASUREMENT_ID
};

// ==============================================================================
// 2. FIREBASE APP INITIALIZATION
// ==============================================================================
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Cloud Firestore
export const db: Firestore = getFirestore(app);

// ==============================================================================
// 3. FIREBASE APP CHECK INTEGRATION (OPTIONAL / PRODUCTION PROTECTION)
// ==============================================================================
// To protect your backend against abuse and bots, register your app in
// Firebase Console -> App Check, then set your reCAPTCHA v3 site key here.
// ==============================================================================
export const reCaptchaSiteKey =
  env.VITE_FIREBASE_RECAPTCHA_SITE_KEY ||
  env.NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY ||
  "REPLACE_WITH_YOUR_RECAPTCHA_SITE_KEY";

let appCheckInstance: AppCheck | null = null;

if (
  typeof window !== 'undefined' &&
  reCaptchaSiteKey &&
  reCaptchaSiteKey !== 'REPLACE_WITH_YOUR_RECAPTCHA_SITE_KEY'
) {
  try {
    // Enable debug token in development mode if necessary
    if (env.DEV) {
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(reCaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
    console.info('[Firebase App Check] Initialized successfully with reCAPTCHA v3.');
  } catch (err) {
    console.warn('[Firebase App Check] Initialization skipped or failed:', err);
  }
}

export const appCheck = appCheckInstance;
