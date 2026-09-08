import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { isDark } = useTheme()
  const { currentUser, isAdmin, logout } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/screening', label: 'New Screening' },
    { to: '/history', label: 'History' },
    { to: '/analytics', label: 'Analytics' },
    {
      to: '/admin',
      label: isAdmin ? 'Admin Oversight 🛡️' : 'Admin Portal 🔒'
    }
  ]

  return (
    <aside className={`w-64 min-h-screen border-r p-6 transition-colors flex flex-col justify-between ${
      isDark ? 'bg-black text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200 shadow-sm'
    }`}>
      <div>
        <h1 className="text-2xl font-bold text-yellow-400">
          AuthenX
        </h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Smarter Identity. Safer Access.
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="text-2xl flex-shrink-0">{currentUser?.avatar || '👤'}</span>
            <div className="overflow-hidden">
              <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentUser?.name || 'Officer'}
              </p>
              <p className={`text-[11px] truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentUser?.badge || 'ID'} • {currentUser?.role === 'admin' ? 'Supervisor' : 'Officer'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            title="Log out"
            aria-label="Log out"
            className={`p-1.5 rounded-lg border transition cursor-pointer flex-shrink-0 ${
              isDark
                ? 'border-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30'
                : 'border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200'
            }`}
          >
            
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar