import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Edit, 
  Camera, 
  PlayCircle, 
  PauseCircle, 
  Upload,
  FileText,
  Shield,
  DollarSign,
  Calendar,
  Users,
  Settings,
  Eye,
  Trash2
} from 'lucide-react';
import { assetsApi } from '../../api/assets';
import { DataTable, Column } from '../../components/ui/DataTable';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { FileUpload } from '../../components/ui/FileUpload';
import toast from 'react-hot-toast';

export const ProjectManagement: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => assetsApi.getMarketplace({ limit: 100 })
  });

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: assetsApi.create,
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setShowCreateModal(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => assetsApi.update(id, data),
    onSuccess: () => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    }
  });

  const goLiveMutation = useMutation({
    mutationFn: assetsApi.goLive,
    onSuccess: () => {
      toast.success('Project is now live');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    }
  });

  const columns: Column<any>[] = [
    {
      key: 'name',
      label: 'Project Name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <img src={row.image} alt={value} className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <div className="text-agri-text font-medium">{value}</div>
            <div className="text-agri-text/70 text-sm font-mono">{row.batchId}</div>
          </div>
        </div>
      )
    },
    {
      key: 'assetType',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 bg-agri-primary/20 text-agri-primary rounded-full text-xs">
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
          value === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
          'bg-agri-secondary/50 text-agri-text/70'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'minted',
      label: 'Minted',
      render: (value, row) => `${value}/${row.supply}`
    },
    {
      key: 'roi',
      label: 'ROI',
      render: (value) => `${value}%`
    }
  ];

  const handleGoLive = (project: any) => {
    setConfirmAction({
      isOpen: true,
      title: 'Go Live',
      message: `Are you sure you want to make "${project.name}" live? This will allow public minting.`,
      onConfirm: () => {
        goLiveMutation.mutate(project.id);
        setConfirmAction(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleEndProject = (project: any) => {
    setConfirmAction({
      isOpen: true,
      title: 'End Project',
      message: `Are you sure you want to end "${project.name}"? This will stop minting and mark certificates for expiry.`,
      onConfirm: () => {
        updateProjectMutation.mutate({
          id: project.id,
          data: { status: 'Ended' }
        });
        setConfirmAction(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const actions = {
    view: (row: any) => setSelectedProject(row),
    edit: (row: any) => {
      // TODO: Open edit modal
      console.log('Edit project:', row);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-agri-text">Project Management</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => assetsApi.createSample()}
            className="flex items-center space-x-2 px-4 py-2 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Load Sample Data</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        </div>
      </div>

      <DataTable
        data={projects.assets || []}
        columns={columns}
        loading={isLoading}
        searchable
        exportable
        actions={actions}
        emptyMessage="No projects found. Create your first project to get started."
      />

      {/* Quick Actions for each project */}
      {projects.assets && projects.assets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.assets.slice(0, 6).map((project: any) => (
            <div key={project.id} className="bg-agri-card border border-agri-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-agri-text">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === 'Live' ? 'bg-agri-primary/20 text-agri-primary' :
                  project.status === 'Upcoming' ? 'bg-agri-accent/20 text-agri-accent' :
                  'bg-agri-secondary/50 text-agri-text/70'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-agri-text/70">Price:</span>
                  <span className="text-agri-text ml-1">${project.price}</span>
                </div>
                <div>
                  <span className="text-agri-text/70">ROI:</span>
                  <span className="text-agri-primary ml-1">{project.roi}%</span>
                </div>
                <div>
                  <span className="text-agri-text/70">Minted:</span>
                  <span className="text-agri-text ml-1">{project.minted}/{project.supply}</span>
                </div>
                <div>
                  <span className="text-agri-text/70">Type:</span>
                  <span className="text-agri-text ml-1">{project.assetType}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {project.status === 'Upcoming' ? (
                  <button
                    onClick={() => handleGoLive(project)}
                    className="flex-1 py-2 bg-agri-primary/20 text-agri-primary rounded-lg hover:bg-agri-primary/30 transition-colors text-sm"
                  >
                    <PlayCircle className="w-4 h-4 mr-1 inline" />
                    Go Live
                  </button>
                ) : project.status === 'Live' ? (
                  <button
                    onClick={() => handleEndProject(project)}
                    className="flex-1 py-2 bg-agri-accent/20 text-agri-accent rounded-lg hover:bg-agri-accent/30 transition-colors text-sm"
                  >
                    <PauseCircle className="w-4 h-4 mr-1 inline" />
                    End Project
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-2 bg-agri-secondary/30 text-agri-text/50 rounded-lg cursor-not-allowed text-sm"
                  >
                    Project Ended
                  </button>
                )}
                
                <button className="py-2 px-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="py-2 px-3 bg-agri-secondary/50 text-agri-text rounded-lg hover:bg-agri-secondary transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmAction.isOpen}
        onClose={() => setConfirmAction(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmAction.onConfirm}
        title={confirmAction.title}
        message={confirmAction.message}
        loading={goLiveMutation.isPending || updateProjectMutation.isPending}
      />
    </div>
  );
};