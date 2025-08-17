import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  TrendingUp, 
  Leaf, 
  Award, 
  Eye, 
  Download, 
  Camera, 
  BarChart3, 
  DollarSign, 
  Calendar, 
  TreePine, 
  Users, 
  Shield, 
  Edit3, 
  ExternalLink, 
  PlayCircle, 
  Coins, 
  Target, 
  Zap, 
  Bell, 
  Filter, 
  Cog as Cow, 
  Bird, 
  Bone,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Plus,
  Star,
  Lock
} from 'lucide-react';
import ROICalendar from '../components/ROICalendar';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    bio: 'Sustainable agriculture enthusiast and carbon offset advocate',
    avatar: '🌱'
  });

  const userStats = {
    totalInvested: '$12,450',
    totalReturns: '$2,180',
    carbonOffset: '45.2 tons',
    avTokens: '1,247',
    usdtBalance: '2,850',
    nftsOwned: 8,
    referrals: 3,
    carbonCredits: 152
  };

  const filters = [
    { id: 'all', label: 'All NFTs', icon: Filter },
    { id: 'agriyield', label: 'AgriYield', icon: Leaf },
    { id: 'agrifarms', label: 'AgriFarms', icon: TreePine },
    { id: 'carbonvault', label: 'CarbonVault', icon: Shield },
    { id: 'livestock', label: 'Livestock', icon: Cow }
  ];

  const userNFTs = [
    {
      id: 1,
      title: "Organic Wheat Farm #127",
      type: "AgriYield",
      roi: "18%",
      maturity: 85,
      value: "$2,500",
      returns: "$450",
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "Active",
      liveFeed: true,
      liveStreamUrl: "https://example.com/live-stream-1",
      nextROI: "Jan 15, 2025"
    },
    {
      id: 2,
      title: "Teak Forest Plantation #89",
      type: "AgriFarms",
      roi: "12%",
      maturity: 40,
      value: "$5,000",
      returns: "$600",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "Active",
      liveFeed: true,
      liveStreamUrl: "https://example.com/live-stream-2",
      nextROI: "Jan 28, 2025"
    },
    {
      id: 3,
      title: "Carbon Offset Trees #234",
      type: "CarbonVault",
      roi: "Environmental",
      maturity: 100,
      value: "$750",
      returns: "15.2 tons CO₂",
      image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "Complete",
      liveFeed: false,
      liveStreamUrl: null,
      nextROI: "N/A"
    },
    {
      id: 4,
      title: "Premium Dairy Cattle Farm",
      type: "Livestock",
      roi: "22%",
      maturity: 65,
      value: "$1,800",
      returns: "$396",
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "Active",
      liveFeed: true,
      liveStreamUrl: "https://example.com/live-stream-3",
      nextROI: "Jan 10, 2025"
    },
    {
      id: 5,
      title: "Free-Range Poultry Farm",
      type: "Livestock",
      roi: "25%",
      maturity: 80,
      value: "$1,200",
      returns: "$300",
      image: "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "Active",
      liveFeed: true,
      liveStreamUrl: "https://example.com/live-stream-4",
      nextROI: "Feb 5, 2025"
    }
  ];

  const filteredNFTs = activeFilter === 'all' 
    ? userNFTs 
    : userNFTs.filter(nft => nft.type.toLowerCase() === activeFilter);

  const yieldHistory = [
    { month: 'Jan', yield: 180 },
    { month: 'Feb', yield: 220 },
    { month: 'Mar', yield: 190 },
    { month: 'Apr', yield: 280 },
    { month: 'May', yield: 320 },
    { month: 'Jun', yield: 450 }
  ];

  const recentActivity = [
    { action: 'Yield Received', amount: '$180', date: '2 days ago', type: 'yield' },
    { action: 'NFT Purchased', amount: '$1,200', date: '1 week ago', type: 'purchase' },
    { action: 'Carbon Credits', amount: '5.2 tons', date: '2 weeks ago', type: 'carbon' },
    { action: 'Referral Bonus', amount: '50 AV', date: '3 weeks ago', type: 'referral' }
  ];

  // User's certificates linked to NFTs
  const userCertificates = [
    {
      id: 1,
      certId: "RWA-2025-001",
      nftId: "NFT-001",
      batchName: "Organic Wheat Farm #127",
      issueDate: "2025-01-15",
      expiryDate: "2025-05-01",
      status: "Verified",
      ipfsHash: "QmX7Y8Z9...",
      claimed: true,
      pdfUrl: "https://ipfs.io/ipfs/QmX7Y8Z9..."
    },
    {
      id: 2,
      certId: "RWA-2025-002",
      nftId: "NFT-045",
      batchName: "Teak Forest Plantation #89",
      issueDate: "2025-01-12",
      expiryDate: "2029-12-15",
      status: "Verified",
      ipfsHash: "QmA1B2C3...",
      claimed: true,
      pdfUrl: "https://ipfs.io/ipfs/QmA1B2C3..."
    },
    {
      id: 3,
      certId: "RWA-2025-003",
      nftId: "NFT-234",
      batchName: "Carbon Offset Trees #234",
      issueDate: "2025-01-10",
      expiryDate: "N/A",
      status: "Verified",
      ipfsHash: "QmD4E5F6...",
      claimed: true,
      pdfUrl: "https://ipfs.io/ipfs/QmD4E5F6..."
    },
    {
      id: 4,
      certId: "RWA-2025-004",
      nftId: "NFT-456",
      batchName: "Premium Dairy Cattle Farm",
      issueDate: null,
      expiryDate: null,
      status: "Pending",
      ipfsHash: null,
      claimed: false,
      pdfUrl: null
    }
  ];

  const handleClaimCertificate = (certId) => {
    toast.success(`Certificate ${certId} claimed successfully!`);
  };

  const handleDownloadCertificate = (certId, pdfUrl) => {
    window.open(pdfUrl, '_blank');
    toast.success(`Certificate ${certId} downloaded`);
  };

  const upcomingROI = [
    { 
      id: 1, 
      title: "Organic Wheat Farm #127", 
      date: "Jan 15, 2025", 
      amount: "$450", 
      type: "AgriYield",
      reminderSet: true
    },
    { 
      id: 2, 
      title: "Teak Forest Plantation #89", 
      date: "Jan 28, 2025", 
      amount: "$600", 
      type: "AgriFarms",
      reminderSet: false
    },
    { 
      id: 4, 
      title: "Premium Dairy Cattle Farm", 
      date: "Jan 10, 2025", 
      amount: "$396", 
      type: "Livestock",
      reminderSet: true
    },
    { 
      id: 5, 
      title: "Free-Range Poultry Farm", 
      date: "Feb 5, 2025", 
      amount: "$300", 
      type: "Livestock",
      reminderSet: false
    }
  ];

  // FarmLive eligibility check
  const userStakingAmount = 2500; // User's current staking amount
  const requiredStaking = 2000; // Required amount for FarmLive
  const farmLiveEligible = userStakingAmount >= requiredStaking;

  const eligibleFarms = userNFTs.filter(nft => nft.liveFeed && nft.liveStreamUrl);

  const handleBookFarmLive = () => {
    // Redirect to FarmLive booking
    window.location.href = '/farm-live';
  };

  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'agriyield': return <Leaf className="w-5 h-5 text-agri-primary" />;
      case 'agrifarms': return <TreePine className="w-5 h-5 text-agri-primary" />;
      case 'carbonvault': return <Shield className="w-5 h-5 text-agri-primary" />;
      case 'livestock':
        if (type.toLowerCase().includes('cattle') || type.toLowerCase().includes('cow')) {
          return <Cow className="w-5 h-5 text-agri-primary" />;
        } else if (type.toLowerCase().includes('goat')) {
          return <Bone className="w-5 h-5 text-agri-primary" />;
        } else if (type.toLowerCase().includes('poultry')) {
          return <Bird className="w-5 h-5 text-agri-primary" />;
        } else {
          return <Cow className="w-5 h-5 text-agri-primary" />;
        }
      default: return <Leaf className="w-5 h-5 text-agri-primary" />;
    }
  };

  const ProfileEditor = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-agri-card border border-agri-border rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-medium text-agri-text mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-agri-text/70 mb-2">Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-agri-text/70 mb-2">Bio</label>
            <textarea
              value={userProfile.bio}
              onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
              className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none h-24 resize-none"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-agri-primary/20 to-agri-primary/10 rounded-full flex items-center justify-center text-2xl">
                {userProfile.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-light text-agri-text">Welcome back, {userProfile.name}</h1>
                <p className="text-agri-text/70 font-light">{userProfile.bio}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-agri-text/70 hover:text-agri-primary transition-colors"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-agri-card border border-agri-border rounded-lg px-4 py-2">
                <Wallet className="w-4 h-4 text-agri-primary" />
                <span className="text-agri-text font-medium">0x1234...5678</span>
              </div>
              <Link to="/marketplace">
                <button className="px-4 py-2 bg-agri-accent/20 border border-agri-accent/30 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
                  Sell NFTs
                </button>
              </Link>
              <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">Invested</span>
              </div>
              <div className="text-xl font-medium text-agri-text">{userStats.totalInvested}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-agri-accent mr-2" />
                <span className="text-agri-text/70 text-sm">Returns</span>
              </div>
              <div className="text-xl font-medium text-agri-accent">{userStats.totalReturns}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Coins className="w-5 h-5 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">AV Tokens</span>
              </div>
              <div className="text-xl font-medium text-agri-text">{userStats.avTokens}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-agri-accent mr-2" />
                <span className="text-agri-text/70 text-sm">USDT</span>
              </div>
              <div className="text-xl font-medium text-agri-text">{userStats.usdtBalance}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Leaf className="w-5 h-5 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">CO₂ Offset</span>
              </div>
              <div className="text-xl font-medium text-agri-primary">{userStats.carbonOffset}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-agri-accent mr-2" />
                <span className="text-agri-text/70 text-sm">Credits</span>
              </div>
              <div className="text-xl font-medium text-agri-accent">{userStats.carbonCredits}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Shield className="w-5 h-5 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">NFTs</span>
              </div>
              <div className="text-xl font-medium text-agri-text">{userStats.nftsOwned}</div>
            </div>
            <div className="bg-agri-card border border-agri-border rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-agri-accent mr-2" />
                <span className="text-agri-text/70 text-sm">Referrals</span>
              </div>
              <div className="text-xl font-medium text-agri-text">{userStats.referrals}</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { id: 'overview', label: 'Portfolio', icon: BarChart3 },
              { id: 'nfts', label: 'My NFTs', icon: Shield },
              { id: 'yields', label: 'ROI Graph', icon: TrendingUp },
              { id: 'calendar', label: 'ROI Calendar', icon: Calendar },
              { id: 'farmlive', label: 'FarmLive', icon: Camera },
              { id: 'activity', label: 'Activity', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-light transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-agri-primary text-agri-dark'
                    : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">Portfolio Performance</h3>
                  <div className="h-64 bg-agri-secondary/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-agri-primary mx-auto mb-2" />
                      <p className="text-agri-text/70">Portfolio chart visualization</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-agri-text">Recent NFTs</h3>
                    <button className="text-agri-primary hover:text-agri-primary/80 transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {userNFTs.slice(0, 3).map((nft) => (
                      <div key={nft.id} className="flex items-center space-x-4 p-4 bg-agri-secondary/20 rounded-xl">
                        <img src={nft.image} alt={nft.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="text-agri-text font-medium">{nft.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-agri-text/70 text-sm">{nft.type}</span>
                            {nft.nextROI !== 'N/A' && (
                              <span className="text-xs px-2 py-0.5 bg-agri-accent/20 text-agri-accent rounded-full">
                                Next ROI: {nft.nextROI}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-agri-primary font-medium">{nft.roi}</div>
                          <div className="text-agri-text/70 text-sm">{nft.returns}</div>
                        </div>
                        {nft.liveFeed && (
                          <button className="p-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors">
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/agrihub">
                      <button className="w-full py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors">
                        Explore New Projects
                      </button>
                    </Link>
                    <Link to="/staking">
                      <button className="w-full py-3 bg-agri-accent/20 border border-agri-accent text-agri-accent rounded-lg font-medium hover:bg-agri-accent/30 transition-colors">
                        Stake AV Tokens
                      </button>
                    </Link>
                    <Link to="/rwa-cert/my">
                      <button className="w-full py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors">
                        View Certificates
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Upcoming ROI */}
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-agri-text">Upcoming ROI</h3>
                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="text-agri-primary hover:text-agri-primary/80 transition-colors text-sm"
                    >
                      View Calendar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {upcomingROI.slice(0, 3).map((roi) => (
                      <div key={roi.id} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(roi.type)}
                          <div>
                            <div className="text-agri-text text-sm font-medium">{roi.title}</div>
                            <div className="text-agri-text/70 text-xs">{roi.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-agri-primary font-medium">{roi.amount}</div>
                          <button className="p-1 text-agri-text/70 hover:text-agri-primary transition-colors">
                            {roi.reminderSet ? <Bell className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carbon Credits Offset Meter */}
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">Carbon Impact</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-light text-agri-primary mb-2">{userStats.carbonOffset}</div>
                      <div className="text-agri-text/70 text-sm">Total CO₂ Offset</div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-agri-border rounded-full h-4">
                        <div className="bg-gradient-to-r from-agri-primary to-agri-primary/80 h-4 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <div className="flex justify-between text-xs text-agri-text/70 mt-2">
                        <span>0 tons</span>
                        <span>60 tons (Goal)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text/70">Carbon Credits</span>
                      <span className="text-agri-accent font-medium">{userStats.carbonCredits}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NFTs Tab */}
          {activeTab === 'nfts' && (
            <div>
              {/* NFT Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-light transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-agri-primary text-agri-dark'
                        : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNFTs.map((nft) => (
                  <div key={nft.id} className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300">
                    <div className="relative h-48">
                      <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs font-medium">
                          {nft.type}
                        </span>
                        {nft.liveFeed && (
                          <div className="flex items-center space-x-1 bg-red-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-400 text-xs font-medium">LIVE</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-agri-primary font-medium">{nft.roi}</div>
                            <div className="text-agri-text/80 text-sm">{nft.value}</div>
                          </div>
                          {nft.liveFeed && (
                            <button className="w-10 h-10 bg-agri-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-agri-primary/30 transition-colors">
                              <PlayCircle className="w-5 h-5 text-agri-primary" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-agri-text mb-2">{nft.title}</h3>
                      <div className="flex items-center justify-between text-sm text-agri-text/70 mb-2">
                        <span>Returns: {nft.returns}</span>
                        {nft.nextROI !== 'N/A' && (
                          <span className="text-agri-accent">Next ROI: {nft.nextROI}</span>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                          <span>Progress</span>
                          <span>{nft.maturity}%</span>
                        </div>
                        <div className="w-full bg-agri-border rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-agri-primary to-agri-primary/80 h-2 rounded-full"
                            style={{ width: `${nft.maturity}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-agri-accent font-medium">{nft.status}</span>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* FarmLive Tab */}
          {activeTab === 'farmlive' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-light text-agri-text">FarmLive Access</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${farmLiveEligible ? 'bg-agri-primary' : 'bg-agri-accent'}`} />
                  <span className="text-agri-text">
                    {farmLiveEligible ? 'Access Enabled' : 'Staking Required'}
                  </span>
                </div>
              </div>

              {/* Staking Status */}
              <div className={`p-6 rounded-2xl border ${
                farmLiveEligible 
                  ? 'bg-agri-primary/10 border-agri-primary/20' 
                  : 'bg-agri-accent/10 border-agri-accent/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {farmLiveEligible ? (
                      <CheckCircle className="w-6 h-6 text-agri-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-agri-accent" />
                    )}
                    <div>
                      <h4 className={`text-lg font-medium ${farmLiveEligible ? 'text-agri-primary' : 'text-agri-accent'}`}>
                        {farmLiveEligible ? 'FarmLive Access Enabled' : 'Staking Requirement'}
                      </h4>
                      <p className="text-agri-text/70">
                        {farmLiveEligible 
                          ? `You have $${userStakingAmount.toLocaleString()} staked (Required: $${requiredStaking.toLocaleString()})`
                          : `Stake at least $${requiredStaking.toLocaleString()} to unlock FarmLive. Current: $${userStakingAmount.toLocaleString()}`
                        }
                      </p>
                    </div>
                  </div>
                  {!farmLiveEligible && (
                    <Link to="/staking">
                      <button className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors">
                        Stake AV Tokens
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Eligible Farms */}
              {farmLiveEligible && eligibleFarms.length > 0 ? (
                <div>
                  <h4 className="text-xl font-medium text-agri-text mb-4">Your Eligible Farms</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eligibleFarms.map((nft) => (
                      <div key={nft.id} className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
                        <div className="relative h-48">
                          <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-1 bg-red-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-red-400 text-xs font-medium">LIVE</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h5 className="text-lg font-medium text-agri-text mb-2">{nft.title}</h5>
                          <div className="flex items-center text-agri-text/70 text-sm mb-4">
                            <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs mr-2">
                              {nft.type}
                            </span>
                            <span>Maturity: {nft.maturity}%</span>
                          </div>
                          
                          <button
                            onClick={handleBookFarmLive}
                            className="w-full py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
                          >
                            <Camera className="w-4 h-4 mr-2 inline" />
                            Book Live Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : farmLiveEligible ? (
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-agri-text/50 mx-auto mb-4" />
                  <p className="text-agri-text/70">No farms with live feeds in your portfolio</p>
                  <Link to="/agrifarms">
                    <button className="mt-4 px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors">
                      Explore AgriFarms
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="w-16 h-16 text-agri-accent mx-auto mb-4" />
                  <p className="text-agri-text/70 mb-4">Stake AV tokens to unlock FarmLive access</p>
                  <Link to="/staking">
                    <button className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors">
                      Start Staking
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* ROI Yield Graph Tab */}
          {activeTab === 'yields' && (
            <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
              <h3 className="text-xl font-medium text-agri-text mb-6">ROI Yield Graph</h3>
              <div className="h-64 bg-agri-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-agri-primary mx-auto mb-4" />
                  <p className="text-agri-text/70">Yield graph visualization</p>
                  <p className="text-agri-text/50 text-sm mt-2">Showing yield performance over time</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {yieldHistory.map((item, index) => (
                  <div key={index} className="bg-agri-secondary/20 rounded-xl p-4 text-center">
                    <div className="text-agri-text/70 text-sm mb-1">{item.month} 2025</div>
                    <div className="text-agri-primary font-medium text-lg">${item.yield}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROI Calendar Tab */}
          {activeTab === 'calendar' && (
            <ROICalendar />
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
              <h3 className="text-xl font-medium text-agri-text mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-agri-secondary/20 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'yield' ? 'bg-agri-primary/20 text-agri-primary' :
                        activity.type === 'purchase' ? 'bg-agri-accent/20 text-agri-accent' :
                        activity.type === 'carbon' ? 'bg-agri-primary/20 text-agri-primary' :
                        'bg-agri-secondary text-agri-text'
                      }`}>
                        {activity.type === 'yield' && <TrendingUp className="w-5 h-5" />}
                        {activity.type === 'purchase' && <Shield className="w-5 h-5" />}
                        {activity.type === 'carbon' && <Leaf className="w-5 h-5" />}
                        {activity.type === 'referral' && <Users className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-agri-text font-medium">{activity.action}</div>
                        <div className="text-agri-text/70 text-sm">{activity.date}</div>
                      </div>
                    </div>
                    <div className="text-agri-primary font-medium">{activity.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Profile Editor Modal */}
      {isEditing && <ProfileEditor />}
    </div>
  );
};

export default UserDashboard;