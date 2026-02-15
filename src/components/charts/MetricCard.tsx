import clsx from 'clsx';
import type { Metric } from '../../types/fintech';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const positive = metric.delta >= 0;

  return (
    <article className="card" aria-label={`${metric.label} metric`}>
      <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
      <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
      <p
        className={clsx('mt-1 text-sm font-medium', positive ? 'text-emerald-600' : 'text-rose-600')}
        aria-live="polite"
      >
        {positive ? '+' : ''}
        {metric.delta.toFixed(2)}%
      </p>
    </article>
  );
}
