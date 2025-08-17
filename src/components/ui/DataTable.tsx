import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  searchable?: boolean;
  onSearch?: (query: string) => void;
  exportable?: boolean;
  onExport?: () => void;
  actions?: {
    view?: (row: T) => void;
    edit?: (row: T) => void;
    delete?: (row: T) => void;
  };
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  searchable = false,
  onSearch,
  exportable = false,
  onExport,
  actions,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const hasActions = actions && (actions.view || actions.edit || actions.delete);

  if (loading) {
    return (
      <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-agri-secondary/20 rounded w-1/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-agri-secondary/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
      {/* Header */}
      {(searchable || exportable) && (
        <div className="p-6 border-b border-agri-border">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {searchable && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-agri-text/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
                />
              </div>
            )}
            
            {exportable && (
              <button
                onClick={onExport}
                className="flex items-center space-x-2 px-4 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-agri-secondary/20">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`text-left p-4 text-agri-text/70 font-light ${
                    column.sortable ? 'cursor-pointer hover:text-agri-primary' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      <span className="text-agri-primary">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {hasActions && (
                <th className="text-left p-4 text-agri-text/70 font-light w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (hasActions ? 1 : 0)} 
                  className="p-12 text-center text-agri-text/70"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-agri-border hover:bg-agri-secondary/10 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="p-4">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')
                      }
                    </td>
                  ))}
                  {hasActions && (
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {actions?.view && (
                          <button
                            onClick={() => actions.view!(row)}
                            className="p-1 text-agri-text/70 hover:text-agri-primary transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {actions?.edit && (
                          <button
                            onClick={() => actions.edit!(row)}
                            className="p-1 text-agri-text/70 hover:text-agri-accent transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {actions?.delete && (
                          <button
                            onClick={() => actions.delete!(row)}
                            className="p-1 text-agri-text/70 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="p-6 border-t border-agri-border">
          <div className="flex items-center justify-between">
            <div className="text-agri-text/70 text-sm">
              Showing {((pagination.page - 1) * 10) + 1} to {Math.min(pagination.page * 10, pagination.total)} of {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => pagination.onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => pagination.onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        pagination.page === pageNum
                          ? 'bg-agri-primary text-agri-dark'
                          : 'bg-agri-secondary/50 text-agri-text hover:bg-agri-secondary'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => pagination.onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}