import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Shield, 
  Users, 
  Settings, 
  Database, 
  Server, 
  Activity, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Key,
  Globe,
  Zap,
  Target,
  DollarSign,
  TrendingUp,
  Award,
  FileText,
  Camera,
  Bell,
  Menu,
  Save,
  Power,
  Pause,
  Play,
  RotateCcw,
  ExternalLink,
  Wifi,
  WifiOff,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Monitor,
  Terminal,
  Code,
  GitBranch,
  Package,
  Layers,
  Link,
  Unlink
} from 'lucide-react';
import toast from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedContract, setSelectedContract] = useState(null);
  const [systemStatus, setSystemStatus] = useState('online');

  const superAdminTabs = [
    { id: 'overview', label: 'System Overview', icon: Monitor, color: 'text-purple-400' },
    { id: 'contracts', label: 'Smart Contracts', icon: Code, color: 'text-purple-400' },
    { id: 'admins', label: 'Admin Management', icon: Crown, color: 'text-purple-400' },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, color: 'text-purple-400' },
    { id: 'security', label: 'Security Center', icon: Shield, color: 'text-purple-400' },
    { id: 'system', label: 'System Health', icon: Activity, color: 'text-purple-400' },
    { id: 'emergency', label: 'Emergency Controls', icon: AlertTriangle, color: 'text-red-400' }
  ];

  const systemMetrics = {
    uptime: '99.98%',
    totalUsers: 12847,
    totalContracts: 8,
    totalTransactions: 45672,
    platformRevenue: '$2.4M',
    systemLoad: '23%',
    databaseSize: '2.4GB',
    blockchainSync: '100%'
  };

  const smartContracts = [
    {
      id: 1,
      name: 'AgriNFT',
      address: '0x1234...5678',
      status: 'Active',
      version: 'v2.1.0',
      lastUpdated: '2025-01-10',
      gasUsed: '2.4M',
      transactions: 15420,
      verified: true,
      paused: false
    },
    {
      id: 2,
      name: 'AgriVault',
      address: '0x9876...4321',
      status: 'Active',
      version: 'v1.8.2',
      lastUpdated: '2025-01-08',
      gasUsed: '1.8M',
      transactions: 8934,
      verified: true,
      paused: false
    },
    {
      id: 3,
      name: 'YieldManager',
      address: '0x5555...7777',
      status: 'Active',
      version: 'v1.5.1',
      lastUpdated: '2025-01-05',
      gasUsed: '3.2M',
      transactions: 12456,
      verified: true,
      paused: false
    },
    {
      id: 4,
      name: 'CarbonCredit',
      address: '0x8888...9999',
      status: 'Active',
      version: 'v1.2.0',
      lastUpdated: '2024-12-28',
      gasUsed: '890K',
      transactions: 5678,
      verified: true,
      paused: false
    },
    {
      id: 5,
      name: 'CertificateEngine',
      address: '0x1111...2222',
      status: 'Active',
      version: 'v1.0.5',
      lastUpdated: '2025-01-12',
      gasUsed: '1.2M',
      transactions: 3456,
      verified: true,
      paused: false
    },
    {
      id: 6,
      name: 'KYCModule',
      address: '0x3333...4444',
      status: 'Active',
      version: 'v1.1.2',
      lastUpdated: '2025-01-07',
      gasUsed: '567K',
      transactions: 2134,
      verified: true,
      paused: false
    },
    {
      id: 7,
      name: 'AdminControls',
      address: '0x6666...7777',
      status: 'Active',
      version: 'v2.0.1',
      lastUpdated: '2025-01-14',
      gasUsed: '234K',
      transactions: 892,
      verified: true,
      paused: false
    },
    {
      id: 8,
      name: 'MarketplaceV2',
      address: '0x9999...0000',
      status: 'Pending',
      version: 'v1.0.0',
      lastUpdated: '2025-01-15',
      gasUsed: '0',
      transactions: 0,
      verified: false,
      paused: true
    }
  ];

  const adminUsers = [
    {
      id: 1,
      wallet: '0xAdmin1...1234',
      role: 'Admin',
      permissions: ['View', 'Edit', 'Approve'],
      lastLogin: '2025-01-15 14:30',
      status: 'Active',
      projectsManaged: 12,
      actionsToday: 45
    },
    {
      id: 2,
      wallet: '0xAdmin2...5678',
      role: 'Admin',
      permissions: ['View', 'Edit'],
      lastLogin: '2025-01-14 09:15',
      status: 'Active',
      projectsManaged: 8,
      actionsToday: 23
    },
    {
      id: 3,
      wallet: '0xSuper...9999',
      role: 'SuperAdmin',
      permissions: ['Full Control'],
      lastLogin: '2025-01-15 16:45',
      status: 'Active',
      projectsManaged: 25,
      actionsToday: 67
    }
  ];

  const securityLogs = [
    {
      id: 1,
      timestamp: '2025-01-15 16:45:23',
      action: 'Admin Login',
      user: '0xAdmin1...1234',
      ip: '192.168.1.100',
      status: 'Success',
      riskLevel: 'Low'
    },
    {
      id: 2,
      timestamp: '2025-01-15 16:30:12',
      action: 'Contract Pause',
      user: '0xSuper...9999',
      ip: '10.0.0.50',
      status: 'Success',
      riskLevel: 'Medium'
    },
    {
      id: 3,
      timestamp: '2025-01-15 15:22:45',
      action: 'Failed Login Attempt',
      user: '0xUnknown...0000',
      ip: '203.45.67.89',
      status: 'Failed',
      riskLevel: 'High'
    }
  ];

  const systemHealth = {
    server: { status: 'Healthy', load: '23%', memory: '45%', disk: '67%' },
    database: { status: 'Healthy', connections: '45/100', size: '2.4GB', queries: '1.2K/min' },
    blockchain: { status: 'Synced', blockHeight: '18,945,672', gasPrice: '25 gwei', peers: '156' },
    api: { status: 'Operational', requests: '2.4K/min', latency: '120ms', uptime: '99.98%' }
  };

  const handlePauseContract = (contractId) => {
    toast.success(`Contract ${contractId} paused successfully`);
  };

  const handleResumeContract = (contractId) => {
    toast.success(`Contract ${contractId} resumed successfully`);
  };

  const handleAddAdmin = () => {
    toast.success('New admin added successfully');
  };

  const handleRemoveAdmin = (adminId) => {
    toast.error(`Admin ${adminId} removed`);
  };

  const handleEmergencyPause = () => {
    setSystemStatus('paused');
    toast.error('EMERGENCY: Platform paused - All operations stopped');
  };

  const handleSystemResume = () => {
    setSystemStatus('online');
    toast.success('Platform resumed - All operations restored');
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-agri-card border-r border-agri-border z-40 overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Crown className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-medium text-agri-text">SuperAdmin</h3>
        </div>
        <div className="space-y-2">
          {superAdminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                  : 'text-agri-text hover:bg-agri-secondary/20 hover:text-purple-400'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${tab.color}`} />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const SystemOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">System Overview</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            systemStatus === 'online' ? 'bg-agri-primary' : 
            systemStatus === 'paused' ? 'bg-agri-accent' : 'bg-red-500'
          }`} />
          <span className="text-agri-text">System {systemStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-agri-card border border-agri-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <TrendingUp className="w-4 h-4 text-agri-accent" />
          </div>
          <div className="text-2xl font-light text-agri-text">{systemMetrics.totalUsers.toLocaleString()}</div>
          <div className="text-agri-text/70 text-sm">Total Users</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Code className="w-5 h-5 text-purple-400" />
            <CheckCircle className="w-4 h-4 text-agri-primary" />
          </div>
          <div className="text-2xl font-light text-agri-text">{systemMetrics.totalContracts}</div>
          <div className="text-agri-text/70 text-sm">Smart Contracts</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <TrendingUp className="w-4 h-4 text-agri-accent" />
          </div>
          <div className="text-2xl font-light text-agri-text">{systemMetrics.totalTransactions.toLocaleString()}</div>
          <div className="text-agri-text/70 text-sm">Transactions</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <TrendingUp className="w-4 h-4 text-agri-accent" />
          </div>
          <div className="text-2xl font-light text-agri-text">{systemMetrics.platformRevenue}</div>
          <div className="text-agri-text/70 text-sm">Platform Revenue</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Server className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Server Load</span>
              </div>
              <span className="text-agri-primary">{systemMetrics.systemLoad}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Database Size</span>
              </div>
              <span className="text-agri-primary">{systemMetrics.databaseSize}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Blockchain Sync</span>
              </div>
              <span className="text-agri-primary">{systemMetrics.blockchainSync}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Uptime</span>
              </div>
              <span className="text-agri-primary">{systemMetrics.uptime}</span>
            </div>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {securityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                <div>
                  <div className="text-agri-text text-sm">{log.action}</div>
                  <div className="text-agri-text/70 text-xs">{log.timestamp}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  log.status === 'Success' ? 'bg-agri-primary/20 text-agri-primary' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SmartContracts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Smart Contract Management</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
            <Upload className="w-4 h-4" />
            <span>Deploy Contract</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smartContracts.map((contract) => (
          <div key={contract.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-agri-text">{contract.name}</h3>
                <div className="text-agri-text/70 text-sm font-mono">{contract.address}</div>
              </div>
              <div className="flex space-x-2">
                {contract.verified && <CheckCircle className="w-5 h-5 text-agri-primary" />}
                {contract.paused && <Pause className="w-5 h-5 text-agri-accent" />}
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-agri-text/70">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contract.status === 'Active' ? 'bg-agri-primary/20 text-agri-primary' :
                  contract.status === 'Pending' ? 'bg-agri-accent/20 text-agri-accent' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {contract.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-text/70">Version</span>
                <span className="text-agri-text">{contract.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-text/70">Gas Used</span>
                <span className="text-agri-text">{contract.gasUsed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-text/70">Transactions</span>
                <span className="text-agri-text">{contract.transactions.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedContract(contract)}
                className="flex-1 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <Eye className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => contract.paused ? handleResumeContract(contract.id) : handlePauseContract(contract.id)}
                className="flex-1 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors"
              >
                {contract.paused ? <Play className="w-4 h-4 mx-auto" /> : <Pause className="w-4 h-4 mx-auto" />}
              </button>
              <button className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                <Settings className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Admin Role Management</h2>
        <button
          onClick={handleAddAdmin}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-agri-secondary/20">
              <tr>
                <th className="text-left p-4 text-agri-text/70 font-light">Wallet Address</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Role</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Permissions</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Last Login</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Projects</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((admin) => (
                <tr key={admin.id} className="border-b border-agri-border hover:bg-agri-secondary/10">
                  <td className="p-4 text-agri-text font-mono">{admin.wallet}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      admin.role === 'SuperAdmin' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-agri-primary/20 text-agri-primary'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.map((perm, index) => (
                        <span key={index} className="px-2 py-1 bg-agri-secondary/50 text-agri-text rounded text-xs">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-agri-text/70 text-sm">{admin.lastLogin}</td>
                  <td className="p-4 text-agri-text">{admin.projectsManaged}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Add New Admin</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-agri-text/70 mb-2">Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-agri-text/70 mb-2">Role</label>
              <select className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-purple-400 focus:outline-none">
                <option value="admin">Admin</option>
                <option value="superadmin">SuperAdmin</option>
              </select>
            </div>
            <div>
              <label className="block text-agri-text/70 mb-2">Permissions</label>
              <div className="space-y-2">
                {['View', 'Edit', 'Approve', 'Full Control'].map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-agri-border" />
                    <span className="text-agri-text text-sm">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
              Add Admin
            </button>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Permission Matrix</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-xs text-agri-text/70 font-medium">
              <div>Permission</div>
              <div>Admin</div>
              <div>SuperAdmin</div>
              <div>Owner</div>
            </div>
            {[
              { name: 'View Projects', admin: true, superadmin: true, owner: true },
              { name: 'Edit Projects', admin: true, superadmin: true, owner: true },
              { name: 'Approve Projects', admin: false, superadmin: true, owner: true },
              { name: 'Manage Contracts', admin: false, superadmin: true, owner: true },
              { name: 'Add/Remove Admins', admin: false, superadmin: false, owner: true },
              { name: 'Emergency Controls', admin: false, superadmin: false, owner: true }
            ].map((perm, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 py-2 border-b border-agri-border/30">
                <div className="text-agri-text text-sm">{perm.name}</div>
                <div className="text-center">
                  {perm.admin ? <CheckCircle className="w-4 h-4 text-agri-primary mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}
                </div>
                <div className="text-center">
                  {perm.superadmin ? <CheckCircle className="w-4 h-4 text-agri-primary mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}
                </div>
                <div className="text-center">
                  {perm.owner ? <CheckCircle className="w-4 h-4 text-agri-primary mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Analytics & Reports</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-agri-accent" />
          </div>
          <div className="text-3xl font-light text-agri-text mb-2">8,934</div>
          <div className="text-agri-text/70 text-sm">Total NFTs Sold</div>
          <div className="text-agri-accent text-xs mt-1">+12% this month</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-6 h-6 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-agri-accent" />
          </div>
          <div className="text-3xl font-light text-agri-text mb-2">156</div>
          <div className="text-agri-text/70 text-sm">Active Batches</div>
          <div className="text-agri-accent text-xs mt-1">+8% this month</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-6 h-6 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-agri-accent" />
          </div>
          <div className="text-3xl font-light text-agri-text mb-2">$847K</div>
          <div className="text-agri-text/70 text-sm">ROI Distributed</div>
          <div className="text-agri-accent text-xs mt-1">+25% this month</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-6 h-6 text-purple-400" />
            <CheckCircle className="w-5 h-5 text-agri-primary" />
          </div>
          <div className="text-3xl font-light text-agri-text mb-2">2,847</div>
          <div className="text-agri-text/70 text-sm">Certificates Issued</div>
          <div className="text-agri-primary text-xs mt-1">+18% this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Top Performing Batches</h3>
          <div className="space-y-3">
            {[
              { name: 'Organic Wheat Farm #1', sold: '75/100', revenue: '$37,500' },
              { name: 'Teak Forest Plantation #1', sold: '32/50', revenue: '$64,000' },
              { name: 'Premium Dairy Cattle #1', sold: '45/80', revenue: '$36,000' },
              { name: 'Carbon Offset Trees #2', sold: '120/200', revenue: '$24,000' }
            ].map((batch, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                <div>
                  <div className="text-agri-text font-medium">{batch.name}</div>
                  <div className="text-agri-text/70 text-sm">Sold: {batch.sold}</div>
                </div>
                <div className="text-purple-400 font-medium">{batch.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Platform Revenue Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-agri-text/70">NFT Sales</span>
              <span className="text-agri-text">$1,890,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-agri-text/70">Platform Fees</span>
              <span className="text-agri-text">$122,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-agri-text/70">Resale Royalties</span>
              <span className="text-agri-text">$45,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-agri-text/70">Staking Rewards</span>
              <span className="text-agri-text">$78,900</span>
            </div>
            <div className="border-t border-agri-border pt-3 flex justify-between items-center">
              <span className="text-agri-text font-medium">Total Revenue</span>
              <span className="text-purple-400 font-medium text-lg">$2,136,600</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityCenter = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Security Center</h2>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
            <AlertTriangle className="w-4 h-4" />
            <span>Force Logout All</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Logs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-6 h-6 text-agri-primary" />
            <CheckCircle className="w-5 h-5 text-agri-primary" />
          </div>
          <div className="text-2xl font-light text-agri-text mb-2">156</div>
          <div className="text-agri-text/70 text-sm">Active Sessions</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-6 h-6 text-agri-accent" />
            <Eye className="w-5 h-5 text-agri-accent" />
          </div>
          <div className="text-2xl font-light text-agri-text mb-2">23</div>
          <div className="text-agri-text/70 text-sm">Flagged IPs</div>
        </div>
        <div className="bg-agri-card border border-agri-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Key className="w-6 h-6 text-purple-400" />
            <Lock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-light text-agri-text mb-2">8</div>
          <div className="text-agri-text/70 text-sm">2FA Enabled</div>
        </div>
      </div>

      <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-agri-border">
          <h3 className="text-xl font-medium text-agri-text">Security Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-agri-secondary/20">
              <tr>
                <th className="text-left p-4 text-agri-text/70 font-light">Timestamp</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Action</th>
                <th className="text-left p-4 text-agri-text/70 font-light">User</th>
                <th className="text-left p-4 text-agri-text/70 font-light">IP Address</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Status</th>
                <th className="text-left p-4 text-agri-text/70 font-light">Risk</th>
              </tr>
            </thead>
            <tbody>
              {securityLogs.map((log) => (
                <tr key={log.id} className="border-b border-agri-border hover:bg-agri-secondary/10">
                  <td className="p-4 text-agri-text/70 text-sm">{log.timestamp}</td>
                  <td className="p-4 text-agri-text">{log.action}</td>
                  <td className="p-4 text-agri-text font-mono">{log.user}</td>
                  <td className="p-4 text-agri-text font-mono">{log.ip}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.status === 'Success' ? 'bg-agri-primary/20 text-agri-primary' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.riskLevel === 'Low' ? 'bg-agri-primary/20 text-agri-primary' :
                      log.riskLevel === 'Medium' ? 'bg-agri-accent/20 text-agri-accent' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {log.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SystemHealth = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">System Health Monitor</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Server Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Server className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Server Health</span>
              </div>
              <span className="text-agri-primary">{systemHealth.server.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">CPU Load</span>
              </div>
              <span className="text-agri-accent">{systemHealth.server.load}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MemoryStick className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Memory Usage</span>
              </div>
              <span className="text-agri-primary">{systemHealth.server.memory}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Disk Usage</span>
              </div>
              <span className="text-agri-accent">{systemHealth.server.disk}</span>
            </div>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Database Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Database Health</span>
              </div>
              <span className="text-agri-primary">{systemHealth.database.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Network className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Connections</span>
              </div>
              <span className="text-agri-accent">{systemHealth.database.connections}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Database Size</span>
              </div>
              <span className="text-agri-primary">{systemHealth.database.size}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Queries/min</span>
              </div>
              <span className="text-agri-accent">{systemHealth.database.queries}</span>
            </div>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">Blockchain Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Sync Status</span>
              </div>
              <span className="text-agri-primary">{systemHealth.blockchain.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Layers className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Block Height</span>
              </div>
              <span className="text-agri-accent">{systemHealth.blockchain.blockHeight}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Gas Price</span>
              </div>
              <span className="text-agri-primary">{systemHealth.blockchain.gasPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Network className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Peers</span>
              </div>
              <span className="text-agri-accent">{systemHealth.blockchain.peers}</span>
            </div>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-xl font-medium text-agri-text mb-4">API Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">API Health</span>
              </div>
              <span className="text-agri-primary">{systemHealth.api.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Requests/min</span>
              </div>
              <span className="text-agri-accent">{systemHealth.api.requests}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-agri-primary" />
                <span className="text-agri-text">Latency</span>
              </div>
              <span className="text-agri-primary">{systemHealth.api.latency}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-agri-accent" />
                <span className="text-agri-text">Uptime</span>
              </div>
              <span className="text-agri-accent">{systemHealth.api.uptime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmergencyControls = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Emergency Controls</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            systemStatus === 'online' ? 'bg-agri-primary' : 'bg-red-500'
          }`} />
          <span className="text-agri-text">Platform {systemStatus}</span>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-red-400 mb-2">Emergency Controls</h3>
            <p className="text-agri-text/80 font-light leading-relaxed">
              These controls should only be used in emergency situations. All actions are logged and 
              will immediately affect all platform operations. Use with extreme caution.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-lg font-medium text-agri-text mb-4">Platform Controls</h3>
          <div className="space-y-3">
            <button
              onClick={handleEmergencyPause}
              disabled={systemStatus === 'paused'}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Pause className="w-4 h-4" />
              <span>Emergency Pause</span>
            </button>
            <button
              onClick={handleSystemResume}
              disabled={systemStatus === 'online'}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>Resume Platform</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Maintenance Mode</span>
            </button>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-lg font-medium text-agri-text mb-4">Security Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              <Power className="w-4 h-4" />
              <span>Force Logout All</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span>Reset All 2FA</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
              <Lock className="w-4 h-4" />
              <span>Lock All Wallets</span>
            </button>
          </div>
        </div>

        <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
          <h3 className="text-lg font-medium text-agri-text mb-4">Contract Controls</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              <Pause className="w-4 h-4" />
              <span>Pause All Contracts</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors">
              <Play className="w-4 h-4" />
              <span>Resume All Contracts</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Emergency Upgrade</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
        <h3 className="text-xl font-medium text-agri-text mb-4">Emergency Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-agri-text font-medium mb-2">Technical Team</h4>
            <div className="text-agri-text/70 text-sm space-y-1">
              <div>Email: tech@agriverse.io</div>
              <div>Phone: +1 (555) 123-4567</div>
              <div>Telegram: @agritech</div>
            </div>
          </div>
          <div>
            <h4 className="text-agri-text font-medium mb-2">Legal Team</h4>
            <div className="text-agri-text/70 text-sm space-y-1">
              <div>Email: legal@agriverse.io</div>
              <div>Phone: +1 (555) 234-5678</div>
              <div>Emergency: +1 (555) 911-0000</div>
            </div>
          </div>
          <div>
            <h4 className="text-agri-text font-medium mb-2">Security Team</h4>
            <div className="text-agri-text/70 text-sm space-y-1">
              <div>Email: security@agriverse.io</div>
              <div>Phone: +1 (555) 345-6789</div>
              <div>24/7 Hotline: +1 (555) 999-0000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <SystemOverview />;
      case 'contracts': return <SmartContracts />;
      case 'admins': return <AdminManagement />;
      case 'analytics': return <Analytics />;
      case 'security': return <SecurityCenter />;
      case 'system': return <SystemHealth />;
      case 'emergency': return <EmergencyControls />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="min-h-screen py-20 bg-agri-dark">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 bg-agri-card border border-agri-border rounded-lg text-agri-text hover:text-purple-400 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-light font-outfit text-agri-text">
                <span className="text-purple-400">SuperAdmin</span> Dashboard
              </h1>
              <p className="text-agri-text/70 font-light">Complete platform control and monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              systemStatus === 'online' ? 'bg-agri-primary animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-agri-text text-sm">System {systemStatus}</span>
            <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <motion.div
            className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;