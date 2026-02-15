import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { AllocationDatum } from '../../types/fintech';

const COLORS = ['#0ea5e9', '#6366f1', '#14b8a6', '#f59e0b'];

export function PieChartCard({ data }: { data: AllocationDatum[] }) {
  return (
    <section className="card h-80" aria-label="Allocation pie chart">
      <h2 className="mb-4 text-base font-semibold">Portfolio Allocation</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart role="img" aria-label="Asset allocation chart">
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
