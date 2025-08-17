import httpClient from './http';
import { mockAdminStats, mockUsers, USE_MOCK_DATA, createMockResponse } from './http';

export interface AdminDashboardStats {
  totalUsers: number;
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

export const adminApi = {
  // Get admin dashboard stats
  getDashboard: async (): Promise<AdminDashboardStats> => {
    if (USE_MOCK_DATA) {
      return createMockResponse(mockAdminStats);
    }

    const response = await httpClient.get('/api/admin/dashboard');
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
      return createMockResponse({
        users: mockUsers,
        total: mockUsers.length,
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