import { SensorReading } from '@/lib/fireDetection';

interface HistoryTableProps {
  history: SensorReading[];
}

const riskBadge = {
  SAFE: 'bg-status-safe/15 status-safe',
  WARNING: 'bg-status-warning/15 status-warning',
  FIRE_DETECTED: 'bg-status-danger/15 status-danger',
};

const riskLabel = {
  SAFE: 'SAFE',
  WARNING: 'WARN',
  FIRE_DETECTED: 'FIRE',
};

export function HistoryTable({ history }: HistoryTableProps) {
  const last20 = history.slice(0, 20);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Recent Readings
      </h3>
      <div className="overflow-auto max-h-[340px]">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 px-2">Time</th>
              <th className="text-right py-2 px-2">Temp</th>
              <th className="text-right py-2 px-2">Smoke</th>
              <th className="text-right py-2 px-2">Humid</th>
              <th className="text-center py-2 px-2">Status</th>
              <th className="text-right py-2 px-2">Risk%</th>
            </tr>
          </thead>
          <tbody>
            {last20.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-1.5 px-2 text-muted-foreground">
                  {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className="py-1.5 px-2 text-right">{r.temperature}°C</td>
                <td className="py-1.5 px-2 text-right">{r.smoke} ppm</td>
                <td className="py-1.5 px-2 text-right">{r.humidity}%</td>
                <td className="py-1.5 px-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${riskBadge[r.fireRisk]}`}>
                    {riskLabel[r.fireRisk]}
                  </span>
                </td>
                <td className="py-1.5 px-2 text-right">{r.riskPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
