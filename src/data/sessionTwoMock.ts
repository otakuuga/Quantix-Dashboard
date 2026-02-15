import type { ChartData, Metric, Transaction } from '../types/fintech';

export const SESSION_TWO_METRICS: Metric[] = [
  { id: 'metric-1', title: 'Total Revenue', value: '$1.42M', change: '+12.4%', trend: 'up' },
  { id: 'metric-2', title: 'Net Cash Flow', value: '$318K', change: '+4.9%', trend: 'up' },
  { id: 'metric-3', title: 'Failed Payouts', value: '28', change: '-1.2%', trend: 'down' },
  { id: 'metric-4', title: 'Avg. Ticket Size', value: '$742', change: '+0.8%', trend: 'up' },
];

export const REVENUE_FLOW_DATA: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5800 },
  { name: 'Jul', value: 6900 },
];

const ENTITIES = ['Apple Store', 'Stripe', 'AWS', 'Cloudflare', 'Notion', 'Figma', 'GitHub', 'OpenAI'];
const CATEGORIES: Transaction['category'][] = ['Software', 'Food', 'Transfer', 'Tax'];
const STATUSES: Transaction['status'][] = ['completed', 'pending', 'failed'];

export const TRANSACTIONS: Transaction[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `TX-${String(i + 1).padStart(6, '0')}`,
  date: `2026-03-${String((i % 28) + 1).padStart(2, '0')}`,
  entity: ENTITIES[i % ENTITIES.length],
  amount: Number((Math.random() * 3500 + 15).toFixed(2)),
  status: STATUSES[i % STATUSES.length],
  type: i % 4 === 0 ? 'inbound' : 'outbound',
  category: CATEGORIES[i % CATEGORIES.length],
  currency: 'USD',
}));
