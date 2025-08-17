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
import { assetsApi } from '../api/assets';
import { useQuery } from '@tanstack/react-query';
import { FilterBar } from '../components/ui/FilterBar';
import { DataTable } from '../components/ui/DataTable';

const NFTMarketplace = () => {
  const [filters, setFilters] = useState({
    assetType: '',
    priceMin: '',
    priceMax: '',
    status: '',
    certified: false,
    search: '',
    sortBy: 'newest'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch marketplace data
  const { data: marketplaceData, isLoading, error } = useQuery({
    queryKey: ['marketplace', filters, page],
    queryFn: async () => {
      try {
        return await assetsApi.getMarketplace({
          page,
          limit: 12,
          assetType: filters.assetType || undefined,
          priceMin: filters.priceMin ? parseFloat(filters.priceMin) : undefined,
          priceMax: filters.priceMax ? parseFloat(filters.priceMax) : undefined,
          status: filters.status || undefined,
          certified: filters.certified || undefined,
          search: filters.search || undefined,
          sortBy: filters.sortBy
        });
      } catch (error) {
        console.error('Marketplace API error:', error);
        // Return empty data instead of throwing
        return {
          assets: [],
          total: 0,
          page: 1,
          totalPages: 1
        };
      }
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false
  });

  // Add sample NFTs for demonstration
  const sampleNFTs = [
    {
      id: "sample-1",
      name: "Organic Wheat Farm #127",
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800",
      assetType: "AgriYield",
      price: "500 AV",
      roi: "18%",
      maturityPeriod: 120,
      status: "Live",
      owner: "0x1234...5678",
      seller: "0x1234...5678",
      sellerName: "GreenFarms Ltd",
      resalePrice: "560 AV",
      originalPrice: "500 AV",
      usdPrice: "$560",
      markup: "12%",
      timeToMaturity: "45 days",
      maturityProgress: 75,
      maturityDate: "2025-05-01",
      projectType: "Crop Cultivation",
      views: 234,
      likes: 45,
      listingDate: "2025-01-10",
      certified: true,
      rwaCert: true,
      featured: true,
      rarity: "Common",
      supply: 100,
      minted: 75
    },
    {
      id: "sample-2",
      name: "Teak Forest Plantation #89",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800",
      assetType: "AgriFarms",
      price: "2000 AV",
      roi: "12%",
      maturityPeriod: 1825,
      status: "Live",
      owner: "0x9876...4321",
      seller: "0x9876...4321",
      sellerName: "EcoForest Co",
      resalePrice: "2200 AV",
      originalPrice: "2000 AV",
      usdPrice: "$2,200",
      markup: "10%",
      timeToMaturity: "4.5 years",
      maturityProgress: 40,
      maturityDate: "2029-12-15",
      projectType: "Tree Plantation",
      views: 156,
      likes: 28,
      listingDate: "2024-12-15",
      certified: true,
      rwaCert: true,
      featured: false,
      rarity: "Rare",
      supply: 50,
      minted: 32
    },
    {
      id: "sample-3",
      name: "Premium Dairy Cattle Farm",
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=800",
      assetType: "Livestock",
      price: "800 AV",
      roi: "22%",
      maturityPeriod: 180,
      status: "Live",
      owner: "0x5555...7777",
      seller: "0x5555...7777",
      sellerName: "DairyTech Ltd",
      resalePrice: "920 AV",
      originalPrice: "800 AV",
      usdPrice: "$920",
      markup: "15%",
      timeToMaturity: "120 days",
      maturityProgress: 65,
      maturityDate: "2025-06-15",
      projectType: "Livestock",
      views: 189,
      likes: 67,
      listingDate: "2025-01-05",
      certified: true,
      rwaCert: true,
      featured: true,
      rarity: "Epic",
      supply: 60,
      minted: 45
    }
  ];

  // Use sample data if API fails or returns empty
  const nfts = marketplaceData?.assets?.length > 0 ? marketplaceData.assets : sampleNFTs;
  const totalCount = marketplaceData?.total || sampleNFTs.length;
  const totalPages = marketplaceData?.totalPages || 1;

  // Filter sample NFTs based on current filters
  const filteredSampleNFTs = sampleNFTs.filter(nft => {
    if (filters.assetType && nft.assetType !== filters.assetType) return false;
    if (filters.search && !nft.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.status && nft.status !== filters.status) return false;
    if (filters.certified && !nft.certified) return false;
    return true;
  });

  const displayNFTs = marketplaceData?.assets?.length > 0 ? marketplaceData.assets : filteredSampleNFTs;

  const filterOptions = [
    enabled: true,
    retry: false
  });

  const filterOptions = [
    {
      key: 'assetType',
      label: 'Asset Type',
      type: 'select' as const,
      options: [
        { value: 'AgriYield', label: 'AgriYield' },
        { value: 'AgriFarms', label: 'AgriFarms' },
        { value: 'CarbonVault', label: 'CarbonVault' },
        { value: 'Livestock', label: 'Livestock' }
      ]
    },
    {
      key: 'price',
      label: 'Price Range (AV)',
      type: 'range' as const,
      min: 0,
      max: 10000,
      step: 100
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Live', label: 'For Sale' },
        { value: 'Upcoming', label: 'Upcoming' },
        { value: 'Ended', label: 'Sold Out' }
      ]
    },
    {
      key: 'certified',
      label: 'RWA Certified Only',
      type: 'toggle' as const
    },
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const
    }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Recently Listed' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' }
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      assetType: '',
      priceMin: '',
      priceMax: '',
      status: '',
      certified: false,
      search: '',
      sortBy: 'newest'
    });
    setPage(1);
  };

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
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by asset name, seller, or project type..."
                className="w-full pl-10 pr-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
              />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
              {(filters.priceMin || filters.priceMax || filters.assetType || 
                filters.status || filters.certified) && (
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

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <FilterBar
                filters={filterOptions}
                values={filters}
                onChange={handleFilterChange}
                onReset={resetFilters}
                onClose={() => setShowFilters(false)}
              />
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
            Showing <span className="text-agri-primary font-light">{nfts.length}</span> of {totalCount} listings
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-agri-text/70">Total Volume:</span>
            <span className="text-agri-primary font-medium">$847,250</span>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
                <div className="h-48 bg-agri-secondary/20 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-agri-secondary/20 rounded animate-pulse"></div>
                  <div className="h-3 bg-agri-secondary/20 rounded animate-pulse w-3/4"></div>
                  <div className="h-8 bg-agri-secondary/20 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NFT Grid */}
        {!isLoading && displayNFTs.length > 0 && (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {displayNFTs.map((nft, index) => (
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAssetTypeColor(nft.assetType)}`}>
                        {nft.assetType}
                      </span>
                      {nft.featured && (
                        <span className="px-3 py-1 bg-agri-accent/20 text-agri-accent rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    {nft.certified && (
                      <div className="flex items-center space-x-1 bg-agri-primary/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Shield className="w-3 h-3 text-agri-primary" />
                        <span className="text-agri-primary text-xs font-medium">RWA</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-agri-primary font-medium text-lg">{nft.price} AV</div>
                        <div className="text-agri-text/80 text-sm">{nft.roi}% ROI</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-agri-text/70 text-xs">
                          <Heart className="w-3 h-3" />
                          <span>{nft.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-agri-text/70 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{nft.views || 0}</span>
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
                      <span>{nft.owner}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{nft.maturityPeriod} days</span>
                    </div>
                  </div>
                  
                  {nft.status === 'Live' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Minted</span>
                        <span>{nft.minted}/{nft.supply}</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${(nft.minted / nft.supply) * 100}%` }}
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
        )}

        {/* Empty State */}
        {!isLoading && displayNFTs.length === 0 && (
          <div className="bg-agri-card border border-agri-border rounded-2xl p-12 text-center">
            <Tag className="w-16 h-16 text-agri-text/30 mx-auto mb-4" />
            <h3 className="text-xl font-light text-agri-text mb-2">No NFTs Found</h3>
            <p className="text-agri-text/70 mb-6">
              No NFTs match your current filter criteria. Try adjusting your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        page === pageNum
                          ? 'bg-agri-primary text-agri-dark'
                          : 'bg-agri-secondary/50 text-agri-text hover:bg-agri-secondary'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

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
              <div className="text-3xl font-light text-agri-primary mb-2">{displayNFTs.length}</div>
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