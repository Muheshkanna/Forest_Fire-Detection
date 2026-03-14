import { useState, useEffect, useCallback, useRef } from 'react';
import { SensorReading, generateSimulatedReading, evaluateFireRisk } from '@/lib/fireDetection';

const MAX_HISTORY = 50;

export function useSensorData() {
  const [currentReading, setCurrentReading] = useState<SensorReading | null>(null);
  const [history, setHistory] = useState<SensorReading[]>([]);
  const [alerts, setAlerts] = useState<SensorReading[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevReadingRef = useRef<SensorReading | undefined>(undefined);

  const addReading = useCallback((reading: SensorReading) => {
    setCurrentReading(reading);
    prevReadingRef.current = reading;
    setHistory(prev => {
      const next = [reading, ...prev];
      return next.slice(0, MAX_HISTORY);
    });
    if (reading.fireRisk === 'FIRE_DETECTED') {
      setAlerts(prev => [reading, ...prev].slice(0, 20));
    }
  }, []);

  const simulateReading = useCallback(() => {
    const reading = generateSimulatedReading(prevReadingRef.current);
    addReading(reading);
  }, [addReading]);

  const submitManualReading = useCallback((temperature: number, smoke: number, humidity: number) => {
    const { risk, percentage } = evaluateFireRisk(temperature, smoke, humidity);
    const reading: SensorReading = {
      id: crypto.randomUUID(),
      temperature,
      smoke,
      humidity,
      latitude: 34.0522,
      longitude: -118.2437,
      timestamp: Date.now(),
      fireRisk: risk,
      riskPercentage: percentage,
    };
    addReading(reading);
  }, [addReading]);

  useEffect(() => {
    if (isSimulating) {
      simulateReading();
      intervalRef.current = setInterval(simulateReading, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, simulateReading]);

  const toggleSimulation = useCallback(() => {
    setIsSimulating(prev => !prev);
  }, []);

  return {
    currentReading,
    history,
    alerts,
    isSimulating,
    toggleSimulation,
    submitManualReading,
  };
}
