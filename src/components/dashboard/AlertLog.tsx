import { SensorReading } from '@/lib/fireDetection';
import { Bell } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface AlertLogProps {
  alerts: SensorReading[];
}

export function AlertLog({ alerts }: AlertLogProps) {

  const alarmRef = useRef<HTMLAudioElement | null>(null);

  // 🔥 Play alarm when alerts are triggered
  useEffect(() => {
    if (alerts.length > 0) {
      alarmRef.current?.play();
    }
  }, [alerts]);

  return (
    <div className="glass-card p-5">

      {/* Hidden audio element */}
      <audio ref={alarmRef} src="/alarm.mp3" preload="auto" />

      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-4 h-4 text-status-danger" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Alert Log
        </h3>
        {alerts.length > 0 && (
          <span className="bg-status-danger/20 status-danger text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
            {alerts.length}
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-[200px] overflow-auto">
        {alerts.length === 0 ? (
          <p className="text-xs text-muted-foreground font-mono">
            No critical alerts recorded
          </p>
        ) : (
          alerts.map((a) => (
            <div key={a.id} className="flex items-center justify-between bg-status-danger/5 border border-status-danger/20 rounded px-3 py-2">
              <div className="text-xs font-mono">
                <span className="status-danger font-semibold">FIRE ALERT</span>
                <span className="text-muted-foreground ml-2">
                  {a.temperature}°C / {a.smoke}ppm
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {new Date(a.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
