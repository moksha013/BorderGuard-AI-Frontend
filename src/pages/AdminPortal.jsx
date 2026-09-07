import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { OFFICER_STATS, ALL_SCREENING_RECORDS } from '../data/mockScreenings'

function AdminPortal() {
  const { isDark } = useTheme()
  const { switchUser } = useAuth()

  const officer1 = OFFICER_STATS.officer_1
  const officer2 = OFFICER_STATS.officer_2
  const adminStats = OFFICER_STATS.admin

  const officers = [
    {
      id: 'officer_1',
      name: officer1.name,
      badge: officer1.badge,
      status: 'On Duty • Active',
      screened: officer1.totalScreened,
      passed: `${officer1.passed} (${officer1.passRate})`,
      review: officer1.needsReview,
      rejected: officer1.rejected,
      avatar: '👮‍♂️'
    },
    {
      id: 'officer_2',
      name: officer2.name,
      badge: officer2.badge,
      status: 'On Duty • Active',
      screened: officer2.totalScreened,
      passed: `${officer2.passed} (${officer2.passRate})`,
      review: officer2.needsReview,
      rejected: officer2.rejected,
      avatar: '👮'
    }
  ]

  const highRiskIncidents = ALL_SCREENING_RECORDS.filter(
    (r) => r.status === 'REJECT' || r.status === 'REVIEW'
  )

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-inherit">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase">
              System Administration
            </span>
            <span className="text-xs font-mono text-gray-500">Terminal Station #04</span>
          </div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Supervisory Oversight & Roster
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Aggregated station intelligence combining all active officer profiles and detention audits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className={`rounded-lg px-4 py-2 text-xs font-semibold border transition self-start sm:self-auto ${
            isDark
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm'
          }`}
        >
          🖨 Export Station Summary
        </button>
      </div>

      {/* Station-Wide Aggregate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className={`rounded-xl border p-5 transition-colors ${
          isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
        }`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Combined Station Total</p>
          <p className="mt-2 text-3xl font-bold font-mono text-yellow-500">{adminStats.totalScreened}</p>
          <p className="mt-1 text-[11px] text-gray-500">Across 2 Active Officers</p>
        </div>

        <div className={`rounded-xl border p-5 transition-colors ${
          isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
        }`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Cleared (Pass)</p>
          <p className="mt-2 text-3xl font-bold font-mono text-emerald-500">{adminStats.passed}</p>
          <p className="mt-1 text-[11px] text-emerald-500/80">{adminStats.passRate} Station Pass Rate</p>
        </div>

        <div className={`rounded-xl border p-5 transition-colors ${
          isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
        }`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Secondary Referrals</p>
          <p className="mt-2 text-3xl font-bold font-mono text-amber-500">{adminStats.needsReview}</p>
          <p className="mt-1 text-[11px] text-gray-500">Physical verification required</p>
        </div>

        <div className={`rounded-xl border p-5 transition-colors ${
          isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
        }`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Interceptions & Detentions</p>
          <p className="mt-2 text-3xl font-bold font-mono text-rose-500">{adminStats.rejected}</p>
          <p className="mt-1 text-[11px] text-rose-500/80">Tampering & fraud caught</p>
        </div>
      </div>

      {/* Officer Breakdown Table */}
      <div className={`rounded-xl border p-6 transition-colors ${
        isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 mb-5 border-inherit">
          <div>
            <h2 className="text-lg font-semibold">
              Officer Insights
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Individual Officer Activity & Clearance Overview
            </p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border ${
            isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200'
          }`}>
            2 Officers Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                <th className="pb-3 font-semibold">Officer / Badge</th>
                <th className="pb-3 font-semibold">Duty Status</th>
                <th className="pb-3 font-semibold">Total Inspected</th>
                <th className="pb-3 font-semibold">Clearances Granted</th>
                <th className="pb-3 font-semibold">Secondary Referrals</th>
                <th className="pb-3 font-semibold">Interceptions (Reject)</th>
                <th className="pb-3 font-semibold text-right">Quick View</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-800/60' : 'divide-gray-100'}`}>
              {officers.map((off) => (
                <tr key={off.id} className={`transition ${isDark ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'}`}>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{off.avatar}</span>
                      <div>
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {off.name}
                        </span>
                        <span className={`block text-[11px] font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Badge: {off.badge}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {off.status}
                    </span>
                  </td>

                  <td className={`py-3.5 font-mono font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {off.screened}
                  </td>

                  <td className="py-3.5 font-mono text-emerald-500 font-semibold">
                    {off.passed}
                  </td>

                  <td className="py-3.5 font-mono text-amber-500 font-semibold">
                    {off.review} cases
                  </td>

                  <td className="py-3.5 font-mono text-rose-500 font-bold">
                    {off.rejected} cases
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => switchUser(off.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold border transition ${
                        isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border-gray-700'
                          : 'bg-white hover:bg-gray-100 text-yellow-600 border-gray-300 shadow-sm'
                      }`}
                    >
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Station Security Interceptions Audit */}
      <div className={`rounded-xl border p-6 transition-colors ${
        isDark ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 mb-4 border-inherit">
          <div>
            <h2 className="text-lg font-semibold">
              Security Alerts & Anomaly Reports
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Passenger anomalies requiring administrative attention
            </p>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/30 font-semibold">
            {highRiskIncidents.length} Critical Alerts
          </span>
        </div>

        <div className="divide-y divide-inherit">
          {highRiskIncidents.map((incident) => (
            <div key={incident.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-yellow-500">{incident.id}</span>
                  <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {incident.passenger}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    • {incident.document}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Intercepted by: <strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>{incident.officerName}</strong> on {incident.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-rose-500">
                  {incident.risk}% Risk
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                  incident.status === 'REJECT'
                    ? 'bg-red-500/10 text-red-500 border-red-500/30'
                    : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                }`}>
                  {incident.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPortal
