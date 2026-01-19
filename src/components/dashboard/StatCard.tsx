import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground',
  success: 'bg-gradient-to-br from-success to-success/80 text-success-foreground',
  warning: 'bg-gradient-to-br from-warning to-warning/80 text-warning-foreground',
  destructive: 'bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground',
};

export function StatCard({ title, value, icon, trend, subtitle, variant = 'default' }: StatCardProps) {
  const isColoredVariant = variant !== 'default';

  return (
    <div className={cn('stat-card', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p
            className={cn(
              'text-sm font-medium mb-1',
              isColoredVariant ? 'text-current/80' : 'text-muted-foreground'
            )}
          >
            {title}
          </p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subtitle && (
            <p
              className={cn(
                'text-sm mt-1',
                isColoredVariant ? 'text-current/70' : 'text-muted-foreground'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl',
            isColoredVariant ? 'bg-white/20' : 'bg-primary/10'
          )}
        >
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-4">
          {trend.isPositive ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span
            className={cn(
              'text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span
            className={cn(
              'text-sm',
              isColoredVariant ? 'text-current/60' : 'text-muted-foreground'
            )}
          >
            წინა თვესთან შედარებით
          </span>
        </div>
      )}
    </div>
  );
}
