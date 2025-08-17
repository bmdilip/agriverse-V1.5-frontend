import httpClient from './http';

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
    const response = await httpClient.get('/api/admin/users', { params });
    return response.data;
  },

  // Get pending approvals
  getPendingApprovals: async (): Promise<PendingApproval[]> => {
    const response = await httpClient.get('/api/admin/approvals/pending');
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId: string, role: string) => {
    const response = await httpClient.put(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Approve/reject pending items
  approveItem: async (id: string, type: string) => {
    const response = await httpClient.put(`/api/admin/approvals/${id}/approve`, { type });
    return response.data;
  },

  rejectItem: async (id: string, type: string, reason?: string) => {
    const response = await httpClient.put(`/api/admin/approvals/${id}/reject`, { type, reason });
    return response.data;
  }
};