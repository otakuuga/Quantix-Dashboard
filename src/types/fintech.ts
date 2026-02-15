export type ThemeMode = 'light' | 'dark';

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

export type KYCStatus = 'not_started' | 'in_progress' | 'submitted' | 'verified' | 'rejected';

export interface Transaction {
  id: string;
  timestamp: string;
  account: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  status: 'pending' | 'completed' | 'failed';
  note?: string;
}
