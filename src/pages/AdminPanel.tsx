import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  Shield, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Bell, 
  Lock, 
  Unlock, 
  UserCheck, 
  UserX, 
  FileText, 
  MapPin, 
  Calendar, 
  Camera, 
  Zap, 
  Target, 
  Coins, 
  TreePine, 
  Leaf, 
  Building, 
  Globe, 
  RefreshCw, 
  Cog as Cow, 
  Bird, 
  Bone,
  Menu,
  X,
  Save,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  ExternalLink,
  CreditCard,
  Wallet,
  Database,
  Server,
  Activity,
  Percent,
  Award,
  Star,
  Crown,
  Gem,
  Copy,
  Search,
  ChevronDown,
  ChevronRight,
  Tag,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState('projects');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(undefined); // undefined = checking, true = admin, false = not admin
  const [adminWallet, setAdminWallet] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  // Check admin access on mount and wallet change
  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    setCheckingAccess(true);
    console.log('🔍 Checking admin access...');
    
    try {
      // Check if wallet is connected
      if (typeof window.ethereum === 'undefined') {
        console.log('❌ MetaMask not installed');
        setIsAdmin(false);
        setCheckingAccess(false);
        return;
      }

      // Get connected accounts
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length === 0) {
        console.log('❌ No wallet connected');
        setIsAdmin(false);
        setCheckingAccess(false);
        return;
      }

      const walletAddress = accounts[0];
      console.log('🔗 Connected wallet:', walletAddress);
      setAdminWallet(walletAddress);
      setIsConnected(true);

      // Mock admin check - replace with actual smart contract call
      // const adminContract = new ethers.Contract(ADMIN_CONTROLS_ADDRESS, ADMIN_ABI, provider);
      // const isAdminResult = await adminContract.isAdmin(walletAddress);
      
      // For demo purposes, allow specific test wallets or any connected wallet
      const testAdminWallets = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        // Add more test admin wallets here
      ];
      
      // For development: allow any connected wallet to be admin
      const isAdminResult = true; // Change to: testAdminWallets.includes(walletAddress.toLowerCase()) for production
      
      console.log('🔐 Admin check result:', isAdminResult);
      setIsAdmin(isAdminResult);
      
      if (isAdminResult) {
        console.log('✅ Admin access granted');
        toast.success('Admin access verified');
      } else {
        console.log('❌ Admin access denied');
        toast.error('Access denied: Admin privileges required');
      }
      
    } catch (error) {
      console.error('❌ Admin access check failed:', error);
      setIsAdmin(false);
      toast.error('Failed to verify admin access');
    } finally {
      setCheckingAccess(false);
    }
  };

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple simultaneous requests
    
    setIsConnecting(true);
    try {
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAdminWallet(accounts[0]);
        setIsConnected(true);
        checkAdminAccess(); // Re-check admin status after connection
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      
      // Handle specific wallet connection errors
      if (error.code === 4001) {
        toast.error('Wallet connection rejected by user');
      } else if (error.code === -32002) {
        toast.error('Wallet connection request already pending. Please check your wallet.');
        return; // Exit early to prevent further error processing
      } else if (error.code === -32603) {
        toast.error('Internal wallet error. Please try again.');
      } else if (error.message && error.message.includes('User rejected')) {
        toast.error('Wallet connection rejected by user');
      } else if (error.message && error.message.includes('No window with id')) {
        toast.error('Wallet popup was closed. Please try connecting again.');
      } else if (error.message && error.message.includes('already pending')) {
        toast.error('Wallet connection request already pending. Please check your wallet.');
        return; // Exit early to prevent further error processing
      } else {
        // For unhandled errors, show the specific error message
        const errorMessage = error.message || error.toString() || 'Unknown wallet error';
        toast.error(`Failed to connect wallet: ${errorMessage}`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const adminModules = [
    { 
      id: 'projects', 
      label: 'Project Management', 
      icon: Building, 
      description: 'Manage batches, NFT minting, and project lifecycle'
    },
    { 
      id: 'marketplace', 
      label: 'NFT Marketplace', 
      icon: Tag, 
      description: 'Control resale approvals and marketplace features'
    },
    { 
      id: 'yield', 
      label: 'Yield Manager', 
      icon: TrendingUp, 
      description: 'ROI distribution and yield calendar management'
    },
    { 
      id: 'vault', 
      label: 'Vault Controls', 
      icon: Wallet, 
      description: 'Manage investment vaults and fund distribution'
    },
    { 
      id: 'certificates', 
      label: 'RWAcert Engine', 
      icon: Award, 
      description: 'Certificate minting and verification system'
    },
    { 
      id: 'farmlive', 
      label: 'FarmLive Control', 
      icon: Camera, 
      description: 'Live camera feeds and booking management'
    },
    { 
      id: 'legal', 
      label: 'MoU & Legal', 
      icon: FileText, 
      description: 'Legal documents and risk disclosure management'
    },
    { 
      id: 'users', 
      label: 'User Control', 
      icon: Users, 
      description: 'User management, whitelisting, and analytics'
    },
    { 
      id: 'kyc', 
      label: 'KYC & Audit', 
      icon: Shield, 
      description: 'KYC verification and smart contract audits'
    },
    { 
      id: 'treasury', 
      label: 'Treasury & Fees', 
      icon: DollarSign, 
      description: 'Platform fees, treasury management, and withdrawals'
    }
  ];

  const dashboardStats = {
    totalUsers: 2847,
    totalInvestments: 4250000,
    activeProjects: 156,
    pendingVerifications: 23,
    totalNFTs: 8934,
    carbonOffset: 1247.5,
    avStaked: 12500000,
    roiDistributed: 847000,
    platformRevenue: 122500,
    vaultBalance: 2450000
  };

  // Sample data for different modules
  const [projectBatches, setProjectBatches] = useState([
    {
      id: 1,
      batchId: 'BATCH-001',
      name: "Organic Wheat Farm Batch #1",
      assetType: "AgriYield",
      status: "Live",
      supply: 100,
      minted: 75,
      price: 500,
      roi: 18,
      maturityPeriod: 120,
      totalInvestment: 125000,
      goLiveDate: "2025-01-01",
      expiryDate: "2025-05-01",
      whitelistOnly: false,
      resaleEnabled: true,
      stakingEnabled: true,
      kycRequired: true,
      coverImage: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
      mouDocument: "MoU_Wheat_Farm.pdf",
      liveFeedUrl: "https://example.com/live-feed-1",
      cameraType: "Drone",
      investors: 45,
      vaultBalance: 37500,
      royaltyPercent: 5,
      royaltyReceiver: "0x1234...5678"
    },
    {
      id: 2,
      batchId: 'BATCH-002',
      name: "Teak Forest Plantation Batch #1",
      assetType: "AgriFarms",
      status: "Live",
      supply: 50,
      minted: 32,
      price: 2000,
      roi: 12,
      maturityPeriod: 1825, // 5 years in days
      totalInvestment: 280000,
      goLiveDate: "2024-12-15",
      expiryDate: "2029-12-15",
      whitelistOnly: true,
      resaleEnabled: false,
      stakingEnabled: true,
      kycRequired: true,
      coverImage: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400",
      mouDocument: "MoU_Teak_Forest.pdf",
      liveFeedUrl: "https://example.com/live-feed-2",
      cameraType: "Static",
      investors: 32,
      vaultBalance: 64000,
      royaltyPercent: 7,
      royaltyReceiver: "0x9876...4321"
    }
  ]);

  // Smart contract interaction functions
  const executeSmartContractAction = async (action, params) => {
    setLoading(true);
    console.log(`🔗 Executing smart contract action: ${action}`, params);
    
    return new Promise((resolve, reject) => {
      // Simulate smart contract call
      setTimeout(() => {
        setLoading(false);
        if (Math.random() > 0.1) { // 90% success rate
          const txHash = '0x' + Math.random().toString(16).substr(2, 40);
          console.log('✅ Transaction successful:', txHash);
          resolve({ success: true, txHash });
        } else {
          console.log('❌ Transaction failed');
          reject(new Error('Transaction failed'));
        }
      }, 2000);
    });
  };

  const confirmSmartContractAction = (actionName, actionFn) => {
    setConfirmAction({
      name: actionName,
      execute: actionFn
    });
    setShowConfirmModal(true);
  };

  const executeConfirmedAction = async () => {
    if (confirmAction) {
      try {
        const result = await confirmAction.execute();
        toast.success(`${confirmAction.name} completed successfully!`);
        setShowConfirmModal(false);
        setConfirmAction(null);
      } catch (error) {
        toast.error(`${confirmAction.name} failed: ${error.message}`);
        setShowConfirmModal(false);
        setConfirmAction(null);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Loading state while checking access
  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-agri-dark flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-agri-primary/20 border-t-agri-primary rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-light text-agri-text mb-2">Checking Admin Access...</h2>
          <p className="text-agri-text/70">Verifying wallet permissions</p>
          {adminWallet && (
            <p className="text-agri-text/50 text-sm mt-2 font-mono">{adminWallet}</p>
          )}
        </div>
      </div>
    );
  }

  // Not authorized state
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-agri-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-8"
          >
            <AlertTriangle className="w-16 h-16 text-agri-accent mx-auto mb-4" />
            <h2 className="text-2xl font-light text-agri-text mb-4">Access Denied</h2>
            <p className="text-agri-text/70 mb-6">
              You are not authorized to access the admin dashboard. Admin privileges are required.
            </p>
            {!isConnected ? (
              <motion.button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Wallet className="w-4 h-4 mr-2 inline" />
                {isConnecting ? 'Connecting...' : 'Connect Admin Wallet'}
              </motion.button>
            ) : (
              <div className="space-y-4">
                <div className="bg-agri-secondary/20 rounded-lg p-4">
                  <p className="text-agri-text/70 text-sm mb-2">Connected Wallet:</p>
                  <p className="text-agri-text font-mono text-sm">{adminWallet}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={checkAdminAccess}
                    className="flex-1 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 inline" />
                    Retry Check
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Sidebar Component
  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarCollapsed ? -250 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 bg-agri-card border-r border-agri-border z-50 overflow-y-auto"
    >
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-agri-primary to-agri-primary/80 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-agri-dark" />
          </div>
          <div>
            <h2 className="text-lg font-light text-agri-text">Admin Panel</h2>
            <p className="text-xs text-agri-text/60">Production Control</p>
          </div>
        </div>

        {/* Admin Info */}
        <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-agri-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-agri-primary" />
            </div>
            <div>
              <div className="text-agri-text text-sm font-medium">Admin Access</div>
              <div className="flex items-center space-x-2">
                <span className="text-agri-text/70 text-xs font-mono">{adminWallet}</span>
                <button 
                  onClick={() => copyToClipboard(adminWallet)}
                  className="text-agri-primary hover:text-agri-primary/80"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {adminModules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeModule === module.id
                  ? 'bg-agri-primary/10 border border-agri-primary/30 text-agri-primary'
                  : 'text-agri-text hover:bg-agri-secondary/20 hover:text-agri-primary'
              }`}
            >
              <module.icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="text-sm font-light">{module.label}</div>
                <div className="text-xs text-agri-text/50">{module.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );

  // Confirmation Modal
  const ConfirmationModal = () => (
    <AnimatePresence>
      {showConfirmModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-agri-card border border-agri-border rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-agri-accent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">Confirm Smart Contract Action</h3>
              <p className="text-agri-text/70 mb-6">
                {confirmAction?.name}
              </p>
              <div className="bg-agri-secondary/20 rounded-lg p-3 mb-6">
                <div className="text-agri-text/70 text-sm">This action will execute on the blockchain and cannot be undone.</div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={executeConfirmedAction}
                  disabled={loading}
                  className="flex-1 py-3 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Confirm'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Project Management Module
  const ProjectManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Project Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create New Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectBatches.map((batch) => (
          <div key={batch.id} className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
            <div className="relative h-48">
              <img src={batch.coverImage} alt={batch.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <span className="px-3 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
                  {batch.assetType}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  batch.status === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
                  batch.status === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
                  'bg-agri-secondary/50 text-agri-text/70'
                }`}>
                  {batch.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-agri-text">{batch.name}</h3>
                <span className="text-agri-text/70 text-sm font-mono">{batch.batchId}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-agri-text/70">ROI:</span>
                  <span className="text-agri-primary ml-1">{batch.roi}%</span>
                </div>
                <div>
                  <span className="text-agri-text/70">Price:</span>
                  <span className="text-agri-text ml-1">${batch.price}</span>
                </div>
                <div>
                  <span className="text-agri-text/70">Minted:</span>
                  <span className="text-agri-text ml-1">{batch.minted}/{batch.supply}</span>
                </div>
                <div>
                  <span className="text-agri-text/70">Investors:</span>
                  <span className="text-agri-text ml-1">{batch.investors}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {batch.kycRequired && <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded text-xs">KYC</span>}
                {batch.whitelistOnly && <span className="px-2 py-1 bg-agri-accent/20 text-agri-accent rounded text-xs">Whitelist</span>}
                {batch.stakingEnabled && <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded text-xs">Staking</span>}
                {batch.resaleEnabled && <span className="px-2 py-1 bg-agri-accent/20 text-agri-accent rounded text-xs">Resale</span>}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const action = () => executeSmartContractAction('updateProjectStatus', { 
                      batchId: batch.batchId, 
                      status: batch.status === 'Live' ? 'Ended' : 'Live' 
                    });
                    confirmSmartContractAction(`Change ${batch.batchId} status to ${batch.status === 'Live' ? 'Ended' : 'Live'}`, action);
                  }}
                  className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm"
                >
                  {batch.status === 'Live' ? 'End Project' : 'Go Live'}
                </button>
                <button className="flex-1 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors text-sm">
                  <Edit className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors text-sm">
                  <Camera className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Placeholder modules for other admin functions
  const PlaceholderModule = ({ title, description, icon: Icon }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">{title}</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>
      
      <div className="bg-agri-card border border-agri-border rounded-2xl p-12 text-center">
        <Icon className="w-16 h-16 text-agri-primary/50 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-agri-text mb-2">{title}</h3>
        <p className="text-agri-text/70 mb-6">{description}</p>
        <button className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors">
          Configure {title}
        </button>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'projects': 
        return <ProjectManagement />;
      case 'marketplace': 
        return <PlaceholderModule 
          title="NFT Marketplace Control" 
          description="Control resale approvals and marketplace features"
          icon={Tag}
        />;
      case 'yield': 
        return <PlaceholderModule 
          title="Yield Manager" 
          description="ROI distribution and yield calendar management"
          icon={TrendingUp}
        />;
      case 'vault': 
        return <PlaceholderModule 
          title="Vault Controls" 
          description="Manage investment vaults and fund distribution"
          icon={Wallet}
        />;
      case 'certificates': 
        return <PlaceholderModule 
          title="RWAcert Engine" 
          description="Certificate minting and verification system"
          icon={Award}
        />;
      case 'farmlive': 
        return <PlaceholderModule 
          title="FarmLive Control" 
          description="Live camera feeds and booking management"
          icon={Camera}
        />;
      case 'legal': 
        return <PlaceholderModule 
          title="MoU & Legal" 
          description="Legal documents and risk disclosure management"
          icon={FileText}
        />;
      case 'users': 
        return <PlaceholderModule 
          title="User Control" 
          description="User management, whitelisting, and analytics"
          icon={Users}
        />;
      case 'kyc': 
        return <PlaceholderModule 
          title="KYC & Audit" 
          description="KYC verification and smart contract audits"
          icon={Shield}
        />;
      case 'treasury': 
        return <PlaceholderModule 
          title="Treasury & Fees" 
          description="Platform fees, treasury management, and withdrawals"
          icon={DollarSign}
        />;
      default: 
        return <ProjectManagement />;
    }
  };

  // Main admin dashboard content
  return (
    <div className="min-h-screen bg-agri-dark">
      <Sidebar />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-0' : 'ml-64'}`}>
        {/* Header */}
        <div className="bg-agri-card border-b border-agri-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-light text-agri-text">
                  Welcome, Admin
                </h1>
                <p className="text-agri-text/70 text-sm">
                  {adminModules.find(m => m.id === activeModule)?.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Stats Summary */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-agri-primary font-medium">{dashboardStats.activeProjects}</div>
                  <div className="text-agri-text/70">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-agri-accent font-medium">{dashboardStats.pendingVerifications}</div>
                  <div className="text-agri-text/70">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-agri-primary font-medium">${(dashboardStats.platformRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-agri-text/70">Revenue</div>
                </div>
              </div>
              
              {/* Admin Wallet */}
              <div className="flex items-center space-x-2 bg-agri-secondary/20 rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-agri-primary" />
                <span className="text-agri-text font-mono text-sm">{adminWallet}</span>
              </div>
              
              <button className="p-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="p-6">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderModuleContent()}
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default AdminPanel;