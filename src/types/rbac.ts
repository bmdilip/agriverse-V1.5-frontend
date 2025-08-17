// Role-Based Access Control Types
export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'projects' | 'users' | 'contracts' | 'kyc' | 'reports' | 'settings' | 'security';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
}

export interface User {
  id: string;
  address: string;
  role: 'user' | 'admin' | 'superadmin';
  permissions: string[];
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
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformStats {
  totalUsers: number;
  totalAdmins: number;
  totalSuperAdmins: number;
  activeProjects: number;
  pendingProjects: number;
  pendingKYC: number;
  totalInvestments: number;
  totalNFTs: number;
  carbonOffset: number;
  platformRevenue: number;
  vaultBalance: number;
  contractsDeployed: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  uptime: number;
}

export interface SmartContract {
  id: string;
  name: string;
  address: string;
  type: 'nft' | 'vault' | 'token' | 'staking' | 'governance';
  status: 'active' | 'paused' | 'deprecated';
  version: string;
  deployedAt: string;
  lastUpdated: string;
  gasUsed: number;
  transactions: number;
}

export interface SecurityLog {
  id: string;
  action: string;
  userId: string;
  userAddress: string;
  adminId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: string;
  services: {
    api: 'online' | 'offline' | 'degraded';
    database: 'online' | 'offline' | 'degraded';
    blockchain: 'online' | 'offline' | 'degraded';
    ipfs: 'online' | 'offline' | 'degraded';
  };
  metrics: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

// RBAC Helper Types
export type PermissionSlug = 
  | 'approve_project'
  | 'reject_project'
  | 'manage_contracts'
  | 'manage_admins'
  | 'view_reports'
  | 'manage_kyc'
  | 'force_logout'
  | 'update_settings'
  | 'view_audit_logs'
  | 'manage_users'
  | 'deploy_contracts'
  | 'emergency_controls'
  | 'financial_reports'
  | 'security_oversight';

export interface RBACContext {
  user: User | null;
  permissions: string[];
  can: (permission: PermissionSlug) => boolean;
  hasRole: (role: string | string[]) => boolean;
}