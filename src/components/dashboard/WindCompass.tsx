import { ArrowUp } from 'lucide-react';

interface WindCompassProps {
    direction?: number; // 0-360 degrees
    speed?: number; // km/h
}

export const WindCompass = ({ direction = 45, speed = 12 }: WindCompassProps) => {
    return (
        <div className="glass-panel p-4 flex flex-col items-center justify-center relative min-h-[200px]">
            <h3 className="absolute top-4 left-4 text-sm font-medium text-muted-foreground w-full">Wind Direction</h3>

            <div className="relative w-32 h-32 border-2 border-border/50 rounded-full flex items-center justify-center bg-card/30 backdrop-blur-sm shadow-inner mt-6">
                {/* Cardinal Points */}
                <span className="absolute top-1 text-xs font-bold text-muted-foreground">N</span>
                <span className="absolute bottom-1 text-xs font-bold text-muted-foreground">S</span>
                <span className="absolute left-1 text-xs font-bold text-muted-foreground">W</span>
                <span className="absolute right-1 text-xs font-bold text-muted-foreground">E</span>

                {/* Compass Needle */}
                <div
                    className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
                    style={{ transform: `rotate(${direction}deg)` }}
                >
                    <div className="w-1 h-16 bg-gradient-to-t from-transparent to-red-500 rounded-full relative">
                        <ArrowUp className="w-4 h-4 text-red-500 absolute -top-3 -left-1.5" />
                    </div>
                </div>

                {/* Center Point */}
                <div className="w-3 h-3 bg-foreground rounded-full z-10 shadow-lg border border-background"></div>
            </div>

            <div className="mt-4 text-center">
                <div className="text-2xl font-bold">{speed} <span className="text-sm font-normal text-muted-foreground">km/h</span></div>
                <div className="text-xs text-muted-foreground">NE (45°)</div>
            </div>
        </div>
    );
};
