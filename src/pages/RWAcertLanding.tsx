import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Award, 
  CheckCircle, 
  FileText, 
  Lock, 
  Globe,
  ArrowRight,
  Eye,
  Download,
  Zap,
  Users,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const RWAcertLanding = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "All certificates are immutably stored on blockchain with IPFS backup for maximum security."
    },
    {
      icon: Award,
      title: "Expert Validated",
      description: "Legal and agricultural experts validate every asset before certification."
    },
    {
      icon: CheckCircle,
      title: "Globally Recognized",
      description: "RWAcert is recognized by international agricultural and investment bodies."
    },
    {
      icon: Lock,
      title: "Tamper Proof",
      description: "Cryptographic signatures ensure certificates cannot be forged or altered."
    }
  ];

  const stats = [
    { label: 'Assets Verified', value: '2,847', icon: Shield },
    { label: 'Accuracy Rate', value: '99.8%', icon: CheckCircle },
    { label: 'Verification Time', value: '< 2 min', icon: Zap },
    { label: 'Total Value', value: '$2.4B', icon: TrendingUp }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Asset Registration",
      description: "Agricultural assets are registered with complete documentation and ownership proofs."
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI system analyzes documents for authenticity and compliance verification."
    },
    {
      step: 3,
      title: "Expert Review",
      description: "Legal and agricultural experts validate the analysis and confirm ownership."
    },
    {
      step: 4,
      title: "Blockchain Certification",
      description: "Asset receives RWAcert certification and is registered on blockchain."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-agri-primary/20 to-agri-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-12 h-12 text-agri-primary" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">RWAcert</span> Verification
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto mb-8">
            The industry standard for real-world asset certification on blockchain. 
            Verify authenticity, ensure transparency, and build trust in agricultural investments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rwa-cert/my">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-full font-medium text-lg hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-5 h-5 mr-2 inline" />
                View My Certificates
              </motion.button>
            </Link>
            <motion.button
              className="px-8 py-4 bg-agri-card border border-agri-border text-agri-text rounded-full font-medium text-lg hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 mr-2 inline" />
              Search Certificates
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center hover:border-agri-primary/50 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <div className="text-2xl font-light text-agri-text mb-1">{stat.value}</div>
              <div className="text-agri-text/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light font-outfit mb-6 text-agri-text">
              How <span className="text-agri-primary">RWAcert</span> Works
            </h2>
            <p className="text-xl text-agri-text/70 font-light max-w-2xl mx-auto">
              Our comprehensive verification process ensures every asset is authentic and properly documented
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-agri-primary/10 border border-agri-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-light text-agri-primary">{step.step}</span>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-agri-border -translate-x-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-medium text-agri-text mb-3">{step.title}</h3>
                <p className="text-agri-text/70 font-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center hover:border-agri-primary/50 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">{feature.title}</h3>
              <p className="text-agri-text/70 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-agri-primary/10 to-agri-accent/10 border border-agri-primary/20 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-light font-outfit mb-6 text-agri-text">
            Ready to Get <span className="text-agri-primary">Certified</span>?
          </h2>
          <p className="text-xl text-agri-text/70 font-light mb-8 max-w-2xl mx-auto">
            Join thousands of verified asset owners and investors who trust RWAcert 
            for transparent, secure agricultural investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rwa-cert/my">
              <motion.button
                className="px-8 py-4 bg-agri-primary text-agri-dark rounded-full font-medium text-lg hover:bg-agri-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Certificates
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>
            </Link>
            <Link to="/agrihub">
              <motion.button
                className="px-8 py-4 bg-agri-secondary/50 text-agri-text rounded-full font-medium text-lg hover:bg-agri-secondary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Verified Assets
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RWAcertLanding;