import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Users, 
  Leaf, 
  Zap,
  Crown,
  Star,
  Target,
  DollarSign,
  TreePine
} from 'lucide-react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('investors');

  const investorLeaderboard = [
    {
      rank: 1,
      name: "CryptoFarmer.eth",
      avatar: "🌾",
      totalInvested: "$125,000",
      roiEarned: "$18,750",
      nftsOwned: 47,
      joinDate: "Jan 2024",
      tier: "Platinum",
      badge: "Top Investor"
    },
    {
      rank: 2,
      name: "GreenInvestor",
      avatar: "🌱",
      totalInvested: "$98,500",
      roiEarned: "$14,775",
      nftsOwned: 35,
      joinDate: "Feb 2024",
      tier: "Gold",
      badge: "Early Adopter"
    },
    {
      rank: 3,
      name: "AgriKing",
      avatar: "👑",
      totalInvested: "$87,200",
      roiEarned: "$13,080",
      nftsOwned: 29,
      joinDate: "Mar 2024",
      tier: "Gold",
      badge: "Consistent"
    },
    {
      rank: 4,
      name: "EcoWarrior",
      avatar: "🌿",
      totalInvested: "$76,800",
      roiEarned: "$11,520",
      nftsOwned: 24,
      joinDate: "Jan 2024",
      tier: "Silver",
      badge: "Eco Champion"
    },
    {
      rank: 5,
      name: "FarmTech",
      avatar: "🚜",
      totalInvested: "$65,400",
      roiEarned: "$9,810",
      nftsOwned: 22,
      joinDate: "Apr 2024",
      tier: "Silver",
      badge: "Tech Savvy"
    }
  ];

  const carbonLeaderboard = [
    {
      rank: 1,
      name: "EcoWarrior.eth",
      avatar: "🌱",
      carbonOffset: "125.5 tons",
      treesPlanted: 628,
      carbonCredits: 1255,
      joinDate: "Jan 2024",
      tier: "Carbon Hero",
      badge: "Planet Saver"
    },
    {
      rank: 2,
      name: "GreenInvestor",
      avatar: "🌿",
      carbonOffset: "98.2 tons",
      treesPlanted: 491,
      carbonCredits: 982,
      joinDate: "Feb 2024",
      tier: "Eco Champion",
      badge: "Tree Lover"
    },
    {
      rank: 3,
      name: "CarbonNeutral",
      avatar: "🍃",
      carbonOffset: "87.8 tons",
      treesPlanted: 439,
      carbonCredits: 878,
      joinDate: "Mar 2024",
      tier: "Green Guardian",
      badge: "Climate Action"
    },
    {
      rank: 4,
      name: "TreeLover",
      avatar: "🌳",
      totalInvested: "$76,300",
      carbonOffset: "76.3 tons",
      treesPlanted: 382,
      carbonCredits: 763,
      joinDate: "Jan 2024",
      tier: "Nature Friend",
      badge: "Forest Protector"
    },
    {
      rank: 5,
      name: "ClimateHero",
      avatar: "🌲",
      carbonOffset: "65.9 tons",
      treesPlanted: 330,
      carbonCredits: 659,
      joinDate: "Apr 2024",
      tier: "Eco Warrior",
      badge: "Green Pioneer"
    }
  ];

  const xpLeaderboard = [
    {
      rank: 1,
      name: "GameMaster.eth",
      avatar: "🎮",
      xp: 15420,
      level: 47,
      badges: 23,
      achievements: "NFT Collector",
      tier: "Legendary",
      badge: "XP Master"
    },
    {
      rank: 2,
      name: "QuestHunter",
      avatar: "⚔️",
      xp: 12850,
      level: 42,
      badges: 19,
      achievements: "Quest Master",
      tier: "Epic",
      badge: "Achievement Hunter"
    },
    {
      rank: 3,
      name: "LevelUp",
      avatar: "🚀",
      xp: 11200,
      level: 38,
      badges: 16,
      achievements: "Speed Runner",
      tier: "Epic",
      badge: "Fast Climber"
    },
    {
      rank: 4,
      name: "BadgeCollector",
      avatar: "🏆",
      xp: 9750,
      level: 34,
      badges: 21,
      achievements: "Badge Master",
      tier: "Rare",
      badge: "Collector"
    },
    {
      rank: 5,
      name: "ProgressPro",
      avatar: "📈",
      xp: 8900,
      level: 31,
      badges: 14,
      achievements: "Steady Growth",
      tier: "Rare",
      badge: "Consistent"
    }
  ];

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum':
      case 'Legendary':
      case 'Carbon Hero':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Gold':
      case 'Epic':
      case 'Eco Champion':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Silver':
      case 'Rare':
      case 'Green Guardian':
        return 'text-gray-300 bg-gray-300/10 border-gray-300/20';
      default:
        return 'text-agri-primary bg-agri-primary/10 border-agri-primary/20';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-agri-text">{rank}</span>;
    }
  };

  const currentLeaderboard = 
    activeTab === 'investors' ? investorLeaderboard :
    activeTab === 'carbon' ? carbonLeaderboard :
    xpLeaderboard;

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
            <span className="text-agri-primary">Leaderboard</span>
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Compete with other investors and track your progress across investments, 
            carbon offset, and platform engagement.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">2,847</div>
            <div className="text-agri-text/70 text-sm">Total Investors</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <DollarSign className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">$2.4M</div>
            <div className="text-agri-text/70 text-sm">Total Invested</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <TreePine className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">12,450</div>
            <div className="text-agri-text/70 text-sm">Trees Planted</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Zap className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">847K</div>
            <div className="text-agri-text/70 text-sm">Total XP Earned</div>
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
              onClick={() => setActiveTab('investors')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'investors'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <TrendingUp className="w-5 h-5 mr-2 inline" />
              Top Investors
            </button>
            <button
              onClick={() => setActiveTab('carbon')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'carbon'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Leaf className="w-5 h-5 mr-2 inline" />
              Carbon Heroes
            </button>
            <button
              onClick={() => setActiveTab('xp')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'xp'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Star className="w-5 h-5 mr-2 inline" />
              XP Leaders
            </button>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-agri-border">
            <h2 className="text-2xl font-light text-agri-text">
              {activeTab === 'investors' && 'Top Investors'}
              {activeTab === 'carbon' && 'Carbon Offset Leaders'}
              {activeTab === 'xp' && 'XP Leaderboard'}
            </h2>
          </div>

          <div className="divide-y divide-agri-border">
            {currentLeaderboard.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 hover:bg-agri-secondary/20 transition-all duration-300 ${
                  user.rank <= 3 ? 'bg-gradient-to-r from-agri-primary/5 to-agri-accent/5' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="w-12 h-12 rounded-full bg-agri-secondary/50 flex items-center justify-center">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar & Info */}
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{user.avatar}</div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-agri-text">{user.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(user.tier)}`}>
                            {user.tier}
                          </span>
                          <span className="px-2 py-1 bg-agri-accent/20 text-agri-accent rounded-full text-xs">
                            {user.badge}
                          </span>
                        </div>
                        <div className="text-agri-text/70 text-sm">
                          Joined {user.joinDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    {activeTab === 'investors' && (
                      <div className="space-y-1">
                        <div className="text-xl font-medium text-agri-primary">{user.totalInvested}</div>
                        <div className="text-sm text-agri-text/70">ROI: {user.roiEarned}</div>
                        <div className="text-sm text-agri-text/70">{user.nftsOwned} NFTs</div>
                      </div>
                    )}
                    {activeTab === 'carbon' && (
                      <div className="space-y-1">
                        <div className="text-xl font-medium text-agri-primary">{user.carbonOffset}</div>
                        <div className="text-sm text-agri-text/70">{user.treesPlanted} trees</div>
                        <div className="text-sm text-agri-text/70">{user.carbonCredits} credits</div>
                      </div>
                    )}
                    {activeTab === 'xp' && (
                      <div className="space-y-1">
                        <div className="text-xl font-medium text-agri-primary">{user.xp.toLocaleString()} XP</div>
                        <div className="text-sm text-agri-text/70">Level {user.level}</div>
                        <div className="text-sm text-agri-text/70">{user.badges} badges</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Rank Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-agri-primary/20 flex items-center justify-center">
                <span className="text-lg font-bold text-agri-primary">#47</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌾</div>
                <div>
                  <h3 className="text-lg font-medium text-agri-text">Your Rank</h3>
                  <div className="text-agri-text/70 text-sm">Keep investing to climb higher!</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              {activeTab === 'investors' && (
                <div className="space-y-1">
                  <div className="text-xl font-medium text-agri-primary">$12,500</div>
                  <div className="text-sm text-agri-text/70">ROI: $1,875</div>
                  <div className="text-sm text-agri-text/70">8 NFTs</div>
                </div>
              )}
              {activeTab === 'carbon' && (
                <div className="space-y-1">
                  <div className="text-xl font-medium text-agri-primary">15.2 tons</div>
                  <div className="text-sm text-agri-text/70">76 trees</div>
                  <div className="text-sm text-agri-text/70">152 credits</div>
                </div>
              )}
              {activeTab === 'xp' && (
                <div className="space-y-1">
                  <div className="text-xl font-medium text-agri-primary">2,450 XP</div>
                  <div className="text-sm text-agri-text/70">Level 18</div>
                  <div className="text-sm text-agri-text/70">5 badges</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Rewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-agri-text mb-2">Top 10 Rewards</h3>
            <p className="text-agri-text/70 font-light mb-4">
              Monthly AV token bonuses for top performers
            </p>
            <div className="text-agri-primary font-medium">500 AV Tokens</div>
          </div>
          
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Target className="w-12 h-12 text-agri-accent mx-auto mb-4" />
            <h3 className="text-xl font-medium text-agri-text mb-2">Achievement Badges</h3>
            <p className="text-agri-text/70 font-light mb-4">
              Unlock special badges for milestones
            </p>
            <div className="text-agri-accent font-medium">Exclusive NFTs</div>
          </div>
          
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Star className="w-12 h-12 text-agri-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium text-agri-text mb-2">VIP Access</h3>
            <p className="text-agri-text/70 font-light mb-4">
              Early access to premium projects
            </p>
            <div className="text-agri-primary font-medium">Priority Investing</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;