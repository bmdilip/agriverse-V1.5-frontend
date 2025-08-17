import httpClient from './http';
import { mockUsers, USE_MOCK_DATA, createMockResponse } from './http';

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
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.address === data.address) || mockUsers[0];
      return createMockResponse({
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
        user
      });
    }

    const response = await httpClient.post('/api/user/connect', data);
    return response.data; // { token, user }
  },

  // Get user profile
  getProfile: async (address: string): Promise<User> => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.address === address) || mockUsers[0];
      return createMockResponse(user);
    }

    const response = await httpClient.get(`/api/user/profile/${address}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (address: string, data: UpdateProfileRequest) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.address === address);
      if (user) {
        user.profile = { ...user.profile, ...data };
        user.updatedAt = new Date().toISOString();
      }
      return createMockResponse(user || mockUsers[0]);
    }

    const response = await httpClient.put(`/api/user/profile/${address}`, data);
    return response.data;
  },

  // Get user stats
  getStats: async (address: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.address === address) || mockUsers[0];
      return createMockResponse(user.stats);
    }

    const response = await httpClient.get(`/api/user/stats/${address}`);
    return response.data;
  },

  // Get user dashboard data
  getDashboard: async (address: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.address === address) || mockUsers[0];
      return createMockResponse({
        user,
        stats: user.stats,
        nfts: mockNFTs.filter(nft => nft.owner === address).slice(0, 5),
        recentActivity: [
          { action: 'Yield Received', amount: '$180', date: '2 days ago', type: 'yield' },
          { action: 'NFT Purchased', amount: '$1,200', date: '1 week ago', type: 'purchase' }
        ]
      });
    }

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
    if (USE_MOCK_DATA) {
      let filteredUsers = [...mockUsers];
      
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
        totalPages: Math.ceil(filteredUsers.length / (params?.limit || 10))
      });
    }

    const response = await httpClient.get('/api/user/list', { params });
    return response.data;
  },

  // Update user role (admin only)
  updateRole: async (userId: string, role: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        user.role = role as any;
        user.updatedAt = new Date().toISOString();
      }
      return createMockResponse(user || mockUsers[0]);
    }

    const response = await httpClient.put(`/api/user/${userId}/role`, { role });
    return response.data;
  },

  // Deactivate user (admin only)
  deactivate: async (userId: string) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        user.isActive = false;
        user.updatedAt = new Date().toISOString();
      }
      return createMockResponse({ success: true });
    }

    const response = await httpClient.put(`/api/user/${userId}/deactivate`);
    return response.data;
  }
};