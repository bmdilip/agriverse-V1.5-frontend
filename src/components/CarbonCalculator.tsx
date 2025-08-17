import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Plane, 
  Home, 
  Car, 
  Utensils, 
  TreePine, 
  Award, 
  TrendingUp,
  Zap,
  CheckCircle
} from 'lucide-react';

const CarbonCalculator = () => {
  const [carbonData, setCarbonData] = useState({
    travel: { flights: 2, driving: 500 },
    home: { electricity: 300, heating: 150 },
    food: { meat: 3, dairy: 2 },
    energy: { renewable: 50 }
  });
  const [calculatedOffset, setCalculatedOffset] = useState(null);

  const calculateCarbonFootprint = () => {
    const travelEmissions = (carbonData.travel.flights * 0.5) + (carbonData.travel.driving * 0.0002);
    const homeEmissions = (carbonData.home.electricity * 0.0005) + (carbonData.home.heating * 0.002);
    const foodEmissions = (carbonData.food.meat * 0.027) + (carbonData.food.dairy * 0.005);
    const energyReduction = carbonData.energy.renewable * 0.0004;
    
    const totalEmissions = travelEmissions + homeEmissions + foodEmissions - energyReduction;
    const treesNeeded = Math.ceil(totalEmissions * 50); // Rough calculation
    
    setCalculatedOffset({
      totalEmissions: totalEmissions.toFixed(2),
      treesNeeded,
      cost: treesNeeded * 25 // $25 per tree NFT
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <h2 className="text-3xl font-light text-agri-text mb-8 text-center">
          <Calculator className="w-8 h-8 inline mr-3 text-agri-primary" />
          Calculate Your Carbon Footprint
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Travel Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-agri-primary" />
              </div>
              <h3 className="text-xl font-light text-agri-text">Travel</h3>
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Flights per year</label>
              <input
                type="number"
                value={carbonData.travel.flights}
                onChange={(e) => setCarbonData({...carbonData, travel: {...carbonData.travel, flights: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Driving miles per month</label>
              <input
                type="number"
                value={carbonData.travel.driving}
                onChange={(e) => setCarbonData({...carbonData, travel: {...carbonData.travel, driving: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Home Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-agri-accent/20 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-agri-accent" />
              </div>
              <h3 className="text-xl font-light text-agri-text">Home Energy</h3>
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Electricity (kWh/month)</label>
              <input
                type="number"
                value={carbonData.home.electricity}
                onChange={(e) => setCarbonData({...carbonData, home: {...carbonData.home, electricity: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Heating (therms/month)</label>
              <input
                type="number"
                value={carbonData.home.heating}
                onChange={(e) => setCarbonData({...carbonData, home: {...carbonData.home, heating: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Food Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-agri-primary" />
              </div>
              <h3 className="text-xl font-light text-agri-text">Food Consumption</h3>
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Meat servings per week</label>
              <input
                type="number"
                value={carbonData.food.meat}
                onChange={(e) => setCarbonData({...carbonData, food: {...carbonData.food, meat: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Dairy servings per day</label>
              <input
                type="number"
                value={carbonData.food.dairy}
                onChange={(e) => setCarbonData({...carbonData, food: {...carbonData.food, dairy: parseInt(e.target.value) || 0}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Energy Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-agri-accent/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-agri-accent" />
              </div>
              <h3 className="text-xl font-light text-agri-text">Renewable Energy</h3>
            </div>
            
            <div>
              <label className="block text-agri-text/70 mb-2 font-light">Renewable energy usage (%)</label>
              <input
                type="number"
                max="100"
                value={carbonData.energy.renewable}
                onChange={(e) => setCarbonData({...carbonData, energy: {...carbonData.energy, renewable: Math.min(100, parseInt(e.target.value) || 0)}})}
                className="w-full px-4 py-3 glass-effect rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <motion.button
            onClick={calculateCarbonFootprint}
            className="px-12 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-full font-light text-lg btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate My Footprint
          </motion.button>
        </div>

        {calculatedOffset && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-6"
          >
            <h3 className="text-2xl font-light text-agri-text mb-4 text-center">Your Carbon Footprint</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-light text-agri-primary mb-2">{calculatedOffset.totalEmissions}</div>
                <div className="text-agri-text/70 font-light">tons CO₂/year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-agri-accent mb-2">{calculatedOffset.treesNeeded}</div>
                <div className="text-agri-text/70 font-light">trees needed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-agri-primary mb-2">${calculatedOffset.cost}</div>
                <div className="text-agri-text/70 font-light">to offset</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <motion.button
                className="px-8 py-3 bg-agri-primary text-agri-dark rounded-full font-light btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mint {calculatedOffset.treesNeeded} Tree NFTs
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarbonCalculator;