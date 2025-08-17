import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    roiMin: number;
    roiMax: number;
    risk: string;
    duration: string;
    stakeable: boolean;
    status: string;
    rwaCertified: boolean;
    bookmarked: boolean;
  };
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  onReset, 
  onClose 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-agri-card border border-agri-border rounded-2xl p-6 w-full lg:w-80 h-full overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-light text-agri-text">Filters</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={onReset}
            className="text-agri-text/70 hover:text-agri-text transition-colors text-sm"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="lg:hidden text-agri-text/70 hover:text-agri-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* ROI Range */}
        <div>
          <label className="block text-agri-text/70 mb-2">ROI Range (%)</label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-agri-text/70">
              <span>{filters.roiMin}%</span>
              <span>{filters.roiMax}%</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="30"
                value={filters.roiMin}
                onChange={(e) => onFilterChange('roiMin', parseInt(e.target.value))}
                className="w-full h-2 bg-agri-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-agri-primary"
              />
              <input
                type="range"
                min="0"
                max="30"
                value={filters.roiMax}
                onChange={(e) => onFilterChange('roiMax', parseInt(e.target.value))}
                className="w-full h-2 bg-agri-border rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-agri-primary"
              />
            </div>
          </div>
        </div>
        
        {/* Risk Level */}
        <div>
          <label className="block text-agri-text/70 mb-2">Risk Level</label>
          <select
            value={filters.risk}
            onChange={(e) => onFilterChange('risk', e.target.value)}
            className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
        
        {/* Duration */}
        <div>
          <label className="block text-agri-text/70 mb-2">Duration</label>
          <select
            value={filters.duration}
            onChange={(e) => onFilterChange('duration', e.target.value)}
            className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Durations</option>
            <option value="30">Up to 30 days</option>
            <option value="60">31-60 days</option>
            <option value="90">61-90 days</option>
            <option value="120">91-120 days</option>
            <option value="180+">120+ days</option>
          </select>
        </div>
        
        {/* Status */}
        <div>
          <label className="block text-agri-text/70 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
          </select>
        </div>
        
        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-agri-text">Stakeable Only</label>
            <button 
              onClick={() => onFilterChange('stakeable', !filters.stakeable)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                filters.stakeable ? 'bg-agri-primary' : 'bg-agri-secondary'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                filters.stakeable ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-agri-text">RWA Certified</label>
            <button 
              onClick={() => onFilterChange('rwaCertified', !filters.rwaCertified)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                filters.rwaCertified ? 'bg-agri-primary' : 'bg-agri-secondary'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                filters.rwaCertified ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-agri-text">Bookmarked Only</label>
            <button 
              onClick={() => onFilterChange('bookmarked', !filters.bookmarked)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                filters.bookmarked ? 'bg-agri-primary' : 'bg-agri-secondary'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                filters.bookmarked ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Apply Filters Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-agri-primary text-agri-dark rounded-lg font-light hover:bg-agri-primary/90 transition-colors"
        >
          <CheckCircle className="w-4 h-4 mr-2 inline" />
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;