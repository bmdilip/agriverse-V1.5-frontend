import httpClient from './http';
import { mockAdminStats, mockUsers, USE_MOCK_DATA, createMockResponse } from './http';

export interface AdminDashboardStats {
  totalUsers: number;
  totalAdmins: number;
  pendingProjects: number;
  pendingKYC: number;
  totalInvestments: number;
  activeProjects: number;
  pendingVerifications: number;
  totalNFTs: number;
  carbonOffset: number;
  platformRevenue: number;
  vaultBalance: number;
  systemHealth?: SystemHealth;
  uptime?: number;
}

export interface PendingApproval {
  id: string;
  type: 'kyc' | 'project' | 'certificate';
  userId: string;
  userAddress: string;
  data: Record<string, any>;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  action: string;
  userId: string;
  adminId: string;
  details: Record<string, any>;
  timestamp: string;
}

export interface SmartContract {
  id: string;
  name: string;
  address: string;
  type: 'nft' | 'vault' | 'token' | 'staking' | 'governance';
  status: 'active' | 'paused' | 'deprecated';
  version: string;
  deployedAt: string;
  lastUpdated: string;
  gasUsed: number;
  transactions: number;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: string;
  services: {
    api: 'online' | 'offline' | 'degraded';
    database: 'online' | 'offline' | 'degraded';
    blockchain: 'online' | 'offline' | 'degraded';
    ipfs: 'online' | 'offline' | 'degraded';
  };
  metrics: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

export interface SecurityLog {
  id: string;
  action: string;
  userId: string;
  userAddress: string;
  adminId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const adminApi = {
  // Get admin dashboard stats
  getDashboard: async (): Promise<AdminDashboardStats> => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        ...mockAdminStats,
        totalAdmins: 12,
        totalSuperAdmins: 3,
        pendingProjects: 23,
        pendingKYC: 15,
        contractsDeployed: 8,
        systemHealth: {
          status: 'healthy' as const,
          uptime: 99.9,
          lastCheck: new Date().toISOString(),
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
        },
        uptime: 99.9
      });
    }

    const response = await httpClient.get('/api/admin/dashboard');
    return response.data;
  },

  // Get smart contracts
  getContracts: async (): Promise<SmartContract[]> => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          name: 'NFT Contract',
          address: '0x1234567890123456789012345678901234567890',
          type: 'nft' as const,
          status: 'active' as const,
          version: 'v2.1',
          deployedAt: '2024-01-15T00:00:00Z',
          lastUpdated: '2025-01-15T00:00:00Z',
          gasUsed: 2450000,
          transactions: 8934
        },
        {
          id: '2',
          name: 'Vault Contract',
          address: '0x9876543210987654321098765432109876543210',
          type: 'vault' as const,
          status: 'active' as const,
          version: 'v1.8',
          deployedAt: '2024-01-10T00:00:00Z',
          lastUpdated: '2025-01-10T00:00:00Z',
          gasUsed: 1850000,
          transactions: 5642
        },
        {
          id: '3',
          name: 'Token Contract',
          address: '0x5555555555555555555555555555555555555555',
          type: 'token' as const,
          status: 'active' as const,
          version: 'v3.2',
          deployedAt: '2024-01-05T00:00:00Z',
          lastUpdated: '2025-01-05T00:00:00Z',
          gasUsed: 3200000,
          transactions: 12847
        }
      ]);
    }

    const response = await httpClient.get('/api/admin/contracts');
    return response.data;
  },

  // Get system health
  getSystemHealth: async (): Promise<SystemHealth> => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        status: 'healthy' as const,
        uptime: 99.9,
        lastCheck: new Date().toISOString(),
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
      });
    }

    const response = await httpClient.get('/api/admin/system/health');
    return response.data;
  },

  // Get security logs
  getSecurityLogs: async (params?: {
    page?: number;
    limit?: number;
    severity?: string;
  }): Promise<SecurityLog[]> => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          action: 'User Role Updated',
          userId: '1',
          userAddress: '0x1234567890123456789012345678901234567890',
          adminId: 'superadmin',
          details: { oldRole: 'user', newRole: 'admin' },
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0...',
          timestamp: new Date().toISOString(),
          severity: 'medium' as const
        },
        {
          id: '2',
          action: 'Project Approved',
          userId: '2',
          userAddress: '0x9876543210987654321098765432109876543210',
          adminId: 'admin1',
          details: { projectId: 'BATCH-001' },
          ipAddress: '192.168.1.2',
          userAgent: 'Mozilla/5.0...',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          severity: 'low' as const
        },
        {
          id: '3',
          action: 'Contract Paused',
          userId: 'system',
          userAddress: '0x0000000000000000000000000000000000000000',
          adminId: 'superadmin',
          details: { contractId: 'NFT-CONTRACT' },
          ipAddress: '192.168.1.1',
          userAgent: 'Admin Panel',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          severity: 'high' as const
        }
      ]);
    }

    const response = await httpClient.get('/api/admin/security/logs', { params });
    return response.data;
  },

  // Pause smart contract
  pauseContract: async (contractId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: 'Contract paused' });
    }

    const response = await httpClient.post(`/api/admin/contracts/${contractId}/pause`);
    return response.data;
  },

  // Resume smart contract
  resumeContract: async (contractId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: 'Contract resumed' });
    }

    const response = await httpClient.post(`/api/admin/contracts/${contractId}/resume`);
    return response.data;
  },

  // Add new admin
  addAdmin: async (data: {
    address: string;
    name: string;
    email?: string;
    permissions: string[];
  }) => {
    if (USE_MOCK_DATA) {
      const newAdmin = {
        id: String(Date.now()),
        address: data.address,
        role: 'admin' as const,
        profile: { name: data.name, email: data.email },
        permissions: data.permissions,
        stats: { totalInvested: 0, totalReturns: 0, nftsOwned: 0, carbonOffset: 0 },
        isActive: true,
        lastLogin: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return createMockResponse(newAdmin);
    }

    const response = await httpClient.post('/api/admin/admins', data);
    return response.data;
  },

  // Remove admin
  removeAdmin: async (adminId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: 'Admin removed' });
    }

    const response = await httpClient.delete(`/api/admin/admins/${adminId}`);
    return response.data;
  },

  // Force logout all users
  forceLogoutAll: async () => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: 'All users logged out', count: 1247 });
    }

    const response = await httpClient.post('/api/admin/security/force-logout-all');
    return response.data;
  },

  // Get system logs (superadmin only)
  getSystemLogs: async (params?: {
    page?: number;
    limit?: number;
    action?: string;
    userId?: string;
  }): Promise<SystemLog[]> => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          action: 'User Role Updated',
          userId: '1',
          adminId: 'superadmin',
          details: { oldRole: 'user', newRole: 'admin' },
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          action: 'Project Approved',
          userId: '2',
          adminId: 'admin1',
          details: { projectId: 'BATCH-001' },
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]);
    }

    const response = await httpClient.get('/api/admin/logs', { params });
    return response.data;
  },

  // Send notification to user
  sendNotification: async (data: {
    userId: string;
    type: 'approval' | 'rejection' | 'update';
    message: string;
    metadata?: Record<string, any>;
  }) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, notificationId: Math.random().toString(36) });
    }

    const response = await httpClient.post('/api/notifications/send', data);
    return response.data;
  },

  // Check user role
  checkRole: async (userId: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === userId);
      return createMockResponse({ role: user?.role || 'user' });
    }

    const response = await httpClient.get(`/api/admin/role/${userId}`);
    return response.data;
  },

  // Update platform settings (superadmin only)
  updateSettings: async (settings: Record<string, any>) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, settings });
    }

    const response = await httpClient.put('/api/admin/settings', settings);
    return response.data;
  },

  // Get all users with admin view
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }) => {
    if (USE_MOCK_DATA) {
      let filteredUsers = [...mockUsers];
      
      // Add more mock users for demo
      const additionalUsers = [
        {
          id: '2',
          address: '0x9876543210987654321098765432109876543210',
          role: 'admin' as const,
          profile: { name: 'Admin User', email: 'admin@agriverse.io' },
          stats: { totalInvested: 0, totalReturns: 0, nftsOwned: 0, carbonOffset: 0 },
          isActive: true,
          createdAt: '2024-12-01T00:00:00Z',
          updatedAt: '2025-01-15T00:00:00Z'
        },
        {
          id: '3',
          address: '0x5555555555555555555555555555555555555555',
          role: 'superadmin' as const,
          profile: { name: 'SuperAdmin', email: 'superadmin@agriverse.io' },
          stats: { totalInvested: 0, totalReturns: 0, nftsOwned: 0, carbonOffset: 0 },
          isActive: true,
          createdAt: '2024-11-01T00:00:00Z',
          updatedAt: '2025-01-15T00:00:00Z'
        }
      ];
      
      filteredUsers = [...mockUsers, ...additionalUsers];
      
      if (params?.role) {
        filteredUsers = filteredUsers.filter(user => user.role === params.role);
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.profile.name?.toLowerCase().includes(searchLower) ||
          user.address.toLowerCase().includes(searchLower)
        );
      }
      
      return createMockResponse({
        users: filteredUsers,
        total: filteredUsers.length,
        page: params?.page || 1,
        totalPages: 1
      });
    }

    const response = await httpClient.get('/api/admin/users', { params });
    return response.data;
  },

  // Get pending approvals
  getPendingApprovals: async (): Promise<PendingApproval[]> => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          type: 'kyc' as const,
          userId: '1',
          userAddress: '0x1234567890123456789012345678901234567890',
          data: { name: 'John Doe', documents: ['passport.pdf'] },
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'project' as const,
          userId: '2',
          userAddress: '0x9876543210987654321098765432109876543210',
          data: { projectName: 'New Farm Project', type: 'AgriYield' },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }

    const response = await httpClient.get('/api/admin/approvals/pending');
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId: string, role: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        user.role = role as any;
        user.updatedAt = new Date().toISOString();
      }
      return createMockResponse({ success: true });
    }

    const response = await httpClient.put(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Approve/reject pending items
  approveItem: async (id: string, type: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: `${type} approved` });
    }

    const response = await httpClient.put(`/api/admin/approvals/${id}/approve`, { type });
    return response.data;
  },

  rejectItem: async (id: string, type: string, reason?: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, message: `${type} rejected` });
    }

    const response = await httpClient.put(`/api/admin/approvals/${id}/reject`, { type, reason });
    return response.data;
  }
};