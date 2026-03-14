import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Play, Pause } from 'lucide-react';

interface SimulationPanelProps {
  onSubmit: (temperature: number, smoke: number, humidity: number) => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export function SimulationPanel({ onSubmit, isSimulating, onToggleSimulation }: SimulationPanelProps) {
  const [temp, setTemp] = useState('65');
  const [smoke, setSmoke] = useState('450');
  const [humidity, setHumidity] = useState('25');

  const handleSubmit = () => {
    const t = parseFloat(temp);
    const s = parseFloat(smoke);
    const h = parseFloat(humidity);
    if (isNaN(t) || isNaN(s) || isNaN(h)) return;
    onSubmit(t, s, h);
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Simulation Panel
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSimulation}
          className="gap-1.5 text-xs font-mono"
        >
          {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {isSimulating ? 'Pause' : 'Resume'}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1 block">
            Temp (°C)
          </label>
          <Input
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            className="font-mono text-sm h-9 bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1 block">
            Smoke (ppm)
          </label>
          <Input
            type="number"
            value={smoke}
            onChange={(e) => setSmoke(e.target.value)}
            className="font-mono text-sm h-9 bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1 block">
            Humidity (%)
          </label>
          <Input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            className="font-mono text-sm h-9 bg-secondary border-border"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full gap-2 font-mono text-xs" size="sm">
        <Send className="w-3 h-3" />
        SEND SENSOR DATA
      </Button>
    </div>
  );
}
