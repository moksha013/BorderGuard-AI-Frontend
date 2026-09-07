import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { isDark } = useTheme()
  const { currentUser, isAdmin } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/screening', label: 'New Screening' },
    { to: '/history', label: 'History' },
    { to: '/analytics', label: 'Analytics' }
  ]

  if (isAdmin) {
    links.push({ to: '/admin', label: 'Admin Oversight 🛡️' })
  }

  return (
    <aside className={`w-64 min-h-screen border-r p-6 transition-colors flex flex-col justify-between ${
      isDark ? 'bg-black text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200 shadow-sm'
    }`}>
      <div>
        <h1 className="text-2xl font-bold text-yellow-400">
          BorderGuard
        </h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          AI Screening Platform
        </p>

        <nav className="mt-8 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-yellow-400 text-black font-semibold'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-900 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Officer / Admin Identity Card */}
      <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentUser.avatar}</span>
          <div className="overflow-hidden">
            <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentUser.name}
            </p>
            <p className={`text-[11px] truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentUser.badge} • {currentUser.role === 'admin' ? 'Supervisor' : 'Officer'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar