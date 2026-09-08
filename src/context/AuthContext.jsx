import { createContext, useContext, useState, useEffect } from 'react'

export const USERS = [
  {
    id: 'officer_1',
    name: 'Officer Arjun Sharma',
    badge: 'BG-401',
    role: 'officer',
    title: 'Border Control Officer',
    station: 'Checkpoint Delta-4',
    avatar: '👮‍♂️',
    username: 'arjun',
    password: 'officer123',
    altPassword: 'password123'
  },
  {
    id: 'officer_2',
    name: 'Officer Vikram Rao',
    badge: 'BG-402',
    role: 'officer',
    title: 'Border Control Officer',
    station: 'Checkpoint Delta-4',
    avatar: '👮',
    username: 'vikram',
    password: 'officer123',
    altPassword: 'password123'
  },
  {
    id: 'admin',
    name: 'Chief Inspector Verma',
    badge: 'HQ-ADMIN-01',
    role: 'admin',
    title: 'Station Administrator / Supervisor',
    station: 'Checkpoint Delta-4',
    avatar: '🛡️',
    username: 'admin',
    password: 'admin123',
    altPassword: 'adminpassword'
  }
]

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authenx_auth') === 'true'
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const savedId = localStorage.getItem('authenx_user_id')
    const found = USERS.find((u) => u.id === savedId)
    return found || USERS[0]
  })

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem('authenx_auth', 'true')
      localStorage.setItem('authenx_user_id', currentUser.id)
    } else {
      localStorage.removeItem('authenx_auth')
    }
  }, [isAuthenticated, currentUser])

  const login = (username, password) => {
    const trimmedUser = (username || '').trim().toLowerCase()
    const trimmedPass = (password || '').trim()

    const matchedUser = USERS.find(
      (u) =>
        u.username.toLowerCase() === trimmedUser &&
        (u.password === trimmedPass || u.altPassword === trimmedPass)
    )

    if (matchedUser) {
      setCurrentUser(matchedUser)
      setIsAuthenticated(true)
      localStorage.setItem('authenx_auth', 'true')
      localStorage.setItem('authenx_user_id', matchedUser.id)
      return { success: true, user: matchedUser }
    }

    return {
      success: false,
      error: 'Invalid username or password. Please check your credentials or use the demo quick-fill below.'
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authenx_auth')
  }

  // Password-verified switching between profiles (strictly required for Admin elevation)
  const switchUserWithPassword = (targetUserId, password) => {
    const target = USERS.find((u) => u.id === targetUserId)
    if (!target) {
      return { success: false, error: 'User profile not found.' }
    }

    if (target.id === currentUser?.id) {
      return { success: true, user: target }
    }

    // Admins have supervisor clearance to view officer workspaces
    if (currentUser?.role === 'admin' && target.role === 'officer') {
      setCurrentUser(target)
      localStorage.setItem('authenx_user_id', target.id)
      return { success: true, user: target }
    }

    // All other switches (especially Officer -> Admin) strictly require password verification
    const trimmedPass = (password || '').trim()
    if (target.password !== trimmedPass && target.altPassword !== trimmedPass) {
      return {
        success: false,
        error: `Incorrect password for ${target.name}. Access denied.`
      }
    }

    setCurrentUser(target)
    localStorage.setItem('authenx_user_id', target.id)
    return { success: true, user: target }
  }

  // Secure legacy switcher: strictly blocks non-admin elevation without password
  const switchUser = (userId) => {
    const found = USERS.find((u) => u.id === userId)
    if (!found) return false

    // STRICT PROTECTION: An officer cannot silently switch to admin
    if (found.role === 'admin' && currentUser?.role !== 'admin') {
      console.warn('Unauthorized elevation attempt: Admin password required')
      return false
    }

    // Allow supervisor to inspect officer profiles
    if (currentUser?.role === 'admin') {
      setCurrentUser(found)
      localStorage.setItem('authenx_user_id', found.id)
      return true
    }

    return false
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        switchUser,
        switchUserWithPassword,
        users: USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
