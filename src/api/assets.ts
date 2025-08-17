import httpClient from './http';
import { mockNFTs, USE_MOCK_DATA, createMockResponse } from './http';

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
    // Use mock data if API is not available
    if (USE_MOCK_DATA) {
      let filteredAssets = [...mockNFTs];
      
      // Apply filters
      if (params?.assetType) {
        filteredAssets = filteredAssets.filter(asset => asset.assetType === params.assetType);
      }
      if (params?.priceMin) {
        filteredAssets = filteredAssets.filter(asset => asset.price >= params.priceMin!);
      }
      if (params?.priceMax) {
        filteredAssets = filteredAssets.filter(asset => asset.price <= params.priceMax!);
      }
      if (params?.status) {
        filteredAssets = filteredAssets.filter(asset => asset.status === params.status);
      }
      if (params?.certified) {
        filteredAssets = filteredAssets.filter(asset => asset.certified);
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredAssets = filteredAssets.filter(asset => 
          asset.name.toLowerCase().includes(searchLower) ||
          asset.description.toLowerCase().includes(searchLower) ||
          asset.assetType.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting
      if (params?.sortBy) {
        filteredAssets.sort((a, b) => {
          switch (params.sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'newest':
            default:
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
        });
      }
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAssets = filteredAssets.slice(startIndex, endIndex);
      
      return createMockResponse({
        assets: paginatedAssets,
        total: filteredAssets.length,
        page,
        totalPages: Math.ceil(filteredAssets.length / limit)
      });
    }

    const response = await httpClient.get('/api/assets', { params });
    return response.data;
  },

  // Get asset by ID
  getById: async (id: string): Promise<Asset> => {
    if (USE_MOCK_DATA) {
      const asset = mockNFTs.find(nft => nft.id === id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      return createMockResponse(asset);
    }

    const response = await httpClient.get(`/api/assets/${id}`);
    return response.data;
  },

  // Create new asset (admin only)
  create: async (data: CreateAssetRequest) => {
    if (USE_MOCK_DATA) {
      const newAsset = {
        id: String(mockNFTs.length + 1),
        batchId: `BATCH-${String(mockNFTs.length + 1).padStart(3, '0')}`,
        ...data,
        minted: 0,
        metadata: data.metadata || {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockNFTs.push(newAsset);
      return createMockResponse(newAsset);
    }

    const response = await httpClient.post('/api/assets', data);
    return response.data;
  },

  // Update asset (admin only)
  update: async (id: string, data: Partial<CreateAssetRequest>) => {
    if (USE_MOCK_DATA) {
      const assetIndex = mockNFTs.findIndex(nft => nft.id === id);
      if (assetIndex === -1) {
        throw new Error('Asset not found');
      }
      mockNFTs[assetIndex] = { ...mockNFTs[assetIndex], ...data, updatedAt: new Date().toISOString() };
      return createMockResponse(mockNFTs[assetIndex]);
    }

    const response = await httpClient.put(`/api/assets/${id}`, data);
    return response.data;
  },

  // Mint NFT from asset
  mint: async (id: string, data: { to: string; quantity: number }) => {
    if (USE_MOCK_DATA) {
      const asset = mockNFTs.find(nft => nft.id === id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      asset.minted += data.quantity;
      return createMockResponse({ success: true, txHash: '0x' + Math.random().toString(16).substr(2, 40) });
    }

    const response = await httpClient.post(`/api/assets/${id}/mint`, data);
    return response.data;
  },

  // Go live (admin only)
  goLive: async (id: string) => {
    if (USE_MOCK_DATA) {
      const asset = mockNFTs.find(nft => nft.id === id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      asset.status = 'Live';
      asset.updatedAt = new Date().toISOString();
      return createMockResponse({ success: true });
    }

    const response = await httpClient.put(`/api/assets/${id}/go-live`);
    return response.data;
  },

  // Upload to IPFS
  uploadIPFS: async (file: File) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        ipfsHash: 'Qm' + Math.random().toString(36).substr(2, 44),
        url: `https://ipfs.io/ipfs/Qm${Math.random().toString(36).substr(2, 44)}`
      });
    }

    const formData = new FormData();
    formData.append('file', file);
    const response = await httpClient.post('/api/assets/upload-ipfs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Create sample data
  createSample: async () => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ 
        message: 'Sample data already loaded in mock mode',
        count: mockNFTs.length 
      });
    }

    const response = await httpClient.post('/api/assets/sample');
    return response.data;
  }
};