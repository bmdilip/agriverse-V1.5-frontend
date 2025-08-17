import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export interface AddressShortProps {
  address: string;
  length?: number;
  className?: string;
  showCopy?: boolean;
}

export const AddressShort: React.FC<AddressShortProps> = ({
  address,
  length = 6,
  className = '',
  showCopy = true
}) => {
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    if (addr.length <= length * 2) return addr;
    return `${addr.slice(0, length)}...${addr.slice(-length)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="font-mono text-agri-text">
        {shortenAddress(address)}
      </span>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="text-agri-text/50 hover:text-agri-primary transition-colors"
          title="Copy address"
        >
          {copied ? (
            <Check className="w-4 h-4 text-agri-primary" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};