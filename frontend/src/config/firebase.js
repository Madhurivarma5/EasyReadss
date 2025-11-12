import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Validate Firebase configuration
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key-here') {
  console.error('❌ Firebase API Key is missing or not configured!')
  console.error('Please update your frontend/.env file with your Firebase credentials.')
  console.error('Get your config from: Firebase Console > Project Settings > General > Your apps')
}

if (!firebaseConfig.projectId || firebaseConfig.projectId === 'your-project-id') {
  console.error('❌ Firebase Project ID is missing or not configured!')
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app

