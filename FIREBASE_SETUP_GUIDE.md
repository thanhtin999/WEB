# Firebase Integration & Deployment Setup Guide

This project includes full **Firebase Authentication**, **Cloud Firestore Real-Time Persistence**, **Role-Based Security Rules (`firestore.rules`)**, and **App Check** integration placeholders.

---

## 1. Firebase Console Setup

1. **Create/Open Project**: Go to [Firebase Console](https://console.firebase.google.com/) and select your project (`web-ban-hang-35793`).
2. **Enable Authentication**:
   - Navigate to **Build > Authentication > Sign-in method**.
   - Enable **Email/Password** provider.
   - (Optional) Enable **Google Provider** with your authorized domain (`localhost`, your Vercel URL, and your Cloud Run preview URL).
3. **Enable Cloud Firestore**:
   - Navigate to **Build > Firestore Database > Create Database**.
   - Select production or test mode in your preferred cloud region.
4. **Deploy Security Rules**:
   - Copy the contents of `firestore.rules` into **Firestore Database > Rules** tab, or deploy via Firebase CLI:
     ```bash
     firebase deploy --only firestore:rules
     ```
5. **App Check (Optional Production Protection)**:
   - Navigate to **Build > App Check**.
   - Register your web app using **reCAPTCHA v3** or **Enterprise**.
   - Add your site key to `.env` as `VITE_FIREBASE_RECAPTCHA_SITE_KEY` or `NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY`.

---

## 2. Environment Variables for Vercel / Next.js / Vite

Add the following environment variables in your deployment dashboard (e.g. Vercel Project Settings > Environment Variables):

| Variable Name | Description | Example Value |
|---|---|---|
| `VITE_FIREBASE_API_KEY` / `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSyAi9bMCyHaUzKOKovNcWmor7pAC-n0Mhs4` |
| `VITE_FIREBASE_AUTH_DOMAIN` / `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `web-ban-hang-35793.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` / `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firestore Project ID | `web-ban-hang-35793` |
| `VITE_FIREBASE_STORAGE_BUCKET` / `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `web-ban-hang-35793.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` / `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM Sender ID | `758590209091` |
| `VITE_FIREBASE_APP_ID` / `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID | `1:758590209091:web:6c222f9936ac2c07c6a8f6` |
| `VITE_FIREBASE_MEASUREMENT_ID` / `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Google Analytics ID | `G-Q34619MR2E` |
| `VITE_FIREBASE_RECAPTCHA_SITE_KEY` / `NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY` | App Check reCAPTCHA v3 Key | `REPLACE_WITH_YOUR_RECAPTCHA_SITE_KEY` |

---

## 3. YouTube Video Demo Steps

| Step | Action | Expected Visual Outcome |
|---|---|---|
| **1. Sign Up** | Click "Sign In / Member Portal" -> Register a new account or click **1-Click Demo Account**. | Automatically registers user and provisions document in `users/{userId}`. |
| **2. Log In** | Sign in with email or Google. | Navbar shows active profile badge and status changes to "Authenticated Session". |
| **3. Save Profile** | Open Member Portal -> "3. Member Profile" -> Edit display name or phone -> Save. | Firestore writes updates to `users/{userId}` with feedback toast. |
| **4. Refresh & Persist** | Press `F5` / Refresh the browser. | Session and all Firestore documents reload automatically without data loss. |
| **5. Two-Tab Real-time Sync** | Open the website in 2 browser tabs side-by-side. | In Tab 1, create a new pass or post a broadcast. |
| **6. Instant Updates** | Observe Tab 2 in real-time. | Tab 2 updates immediately without clicking refresh (WebSocket push stream). |
| **7. Access Gate** | Click "Sign Out". | Portal immediately switches to the locked security gate with clear error guidance. |
| **8. Security Rules** | Open "4. Firestore Rules Audit" tab. | Review `isOwner`, `isSignedIn`, `isAdmin`, and schema whitelisting in `firestore.rules`. |
