import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function Login() {
  const { login, users } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDemoId, setSelectedDemoId] = useState(null)

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const result = login(username, password)
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        setError(result.error)
        setIsLoading(false)
      }
    }, 250)
  }

  const handleQuickFill = (user, autoSubmit = false) => {
    setUsername(user.username)
    setPassword(user.password)
    setSelectedDemoId(user.id)
    setError('')

    if (autoSubmit) {
      setIsLoading(true)
      setTimeout(() => {
        const result = login(user.username, user.password)
        if (result.success) {
          if (result.user.role === 'admin') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        } else {
          setError(result.error)
          setIsLoading(false)
        }
      }, 200)
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 transition-colors relative ${
        isDark ? 'bg-gray-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Bar: Terminal Status & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-xs font-mono tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Checkpoint Delta-4 • Terminal #04 [Online]
          </span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
            isDark
              ? 'bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
        >
          <span>{isDark ? '☀️' : '🌙'}</span>
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-3xl mb-3 shadow-inner">
            🛡️
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400">
            AuthenX
          </h1>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Smarter Identity. Safer Access.
          </p>
          <p className={`text-sm mt-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Secure Border Control & Verification Terminal
          </p>
        </div>

        {/* Login Form Container */}
        <div
          className={`rounded-2xl border p-7 shadow-xl backdrop-blur-sm transition-all ${
            isDark
              ? 'bg-gray-900/90 border-gray-800 shadow-black/40'
              : 'bg-white border-gray-200 shadow-slate-200/60'
          }`}
        >
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500 flex items-start gap-2 animate-shake">
              <span className="text-sm">⚠️</span>
              <p className="flex-1 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className={`block text-xs font-semibold mb-1.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Officer / Admin Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. arjun or admin"
                  className={`w-full rounded-lg px-3.5 py-2.5 text-sm border font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                    isDark
                      ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500'
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-sm pointer-events-none">
                  👤
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-xs font-semibold mb-1.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Access Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  className={`w-full rounded-lg px-3.5 py-2.5 text-sm border font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                    isDark
                      ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 text-xs transition"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 px-4 py-2.5 text-sm font-bold text-black transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Terminal</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Quick-Fill Section */}
          <div className="mt-6 pt-5 border-t border-inherit">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ⚡ Quick Demo Access (Judges & Testing)
              </span>
              <span className="text-[10px] text-yellow-500 font-mono">1-Click Auto Fill</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {users.map((u) => {
                const isSelected = selectedDemoId === u.id
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickFill(u, false)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition ${
                      isSelected
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : isDark
                        ? 'border-gray-800 bg-gray-950/60 hover:bg-gray-800/80 hover:border-gray-700'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{u.avatar}</span>
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {u.name}
                        </p>
                        <p className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          User: <strong className="text-yellow-400">{u.username}</strong> • Pass: <span className="font-mono">{u.password}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                      u.role === 'admin'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {u.role === 'admin' ? 'Admin Portal' : 'Officer Portal'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Security Notice */}
        <p className={`text-center text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          AuthenX Secure Terminal • Official SIH Checkpoint Simulation
        </p>
      </div>
    </div>
  )
}

export default Login
