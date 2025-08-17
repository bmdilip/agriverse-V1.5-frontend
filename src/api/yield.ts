import httpClient from './http';

export interface YieldRecord {
  id: string;
  assetId: string;
  amount: number;
  currency: string;
  distributionDate: string;
  status: 'Pending' | 'Distributed' | 'Failed';
  recipients: string[];
  metadata: Record<string, any>;
  createdAt: string;
}

export interface ROIRecord {
  id: string;
  assetId: string;
  expectedROI: number;
  actualROI: number;
  calculatedAt: string;
  metadata: Record<string, any>;
}

export const yieldApi = {
  // Create yield distribution
  create: async (data: {
    assetId: string;
    amount: number;
    currency: string;
    distributionDate: string;
    recipients: string[];
    metadata?: Record<string, any>;
  }) => {
    const response = await httpClient.post('/api/yield/create', data);
    return response.data;
  },

  // Get yield by ID
  getById: async (id: string): Promise<YieldRecord> => {
    const response = await httpClient.get(`/api/yield/${id}`);
    return response.data;
  },

  // Get yields by asset
  getByAsset: async (assetId: string): Promise<YieldRecord[]> => {
    const response = await httpClient.get(`/api/yield/asset/${assetId}`);
    return response.data;
  },

  // Get ROI data
  getROI: async (assetId: string): Promise<ROIRecord> => {
    const response = await httpClient.get(`/api/yield/roi/${assetId}`);
    return response.data;
  },

  // Distribute yield (admin only)
  distribute: async (id: string) => {
    const response = await httpClient.post(`/api/yield/${id}/distribute`);
    return response.data;
  }
};