import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Award, 
  Shield, 
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Leaf,
  TreePine,
  Building,
  Zap,
  CheckCircle,
  AlertTriangle,
  ShoppingCart,
  Tag,
  Calendar,
  Wallet,
  ExternalLink,
  Sliders,
  X,
  ChevronDown,
  Cog as Cow
} from 'lucide-react';

const NFTMarketplace = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    roiMin: '',
    roiMax: '',
    certifiedOnly: false,
    highlightedOnly: false,
    timeToMaturity: 'all'
  });

  const filterOptions = [
    { id: 'all', label: 'All Assets', count: 247 },
    { id: 'agriyield', label: 'AgriYield', count: 89 },
    { id: 'agrifarms', label: 'AgriFarms', count: 67 },
    { id: 'carbonvault', label: 'CarbonVault', count: 34 },
    { id: 'livestock', label: 'Livestock', count: 57 }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Recently Listed' },
    { id: 'roi-high', label: 'Highest ROI' },
    { id: 'roi-low', label: 'Lowest ROI' },
    { id: 'maturity-soon', label: 'Nearest Payout' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' }
  ];

  const resaleNFTs = [
    {
      id: 1,
      name: "Organic Wheat Farm #127",
      assetType: "AgriYield",
      originalPrice: "2,500 AV",
      resalePrice: "2,800 AV",
      usdPrice: "$2,800",
      roi: "18%",
      timeToMaturity: "45 days",
      maturityDate: "2025-03-15",
      seller: "0x1234...5678",
      sellerName: "EcoFarmer.eth",
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
      rarity: "Common",
      rwaCert: true,
      featured: false,
      likes: 24,
      views: 156,
      listingDate: "2025-01-10",
      markup: "12%",
      description: "Premium organic wheat cultivation with certified practices. Seller needs quick liquidity.",
      projectType: "AgriYield",
      maturityProgress: 75,
      verified: true
    },
    {
      id: 2,
      name: "Teak Forest Plantation #89",
      assetType: "AgriFarms",
      originalPrice: "5,000 AV",
      resalePrice: "5,500 AV",
      usdPrice: "$5,500",
      roi: "12%",
      timeToMaturity: "1.5 years",
      maturityDate: "2026-07-20",
      seller: "0x9876...4321",
      sellerName: "TreeInvestor",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
      rarity: "Rare",
      rwaCert: true,
      featured: true,
      likes: 67,
      views: 342,
      listingDate: "2025-01-08",
      markup: "10%",
      description: "Sustainable teak plantation with excellent growth potential. Early exit opportunity.",
      projectType: "AgriFarms",
      maturityProgress: 40,
      verified: true
    },
    {
      id: 3,
      name: "Carbon Offset Trees #234",
      assetType: "CarbonVault",
      originalPrice: "750 AV",
      resalePrice: "825 AV",
      usdPrice: "$825",
      roi: "Environmental",
      timeToMaturity: "Permanent",
      maturityDate: "Ongoing",
      seller: "0x5555...7777",
      sellerName: "CarbonHero",
      image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
      rarity: "Epic",
      rwaCert: true,
      featured: false,
      likes: 89,
      views: 234,
      listingDate: "2025-01-12",
      markup: "10%",
      description: "High-impact carbon sequestration project with verified offset credits.",
      projectType: "CarbonVault",
      maturityProgress: 100,
      verified: true
    },
    {
      id: 4,
      name: "Premium Dairy Cattle #456",
      assetType: "Livestock",
      originalPrice: "1,800 AV",
      resalePrice: "2,070 AV",
      usdPrice: "$2,070",
      roi: "22%",
      timeToMaturity: "30 days",
      maturityDate: "2025-02-15",
      seller: "0x8888...9999",
      sellerName: "LivestockPro",
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=400",
      rarity: "Rare",
      rwaCert: true,
      featured: false,
      likes: 45,
      views: 189,
      listingDate: "2025-01-14",
      markup: "15%",
      description: "Premium dairy cattle farm with excellent milk production records.",
      projectType: "Livestock",
      maturityProgress: 65,
      verified: true
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'Rare':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Epic':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Legendary':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-agri-primary bg-agri-primary/10 border-agri-primary/20';
    }
  };

  const getAssetTypeColor = (type) => {
    switch (type) {
      case 'AgriYield':
        return 'text-agri-primary bg-agri-primary/10';
      case 'AgriFarms':
        return 'text-agri-accent bg-agri-accent/10';
      case 'CarbonVault':
        return 'text-green-400 bg-green-400/10';
      case 'Livestock':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-agri-text bg-agri-secondary/20';
    }
  };

  const getAssetTypeIcon = (type) => {
    switch (type) {
      case 'AgriYield':
        return <Leaf className="w-4 h-4" />;
      case 'AgriFarms':
        return <TreePine className="w-4 h-4" />;
      case 'CarbonVault':
        return <Shield className="w-4 h-4" />;
      case 'Livestock':
        return <Cow className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const filteredNFTs = resaleNFTs.filter(nft => {
    // Filter by asset type
    if (activeFilter !== 'all' && nft.assetType.toLowerCase() !== activeFilter) {
      return false;
    }
    
    // Filter by price range
    const price = parseInt(nft.resalePrice.replace(/[^0-9]/g, ''));
    if (filters.priceMin && price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && price > parseInt(filters.priceMax)) return false;
    
    // Filter by ROI range
    if (nft.roi !== 'Environmental') {
      const roi = parseInt(nft.roi.replace('%', ''));
      if (filters.roiMin && roi < parseInt(filters.roiMin)) return false;
      if (filters.roiMax && roi > parseInt(filters.roiMax)) return false;
    }
    
    // Filter by certification
    if (filters.certifiedOnly && !nft.rwaCert) return false;
    
    // Filter by highlighted
    if (filters.highlightedOnly && !nft.featured) return false;
    
    return true;
  });

  const FilterSidebar = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-agri-card border border-agri-border rounded-2xl p-6 w-full lg:w-80"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-light text-agri-text">Advanced Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden text-agri-text/70 hover:text-agri-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-agri-text/70 mb-2">Price Range (AV)</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
              className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
            <span className="text-agri-text/70">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
              className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
        </div>
        
        {/* ROI Range */}
        <div>
          <label className="block text-agri-text/70 mb-2">ROI Range (%)</label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.roiMin}
              onChange={(e) => setFilters({...filters, roiMin: e.target.value})}
              className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
            <span className="text-agri-text/70">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.roiMax}
              onChange={(e) => setFilters({...filters, roiMax: e.target.value})}
              className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
        </div>
        
        {/* Time to Maturity */}
        <div>
          <label className="block text-agri-text/70 mb-2">Time to Maturity</label>
          <select
            value={filters.timeToMaturity}
            onChange={(e) => setFilters({...filters, timeToMaturity: e.target.value})}
            className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Timeframes</option>
            <option value="30">Less than 30 days</option>
            <option value="90">30-90 days</option>
            <option value="180">90-180 days</option>
            <option value="365">6 months - 1 year</option>
            <option value="999">More than 1 year</option>
          </select>
        </div>
        
        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-agri-text">RWA Certified Only</label>
            <button 
              onClick={() => setFilters({...filters, certifiedOnly: !filters.certifiedOnly})}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                filters.certifiedOnly ? 'bg-agri-primary' : 'bg-agri-secondary'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                filters.certifiedOnly ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-agri-text">Featured Only</label>
            <button 
              onClick={() => setFilters({...filters, highlightedOnly: !filters.highlightedOnly})}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                filters.highlightedOnly ? 'bg-agri-primary' : 'bg-agri-secondary'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                filters.highlightedOnly ? 'right-0.5 translate-x-0' : 'left-0.5 -translate-x-0'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Reset Filters */}
        <button
          onClick={() => setFilters({
            priceMin: '',
            priceMax: '',
            roiMin: '',
            roiMax: '',
            certifiedOnly: false,
            highlightedOnly: false,
            timeToMaturity: 'all'
          })}
          className="w-full py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </motion.div>
  );

  const NFTModal = ({ nft, onClose }) => {
    if (!nft) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-agri-card border border-agri-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-light text-agri-text mb-2">{nft.name}</h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAssetTypeColor(nft.assetType)}`}>
                    {nft.assetType.charAt(0).toUpperCase() + nft.assetType.slice(1)}
                  </span>
                  {nft.rwaCert && (
                    <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs font-medium">
                      RWAcert Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-agri-text/70 hover:text-agri-text"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-medium text-agri-text mb-3">Seller's Note</h3>
                  <p className="text-agri-text/70 font-light leading-relaxed">{nft.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-agri-secondary/20 rounded-lg p-3">
                    <div className="text-agri-text/70 text-sm">Seller</div>
                    <div className="text-agri-text font-mono">{nft.seller}</div>
                    <div className="text-agri-primary text-sm">{nft.sellerName}</div>
                  </div>
                  <div className="bg-agri-secondary/20 rounded-lg p-3">
                    <div className="text-agri-text/70 text-sm">Listed</div>
                    <div className="text-agri-text">{nft.listingDate}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-3xl font-light text-agri-primary mb-2">{nft.resalePrice}</div>
                      <div className="text-agri-text/70">{nft.usdPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-agri-text/70 text-sm">Original Price</div>
                      <div className="text-agri-text">{nft.originalPrice}</div>
                      <div className="text-agri-accent text-sm">+{nft.markup} markup</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-agri-text/70 text-sm">Expected ROI</div>
                      <div className="text-agri-accent font-medium">{nft.roi}</div>
                    </div>
                    <div>
                      <div className="text-agri-text/70 text-sm">Time to Maturity</div>
                      <div className="text-agri-text">{nft.timeToMaturity}</div>
                    </div>
                  </div>

                  {nft.maturityProgress < 100 && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Maturity Progress</span>
                        <span>{nft.maturityProgress}%</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${nft.maturityProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2 inline" />
                    Buy Now for {nft.resalePrice}
                  </motion.button>
                </div>

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Asset Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Project Type</span>
                      <span className="text-agri-text">{nft.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Maturity Date</span>
                      <span className="text-agri-text">{nft.maturityDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Views</span>
                      <span className="text-agri-text">{nft.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Likes</span>
                      <span className="text-agri-text">{nft.likes}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Like ({nft.likes})</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span>View Original</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
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
            <span className="text-agri-primary">NFT</span> Marketplace
          </h1>
          <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Tag className="w-6 h-6 text-agri-primary" />
              <h2 className="text-xl font-medium text-agri-text">Secondary Marketplace</h2>
            </div>
            <p className="text-agri-text/80 font-light leading-relaxed">
              This is a secondary marketplace to resell or rebuy Agri NFTs before the maturity period. 
              Only verified assets can be listed here. Perfect for early exits or secondary entries.
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
              <input
                type="text"
                placeholder="Search by asset name, seller, or project type..."
                className="w-full pl-10 pr-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text hover:border-agri-primary hover:text-agri-primary transition-colors"
            >
              <Sliders className="w-5 h-5" />
              <span>Filters</span>
              {(filters.priceMin || filters.priceMax || filters.roiMin || filters.roiMax || 
                filters.certifiedOnly || filters.highlightedOnly || filters.timeToMaturity !== 'all') && (
                <span className="w-5 h-5 bg-agri-primary text-agri-dark rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-agri-primary text-agri-dark' : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-agri-primary text-agri-dark' : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-light transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-agri-primary text-agri-dark'
                    : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
                }`}
              >
                {filter.id !== 'all' && getAssetTypeIcon(filter.id)}
                <span>{filter.label}</span>
                <span className="text-xs opacity-70">({filter.count})</span>
              </button>
            ))}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <FilterSidebar />
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="text-agri-text/70">
            Showing <span className="text-agri-primary font-light">{filteredNFTs.length}</span> resale listings
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-agri-text/70">Total Volume:</span>
            <span className="text-agri-primary font-medium">$847,250</span>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className={`bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 h-48' : 'h-48'}`}>
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(nft.rarity)}`}>
                        {nft.rarity}
                      </span>
                      {nft.featured && (
                        <span className="px-3 py-1 bg-agri-accent/20 text-agri-accent rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    {nft.rwaCert && (
                      <div className="flex items-center space-x-1 bg-agri-primary/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Shield className="w-3 h-3 text-agri-primary" />
                        <span className="text-agri-primary text-xs font-medium">RWA</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-agri-primary font-medium text-lg">{nft.resalePrice}</div>
                        <div className="text-agri-text/80 text-sm">+{nft.markup} markup</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-agri-text/70 text-xs">
                          <Heart className="w-3 h-3" />
                          <span>{nft.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-agri-text/70 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{nft.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-medium text-agri-text">{nft.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getAssetTypeColor(nft.assetType)}`}>
                      {getAssetTypeIcon(nft.assetType)}
                      <span>{nft.assetType}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-agri-text/70 mb-4">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4" />
                      <span>{nft.sellerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{nft.timeToMaturity}</span>
                    </div>
                  </div>
                  
                  {nft.maturityProgress < 100 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Maturity Progress</span>
                        <span>{nft.maturityProgress}%</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${nft.maturityProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-right">
                      <div className="text-agri-primary font-medium text-lg">{nft.roi}</div>
                      <div className="text-agri-text/70 text-sm">Expected ROI</div>
                    </div>
                    <motion.button
                      className="px-6 py-2 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle buy now
                      }}
                    >
                      Buy Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-agri-secondary/50 text-agri-text rounded-full font-light text-lg hover:bg-agri-secondary transition-all duration-300">
            Load More Listings
          </button>
        </motion.div>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Active Listings</h3>
              <div className="text-3xl font-light text-agri-primary mb-2">247</div>
              <p className="text-agri-text/70 font-light">
                NFTs available for resale
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Total Volume</h3>
              <div className="text-3xl font-light text-agri-accent mb-2">$2.4M</div>
              <p className="text-agri-text/70 font-light">
                All-time trading volume
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Active Traders</h3>
              <div className="text-3xl font-light text-agri-primary mb-2">1,247</div>
              <p className="text-agri-text/70 font-light">
                Users buying and selling
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Avg. Markup</h3>
              <div className="text-3xl font-light text-agri-accent mb-2">12.5%</div>
              <p className="text-agri-text/70 font-light">
                Average resale premium
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* NFT Modal */}
      {selectedNFT && (
        <NFTModal 
          nft={selectedNFT} 
          onClose={() => setSelectedNFT(null)} 
        />
      )}
    </div>
  );
};

export default NFTMarketplace;