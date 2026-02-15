export type ThemeMode = 'light' | 'dark' | 'system';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
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
  label: string;
  value: string;
  delta: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface CandlestickPoint {
  timestamp: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

export interface AllocationDatum {
  name: string;
  value: number;
}

export interface Transaction {
  id: string;
  timestamp: string;
  account: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  note?: string;
}

export interface KYCIdentityForm {
  fullName: string;
  email: string;
  country: string;
}

export interface KYCDocumentForm {
  idType: 'passport' | 'driver_license' | 'national_id';
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
