import httpClient from './http';

export interface KYCData {
  id: string;
  userAddress: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  documents: {
    type: string;
    url: string;
    verified: boolean;
  }[];
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    address: string;
  };
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export const kycApi = {
  // Submit KYC data
  submit: async (data: {
    userAddress: string;
    documents: File[];
    personalInfo: KYCData['personalInfo'];
  }) => {
    const formData = new FormData();
    formData.append('userAddress', data.userAddress);
    formData.append('personalInfo', JSON.stringify(data.personalInfo));
    data.documents.forEach((file, index) => {
      formData.append(`documents[${index}]`, file);
    });

    const response = await httpClient.post('/api/kyc/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Get KYC status
  getStatus: async (address: string): Promise<KYCData> => {
    const response = await httpClient.get(`/api/kyc/${address}`);
    return response.data;
  },

  // Approve KYC (admin only)
  approve: async (address: string, notes?: string) => {
    const response = await httpClient.put(`/api/kyc/${address}/approve`, { notes });
    return response.data;
  },

  // Reject KYC (admin only)
  reject: async (address: string, reason: string) => {
    const response = await httpClient.put(`/api/kyc/${address}/reject`, { reason });
    return response.data;
  },

  // Get all pending KYC (admin only)
  getPending: async () => {
    const response = await httpClient.get('/api/kyc/pending');
    return response.data;
  }
};