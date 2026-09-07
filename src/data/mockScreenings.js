export const ALL_SCREENING_RECORDS = [
  {
    id: "BG-1042",
    officerId: "officer_1",
    officerName: "Officer Arjun Sharma",
    passenger: "Arjun Sharma",
    document: "Passport (Z5839201)",
    date: "07 Sep 2026, 14:32",
    risk: 18,
    status: "PASS"
  },
  {
    id: "BG-1041",
    officerId: "officer_2",
    officerName: "Officer Vikram Rao",
    passenger: "Michael Chen",
    document: "Passport (E9201844)",
    date: "07 Sep 2026, 13:15",
    risk: 58,
    status: "REVIEW"
  },
  {
    id: "BG-1040",
    officerId: "officer_2",
    officerName: "Officer Vikram Rao",
    passenger: "Elena Rostova",
    document: "National ID (ID4091)",
    date: "07 Sep 2026, 11:40",
    risk: 82,
    status: "REJECT"
  },
  {
    id: "BG-1039",
    officerId: "officer_1",
    officerName: "Officer Arjun Sharma",
    passenger: "David Miller",
    document: "Passport (P1104821)",
    date: "07 Sep 2026, 10:22",
    risk: 12,
    status: "PASS"
  },
  {
    id: "BG-1038",
    officerId: "officer_1",
    officerName: "Officer Arjun Sharma",
    passenger: "Amina Al-Mansoor",
    document: "Passport (N8830192)",
    date: "07 Sep 2026, 09:05",
    risk: 22,
    status: "PASS"
  },
  {
    id: "BG-1037",
    officerId: "officer_2",
    officerName: "Officer Vikram Rao",
    passenger: "Carlos Gomez",
    document: "Passport (G3491022)",
    date: "06 Sep 2026, 16:48",
    risk: 74,
    status: "REJECT"
  },
  {
    id: "BG-1036",
    officerId: "officer_1",
    officerName: "Officer Arjun Sharma",
    passenger: "Priya Patel",
    document: "Visa Sticker (V9012388)",
    date: "06 Sep 2026, 15:10",
    risk: 45,
    status: "REVIEW"
  },
  {
    id: "BG-1035",
    officerId: "officer_2",
    officerName: "Officer Vikram Rao",
    passenger: "Lucas Schmidt",
    document: "Passport (F2901384)",
    date: "06 Sep 2026, 14:02",
    risk: 15,
    status: "PASS"
  }
]

export const OFFICER_STATS = {
  officer_1: {
    name: 'Officer Arjun Sharma',
    badge: 'BG-401',
    totalScreened: 64,
    passed: 58,
    needsReview: 5,
    rejected: 1,
    passRate: '90.6%',
    chartData: [
      { label: 'Passed', count: 58, color: '#10b981', hoverColor: '#059669', desc: 'Clearance approved without flags' },
      { label: 'Needs Review', count: 5, color: '#f59e0b', hoverColor: '#d97706', desc: 'Secondary physical inspection needed' },
      { label: 'Rejected', count: 1, color: '#ef4444', hoverColor: '#dc2626', desc: 'Fraud or tampering detected' }
    ]
  },
  officer_2: {
    name: 'Officer Vikram Rao',
    badge: 'BG-402',
    totalScreened: 64,
    passed: 53,
    needsReview: 9,
    rejected: 2,
    passRate: '82.8%',
    chartData: [
      { label: 'Passed', count: 53, color: '#10b981', hoverColor: '#059669', desc: 'Clearance approved without flags' },
      { label: 'Needs Review', count: 9, color: '#f59e0b', hoverColor: '#d97706', desc: 'Secondary physical inspection needed' },
      { label: 'Rejected', count: 2, color: '#ef4444', hoverColor: '#dc2626', desc: 'Fraud or tampering detected' }
    ]
  },
  admin: {
    name: 'Chief Inspector',
    badge: 'ADM-01',
    totalScreened: 128,
    passed: 111,
    needsReview: 14,
    rejected: 3,
    passRate: '86.7%',
    chartData: [
      { label: 'Passed', count: 111, color: '#10b981', hoverColor: '#059669', desc: 'Combined station clearance' },
      { label: 'Needs Review', count: 14, color: '#f59e0b', hoverColor: '#d97706', desc: 'Combined secondary referrals' },
      { label: 'Rejected', count: 3, color: '#ef4444', hoverColor: '#dc2626', desc: 'Combined fraud interceptions' }
    ]
  }
}
