import { ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Customized } from 'recharts';
import type { CandlestickPoint } from '../../types/fintech';

interface CandlestickChartCardProps {
  data: CandlestickPoint[];
}

export function CandlestickChartCard({ data }: CandlestickChartCardProps) {
  return (
    <section className="card h-80" aria-label="Candlestick chart">
      <h2 className="mb-4 text-base font-semibold">OHLC Movement</h2>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data} role="img" aria-label="Candlestick price chart">
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 12 }} width={55} />
          <Tooltip />
          <Customized component={<Candles data={data} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}

function Candles({ data }: { data: CandlestickPoint[] }) {
  return (
    <g>
      {data.map((point, index) => {
        const x = 35 + index * 60;
        const openY = 230 - point.open;
        const closeY = 230 - point.close;
        const highY = 230 - point.high;
        const lowY = 230 - point.low;
        const up = point.close >= point.open;
        return (
          <g key={point.timestamp}>
            <line x1={x} y1={highY} x2={x} y2={lowY} stroke="#94a3b8" strokeWidth={1.5} />
            <rect
              x={x - 8}
              y={Math.min(openY, closeY)}
              width={16}
              height={Math.max(Math.abs(closeY - openY), 2)}
              fill={up ? '#10b981' : '#ef4444'}
              opacity={0.9}
              aria-label={`Candle ${index + 1}`}
            />
          </g>
        );
      })}
    </g>
  );
}
