import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Coins, 
  TrendingUp, 
  Calendar, 
  Award, 
  Zap,
  Clock,
  DollarSign,
  Users,
  Shield,
  Target,
  Gift,
  ArrowRight,
  Info
} from 'lucide-react';

const AVStaking = () => {
  const [activeTab, setActiveTab] = useState('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const stakingPools = [
    {
      id: 1,
      name: "Flexible Staking",
      apy: "8%",
      period: "Flexible",
      minStake: "100 AV",
      totalStaked: "2.4M AV",
      participants: 1247,
      description: "Stake and unstake anytime with daily rewards",
      features: ["Daily Rewards", "No Lock Period", "Instant Unstake"]
    },
    {
      id: 2,
      name: "30-Day Lock",
      apy: "12%",
      period: "30 Days",
      minStake: "500 AV",
      totalStaked: "1.8M AV",
      participants: 892,
      description: "Higher rewards with 30-day commitment",
      features: ["Higher APY", "Monthly Compound", "Early Unstake Fee"]
    },
    {
      id: 3,
      name: "90-Day Lock",
      apy: "18%",
      period: "90 Days",
      minStake: "1000 AV",
      totalStaked: "3.2M AV",
      participants: 654,
      description: "Maximum rewards for long-term stakers",
      features: ["Highest APY", "Quarterly Bonus", "VIP Benefits"]
    }
  ];

  const userStats = {
    totalStaked: "5,247 AV",
    pendingRewards: "127.3 AV",
    totalEarned: "892.5 AV",
    stakingPower: "0.08%"
  };

  const stakingHistory = [
    { action: "Staked", amount: "1,000 AV", date: "2025-01-15", pool: "90-Day Lock" },
    { action: "Rewards", amount: "45.2 AV", date: "2025-01-10", pool: "Flexible" },
    { action: "Staked", amount: "2,500 AV", date: "2025-01-05", pool: "30-Day Lock" },
    { action: "Unstaked", amount: "500 AV", date: "2024-12-28", pool: "Flexible" }
  ];

  const calculateRewards = () => {
    const amount = parseFloat(stakeAmount) || 0;
    const days = parseInt(selectedPeriod);
    const apy = days === 0 ? 8 : days === 30 ? 12 : 18;
    const dailyRate = apy / 365 / 100;
    const rewards = amount * dailyRate * (days || 365);
    return rewards.toFixed(2);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">AV Token</span> Staking
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Stake your AV tokens to earn passive rewards while supporting the Agriverse ecosystem. 
            Choose from flexible or fixed-term staking options.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Lock className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Total Staked</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">{userStats.totalStaked}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Gift className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Pending Rewards</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">{userStats.pendingRewards}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Total Earned</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">{userStats.totalEarned}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Target className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Staking Power</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">{userStats.stakingPower}</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-full p-1">
            <button
              onClick={() => setActiveTab('stake')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'stake'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Lock className="w-5 h-5 mr-2 inline" />
              Stake Tokens
            </button>
            <button
              onClick={() => setActiveTab('pools')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'pools'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Coins className="w-5 h-5 mr-2 inline" />
              Staking Pools
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2 inline" />
              History
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'stake' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Staking Form */}
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h2 className="text-3xl font-light text-agri-text mb-8">Stake AV Tokens</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-agri-text/70 mb-3">Amount to Stake</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-4 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text text-lg focus:border-agri-primary focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-agri-text/70">
                      AV
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-agri-text/70 mt-2">
                    <span>Available: 12,847 AV</span>
                    <button className="text-agri-primary hover:text-agri-primary/80">Max</button>
                  </div>
                </div>

                <div>
                  <label className="block text-agri-text/70 mb-3">Staking Period</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '0', label: 'Flexible', apy: '8%' },
                      { value: '30', label: '30 Days', apy: '12%' },
                      { value: '90', label: '90 Days', apy: '18%' }
                    ].map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value)}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          selectedPeriod === period.value
                            ? 'border-agri-primary bg-agri-primary/10'
                            : 'border-agri-border bg-agri-secondary/20 hover:border-agri-primary/50'
                        }`}
                      >
                        <div className="text-agri-text font-medium">{period.label}</div>
                        <div className="text-agri-primary text-sm">{period.apy} APY</div>
                      </button>
                    ))}
                  </div>
                </div>

                {stakeAmount && (
                  <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-lg p-4">
                    <h4 className="text-agri-text font-medium mb-2">Estimated Rewards</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text/70">
                        {selectedPeriod === '0' ? 'Annual' : `${selectedPeriod} days`} rewards:
                      </span>
                      <span className="text-agri-primary font-medium text-lg">
                        {calculateRewards()} AV
                      </span>
                    </div>
                  </div>
                )}

                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium text-lg hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Stake Tokens
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </motion.button>
              </div>
            </div>

            {/* Staking Info */}
            <div className="space-y-6">
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Your Staking Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-agri-secondary/20 rounded-lg">
                    <span className="text-agri-text/70">Active Stakes</span>
                    <span className="text-agri-text font-medium">3 pools</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-agri-secondary/20 rounded-lg">
                    <span className="text-agri-text/70">Average APY</span>
                    <span className="text-agri-primary font-medium">14.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-agri-secondary/20 rounded-lg">
                    <span className="text-agri-text/70">Next Reward</span>
                    <span className="text-agri-accent font-medium">12h 34m</span>
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-4 py-3 bg-agri-accent/20 border border-agri-accent text-agri-accent rounded-lg font-medium hover:bg-agri-accent/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Pending Rewards
                </motion.button>
              </div>

              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Staking Benefits</h3>
                <div className="space-y-3">
                  {[
                    { icon: TrendingUp, text: "Earn passive income on your AV tokens" },
                    { icon: Shield, text: "Secure and audited smart contracts" },
                    { icon: Users, text: "Participate in governance voting" },
                    { icon: Award, text: "Exclusive staker rewards and bonuses" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <benefit.icon className="w-5 h-5 text-agri-primary" />
                      <span className="text-agri-text/80 text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pools' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stakingPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-agri-card border border-agri-border rounded-2xl p-6 hover:border-agri-primary/50 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-medium text-agri-text mb-2">{pool.name}</h3>
                  <div className="text-4xl font-light text-agri-primary mb-2">{pool.apy}</div>
                  <div className="text-agri-text/70">APY</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Period</span>
                    <span className="text-agri-text">{pool.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Min Stake</span>
                    <span className="text-agri-text">{pool.minStake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Total Staked</span>
                    <span className="text-agri-text">{pool.totalStaked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text/70">Participants</span>
                    <span className="text-agri-text">{pool.participants.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-agri-text/70 text-sm mb-3">{pool.description}</p>
                  <div className="space-y-2">
                    {pool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-agri-primary rounded-full" />
                        <span className="text-agri-text/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Stake in Pool
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-agri-border">
              <h3 className="text-2xl font-light text-agri-text">Staking History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-agri-secondary/20">
                  <tr>
                    <th className="text-left p-4 text-agri-text/70 font-light">Action</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Amount</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Pool</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stakingHistory.map((item, index) => (
                    <tr key={index} className="border-b border-agri-border hover:bg-agri-secondary/10">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.action === 'Staked' ? 'bg-agri-primary' :
                            item.action === 'Rewards' ? 'bg-agri-accent' :
                            'bg-agri-text/50'
                          }`} />
                          <span className="text-agri-text">{item.action}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${
                          item.action === 'Rewards' ? 'text-agri-accent' : 'text-agri-text'
                        }`}>
                          {item.amount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-agri-text/70">{item.pool}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-agri-text/70">{item.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <Lock className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Secure Staking</h3>
              <p className="text-agri-text/70 font-light">
                Your tokens are secured by audited smart contracts with multi-signature protection.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Competitive Rewards</h3>
              <p className="text-agri-text/70 font-light">
                Earn up to 18% APY with our flexible and fixed-term staking options.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Governance Rights</h3>
              <p className="text-agri-text/70 font-light">
                Stakers get voting rights in Agriverse governance and platform decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AVStaking;