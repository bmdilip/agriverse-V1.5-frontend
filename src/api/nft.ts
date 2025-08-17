import httpClient from './http';

export interface NFT {
  id: string;
  batchId: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  assetType: 'AgriYield' | 'AgriFarms' | 'CarbonVault' | 'Livestock';
  price: number;
  roi: number;
  maturityPeriod: number;
  status: 'Active' | 'Ended' | 'Upcoming';
  owner: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface MintNFTRequest {
  batchId: string;
  to: string;
  quantity: number;
}

export interface UpdateMetadataRequest {
  tokenId: number;
  metadata: Record<string, any>;
}

export const nftApi = {
  // Mint NFT
  mint: async (data: MintNFTRequest) => {
    const response = await httpClient.post('/api/assets/:id/mint', data);
    return response.data;
  },

  // Get NFT by ID
  getById: async (id: string): Promise<NFT> => {
    const response = await httpClient.get(`/api/nft/${id}`);
    return response.data;
  },

  // Transfer NFT
  transfer: async (tokenId: number, to: string) => {
    const response = await httpClient.post('/api/nft/transfer', { tokenId, to });
    return response.data;
  },

  // Get user's NFTs
  getUserNFTs: async (address: string): Promise<NFT[]> => {
    const response = await httpClient.get(`/api/nft/user/${address}`);
    return response.data;
  },

  // Get active NFT listings
  getActiveListings: async (params?: {
    page?: number;
    limit?: number;
    assetType?: string;
    priceMin?: number;
    priceMax?: number;
    status?: string;
  }): Promise<{ nfts: NFT[]; total: number; page: number; totalPages: number }> => {
    const response = await httpClient.get('/api/nft/active', { params });
    return response.data;
  },

  // Update NFT metadata
  updateMetadata: async (data: UpdateMetadataRequest) => {
    const response = await httpClient.put('/api/nft/metadata', data);
    return response.data;
  },

  // Get NFT stats
  getStats: async () => {
    const response = await httpClient.get('/api/nft/stats');
    return response.data;
  },

  // Create sample data (for testing)
  createSample: async () => {
    const response = await httpClient.post('/api/assets/sample');
    return response.data;
  }
};