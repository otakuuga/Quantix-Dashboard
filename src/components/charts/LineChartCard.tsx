import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TimeSeriesPoint } from '../../types/fintech';

interface LineChartCardProps {
  title: string;
  data: TimeSeriesPoint[];
}

export function LineChartCard({ title, data }: LineChartCardProps) {
  return (
    <section className="card h-80" aria-label={title}>
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} role="img" aria-label={`${title} line chart`}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={50} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
