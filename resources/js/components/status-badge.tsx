import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType = 'menunggu' | 'disetujui' | 'ditolak' | 'dibatalkan';

const STATUS_CONFIG = {
  menunggu: {
    label: 'Menunggu',
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    text: 'text-yellow-600'
  },
  disetujui: {
    label: 'Disetujui',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-600'
  },
  ditolak: {
    label: 'Ditolak',
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-600'
  },
  dibatalkan: {
    label: 'Dibatalkan',
    icon: XCircle,
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-100',
    text: 'text-gray-600'
  },
} as const;

interface StatusBadgeProps {
  status: StatusType | number | string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Convert number status to string jika perlu
  const statusMap = {
    0: 'menunggu',
    1: 'disetujui',
    [-1]: 'ditolak',
    [-2]: 'dibatalkan'
  };

  const statusKey = typeof status === 'number'
    ? statusMap[status as keyof typeof statusMap] || 'menunggu'
    : status;

  const config = STATUS_CONFIG[statusKey as StatusType] || STATUS_CONFIG.menunggu;

  return (
    <Badge variant="outline" className={cn(`flex items-center gap-1 px-3 py-1 ${config.bg} ${config.text} ${config.border}`, className)}>
      <config.icon className={config.color} size={16} />
      <span className="capitalize">{config.label}</span>
    </Badge>
  );
};