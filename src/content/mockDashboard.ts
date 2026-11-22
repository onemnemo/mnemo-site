/**
 * Sample data for the account and admin designs. Replace with real API calls once
 * sign in and sync exist (see src/lib).
 */
export const ME = {
  name: 'Ingrid',
  email: 'ingrid@example.com',
  plan: 'Free starter',
  storageUsedGb: 1.2,
  storageTotalGb: 2,
  lastSync: '2 minutes ago',
  library: [
    { value: '214', text: 'notes' },
    { value: '3,812', text: 'flashcards' },
    { value: '27', text: 'mind maps' },
  ],
  devices: [
    { name: 'Desktop at home', os: 'Windows 11', seen: 'Synced 2 minutes ago', current: true },
    { name: 'School laptop', os: 'macOS 15', seen: 'Synced yesterday' },
    { name: 'Galaxy Tab S9', os: 'Android 15', seen: 'Synced 3 days ago' },
  ],
}

export const ADMIN_STATS = [
  { value: '48,210', text: 'accounts' },
  { value: '12,904', text: 'active this week' },
  { value: '71,553', text: 'synced devices' },
  { value: '3.4 TB', text: 'sync storage in use' },
]

/** Sync sessions per day, oldest first. */
export const DAILY_SYNCS = [31, 34, 33, 38, 41, 36, 29, 35, 40, 44, 47, 43, 39, 50].map(
  (k) => k * 1000,
)

export const DOWNLOADS = [
  { os: 'Windows', share: 0.58 },
  { os: 'macOS', share: 0.29 },
  { os: 'Linux', share: 0.13 },
]

export type UserStatus = 'Active' | 'Invited' | 'Suspended'

export const USERS: {
  name: string
  email: string
  plan: string
  devices: number
  seen: string
  status: UserStatus
}[] = [
  {
    name: 'Ingrid Berg',
    email: 'ingrid@example.com',
    plan: 'Free starter',
    devices: 3,
    seen: 'Today',
    status: 'Active',
  },
  {
    name: 'Amir Haddad',
    email: 'amir@example.com',
    plan: 'Plus',
    devices: 2,
    seen: 'Today',
    status: 'Active',
  },
  {
    name: 'Sofia Lindqvist',
    email: 'sofia@example.com',
    plan: 'Self hosted',
    devices: 4,
    seen: 'Yesterday',
    status: 'Active',
  },
  {
    name: 'Kenji Mori',
    email: 'kenji@example.com',
    plan: 'Free starter',
    devices: 1,
    seen: '5 days ago',
    status: 'Invited',
  },
  {
    name: 'Lucia Romero',
    email: 'lucia@example.com',
    plan: 'Plus',
    devices: 2,
    seen: '2 weeks ago',
    status: 'Active',
  },
  {
    name: 'Tom Okafor',
    email: 'tom@example.com',
    plan: 'Free starter',
    devices: 1,
    seen: '1 month ago',
    status: 'Suspended',
  },
]
