import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { isAdmin } from './utils/admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Books from './pages/Books'
import DigitalBooks from './pages/DigitalBooks'
import Admin from './pages/Admin'

function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/login" />
  }
  if (!isAdmin(currentUser.email)) {
    return <Navigate to="/home" />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/books"
        element={
          <PrivateRoute>
            <Books />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital-books"
        element={
          <PrivateRoute>
            <DigitalBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App

