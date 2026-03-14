import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  status?: 'safe' | 'warning' | 'danger';
}

const statusStyles = {
  safe: 'border-status-safe/20 shadow-[0_0_15px_hsl(var(--status-safe)/0.05)]',
  warning: 'border-status-warning/20 shadow-[0_0_15px_hsl(var(--status-warning)/0.05)]',
  danger: 'border-status-danger/20 shadow-[0_0_15px_hsl(var(--status-danger)/0.05)]',
};

const valueStyles = {
  safe: 'status-safe',
  warning: 'status-warning',
  danger: 'status-danger',
};

export function MetricCard({ title, value, unit, icon: Icon, status = 'safe' }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card p-5 ${statusStyles[status]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-bold font-mono ${valueStyles[status]}`}>{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </motion.div>
  );
}
