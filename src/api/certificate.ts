import httpClient from './http';
import { mockCertificates, USE_MOCK_DATA, createMockResponse } from './http';

export interface Certificate {
  id: string;
  certId: string;
  batchId: string;
  nftId: string;
  userAddress: string;
  status: 'Pending' | 'Verified' | 'Expired' | 'Revoked';
  issueDate?: string;
  expiryDate?: string;
  ipfsHash?: string;
  pdfUrl?: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface IssueCertificateRequest {
  batchId: string;
  nftId: string;
  userAddress: string;
  metadata?: Record<string, any>;
}

export const certificateApi = {
  // Issue new certificate
  issue: async (data: IssueCertificateRequest) => {
    if (USE_MOCK_DATA) {
      const newCert = {
        id: String(mockCertificates.length + 1),
        certId: `RWA-2025-${String(mockCertificates.length + 1).padStart(3, '0')}`,
        title: `RWAcert - Certificate #${mockCertificates.length + 1}`,
        batchId: data.batchId,
        nftId: data.nftId,
        userAddress: data.userAddress,
        status: 'Verified' as const,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ipfsHash: 'Qm' + Math.random().toString(36).substr(2, 44),
        pdfUrl: `https://ipfs.io/ipfs/Qm${Math.random().toString(36).substr(2, 44)}`,
        claimed: true,
        claimable: false,
        autoExpire: true,
        description: 'Mock certificate for testing',
        nftImage: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400",
        assetType: 'AgriYield' as const,
        metadata: data.metadata || {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockCertificates.push(newCert);
      return createMockResponse(newCert);
    }

    const response = await httpClient.post('/api/certificate/issue', data);
    return response.data;
  },

  // Get certificate by ID
  getById: async (id: string): Promise<Certificate> => {
    if (USE_MOCK_DATA) {
      const cert = mockCertificates.find(c => c.id === id);
      if (!cert) {
        throw new Error('Certificate not found');
      }
      return createMockResponse(cert);
    }

    const response = await httpClient.get(`/api/certificate/${id}`);
    return response.data;
  },

  // Get certificates by user address
  getByUser: async (address: string): Promise<Certificate[]> => {
    if (USE_MOCK_DATA) {
      const userCerts = mockCertificates.filter(cert => cert.userAddress === address);
      return userCerts;
    }

    const response = await httpClient.get(`/api/certificate/user/${address}`);
    return response.data;
  },

  // Update certificate
  update: async (id: string, data: Partial<Certificate>) => {
    if (USE_MOCK_DATA) {
      const certIndex = mockCertificates.findIndex(c => c.id === id);
      if (certIndex === -1) {
        throw new Error('Certificate not found');
      }
      mockCertificates[certIndex] = { 
        ...mockCertificates[certIndex], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      return createMockResponse(mockCertificates[certIndex]);
    }

    const response = await httpClient.put(`/api/certificate/${id}`, data);
    return response.data;
  },

  // Revoke certificate
  revoke: async (id: string, reason?: string) => {
    if (USE_MOCK_DATA) {
      const cert = mockCertificates.find(c => c.id === id);
      if (!cert) {
        throw new Error('Certificate not found');
      }
      cert.status = 'Revoked' as any;
      cert.updatedAt = new Date().toISOString();
      return createMockResponse({ success: true });
    }

    const response = await httpClient.put(`/api/certificate/${id}/revoke`, { reason });
    return response.data;
  },

  // Bulk issue certificates for batch
  bulkIssue: async (batchId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ 
        message: `Bulk certificates issued for batch ${batchId}`,
        count: 5 
      });
    }

    const response = await httpClient.post(`/api/certificate/bulk-issue/${batchId}`);
    return response.data;
  }
};