import { Badge } from '@/components/ui/badge';
import { LoanStatus } from '@/types/loan';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Clock, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: LoanStatus;
  showIcon?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

const statusConfig = {
  pending: {
    label: 'მოლოდინში',
    className: 'status-pending',
    icon: Clock,
  },
  approved: {
    label: 'დამტკიცებული',
    className: 'status-approved',
    icon: CheckCircle,
  },
  rejected: {
    label: 'უარყოფილი',
    className: 'status-rejected',
    icon: XCircle,
  },
  partial: {
    label: 'ნაწილობრივ',
    className: 'status-partial',
    icon: AlertCircle,
  },
  conditional: {
    label: 'პირობით',
    className: 'status-conditional',
    icon: HelpCircle,
  },
};

export function StatusBadge({ status, showIcon = true, size = 'default' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'border gap-1.5',
        config.className,
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'lg' && 'text-sm px-4 py-1.5'
      )}
    >
      {showIcon && <Icon className={cn('w-3.5 h-3.5', size === 'lg' && 'w-4 h-4')} />}
      {config.label}
    </Badge>
  );
}
