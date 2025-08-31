import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'green' | 'blue' | 'purple' | 'orange';
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color, className }: KPICardProps) {
  const colorClasses = {
    green: {
      bg: 'from-green-50 to-emerald-50',
      icon: 'from-[#22C55E] to-[#16A34A]',
      text: 'text-green-600',
      trend: trend?.isPositive ? 'text-green-600' : 'text-red-500',
    },
    blue: {
      bg: 'from-blue-50 to-cyan-50',
      icon: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      trend: trend?.isPositive ? 'text-green-600' : 'text-red-500',
    },
    purple: {
      bg: 'from-purple-50 to-violet-50',
      icon: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      trend: trend?.isPositive ? 'text-green-600' : 'text-red-500',
    },
    orange: {
      bg: 'from-orange-50 to-amber-50',
      icon: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
      trend: trend?.isPositive ? 'text-green-600' : 'text-red-500',
    },
  };

  const classes = colorClasses[color];

  return (
    <div
      className={cn(
        'relative p-6 rounded-2xl bg-gradient-to-br border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105',
        classes.bg,
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-md mb-4 bg-gradient-to-br',
          classes.icon
        )}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>

        {/* Trend */}
        {trend && (
          <div className="flex items-center space-x-1">
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={cn('text-sm font-medium', classes.trend)}>
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
            <span className="text-sm text-gray-500">vs mês anterior</span>
          </div>
        )}
      </div>
    </div>
  );
}
