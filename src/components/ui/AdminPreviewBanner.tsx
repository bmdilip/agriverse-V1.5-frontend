import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminPreviewBanner: React.FC = () => {
  const { isAdminPreview, isDemoMode, disconnect } = useAuth();

  if (!isAdminPreview && !isDemoMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-500/20 border-b border-yellow-500/30 p-3 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-medium">
            🚧 {isDemoMode ? 'DEMO MODE' : 'PREVIEW MODE'}: Wallet check disabled. This is a demo environment.
          </span>
          <span className="text-yellow-400/70 text-sm">
            Set VITE_DEMO_MODE=false for production
          </span>
        </div>
        <button
          onClick={disconnect}
          className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};