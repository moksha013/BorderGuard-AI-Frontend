import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function PasswordPromptModal({ isOpen, targetUser, onClose, onSuccess }) {
  const { switchUserWithPassword } = useAuth()
  const { isDark } = useTheme()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !targetUser) return null

  const handleClose = () => {
    setPassword('')
    setError('')
    setIsLoading(false)
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const res = switchUserWithPassword(targetUser.id, password)
      if (res.success) {
        setIsLoading(false)
        setPassword('')
        if (onSuccess) onSuccess(targetUser)
        handleClose()
      } else {
        setIsLoading(false)
        setError(res.error || 'Incorrect password. Authorization failed.')
      }
    }, 200)
  }

  const handleQuickFill = () => {
    setPassword(targetUser.password)
    setError('')
  }

  const isAdminElevation = targetUser.role === 'admin'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all ${
          isDark
            ? 'bg-gray-900 border-gray-800 text-white shadow-black/80'
            : 'bg-white border-gray-200 text-gray-900 shadow-slate-300'
        }`}
      >
        {/* Header Icon & Title */}
        <div className="flex items-start justify-between pb-4 border-b border-inherit">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border text-2xl ${
                isAdminElevation
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  : 'bg-yellow-400/10 border-yellow-400/30 text-yellow-500'
              }`}
            >
              {isAdminElevation ? '🛡️' : '🔐'}
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isAdminElevation ? 'Supervisor Clearance Required' : 'Authentication Required'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter password to switch profile
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className={`p-1 rounded-lg text-xs transition ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-black hover:bg-gray-100'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Target Profile Card */}
        <div
          className={`my-4 p-3 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-gray-950/70 border-gray-800' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{targetUser.avatar}</span>
            <div>
              <p className="text-xs font-bold">{targetUser.name}</p>
              <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {targetUser.badge} • {targetUser.title}
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              isAdminElevation
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30'
            }`}
          >
            {targetUser.role === 'admin' ? 'Admin Portal' : 'Officer'}
          </span>
        </div>

        {isAdminElevation && (
          <div className="mb-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <p className="text-[11px] leading-tight">
              Officers cannot access the Admin Portal without Chief Inspector authorization.
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-shake">
            <span>⛔</span>
            <p className="font-semibold text-[11px]">{error}</p>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="switch-password-input"
                className={`block text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Password for {targetUser.username}
              </label>

              {/* Demo 1-click helper for judges */}
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-yellow-500 hover:text-yellow-400 underline font-mono cursor-pointer"
              >
                Auto-fill demo ({targetUser.password})
              </button>
            </div>

            <div className="relative">
              <input
                id="switch-password-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={`w-full rounded-lg px-3.5 py-2 text-sm border font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                  isDark
                    ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-200 text-xs transition"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isDark
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-black transition shadow cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <span className="h-3 w-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Unlock & Switch</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordPromptModal
