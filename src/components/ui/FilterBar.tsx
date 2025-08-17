import React from 'react';
import { motion } from 'framer-motion';
import { X, Sliders, RefreshCw } from 'lucide-react';

export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'range' | 'toggle' | 'search';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface FilterBarProps {
  filters: FilterOption[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
  onClose?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  values,
  onChange,
  onReset,
  onClose,
  className = ''
}) => {
  const renderFilter = (filter: FilterOption) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            value={values[filter.key] || ''}
            onChange={(e) => onChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="">All</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={values[`${filter.key}Min`] || ''}
                onChange={(e) => onChange(`${filter.key}Min`, e.target.value)}
                className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                min={filter.min}
                max={filter.max}
                step={filter.step}
              />
              <span className="text-agri-text/70">to</span>
              <input
                type="number"
                placeholder="Max"
                value={values[`${filter.key}Max`] || ''}
                onChange={(e) => onChange(`${filter.key}Max`, e.target.value)}
                className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                min={filter.min}
                max={filter.max}
                step={filter.step}
              />
            </div>
          </div>
        );

      case 'toggle':
        return (
          <button
            onClick={() => onChange(filter.key, !values[filter.key])}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              values[filter.key] ? 'bg-agri-primary' : 'bg-agri-secondary'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              values[filter.key] ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
            }`} />
          </button>
        );

      case 'search':
        return (
          <input
            type="text"
            value={values[filter.key] || ''}
            onChange={(e) => onChange(filter.key, e.target.value)}
            placeholder={`Search ${filter.label.toLowerCase()}...`}
            className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`bg-agri-card border border-agri-border rounded-2xl p-6 ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-agri-primary" />
          <h3 className="text-lg font-medium text-agri-text">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-agri-text/70 hover:text-agri-text transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-agri-text/70 hover:text-agri-text transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {filters.map((filter) => (
          <div key={filter.key}>
            <label className="block text-agri-text/70 mb-2 text-sm">
              {filter.label}
            </label>
            {renderFilter(filter)}
          </div>
        ))}
      </div>
    </motion.div>
  );
};