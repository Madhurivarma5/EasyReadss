# Firebase Setup Guide

## The Error You're Seeing

The error `auth/api-key-not-valid` means your Firebase API key is still set to the placeholder value `your-api-key-here`. You need to replace it with your actual Firebase credentials.

## Step-by-Step Setup

### 1. Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one if you haven't)
3. Click the **gear icon** ⚙️ next to "Project Overview"
4. Select **Project Settings**
5. Scroll down to the **"Your apps"** section
6. If you don't have a web app yet:
   - Click **"Add app"** or the **</>** icon
   - Register your app with a nickname (e.g., "EasyReads Web")
   - Click **Register app**
7. You'll see your Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### 2. Update Your .env File

1. Open `frontend/.env` in your editor
2. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

**Important:** 
- Copy the values EXACTLY as they appear in Firebase Console
- Don't include quotes around the values
- Don't leave any spaces around the `=` sign

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get started** (if you haven't enabled it yet)
3. Go to the **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

### 4. Restart Your Dev Server

**IMPORTANT:** After updating `.env`, you MUST restart your Vite dev server:

1. Stop the current server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   cd frontend
   npm run dev
   ```

Vite only reads environment variables when it starts, so changes to `.env` require a restart.

### 5. Verify It's Working

1. Open your browser console (F12)
2. Check for any Firebase configuration errors
3. Try signing up again

## Quick Checklist

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] Configuration values copied from Firebase Console
- [ ] `frontend/.env` file updated with real values
- [ ] Email/Password authentication enabled in Firebase
- [ ] Dev server restarted after updating `.env`

## Common Issues

### "Still getting api-key-not-valid error"
- Make sure you restarted the dev server after updating `.env`
- Check that there are no extra spaces or quotes in your `.env` file
- Verify you copied the values correctly from Firebase Console

### "Authentication not enabled"
- Go to Firebase Console > Authentication > Sign-in method
- Enable Email/Password provider

### "Can't find Project Settings"
- Make sure you're logged into the correct Firebase account
- Make sure you've selected the correct project

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your `.env` file has the correct format (no quotes, no spaces)
3. Make sure you restarted the dev server
4. Double-check that Email/Password is enabled in Firebase Authentication

