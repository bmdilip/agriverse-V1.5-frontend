import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit3, 
  Save, 
  Award, 
  Shield, 
  Star, 
  Crown,
  Gem,
  TreePine,
  Leaf,
  Zap,
  Heart,
  Target,
  Trophy,
  Gift,
  Sparkles,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const NFTNaming = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [customName, setCustomName] = useState('');
  const [isNaming, setIsNaming] = useState(false);

  const userNFTs = [
    {
      id: 1,
      title: "Organic Wheat Farm #127",
      currentName: "Organic Wheat Farm #127",
      type: "AgriYield",
      rarity: "Common",
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
      canRename: true,
      namingCost: 50,
      description: "Premium organic wheat cultivation project"
    },
    {
      id: 2,
      title: "Teak Forest Plantation #89",
      currentName: "Emerald Grove Sanctuary",
      type: "AgriFarms",
      rarity: "Rare",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
      canRename: true,
      namingCost: 100,
      description: "Sustainable teak forest with 20-year growth cycle",
      customNamed: true
    },
    {
      id: 3,
      title: "Carbon Offset Trees #234",
      currentName: "Carbon Offset Trees #234",
      type: "CarbonVault",
      rarity: "Epic",
      image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
      canRename: true,
      namingCost: 150,
      description: "High-impact carbon sequestration project"
    },
    {
      id: 4,
      title: "Premium Rice Cultivation #456",
      currentName: "Golden Harvest Fields",
      type: "AgriYield",
      rarity: "Legendary",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
      canRename: false,
      namingCost: 0,
      description: "Exclusive premium rice cultivation with guaranteed yields",
      customNamed: true,
      locked: true
    }
  ];

  const namePresets = [
    { category: "Nature", names: ["Emerald Grove", "Golden Meadow", "Silver Stream", "Crystal Valley", "Mystic Forest"] },
    { category: "Prosperity", names: ["Fortune Fields", "Wealth Garden", "Prosperity Farm", "Golden Harvest", "Rich Earth"] },
    { category: "Elements", names: ["Terra Verde", "Aqua Fields", "Solar Grove", "Wind Valley", "Earth Haven"] },
    { category: "Mythical", names: ["Phoenix Farm", "Dragon Grove", "Unicorn Fields", "Griffin Valley", "Phoenix Rising"] },
    { category: "Seasonal", names: ["Spring Bloom", "Summer Glow", "Autumn Gold", "Winter Peace", "Eternal Spring"] }
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

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'Common':
        return <Star className="w-4 h-4" />;
      case 'Rare':
        return <Gem className="w-4 h-4" />;
      case 'Epic':
        return <Crown className="w-4 h-4" />;
      case 'Legendary':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const handleNameNFT = (nft) => {
    setSelectedNFT(nft);
    setCustomName(nft.currentName);
    setIsNaming(true);
  };

  const handleSaveName = () => {
    if (!customName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    // Simulate naming process
    toast.success(`NFT renamed to "${customName}" for ${selectedNFT.namingCost} AV tokens!`);
    setIsNaming(false);
    setSelectedNFT(null);
    setCustomName('');
  };

  const handlePresetName = (name) => {
    setCustomName(name);
  };

  const NamingModal = () => {
    if (!selectedNFT) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setIsNaming(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-agri-card border border-agri-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-agri-text">Name Your NFT</h2>
              <button
                onClick={() => setIsNaming(false)}
                className="text-agri-text/70 hover:text-agri-text"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={selectedNFT.image} 
                alt={selectedNFT.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-agri-text">{selectedNFT.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(selectedNFT.rarity)}`}>
                    {getRarityIcon(selectedNFT.rarity)}
                    <span className="ml-1">{selectedNFT.rarity}</span>
                  </span>
                  <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
                    {selectedNFT.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-agri-text/70 mb-3">Custom Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter a custom name for your NFT"
                className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
                maxLength={50}
              />
              <div className="text-right text-xs text-agri-text/50 mt-1">
                {customName.length}/50 characters
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-agri-text/70 mb-3">Preset Names</h4>
              <div className="space-y-4">
                {namePresets.map((category, index) => (
                  <div key={index}>
                    <div className="text-sm text-agri-text/60 mb-2">{category.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {category.names.map((name, nameIndex) => (
                        <button
                          key={nameIndex}
                          onClick={() => handlePresetName(name)}
                          className="px-3 py-1 bg-agri-secondary/30 text-agri-text text-sm rounded-lg hover:bg-agri-primary/20 hover:text-agri-primary transition-all duration-200"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-agri-accent" />
                  <span className="text-agri-text">Naming Cost</span>
                </div>
                <span className="text-agri-accent font-medium">{selectedNFT.namingCost} AV Tokens</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleSaveName}
                disabled={!customName.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save Name ({selectedNFT.namingCost} AV)
              </motion.button>
              <button
                onClick={() => setIsNaming(false)}
                className="px-6 py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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
            <span className="text-agri-primary">NFT</span> Naming
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Personalize your agricultural NFTs with custom names. Make your investments truly yours 
            and stand out in the community.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Shield className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">8</div>
            <div className="text-agri-text/70 text-sm">Total NFTs</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Edit3 className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">2</div>
            <div className="text-agri-text/70 text-sm">Custom Named</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Zap className="w-8 h-8 text-agri-primary mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">1,247</div>
            <div className="text-agri-text/70 text-sm">AV Tokens</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-agri-accent mx-auto mb-3" />
            <div className="text-2xl font-light text-agri-text mb-1">6</div>
            <div className="text-agri-text/70 text-sm">Available to Name</div>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {userNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300"
            >
              <div className="relative h-48">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(nft.rarity)}`}>
                    {getRarityIcon(nft.rarity)}
                    <span className="ml-1">{nft.rarity}</span>
                  </span>
                  {nft.customNamed && (
                    <div className="flex items-center space-x-1 bg-agri-primary/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Sparkles className="w-3 h-3 text-agri-primary" />
                      <span className="text-agri-primary text-xs font-medium">Named</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-agri-text font-medium text-lg mb-1">
                    {nft.currentName}
                  </div>
                  <div className="text-agri-text/70 text-sm">{nft.type}</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-agri-text/70 font-light mb-4 text-sm">
                  {nft.description}
                </p>
                
                {nft.canRename ? (
                  <motion.button
                    onClick={() => handleNameNFT(nft)}
                    disabled={nft.locked}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      nft.locked 
                        ? 'bg-agri-secondary/30 text-agri-text/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark hover:shadow-lg hover:shadow-agri-primary/25'
                    }`}
                    whileHover={!nft.locked ? { scale: 1.02 } : {}}
                    whileTap={!nft.locked ? { scale: 0.98 } : {}}
                  >
                    {nft.locked ? (
                      <>
                        <Shield className="w-4 h-4 mr-2 inline" />
                        Locked NFT
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2 inline" />
                        {nft.customNamed ? 'Rename' : 'Name'} NFT ({nft.namingCost} AV)
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="w-full py-3 bg-agri-secondary/20 text-agri-text/70 rounded-lg text-center font-medium">
                    <Check className="w-4 h-4 mr-2 inline" />
                    Naming Complete
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Edit3 className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Personalization</h3>
              <p className="text-agri-text/70 font-light">
                Give your NFTs unique names that reflect your personality and investment strategy.
              </p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Community Recognition</h3>
              <p className="text-agri-text/70 font-light">
                Stand out in leaderboards and community discussions with memorable NFT names.
              </p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">AV Token Utility</h3>
              <p className="text-agri-text/70 font-light">
                Use your earned AV tokens to unlock naming rights and customize your portfolio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Naming Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-medium text-agri-text mb-4">Naming Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-agri-text/70">
            <div>
              <h4 className="text-agri-text font-medium mb-2">Allowed:</h4>
              <ul className="space-y-1">
                <li>• Letters, numbers, and spaces</li>
                <li>• Maximum 50 characters</li>
                <li>• Creative and unique names</li>
                <li>• Multiple languages supported</li>
              </ul>
            </div>
            <div>
              <h4 className="text-agri-text font-medium mb-2">Not Allowed:</h4>
              <ul className="space-y-1">
                <li>• Offensive or inappropriate content</li>
                <li>• Impersonation of others</li>
                <li>• Spam or promotional content</li>
                <li>• Special characters (!@#$%)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Naming Modal */}
      {isNaming && <NamingModal />}
    </div>
  );
};

export default NFTNaming;