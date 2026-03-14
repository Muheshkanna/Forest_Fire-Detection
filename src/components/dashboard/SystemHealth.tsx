import { Battery, Signal, Wifi } from 'lucide-react';

export const SystemHealth = () => {
    const systems = [
        { name: 'Main Sensor Array', status: 'online', battery: 95, signal: 100 },
        { name: 'Perimeter Network', status: 'online', battery: 82, signal: 85 },
        { name: 'Backup Relay', status: 'standby', battery: 100, signal: 90 },
    ];

    return (
        <div className="glass-panel p-4 h-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">System Health</h3>
            <div className="space-y-3">
                {systems.map((sys, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${sys.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                            <div>
                                <p className="text-sm font-medium">{sys.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Battery className="w-3 h-3" /> {sys.battery}%
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Signal className="w-3 h-3" /> {sys.signal}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Wifi className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                ))}
            </div>
        </div>
    );
};
