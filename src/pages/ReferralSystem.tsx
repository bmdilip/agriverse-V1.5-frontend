import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Copy, 
  Share2, 
  Gift, 
  TrendingUp, 
  Award,
  ExternalLink,
  Check,
  DollarSign,
  UserPlus,
  Coins
} from 'lucide-react';
import toast from 'react-hot-toast';

const ReferralSystem = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const referralCode = "AGRI-ABC123";
  const referralLink = `https://agriverse.io/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const text = "Join me on Agriverse - Invest in Real Farms & Carbon Projects powered by blockchain!";
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + referralLink)}`
    };
    window.open(urls[platform], '_blank');
  };

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 2450,
    pendingRewards: 180,
    thisMonth: 340
  };

  const referralHistory = [
    {
      id: 1,
      user: "0x1234...5678",
      joinDate: "2025-01-15",
      status: "Active",
      earned: 250,
      investment: 5000
    },
    {
      id: 2,
      user: "0x9876...4321",
      joinDate: "2025-01-12",
      status: "Active",
      earned: 180,
      investment: 3600
    },
    {
      id: 3,
      user: "0x5555...7777",
      joinDate: "2025-01-08",
      status: "Pending",
      earned: 0,
      investment: 0
    }
  ];

  const rewardTiers = [
    {
      tier: "Bronze",
      referrals: "1-5",
      commission: "3%",
      bonus: "$50",
      current: true
    },
    {
      tier: "Silver",
      referrals: "6-15",
      commission: "4%",
      bonus: "$150",
      current: false
    },
    {
      tier: "Gold",
      referrals: "16-30",
      commission: "5%",
      bonus: "$300",
      current: false
    },
    {
      tier: "Platinum",
      referrals: "31+",
      commission: "6%",
      bonus: "$500",
      current: false
    }
  ];

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
            <span className="text-agri-primary">Referral</span> Program
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Earn AV tokens by inviting friends to invest in sustainable agriculture. 
            Get rewarded for every successful referral and help grow the Agriverse community.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Total Referrals</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">{referralStats.totalReferrals}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <UserPlus className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Active</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">{referralStats.activeReferrals}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Coins className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Total Earned</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">${referralStats.totalEarned}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Gift className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Pending</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">${referralStats.pendingRewards}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">This Month</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">${referralStats.thisMonth}</div>
          </div>
        </motion.div>

        {/* Referral Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-light text-agri-text mb-6 text-center">
            Your Referral Link
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 bg-agri-secondary/20 border border-agri-border rounded-lg p-4">
                <div className="text-agri-text/70 text-sm mb-1">Referral Code</div>
                <div className="text-agri-text font-medium">{referralCode}</div>
              </div>
              <div className="flex-1 bg-agri-secondary/20 border border-agri-border rounded-lg p-4">
                <div className="text-agri-text/70 text-sm mb-1">Commission Rate</div>
                <div className="text-agri-primary font-medium">3% (Bronze Tier)</div>
              </div>
            </div>

            <div className="bg-agri-secondary/20 border border-agri-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-agri-text font-mono text-sm break-all mr-4">
                  {referralLink}
                </div>
                <motion.button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </motion.button>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Twitter</span>
              </motion.button>
              <motion.button
                onClick={() => shareOnSocial('telegram')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-400/20 border border-blue-400/30 text-blue-300 rounded-lg hover:bg-blue-400/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Telegram</span>
              </motion.button>
              <motion.button
                onClick={() => shareOnSocial('whatsapp')}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-full p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              Referral History
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'tiers'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              Reward Tiers
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h3 className="text-2xl font-light text-agri-text mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-agri-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-agri-primary font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="text-agri-text font-medium mb-2">Share Your Link</h4>
                    <p className="text-agri-text/70 font-light">Share your unique referral link with friends and family.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-agri-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-agri-primary font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="text-agri-text font-medium mb-2">They Join & Invest</h4>
                    <p className="text-agri-text/70 font-light">When they sign up and make their first investment, you both benefit.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-agri-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-agri-primary font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="text-agri-text font-medium mb-2">Earn Rewards</h4>
                    <p className="text-agri-text/70 font-light">Receive AV tokens as commission on their investments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h3 className="text-2xl font-light text-agri-text mb-6">Reward Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-agri-primary/10 border border-agri-primary/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text">Commission on Investments</span>
                  </div>
                  <span className="text-agri-primary font-medium">3-6%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-agri-accent/10 border border-agri-accent/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Gift className="w-5 h-5 text-agri-accent" />
                    <span className="text-agri-text">Signup Bonus</span>
                  </div>
                  <span className="text-agri-accent font-medium">$50-500</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-agri-primary/10 border border-agri-primary/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text">Tier Upgrades</span>
                  </div>
                  <span className="text-agri-primary font-medium">Auto</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-agri-secondary/20 border border-agri-border rounded-lg">
                <h4 className="text-agri-text font-medium mb-2">Next Milestone</h4>
                <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                  <span>Progress to Silver Tier</span>
                  <span>12/15 referrals</span>
                </div>
                <div className="w-full bg-agri-border rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                    style={{ width: '80%' }}
                  />
                </div>
                <p className="text-agri-text/70 text-sm mt-2">3 more referrals to unlock 4% commission rate</p>
              </div>
            </div>
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
              <h3 className="text-2xl font-light text-agri-text">Referral History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-agri-secondary/20">
                  <tr>
                    <th className="text-left p-4 text-agri-text/70 font-light">User</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Join Date</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Status</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Investment</th>
                    <th className="text-left p-4 text-agri-text/70 font-light">Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((referral) => (
                    <tr key={referral.id} className="border-b border-agri-border hover:bg-agri-secondary/10">
                      <td className="p-4">
                        <div className="text-agri-text font-mono">{referral.user}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-agri-text/70">{referral.joinDate}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'Active' 
                            ? 'bg-agri-primary/20 text-agri-primary' 
                            : 'bg-agri-accent/20 text-agri-accent'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-agri-text">${referral.investment.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-agri-primary font-medium">${referral.earned}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'tiers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {rewardTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-agri-card border rounded-2xl p-6 transition-all duration-300 ${
                  tier.current 
                    ? 'border-agri-primary bg-agri-primary/5' 
                    : 'border-agri-border hover:border-agri-primary/50'
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    tier.current 
                      ? 'bg-agri-primary/20 border-2 border-agri-primary' 
                      : 'bg-agri-secondary/20 border border-agri-border'
                  }`}>
                    <Award className={`w-8 h-8 ${tier.current ? 'text-agri-primary' : 'text-agri-text/50'}`} />
                  </div>
                  <h3 className={`text-xl font-medium mb-2 ${tier.current ? 'text-agri-primary' : 'text-agri-text'}`}>
                    {tier.tier}
                  </h3>
                  {tier.current && (
                    <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs font-medium mb-4 inline-block">
                      Current Tier
                    </span>
                  )}
                  <div className="space-y-3">
                    <div>
                      <div className="text-agri-text/70 text-sm">Referrals Required</div>
                      <div className="text-agri-text font-medium">{tier.referrals}</div>
                    </div>
                    <div>
                      <div className="text-agri-text/70 text-sm">Commission Rate</div>
                      <div className="text-agri-accent font-medium text-lg">{tier.commission}</div>
                    </div>
                    <div>
                      <div className="text-agri-text/70 text-sm">Signup Bonus</div>
                      <div className="text-agri-primary font-medium">{tier.bonus}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Claim Rewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-agri-primary/10 to-agri-accent/10 border border-agri-primary/20 rounded-2xl p-8 text-center"
        >
          <Gift className="w-16 h-16 text-agri-primary mx-auto mb-6" />
          <h3 className="text-3xl font-light text-agri-text mb-4">
            Ready to Claim Rewards?
          </h3>
          <p className="text-agri-text/70 font-light mb-6 max-w-2xl mx-auto">
            You have ${referralStats.pendingRewards} in pending rewards ready to be claimed as AV tokens.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-full font-medium text-lg hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim ${referralStats.pendingRewards} AV Tokens
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralSystem;