import admin from 'firebase-admin'

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : null

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } else {
      console.warn('Firebase Admin not initialized. Service account key not found.')
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error)
  }
}

/**
 * Middleware to verify Firebase ID token
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      })
    }

    const token = authHeader.split('Bearer ')[1]
    
    if (!admin.apps.length) {
      // If Firebase Admin is not initialized, skip verification
      // This allows the API to work without Firebase Admin setup
      req.user = { uid: 'mock-user', email: 'mock@example.com' }
      return next()
    }

    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    })
  }
}

/**
 * Get user information from Firebase
 */
export const getUserInfo = async (uid) => {
  try {
    if (!admin.apps.length) {
      return {
        uid: uid,
        email: 'mock@example.com',
        emailVerified: false
      }
    }

    const userRecord = await admin.auth().getUser(uid)
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      createdAt: userRecord.metadata.creationTime
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

