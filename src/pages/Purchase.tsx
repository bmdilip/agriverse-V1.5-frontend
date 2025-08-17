import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpDown, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Zap,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Info,
  CheckCircle,
  Globe,
  DollarSign,
  BarChart3
} from 'lucide-react';
import CurrencySelector from '../components/CurrencySelector';
import LanguageSelector from '../components/LanguageSelector';

const Purchase = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken] = useState('AV');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const supportedTokens = [
    { symbol: 'BNB', name: 'Binance Coin', chain: 'BSC', icon: '🟡' },
    { symbol: 'USDT', name: 'Tether USD', chain: 'Multi-chain', icon: '💚' },
    { symbol: 'ETH', name: 'Ethereum', chain: 'Ethereum', icon: '🔷' },
    { symbol: 'MATIC', name: 'Polygon', chain: 'Polygon', icon: '🟣' },
    { symbol: 'BASE', name: 'Base Token', chain: 'Base', icon: '🔵' }
  ];

  const avTokenStats = {
    price: '$1.00',
    supply: '1,000,000,000',
    volume24h: '$2,450,000',
    marketCap: '$1,000,000,000'
  };

  const calculateSwap = (amount) => {
    if (!amount) return '';
    // Simple 1:1 conversion for demo
    return amount;
  };

  const handleSwap = () => {
    setIsSwapping(true);
    // Simulate swap process
    setTimeout(() => {
      setIsSwapping(false);
      // Show success modal or redirect
    }, 3000);
  };

  const SwapConfirmationModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-agri-card border border-agri-border rounded-2xl p-6 max-w-md w-full"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-agri-primary animate-spin" />
          </div>
          <h3 className="text-xl font-medium text-agri-text mb-2">Swapping Tokens</h3>
          <p className="text-agri-text/70 mb-4">
            Processing your swap from {fromAmount} {fromToken} to {toAmount} AV
          </p>
          <div className="bg-agri-secondary/20 rounded-lg p-4">
            <div className="text-agri-primary font-medium">Transaction in progress...</div>
            <div className="text-agri-text/70 text-sm mt-1">This may take a few moments</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            Buy <span className="text-agri-primary">AV Tokens</span>
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Use crypto or fiat to get started with Agriverse. 
            Purchase AV tokens to invest in agricultural projects and earn yields.
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <span className="text-agri-text/70">
              Purchase Options
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <CurrencySelector />
            <LanguageSelector />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-full p-1">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'swap'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <ArrowUpDown className="w-5 h-5 mr-2 inline" />
              Swap Tokens
            </button>
            <button
              onClick={() => setActiveTab('fiat')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'fiat'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <CreditCard className="w-5 h-5 mr-2 inline" />
              Buy with Fiat
            </button>
          </div>
        </motion.div>

        {/* Swap Tokens Tab */}
        {activeTab === 'swap' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Swap Panel */}
            <div className="lg:col-span-2">
              <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
                <h2 className="text-3xl font-light text-agri-text mb-8">Token Swap</h2>
                
                {/* From Token */}
                <div className="mb-6">
                  <label className="block text-agri-text/70 mb-3">From</label>
                  <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="relative">
                        <select
                          value={fromToken}
                          onChange={(e) => setFromToken(e.target.value)}
                          className="appearance-none bg-agri-dark border border-agri-border rounded-lg px-4 py-2 text-agri-text focus:border-agri-primary focus:outline-none pr-10"
                        >
                          {supportedTokens.map((token) => (
                            <option key={token.symbol} value={token.symbol}>
                              {token.symbol}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-agri-text/50 pointer-events-none" />
                      </div>
                      <div className="text-agri-text/70 text-sm">
                        Balance: 0.00 {fromToken}
                      </div>
                    </div>
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => {
                        setFromAmount(e.target.value);
                        setToAmount(calculateSwap(e.target.value));
                      }}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-light text-agri-text placeholder-agri-text/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Swap Arrow */}
                <div className="flex justify-center mb-6">
                  <motion.button
                    className="w-12 h-12 bg-agri-primary/20 border border-agri-primary/30 rounded-full flex items-center justify-center text-agri-primary hover:bg-agri-primary/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* To Token */}
                <div className="mb-8">
                  <label className="block text-agri-text/70 mb-3">To</label>
                  <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-agri-primary to-agri-accent rounded-full flex items-center justify-center">
                          <span className="text-agri-dark font-bold text-sm">AV</span>
                        </div>
                        <span className="text-agri-text font-medium">AV Token</span>
                      </div>
                      <div className="text-agri-text/70 text-sm">
                        Balance: 0.00 AV
                      </div>
                    </div>
                    <input
                      type="number"
                      value={toAmount}
                      readOnly
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-light text-agri-text placeholder-agri-text/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Swap Details */}
                <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-agri-text/70">Exchange Rate</span>
                    <span className="text-agri-text">1 {fromToken} = 1 AV</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-agri-text/70">Network Fee</span>
                    <span className="text-agri-text">~$2.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-agri-text/70">Slippage Tolerance</span>
                    <span className="text-agri-text">0.5%</span>
                  </div>
                </div>

                {/* Swap Button */}
                <motion.button
                  onClick={handleSwap}
                  disabled={!fromAmount || !toAmount}
                  className="w-full py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {fromAmount && toAmount ? `Swap ${fromAmount} ${fromToken} for ${toAmount} AV` : 'Enter Amount'}
                </motion.button>

                {/* Powered By */}
                <div className="text-center mt-4">
                  <p className="text-agri-text/50 text-sm">
                    Best rate powered by PancakeSwap / 0x Aggregator
                  </p>
                  <p className="text-agri-text/50 text-xs mt-1">
                    Cross-chain support enabled (BNB, Polygon, Base, Ethereum)
                  </p>
                </div>
              </div>
            </div>

            {/* Token Stats & Supported Chains */}
            <div className="space-y-6">
              {/* AV Token Stats */}
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">AV Token Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Price</span>
                    <span className="text-agri-primary font-medium">{avTokenStats.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Market Cap</span>
                    <span className="text-agri-text">{avTokenStats.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">24h Volume</span>
                    <span className="text-agri-text">{avTokenStats.volume24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Total Supply</span>
                    <span className="text-agri-text">{avTokenStats.supply}</span>
                  </div>
                </div>
                
                {/* Price Chart Placeholder */}
                <div className="mt-6 h-32 bg-agri-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-agri-primary mx-auto mb-2" />
                    <p className="text-agri-text/70 text-sm">Price Chart</p>
                  </div>
                </div>
              </div>

              {/* Supported Tokens */}
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Supported Tokens</h3>
                <div className="space-y-3">
                  {supportedTokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{token.icon}</span>
                        <div>
                          <div className="text-agri-text font-medium">{token.symbol}</div>
                          <div className="text-agri-text/70 text-sm">{token.name}</div>
                        </div>
                      </div>
                      <span className="text-agri-text/70 text-xs">{token.chain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Security Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/80 text-sm">Audited Smart Contracts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-agri-accent" />
                    <span className="text-agri-text/80 text-sm">MEV Protection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/80 text-sm">Slippage Protection</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Buy with Fiat Tab */}
        {activeTab === 'fiat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-agri-primary/20 to-agri-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-agri-primary" />
              </div>
              
              <h2 className="text-3xl font-light text-agri-text mb-4">
                Buy AV using Fiat
              </h2>
              <p className="text-agri-text/70 font-light mb-8 max-w-md mx-auto">
                Use global payment options to purchase AV tokens directly with your credit card or bank account.
              </p>

              {/* Integration Badge */}
              <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Globe className="w-8 h-8 text-agri-primary" />
                  <span className="text-agri-text font-medium">Powered by MoonPay / Ramp</span>
                </div>
                <p className="text-agri-text/70 text-sm">
                  Secure fiat-to-crypto gateway with global payment support
                </p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-agri-secondary/20 rounded-lg p-4">
                  <CreditCard className="w-6 h-6 text-agri-primary mx-auto mb-2" />
                  <div className="text-agri-text text-sm">Credit/Debit Card</div>
                </div>
                <div className="bg-agri-secondary/20 rounded-lg p-4">
                  <DollarSign className="w-6 h-6 text-agri-accent mx-auto mb-2" />
                  <div className="text-agri-text text-sm">Bank Transfer</div>
                </div>
                <div className="bg-agri-secondary/20 rounded-lg p-4">
                  <Wallet className="w-6 h-6 text-agri-primary mx-auto mb-2" />
                  <div className="text-agri-text text-sm">Digital Wallets</div>
                </div>
              </div>

              {/* Process Flow */}
              <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-6 mb-8">
                <h4 className="text-agri-text font-medium mb-4">How it works</h4>
                <div className="space-y-3 text-sm text-agri-text/70">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center text-agri-primary text-xs font-medium">1</div>
                    <span>Choose payment method and amount</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center text-agri-primary text-xs font-medium">2</div>
                    <span>Complete KYC verification (if required)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center text-agri-primary text-xs font-medium">3</div>
                    <span>Auto-swap: Fiat → USDT → AV tokens</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center text-agri-primary text-xs font-medium">4</div>
                    <span>Receive AV tokens in your wallet</span>
                  </div>
                </div>
              </div>

              {/* Coming Soon Button */}
              <motion.button
                className="w-full py-4 bg-agri-secondary/50 text-agri-text rounded-xl font-medium text-lg border border-agri-border cursor-not-allowed"
                disabled
              >
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Buy with Card (Coming Soon)</span>
                </div>
              </motion.button>

              <p className="text-agri-text/50 text-sm mt-4">
                Fiat integration will be available soon. Use the swap feature for now.
              </p>
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Secure Trading</h3>
              <p className="text-agri-text/70 font-light">
                All swaps are secured by audited smart contracts and industry-leading security practices.
              </p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Best Rates</h3>
              <p className="text-agri-text/70 font-light">
                Get the best exchange rates through our aggregated liquidity from multiple DEXs.
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Cross-Chain</h3>
              <p className="text-agri-text/70 font-light">
                Swap tokens across multiple blockchains including Ethereum, BSC, Polygon, and Base.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Swap Confirmation Modal */}
      {isSwapping && <SwapConfirmationModal />}
    </div>
  );
};

export default Purchase;