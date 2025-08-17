import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck,
  Leaf,
  TreePine,
  Shield,
  Coins,
  Cog as Cow
} from 'lucide-react';
import RWAcertBadge from './RWAcertBadge';
import StatusBadge from './StatusBadge';
import CountdownTimer from './CountdownTimer';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    type: string;
    location: string;
    roi: number;
    period: number;
    periodUnit: string;
    maturity: number;
    minInvestment: string;
    investors: number;
    image: string;
    status: 'live' | 'upcoming' | 'ended';
    riskLevel: string;
    stakeable: boolean;
    rwaCertified: boolean;
    countdown?: string | null;
    launchDate?: string | null;
  };
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: number) => void;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isBookmarked, 
  onToggleBookmark, 
  onClick 
}) => {
  const getTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'agriyield': return <Leaf className="w-4 h-4" />;
      case 'agrifarms': return <TreePine className="w-4 h-4" />;
      case 'livestock': return <Cow className="w-4 h-4" />;
      case 'carbonvault': return <Shield className="w-4 h-4" />;
      case 'staking': return <Coins className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'low': return 'bg-agri-primary/20 text-agri-primary';
      case 'medium': return 'bg-agri-accent/20 text-agri-accent';
      case 'high': return 'bg-red-400/20 text-red-400';
      default: return 'bg-agri-secondary/50 text-agri-text/70';
    }
  };

  // Calculate target date for countdown
  const getTargetDate = () => {
    if (!project.countdown) return null;
    
    const days = parseInt(project.countdown.split(' ')[0]);
    if (isNaN(days)) return null;
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    return targetDate;
  };

  const targetDate = getTargetDate();

  return (
    <motion.div
      className="group cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden hover:border-agri-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-agri-primary/10">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/60 to-transparent" />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="flex space-x-2">
              <StatusBadge status={project.status} size="sm" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-light ${getRiskColor(project.riskLevel)}`}>
                {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
              </span>
            </div>
            <button
              onClick={(e) => onToggleBookmark(e, project.id)}
              className="w-8 h-8 bg-agri-dark/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-agri-primary/20 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-agri-primary" />
              ) : (
                <Bookmark className="w-4 h-4 text-agri-text/70" />
              )}
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-agri-primary font-light text-xl">{project.roi}%</div>
                <div className="text-agri-text/80 text-sm font-light">
                  {project.period} {project.periodUnit}
                </div>
              </div>
              {project.status === 'live' && targetDate && (
                <CountdownTimer 
                  targetDate={targetDate} 
                  className="bg-agri-dark/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs"
                />
              )}
              {project.status === 'upcoming' && project.launchDate && (
                <div className="flex items-center space-x-1 bg-agri-dark/70 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Clock className="w-3 h-3 text-agri-accent" />
                  <span className="text-agri-text/90 text-xs">{project.launchDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-light text-agri-text">{project.title}</h3>
            {project.rwaCertified && <RWAcertBadge size="sm" />}
          </div>
          
          <div className="flex items-center text-agri-text/70 text-sm mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              {getTypeIcon(project.type)}
              <span className="ml-1">{project.type}</span>
            </div>
          </div>
          
          {project.maturity > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-agri-text/70 mb-2">
                <span>Maturity Progress</span>
                <span>{project.maturity}%</span>
              </div>
              <div className="w-full bg-agri-border rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-agri-primary to-agri-primary/80 h-2 rounded-full"
                  style={{ width: `${project.maturity}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-agri-text/70">
                <Users className="w-4 h-4 mr-1" />
                {project.investors}
              </div>
              <div className="flex items-center text-sm text-agri-text/70">
                <DollarSign className="w-4 h-4 mr-1" />
                {project.minInvestment}
              </div>
            </div>
            <span className="text-agri-primary font-light group-hover:underline flex items-center">
              View Details
              <Eye className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;