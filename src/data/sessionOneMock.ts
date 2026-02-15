import type { DashboardRoute, Metric } from '../types/fintech';

export const DEFAULT_ROUTE: DashboardRoute = {
  title: 'Overview',
  navKey: 'overview',
};

export const SESSION_ONE_METRICS: Metric[] = [
  { id: 'm1', label: 'Assets Under Management', value: '$5.42M', delta: 2.23 },
  { id: 'm2', label: '30D Net Flow', value: '$832K', delta: -1.04 },
  { id: 'm3', label: 'Active KYC Reviews', value: '184', delta: 4.71 },
  { id: 'm4', label: 'Payment Success Rate', value: '99.1%', delta: 0.33 },
];
