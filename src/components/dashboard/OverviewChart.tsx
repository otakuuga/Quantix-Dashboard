import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../theme/ThemeProvider';
import type { ChartData } from '../../types/fintech';

interface OverviewChartProps {
  data: ChartData[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const { resolvedMode } = useTheme();

  const strokeColor = resolvedMode === 'dark' ? '#3b82f6' : '#2563eb';
  const gridColor = resolvedMode === 'dark' ? '#1e293b' : '#e2e8f0';
  const tooltipBg = resolvedMode === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = resolvedMode === 'dark' ? '#334155' : '#cbd5e1';

  return (
    <section className="h-[320px] w-full rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold">Revenue Flow</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="name" stroke="currentColor" opacity={0.55} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="currentColor" opacity={0.55} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '8px',
              color: resolvedMode === 'dark' ? '#f8fafc' : '#0f172a',
            }}
            itemStyle={{ color: strokeColor }}
          />
          <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={3} dot={{ r: 4, fill: strokeColor }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
