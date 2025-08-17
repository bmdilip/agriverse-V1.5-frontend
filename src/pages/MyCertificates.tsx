import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Download, 
  Eye, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  FileText,
  Wallet,
  Copy,
  RefreshCw,
  Star,
  Leaf,
  TreePine,
  Building,
  Cog as Cow
} from 'lucide-react';
import toast from 'react-hot-toast';
import { certificateApi } from '../api/certificate';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/auth.store';
import { AddressShort } from '../components/ui/AddressShort';

const MyCertificates = () => {
  const { address, isAuthenticated, isDemoMode } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assetTypeFilter, setAssetTypeFilter] = useState('all');

  // Auto-enable demo mode if not authenticated
  useEffect(() => {
    if (!isAuthenticated && import.meta.env.VITE_DEMO_MODE === 'true') {
      useAuthStore.getState().enableDemoMode('user');
    }
  }, [isAuthenticated]);

  // Fetch user certificates
  const { data: certificates = [], isLoading, error, refetch } = useQuery({
    queryKey: ['certificates', address],
    queryFn: async () => {
      const walletAddress = address || '0x1234567890123456789012345678901234567890';
      try {
        return await certificateApi.getByUser(walletAddress);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
        // Return sample certificates for demo
        return [
          {
            id: "1",
            certId: "RWA-2025-001",
            title: "RWAcert - Organic Wheat Farm #127",
            batchId: "BATCH-001",
            nftId: "NFT-001",
            nftImage: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
            assetType: "AgriYield",
            status: "Verified",
            issueDate: "2025-01-15",
            expiryDate: "2025-05-01",
            ipfsHash: "QmX7Y8Z9A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
            pdfUrl: "https://ipfs.io/ipfs/QmX7Y8Z9...",
            claimed: true,
            claimable: false,
            autoExpire: true,
            description: "Premium organic wheat cultivation with certified practices",
            userAddress: walletAddress,
            metadata: {},
            createdAt: "2025-01-15T00:00:00Z",
            updatedAt: "2025-01-15T00:00:00Z"
          },
          {
            id: "2",
            certId: "RWA-2025-002",
            title: "RWAcert - Teak Forest Plantation #89",
            batchId: "BATCH-002",
            nftId: "NFT-045",
            nftImage: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
            assetType: "AgriFarms",
            status: "Verified",
            issueDate: "2025-01-12",
            expiryDate: "2029-12-15",
            ipfsHash: "QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3",
            pdfUrl: "https://ipfs.io/ipfs/QmA1B2C3...",
            claimed: true,
            claimable: false,
            autoExpire: true,
            description: "Sustainable teak plantation with long-term growth potential",
            userAddress: walletAddress,
            metadata: {},
            createdAt: "2025-01-12T00:00:00Z",
            updatedAt: "2025-01-12T00:00:00Z"
          }
        ];
      }
    },
    enabled: true, // Always enabled in demo mode
    retry: false,
    staleTime: 30000
  });

  const handleClaimCertificate = async (certId) => {
    try {
      await certificateApi.issue({
        batchId: certId, // This should be properly mapped
        nftId: certId,
        userAddress: address || '0x1234567890123456789012345678901234567890'
      });
      toast.success(`Certificate ${certId} claimed successfully!`);
      refetch();
    } catch (error) {
      toast.error(`Failed to claim certificate: ${error.message}`);
    }
  };

  const handleDownloadCertificate = (cert) => {
    if (cert.pdfUrl) {
      window.open(cert.pdfUrl, '_blank');
      toast.success(`Certificate ${cert.certId} downloaded`);
    } else {
      toast.error('Certificate PDF not available');
    }
  };

  const handleReissueCertificate = async (certId) => {
    try {
      await certificateApi.update(certId, { status: 'Pending' });
      toast.success(`Certificate ${certId} reissue requested`);
      refetch();
    } catch (error) {
      toast.error(`Failed to request reissue: ${error.message}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'bg-agri-primary/20 text-agri-primary border-agri-primary/30';
      case 'Pending':
        return 'bg-agri-accent/20 text-agri-accent border-agri-accent/30';
      case 'Expired':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-agri-secondary/50 text-agri-text/70 border-agri-border';
    }
  };

  const getAssetTypeColor = (type) => {
    switch (type) {
      case 'AgriYield':
        return 'bg-agri-primary/10 text-agri-primary';
      case 'AgriFarms':
        return 'bg-agri-accent/10 text-agri-accent';
      case 'CarbonVault':
        return 'bg-green-500/10 text-green-400';
      case 'Livestock':
        return 'bg-purple-500/10 text-purple-400';
      default:
        return 'bg-agri-secondary/20 text-agri-text';
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

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.certId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.batchId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cert.status.toLowerCase() === statusFilter;
    const matchesAssetType = assetTypeFilter === 'all' || cert.assetType === assetTypeFilter;
    
    return matchesSearch && matchesStatus && matchesAssetType;
  });

  const stats = {
    total: certificates.length,
    verified: certificates.filter(c => c.status === 'Verified').length,
    pending: certificates.filter(c => c.status === 'Pending').length,
    expired: certificates.filter(c => c.status === 'Expired').length,
    claimable: certificates.filter(c => c.status === 'Pending').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-agri-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-light text-agri-text mb-2">Loading Certificates...</h2>
          <p className="text-agri-text/70">Fetching your RWAcert certificates</p>
        </div>
      </div>
    );
  }

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
            <span className="text-agri-primary">My</span> Certificates
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            View and manage your RWAcert certificates linked to your NFT holdings. 
            Download official verification documents and track certificate status.
          </p>
        </motion.div>

        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-agri-primary/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-agri-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-agri-text">Connected Wallet</h3>
                <AddressShort address={address || '0x1234567890123456789012345678901234567890'} />
              </div>
            </div>
            <button 
              onClick={() => refetch()}
              className="flex items-center space-x-2 px-4 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-agri-card border border-agri-border rounded-xl p-4 text-center">
            <Award className="w-6 h-6 text-agri-primary mx-auto mb-2" />
            <div className="text-2xl font-light text-agri-text">{stats.total}</div>
            <div className="text-agri-text/70 text-sm">Total</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4 text-center">
            <CheckCircle className="w-6 h-6 text-agri-primary mx-auto mb-2" />
            <div className="text-2xl font-light text-agri-primary">{stats.verified}</div>
            <div className="text-agri-text/70 text-sm">Verified</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-agri-accent mx-auto mb-2" />
            <div className="text-2xl font-light text-agri-accent">{stats.pending}</div>
            <div className="text-agri-text/70 text-sm">Pending</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4 text-center">
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-light text-red-400">{stats.expired}</div>
            <div className="text-agri-text/70 text-sm">Expired</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-xl p-4 text-center">
            <Star className="w-6 h-6 text-agri-accent mx-auto mb-2" />
            <div className="text-2xl font-light text-agri-accent">{stats.claimable}</div>
            <div className="text-agri-text/70 text-sm">Claimable</div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by certificate ID, batch ID, or title..."
              className="w-full pl-10 pr-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={assetTypeFilter}
            onChange={(e) => setAssetTypeFilter(e.target.value)}
            className="px-4 py-3 bg-agri-card border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="AgriYield">AgriYield</option>
            <option value="AgriFarms">AgriFarms</option>
            <option value="CarbonVault">CarbonVault</option>
            <option value="Livestock">Livestock</option>
          </select>
        </motion.div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={cert.nftImage} 
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getAssetTypeColor(cert.assetType)}`}>
                        {getAssetTypeIcon(cert.assetType)}
                        <span>{cert.assetType}</span>
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-agri-text font-medium text-lg mb-1">{cert.title}</div>
                    <div className="text-agri-text/70 text-sm font-mono">{cert.certId}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-agri-text/70 text-sm mb-4 leading-relaxed">{cert.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-agri-text/70">Batch ID:</span>
                      <span className="text-agri-text font-mono">{cert.batchId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-agri-text/70">NFT ID:</span>
                      <span className="text-agri-text font-mono">{cert.nftId}</span>
                    </div>
                    {cert.issueDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Issue Date:</span>
                        <span className="text-agri-text">{cert.issueDate}</span>
                      </div>
                    )}
                    {cert.expiryDate && cert.expiryDate !== 'N/A' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Expiry:</span>
                        <span className="text-agri-text">{cert.expiryDate}</span>
                      </div>
                    )}
                  </div>

                  {cert.ipfsHash && (
                    <div className="bg-agri-secondary/20 rounded-lg p-3 mb-4">
                      <div className="text-agri-text/70 text-xs mb-1">IPFS Hash:</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-agri-text font-mono text-xs truncate">{cert.ipfsHash}</span>
                        <button onClick={() => copyToClipboard(cert.ipfsHash)}>
                          <Copy className="w-3 h-3 text-agri-text/50 hover:text-agri-primary" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {cert.claimable && !cert.claimed && (
                      <motion.button
                        onClick={() => handleClaimCertificate(cert.certId)}
                        className="w-full py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Award className="w-4 h-4 mr-2 inline" />
                        Claim Certificate
                      </motion.button>
                    )}
                    
                    {cert.status === 'Expired' && (
                      <motion.button
                        onClick={() => handleReissueCertificate(cert.certId)}
                        className="w-full py-3 bg-agri-accent text-agri-dark rounded-lg font-medium hover:bg-agri-accent/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2 inline" />
                        Request Reissue
                      </motion.button>
                    )}
                    
                    {cert.status === 'Verified' && cert.pdfUrl && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadCertificate(cert)}
                          className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    )}
                    
                    {cert.status === 'Pending' && (
                      <div className="w-full py-3 bg-agri-accent/10 border border-agri-accent/20 text-agri-accent rounded-lg text-center">
                        <Clock className="w-4 h-4 mr-2 inline" />
                        Certificate Processing...
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-12 text-center"
          >
            <Award className="w-16 h-16 text-agri-text/30 mx-auto mb-4" />
            <h3 className="text-xl font-light text-agri-text mb-2">No Certificates Found</h3>
            <p className="text-agri-text/70 mb-6">
              {searchQuery || statusFilter !== 'all' || assetTypeFilter !== 'all'
                ? 'No certificates match your current filters.' 
                : 'You don\'t have any RWAcert certificates yet. Purchase NFTs to get started.'
              }
            </p>
            {(!searchQuery && statusFilter === 'all' && assetTypeFilter === 'all') && (
              <button
                onClick={() => window.location.href = '/agrihub'}
                className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
              >
                Explore Projects
              </button>
            )}
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-agri-card/50 border border-agri-border rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Blockchain Verified</h3>
              <p className="text-agri-text/70 font-light">
                All certificates are immutably stored on blockchain with IPFS backup for maximum security.
              </p>
            </div>
            <div className="text-center">
              <FileText className="w-12 h-12 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Official Documents</h3>
              <p className="text-agri-text/70 font-light">
                Download official PDF certificates that can be used for legal and compliance purposes.
              </p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Auto-Renewal</h3>
              <p className="text-agri-text/70 font-light">
                Certificates are automatically renewed based on project status and NFT ownership.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCertificates;