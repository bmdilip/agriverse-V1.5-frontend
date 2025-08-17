import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRBAC } from '../hooks/useRBAC';
import { useAuthStore } from '../store/auth.store';
import { adminApi } from '../api/admin';
import { userApi } from '../api/user';
import { assetsApi } from '../api/assets';
import { certificateApi } from '../api/certificate';
import { kycApi } from '../api/kyc';
import { notificationsApi } from '../api/notifications';
import { syncApi } from '../api/sync';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTable, Column } from '../components/ui/DataTable';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { 
  Crown, 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Database, 
  Award,
  UserCheck,
  UserX,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Bell,
  Lock,
  Unlock,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Building,
  Server,
  Globe,
  Zap,
  Target,
  RefreshCw,
  Search,
  Filter,
  Menu,
  X,
  Copy,
  ExternalLink,
  PlayCircle,
  PauseCircle,
  Save,
  AlertCircle as Warning,
  Key,
  LogOut,
  UserPlus,
  ShieldCheck,
  Code,
  Terminal,
  Wifi,
  WifiOff,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Gauge
} from 'lucide-react';
import toast from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    type: 'warning' as const,
    onConfirm: () => {} 
  });
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    address: '',
    name: '',
    email: '',
    permissions: []
  });

  const { isAuthenticated, isDemoMode, role, address } = useAuth();
  const { can, hasRole } = useRBAC();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Auto-enable demo mode if not authenticated
  useEffect(() => {
    if (!isAuthenticated && import.meta.env.VITE_DEMO_MODE === 'true') {
      useAuthStore.getState().enableDemoMode('superadmin');
    }
  }, [isAuthenticated]);

  // Check access - SuperAdmin only
  const hasAccess = isDemoMode || (isAuthenticated && role === 'superadmin');

  // Fetch dashboard data
  const { data: dashboardStats, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['superadmin-dashboard'],
    queryFn: adminApi.getDashboard,
    enabled: hasAccess,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const { data: usersData, isLoading: usersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['superadmin-users'],
    queryFn: () => adminApi.getUsers({ limit: 100 }),
    enabled: hasAccess
  });

  const { data: adminsData, isLoading: adminsLoading, refetch: refetchAdmins } = useQuery({
    queryKey: ['superadmin-admins'],
    queryFn: () => adminApi.getUsers({ role: 'admin' }),
    enabled: hasAccess
  });

  const { data: projectsData, isLoading: projectsLoading, refetch: refetchProjects } = useQuery({
    queryKey: ['superadmin-projects'],
    queryFn: () => assetsApi.getMarketplace({ limit: 100 }),
    enabled: hasAccess
  });

  const { data: contractsData, isLoading: contractsLoading, refetch: refetchContracts } = useQuery({
    queryKey: ['superadmin-contracts'],
    queryFn: adminApi.getContracts,
    enabled: hasAccess
  });

  const { data: securityLogs, isLoading: logsLoading, refetch: refetchLogs } = useQuery({
    queryKey: ['security-logs'],
    queryFn: () => adminApi.getSecurityLogs({ limit: 50 }),
    enabled: hasAccess
  });

  const { data: systemHealth, isLoading: healthLoading, refetch: refetchHealth } = useQuery({
    queryKey: ['system-health'],
    queryFn: adminApi.getSystemHealth,
    enabled: hasAccess,
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  // Mutations
  const updateUserRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => 
      adminApi.updateUserRole(userId, role),
    onSuccess: async (_, { userId, role }) => {
      toast.success('User role updated successfully');
      
      // Sync across dashboards
      await syncApi.triggerUpdate({
        type: 'role_update',
        userId,
        metadata: { newRole: role }
      });
      
      // Send notification to user
      await notificationsApi.send({
        userId,
        type: 'update',
        title: 'Role Updated',
        message: `Your role has been updated to ${role}`
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
      queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
    }
  });

  const addAdminMutation = useMutation({
    mutationFn: adminApi.addAdmin,
    onSuccess: async (newAdmin) => {
      toast.success('Admin added successfully');
      
      // Send welcome notification
      await notificationsApi.send({
        userId: newAdmin.id,
        type: 'info',
        title: 'Admin Access Granted',
        message: 'You have been granted admin privileges on Agriverse'
      });
      
      setShowAddAdminModal(false);
      setNewAdminData({ address: '', name: '', email: '', permissions: [] });
      refetchAdmins();
    }
  });

  const removeAdminMutation = useMutation({
    mutationFn: adminApi.removeAdmin,
    onSuccess: async (_, adminId) => {
      toast.success('Admin removed successfully');
      
      // Notify removed admin
      await notificationsApi.send({
        userId: adminId,
        type: 'warning',
        title: 'Admin Access Revoked',
        message: 'Your admin privileges have been revoked'
      });
      
      refetchAdmins();
    }
  });

  const approveProjectMutation = useMutation({
    mutationFn: ({ id, type }: { id: string; type: string }) => 
      adminApi.approveItem(id, type),
    onSuccess: async (_, { id }) => {
      toast.success('Project approved successfully');
      
      // Sync across dashboards
      await syncApi.triggerUpdate({
        type: 'project_approval',
        userId: 'all',
        metadata: { projectId: id, status: 'approved' }
      });
      
      refetchProjects();
    }
  });

  const rejectProjectMutation = useMutation({
    mutationFn: ({ id, type, reason }: { id: string; type: string; reason?: string }) => 
      adminApi.rejectItem(id, type, reason),
    onSuccess: async (_, { id }) => {
      toast.success('Project rejected');
      
      // Sync across dashboards
      await syncApi.triggerUpdate({
        type: 'project_approval',
        userId: 'all',
        metadata: { projectId: id, status: 'rejected' }
      });
      
      refetchProjects();
    }
  });

  const pauseContractMutation = useMutation({
    mutationFn: adminApi.pauseContract,
    onSuccess: async (_, contractId) => {
      toast.success('Contract paused successfully');
      refetchContracts();
    }
  });

  const resumeContractMutation = useMutation({
    mutationFn: adminApi.resumeContract,
    onSuccess: async (_, contractId) => {
      toast.success('Contract resumed successfully');
      refetchContracts();
    }
  });

  const forceLogoutAllMutation = useMutation({
    mutationFn: adminApi.forceLogoutAll,
    onSuccess: () => {
      toast.success('All users logged out successfully');
    }
  });

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-agri-text mb-4">SuperAdmin Access Required</h2>
          <p className="text-agri-text/70 mb-6">Only SuperAdmin users can access this dashboard</p>
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

  const stats = dashboardStats || {
    totalUsers: 2847,
    totalAdmins: 12,
    totalSuperAdmins: 3,
    pendingProjects: 23,
    pendingKYC: 15,
    totalInvestments: 4250000,
    activeProjects: 156,
    totalNFTs: 8934,
    platformRevenue: 122500,
    contractsDeployed: 8,
    systemHealth: 'healthy' as const,
    uptime: 99.9
  };

  const users = usersData?.users || [];
  const admins = adminsData?.users || [];
  const projects = projectsData?.assets || [];
  const contracts = contractsData || [];
  const logs = securityLogs || [];
  const health = systemHealth || {
    status: 'healthy' as const,
    uptime: 99.9,
    services: {
      api: 'online' as const,
      database: 'online' as const,
      blockchain: 'online' as const,
      ipfs: 'online' as const
    },
    metrics: {
      responseTime: 120,
      errorRate: 0.1,
      throughput: 1250
    }
  };

  // User Management
  const userColumns: Column<any>[] = [
    {
      key: 'address',
      label: 'Address',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="font-mono text-sm">{value.slice(0, 6)}...{value.slice(-4)}</div>
          <button onClick={() => navigator.clipboard.writeText(value)}>
            <Copy className="w-3 h-3 text-agri-text/50 hover:text-agri-primary" />
          </button>
        </div>
      )
    },
    {
      key: 'profile',
      label: 'Name',
      render: (value) => value?.name || 'Anonymous'
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'superadmin' ? 'bg-purple-500/20 text-purple-400' :
          value === 'admin' ? 'bg-agri-primary/20 text-agri-primary' :
          'bg-agri-secondary/50 text-agri-text/70'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'stats',
      label: 'Invested',
      render: (value) => `$${value?.totalInvested?.toLocaleString() || '0'}`
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value ? 'bg-agri-primary/20 text-agri-primary' : 'bg-red-500/20 text-red-400'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Never'
    }
  ];

  const adminColumns: Column<any>[] = [
    {
      key: 'address',
      label: 'Address',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="font-mono text-sm">{value.slice(0, 6)}...{value.slice(-4)}</div>
          <button onClick={() => navigator.clipboard.writeText(value)}>
            <Copy className="w-3 h-3 text-agri-text/50 hover:text-agri-primary" />
          </button>
        </div>
      )
    },
    {
      key: 'profile',
      label: 'Name',
      render: (value) => value?.name || 'Admin User'
    },
    {
      key: 'permissions',
      label: 'Permissions',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {(value || []).slice(0, 2).map((perm, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-agri-accent/20 text-agri-accent rounded text-xs">
              {perm.replace('_', ' ')}
            </span>
          ))}
          {(value || []).length > 2 && (
            <span className="text-agri-text/70 text-xs">+{(value || []).length - 2} more</span>
          )}
        </div>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Active',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Never'
    }
  ];

  const contractColumns: Column<any>[] = [
    {
      key: 'name',
      label: 'Contract',
      render: (value, row) => (
        <div>
          <div className="text-agri-text font-medium">{value}</div>
          <div className="text-agri-text/70 text-sm">{row.type}</div>
        </div>
      )
    },
    {
      key: 'address',
      label: 'Address',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="font-mono text-sm">{value.slice(0, 8)}...{value.slice(-6)}</div>
          <button onClick={() => navigator.clipboard.writeText(value)}>
            <Copy className="w-3 h-3 text-agri-text/50 hover:text-agri-primary" />
          </button>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-agri-primary/20 text-agri-primary' :
          value === 'paused' ? 'bg-agri-accent/20 text-agri-accent' :
          'bg-red-500/20 text-red-400'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'version',
      label: 'Version',
      render: (value) => <span className="font-mono text-sm">{value}</span>
    },
    {
      key: 'transactions',
      label: 'Transactions',
      render: (value) => value?.toLocaleString() || '0'
    }
  ];

  const handleUpdateUserRole = (user: any, newRole: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Update User Role',
      message: `Change ${user.profile?.name || user.address} role from ${user.role} to ${newRole}?`,
      type: 'warning',
      onConfirm: () => {
        updateUserRoleMutation.mutate({ userId: user.id, role: newRole });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRemoveAdmin = (admin: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Admin',
      message: `Remove admin privileges from ${admin.profile?.name || admin.address}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        removeAdminMutation.mutate(admin.id);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleApproveProject = (project: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Approve Project',
      message: `Approve "${project.name}" for public listing?`,
      type: 'info',
      onConfirm: () => {
        approveProjectMutation.mutate({ id: project.id, type: 'project' });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRejectProject = (project: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Reject Project',
      message: `Reject "${project.name}"? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        rejectProjectMutation.mutate({ id: project.id, type: 'project', reason: 'Rejected by SuperAdmin' });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handlePauseContract = (contract: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Pause Contract',
      message: `Pause "${contract.name}" contract? This will disable all related functionality.`,
      type: 'warning',
      onConfirm: () => {
        pauseContractMutation.mutate(contract.id);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleResumeContract = (contract: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Resume Contract',
      message: `Resume "${contract.name}" contract? This will re-enable all related functionality.`,
      type: 'info',
      onConfirm: () => {
        resumeContractMutation.mutate(contract.id);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleForceLogoutAll = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Force Logout All Users',
      message: 'This will immediately log out all users from the platform. Are you sure?',
      type: 'danger',
      onConfirm: () => {
        forceLogoutAllMutation.mutate();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleAddAdmin = () => {
    if (!newAdminData.address || !newAdminData.name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    addAdminMutation.mutate({
      address: newAdminData.address,
      name: newAdminData.name,
      email: newAdminData.email,
      permissions: newAdminData.permissions
    });
  };

  const userActions = {
    edit: (user: any) => setSelectedUser(user),
    view: (user: any) => setSelectedUser(user)
  };

  const adminActions = {
    edit: (admin: any) => setSelectedAdmin(admin),
    delete: (admin: any) => handleRemoveAdmin(admin)
  };

  const projectActions = {
    view: (project: any) => console.log('View project:', project)
  };

  const contractActions = {
    view: (contract: any) => setSelectedContract(contract)
  };

  const AddAdminModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-agri-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-agri-card border border-agri-border rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-agri-text">Add New Admin</h3>
          <button
            onClick={() => setShowAddAdminModal(false)}
            className="text-agri-text/70 hover:text-agri-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-agri-text/70 mb-2">Wallet Address *</label>
            <input
              type="text"
              value={newAdminData.address}
              onChange={(e) => setNewAdminData({...newAdminData, address: e.target.value})}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-agri-text/70 mb-2">Name *</label>
            <input
              type="text"
              value={newAdminData.name}
              onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})}
              placeholder="Admin name"
              className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-agri-text/70 mb-2">Email</label>
            <input
              type="email"
              value={newAdminData.email}
              onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleAddAdmin}
              disabled={addAdminMutation.isPending}
              className="flex-1 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors disabled:opacity-50"
            >
              {addAdminMutation.isPending ? 'Adding...' : 'Add Admin'}
            </button>
            <button
              onClick={() => setShowAddAdminModal(false)}
              className="flex-1 py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-agri-dark">
      {/* Header */}
      <div className="bg-agri-card border-b border-agri-border p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-agri-text">SuperAdmin Dashboard</h1>
                <p className="text-agri-text/70 text-sm">Platform Owner - Complete System Control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* System Health Indicator */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                health.status === 'healthy' ? 'bg-agri-primary/20 text-agri-primary' :
                health.status === 'warning' ? 'bg-agri-accent/20 text-agri-accent' :
                'bg-red-500/20 text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  health.status === 'healthy' ? 'bg-agri-primary animate-pulse' :
                  health.status === 'warning' ? 'bg-agri-accent animate-pulse' :
                  'bg-red-400 animate-pulse'
                }`} />
                <span className="text-sm">System {health.status}</span>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-purple-400 font-medium">{stats.totalUsers}</div>
                  <div className="text-agri-text/70">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-agri-primary font-medium">{stats.totalAdmins}</div>
                  <div className="text-agri-text/70">Admins</div>
                </div>
                <div className="text-center">
                  <div className="text-agri-accent font-medium">{stats.pendingProjects}</div>
                  <div className="text-agri-text/70">Pending</div>
                </div>
              </div>
              
              {/* SuperAdmin Identity */}
              <div className="flex items-center space-x-2 bg-agri-secondary/20 rounded-lg px-3 py-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-agri-text font-mono text-sm">
                  {isDemoMode ? 'DEMO OWNER' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
              </div>
              
              <button 
                onClick={() => refetchHealth()}
                className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* System Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-purple-400 mr-2" />
                <span className="text-agri-text/70 text-sm">Total Users</span>
              </div>
              <button onClick={() => setActiveTab('users')} className="text-purple-400 hover:text-purple-300">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-light text-purple-400">{stats.totalUsers}</div>
            <div className="text-agri-text/60 text-sm mt-1">+12% this month</div>
          </div>
          
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">Active Admins</span>
              </div>
              <button onClick={() => setActiveTab('admins')} className="text-agri-primary hover:text-agri-primary/80">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-light text-agri-primary">{stats.totalAdmins}</div>
            <div className="text-agri-text/60 text-sm mt-1">{stats.totalSuperAdmins} SuperAdmins</div>
          </div>
          
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-agri-accent mr-2" />
                <span className="text-agri-text/70 text-sm">Pending Approvals</span>
              </div>
              <button onClick={() => setActiveTab('projects')} className="text-agri-accent hover:text-agri-accent/80">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-light text-agri-accent">{stats.pendingProjects}</div>
            <div className="text-agri-text/60 text-sm mt-1">{stats.pendingKYC} KYC pending</div>
          </div>
          
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Database className="w-6 h-6 text-agri-primary mr-2" />
                <span className="text-agri-text/70 text-sm">Smart Contracts</span>
              </div>
              <button onClick={() => setActiveTab('contracts')} className="text-agri-primary hover:text-agri-primary/80">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-light text-agri-primary">{stats.contractsDeployed}</div>
            <div className="text-agri-text/60 text-sm mt-1">{health.uptime}% uptime</div>
          </div>
        </motion.div>

        {/* System Health Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-agri-text">System Health</h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-agri-text/70">
                Response Time: <span className="text-agri-primary">{health.metrics.responseTime}ms</span>
              </div>
              <div className="text-sm text-agri-text/70">
                Error Rate: <span className="text-agri-accent">{health.metrics.errorRate}%</span>
              </div>
              <button
                onClick={() => refetchHealth()}
                className="p-1 text-agri-text/70 hover:text-agri-primary"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(health.services).map(([service, status]) => (
              <div key={service} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  {service === 'api' && <Server className="w-4 h-4 text-agri-primary" />}
                  {service === 'database' && <Database className="w-4 h-4 text-agri-primary" />}
                  {service === 'blockchain' && <Network className="w-4 h-4 text-agri-primary" />}
                  {service === 'ipfs' && <Globe className="w-4 h-4 text-agri-primary" />}
                  <span className="text-agri-text text-sm capitalize">{service}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  status === 'online' ? 'bg-agri-primary/20 text-agri-primary' :
                  status === 'degraded' ? 'bg-agri-accent/20 text-agri-accent' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'admins', label: 'Admins', icon: Shield },
            { id: 'projects', label: 'Projects', icon: Building },
            { id: 'contracts', label: 'Smart Contracts', icon: Database },
            { id: 'kyc', label: 'KYC', icon: FileText },
            { id: 'security', label: 'Security', icon: ShieldCheck },
            { id: 'reports', label: 'Reports', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-light transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-agri-card border border-agri-border text-agri-text hover:border-purple-500/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Platform Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Platform Revenue</h3>
                  <div className="text-3xl font-light text-agri-primary mb-2">
                    ${(stats.platformRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-agri-text/70 text-sm">+15% this month</div>
                </div>
                
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Total Investments</h3>
                  <div className="text-3xl font-light text-agri-accent mb-2">
                    ${(stats.totalInvestments / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-agri-text/70 text-sm">Across {stats.activeProjects} projects</div>
                </div>
                
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">NFTs Minted</h3>
                  <div className="text-3xl font-light text-agri-primary mb-2">
                    {(stats.totalNFTs / 1000).toFixed(1)}K
                  </div>
                  <div className="text-agri-text/70 text-sm">Active marketplace</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-6">Recent System Activity</h3>
                <div className="space-y-4">
                  {logs.slice(0, 5).map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-agri-secondary/20 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          log.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          log.severity === 'high' ? 'bg-agri-accent/20 text-agri-accent' :
                          'bg-agri-primary/20 text-agri-primary'
                        }`}>
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-agri-text font-medium">{log.action}</div>
                          <div className="text-agri-text/70 text-sm">
                            by {log.userAddress?.slice(0, 6)}...{log.userAddress?.slice(-4)}
                          </div>
                        </div>
                      </div>
                      <div className="text-agri-text/70 text-sm">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">User Management</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => refetchUsers()}
                    className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Users</span>
                  </button>
                </div>
              </div>

              <DataTable
                data={users}
                columns={userColumns}
                loading={usersLoading}
                searchable
                exportable
                actions={userActions}
                emptyMessage="No users found"
              />

              {/* Quick Role Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Promote to Admin</h3>
                  <p className="text-agri-text/70 text-sm mb-4">Grant admin privileges to selected users</p>
                  <button className="w-full py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors">
                    <UserCheck className="w-4 h-4 mr-2 inline" />
                    Bulk Promote
                  </button>
                </div>
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">Deactivate Users</h3>
                  <p className="text-agri-text/70 text-sm mb-4">Temporarily disable user accounts</p>
                  <button className="w-full py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
                    <UserX className="w-4 h-4 mr-2 inline" />
                    Bulk Deactivate
                  </button>
                </div>
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-agri-text mb-4">User Analytics</h3>
                  <p className="text-agri-text/70 text-sm mb-4">View detailed user statistics</p>
                  <button 
                    onClick={() => setActiveTab('reports')}
                    className="w-full py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 inline" />
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admins Tab */}
          {activeTab === 'admins' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Admin Management</h2>
                <button
                  onClick={() => setShowAddAdminModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Admin</span>
                </button>
              </div>

              <DataTable
                data={admins}
                columns={adminColumns}
                loading={adminsLoading}
                searchable
                exportable
                actions={adminActions}
                emptyMessage="No admins found"
              />

              {/* Admin Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins.slice(0, 6).map((admin) => (
                  <div key={admin.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center">
                          {admin.role === 'superadmin' ? 
                            <Crown className="w-5 h-5 text-purple-400" /> : 
                            <Shield className="w-5 h-5 text-agri-primary" />
                          }
                        </div>
                        <div>
                          <h3 className="text-agri-text font-medium">{admin.profile?.name || 'Admin User'}</h3>
                          <p className="text-agri-text/70 text-sm font-mono">{admin.address.slice(0, 10)}...</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        admin.role === 'superadmin' ? 'bg-purple-500/20 text-purple-400' : 'bg-agri-primary/20 text-agri-primary'
                      }`}>
                        {admin.role}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Last Active:</span>
                        <span className="text-agri-text">{admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Permissions:</span>
                        <span className="text-agri-primary">{admin.permissions?.length || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedAdmin(admin)}
                        className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4 mr-1 inline" />
                        Edit
                      </button>
                      {admin.role !== 'superadmin' && (
                        <button 
                          onClick={() => handleRemoveAdmin(admin)}
                          className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                        >
                          <UserX className="w-4 h-4 mr-1 inline" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Project Approval</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span>Bulk Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Flag Review</span>
                  </button>
                </div>
              </div>

              {/* Project Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 6).map((project) => (
                  <div key={project.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-agri-text">{project.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            project.status === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
                            project.status === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
                            'bg-agri-secondary/50 text-agri-text/70'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-agri-text/70">Type:</span>
                            <span className="text-agri-text ml-1">{project.assetType}</span>
                          </div>
                          <div>
                            <span className="text-agri-text/70">ROI:</span>
                            <span className="text-agri-primary ml-1">{project.roi}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproveProject(project)}
                        className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1 inline" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectProject(project)}
                        className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1 inline" />
                        Reject
                      </button>
                      <button className="py-2 px-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Contracts Tab */}
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Smart Contract Management</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh Status</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Deploy Contract</span>
                  </button>
                </div>
              </div>

              <DataTable
                data={contracts}
                columns={contractColumns}
                loading={contractsLoading}
                searchable
                exportable
                actions={contractActions}
                emptyMessage="No contracts found"
              />

              {/* Contract Control Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contracts.slice(0, 6).map((contract) => (
                  <div key={contract.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contract.status === 'active' ? 'bg-agri-primary/20 text-agri-primary' :
                          contract.status === 'paused' ? 'bg-agri-accent/20 text-agri-accent' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          <Database className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-agri-text font-medium">{contract.name}</h3>
                          <p className="text-agri-text/70 text-sm">{contract.type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contract.status === 'active' ? 'bg-agri-primary/20 text-agri-primary' :
                        contract.status === 'paused' ? 'bg-agri-accent/20 text-agri-accent' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {contract.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-agri-text/70">Version:</span>
                        <span className="text-agri-text font-mono">{contract.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-agri-text/70">Transactions:</span>
                        <span className="text-agri-text">{contract.transactions?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-agri-text/70">Gas Used:</span>
                        <span className="text-agri-text">{contract.gasUsed?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {contract.status === 'active' ? (
                        <button
                          onClick={() => handlePauseContract(contract)}
                          className="flex-1 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors text-sm"
                        >
                          <PauseCircle className="w-4 h-4 mr-1 inline" />
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResumeContract(contract)}
                          className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm"
                        >
                          <PlayCircle className="w-4 h-4 mr-1 inline" />
                          Resume
                        </button>
                      )}
                      <button className="py-2 px-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="py-2 px-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Security Center</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleForceLogoutAll}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Force Logout All</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Logs</span>
                  </button>
                </div>
              </div>

              {/* Security Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
                  <ShieldCheck className="w-8 h-8 text-agri-primary mx-auto mb-3" />
                  <div className="text-2xl font-light text-agri-primary">100%</div>
                  <div className="text-agri-text/70 text-sm">Security Score</div>
                </div>
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
                  <Activity className="w-8 h-8 text-agri-accent mx-auto mb-3" />
                  <div className="text-2xl font-light text-agri-accent">{logs.length}</div>
                  <div className="text-agri-text/70 text-sm">Security Events</div>
                </div>
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
                  <Users className="w-8 h-8 text-agri-primary mx-auto mb-3" />
                  <div className="text-2xl font-light text-agri-primary">1,247</div>
                  <div className="text-agri-text/70 text-sm">Active Sessions</div>
                </div>
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-agri-accent mx-auto mb-3" />
                  <div className="text-2xl font-light text-agri-accent">0</div>
                  <div className="text-agri-text/70 text-sm">Flagged IPs</div>
                </div>
              </div>

              {/* Security Logs */}
              <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-agri-border">
                  <h3 className="text-xl font-medium text-agri-text">Security Logs</h3>
                </div>
                <div className="divide-y divide-agri-border max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="p-4 hover:bg-agri-secondary/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            log.severity === 'high' ? 'bg-agri-accent/20 text-agri-accent' :
                            log.severity === 'medium' ? 'bg-agri-primary/20 text-agri-primary' :
                            'bg-agri-secondary/50 text-agri-text'
                          }`}>
                            <Activity className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-agri-text font-medium">{log.action}</div>
                            <div className="text-agri-text/70 text-sm">
                              {log.userAddress?.slice(0, 6)}...{log.userAddress?.slice(-4)} • {log.ipAddress}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-agri-text/70 text-sm">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            log.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            log.severity === 'high' ? 'bg-agri-accent/20 text-agri-accent' :
                            'bg-agri-primary/20 text-agri-primary'
                          }`}>
                            {log.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-agri-text">Global Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">Platform Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text">Maintenance Mode</span>
                      <button className="w-12 h-6 bg-agri-secondary rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text">New User Registration</span>
                      <button className="w-12 h-6 bg-agri-primary rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text">KYC Required</span>
                      <button className="w-12 h-6 bg-agri-primary rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-agri-text">Emergency Mode</span>
                      <button className="w-12 h-6 bg-agri-secondary rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">API Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-agri-text/70 mb-2">API Base URL</label>
                      <input
                        type="text"
                        defaultValue="https://api.agriverse.io"
                        className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-agri-text/70 mb-2">Rate Limit (req/min)</label>
                      <input
                        type="number"
                        defaultValue="1000"
                        className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-agri-text/70 mb-2">Max File Size (MB)</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                      />
                    </div>
                    <button className="w-full py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                      <Save className="w-4 h-4 mr-2 inline" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>

              {/* Emergency Controls */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-medium text-red-400 mb-4">Emergency Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleForceLogoutAll}
                    className="flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Force Logout All</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    <PauseCircle className="w-4 h-4" />
                    <span>Pause Platform</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Emergency Stop</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Platform Reports</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'User Analytics', description: 'User growth and engagement metrics', icon: Users, data: `${stats.totalUsers} users` },
                  { title: 'Financial Report', description: 'Revenue, investments, and ROI data', icon: DollarSign, data: `$${(stats.totalInvestments / 1000000).toFixed(1)}M volume` },
                  { title: 'Project Performance', description: 'Project success rates and metrics', icon: BarChart3, data: `${stats.activeProjects} projects` },
                  { title: 'Carbon Impact', description: 'Environmental impact and offset data', icon: TreePine, data: `${stats.carbonOffset} tons CO₂` },
                  { title: 'Security Audit', description: 'Security events and compliance', icon: Shield, data: `${health.uptime}% uptime` },
                  { title: 'API Usage', description: 'API calls and performance metrics', icon: Server, data: `${health.metrics.throughput} req/min` }
                ].map((report, index) => (
                  <div key={index} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <report.icon className="w-8 h-8 text-agri-primary mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-agri-text">{report.title}</h3>
                        <p className="text-agri-text/70 text-sm">{report.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-light text-agri-primary mb-4">{report.data}</div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm">
                        <Eye className="w-4 h-4 mr-1 inline" />
                        View
                      </button>
                      <button className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors text-sm">
                        <Download className="w-4 h-4 mr-1 inline" />
                        Export
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* System Status Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-agri-card border border-agri-border rounded-2xl p-6"
        >
          <h3 className="text-xl font-medium text-agri-text mb-6">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Server className="w-6 h-6 text-agri-primary" />
              </div>
              <div className="text-agri-primary font-medium">{health.uptime}%</div>
              <div className="text-agri-text/70 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-agri-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-agri-accent" />
              </div>
              <div className="text-agri-accent font-medium">2.4TB</div>
              <div className="text-agri-text/70 text-sm">Data Stored</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-agri-primary" />
              </div>
              <div className="text-agri-primary font-medium">{health.metrics.throughput}</div>
              <div className="text-agri-text/70 text-sm">Req/Min</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-agri-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gauge className="w-6 h-6 text-agri-accent" />
              </div>
              <div className="text-agri-accent font-medium">{health.metrics.responseTime}ms</div>
              <div className="text-agri-text/70 text-sm">Response Time</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && <AddAdminModal />}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        loading={
          updateUserRoleMutation.isPending || 
          addAdminMutation.isPending || 
          removeAdminMutation.isPending ||
          approveProjectMutation.isPending || 
          rejectProjectMutation.isPending ||
          pauseContractMutation.isPending ||
          resumeContractMutation.isPending ||
          forceLogoutAllMutation.isPending
        }
      />
    </div>
  );
};

export default SuperAdminDashboard;