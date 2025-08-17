import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  Scale, 
  Lock,
  Download,
  ExternalLink,
  CheckCircle,
  Info,
  BookOpen,
  Gavel,
  Users
} from 'lucide-react';

const LegalZone = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const legalDocuments = [
    {
      title: "Terms of Service",
      description: "Complete terms and conditions for using Agriverse platform",
      lastUpdated: "January 15, 2025",
      version: "v2.1",
      type: "terms",
      icon: FileText
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "January 10, 2025",
      version: "v1.8",
      type: "privacy",
      icon: Shield
    },
    {
      title: "Risk Disclosure",
      description: "Important information about investment risks and disclaimers",
      lastUpdated: "January 5, 2025",
      version: "v3.2",
      type: "risk",
      icon: AlertTriangle
    },
    {
      title: "Compliance Framework",
      description: "Our regulatory compliance and legal framework",
      lastUpdated: "December 28, 2024",
      version: "v1.5",
      type: "compliance",
      icon: Scale
    }
  ];

  const riskFactors = [
    {
      category: "Market Risk",
      description: "Agricultural investments are subject to market volatility and commodity price fluctuations.",
      severity: "Medium"
    },
    {
      category: "Weather Risk",
      description: "Crop yields may be affected by adverse weather conditions, climate change, and natural disasters.",
      severity: "High"
    },
    {
      category: "Regulatory Risk",
      description: "Changes in agricultural policies, environmental regulations, or blockchain laws may impact returns.",
      severity: "Medium"
    },
    {
      category: "Technology Risk",
      description: "Smart contract vulnerabilities, blockchain network issues, or platform technical failures.",
      severity: "Low"
    },
    {
      category: "Liquidity Risk",
      description: "NFT investments may have limited liquidity and may not be easily convertible to cash.",
      severity: "Medium"
    }
  ];

  const complianceItems = [
    {
      title: "KYC/AML Compliance",
      description: "Know Your Customer and Anti-Money Laundering procedures",
      status: "Implemented",
      icon: Users
    },
    {
      title: "Securities Regulation",
      description: "Compliance with applicable securities laws and regulations",
      status: "Verified",
      icon: Scale
    },
    {
      title: "Data Protection",
      description: "GDPR and other data protection law compliance",
      status: "Certified",
      icon: Lock
    },
    {
      title: "Environmental Standards",
      description: "Adherence to environmental and sustainability standards",
      status: "Audited",
      icon: CheckCircle
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-agri-text bg-agri-secondary/20 border-agri-border';
    }
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
            <span className="text-agri-primary">Legal</span> Zone
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Important legal information, terms of service, privacy policy, and risk disclosures 
            for using the Agriverse platform.
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-yellow-400 mb-2">Important Legal Notice</h3>
              <p className="text-agri-text/80 font-light leading-relaxed">
                Please read all legal documents carefully before using our platform. Agricultural investments 
                carry inherent risks and past performance does not guarantee future results. By using Agriverse, 
                you acknowledge that you understand these risks and agree to our terms of service.
              </p>
            </div>
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
              onClick={() => setActiveTab('terms')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'terms'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <FileText className="w-5 h-5 mr-2 inline" />
              Legal Documents
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'risks'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <AlertTriangle className="w-5 h-5 mr-2 inline" />
              Risk Factors
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === 'compliance'
                  ? 'bg-agri-primary text-agri-dark'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              <Scale className="w-5 h-5 mr-2 inline" />
              Compliance
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'terms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {legalDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-agri-card border border-agri-border rounded-2xl p-6 hover:border-agri-primary/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-agri-primary/20 rounded-xl flex items-center justify-center">
                    <doc.icon className="w-6 h-6 text-agri-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-agri-text mb-2">{doc.title}</h3>
                    <p className="text-agri-text/70 font-light text-sm">{doc.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-agri-text/70 mb-4">
                  <span>Last updated: {doc.lastUpdated}</span>
                  <span className="px-2 py-1 bg-agri-accent/20 text-agri-accent rounded-full">
                    {doc.version}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-primary/20 border border-agri-primary/30 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'risks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h2 className="text-3xl font-light text-agri-text mb-6">Investment Risk Factors</h2>
              <p className="text-agri-text/70 font-light mb-8 leading-relaxed">
                Agricultural investments involve various risks that could affect your returns. Please carefully 
                consider these risk factors before making any investment decisions. This is not an exhaustive 
                list and other risks may apply.
              </p>
              
              <div className="space-y-6">
                {riskFactors.map((risk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-agri-secondary/20 border border-agri-border rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-agri-text">{risk.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                        {risk.severity} Risk
                      </span>
                    </div>
                    <p className="text-agri-text/70 font-light leading-relaxed">{risk.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-red-400 mb-2">Investment Disclaimer</h3>
                  <p className="text-agri-text/80 font-light leading-relaxed">
                    Past performance is not indicative of future results. All investments carry risk of loss. 
                    You should not invest more than you can afford to lose. Please consult with a financial 
                    advisor before making investment decisions. Agriverse does not provide investment advice.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'compliance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl p-8">
              <h2 className="text-3xl font-light text-agri-text mb-6">Regulatory Compliance</h2>
              <p className="text-agri-text/70 font-light mb-8 leading-relaxed">
                Agriverse is committed to maintaining the highest standards of regulatory compliance 
                and legal adherence across all jurisdictions where we operate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-agri-secondary/20 border border-agri-border rounded-xl p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-agri-primary/20 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-agri-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-agri-text">{item.title}</h3>
                          <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs font-medium">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-agri-text/70 font-light text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Jurisdictions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-agri-text/70">United States</span>
                    <span className="text-agri-primary">Compliant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-agri-text/70">European Union</span>
                    <span className="text-agri-primary">Compliant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-agri-text/70">United Kingdom</span>
                    <span className="text-agri-primary">Compliant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-agri-text/70">Singapore</span>
                    <span className="text-agri-primary">Compliant</span>
                  </div>
                </div>
              </div>

              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-4">Certifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/70">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/70">SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/70">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-agri-primary" />
                    <span className="text-agri-text/70">RWAcert Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-agri-primary/10 border border-agri-primary/20 rounded-2xl p-8 text-center"
        >
          <Gavel className="w-16 h-16 text-agri-primary mx-auto mb-6" />
          <h3 className="text-3xl font-light text-agri-text mb-4">
            Legal Questions?
          </h3>
          <p className="text-agri-text/70 font-light mb-6 max-w-2xl mx-auto">
            If you have any questions about our legal documents, compliance, or need clarification 
            on any terms, please don't hesitate to contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-agri-primary text-agri-dark rounded-full font-medium hover:bg-agri-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Legal Team
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-agri-secondary/50 text-agri-text rounded-full font-medium hover:bg-agri-secondary transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Legal FAQ</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalZone;