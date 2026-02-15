import { DashboardLayout, KYCWizard, MetricCard, OverviewChart, ThemeProvider, TransactionTable } from './components';
import { DEFAULT_ROUTE } from './data/sessionOneMock';
import { REVENUE_FLOW_DATA, SESSION_TWO_METRICS, TRANSACTIONS } from './data/sessionTwoMock';

function SessionThreeView() {
  return (
    <section className="space-y-4 pb-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {SESSION_TWO_METRICS.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <OverviewChart data={REVENUE_FLOW_DATA} />

      <section>
        <h3 className="mb-2 text-base font-semibold">Transactions (TanStack Virtualized Table)</h3>
        <TransactionTable data={TRANSACTIONS} />
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold">Session 3: KYC Form Flow</h3>
        <KYCWizard />
      </section>
    </section>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <DashboardLayout initialRoute={DEFAULT_ROUTE}>
        <SessionThreeView />
      </DashboardLayout>
    </ThemeProvider>
  );
}
