import { useEffect, useRef } from 'react';
import { SensorReading } from '@/lib/fireDetection';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface SensorMapProps {
  reading: SensorReading | null;
}

const markerColors = {
  SAFE: '#22c55e',
  WARNING: '#f59e0b',
  FIRE_DETECTED: '#ef4444',
};

export function SensorMap({ reading }: SensorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [10.0889, 77.0595],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !reading) return;

    const color = markerColors[reading.fireRisk];

    if (markerRef.current) {
      markerRef.current.setLatLng([reading.latitude, reading.longitude]);
      markerRef.current.setStyle({ color, fillColor: color });
    } else {
      markerRef.current = L.circleMarker([reading.latitude, reading.longitude], {
        radius: 12,
        color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(mapInstanceRef.current);
    }
  }, [reading]);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Sensor Location
      </h3>
      <div ref={mapRef} className="h-[280px] rounded-md overflow-hidden" />
    </div>
  );
}
