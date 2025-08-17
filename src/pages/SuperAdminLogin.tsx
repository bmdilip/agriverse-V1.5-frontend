import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Key,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    twoFactor: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === 'superadmin' && credentials.password === 'admin123') {
        if (loginStep === 1) {
          setLoginStep(2);
        } else if (credentials.twoFactor === '123456') {
          navigate('/superadmin-dashboard');
        } else {
          setError('Invalid 2FA code');
        }
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-light text-agri-text mb-2">
            <span className="text-purple-400">SuperAdmin</span> Access
          </h1>
          <p className="text-agri-text/70 font-light">
            Secure login for platform administrators
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-agri-card border border-agri-border rounded-2xl p-8"
        >
          {/* Security Notice */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-purple-400 font-medium text-sm">High Security Zone</h3>
                <p className="text-agri-text/70 text-xs mt-1">
                  This area requires elevated privileges. All actions are logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className={`flex items-center space-x-2 ${loginStep >= 1 ? 'text-purple-400' : 'text-agri-text/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                loginStep >= 1 ? 'border-purple-400 bg-purple-400/20' : 'border-agri-border'
              }`}>
                {loginStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm">Credentials</span>
            </div>
            <div className={`w-8 h-0.5 ${loginStep > 1 ? 'bg-purple-400' : 'bg-agri-border'}`} />
            <div className={`flex items-center space-x-2 ${loginStep >= 2 ? 'text-purple-400' : 'text-agri-text/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                loginStep >= 2 ? 'border-purple-400 bg-purple-400/20' : 'border-agri-border'
              }`}>
                2
              </div>
              <span className="text-sm">2FA</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginStep === 1 ? (
              <>
                {/* Username */}
                <div>
                  <label className="block text-agri-text/70 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Enter username"
                      className="w-full pl-10 pr-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-purple-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-agri-text/70 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-12 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-purple-400 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-agri-text/50 hover:text-agri-text"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* 2FA Step */
              <div>
                <label className="block text-agri-text/70 mb-2">Two-Factor Authentication</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-agri-text/50" />
                  <input
                    type="text"
                    value={credentials.twoFactor}
                    onChange={(e) => handleInputChange('twoFactor', e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-purple-400 focus:outline-none text-center text-lg tracking-widest"
                    required
                  />
                </div>
                <p className="text-agri-text/60 text-sm mt-2">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                loginStep === 1 ? 'Continue' : 'Access Dashboard'
              )}
            </motion.button>

            {/* Back Button for 2FA */}
            {loginStep === 2 && (
              <button
                type="button"
                onClick={() => setLoginStep(1)}
                className="w-full py-3 bg-agri-secondary/50 text-agri-text rounded-lg font-medium hover:bg-agri-secondary transition-colors"
              >
                Back to Credentials
              </button>
            )}
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-agri-secondary/20 rounded-lg">
            <h4 className="text-agri-text font-medium text-sm mb-2">Demo Credentials:</h4>
            <div className="text-agri-text/70 text-xs space-y-1">
              <div>Username: <code className="bg-agri-dark px-1 rounded">superadmin</code></div>
              <div>Password: <code className="bg-agri-dark px-1 rounded">admin123</code></div>
              <div>2FA Code: <code className="bg-agri-dark px-1 rounded">123456</code></div>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="text-center">
            <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-agri-text text-sm">Multi-Factor Auth</div>
          </div>
          <div className="text-center">
            <Lock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-agri-text text-sm">Encrypted Sessions</div>
          </div>
          <div className="text-center">
            <Eye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-agri-text text-sm">Activity Monitoring</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;