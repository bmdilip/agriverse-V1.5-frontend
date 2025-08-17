import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Award, 
  Zap, 
  Target, 
  Crown, 
  Shield, 
  Gem,
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Gamepad2,
  Medal,
  Flame,
  Leaf,
  TreePine,
  Wallet,
  CheckCircle
} from 'lucide-react';

const GamingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [username, setUsername] = useState('');

  const userStats = {
    level: 12,
    xp: 2847,
    nextLevelXp: 3000,
    totalNFTs: 8,
    carbonOffset: 125.5,
    rank: 47,
    badges: 6,
    streak: 15,
    walletAddress: '0x1234...5678'
  };

  const badges = [
    { id: 1, name: "First Investment", icon: Star, earned: true, rarity: "Common", claimable: false },
    { id: 2, name: "Carbon Hero", icon: Leaf, earned: true, rarity: "Rare", claimable: false },
    { id: 3, name: "Farm Owner", icon: TreePine, earned: true, rarity: "Epic", claimable: false },
    { id: 4, name: "Yield Master", icon: TrendingUp, earned: false, rarity: "Legendary", claimable: true },
    { id: 5, name: "Eco Warrior", icon: Shield, earned: true, rarity: "Rare", claimable: false },
    { id: 6, name: "Diamond Hands", icon: Gem, earned: false, rarity: "Legendary", claimable: false }
  ];

  const walletLeaderboard = [
    { rank: 1, wallet: "0xEcoW...1234", xp: 15420, level: 28, avatar: "🌱", nfts: 47 },
    { rank: 2, wallet: "0xGree...5678", xp: 12890, level: 24, avatar: "🌿", nfts: 35 },
    { rank: 3, wallet: "0xCarb...9012", xp: 11250, level: 22, avatar: "🍃", nfts: 29 },
    { rank: 4, wallet: "0xTree...3456", xp: 9870, level: 19, avatar: "🌳", nfts: 24 },
    { rank: 5, wallet: "0xClim...7890", xp: 8640, level: 17, avatar: "🌲", nfts: 22 }
  ];

  const achievements = [
    { title: "Weekly Streak", description: "Invest for 7 consecutive days", progress: 5, total: 7, reward: "50 XP" },
    { title: "Carbon Offset Goal", description: "Offset 100 tons of CO₂", progress: 85, total: 100, reward: "Eco Badge" },
    { title: "Portfolio Diversifier", description: "Own 10 different NFT types", progress: 8, total: 10, reward: "100 AV" },
    { title: "Community Builder", description: "Refer 5 new users", progress: 3, total: 5, reward: "Referral Badge" }
  ];

  const nftLevels = [
    { id: 1, name: "Organic Wheat Farm #127", level: 3, xp: 450, maxXp: 600, type: "AgriYield" },
    { id: 2, name: "Teak Forest #89", level: 5, xp: 780, maxXp: 1000, type: "AgriFarms" },
    { id: 3, name: "Carbon Trees #234", level: 2, xp: 200, maxXp: 400, type: "CarbonVault" }
  ];

  const claimableBadges = badges.filter(badge => badge.claimable);

  const claimBadge = (badgeId) => {
    // Handle badge claiming logic
    console.log(`Claiming badge ${badgeId}`);
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
            <span className="text-agri-primary">Gaming</span> Dashboard
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Level up your agricultural investments. Earn XP, unlock badges, and compete with other eco-investors.
          </p>
        </motion.div>

        {/* User Profile Section with XP Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-agri-primary to-agri-accent rounded-full flex items-center justify-center text-3xl">
                🌱
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-medium text-agri-text">
                    {username || 'Anonymous Farmer'}
                  </h2>
                  <div className="flex items-center space-x-1 bg-agri-primary/20 px-3 py-1 rounded-full">
                    <Crown className="w-4 h-4 text-agri-primary" />
                    <span className="text-agri-primary text-sm font-medium">Level {userStats.level}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-agri-text/70 mb-3">
                  <span>Rank #{userStats.rank}</span>
                  <span>•</span>
                  <span>{userStats.badges} Badges</span>
                  <span>•</span>
                  <span>{userStats.streak} Day Streak</span>
                </div>
                <div className="flex items-center space-x-2 text-agri-text/60 text-sm">
                  <Wallet className="w-4 h-4" />
                  <span>{userStats.walletAddress}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <input
                type="text"
                placeholder="Set username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none mb-2"
              />
              <div className="text-sm text-agri-text/70">Customize your profile</div>
            </div>
          </div>

          {/* Enhanced XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-agri-text/70 mb-2">
              <span>XP Progress to Level {userStats.level + 1}</span>
              <span>{userStats.xp} / {userStats.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-agri-border rounded-full h-4 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-agri-primary to-agri-accent h-4 rounded-full transition-all duration-500"
                style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
            <div className="text-center mt-2 text-agri-accent text-sm font-medium">
              {userStats.nextLevelXp - userStats.xp} XP to next level
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
            <Trophy className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-medium text-agri-text mb-1">{userStats.xp}</div>
            <div className="text-agri-text/70 text-sm">Total XP</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
            <Gem className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-medium text-agri-text mb-1">{userStats.totalNFTs}</div>
            <div className="text-agri-text/70 text-sm">NFTs Owned</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
            <Leaf className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-medium text-agri-text mb-1">{userStats.carbonOffset}</div>
            <div className="text-agri-text/70 text-sm">CO₂ Offset</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
            <Flame className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-medium text-agri-text mb-1">{userStats.streak}</div>
            <div className="text-agri-text/70 text-sm">Day Streak</div>
          </div>
        </motion.div>

        {/* Claimable Badges Alert */}
        {claimableBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-agri-accent/10 border border-agri-accent/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-agri-accent" />
                <div>
                  <h3 className="text-lg font-medium text-agri-text">Claimable Badges!</h3>
                  <p className="text-agri-text/70">You have {claimableBadges.length} badge(s) ready to claim</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('badges')}
                className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors"
              >
                Claim Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-agri-card border border-agri-border rounded-full p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Gamepad2 className="w-5 h-5 mr-2 inline" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'badges'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Award className="w-5 h-5 mr-2 inline" />
              Badges
            </button>
            <button
              onClick={() => setActiveTab('nft-levels')}
              className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'nft-levels'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Shield className="w-5 h-5 mr-2 inline" />
              NFT Levels
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'leaderboard'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Trophy className="w-5 h-5 mr-2 inline" />
              Leaderboard
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Achievements */}
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h3 className="text-2xl font-medium text-agri-text mb-6">Active Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-agri-secondary/20 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-agri-text mb-1">{achievement.title}</h4>
                        <p className="text-agri-text/70 text-sm">{achievement.description}</p>
                      </div>
                      <div className="text-agri-accent text-sm font-medium">{achievement.reward}</div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h3 className="text-2xl font-medium text-agri-text mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Invested in Organic Wheat", xp: "+50 XP", time: "2 hours ago", icon: Star },
                  { action: "Earned Carbon Hero Badge", xp: "+100 XP", time: "1 day ago", icon: Award },
                  { action: "Completed Weekly Streak", xp: "+25 XP", time: "3 days ago", icon: Flame },
                  { action: "Referred new user", xp: "+75 XP", time: "5 days ago", icon: Users }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-agri-secondary/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-agri-primary" />
                      </div>
                      <div>
                        <div className="text-agri-text font-medium">{activity.action}</div>
                        <div className="text-agri-text/70 text-sm">{activity.time}</div>
                      </div>
                    </div>
                    <div className="text-agri-accent font-medium">{activity.xp}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'badges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-medium text-agri-text mb-6">Badge Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-6 rounded-xl border transition-all duration-300 relative ${
                    badge.earned 
                      ? 'bg-agri-primary/10 border-agri-primary/20' 
                      : 'bg-agri-secondary/20 border-agri-border opacity-50'
                  }`}
                >
                  {badge.claimable && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-agri-accent rounded-full flex items-center justify-center animate-pulse">
                        <Gift className="w-4 h-4 text-agri-dark" />
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      badge.earned 
                        ? 'bg-agri-primary/20' 
                        : 'bg-agri-secondary/50'
                    }`}>
                      <badge.icon className={`w-8 h-8 ${
                        badge.earned ? 'text-agri-primary' : 'text-agri-text/50'
                      }`} />
                    </div>
                    <h4 className="text-lg font-medium text-agri-text mb-2">{badge.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      badge.rarity === 'Common' ? 'bg-gray-500/20 text-gray-400' :
                      badge.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                      badge.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {badge.rarity}
                    </span>
                    {badge.claimable && (
                      <motion.button
                        onClick={() => claimBadge(badge.id)}
                        className="w-full mt-4 py-2 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Claim Badge
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'nft-levels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-medium text-agri-text mb-6">NFT Levels & Progress</h3>
            <div className="space-y-6">
              {nftLevels.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-agri-secondary/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-agri-text">{nft.name}</h4>
                      <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
                        {nft.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium text-agri-primary">Level {nft.level}</div>
                      <div className="text-agri-text/70 text-sm">{nft.xp} / {nft.maxXp} XP</div>
                    </div>
                  </div>
                  <div className="w-full bg-agri-border rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-agri-primary to-agri-accent h-3 rounded-full"
                      style={{ width: `${(nft.xp / nft.maxXp) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-medium text-agri-text mb-6">Wallet-Based XP Leaderboard</h3>
            <div className="space-y-4">
              {walletLeaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    user.rank <= 3 
                      ? 'bg-gradient-to-r from-agri-primary/10 to-agri-accent/10 border border-agri-primary/20' 
                      : 'bg-agri-secondary/20 border border-agri-border hover:border-agri-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                      user.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-agri-secondary text-agri-text'
                    }`}>
                      {user.rank <= 3 ? 
                        (user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉') 
                        : user.rank
                      }
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="text-agri-text font-medium font-mono">{user.wallet}</div>
                      <div className="text-agri-text/70 text-sm">Level {user.level} • {user.nfts} NFTs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-agri-primary font-medium text-lg">{user.xp.toLocaleString()}</div>
                    <div className="text-agri-text/70 text-sm">XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamingDashboard;