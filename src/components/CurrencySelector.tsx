import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ChevronDown } from 'lucide-react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const CurrencySelector: React.FC = () => {
  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'USDT', symbol: '₮', name: 'Tether' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    // Here you would implement actual currency change logic
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-agri-card/50 backdrop-blur-sm border border-agri-border text-agri-text rounded-lg hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm">{selectedCurrency.symbol}</span>
        <span className="text-sm">{selectedCurrency.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-40 bg-agri-card/95 backdrop-blur-xl border border-agri-border rounded-xl shadow-xl z-50"
        >
          <div className="p-1">
            {currencies.map((currency) => (
              <motion.button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 transition-all duration-200 rounded-lg"
                whileHover={{ x: 2 }}
              >
                <span>{currency.symbol}</span>
                <span>{currency.code}</span>
                {selectedCurrency.code === currency.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-agri-primary rounded-full ml-auto"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CurrencySelector;