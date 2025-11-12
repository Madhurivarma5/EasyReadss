import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import admin from 'firebase-admin'

const router = express.Router()

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (Admin only)
 * @access  Private (Admin)
 */
router.get('/users', verifyToken, async (req, res) => {
  try {
    // Check if user is admin (you can implement custom logic here)
    // For now, we'll use environment variable for admin emails
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
    const userEmail = req.user.email?.toLowerCase()

    if (!adminEmails.includes(userEmail)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Admin access required'
      })
    }

    // List all users using Firebase Admin SDK
    const listUsersResult = await admin.auth().listUsers(1000) // Max 1000 users per page
    
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      // Email is excluded as per requirements
      displayName: user.displayName || 'N/A',
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        lastRefreshTime: user.metadata.lastRefreshTime
      },
      providerData: user.providerData.map(provider => ({
        providerId: provider.providerId,
        uid: provider.uid
      }))
    }))

    res.json({
      success: true,
      users: users,
      total: users.length
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    })
  }
})

/**
 * @route   GET /api/admin/user/:uid
 * @desc    Get specific user by UID
 * @access  Private (Admin)
 */
router.get('/user/:uid', verifyToken, async (req, res) => {
  try {
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
    const userEmail = req.user.email?.toLowerCase()

    if (!adminEmails.includes(userEmail)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Admin access required'
      })
    }

    const { uid } = req.params
    const user = await admin.auth().getUser(uid)

    res.json({
      success: true,
      user: {
        uid: user.uid,
        // Email is excluded as per requirements
        displayName: user.displayName || 'N/A',
        emailVerified: user.emailVerified,
        disabled: user.disabled,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        }
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
      message: error.message
    })
  }
})

export default router

