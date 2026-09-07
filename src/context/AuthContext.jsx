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

  const switchUser = (userId) => {
    const found = USERS.find((u) => u.id === userId)
    if (found) {
      setCurrentUser(found)
      localStorage.setItem('authenx_user_id', found.id)
    }
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
