import httpClient from './http';

export interface CarbonCredit {
  id: string;
  tokenId: number;
  owner: string;
  amount: number; // tons of CO2
  projectId: string;
  vintage: string;
  status: 'Active' | 'Retired';
  metadata: Record<string, any>;
  createdAt: string;
}

export const carbonApi = {
  // Mint carbon credits
  mint: async (data: {
    to: string;
    amount: number;
    projectId: string;
    vintage: string;
    metadata?: Record<string, any>;
  }) => {
    const response = await httpClient.post('/api/carbon/mint', data);
    return response.data;
  },

  // Get carbon credit by ID
  getById: async (id: string): Promise<CarbonCredit> => {
    const response = await httpClient.get(`/api/carbon/${id}`);
    return response.data;
  },

  // Retire carbon credits
  retire: async (tokenId: number, reason?: string) => {
    const response = await httpClient.post('/api/carbon/retire', { tokenId, reason });
    return response.data;
  },

  // Get user's carbon credits
  getUserCredits: async (address: string): Promise<CarbonCredit[]> => {
    const response = await httpClient.get(`/api/carbon/user/${address}`);
    return response.data;
  }
};