# Quick Start Guide

## Prerequisites
- Node.js v18+ installed
- Firebase project created

## Step 1: Install Dependencies

From the root directory:
```bash
npm run install:all
```

Or manually:
```bash
cd frontend && npm install
cd ../backend && npm install
```

## Step 2: Configure Firebase

### Frontend Configuration

1. Create `frontend/.env` file:
```bash
cd frontend
cp .env.example .env
```

2. Get Firebase config from Firebase Console:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the config values

3. Update `frontend/.env` with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Backend Configuration (Optional)

1. Create `backend/.env` file:
```bash
cd backend
cp .env.example .env
```

2. (Optional) For token verification, add Firebase Admin SDK key to `backend/.env`

## Step 3: Enable Firebase Authentication

1. Go to Firebase Console > Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Save

## Step 4: Run the Application

### Option 1: Run separately (recommended for development)

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

### Option 2: Use root scripts
```bash
npm run dev:frontend  # In one terminal
npm run dev:backend   # In another terminal
```

## Step 5: Test the Application

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create an account with:
   - Username
   - Email
   - Password (min 6 characters)
4. You'll be redirected to the home page
5. Logout and test login

## API Testing

### Using REST Client (VS Code Extension)

1. Install "REST Client" extension
2. Open `backend/tests/api.test.http`
3. Replace `@token` with a Firebase ID token
4. Click "Send Request" above each endpoint

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Verify token (get token from browser console after login)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/auth/verify
```

## Troubleshooting

### Image not showing
- Ensure the ChatGPT image is in `frontend/public/` folder
- Check browser console for 404 errors

### Firebase errors
- Verify all environment variables are set correctly
- Check Firebase Console > Authentication is enabled
- Ensure Email/Password provider is enabled

### CORS errors
- Backend should be running on port 5000
- Frontend proxy is configured in `vite.config.js`

### Port already in use
- Change port in `frontend/vite.config.js` (server.port)
- Change port in `backend/.env` (PORT)

