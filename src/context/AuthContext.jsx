import { createContext, useContext, useState, useEffect } from 'react'

export const USERS = [
  {
    id: 'officer_1',
    name: 'Officer Arjun Sharma',
    badge: 'BG-401',
    role: 'officer',
    title: 'Border Control Officer',
    avatar: '👮‍♂️',
    station: 'Terminal #04'
  },
  {
    id: 'officer_2',
    name: 'Officer Vikram Rao',
    badge: 'BG-402',
    role: 'officer',
    title: 'Border Control Officer',
    avatar: '👮',
    station: 'Terminal #04'
  },
  {
    id: 'admin',
    name: 'Chief Inspector Verma',
    badge: 'ADM-01',
    role: 'admin',
    title: 'Station Administrator / Supervisor',
    avatar: '🛡️',
    station: 'Central Command'
  }
]

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('borderguard_user_id')
    const found = USERS.find((u) => u.id === saved)
    return found || USERS[0] // default to Officer 1
  })

  useEffect(() => {
    localStorage.setItem('borderguard_user_id', currentUser.id)
  }, [currentUser])

  const switchUser = (userId) => {
    const found = USERS.find((u) => u.id === userId)
    if (found) {
      setCurrentUser(found)
    }
  }

  const isAdmin = currentUser.role === 'admin'

  return (
    <AuthContext.Provider value={{ currentUser, switchUser, isAdmin, users: USERS }}>
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
