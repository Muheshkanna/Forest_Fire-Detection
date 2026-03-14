import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

export const WeatherWidget = () => {
    // Mock data - in a real app this would come from an API
    const weather = {
        temp: 24,
        condition: 'Cloudy',
        humidity: 65,
        windSpeed: 12
    };

    return (
        <div className="glass-panel p-4 flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cloud className="w-24 h-24" />
            </div>

            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Local Weather</h3>
                <div className="flex items-center gap-2">
                    <Cloud className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold">{weather.temp}°C</span>
                </div>
                <p className="text-sm text-foreground/80 mt-1">{weather.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 p-2 rounded-lg">
                    <Wind className="w-4 h-4" />
                    <span>{weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 p-2 rounded-lg">
                    <CloudRain className="w-4 h-4" />
                    <span>{weather.humidity}%</span>
                </div>
            </div>
        </div>
    );
};
