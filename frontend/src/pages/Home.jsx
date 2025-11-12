import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-content">
          <h1 className="nav-logo">EasyReads</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
      
      <main className="home-main">
        <div className="home-content">
          <div className="welcome-section">
            <h2>Welcome to EasyReads!</h2>
            <p>You have successfully logged in.</p>
          </div>
          
          <div className="user-info-card">
            <h3>User Information</h3>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{currentUser?.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID:</span>
              <span className="info-value">{currentUser?.uid || 'N/A'}</span>
            </div>
          </div>
          
          <div className="placeholder-content">
            <p>This is a placeholder home page.</p>
            <p>You can build your EasyReads features here!</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

