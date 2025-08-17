import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Crown } from 'lucide-react';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChatWidget from './components/LiveChatWidget';
import FloatingDrone from './components/FloatingDrone';
import { AdminPreviewBanner } from './components/ui/AdminPreviewBanner';

// Pages
import HomePage from './pages/HomePage';
import AgriYield from './pages/AgriYield';
import AgriFarms from './pages/AgriFarms';
import CarbonVault from './pages/CarbonVault';
import GamingDashboard from './pages/GamingDashboard';
import AgriGPT from './pages/AgriGPT';
import UserDashboard from './pages/UserDashboard';
import ReferralSystem from './pages/ReferralSystem';
import Leaderboard from './pages/Leaderboard';
import Purchase from './pages/Purchase';
import AVStaking from './pages/AVStaking';
import NFTNaming from './pages/NFTNaming';
import SubmitProject from './pages/SubmitProject';
import LegalZone from './pages/LegalZone';
import RWAcertLanding from './pages/RWAcertLanding';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import NFTMarketplace from './pages/NFTMarketplace';
import FarmLive from './pages/FarmLive';
import SuperAdminLogin from './pages/SuperAdminLogin';
import Livestock from './pages/Livestock';
import AgriHub from './pages/AgriHub';
import INRPurchase from './pages/INRPurchase';
import MyCertificates from './pages/MyCertificates';

// SuperAdmin Dashboard placeholder
const SuperAdminDashboard = () => (
  <div className="min-h-screen py-20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Crown className="w-10 h-10 text-purple-400" />
      </div>
      <h1 className="text-3xl font-light text-agri-text mb-4">
        <span className="text-purple-400">SuperAdmin</span> Dashboard
      </h1>
      <p className="text-agri-text/70 mb-8">
        Complete system control and analytics
      </p>
      <div className="bg-agri-card border border-agri-border rounded-2xl p-8 max-w-md mx-auto">
        <h3 className="text-xl font-medium text-agri-text mb-4">Coming Soon</h3>
        <p className="text-agri-text/70">
          SuperAdmin dashboard with advanced analytics and system controls
        </p>
      </div>
    </div>
  </div>
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return null;
};

// Scroll progress bar
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-agri-primary to-agri-primary/50 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
    />
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-agri-dark text-agri-text font-outfit relative">
            <ScrollProgress />
            <ScrollToTop />
            <AdminPreviewBanner />
            
            <div className="relative z-10">
              <Navbar />
              <main className="pt-20">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                    <Route path="/agriyield" element={<PageWrapper><AgriYield /></PageWrapper>} />
                    <Route path="/agrifarms" element={<PageWrapper><AgriFarms /></PageWrapper>} />
                    <Route path="/carbonvault" element={<PageWrapper><CarbonVault /></PageWrapper>} />
                    <Route path="/gaming" element={<PageWrapper><GamingDashboard /></PageWrapper>} />
                    <Route path="/agrigpt" element={<PageWrapper><AgriGPT /></PageWrapper>} />
                    <Route path="/user-dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
                    <Route path="/referral" element={<PageWrapper><ReferralSystem /></PageWrapper>} />
                    <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
                    <Route path="/purchase" element={<PageWrapper><Purchase /></PageWrapper>} />
                    <Route path="/staking" element={<PageWrapper><AVStaking /></PageWrapper>} />
                    <Route path="/nft-naming" element={<PageWrapper><NFTNaming /></PageWrapper>} />
                    <Route path="/submit-project" element={<PageWrapper><SubmitProject /></PageWrapper>} />
                    <Route path="/legal" element={<PageWrapper><LegalZone /></PageWrapper>} />
                    <Route path="/rwa-cert" element={<PageWrapper><RWAcertLanding /></PageWrapper>} />
                    <Route path="/rwa-cert/my" element={<PageWrapper><MyCertificates /></PageWrapper>} />
                    <Route path="/admin" element={<PageWrapper><AdminPanel /></PageWrapper>} />
                    <Route path="/admin-dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                    <Route path="/nft-marketplace" element={<PageWrapper><NFTMarketplace /></PageWrapper>} />
                    <Route path="/farm-live" element={<PageWrapper><FarmLive /></PageWrapper>} />
                    <Route path="/superadmin-login" element={<PageWrapper><SuperAdminLogin /></PageWrapper>} />
                    <Route path="/superadmin-dashboard" element={<PageWrapper><SuperAdminDashboard /></PageWrapper>} />
                    <Route path="/livestock" element={<PageWrapper><Livestock /></PageWrapper>} />
                    <Route path="/agrihub" element={<PageWrapper><AgriHub /></PageWrapper>} />
                    <Route path="/inr-purchase" element={<PageWrapper><INRPurchase /></PageWrapper>} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
              <LiveChatWidget />
              <FloatingDrone />
            </div>
            
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(26, 31, 43, 0.95)',
                  color: '#DADADA',
                  border: '1px solid #2A2E3C',
                  backdropFilter: 'blur(12px)',
                },
                duration: 4000,
                success: {
                  iconTheme: {
                    primary: '#B3FFAB',
                    secondary: '#0B0F1C',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#0B0F1C',
                  },
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;