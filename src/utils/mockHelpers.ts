// Utility functions for mock data and development

export const generateMockId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateMockAddress = () => {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

export const generateMockIPFSHash = () => {
  return 'Qm' + Array.from({ length: 44 }, () => 
    Math.random().toString(36).charAt(0)
  ).join('');
};

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const shortenAddress = (address: string, length = 6) => {
  if (!address) return '';
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const isValidAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const calculateROI = (invested: number, returns: number) => {
  if (invested === 0) return 0;
  return ((returns - invested) / invested) * 100;
};

export const getAssetTypeColor = (type: string) => {
  switch (type) {
    case 'AgriYield':
      return 'bg-green-500/10 text-green-400';
    case 'AgriFarms':
      return 'bg-blue-500/10 text-blue-400';
    case 'CarbonVault':
      return 'bg-emerald-500/10 text-emerald-400';
    case 'Livestock':
      return 'bg-purple-500/10 text-purple-400';
    default:
      return 'bg-gray-500/10 text-gray-400';
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'live':
    case 'active':
    case 'verified':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'pending':
    case 'upcoming':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'ended':
    case 'expired':
    case 'inactive':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};