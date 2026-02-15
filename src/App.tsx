import { CandlestickChartCard } from './components/charts/CandlestickChartCard';
import { LineChartCard } from './components/charts/LineChartCard';
import { MetricCard } from './components/charts/MetricCard';
import { PieChartCard } from './components/charts/PieChartCard';
import { KYCWizard } from './components/kyc/KYCWizard';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { TransactionTable } from './components/transactions/TransactionTable';
import type { AllocationDatum, CandlestickPoint, Metric, TimeSeriesPoint, Transaction } from './types/fintech';

const metrics: Metric[] = [
  { id: 'a1', label: 'AUM', value: '$5.42M', delta: 2.23 },
  { id: 'a2', label: 'Daily Volume', value: '$832K', delta: -1.04 },
  { id: 'a3', label: 'Verified Accounts', value: '1,284', delta: 4.71 },
  { id: 'a4', label: 'Failed Transactions', value: '18', delta: -0.93 },
];

const lineData: TimeSeriesPoint[] = [
  { timestamp: '09:00', value: 120 },
  { timestamp: '10:00', value: 146 },
  { timestamp: '11:00', value: 162 },
  { timestamp: '12:00', value: 154 },
  { timestamp: '13:00', value: 190 },
  { timestamp: '14:00', value: 177 },
];

const candleData: CandlestickPoint[] = [
  { timestamp: 'Mon', open: 165, close: 172, low: 158, high: 176 },
  { timestamp: 'Tue', open: 172, close: 169, low: 164, high: 179 },
  { timestamp: 'Wed', open: 169, close: 181, low: 166, high: 188 },
  { timestamp: 'Thu', open: 181, close: 174, low: 170, high: 186 },
  { timestamp: 'Fri', open: 174, close: 183, low: 171, high: 190 },
];

const pieData: AllocationDatum[] = [
  { name: 'Equities', value: 44 },
  { name: 'Bonds', value: 21 },
  { name: 'Crypto', value: 18 },
  { name: 'Cash', value: 17 },
];

const transactions: Transaction[] = Array.from({ length: 80 }, (_, i) => ({
  id: `TX-${String(i + 1).padStart(4, '0')}`,
  timestamp: `2026-02-${String((i % 28) + 1).padStart(2, '0')} 14:${String(i % 60).padStart(2, '0')}`,
  account: `ACCT-${String((i % 12) + 1001)}`,
  type: ['deposit', 'withdrawal', 'transfer', 'payment'][i % 4] as Transaction['type'],
  amount: Number((Math.random() * 5000 + 35).toFixed(2)),
  currency: ['USD', 'EUR', 'GBP'][i % 3] as Transaction['currency'],
  status: ['pending', 'completed', 'failed'][i % 3] as Transaction['status'],
  note: i % 9 === 0 ? 'Manual review required' : undefined,
}));

export function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen p-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quantix FinTech UI Kit</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Production-ready dashboard primitives</p>
          </div>
          <ThemeToggle />
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-3">
          <LineChartCard title="Revenue Trend" data={lineData} />
          <CandlestickChartCard data={candleData} />
          <PieChartCard data={pieData} />
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-2">
          <KYCWizard />
          <TransactionTable transactions={transactions} />
        </section>
      </main>
    </ThemeProvider>
  );
}
