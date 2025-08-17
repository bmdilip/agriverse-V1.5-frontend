import httpClient from './http';

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
    const response = await httpClient.post('/api/certificate/issue', data);
    return response.data;
  },

  // Get certificate by ID
  getById: async (id: string): Promise<Certificate> => {
    const response = await httpClient.get(`/api/certificate/${id}`);
    return response.data;
  },

  // Get certificates by user address
  getByUser: async (address: string): Promise<Certificate[]> => {
    const response = await httpClient.get(`/api/certificate/user/${address}`);
    return response.data;
  },

  // Update certificate
  update: async (id: string, data: Partial<Certificate>) => {
    const response = await httpClient.put(`/api/certificate/${id}`, data);
    return response.data;
  },

  // Revoke certificate
  revoke: async (id: string, reason?: string) => {
    const response = await httpClient.put(`/api/certificate/${id}/revoke`, { reason });
    return response.data;
  },

  // Bulk issue certificates for batch
  bulkIssue: async (batchId: string) => {
    const response = await httpClient.post(`/api/certificate/bulk-issue/${batchId}`);
    return response.data;
  }
};