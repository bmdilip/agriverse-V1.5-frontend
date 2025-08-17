import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/auth.store';
import toast from 'react-hot-toast';
import { 
  Menu, 
  X, 
  Wallet, 
  ChevronDown, 
  User, 
  Shield, 
  Crown, 
  Settings,
  BarChart3,
  Globe,
  Leaf,
  Tag,
  Building2,
  Gamepad2,
  Wrench,
  ArrowUpDown,
  Calculator,
  Camera,
  FileText,
  Users,
  TrendingUp,
  Award,
  Bot,
  TreePine,
  Coins,
  Cog as Cow
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, isDemoMode, connectMetaMask, disconnect, address } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    if (isAuthenticated) {
      disconnect();
      toast.success('Wallet disconnected');
      return;
    }

    try {
      // Check if we're in demo mode
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        useAuthStore.getState().enableDemoMode('user');
        toast.success('Demo wallet connected!');
        return;
      }

      await connectMetaMask();
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const navigation = [
    {
      name: 'Ecosystem',
      icon: Globe,
      emoji: '🌍',
      href: '#',
      dropdown: [
        { name: 'AgriYield', href: '/agriyield', desc: 'Short-term crop investments', icon: Leaf },
        { name: 'AgriFarms', href: '/agrifarms', desc: 'Long-term tree & land NFTs', icon: TreePine },
        { name: 'CarbonVault', href: '/carbonvault', desc: 'Carbon offset projects', icon: Shield },
        { name: 'Livestock', href: '/livestock', desc: 'Tokenized cattle and dairy units', icon: Cow },
        { name: 'RWAcert', href: '/rwa-cert', desc: 'Asset certification', icon: Building2 },
      ]
    },
    {
      name: 'AgriHub',
      icon: Leaf,
      emoji: '🌱',
      href: '/agrihub',
      tooltip: 'Explore all projects'
    },
    {
      name: 'NFT Marketplace',
      icon: Tag,
      emoji: '🏷',
      href: '/nft-marketplace',
      subtitle: 'Secondary Resale',
      tooltip: 'Buy & sell NFTs'
    },
    {
      name: 'RWAcert',
      icon: Building2,
      emoji: '🏛',
      href: '/rwa-cert',
      tooltip: 'Asset certification'
    },
    {
      name: 'Gaming',
      icon: Gamepad2,
      emoji: '🎮',
      href: '#',
      dropdown: [
        { name: 'Gaming Dashboard', href: '/gaming', desc: 'XP, badges & achievements', icon: Gamepad2 },
        { name: 'Leaderboard', href: '/leaderboard', desc: 'Top investors & carbon heroes', icon: Award },
        { name: 'Referral Program', href: '/referral', desc: 'Earn rewards for referrals', icon: Users },
      ]
    },
    {
      name: 'Dock',
      icon: Wrench,
      emoji: '🧰',
      href: '#',
      dropdown: [
        { name: 'AgriGPT', href: '/agrigpt', desc: 'AI investment assistant', icon: Bot },
        { name: 'Carbon Calculator', href: '/carbonvault', desc: 'Calculate your footprint', icon: Calculator },
        { name: 'FarmLive', href: '/farm-live', desc: 'Live farm monitoring', icon: Camera },
        { name: 'Submit Project', href: '/submit-project', desc: 'List your agricultural project', icon: FileText },
      ]
    },
    {
      name: 'Purchase',
      icon: ArrowUpDown,
      emoji: '💱',
      href: '#',
      dropdown: [
        { name: 'Buy AV Tokens', href: '/purchase', desc: 'Purchase platform tokens', icon: Coins },
        { name: 'Fiat Purchase', href: '/inr-purchase', desc: 'Buy with local currency', icon: ArrowUpDown },
        { name: 'Token Chart', href: '/purchase#chart', desc: 'View price & analytics', icon: TrendingUp },
      ]
    }
  ];

  const dashboardDropdown = [
    { name: 'User Dashboard', href: '/user-dashboard', icon: User, desc: 'Your investments & portfolio' },
    { name: 'Admin Panel', href: '/admin', icon: Shield, desc: 'Platform administration' },
    { name: 'SuperAdmin', href: '/superadmin-dashboard', icon: Crown, desc: 'System management' },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-effect shadow-2xl py-2' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-agri-primary to-agri-primary/80 rounded-xl flex items-center justify-center neon-glow"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(179, 255, 171, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-agri-dark font-bold text-lg">A</span>
              </motion.div>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <motion.button 
                      className={`flex items-center space-x-2 px-3 py-2 text-agri-text hover:text-agri-primary transition-all duration-200 rounded-xl hover:bg-agri-primary/5 group ${
                        location.pathname.includes(item.href.replace('#', '')) ? 'text-agri-primary bg-agri-primary/10' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      title={item.tooltip}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm font-light hidden xl:block">{item.name}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </motion.button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 glass-effect rounded-2xl shadow-2xl overflow-hidden border border-agri-border/50"
                        >
                          <div className="p-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="flex items-center space-x-3 px-4 py-3 text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 transition-all duration-200 rounded-xl group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <subItem.icon className="w-5 h-5 text-agri-primary/70 group-hover:text-agri-primary" />
                                <div>
                                  <div className="font-light">{subItem.name}</div>
                                  <div className="text-xs text-agri-text/60 mt-0.5">{subItem.desc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={item.href}>
                    <motion.div
                      className={`flex items-center space-x-2 px-3 py-2 text-agri-text hover:text-agri-primary transition-all duration-200 rounded-xl hover:bg-agri-primary/5 group ${
                        location.pathname === item.href ? 'text-agri-primary bg-agri-primary/10' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      title={item.tooltip}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <div className="hidden xl:block">
                        <div className="text-sm font-light">{item.name}</div>
                        {item.subtitle && (
                          <div className="text-xs text-agri-text/60">{item.subtitle}</div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Wallet Connection */}
            <motion.button
              onClick={connectWallet}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                isAuthenticated
                  ? 'bg-agri-primary/10 text-agri-primary border-agri-primary/30 neon-glow'
                  : 'glass-effect text-agri-text border-agri-border hover:border-agri-primary/50 hover:bg-agri-primary/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isAuthenticated ? 'Connected Wallet' : 'Connect Wallet'}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-light hidden xl:block">
                {isAuthenticated ? (isDemoMode ? 'Demo Wallet' : `${address?.slice(0, 6)}...${address?.slice(-4)}`) : 'Connect'}
              </span>
            </motion.button>
            
            {/* Dashboard Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('dashboard')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button
                className="flex items-center space-x-2 px-3 py-2 glass-effect border border-agri-border text-agri-text rounded-xl hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="Dashboard"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-lg">📊</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${
                  activeDropdown === 'dashboard' ? 'rotate-180' : ''
                }`} />
              </motion.button>
              
              <AnimatePresence>
                {activeDropdown === 'dashboard' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 glass-effect rounded-2xl shadow-2xl overflow-hidden border border-agri-border/50"
                  >
                    <div className="p-2">
                      {dashboardDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 transition-all duration-200 rounded-xl group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <item.icon className="w-5 h-5 text-agri-primary/70 group-hover:text-agri-primary" />
                          <div>
                            <div className="font-light">{item.name}</div>
                            <div className="text-xs text-agri-text/60 mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <Link to="/admin">
              <motion.button
                className="flex items-center space-x-2 px-3 py-2 glass-effect border border-agri-border text-agri-text rounded-xl hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
                <span className="text-lg">⚙️</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-agri-text hover:text-agri-primary transition-colors duration-200 rounded-lg hover:bg-agri-primary/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass-effect border-t border-agri-border/50 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Mobile Navigation Items */}
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2 text-agri-text font-light">
                        <span className="text-lg">{item.emoji}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="flex items-center space-x-3 px-6 py-2 text-sm text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 transition-all duration-200 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3 px-3 py-2 text-agri-text hover:text-agri-primary hover:bg-agri-primary/5 transition-all duration-200 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <div className="font-light">{item.name}</div>
                        {item.subtitle && (
                          <div className="text-xs text-agri-text/60">{item.subtitle}</div>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Controls */}
              <div className="pt-4 border-t border-agri-border/50 space-y-3">
                {/* Wallet Connection */}
                <motion.button
                  onClick={connectWallet}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isAuthenticated
                      ? 'bg-agri-primary/10 border-agri-primary/30 text-agri-primary'
                      : 'glass-effect border-agri-border text-agri-text hover:border-agri-primary/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isAuthenticated ? (isDemoMode ? 'Demo Wallet' : `${address?.slice(0, 6)}...${address?.slice(-4)}`) : 'Connect Wallet'}</span>
                </motion.button>
                
                {/* Dashboard Links */}
                {dashboardDropdown.map((item) => (
                  <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                    <motion.button 
                      className="w-full flex items-center space-x-3 px-4 py-3 glass-effect border border-agri-border text-agri-text rounded-xl hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;