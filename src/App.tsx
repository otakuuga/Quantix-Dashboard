import { DashboardLayout } from './components/layout/DashboardLayout';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { DEFAULT_ROUTE, SESSION_ONE_METRICS } from './data/sessionOneMock';

function SessionOneOverview() {
  return (
    <section className="space-y-4 pb-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {SESSION_ONE_METRICS.map((metric) => (
          <article key={metric.id} className="card" aria-label={`${metric.label} metric`}>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className={metric.delta >= 0 ? 'text-sm text-emerald-600' : 'text-sm text-rose-600'}>
              {metric.delta >= 0 ? '+' : ''}
              {metric.delta.toFixed(2)}%
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <h3 className="font-semibold">Architecture Notes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Theme state is centralized in `ThemeProvider` with system/light/dark support.</li>
            <li>All business types are unified in `src/types/fintech.ts` for consistent contracts.</li>
            <li>Dashboard layout composes responsive Sidebar + TopNav shell for future modules.</li>
          </ul>
        </section>
        <section className="card">
          <h3 className="font-semibold">Module Roadmap</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Session 1 focuses on app shell and type safety. Sessions 2 and 3 will plug into this layout.
          </p>
        </section>
      </div>
    </section>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <DashboardLayout initialRoute={DEFAULT_ROUTE}>
        <SessionOneOverview />
      </DashboardLayout>
    </ThemeProvider>
  );
}
