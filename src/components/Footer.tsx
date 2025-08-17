import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  MessageSquare, 
  Youtube, 
  Instagram,
  Facebook,
  Linkedin,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { 
      icon: Twitter, 
      href: 'https://twitter.com/TheAgriverse', 
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    { 
      icon: MessageSquare, 
      href: 'https://t.me/theagriverse', 
      label: 'Telegram',
      color: 'hover:text-blue-500'
    },
    { 
      icon: MessageSquare, 
      href: 'https://discord.gg/paFen4Ys3s', 
      label: 'Discord',
      color: 'hover:text-indigo-400'
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/theagriverse', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/theagriverse/', 
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Youtube, 
      href: 'https://www.youtube.com/@theagriverse', 
      label: 'YouTube',
      color: 'hover:text-red-500'
    },
    { 
      icon: MessageSquare, 
      href: 'https://reddit.com/r/theagriverse', 
      label: 'Reddit',
      color: 'hover:text-orange-500'
    },
    { 
      icon: MessageSquare, 
      href: 'https://medium.com/@theagriverse', 
      label: 'Medium',
      color: 'hover:text-green-400'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/agriverse', 
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
    },
  ];

  const footerNavigation = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', href: '/' },
        { name: 'AgriHub', href: '/agrihub' },
        { name: 'NFT Marketplace', href: '/nft-marketplace' },
        { name: 'RWAcert', href: '/rwa-cert' },
      ]
    },
    {
      title: 'AgriEcosystem',
      links: [
        { name: 'AgriYield', href: '/agriyield' },
        { name: 'AgriFarms', href: '/agrifarms' },
        { name: 'CarbonVault', href: '/carbonvault' },
        { name: 'Livestock', href: '/livestock' },
        { name: 'Livestock', href: '/livestock' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'AgriGPT', href: '/agrigpt' },
        { name: 'FarmLive', href: '/farm-live' },
        { name: 'Leaderboard', href: '/leaderboard' },
        { name: 'Referral Program', href: '/referral' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Submit Project', href: '/submit-project' },
        { name: 'Contact Us', href: '/contact' },
      ]
    }
  ];

  // Custom icons for Reddit and Medium
  const RedditIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  );

  const MediumIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  );

  return (
    <footer className="relative glass-effect border-t border-agri-border particle-bg">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-agri-primary to-agri-primary/80 rounded-2xl flex items-center justify-center neon-glow">
                <span className="text-agri-dark font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-3xl font-light bg-gradient-to-r from-agri-primary to-agri-primary/80 bg-clip-text text-transparent">
                  Agriverse
                </span>
                <div className="text-sm text-agri-text/60 font-light">Web3 Agriculture Platform</div>
              </div>
            </div>
            <p className="text-agri-text/70 font-light max-w-2xl mx-auto leading-relaxed">
              Invest in Real Farms, Crops & Carbon Projects—Powered by Blockchain. 
              Building the future of sustainable agriculture through Web3 technology.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {footerNavigation.map((section, index) => (
              <div key={section.title}>
                <h3 className="text-agri-text font-light text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-agri-text/70 hover:text-agri-primary transition-colors duration-200 font-light text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => {
                let IconComponent = social.icon;
                
                // Use custom icons for specific platforms
                if (social.label === 'Reddit') IconComponent = RedditIcon;
                if (social.label === 'Medium') IconComponent = MediumIcon;
                
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-12 h-12 glass-effect border border-agri-border rounded-xl flex items-center justify-center text-agri-text/70 transition-all duration-300 hover:border-agri-primary/50 hover:bg-agri-primary/5 card-lift ${social.color}`}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    title={social.label}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-8 border-t border-agri-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-agri-text/60 text-sm font-light">
              © 2025 Agriverse. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/legal"
                className="text-agri-text/60 hover:text-agri-primary text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/legal"
                className="text-agri-text/60 hover:text-agri-primary text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/legal"
                className="text-agri-text/60 hover:text-agri-primary text-sm transition-colors duration-200"
              >
                Risk Disclosure
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;