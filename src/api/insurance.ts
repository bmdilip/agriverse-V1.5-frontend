import httpClient from './http';

export interface InsurancePolicy {
  id: string;
  assetId: string;
  policyType: string;
  coverage: number;
  premium: number;
  status: 'Active' | 'Expired' | 'Claimed';
  startDate: string;
  endDate: string;
  metadata: Record<string, any>;
}

export interface InsuranceClaim {
  id: string;
  policyId: string;
  claimAmount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
  evidence: string[];
  createdAt: string;
}

export const insuranceApi = {
  // Create insurance policy
  createPolicy: async (data: {
    assetId: string;
    policyType: string;
    coverage: number;
    premium: number;
    startDate: string;
    endDate: string;
    metadata?: Record<string, any>;
  }) => {
    const response = await httpClient.post('/api/insurance/policy', data);
    return response.data;
  },

  // Create insurance claim
  createClaim: async (data: {
    policyId: string;
    claimAmount: number;
    reason: string;
    evidence: string[];
  }) => {
    const response = await httpClient.post('/api/insurance/claim', data);
    return response.data;
  },

  // Process claim (admin only)
  processClaim: async (claimId: string, decision: 'approve' | 'reject', notes?: string) => {
    const response = await httpClient.put(`/api/insurance/claim/${claimId}/process`, {
      decision,
      notes
    });
    return response.data;
  },

  // Get policies by asset
  getPoliciesByAsset: async (assetId: string): Promise<InsurancePolicy[]> => {
    const response = await httpClient.get(`/api/insurance/policy/asset/${assetId}`);
    return response.data;
  },

  // Get claims by policy
  getClaimsByPolicy: async (policyId: string): Promise<InsuranceClaim[]> => {
    const response = await httpClient.get(`/api/insurance/claim/policy/${policyId}`);
    return response.data;
  }
};