import httpClient from './http';

export interface User {
  id: string;
  address: string;
  role: 'user' | 'admin' | 'superadmin';
  profile: {
    name?: string;
    email?: string;
    bio?: string;
    avatar?: string;
  };
  stats: {
    totalInvested: number;
    totalReturns: number;
    nftsOwned: number;
    carbonOffset: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectWalletRequest {
  address: string;
  signature: string;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

export const userApi = {
  // Connect wallet and get JWT
  connect: async (data: ConnectWalletRequest) => {
    const response = await httpClient.post('/api/user/connect', data);
    return response.data; // { token, user }
  },

  // Get user profile
  getProfile: async (address: string): Promise<User> => {
    const response = await httpClient.get(`/api/user/profile/${address}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (address: string, data: UpdateProfileRequest) => {
    const response = await httpClient.put(`/api/user/profile/${address}`, data);
    return response.data;
  },

  // Get user stats
  getStats: async (address: string) => {
    const response = await httpClient.get(`/api/user/stats/${address}`);
    return response.data;
  },

  // Get user dashboard data
  getDashboard: async (address: string) => {
    const response = await httpClient.get(`/api/user/dashboard/${address}`);
    return response.data;
  },

  // Get all users (admin only)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }) => {
    const response = await httpClient.get('/api/user/list', { params });
    return response.data;
  },

  // Update user role (admin only)
  updateRole: async (userId: string, role: string) => {
    const response = await httpClient.put(`/api/user/${userId}/role`, { role });
    return response.data;
  },

  // Deactivate user (admin only)
  deactivate: async (userId: string) => {
    const response = await httpClient.put(`/api/user/${userId}/deactivate`);
    return response.data;
  }
};