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

export const adminApi = {
  // Get admin dashboard stats
  getDashboard: async (): Promise<AdminDashboardStats> => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        ...mockAdminStats,
        totalAdmins: 12,
        pendingProjects: 23,
        pendingKYC: 15
      });
    }

    const response = await httpClient.get('/api/admin/dashboard');
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