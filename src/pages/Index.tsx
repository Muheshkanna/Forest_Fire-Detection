import { Thermometer, Wind, Droplets, Activity, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import alarmSound from '../alarm.mp3';
import { useSettings } from '@/contexts/SettingsContext';
import { useSensorData } from '@/hooks/useSensorData';
import { FireStatusBanner } from '@/components/dashboard/FireStatusBanner';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SensorChart } from '@/components/dashboard/SensorChart';
import { HistoryTable } from '@/components/dashboard/HistoryTable';
import { SensorMap } from '@/components/dashboard/SensorMap';
import { SimulationPanel } from '@/components/dashboard/SimulationPanel';
import { AlertLog } from '@/components/dashboard/AlertLog';
import { Layout } from '@/components/layout/Layout';
import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import { SystemHealth } from '@/components/dashboard/SystemHealth';
import { WindCompass } from '@/components/dashboard/WindCompass';
import { TipsPanel } from '@/components/dashboard/TipsPanel';
import { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

function getStatus(risk: string) {
  if (risk === 'FIRE_DETECTED') return 'danger' as const;
  if (risk === 'WARNING') return 'warning' as const;
  return 'safe' as const;
}

const Index = () => {
  const { currentReading, history, alerts, isSimulating, toggleSimulation, submitManualReading } = useSensorData();
  const { soundAlerts } = useSettings();
  const [isAlarmMuted, setIsAlarmMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(alarmSound);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Alarm Trigger
  useEffect(() => {
    if (!currentReading || !audioRef.current) return;

    if (currentReading.fireRisk === 'FIRE_DETECTED' && !isAlarmMuted && soundAlerts) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.error("Audio play failed:", e));
      }
    } else {
      audioRef.current.pause();
      if (currentReading.fireRisk !== 'FIRE_DETECTED') {
        setIsAlarmMuted(false); // Reset mute when risk clears
      }
    }
  }, [currentReading?.fireRisk, isAlarmMuted, soundAlerts]);

  if (!currentReading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center font-mono text-muted-foreground">
          <Activity className="w-8 h-8 mx-auto mb-3 animate-spin" />
          <p>Initializing sensors...</p>
        </div>
      </div>
    );
  }

  const status = getStatus(currentReading.fireRisk);
  const isFire = currentReading.fireRisk === 'FIRE_DETECTED';

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500 relative">

        {/* Fire Alarm Overlay */}
        <AlertDialog open={isFire}>
          <AlertDialogContent className="border-red-500 bg-red-50 dark:bg-red-950/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-2xl font-bold">
                <AlertTriangle className="w-8 h-8 animate-bounce" />
                CRITICAL FIRE ALERT
              </AlertDialogTitle>
              <AlertDialogDescription className="text-foreground font-medium text-lg">
                High probability of fire detected in Sector 4. Immediate action required.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="p-4 bg-white/50 rounded-lg">
              <p><strong>Temperature:</strong> {currentReading.temperature}°C</p>
              <p><strong>Smoke Level:</strong> {currentReading.smoke} ppm</p>
              <p><strong>Risk Score:</strong> {currentReading.riskPercentage}%</p>
            </div>
            <AlertDialogFooter>
              <Button
                variant={isAlarmMuted ? "outline" : "destructive"}
                onClick={() => setIsAlarmMuted(!isAlarmMuted)}
                className="w-full sm:w-auto"
              >
                {isAlarmMuted ? <><VolumeX className="mr-2 h-4 w-4" /> Unmute Alarm</> : <><Volume2 className="mr-2 h-4 w-4" /> Mute Alarm</>}
              </Button>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white border-none">
                Acknowledge & Deploy Team
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Top Status Banner */}
        <FireStatusBanner risk={currentReading.fireRisk} riskPercentage={currentReading.riskPercentage} />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Temperature"
            value={currentReading.temperature}
            unit="°C"
            icon={Thermometer}
            status={currentReading.temperature > 60 ? 'danger' : currentReading.temperature > 45 ? 'warning' : 'safe'}
          />
          <MetricCard
            title="Smoke Level"
            value={currentReading.smoke}
            unit="ppm"
            icon={Wind}
            status={currentReading.smoke > 400 ? 'danger' : currentReading.smoke > 250 ? 'warning' : 'safe'}
          />
          <MetricCard
            title="Humidity"
            value={currentReading.humidity}
            unit="%"
            icon={Droplets}
            status={currentReading.humidity < 20 ? 'danger' : currentReading.humidity < 35 ? 'warning' : 'safe'}
          />
          <MetricCard
            title="Risk Score"
            value={currentReading.riskPercentage}
            unit="%"
            icon={Activity}
            status={status}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left Column: Maps & Charts */}
          <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
              <SensorMap reading={currentReading} />
              <SensorChart history={history} />
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold mb-4">Sensor History</h3>
              <HistoryTable history={history} />
            </div>
          </div>

          {/* Right Column: Context & Controls */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 h-[220px]">
              <WeatherWidget />
              <WindCompass />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <SystemHealth />
              <TipsPanel riskLevel={status} />
            </div>

            <div className="glass-panel p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Control & Alerts</h3>
              <div className="space-y-4">
                <SimulationPanel
                  onSubmit={submitManualReading}
                  isSimulating={isSimulating}
                  onToggleSimulation={toggleSimulation}
                />
                <div className="max-h-[300px] overflow-y-auto pr-2">
                  <AlertLog alerts={alerts} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Index;
