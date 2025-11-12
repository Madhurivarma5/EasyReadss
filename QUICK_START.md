# Quick Start Guide - EasyReads

## 🚀 Fast Setup (5 minutes)

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB (Arch Linux)
sudo pacman -S mongodb-bin

# Start MongoDB
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud - Easier)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account → Create cluster
3. Get connection string from "Connect" button
4. Add your IP to Network Access

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MONGO_DB_URI
npm run dev
```

**Backend `.env` file:**
```env
MONGO_DB_URI=mongodb://localhost:27017/easyreads
# OR for Atlas:
# MONGO_DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/easyreads
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env and add your Firebase config
npm run dev
```

**Frontend `.env` file:**
```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_API_KEY=your-google-books-key
```

### 4. Run Both Servers

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

### 5. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/health

---

## ✅ Verification Checklist

- [ ] MongoDB is running (check with `mongosh`)
- [ ] Backend shows "connected to mongodb database"
- [ ] Backend shows "Server is running on port 5000"
- [ ] Frontend shows no console errors
- [ ] Can access http://localhost:5173
- [ ] Can see login/signup page

---

## 🔧 Common Issues

**Backend won't start:**
- Check MongoDB is running
- Verify `.env` file exists and has correct `MONGO_DB_URI`
- Check port 5000 is not in use

**Frontend can't connect to backend:**
- Verify backend is running
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console for CORS errors

**MongoDB connection fails:**
- For local: `sudo systemctl status mongodb`
- For Atlas: Check network access and connection string

---

## 📚 Next Steps

1. Create Firebase project and get config
2. Get Google Books API key (optional, for Digital Books)
3. Add some books to MongoDB collections
4. Test login/signup functionality

For detailed setup, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

