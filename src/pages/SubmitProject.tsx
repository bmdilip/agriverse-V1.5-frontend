import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  MapPin, 
  FileText, 
  Camera, 
  Award, 
  Shield,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  Leaf,
  TreePine,
  Building,
  Phone,
  Mail,
  Globe,
  Plus,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const SubmitProject = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    projectName: '',
    projectType: '',
    location: '',
    size: '',
    description: '',
    
    // Contact Information
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    
    // Project Details
    expectedROI: '',
    duration: '',
    minInvestment: '',
    totalFunding: '',
    
    // Documents
    documents: [],
    images: [],
    
    // Verification
    landTitle: false,
    environmentalClearance: false,
    businessLicense: false,
    insuranceCoverage: false
  });

  const projectTypes = [
    { id: 'crop', label: 'Crop Cultivation', icon: Leaf },
    { id: 'tree', label: 'Tree Plantation', icon: TreePine },
    { id: 'land', label: 'Agricultural Land', icon: Building },
    { id: 'carbon', label: 'Carbon Project', icon: Shield }
  ];

  const steps = [
    { id: 1, title: 'Basic Information', icon: FileText },
    { id: 2, title: 'Project Details', icon: DollarSign },
    { id: 3, title: 'Documentation', icon: Upload },
    { id: 4, title: 'Verification', icon: Shield },
    { id: 5, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (type, files) => {
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...fileArray]
    }));
    toast.success(`${fileArray.length} file(s) uploaded successfully`);
  };

  const removeFile = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const submitProject = () => {
    toast.success('Project submitted successfully! We will review and contact you within 48 hours.');
    // Reset form or redirect
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-agri-text/70 mb-2">Project Name *</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                placeholder="Enter your project name"
                className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-agri-text/70 mb-2">Project Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange('projectType', type.id)}
                    className={`p-4 border rounded-lg transition-all duration-300 ${
                      formData.projectType === type.id
                        ? 'border-agri-primary bg-agri-primary/10'
                        : 'border-agri-border hover:border-agri-primary/50'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      formData.projectType === type.id ? 'text-agri-primary' : 'text-agri-text/70'
                    }`} />
                    <div className={`text-sm ${
                      formData.projectType === type.id ? 'text-agri-primary' : 'text-agri-text/70'
                    }`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-agri-text/70 mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State, Country"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-agri-text/70 mb-2">Size *</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="e.g., 10 acres, 500 trees"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-agri-text/70 mb-2">Project Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your project, farming methods, sustainability practices, etc."
                rows={4}
                className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-agri-text/70 mb-2">Owner Name *</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-agri-text/70 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-agri-text/70 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-agri-text/70 mb-2">Website (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourfarm.com"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-agri-text/70 mb-2">Expected ROI (%) *</label>
                <input
                  type="number"
                  value={formData.expectedROI}
                  onChange={(e) => handleInputChange('expectedROI', e.target.value)}
                  placeholder="e.g., 15"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-agri-text/70 mb-2">Project Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 12 months, 3 years"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-agri-text/70 mb-2">Minimum Investment ($) *</label>
                <input
                  type="number"
                  value={formData.minInvestment}
                  onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-agri-text/70 mb-2">Total Funding Needed ($) *</label>
                <input
                  type="number"
                  value={formData.totalFunding}
                  onChange={(e) => handleInputChange('totalFunding', e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text focus:border-agri-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-agri-text mb-4">Revenue Model</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-agri-text/70">Crop/Product Sales</span>
                  <span className="text-agri-primary">Primary Revenue</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-agri-text/70">Carbon Credits (if applicable)</span>
                  <span className="text-agri-accent">Secondary Revenue</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-agri-text/70">Land Appreciation</span>
                  <span className="text-agri-primary">Long-term Value</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-agri-text/70 mb-4">Project Images *</label>
              <div className="border-2 border-dashed border-agri-border rounded-xl p-8 text-center">
                <Camera className="w-12 h-12 text-agri-text/50 mx-auto mb-4" />
                <p className="text-agri-text/70 mb-4">Upload photos of your land, crops, or facilities</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('images', e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium cursor-pointer hover:bg-agri-primary/90 transition-colors"
                >
                  Choose Images
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-agri-secondary/20 rounded-lg flex items-center justify-center">
                        <span className="text-agri-text/70 text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile('images', index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-agri-text/70 mb-4">Legal Documents *</label>
              <div className="border-2 border-dashed border-agri-border rounded-xl p-8 text-center">
                <FileText className="w-12 h-12 text-agri-text/50 mx-auto mb-4" />
                <p className="text-agri-text/70 mb-4">Upload land titles, permits, certificates, etc.</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('documents', e.target.files)}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="px-6 py-3 bg-agri-accent text-agri-dark rounded-lg font-medium cursor-pointer hover:bg-agri-accent/90 transition-colors"
                >
                  Choose Documents
                </label>
              </div>
              {formData.documents.length > 0 && (
                <div className="space-y-2 mt-4">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-agri-secondary/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-agri-primary" />
                        <span className="text-agri-text">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile('documents', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-agri-secondary/20 border border-agri-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-agri-text mb-4">Required Verifications</h3>
              <div className="space-y-4">
                {[
                  { key: 'landTitle', label: 'Land Title/Ownership Documents' },
                  { key: 'environmentalClearance', label: 'Environmental Clearance' },
                  { key: 'businessLicense', label: 'Business License/Registration' },
                  { key: 'insuranceCoverage', label: 'Insurance Coverage' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-agri-text">{item.label}</span>
                    <button
                      onClick={() => handleInputChange(item.key, !formData[item.key])}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        formData[item.key]
                          ? 'bg-agri-primary/20 text-agri-primary'
                          : 'bg-agri-secondary/50 text-agri-text/70'
                      }`}
                    >
                      {formData[item.key] ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      <span>{formData[item.key] ? 'Verified' : 'Pending'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-agri-primary/10 border border-agri-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-medium text-agri-text mb-4">RWAcert Verification Process</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-agri-primary text-sm font-medium">1</span>
                  </div>
                  <span className="text-agri-text/70">Document Review (2-3 business days)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-agri-primary text-sm font-medium">2</span>
                  </div>
                  <span className="text-agri-text/70">On-site Inspection (if required)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-agri-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-agri-primary text-sm font-medium">3</span>
                  </div>
                  <span className="text-agri-text/70">RWAcert Certification Issuance</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-agri-card border border-agri-border rounded-xl p-6">
              <h3 className="text-xl font-medium text-agri-text mb-6">Project Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-agri-text font-medium mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Project Name:</span>
                      <span className="text-agri-text">{formData.projectName || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Type:</span>
                      <span className="text-agri-text">{formData.projectType || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Location:</span>
                      <span className="text-agri-text">{formData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Size:</span>
                      <span className="text-agri-text">{formData.size || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-agri-text font-medium mb-3">Financial Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Expected ROI:</span>
                      <span className="text-agri-primary">{formData.expectedROI || 'Not specified'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Duration:</span>
                      <span className="text-agri-text">{formData.duration || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Min Investment:</span>
                      <span className="text-agri-text">${formData.minInvestment || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-text/70">Total Funding:</span>
                      <span className="text-agri-text">${formData.totalFunding || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-agri-accent/10 border border-agri-accent/20 rounded-xl p-6">
              <h3 className="text-lg font-medium text-agri-text mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-agri-primary" />
                  <span className="text-agri-text/70">Project review within 48 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-agri-primary" />
                  <span className="text-agri-text/70">RWAcert verification process initiation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-agri-primary" />
                  <span className="text-agri-text/70">NFT minting and platform listing</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">Submit</span> Your Project
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            List your agricultural land, farm, or carbon project on Agriverse. 
            Get verified and start receiving investments from our global community.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  activeStep >= step.id ? 'text-agri-primary' : 'text-agri-text/50'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    activeStep >= step.id 
                      ? 'border-agri-primary bg-agri-primary/20' 
                      : 'border-agri-border bg-agri-secondary/20'
                  }`}>
                    {activeStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-agri-primary' : 'bg-agri-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-light text-agri-text mb-2">
              {steps.find(s => s.id === activeStep)?.title}
            </h2>
            <p className="text-agri-text/70">
              Step {activeStep} of {steps.length}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={activeStep === 1}
              className="px-6 py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {activeStep < 5 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-agri-primary text-agri-dark rounded-lg font-medium hover:bg-agri-primary/90 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <motion.button
                onClick={submitProject}
                className="px-8 py-3 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Project
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-agri-secondary/20 border border-agri-border rounded-2xl p-8"
        >
          <h3 className="text-xl font-medium text-agri-text mb-6">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <h4 className="text-agri-text font-medium mb-2">Email Support</h4>
              <p className="text-agri-text/70 text-sm">projects@agriverse.io</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-agri-accent mx-auto mb-3" />
              <h4 className="text-agri-text font-medium mb-2">Phone Support</h4>
              <p className="text-agri-text/70 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <FileText className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <h4 className="text-agri-text font-medium mb-2">Documentation</h4>
              <p className="text-agri-text/70 text-sm">View submission guide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProject;