import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminPreviewBanner: React.FC = () => {
  const { isAdminPreview, disconnect } = useAuth();

  if (!isAdminPreview) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-agri-accent/20 border-b border-agri-accent/30 p-3 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-agri-accent" />
          <span className="text-agri-accent font-medium">
            🚧 PREVIEW MODE: Wallet check disabled. This is a demo environment.
          </span>
        </div>
        <button
          onClick={disconnect}
          className="text-agri-accent/70 hover:text-agri-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};