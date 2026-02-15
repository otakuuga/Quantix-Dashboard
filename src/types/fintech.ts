export type ThemeMode = 'light' | 'dark' | 'system';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type TransactionDirection = 'inbound' | 'outbound';
export type TransactionCategory = 'Software' | 'Food' | 'Transfer' | 'Tax';
export type KYCStatus = 'not_started' | 'in_progress' | 'submitted' | 'verified' | 'rejected';

export interface NavItem {
  key: string;
  label: string;
  badgeCount?: number;
}

export interface DashboardRoute {
  title: string;
  navKey: string;
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Transaction {
  id: string;
  date: string;
  entity: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionDirection;
  category: TransactionCategory;
  currency?: CurrencyCode;
}

export interface KYCIdentityForm {
  fullName: string;
  email: string;
  country: string;
}

export interface KYCDocumentForm {
  idType: 'passport' | 'drivers_license' | 'national_id';
  idNumber: string;
  document?: File;
}

export interface KYCWorkflowState {
  step: number;
  totalSteps: number;
  status: KYCStatus;
}

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: Exclude<ThemeMode, 'system'>;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}
