export type FireRisk = 'SAFE' | 'WARNING' | 'FIRE_DETECTED';

export interface SensorReading {
  id: string;
  temperature: number;
  smoke: number;
  humidity: number;
  latitude: number;
  longitude: number;
  timestamp: number;
  fireRisk: FireRisk;
  riskPercentage: number;
}

export function evaluateFireRisk(temperature: number, smoke: number, humidity: number): { risk: FireRisk; percentage: number } {
  let score = 0;

  // Temperature scoring (0-40 points)
  if (temperature > 60) score += 40;
  else if (temperature > 45) score += 25;
  else if (temperature > 35) score += 10;

  // Smoke scoring (0-40 points)
  if (smoke > 400) score += 40;
  else if (smoke > 250) score += 25;
  else if (smoke > 150) score += 10;

  // Humidity inverse scoring (0-20 points) - lower humidity = higher risk
  if (humidity < 20) score += 20;
  else if (humidity < 35) score += 12;
  else if (humidity < 50) score += 5;

  const percentage = Math.min(100, score);

  let risk: FireRisk = 'SAFE';
  if (temperature > 60 && smoke > 400) {
    risk = 'FIRE_DETECTED';
  } else if (percentage >= 50) {
    risk = 'WARNING';
  } else if (percentage >= 75) {
    risk = 'FIRE_DETECTED';
  }

  return { risk, percentage };
}

export function generateSimulatedReading(prevReading?: SensorReading): SensorReading {
  const base = prevReading || {
    temperature: 28,
    smoke: 80,
    humidity: 55,
  };

  const tempDelta = (Math.random() - 0.45) * 6;
  const smokeDelta = (Math.random() - 0.45) * 30;
  const humidityDelta = (Math.random() - 0.5) * 5;

  const temperature = Math.max(15, Math.min(85, base.temperature + tempDelta));
  const smoke = Math.max(20, Math.min(600, base.smoke + smokeDelta));
  const humidity = Math.max(10, Math.min(90, base.humidity + humidityDelta));

  const { risk, percentage } = evaluateFireRisk(temperature, smoke, humidity);

  return {
    id: crypto.randomUUID(),
    temperature: Math.round(temperature * 10) / 10,
    smoke: Math.round(smoke),
    humidity: Math.round(humidity * 10) / 10,
    latitude: 34.0522 + (Math.random() - 0.5) * 0.01,
    longitude: -118.2437 + (Math.random() - 0.5) * 0.01,
    timestamp: Date.now(),
    fireRisk: risk,
    riskPercentage: percentage,
  };
}
