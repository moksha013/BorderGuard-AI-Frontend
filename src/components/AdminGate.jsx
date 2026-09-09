import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Eye, EyeOff } from "lucide-react";

function AdminGate({ onUnlocked }) {
  const { currentUser, switchUserWithPassword } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const res = switchUserWithPassword('admin', password)
      if (res.success) {
        setIsLoading(false)
        if (onUnlocked) onUnlocked()
      } else {
        setIsLoading(false)
        setError('Access Denied: Invalid administrator password.')
      }
    }, 200)
  }

  const handleQuickFill = () => {
    setPassword('admin123')
    setError('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
      <div
        className={`w-full max-w-lg rounded-2xl border p-8 shadow-2xl transition-all ${
          isDark
            ? 'bg-gray-900/90 border-gray-800 text-white shadow-black/60'
            : 'bg-white border-gray-200 text-gray-900 shadow-slate-200/80'
        }`}
      >
        {/* Terminal Header Badge */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
            
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase">
            Admin
          </span>
        </div>

        {/* Center Shield Icon */}
        <div className="text-center mb-6">
          
          <h2 className="text-2xl font-bold tracking-tight">
            Supervisor Clearance Required
          </h2>
        
        </div>

        {/* Current Officer vs Required Clearance Comparison */}
        <div
          className={`mb-6 p-3.5 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-gray-950/60 border-gray-800' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            
            <div>
              <p className="text-xs font-semibold">{currentUser?.name}</p>
              <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Level: Standard Officer
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-purple-400 block">
              Required: Chief Inspector
            </span>
            <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Code: ADM-01
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-shake">
            <span>⛔</span>
            <p className="font-semibold text-xs flex-1">{error}</p>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="admin-gate-password"
                className={`block text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Enter Administrator Password
              </label>

              {/* Demo 1-click helper for judges */}
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-yellow-500 hover:text-yellow-400 underline font-mono cursor-pointer"
              >
                Auto-fill demo
              </button>
            </div>

            <div className="relative">
              <input
                id="admin-gate-password"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full rounded-lg px-3.5 py-2.5 text-sm border font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                  isDark
                    ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 text-xs transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold border transition text-center cursor-pointer ${
                isDark
                  ? 'border-gray-800 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back to Officer Dashboard
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-lg text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-black transition shadow-md cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Console</span>
                 
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminGate
