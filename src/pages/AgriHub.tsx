import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Sliders, 
  Search, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Leaf, 
  Eye,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Camera,
  Award,
  Percent,
  TreePine,
  Cog as Cow,
  Bird,
  Bone,
  Shield,
  Coins,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  CheckCircle,
  X,
  ChevronDown,
  Zap
} from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProjectCard from '../components/ProjectCard';

const AgriHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState([2, 5]);
  
  // Filter states
  const [filters, setFilters] = useState({
    roiMin: 8,
    roiMax: 25,
    risk: 'all', // 'all', 'low', 'medium', 'high'
    duration: 'all', // 'all', '30', '60', '90', '120', '180+'
    stakeable: false,
    status: 'all', // 'all', 'live', 'upcoming', 'ended'
    rwaCertified: false,
    bookmarked: false
  });

  const tabs = [
    { id: 'all', label: 'All Projects', icon: Filter },
    { id: 'agriyield', label: 'AgriYield', icon: Leaf },
    { id: 'agrifarms', label: 'AgriFarms', icon: TreePine },
    { id: 'livestock', label: 'Livestock', icon: Cow },
    { id: 'carbonvault', label: 'CarbonVault', icon: Shield },
    { id: 'staking', label: 'Staking', icon: Coins }
  ];

  const projects = [
    {
      id: 1,
      title: "Premium Organic Wheat",
      type: "AgriYield",
      location: "Punjab, India",
      roi: 18,
      period: 120,
      periodUnit: "days",
      maturity: 75,
      minInvestment: "$500",
      totalRaised: "$45,000",
      target: "$60,000",
      investors: 23,
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "live",
      riskLevel: "low",
      description: "Premium organic wheat cultivation with certified organic practices and guaranteed market buyback.",
      features: ["Organic Certified", "Live Monitoring", "Guaranteed Buyback", "Weather Insurance"],
      stakeable: true,
      rwaCertified: true,
      countdown: "45 days left",
      launchDate: null
    },
    {
      id: 2,
      title: "Teak Forest Plantation",
      type: "AgriFarms",
      location: "Kerala, India",
      roi: 12,
      period: 5,
      periodUnit: "years",
      maturity: 40,
      minInvestment: "$1,000",
      totalRaised: "$120,000",
      target: "$200,000",
      investors: 45,
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "live",
      riskLevel: "low",
      description: "Sustainable teak plantation with long-term growth potential and carbon benefits.",
      features: ["Sustainable Harvesting", "Carbon Credits", "Live Monitoring", "Insurance Coverage"],
      stakeable: true,
      rwaCertified: true,
      countdown: "2 years to first harvest",
      launchDate: null
    },
    {
      id: 3,
      title: "Premium Dairy Cattle Farm",
      type: "Livestock",
      location: "Gujarat, India",
      roi: 22,
      period: 180,
      periodUnit: "days",
      maturity: 65,
      minInvestment: "$800",
      totalRaised: "$65,000",
      target: "$80,000",
      investors: 32,
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "live",
      riskLevel: "medium",
      description: "Premium dairy cattle farm with high-yield milk production and organic practices.",
      features: ["Organic Feed", "Live Monitoring", "Veterinary Care", "Milk Production"],
      stakeable: true,
      rwaCertified: true,
      countdown: "60 days left",
      launchDate: null
    },
    {
      id: 4,
      title: "Carbon Offset Trees",
      type: "CarbonVault",
      location: "Karnataka, India",
      roi: 0,
      period: 0,
      periodUnit: "permanent",
      maturity: 30,
      minInvestment: "$200",
      totalRaised: "$28,000",
      target: "$45,000",
      investors: 140,
      image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "live",
      riskLevel: "low",
      description: "Carbon sequestration project with environmental impact and verified carbon credits.",
      features: ["Carbon Credits", "Environmental Impact", "Biodiversity", "Verified Offsets"],
      stakeable: false,
      rwaCertified: true,
      countdown: "Ongoing project",
      launchDate: null
    },
    {
      id: 5,
      title: "AV Token Staking Pool",
      type: "Staking",
      location: "Global",
      roi: 15,
      period: 90,
      periodUnit: "days",
      maturity: 100,
      minInvestment: "$100",
      totalRaised: "$1,250,000",
      target: "$5,000,000",
      investors: 847,
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "live",
      riskLevel: "low",
      description: "Stake your AV tokens to earn passive rewards while supporting the Agriverse ecosystem.",
      features: ["Flexible Staking", "Daily Rewards", "Governance Rights", "Instant Unstake"],
      stakeable: true,
      rwaCertified: false,
      countdown: "Ongoing pool",
      launchDate: null
    },
    {
      id: 6,
      title: "Free-Range Poultry Farm",
      type: "Livestock",
      location: "Tamil Nadu, India",
      roi: 25,
      period: 90,
      periodUnit: "days",
      maturity: 80,
      minInvestment: "$300",
      totalRaised: "$38,000",
      target: "$45,000",
      investors: 42,
      image: "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      riskLevel: "low",
      description: "Free-range poultry farm with organic egg production and humane practices.",
      features: ["Free Range", "Organic Feed", "Cage-Free", "High Egg Production"],
      stakeable: true,
      rwaCertified: true,
      countdown: null,
      launchDate: "Launches in 5 days"
    },
    {
      id: 7,
      title: "Sustainable Rice Farming",
      type: "AgriYield",
      location: "West Bengal, India",
      roi: 16,
      period: 90,
      periodUnit: "days",
      maturity: 0,
      minInvestment: "$400",
      totalRaised: "$0",
      target: "$50,000",
      investors: 0,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      riskLevel: "medium",
      description: "Sustainable rice cultivation using traditional methods and modern irrigation.",
      features: ["Water Efficient", "Traditional Methods", "High Yield", "Organic"],
      stakeable: true,
      rwaCertified: true,
      countdown: null,
      launchDate: "Launches in 2 days"
    },
    {
      id: 8,
      title: "Mango Orchard Estate",
      type: "AgriFarms",
      location: "Maharashtra, India",
      roi: 14,
      period: 18,
      periodUnit: "months",
      maturity: 100,
      minInvestment: "$750",
      totalRaised: "$85,000",
      target: "$85,000",
      investors: 32,
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "ended",
      riskLevel: "low",
      description: "Premium mango orchard with export-quality fruit and annual yields.",
      features: ["Export Quality", "Annual Yields", "Organic Methods", "Premium Market"],
      stakeable: false,
      rwaCertified: true,
      countdown: null,
      launchDate: null
    }
  ];

  const toggleBookmark = (e, projectId) => {
    e.stopPropagation();
    if (bookmarkedProjects.includes(projectId)) {
      setBookmarkedProjects(bookmarkedProjects.filter(id => id !== projectId));
    } else {
      setBookmarkedProjects([...bookmarkedProjects, projectId]);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      roiMin: 8,
      roiMax: 25,
      risk: 'all',
      duration: 'all',
      stakeable: false,
      status: 'all',
      rwaCertified: false,
      bookmarked: false
    });
    setSearchQuery('');
  };

  const filteredProjects = projects.filter(project => {
    // Filter by tab
    if (activeTab !== 'all' && project.type.toLowerCase() !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.type.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by ROI range
    if (project.roi < filters.roiMin || project.roi > filters.roiMax) {
      return false;
    }
    
    // Filter by risk level
    if (filters.risk !== 'all' && project.riskLevel !== filters.risk) {
      return false;
    }
    
    // Filter by duration
    if (filters.duration !== 'all') {
      if (filters.duration === '30' && project.period > 30) return false;
      if (filters.duration === '60' && (project.period <= 30 || project.period > 60)) return false;
      if (filters.duration === '90' && (project.period <= 60 || project.period > 90)) return false;
      if (filters.duration === '120' && (project.period <= 90 || project.period > 120)) return false;
      if (filters.duration === '180+' && project.period <= 120) return false;
    }
    
    // Filter by stakeable
    if (filters.stakeable && !project.stakeable) {
      return false;
    }
    
    // Filter by status
    if (filters.status !== 'all' && project.status !== filters.status) {
      return false;
    }
    
    // Filter by RWA certification
    if (filters.rwaCertified && !project.rwaCertified) {
      return false;
    }
    
    // Filter by bookmarked
    if (filters.bookmarked && !bookmarkedProjects.includes(project.id)) {
      return false;
    }
    
    return true;
  });

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

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
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-light text-agri-text">{project.title}</h2>
                  {project.rwaCertified && (
                    <div className="flex items-center space-x-1 bg-agri-accent/20 rounded-full px-2 py-1">
                      <Shield className="w-3 h-3 text-agri-accent" />
                      <span className="text-agri-accent text-xs font-light">RWAcert</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-agri-text/70">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    {project.type === "AgriYield" && <Leaf className="w-4 h-4 mr-1" />}
                    {project.type === "AgriFarms" && <TreePine className="w-4 h-4 mr-1" />}
                    {project.type === "Livestock" && <Cow className="w-4 h-4 mr-1" />}
                    {project.type === "CarbonVault" && <Shield className="w-4 h-4 mr-1" />}
                    {project.type === "Staking" && <Coins className="w-4 h-4 mr-1" />}
                    <span className="ml-1">{project.type}</span>
                  </div>
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
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-light ${
                      project.status === 'live' ? 'bg-agri-primary/20 text-agri-primary' :
                      project.status === 'upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
                      'bg-agri-secondary/50 text-agri-text/70'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-light ${
                      project.riskLevel === 'low' ? 'bg-agri-primary/20 text-agri-primary' :
                      project.riskLevel === 'medium' ? 'bg-agri-accent/20 text-agri-accent' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
                    </span>
                  </div>
                  {project.status === 'live' && project.countdown && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-agri-dark/80 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-agri-primary" />
                            <span className="text-agri-text">Time Remaining</span>
                          </div>
                          <span className="text-agri-primary font-light">{project.countdown}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.status === 'upcoming' && project.launchDate && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-agri-dark/80 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-agri-accent" />
                            <span className="text-agri-text">Launch Date</span>
                          </div>
                          <span className="text-agri-accent font-light">{project.launchDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-light text-agri-text mb-3">Project Details</h3>
                  <p className="text-agri-text/70 font-light leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-agri-primary" />
                      <span className="text-agri-text/80 text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-agri-primary mr-2" />
                      <span className="text-agri-text/70 text-sm">Expected ROI</span>
                    </div>
                    <div className="text-2xl font-light text-agri-primary">{project.roi}%</div>
                  </div>
                  <div className="bg-agri-accent/10 border border-agri-accent/20 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-agri-accent mr-2" />
                      <span className="text-agri-text/70 text-sm">Period</span>
                    </div>
                    <div className="text-2xl font-light text-agri-accent">
                      {project.period} {project.periodUnit}
                    </div>
                  </div>
                </div>

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-light text-agri-text mb-4">Investment Progress</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                      <span>Raised: {project.totalRaised}</span>
                      <span>Target: {project.target}</span>
                    </div>
                    <div className="w-full bg-agri-border rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                        style={{ width: `${(parseInt(project.totalRaised.replace('$', '').replace(',', '')) / parseInt(project.target.replace('$', '').replace(',', ''))) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-agri-text/70">
                    <span>{project.investors} investors</span>
                    <span>Min: {project.minInvestment}</span>
                  </div>
                </div>

                {project.maturity > 0 && (
                  <div className="bg-agri-secondary/20 rounded-xl p-4">
                    <h3 className="text-lg font-light text-agri-text mb-4">Maturity Progress</h3>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                        <span>Progress</span>
                        <span>{project.maturity}%</span>
                      </div>
                      <div className="w-full bg-agri-border rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                          style={{ width: `${project.maturity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <motion.button
                    className={`w-full px-6 py-4 rounded-xl font-light text-lg transition-all duration-300 ${
                      project.status === 'live'
                        ? 'bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark hover:shadow-lg hover:shadow-agri-primary/25'
                        : project.status === 'upcoming'
                          ? 'bg-agri-accent/20 border border-agri-accent text-agri-accent hover:bg-agri-accent/30'
                          : 'bg-agri-secondary/50 text-agri-text/50 cursor-not-allowed'
                    }`}
                    whileHover={project.status !== 'ended' ? { scale: 1.02 } : {}}
                    whileTap={project.status !== 'ended' ? { scale: 0.98 } : {}}
                    disabled={project.status === 'ended'}
                  >
                    {project.status === 'live' ? 'Invest Now' : 
                     project.status === 'upcoming' ? 'Get Notified' : 
                     'Investment Closed'}
                  </motion.button>
                  
                  {project.stakeable && (
                    <motion.button
                      className="w-full px-6 py-3 bg-agri-primary/20 border border-agri-primary/30 text-agri-primary rounded-xl font-light hover:bg-agri-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-4 h-4 mr-2 inline" />
                      Stake for Extra Rewards
                    </motion.button>
                  )}
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <FileText className="w-4 h-4 mr-1" />
                      MoU
                    </button>
                    {project.type !== 'Staking' && (
                      <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                        <Camera className="w-4 h-4 mr-1" />
                        Live Feed
                      </button>
                    )}
                    {project.rwaCertified && (
                      <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                        <Shield className="w-4 h-4 mr-1" />
                        Verify
                      </button>
                    )}
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
            <span className="text-agri-primary">AgriHub</span> Explorer
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Discover and invest in verified agricultural projects, livestock, carbon offsets, and staking opportunities.
            All in one place with transparent ROI tracking.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or type..."
                className="w-full pl-10 pr-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text hover:border-agri-primary hover:text-agri-primary transition-colors"
            >
              <Sliders className="w-5 h-5" />
              <span>Filters</span>
              {(filters.roiMin !== 8 || filters.roiMax !== 25 || filters.risk !== 'all' || 
                filters.duration !== 'all' || filters.stakeable || filters.status !== 'all' || 
                filters.rwaCertified || filters.bookmarked) && (
                <span className="w-5 h-5 bg-agri-primary text-agri-dark rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              onClose={() => setShowFilters(false)}
            />
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {tabs.map((tab) => (
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
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="text-agri-text/70">
            Showing <span className="text-agri-primary font-light">{filteredProjects.length}</span> projects
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-agri-text/70">Sort by:</span>
            <select className="bg-agri-card border border-agri-border rounded-lg px-3 py-2 text-agri-text focus:border-agri-primary focus:outline-none">
              <option value="newest">Newest</option>
              <option value="roi-high">Highest ROI</option>
              <option value="roi-low">Lowest ROI</option>
              <option value="duration-short">Shortest Duration</option>
              <option value="duration-long">Longest Duration</option>
            </select>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project}
                  isBookmarked={bookmarkedProjects.includes(project.id)}
                  onToggleBookmark={toggleBookmark}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-8 text-center"
          >
            <AlertTriangle className="w-16 h-16 text-agri-accent/70 mx-auto mb-4" />
            <h3 className="text-xl font-light text-agri-text mb-2">No Projects Found</h3>
            <p className="text-agri-text/70 mb-6">
              No projects match your current filter criteria. Try adjusting your filters or search query.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-light hover:bg-agri-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-4 bg-agri-secondary/50 text-agri-text rounded-full font-light text-lg hover:bg-agri-secondary transition-all duration-300">
              Load More Projects
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default AgriHub;