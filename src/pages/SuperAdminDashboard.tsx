import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/auth.store';
import { adminApi } from '../api/admin';
import { userApi } from '../api/user';
import { assetsApi } from '../api/assets';
import { certificateApi } from '../api/certificate';
import { kycApi } from '../api/kyc';
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
  AlertCircle as Warning
} from 'lucide-react';
import toast from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const { isAuthenticated, isDemoMode, role, address } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Auto-enable demo mode if not authenticated
  useEffect(() => {
    if (!isAuthenticated && import.meta.env.VITE_DEMO_MODE === 'true') {
      useAuthStore.getState().enableDemoMode('superadmin');
    }
  }, [isAuthenticated]);

  // Check access
  const hasAccess = isDemoMode || (isAuthenticated && role === 'superadmin');

  // Fetch dashboard data
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['superadmin-dashboard'],
    queryFn: adminApi.getDashboard,
    enabled: hasAccess
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['superadmin-users'],
    queryFn: () => adminApi.getUsers({ limit: 100 }),
    enabled: hasAccess
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['superadmin-projects'],
    queryFn: () => assetsApi.getMarketplace({ limit: 100 }),
    enabled: hasAccess
  });

  const { data: pendingApprovals, isLoading: approvalsLoading } = useQuery({
    queryKey: ['pending-approvals'],
    queryFn: adminApi.getPendingApprovals,
    enabled: hasAccess
  });

  // Mutations
  const updateUserRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => 
      adminApi.updateUserRole(userId, role),
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
    }
  });

  const approveItemMutation = useMutation({
    mutationFn: ({ id, type }: { id: string; type: string }) => 
      adminApi.approveItem(id, type),
    onSuccess: () => {
      toast.success('Item approved successfully');
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
    }
  });

  const rejectItemMutation = useMutation({
    mutationFn: ({ id, type, reason }: { id: string; type: string; reason?: string }) => 
      adminApi.rejectItem(id, type, reason),
    onSuccess: () => {
      toast.success('Item rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
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
    pendingProjects: 23,
    pendingKYC: 15,
    totalInvestments: 4250000,
    activeProjects: 156,
    totalNFTs: 8934,
    platformRevenue: 122500
  };

  const users = usersData?.users || [];
  const projects = projectsData?.assets || [];

  // User Management
  const userColumns: Column<any>[] = [
    {
      key: 'address',
      label: 'Address',
      render: (value) => (
        <div className="font-mono text-sm">
          {value.slice(0, 6)}...{value.slice(-4)}
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
    }
  ];

  const projectColumns: Column<any>[] = [
    {
      key: 'name',
      label: 'Project',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <img src={row.image} alt={value} className="w-8 h-8 rounded object-cover" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'assetType',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
          value === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
          'bg-agri-secondary/50 text-agri-text/70'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (value) => `$${value?.toLocaleString()}`
    },
    {
      key: 'roi',
      label: 'ROI',
      render: (value) => `${value}%`
    }
  ];

  const handleUpdateUserRole = (user: any, newRole: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Update User Role',
      message: `Change ${user.profile?.name || user.address} role from ${user.role} to ${newRole}?`,
      onConfirm: () => {
        updateUserRoleMutation.mutate({ userId: user.id, role: newRole });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleApproveProject = (project: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Approve Project',
      message: `Approve "${project.name}" for public listing?`,
      onConfirm: () => {
        approveItemMutation.mutate({ id: project.id, type: 'project' });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRejectProject = (project: any) => {
    setConfirmModal({
      isOpen: true,
      title: 'Reject Project',
      message: `Reject "${project.name}"? This action cannot be undone.`,
      onConfirm: () => {
        rejectItemMutation.mutate({ id: project.id, type: 'project', reason: 'Rejected by SuperAdmin' });
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const userActions = {
    edit: (user: any) => setSelectedUser(user)
  };

  const projectActions = {
    view: (project: any) => setSelectedProject(project)
  };

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
                <p className="text-agri-text/70 text-sm">Complete system control and analytics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
              
              <div className="flex items-center space-x-2 bg-agri-secondary/20 rounded-lg px-3 py-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-agri-text font-mono text-sm">
                  {isDemoMode ? 'DEMO MODE' : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </span>
              </div>
              
              <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-agri-text/70 text-sm">Total Users</span>
            </div>
            <div className="text-3xl font-light text-purple-400">{stats.totalUsers}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Shield className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Total Admins</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">{stats.totalAdmins}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Pending Projects</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">{stats.pendingProjects}</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <FileText className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Pending KYC</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">{stats.pendingKYC}</div>
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
            { id: 'users', label: 'Users', icon: Users },
            { id: 'admins', label: 'Admins', icon: Shield },
            { id: 'projects', label: 'Projects', icon: BarChart3 },
            { id: 'kyc', label: 'KYC', icon: FileText },
            { id: 'contracts', label: 'Smart Contracts', icon: Database },
            { id: 'audit', label: 'Audit Logs', icon: Activity },
            { id: 'reports', label: 'Reports', icon: TrendingUp }
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
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">User Management</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
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
                  <button className="w-full py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
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
                <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Admin</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.filter(user => user.role === 'admin' || user.role === 'superadmin').map((admin, index) => (
                  <div key={admin.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center">
                          {admin.role === 'superadmin' ? <Crown className="w-5 h-5 text-purple-400" /> : <Shield className="w-5 h-5 text-agri-primary" />}
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
                        <span className="text-agri-text">2 hours ago</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Permissions:</span>
                        <span className="text-agri-primary">Full Access</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors text-sm">
                        <Edit className="w-4 h-4 mr-1 inline" />
                        Edit
                      </button>
                      {admin.role !== 'superadmin' && (
                        <button 
                          onClick={() => handleUpdateUserRole(admin, 'user')}
                          className="flex-1 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors text-sm"
                        >
                          <UserX className="w-4 h-4 mr-1 inline" />
                          Demote
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

              <DataTable
                data={projects}
                columns={projectColumns}
                loading={projectsLoading}
                searchable
                exportable
                actions={projectActions}
                emptyMessage="No projects found"
              />

              {/* Project Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 4).map((project) => (
                  <div key={project.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-agri-text">{project.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
                        project.status === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
                        'bg-agri-secondary/50 text-agri-text/70'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-agri-text/70">Type:</span>
                        <span className="text-agri-text ml-1">{project.assetType}</span>
                      </div>
                      <div>
                        <span className="text-agri-text/70">ROI:</span>
                        <span className="text-agri-primary ml-1">{project.roi}%</span>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === 'kyc' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">KYC Verification</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span>Bulk Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export KYC</span>
                  </button>
                </div>
              </div>

              <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                <h3 className="text-xl font-medium text-agri-text mb-6">Pending KYC Submissions</h3>
                <div className="space-y-4">
                  {[
                    { id: 1, user: '0x1234...5678', name: 'John Doe', submitted: '2 hours ago', documents: 3 },
                    { id: 2, user: '0x9876...4321', name: 'Jane Smith', submitted: '1 day ago', documents: 4 },
                    { id: 3, user: '0x5555...7777', name: 'Bob Wilson', submitted: '3 days ago', documents: 2 }
                  ].map((kyc) => (
                    <div key={kyc.id} className="flex items-center justify-between p-4 bg-agri-secondary/20 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-agri-accent/20 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-agri-accent" />
                        </div>
                        <div>
                          <h4 className="text-agri-text font-medium">{kyc.name}</h4>
                          <p className="text-agri-text/70 text-sm font-mono">{kyc.user}</p>
                          <p className="text-agri-text/60 text-xs">{kyc.documents} documents • {kyc.submitted}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm">
                          <CheckCircle className="w-4 h-4 mr-1 inline" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
                          <AlertTriangle className="w-4 h-4 mr-1 inline" />
                          Reject
                        </button>
                        <button className="px-3 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Smart Contracts Tab */}
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Smart Contract Management</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Deploy Contract</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'NFT Contract', address: '0x1234...5678', status: 'Active', version: 'v2.1' },
                  { name: 'Vault Contract', address: '0x9876...4321', status: 'Active', version: 'v1.8' },
                  { name: 'Token Contract', address: '0x5555...7777', status: 'Active', version: 'v3.2' },
                  { name: 'Staking Contract', address: '0x3333...9999', status: 'Pending', version: 'v1.0' }
                ].map((contract, index) => (
                  <div key={index} className="bg-agri-card border border-agri-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-agri-text">{contract.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contract.status === 'Active' ? 'bg-agri-primary/20 text-agri-primary' : 'bg-agri-accent/20 text-agri-accent'
                      }`}>
                        {contract.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Address:</span>
                        <span className="text-agri-text font-mono">{contract.address}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-agri-text/70">Version:</span>
                        <span className="text-agri-text">{contract.version}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors text-sm">
                        <Eye className="w-4 h-4 mr-1 inline" />
                        View
                      </button>
                      <button className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm">
                        <Settings className="w-4 h-4 mr-1 inline" />
                        Config
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-light text-agri-text">Audit Logs</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Logs</span>
                  </button>
                </div>
              </div>

              <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-agri-border">
                  <h3 className="text-xl font-medium text-agri-text">System Activity</h3>
                </div>
                <div className="divide-y divide-agri-border">
                  {[
                    { action: 'User Role Updated', user: '0x1234...5678', admin: 'SuperAdmin', time: '2 minutes ago', type: 'role' },
                    { action: 'Project Approved', user: '0x9876...4321', admin: 'Admin', time: '1 hour ago', type: 'approval' },
                    { action: 'KYC Rejected', user: '0x5555...7777', admin: 'Admin', time: '3 hours ago', type: 'kyc' },
                    { action: 'Contract Deployed', user: 'System', admin: 'SuperAdmin', time: '1 day ago', type: 'contract' }
                  ].map((log, index) => (
                    <div key={index} className="p-4 hover:bg-agri-secondary/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.type === 'role' ? 'bg-purple-500/20 text-purple-400' :
                            log.type === 'approval' ? 'bg-agri-primary/20 text-agri-primary' :
                            log.type === 'kyc' ? 'bg-agri-accent/20 text-agri-accent' :
                            'bg-agri-secondary/50 text-agri-text'
                          }`}>
                            {log.type === 'role' && <Users className="w-4 h-4" />}
                            {log.type === 'approval' && <CheckCircle className="w-4 h-4" />}
                            {log.type === 'kyc' && <FileText className="w-4 h-4" />}
                            {log.type === 'contract' && <Database className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-agri-text font-medium">{log.action}</div>
                            <div className="text-agri-text/70 text-sm">by {log.admin} • {log.user}</div>
                          </div>
                        </div>
                        <div className="text-agri-text/70 text-sm">{log.time}</div>
                      </div>
                    </div>
                  ))}
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
                  { title: 'User Analytics', description: 'User growth and engagement metrics', icon: Users, data: '2,847 users' },
                  { title: 'Financial Report', description: 'Revenue, investments, and ROI data', icon: DollarSign, data: '$4.2M volume' },
                  { title: 'Project Performance', description: 'Project success rates and metrics', icon: BarChart3, data: '156 projects' },
                  { title: 'Carbon Impact', description: 'Environmental impact and offset data', icon: Leaf, data: '1,247 tons CO₂' },
                  { title: 'Security Audit', description: 'Security events and compliance', icon: Shield, data: '99.8% uptime' },
                  { title: 'API Usage', description: 'API calls and performance metrics', icon: Server, data: '2.4M requests' }
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
                  </div>
                </div>

                <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-agri-text mb-4">API Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-agri-text/70 mb-2">API Base URL</label>
                      <input
                        type="text"
                        value="https://api.agriverse.io"
                        className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-agri-text/70 mb-2">Rate Limit (req/min)</label>
                      <input
                        type="number"
                        value="1000"
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
            </div>
          )}
        </motion.div>

        {/* System Status */}
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
              <div className="text-agri-primary font-medium">99.9%</div>
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
              <div className="text-agri-primary font-medium">847K</div>
              <div className="text-agri-text/70 text-sm">API Calls/Day</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-agri-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-agri-accent" />
              </div>
              <div className="text-agri-accent font-medium">100%</div>
              <div className="text-agri-text/70 text-sm">Security Score</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        loading={updateUserRoleMutation.isPending || approveItemMutation.isPending || rejectItemMutation.isPending}
      />
    </div>
  );
};

export default SuperAdminDashboard;