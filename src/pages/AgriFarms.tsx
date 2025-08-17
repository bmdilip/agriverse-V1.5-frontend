import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Users, 
  Lock,
  Camera,
  Eye,
  Leaf,
  Award,
  DollarSign,
  Calendar,
  PlayCircle,
  Shield,
  Filter,
  Grid,
  List
} from 'lucide-react';

const AgriFarms = () => {
  const [activeTab, setActiveTab] = useState('trees');
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects', icon: Filter },
    { id: 'trees', label: 'Tree Farms', icon: TreePine },
    { id: 'land', label: 'Land NFTs', icon: MapPin },
    { id: 'live', label: 'Live Feed', icon: Camera },
    { id: 'stakable', label: 'Stakable', icon: Lock }
  ];

  const farmProjects = [
    {
      id: 1,
      title: "Teak Forest Plantation",
      location: "Kerala, India",
      type: "Hardwood Trees",
      roi: "12%",
      lockPeriod: "5 years",
      treeAge: "2 years",
      maturity: 40,
      minInvestment: "$1,000",
      totalRaised: "$120,000",
      target: "$200,000",
      investors: 45,
      stakingEligible: true,
      liveFeed: true,
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Low",
      description: "Premium teak plantation with sustainable forest management practices. Expected harvest in 18-20 years with intermediate thinning benefits.",
      features: ["Sustainable Harvesting", "Carbon Credits", "Live Monitoring", "Insurance Coverage"],
      certifications: ["FSC Certified", "RWAcert Verified", "Carbon Verified"],
      liveStreamUrl: "https://example.com/live-stream-1"
    },
    {
      id: 2,
      title: "Organic Mango Orchard",
      location: "Maharashtra, India",
      type: "Fruit Trees",
      roi: "15%",
      lockPeriod: "3 years",
      treeAge: "5 years",
      maturity: 65,
      minInvestment: "$750",
      totalRaised: "$85,000",
      target: "$150,000",
      investors: 32,
      stakingEligible: true,
      liveFeed: true,
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Medium",
      description: "Organic mango orchard with premium Alphonso variety. Annual fruit yields plus long-term tree value appreciation.",
      features: ["Organic Certified", "Annual Yields", "Export Quality", "Disease Management"],
      certifications: ["Organic Certified", "Export License", "RWAcert Verified"],
      liveStreamUrl: "https://example.com/live-stream-2"
    },
    {
      id: 3,
      title: "Bamboo Plantation",
      location: "Assam, India",
      type: "Bamboo",
      roi: "10%",
      lockPeriod: "4 years",
      treeAge: "1 year",
      maturity: 25,
      minInvestment: "$500",
      totalRaised: "$45,000",
      target: "$100,000",
      investors: 28,
      stakingEligible: false,
      liveFeed: false,
      image: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Low",
      description: "Fast-growing bamboo plantation for sustainable timber and carbon sequestration. Harvest cycles every 3-4 years.",
      features: ["Fast Growing", "Carbon Sequestration", "Multiple Harvests", "Eco-Friendly"],
      certifications: ["Carbon Verified", "Sustainable Certified"],
      liveStreamUrl: null
    }
  ];

  const landProjects = [
    {
      id: 4,
      title: "Agricultural Land NFT",
      location: "Uttar Pradesh, India",
      type: "Farmland",
      roi: "8%",
      lockPeriod: "2 years",
      size: "5 acres",
      maturity: 100,
      minInvestment: "$2,000",
      totalRaised: "$180,000",
      target: "$250,000",
      investors: 25,
      stakingEligible: true,
      liveFeed: true,
      image: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Low",
      description: "Prime agricultural land with water rights and irrigation infrastructure. Ideal for crop rotation and sustainable farming.",
      features: ["Water Rights", "Irrigation System", "Fertile Soil", "Road Access"],
      certifications: ["Land Title Verified", "RWAcert Certified"],
      liveStreamUrl: "https://example.com/live-stream-3"
    }
  ];

  const currentProjects = activeTab === 'trees' ? farmProjects : landProjects;
  
  const filteredProjects = currentProjects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'trees') return project.type.includes('Trees') || project.type === 'Bamboo';
    if (activeFilter === 'land') return project.type === 'Farmland';
    if (activeFilter === 'live') return project.liveFeed;
    if (activeFilter === 'stakable') return project.stakingEligible;
    return true;
  });

  const FarmModal = ({ farm, onClose }) => {
    if (!farm) return null;

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
          className="bg-agri-card border border-agri-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-light text-agri-text mb-2">{farm.title}</h2>
                <div className="flex items-center space-x-4 text-agri-text/70">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {farm.location}
                  </div>
                  <div className="flex items-center">
                    <TreePine className="w-4 h-4 mr-1" />
                    {farm.type}
                  </div>
                  {farm.stakingEligible && (
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-1 text-agri-accent" />
                      <span className="text-agri-accent">Staking Eligible</span>
                    </div>
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
                <div className="relative mb-6">
                  <img 
                    src={farm.image} 
                    alt={farm.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  {farm.liveFeed && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-sm font-medium">LIVE</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Farm Camera Feed */}
                {farm.liveFeed && farm.liveStreamUrl && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-agri-text mb-3">Live Farm Camera Feed</h3>
                    <div className="bg-agri-secondary/20 border border-agri-border rounded-xl overflow-hidden">
                      <iframe
                        src={farm.liveStreamUrl}
                        className="w-full h-64"
                        frameBorder="0"
                        allowFullScreen
                        title={`Live feed for ${farm.title}`}
                      />
                      <div className="p-3 bg-agri-dark/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-agri-text text-sm">Live Stream Active</span>
                          </div>
                          <button className="text-agri-primary hover:text-agri-primary/80 text-sm">
                            View Fullscreen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-medium text-agri-text mb-3">About This Project</h3>
                  <p className="text-agri-text/70 font-light leading-relaxed">{farm.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-agri-text mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {farm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-agri-primary" />
                        <span className="text-agri-text/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-agri-text mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {farm.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-agri-primary/10 border border-agri-primary/20 rounded-full text-agri-primary text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-agri-primary mr-2" />
                      <span className="text-agri-text/70 text-sm">Expected ROI</span>
                    </div>
                    <div className="text-2xl font-medium text-agri-primary">{farm.roi}</div>
                  </div>
                  <div className="bg-agri-accent/10 border border-agri-accent/20 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Lock className="w-5 h-5 text-agri-accent mr-2" />
                      <span className="text-agri-text/70 text-sm">Lock Period</span>
                    </div>
                    <div className="text-2xl font-medium text-agri-accent">{farm.lockPeriod}</div>
                  </div>
                </div>

                {farm.treeAge && (
                  <div className="bg-agri-secondary/20 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-agri-text mb-4">Growth Progress</h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Tree Age: {farm.treeAge}</span>
                        <span>{farm.maturity}% Mature</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-3 rounded-full"
                          style={{ width: `${farm.maturity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Investment Progress</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                      <span>Raised: {farm.totalRaised}</span>
                      <span>Target: {farm.target}</span>
                    </div>
                    <div className="w-full bg-agri-border rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                        style={{ width: `${(parseInt(farm.totalRaised.replace('$', '').replace(',', '')) / parseInt(farm.target.replace('$', '').replace(',', ''))) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-agri-text/70">
                    <span>{farm.investors} investors</span>
                    <span>Min: {farm.minInvestment}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    className="w-full px-6 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-xl font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Invest in Farm NFT
                  </motion.button>
                  
                  {farm.stakingEligible && (
                    <motion.button
                      className="w-full px-6 py-3 bg-agri-accent/20 border border-agri-accent text-agri-accent rounded-xl font-medium hover:bg-agri-accent/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lock className="w-4 h-4 mr-2 inline" />
                      Stake NFT for Rewards
                    </motion.button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <Camera className="w-4 h-4 mr-1" />
                      Live Feed
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <Shield className="w-4 h-4 mr-1" />
                      Verify
                    </button>
                  </div>
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
            <span className="text-agri-primary">AgriFarms</span> Investment
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Long-term tree and land NFTs with sustainable growth. Invest in verified farms 
            with live monitoring and staking rewards.
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-agri-primary text-agri-dark'
                  : 'bg-agri-card border border-agri-border text-agri-text hover:border-agri-primary'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <span className="text-agri-text/70">
              Showing {filteredProjects.length} of {currentProjects.length} projects
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-agri-primary text-agri-dark' : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-agri-primary text-agri-dark' : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
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
              onClick={() => setActiveTab('trees')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'trees'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <TreePine className="w-5 h-5 mr-2 inline" />
              Tree Farms
            </button>
            <button
              onClick={() => setActiveTab('land')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'land'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <MapPin className="w-5 h-5 mr-2 inline" />
              Land NFTs
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedFarm(project)}
            >
              <div className={`bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 h-48' : 'h-48'}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.riskLevel === 'Low' 
                          ? 'bg-agri-primary/20 text-agri-primary' 
                          : 'bg-agri-accent/20 text-agri-accent'
                      }`}>
                        {project.riskLevel} Risk
                      </span>
                      {project.stakingEligible && (
                        <span className="px-3 py-1 bg-agri-accent/20 text-agri-accent rounded-full text-xs font-medium">
                          Stakable
                        </span>
                      )}
                    </div>
                    {project.liveFeed && (
                      <div className="flex items-center space-x-1 bg-red-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-xs font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-agri-primary font-medium text-xl">{project.roi}</div>
                        <div className="text-agri-text/80 text-sm font-light">{project.lockPeriod}</div>
                      </div>
                      <div className="w-10 h-10 bg-agri-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-agri-primary/30 transition-colors">
                        <Eye className="w-5 h-5 text-agri-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-medium text-agri-text mb-2">{project.title}</h3>
                  <div className="flex items-center text-agri-text/70 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                    <span className="mx-2">•</span>
                    <TreePine className="w-4 h-4 mr-1" />
                    {project.type}
                  </div>
                  
                  {project.treeAge && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Growth Progress</span>
                        <span>{project.maturity}%</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${project.maturity}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-agri-text/70">
                        <Users className="w-4 h-4 mr-1" />
                        {project.investors}
                      </div>
                      <div className="flex items-center text-sm text-agri-text/70">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {project.minInvestment}
                      </div>
                    </div>
                    <span className="text-agri-primary font-medium">View Details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Camera className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Live Monitoring</h3>
              <p className="text-agri-text/70 font-light">
                Watch your trees grow with real-time camera feeds and regular updates from our farm partners.
              </p>
            </div>
            <div className="text-center">
              <Lock className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Staking Rewards</h3>
              <p className="text-agri-text/70 font-light">
                Stake your farm NFTs to earn additional AV token rewards while your trees mature.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">RWAcert Verified</h3>
              <p className="text-agri-text/70 font-light">
                All farms are verified and certified as real-world assets with proper documentation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Farm Modal */}
      {selectedFarm && (
        <FarmModal 
          farm={selectedFarm} 
          onClose={() => setSelectedFarm(null)} 
        />
      )}
    </div>
  );
};

export default AgriFarms;