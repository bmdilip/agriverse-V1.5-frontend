import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Image } from 'lucide-react';

export interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
  children?: React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = '*/*',
  multiple = false,
  maxSize = 10,
  className = '',
  children
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file sizes
    const validFiles = files.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (max ${maxSize}MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (max ${maxSize}MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-agri-border rounded-xl p-8 text-center cursor-pointer hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-300"
      >
        {children || (
          <>
            <Upload className="w-12 h-12 text-agri-text/50 mx-auto mb-4" />
            <p className="text-agri-text/70 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-agri-text/50 text-sm">
              {accept === 'image/*' ? 'Images only' : 'Any file type'} • Max {maxSize}MB
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4 text-agri-primary" />;
    }
    return <FileText className="w-4 h-4 text-agri-accent" />;
  };

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {getFileIcon(file)}
            <div>
              <div className="text-agri-text text-sm">{file.name}</div>
              <div className="text-agri-text/70 text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-agri-text/70 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};