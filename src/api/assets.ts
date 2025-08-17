import httpClient from './http';

export interface Asset {
  id: string;
  batchId: string;
  name: string;
  description: string;
  image: string;
  assetType: 'AgriYield' | 'AgriFarms' | 'CarbonVault' | 'Livestock';
  price: number;
  supply: number;
  minted: number;
  roi: number;
  maturityPeriod: number;
  status: 'Upcoming' | 'Live' | 'Ended';
  goLiveDate: string;
  expiryDate: string;
  whitelistOnly: boolean;
  resaleEnabled: boolean;
  stakingEnabled: boolean;
  kycRequired: boolean;
  royaltyPercent: number;
  royaltyReceiver: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetRequest {
  name: string;
  description: string;
  image: string;
  assetType: string;
  price: number;
  supply: number;
  roi: number;
  maturityPeriod: number;
  goLiveDate: string;
  expiryDate: string;
  whitelistOnly?: boolean;
  resaleEnabled?: boolean;
  stakingEnabled?: boolean;
  kycRequired?: boolean;
  royaltyPercent?: number;
  royaltyReceiver?: string;
  metadata?: Record<string, any>;
}

export const assetsApi = {
  // Get public marketplace catalog
  getMarketplace: async (params?: {
    page?: number;
    limit?: number;
    assetType?: string;
    priceMin?: number;
    priceMax?: number;
    status?: string;
    certified?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await httpClient.get('/api/assets', { params });
    return response.data;
  },

  // Get asset by ID
  getById: async (id: string): Promise<Asset> => {
    const response = await httpClient.get(`/api/assets/${id}`);
    return response.data;
  },

  // Create new asset (admin only)
  create: async (data: CreateAssetRequest) => {
    const response = await httpClient.post('/api/assets', data);
    return response.data;
  },

  // Update asset (admin only)
  update: async (id: string, data: Partial<CreateAssetRequest>) => {
    const response = await httpClient.put(`/api/assets/${id}`, data);
    return response.data;
  },

  // Mint NFT from asset
  mint: async (id: string, data: { to: string; quantity: number }) => {
    const response = await httpClient.post(`/api/assets/${id}/mint`, data);
    return response.data;
  },

  // Go live (admin only)
  goLive: async (id: string) => {
    const response = await httpClient.put(`/api/assets/${id}/go-live`);
    return response.data;
  },

  // Upload to IPFS
  uploadIPFS: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await httpClient.post('/api/assets/upload-ipfs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Create sample data
  createSample: async () => {
    const response = await httpClient.post('/api/assets/sample');
    return response.data;
  }
};