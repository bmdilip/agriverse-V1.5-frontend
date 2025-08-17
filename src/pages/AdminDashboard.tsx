import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdminGuard } from '../hooks/useAdminGuard';
import { useAuth } from '../hooks/useAuth';
import { useUIStore } from '../store/ui.store';
import { ProjectManagement } from '../modules/admin/ProjectManagement';
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
  Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { hasAccess } = useAdminGuard('admin');
  const { isAdminPreview, role, address } = useAuth();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();
  const [activeModule, setActiveModule] = useState('projects');
  const navigate = useNavigate();

  // Redirect if no access
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-agri-accent mx-auto mb-4" />
          <h2 className="text-2xl font-light text-agri-text mb-4">Access Denied</h2>
          <p className="text-agri-text/70 mb-6">Admin privileges required</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

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
            <p className="text-xs text-agri-text/60">
              {isAdminPreview ? 'Preview Mode' : 'Production Control'}
            </p>
          </div>
        </div>

        {/* Admin Info */}
        <div className="bg-agri-secondary/20 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-agri-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-agri-primary" />
            </div>
            <div>
              <div className="text-agri-text text-sm font-medium">
                {isAdminPreview ? 'Preview Access' : 'Admin Access'}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-agri-text/70 text-xs font-mono">
                  {isAdminPreview ? 'PREVIEW MODE' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
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
                <span className="text-agri-text font-mono text-sm">
                  {isAdminPreview ? 'PREVIEW' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
                  {demoMode ? 'DEMO WALLET' : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
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
    </div>
  );
};

export default AdminDashboard;