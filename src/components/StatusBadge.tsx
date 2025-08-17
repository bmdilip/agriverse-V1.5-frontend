import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'live' | 'upcoming' | 'ended' | 'claimed' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  className = '' 
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'px-2 py-0.5',
      icon: 'w-3 h-3',
      text: 'text-xs'
    },
    md: {
      container: 'px-3 py-1',
      icon: 'w-4 h-4',
      text: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2',
      icon: 'w-5 h-5',
      text: 'text-base'
    }
  };

  // Status configurations
  const statusConfig = {
    live: {
      className: 'status-live',
      icon: Clock,
      label: 'Live'
    },
    upcoming: {
      className: 'status-upcoming',
      icon: Clock,
      label: 'Upcoming'
    },
    ended: {
      className: 'status-ended',
      icon: CheckCircle,
      label: 'Ended'
    },
    claimed: {
      className: 'status-live',
      icon: CheckCircle,
      label: 'Claimed'
    },
    overdue: {
      className: 'bg-red-500/20 text-red-400 border border-red-500/20',
      icon: AlertCircle,
      label: 'Overdue'
    }
  };

  const config = sizeConfig[size];
  const statusCfg = statusConfig[status];
  const IconComponent = statusCfg.icon;

  return (
    <motion.div
      className={`flex items-center space-x-1 rounded-full ${statusCfg.className} ${config.container} ${className}`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <IconComponent className={`${config.icon}`} />
      <span className={`${config.text} font-light`}>{statusCfg.label}</span>
    </motion.div>
  );
};

export default StatusBadge;