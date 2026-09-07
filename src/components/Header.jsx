import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { currentUser, switchUser, users, logout } = useAuth()

  return (
    <header className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b transition-colors ${
      isDark ? 'border-gray-800' : 'border-gray-200'
    }`}>
      {/* Station & Status info */}
      <div className="flex items-center gap-3">
        <div className={`h-2.5 w-2.5 rounded-full ${
          isDark ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'
        }`} />
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentUser?.station || 'Checkpoint Delta-4'}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              currentUser?.role === 'admin'
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30'
            }`}>
              {currentUser?.role === 'admin' ? '🛡️ Admin Portal' : '👮 Officer Portal'}
            </span>
          </div>
          <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Active Profile: <strong className={isDark ? 'text-gray-200' : 'text-gray-800'}>{currentUser?.name || 'Officer'}</strong> ({currentUser?.badge || 'ID'})
          </p>
        </div>
      </div>

      {/* Right Controls: Portal Profile Switcher, Theme Toggle & Logout */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
        {/* User / Portal Switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="portal-user-select" className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Switch:
          </label>
          <select
            id="portal-user-select"
            value={currentUser?.id}
            onChange={(e) => switchUser(e.target.value)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition cursor-pointer focus:outline-none ${
              isDark
                ? 'bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800 focus:border-yellow-400'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm focus:border-yellow-500'
            }`}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.avatar} {u.name} ({u.role === 'admin' ? 'Admin' : 'Officer'})
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark and light mode"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition cursor-pointer ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
        >
          <span>{isDark ? '☀️' : '🌙'}</span>
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          aria-label="Log out of terminal"
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition cursor-pointer ${
            isDark
              ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
              : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 shadow-sm'
          }`}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Header
