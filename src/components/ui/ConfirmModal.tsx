import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'danger' | 'info';
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-16 h-16 text-red-400" />;
      case 'info':
        return <CheckCircle className="w-16 h-16 text-agri-primary" />;
      default:
        return <AlertTriangle className="w-16 h-16 text-agri-accent" />;
    }
  };

  const getConfirmButtonStyle = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'info':
        return 'bg-agri-primary hover:bg-agri-primary/90 text-agri-dark';
      default:
        return 'bg-agri-accent hover:bg-agri-accent/90 text-agri-dark';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mb-4">
                {getIcon()}
              </div>
              
              <h3 className="text-xl font-medium text-agri-text mb-2">
                {title}
              </h3>
              
              <p className="text-agri-text/70 mb-6">
                {message}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${getConfirmButtonStyle()}`}
                >
                  {loading ? 'Processing...' : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};