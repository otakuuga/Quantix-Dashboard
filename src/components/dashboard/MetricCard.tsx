import clsx from 'clsx';
import type { Metric } from '../../types/fintech';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</p>
      <div className="mt-2 flex items-end justify-between">
        <h4 className="text-2xl font-bold">{metric.value}</h4>
        <span
          className={clsx(
            'rounded px-2 py-1 text-xs font-medium',
            metric.trend === 'up' && 'bg-emerald-500/10 text-emerald-500',
            metric.trend === 'down' && 'bg-rose-500/10 text-rose-500',
            metric.trend === 'neutral' && 'bg-slate-500/10 text-slate-500'
          )}
        >
          {metric.change}
        </span>
      </div>
    </article>
  );
}
