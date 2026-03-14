import { SensorReading } from '@/lib/fireDetection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SensorChartProps {
  history: SensorReading[];
}

export function SensorChart({ history }: SensorChartProps) {
  const data = [...history].reverse().map((r) => ({
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    temperature: r.temperature,
    smoke: r.smoke,
    humidity: r.humidity,
  }));

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Sensor Trends
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(215 12% 50%)" 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              yAxisId="temp" 
              stroke="hsl(215 12% 50%)" 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
            />
            <YAxis 
              yAxisId="smoke" 
              orientation="right" 
              stroke="hsl(215 12% 50%)" 
              tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220 18% 10%)',
                border: '1px solid hsl(220 14% 16%)',
                borderRadius: '8px',
                fontFamily: 'JetBrains Mono',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature"
              stroke="hsl(0 72% 55%)"
              strokeWidth={2}
              dot={false}
              name="Temp (°C)"
            />
            <Line
              yAxisId="smoke"
              type="monotone"
              dataKey="smoke"
              stroke="hsl(220 70% 60%)"
              strokeWidth={2}
              dot={false}
              name="Smoke (ppm)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="humidity"
              stroke="hsl(185 70% 50%)"
              strokeWidth={2}
              dot={false}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
