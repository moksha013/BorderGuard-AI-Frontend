import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { ALL_SCREENING_RECORDS } from '../data/mockScreenings'

function History() {
  const { isDark } = useTheme()
  const { currentUser, isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const baseRecords = isAdmin
    ? ALL_SCREENING_RECORDS
    : ALL_SCREENING_RECORDS.filter((r) => r.officerId === currentUser.id)

  const filteredRecords = baseRecords.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.officerName && r.officerName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === 'ALL' || r.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase ${
            isAdmin
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              : 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30'
          }`}>
            {isAdmin ? '🛡️ Global Station Audit Trail' : `👮 ${currentUser.name} Audit Log`}
          </span>
        </div>

        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Screening History & Audit Trail
        </h1>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isAdmin
            ? 'Review combined historical passenger verification records across all active officers.'
            : `Search and review passenger inspections logged during your active duty session.`}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className={`rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
        isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, or document..."
            className={`w-full rounded-lg pl-9 pr-4 py-2 text-xs border transition focus:outline-none ${
              isDark
                ? 'bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-yellow-500'
            }`}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PASS', 'REVIEW', 'REJECT'].map((status) => {
            const isActive = statusFilter === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition border ${
                  isActive
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : isDark
                    ? 'bg-gray-950 text-gray-300 border-gray-800 hover:bg-gray-800'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {status === 'ALL' ? 'All Records' : status}
              </button>
            )
          })}
        </div>
      </div>

      {/* History Records Table */}
      <div className={`overflow-hidden rounded-xl border transition-colors ${
        isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
              <tr>
                <th className="px-6 py-3.5 font-semibold">Screening ID</th>
                <th className="px-6 py-3.5 font-semibold">Passenger Name</th>
                {isAdmin && <th className="px-6 py-3.5 font-semibold">Inspected By</th>}
                <th className="px-6 py-3.5 font-semibold">Travel Document</th>
                <th className="px-6 py-3.5 font-semibold">Timestamp</th>
                <th className="px-6 py-3.5 font-semibold">Risk Score</th>
                <th className="px-6 py-3.5 font-semibold">Verdict</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${isDark ? 'divide-gray-800/60' : 'divide-gray-100'}`}>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const isPass = record.status === 'PASS'
                  const isReview = record.status === 'REVIEW'

                  return (
                    <tr
                      key={record.id}
                      className={`transition ${isDark ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 font-mono font-bold text-yellow-500">
                        {record.id}
                      </td>

                      <td className={`px-6 py-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.passenger}
                      </td>

                      {isAdmin && (
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${
                            isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {record.officerName}
                          </span>
                        </td>
                      )}

                      <td className={`px-6 py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {record.document}
                      </td>

                      <td className={`px-6 py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {record.date}
                      </td>

                      <td className={`px-6 py-4 font-mono font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {record.risk}%
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold border ${
                          isPass
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : isReview
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                            : 'bg-red-500/10 text-red-500 border-red-500/30'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className={`px-6 py-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    No matching screening records found for this profile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'
        }`}>
          <span>Showing {filteredRecords.length} records</span>
          <span>Station Terminal #04 • {isAdmin ? 'Global Central Audit' : `${currentUser.badge} Session Audit`}</span>
        </div>
      </div>
    </div>
  )
}

export default History