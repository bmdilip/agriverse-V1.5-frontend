import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface RWAcertBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RWAcertBadge: React.FC<RWAcertBadgeProps> = ({ 
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

  const config = sizeConfig[size];

  return (
    <motion.div
      className={`rwacert-badge ${config.container} ${className}`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Shield className={`${config.icon}`} />
      <span className={`${config.text} font-light`}>RWAcert</span>
    </motion.div>
  );
};

export default RWAcertBadge;