import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Users, BarChart3, Settings, Database, Award } from 'lucide-react';

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-purple-400">SuperAdmin</span> Dashboard
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Complete system control and analytics for the Agriverse platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Users className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-agri-text/70 text-sm">Total Users</span>
            </div>
            <div className="text-3xl font-light text-purple-400">2,847</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-6 h-6 text-agri-primary mr-2" />
              <span className="text-agri-text/70 text-sm">Platform Revenue</span>
            </div>
            <div className="text-3xl font-light text-agri-primary">$2.4M</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Database className="w-6 h-6 text-agri-accent mr-2" />
              <span className="text-agri-text/70 text-sm">Total Assets</span>
            </div>
            <div className="text-3xl font-light text-agri-accent">8,934</div>
          </div>
          <div className="bg-agri-card border border-agri-border rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Award className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-agri-text/70 text-sm">Certificates</span>
            </div>
            <div className="text-3xl font-light text-purple-400">1,247</div>
          </div>
        </motion.div>

        {/* Feature Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "System Analytics",
              description: "Advanced analytics and reporting",
              icon: BarChart3,
              color: "from-purple-500/20 to-purple-600/20 border-purple-500/30"
            },
            {
              title: "Role Management",
              description: "Manage user roles and permissions",
              icon: Shield,
              color: "from-agri-primary/20 to-agri-primary/30 border-agri-primary/30"
            },
            {
              title: "Platform Settings",
              description: "Configure platform-wide settings",
              icon: Settings,
              color: "from-agri-accent/20 to-agri-accent/30 border-agri-accent/30"
            },
            {
              title: "Database Management",
              description: "Monitor and manage database operations",
              icon: Database,
              color: "from-blue-500/20 to-blue-600/20 border-blue-500/30"
            },
            {
              title: "User Administration",
              description: "Advanced user management tools",
              icon: Users,
              color: "from-green-500/20 to-green-600/20 border-green-500/30"
            },
            {
              title: "Audit Logs",
              description: "View system audit trails",
              icon: Award,
              color: "from-orange-500/20 to-orange-600/20 border-orange-500/30"
            }
          ].map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-r ${module.color} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer`}
            >
              <module.icon className="w-12 h-12 text-agri-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-agri-text mb-2">{module.title}</h3>
              <p className="text-agri-text/70 font-light">{module.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
        >
          <Crown className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h3 className="text-3xl font-light text-agri-text mb-4">
            SuperAdmin Features
          </h3>
          <p className="text-agri-text/70 font-light mb-6 max-w-2xl mx-auto">
            Advanced system administration features are being developed. 
            This dashboard will provide complete platform control and analytics.
          </p>
          <div className="text-purple-400 font-medium">
            Full implementation coming soon
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;