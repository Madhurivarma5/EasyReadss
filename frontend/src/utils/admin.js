// Admin utility functions

// Get admin emails from environment variable or use default
const getAdminEmails = () => {
  const envAdmins = import.meta.env.VITE_ADMIN_EMAILS
  if (envAdmins) {
    return envAdmins.split(',').map(email => email.trim().toLowerCase())
  }
  // Default admin emails (you can change these)
  return ['admin@easyreads.com', 'admin@example.com']
}

// Check if user is admin
export const isAdmin = (userEmail) => {
  if (!userEmail) return false
  const adminEmails = getAdminEmails()
  return adminEmails.includes(userEmail.toLowerCase())
}

