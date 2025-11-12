# EasyReads

A modern authentication application built with React, Firebase, and Express.js.

## Project Structure

```
EasyReads/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── pages/     # Page components (Login, Signup, Home)
│   │   ├── contexts/  # React contexts (AuthContext)
│   │   ├── config/    # Configuration files (Firebase)
│   │   └── ...
│   └── public/        # Static assets
├── backend/           # Express.js backend API
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   └── ...
└── README.md
```

## Features

- 🔐 User authentication with Firebase
- 📝 Login and Signup pages
- 🏠 Protected home page
- 🎨 Modern, responsive UI
- 🔒 Secure API endpoints
- 🧪 API testing friendly structure

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Authentication enabled

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the Firebase configuration values

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your Firebase configuration to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. (Optional) Set up Firebase Admin SDK:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Add the JSON content to `.env` as `FIREBASE_SERVICE_ACCOUNT_KEY`
   - Note: The API will work without this, but token verification will be mocked

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Authentication
- `GET /api/auth/verify` - Verify authentication token
  - Headers: `Authorization: Bearer <token>`
- `GET /api/auth/user` - Get current user information
  - Headers: `Authorization: Bearer <token>`

## Testing the API

You can test the API endpoints using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)
- REST Client (VS Code extension)

### Example cURL request:

```bash
# Health check
curl http://localhost:5000/api/health

# Verify token (replace <token> with actual Firebase ID token)
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/auth/verify
```

## Usage

1. Start both frontend and backend servers
2. Navigate to `http://localhost:3000`
3. Click "Sign Up" to create a new account
4. Fill in username, email, and password
5. After signup, you'll be redirected to the home page
6. You can logout and sign in again using your credentials

## Technologies Used

- **Frontend:**
  - React 18
  - Vite
  - React Router
  - Firebase SDK
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - Firebase Admin SDK
  - CORS

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## Notes

- User data (email, password) is stored securely in Firebase Authentication
- Username is collected during signup but currently not stored in Firebase (can be extended to use Firestore)
- The backend API is designed to be testing-friendly with clear endpoints and error messages
- All routes are protected except login and signup pages

## License

ISC

