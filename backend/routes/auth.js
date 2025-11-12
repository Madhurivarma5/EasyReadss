import express from 'express'
import { verifyToken, getUserInfo } from '../middleware/auth.js'

const router = express.Router()

/**
 * @route   GET /api/auth/verify
 * @desc    Verify authentication token
 * @access  Public
 */
router.get('/verify', verifyToken, async (req, res) => {
  try {
    const userInfo = await getUserInfo(req.user.uid)
    res.json({
      success: true,
      user: userInfo
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    })
  }
})

/**
 * @route   GET /api/auth/user
 * @desc    Get current user information
 * @access  Private
 */
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userInfo = await getUserInfo(req.user.uid)
    res.json({
      success: true,
      user: userInfo
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user information'
    })
  }
})

export default router

