# EasyReads Setup Guide

This guide will help you set up MongoDB and run the EasyReads backend server.

## Prerequisites

- Node.js (v18 or higher) installed
- npm or yarn package manager
- MongoDB installed locally OR MongoDB Atlas account (cloud)

---

## Option 1: MongoDB Local Installation

### Step 1: Install MongoDB

**On Linux (Arch/Ubuntu/Debian):**
```bash
# Arch Linux
sudo pacman -S mongodb-bin mongodb-tools

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mongodb
```

**On macOS:**
```bash
brew install mongodb-community
```

**On Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### Step 2: Start MongoDB Service

**Linux (systemd):**
```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb  # Enable auto-start on boot
```

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
MongoDB should start automatically as a service after installation.

### Step 3: Verify MongoDB is Running

```bash
mongosh  # or mongo (older versions)
```

If you see the MongoDB shell prompt, you're connected!

---

## Option 2: MongoDB Atlas (Cloud - Recommended for Development)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (choose the FREE tier)

### Step 2: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your database user password
5. Add your database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/easyreads`

### Step 3: Configure Network Access

1. In Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your specific IP

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create `.env` File

Create a `.env` file in the `backend` directory:

```bash
touch .env
```

### Step 4: Add Environment Variables

Open `.env` and add:

**For Local MongoDB:**
```env
MONGO_DB_URI=mongodb://localhost:27017/easyreads
PORT=5000
```

**For MongoDB Atlas:**
```env
MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/easyreads?retryWrites=true&w=majority
PORT=5000
```

**Replace:**
- `username` with your MongoDB Atlas username
- `password` with your MongoDB Atlas password
- `cluster` with your cluster name

### Step 5: Start the Backend Server

```bash
npm run dev
```

You should see:
```
connected to mongodb database
Server is running on port 5000
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create `.env` File

```bash
touch .env
```

### Step 4: Add Environment Variables

Open `.env` and add:

```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_API_KEY=your-google-books-api-key
```

### Step 5: Start the Frontend Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Running Both Servers

### Option 1: Run in Separate Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Option 2: Use Root Package.json Scripts

From the root directory:

```bash
# Install all dependencies
npm run install:all

# Start backend (Terminal 1)
npm run dev:backend

# Start frontend (Terminal 2)
npm run dev:frontend
```

---

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**
- Check if MongoDB is running: `mongosh` or check service status
- Verify connection string in `.env` file
- For Atlas: Check network access settings

**Error: "Authentication failed"**
- Verify username and password in connection string
- Make sure database user has proper permissions

### Backend Server Issues

**Error: "Cannot find module"**
- Run `npm install` in the backend directory
- Check if all dependencies are installed

**Error: "Port already in use"**
- Change PORT in `.env` file
- Or kill the process using port 5000:
  ```bash
  # Linux/macOS
  lsof -ti:5000 | xargs kill
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Frontend Issues

**Error: "Failed to fetch"**
- Make sure backend server is running
- Check `VITE_API_BASE_URL` in frontend `.env`
- Verify CORS is enabled in backend (it should be)

---

## Database Schema

The application uses the following MongoDB collections:

- `books` - General books
- `fictionbooks` - Fiction category books
- `sciencebooks` - Science category books
- `biographybooks` - Biography category books
- `fantasybooks` - Fantasy category books
- `historybooks` - History category books
- `technologybooks` - Technology category books
- `romancebooks` - Romance category books
- `ebooks` - E-Books collection
- `audiobooks` - Audiobooks collection

---

## Next Steps

1. **Populate Database**: Add books to your MongoDB collections using the API endpoints or MongoDB shell
2. **Test API**: Visit `http://localhost:5000/api/health` to verify backend is running
3. **Test Frontend**: Visit `http://localhost:5173` and log in

---

## Quick Start Commands Summary

```bash
# 1. Start MongoDB (if local)
sudo systemctl start mongodb  # Linux
# or
brew services start mongodb-community  # macOS

# 2. Backend
cd backend
npm install
# Create .env with MONGO_DB_URI
npm run dev

# 3. Frontend (new terminal)
cd frontend
npm install
# Create .env with Firebase and API keys
npm run dev
```

---

## Need Help?

- Check MongoDB logs: `/var/log/mongodb/mongod.log` (Linux)
- Check backend console for error messages
- Verify all environment variables are set correctly
- Make sure ports 5000 (backend) and 5173 (frontend) are available

