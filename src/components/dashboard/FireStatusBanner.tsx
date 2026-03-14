import { FireRisk } from '@/lib/fireDetection';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Flame } from 'lucide-react';

interface FireStatusBannerProps {
  risk: FireRisk;
  riskPercentage: number;
}

const config = {
  SAFE: {
    icon: Shield,
    label: 'ALL SYSTEMS SAFE',
    sublabel: 'No fire risk detected',
    className: 'bg-status-safe/10 border-status-safe/30 status-safe',
    dotClass: 'bg-status-safe glow-safe',
  },
  WARNING: {
    icon: AlertTriangle,
    label: 'WARNING — ELEVATED RISK',
    sublabel: 'Monitoring conditions closely',
    className: 'bg-status-warning/10 border-status-warning/30 status-warning',
    dotClass: 'bg-status-warning glow-warning',
  },
  FIRE_DETECTED: {
    icon: Flame,
    label: 'FIRE DETECTED — CRITICAL ALERT',
    sublabel: 'Immediate action required',
    className: 'bg-status-danger/10 border-status-danger/30 status-danger',
    dotClass: 'bg-status-danger glow-danger',
  },
};

export function FireStatusBanner({ risk, riskPercentage }: FireStatusBannerProps) {
  const c = config[risk];
  const Icon = c.icon;

  return (
    <motion.div
      key={risk}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between px-5 py-3 rounded-lg border ${c.className}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full pulse-dot ${c.dotClass}`} />
        <Icon className="w-5 h-5" />
        <div>
          <p className="font-semibold text-sm tracking-wide">{c.label}</p>
          <p className="text-xs opacity-70">{c.sublabel}</p>
        </div>
      </div>
      <div className="text-right font-mono">
        <p className="text-2xl font-bold">{riskPercentage}%</p>
        <p className="text-xs opacity-60">RISK LEVEL</p>
      </div>
    </motion.div>
  );
}
