import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAdmin } from '../utils/admin'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Admin.css'

function Admin() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is admin
    if (!currentUser) {
      navigate('/login')
      return
    }

    if (!isAdmin(currentUser.email)) {
      navigate('/home')
      return
    }

    fetchUsers()
  }, [currentUser, navigate])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Get auth token for API call
      const token = await currentUser.getIdToken()
      
      // Try to fetch from backend API
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.users) {
          // Map API response to match table structure
          const mappedUsers = data.users.map(user => ({
            uid: user.uid,
            displayName: user.displayName || 'N/A',
            emailVerified: user.emailVerified,
            creationTime: user.metadata?.creationTime || user.creationTime || 'N/A',
            lastSignInTime: user.metadata?.lastSignInTime || user.lastSignInTime || 'N/A',
            providerId: user.providerData?.[0]?.providerId || 'password'
          }))
          setUsers(mappedUsers)
          setError('')
        } else {
          throw new Error('Invalid response from server')
        }
      } else {
        // If backend endpoint fails, show current user as fallback
        if (currentUser) {
          setUsers([{
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'N/A',
            email: currentUser.email,
            emailVerified: currentUser.emailVerified,
            creationTime: currentUser.metadata?.creationTime || 'N/A',
            lastSignInTime: currentUser.metadata?.lastSignInTime || 'N/A',
            providerId: currentUser.providerData?.[0]?.providerId || 'password'
          }])
        }
        setError('Backend API not available. Showing current user only. Implement /api/admin/users endpoint for full user list.')
      }
      
      setLoading(false)
    } catch (err) {
      console.error('Error fetching users:', err)
      // Fallback to showing current user
      if (currentUser) {
        setUsers([{
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'N/A',
          // Email excluded as per requirements
          emailVerified: currentUser.emailVerified,
          creationTime: currentUser.metadata?.creationTime || 'N/A',
          lastSignInTime: currentUser.metadata?.lastSignInTime || 'N/A',
          providerId: currentUser.providerData?.[0]?.providerId || 'password'
        }])
      }
      setError('Backend API not available. Showing current user only. Make sure backend is running and /api/admin/users endpoint is implemented.')
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  if (!currentUser || !isAdmin(currentUser.email)) {
    return null
  }

  return (
    <div className="admin-page">
      <Navbar />
      <main className="admin-main">
        <div className="admin-content">
          <div className="admin-header">
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Manage users and system settings</p>
          </div>

          {error && (
            <div className="admin-alert">
              <p>{error}</p>
              <p className="admin-alert-note">
                Note: To view all users, implement a backend endpoint that uses Firebase Admin SDK.
                Passwords cannot be retrieved as they are securely hashed by Firebase.
              </p>
            </div>
          )}

          <div className="admin-section">
            <div className="admin-section-header">
              <h2>User Management</h2>
              <button onClick={fetchUsers} className="admin-refresh-btn" disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {loading ? (
              <div className="admin-loading">Loading user data...</div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Display Name</th>
                      <th>Email Verified</th>
                      <th>Provider</th>
                      <th>Account Created</th>
                      <th>Last Sign In</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="admin-empty">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.uid}>
                          <td className="admin-uid">{user.uid.substring(0, 8)}...</td>
                          <td>{user.displayName}</td>
                          <td>
                            <span className={`admin-badge ${user.emailVerified ? 'verified' : 'unverified'}`}>
                              {user.emailVerified ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td>{user.providerId}</td>
                          <td>{new Date(user.creationTime).toLocaleDateString()}</td>
                          <td>{new Date(user.lastSignInTime).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="admin-info-box">
            <h3>Important Notes:</h3>
            <ul>
              <li>Passwords are securely hashed by Firebase and cannot be retrieved or viewed for security reasons.</li>
              <li>User emails are hidden as per privacy requirements. Only display names and metadata are shown.</li>
              <li>To view all users, implement a backend API endpoint using Firebase Admin SDK.</li>
              <li>Only registered admin users can access this page.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Admin

