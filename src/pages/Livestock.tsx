import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Clock, TrendingUp, MapPin, Eye, Calendar, DollarSign, Users, FileText, Camera, Award, Percent, Cog as Cow, Bird, Bone, CheckCircle, AlertCircle, Heart, Shield, Leaf } from 'lucide-react';

const Livestock = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects', icon: Filter },
    { id: 'cow', label: 'Cattle', icon: Cow },
    { id: 'goat', label: 'Goats', icon: Bone },
    { id: 'poultry', label: 'Poultry', icon: Bird }
  ];

  const projects = [
    {
      id: 1,
      title: "Premium Dairy Cattle Farm",
      location: "Gujarat, India",
      animalType: "Cow",
      roi: "22%",
      period: "180 days",
      maturity: 65,
      minInvestment: "$800",
      totalRaised: "$65,000",
      target: "$80,000",
      investors: 32,
      image: "https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Medium",
      description: "Premium dairy cattle farm with high-yield milk production and organic practices.",
      features: ["Organic Feed", "Live Monitoring", "Veterinary Care", "Milk Production"],
      category: "cow",
      healthStatus: "Excellent",
      animalCount: 45,
      certifications: ["Organic Certified", "Animal Welfare Approved"]
    },
    {
      id: 2,
      title: "Sustainable Goat Farming",
      location: "Rajasthan, India",
      animalType: "Goat",
      roi: "18%",
      period: "150 days",
      maturity: 55,
      minInvestment: "$500",
      totalRaised: "$42,000",
      target: "$60,000",
      investors: 28,
      image: "https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Low",
      description: "Sustainable goat farming with focus on meat and milk production using traditional methods.",
      features: ["Free Range", "Organic Practices", "Dual Purpose", "Disease Resistant"],
      category: "goat",
      healthStatus: "Good",
      animalCount: 120,
      certifications: ["Sustainable Farming", "Local Breed Preservation"]
    },
    {
      id: 3,
      title: "Free-Range Poultry Farm",
      location: "Tamil Nadu, India",
      animalType: "Poultry",
      roi: "25%",
      period: "90 days",
      maturity: 80,
      minInvestment: "$300",
      totalRaised: "$38,000",
      target: "$45,000",
      investors: 42,
      image: "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Low",
      description: "Free-range poultry farm with organic egg production and humane practices.",
      features: ["Free Range", "Organic Feed", "Cage-Free", "High Egg Production"],
      category: "poultry",
      healthStatus: "Excellent",
      animalCount: 500,
      certifications: ["Cage-Free Certified", "Organic Feed Certified"]
    },
    {
      id: 4,
      title: "Premium Angus Cattle Ranch",
      location: "Madhya Pradesh, India",
      animalType: "Cow",
      roi: "20%",
      period: "210 days",
      maturity: 40,
      minInvestment: "$1,000",
      totalRaised: "$85,000",
      target: "$120,000",
      investors: 35,
      image: "https://images.pexels.com/photos/162801/cows-pasture-cattle-black-angus-162801.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "Active",
      riskLevel: "Medium",
      description: "Premium Angus cattle ranch focused on high-quality meat production with sustainable practices.",
      features: ["Grass-Fed", "Sustainable Grazing", "Premium Meat", "Genetic Selection"],
      category: "cow",
      healthStatus: "Good",
      animalCount: 65,
      certifications: ["Grass-Fed Certified", "Humane Handling"]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getAnimalIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'cow': return <Cow className="w-5 h-5" />;
      case 'goat': return <Bone className="w-5 h-5" />;
      case 'poultry': return <Bird className="w-5 h-5" />;
      default: return <Leaf className="w-5 h-5" />;
    }
  };

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
                <h2 className="text-3xl font-light text-agri-text mb-2">{project.title}</h2>
                <div className="flex items-center space-x-4 text-agri-text/70">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    {getAnimalIcon(project.animalType)}
                    <span className="ml-1">{project.animalType}</span>
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
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-medium text-agri-text mb-3">Project Details</h3>
                  <p className="text-agri-text/70 font-light leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-agri-primary" />
                      <span className="text-agri-text/80 text-sm">{feature}</span>
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
                    <div className="text-2xl font-medium text-agri-primary">{project.roi}</div>
                  </div>
                  <div className="bg-agri-accent/10 border border-agri-accent/20 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-agri-accent mr-2" />
                      <span className="text-agri-text/70 text-sm">Period</span>
                    </div>
                    <div className="text-2xl font-medium text-agri-accent">{project.period}</div>
                  </div>
                </div>

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Investment Progress</h3>
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

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Livestock Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Animal Count</span>
                      <span className="text-agri-text">{project.animalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Health Status</span>
                      <span className={`${
                        project.healthStatus === 'Excellent' ? 'text-agri-primary' : 
                        project.healthStatus === 'Good' ? 'text-agri-accent' : 
                        'text-red-400'
                      }`}>
                        {project.healthStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Certifications</span>
                      <div className="text-right">
                        {project.certifications.map((cert, index) => (
                          <div key={index} className="text-agri-text text-sm">{cert}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-agri-secondary/20 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Maturity Progress</h3>
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

                <div className="space-y-3">
                  <motion.button
                    className="w-full px-6 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-xl font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Invest Now
                  </motion.button>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <FileText className="w-4 h-4 mr-1" />
                      MoU
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <Camera className="w-4 h-4 mr-1" />
                      Live Feed
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg text-sm hover:bg-agri-secondary/70 transition-colors">
                      <Award className="w-4 h-4 mr-1" />
                      Cert
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
            <span className="text-agri-primary">Livestock</span> Investments
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Invest in sustainable livestock farming with transparent practices and ethical animal care. 
            Earn returns from dairy, meat, and breeding operations.
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.riskLevel === 'Low' 
                        ? 'bg-agri-primary/20 text-agri-primary' 
                        : 'bg-agri-accent/20 text-agri-accent'
                    }`}>
                      {project.riskLevel} Risk
                    </span>
                    <span className="px-3 py-1 bg-agri-dark/50 backdrop-blur-sm rounded-full text-xs font-medium text-agri-text">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-agri-primary font-medium text-xl">{project.roi}</div>
                        <div className="text-agri-text/80 text-sm font-light">{project.period}</div>
                      </div>
                      <div className="w-10 h-10 bg-agri-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-agri-primary/30 transition-colors">
                        <Eye className="w-5 h-5 text-agri-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-medium text-agri-text">{project.title}</h3>
                    <div className="flex items-center space-x-1 bg-agri-primary/20 rounded-full px-2 py-0.5">
                      {getAnimalIcon(project.animalType)}
                      <span className="text-agri-primary text-xs">{project.animalType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-agri-text/70 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-agri-accent" />
                      {project.healthStatus}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                      <span>Maturity Progress</span>
                      <span>{project.maturity}%</span>
                    </div>
                    <div className="w-full bg-agri-border rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-agri-primary to-agri-accent h-2 rounded-full"
                        style={{ width: `${project.maturity}%` }}
                      />
                    </div>
                  </div>

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

        {/* Load More */}
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

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 bg-agri-card/50 backdrop-blur-sm border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Ethical Farming</h3>
              <p className="text-agri-text/70 font-light">
                All livestock projects follow strict ethical guidelines and animal welfare standards.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Consistent Returns</h3>
              <p className="text-agri-text/70 font-light">
                Livestock investments offer stable returns with multiple revenue streams.
              </p>
            </div>
            <div className="text-center">
              <Camera className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Live Monitoring</h3>
              <p className="text-agri-text/70 font-light">
                Access real-time video feeds of your livestock investments with FarmLive.
              </p>
            </div>
          </div>
        </motion.div>
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

export default Livestock;