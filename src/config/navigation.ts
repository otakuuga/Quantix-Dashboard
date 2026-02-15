import type { NavItem } from '../types/fintech';

export const SIDEBAR_NAV: NavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'markets', label: 'Markets' },
  { key: 'transactions', label: 'Transactions', badgeCount: 12 },
  { key: 'kyc', label: 'KYC Pipeline', badgeCount: 3 },
  { key: 'settings', label: 'Settings' },
];
