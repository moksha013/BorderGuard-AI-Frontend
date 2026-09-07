import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import ScreeningPieChart from '../components/ScreeningPieChart'
import { OFFICER_STATS, ALL_SCREENING_RECORDS } from '../data/mockScreenings'

function Dashboard() {
  const { isDark } = useTheme()
  const { currentUser, isAdmin } = useAuth()

  const stats = OFFICER_STATS[currentUser.id] || OFFICER_STATS.admin

  const recentScreenings = isAdmin
    ? ALL_SCREENING_RECORDS.slice(0, 5)
    : ALL_SCREENING_RECORDS.filter((r) => r.officerId === currentUser.id).slice(0, 4)

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase ${
              isAdmin
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30'
            }`}>
              {isAdmin ? '🛡️ Central Supervisory View' : `👮 ${currentUser.name} Workspace`}
            </span>
            <span className="text-xs font-mono text-gray-500">Badge: {currentUser.badge}</span>
          </div>

          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isAdmin ? 'Station Overview Dashboard' : 'Officer Screening Dashboard'}
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isAdmin
              ? 'Combined intelligence aggregated across all active terminal checkpoints.'
              : `Viewing individual screening records and clearance metrics logged by ${currentUser.name}.`}
          </p>
        </div>

        <Link
          to="/screening"
          className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 font-semibold text-black transition shadow-sm self-start sm:self-auto"
        >
          <span>+</span>
          <span>New Screening</span>
        </Link>
      </div>

      {/* Admin Quick Notice if in Admin Mode */}
      {isAdmin && (
        <div className={`rounded-xl border p-4 flex items-center justify-between gap-4 ${
          isDark
            ? 'bg-purple-950/20 border-purple-800/40 text-purple-300'
            : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="text-xs font-bold">Admin Portal Active</p>
              <p className="text-[11px] opacity-90">
                You are viewing the combined data of all officers. Switch user in the top-right header to view individual officer profiles.
              </p>
            </div>
          </div>

          <Link
            to="/admin"
            className="text-xs font-bold underline hover:opacity-80 whitespace-nowrap"
          >
            Go to Admin Oversight →
          </Link>
        </div>
      )}

      {/* Replaced Button Cards with Interactive Pie Chart (Scoped to User or Combined Admin) */}
      <ScreeningPieChart data={stats.chartData} />

      {/* Recent Screenings Card */}
      <div className={`rounded-xl border p-6 transition-colors ${
        isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 mb-5 border-inherit">
          <div>
            <h2 className="text-lg font-semibold">
              {isAdmin ? "Station Recent Screenings (All Officers)" : `Recent Screenings by ${currentUser.name}`}
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isAdmin
                ? "Combined stream of recent verifications from all active officers."
                : "Activity logged specifically during your active inspection session."}
            </p>
          </div>

          <Link
            to="/history"
            className="text-xs font-semibold text-yellow-500 hover:underline"
          >
            View All History →
          </Link>
        </div>

        <div className="divide-y divide-inherit">
          {recentScreenings.map((screening) => {
            const isPass = screening.status === 'PASS'
            const isReview = screening.status === 'REVIEW'

            return (
              <div
                key={screening.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-yellow-500">
                      {screening.id}
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {screening.passenger}
                    </span>
                    {isAdmin && (
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                        isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {screening.officerName}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {screening.document} • {screening.date}
                  </p>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className={`text-xs font-mono font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {screening.risk}% Risk
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                    isPass
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                      : isReview
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : 'bg-red-500/10 text-red-500 border-red-500/30'
                  }`}>
                    {screening.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard