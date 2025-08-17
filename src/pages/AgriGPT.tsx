import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Leaf, 
  TrendingUp, 
  Calculator, 
  TreePine,
  MessageSquare,
  Lightbulb,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';

const AgriGPT = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm AgriGPT, your AI assistant for agricultural investments and carbon offsetting. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    {
      icon: TrendingUp,
      text: "What's the best ROI crop for beginners?",
      category: "Investment"
    },
    {
      icon: Calculator,
      text: "Calculate my carbon footprint",
      category: "Carbon"
    },
    {
      icon: TreePine,
      text: "How do tree NFTs work?",
      category: "Trees"
    },
    {
      icon: Leaf,
      text: "Sustainable farming practices",
      category: "Farming"
    },
    {
      icon: BarChart3,
      text: "Compare AgriYield vs AgriFarms",
      category: "Products"
    },
    {
      icon: Globe,
      text: "Environmental impact of my investments",
      category: "Impact"
    }
  ];

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('return')) {
      return "For beginners, I recommend starting with AgriYield projects like wheat or rice cultivation, which typically offer 12-18% ROI over 90-180 days. These have lower risk profiles and shorter commitment periods. Would you like me to explain the specific factors that affect agricultural ROI?";
    }
    
    if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint')) {
      return "I can help you calculate your carbon footprint! Based on your lifestyle factors like travel, home energy use, and diet, I'll recommend the right number of tree NFTs to offset your emissions. A typical household needs about 15-20 tree NFTs annually. Would you like to start the carbon calculator?";
    }
    
    if (lowerMessage.includes('tree') || lowerMessage.includes('nft')) {
      return "Tree NFTs in our CarbonVault represent real trees planted in verified reforestation projects. Each NFT absorbs approximately 0.2-0.3 tons of CO₂ annually and costs $20-30. They're perfect for long-term environmental impact and can be staked for additional AV token rewards. What specific aspect interests you most?";
    }
    
    if (lowerMessage.includes('sustainable') || lowerMessage.includes('farming')) {
      return "Sustainable farming practices we support include organic certification, water-efficient irrigation, crop rotation, and integrated pest management. Our partner farms use precision agriculture and soil health monitoring. These practices typically increase yields by 15-25% while reducing environmental impact. Would you like details on any specific practice?";
    }
    
    if (lowerMessage.includes('compare') || lowerMessage.includes('difference')) {
      return "Great question! AgriYield focuses on short-term crop investments (90-180 days, 12-18% ROI) - perfect for quick returns. AgriFarms offers long-term tree and land investments (1-5 years, 8-15% ROI) with additional benefits like live monitoring and staking rewards. AgriYield is ideal for active trading, while AgriFarms suits long-term wealth building. Which timeframe interests you more?";
    }
    
    if (lowerMessage.includes('impact') || lowerMessage.includes('environment')) {
      return "Your investments create measurable environmental impact! Every $1,000 invested typically: • Sequesters 2-5 tons of CO₂ annually • Supports 0.5-1 acre of sustainable farming • Creates employment for 2-3 rural workers • Contributes to biodiversity preservation. You can track your personal impact dashboard showing total CO₂ offset, acres supported, and community impact. Want to see your current impact metrics?";
    }
    
    return "That's an interesting question! I'm here to help with agricultural investments, carbon offsetting, sustainable farming, and platform guidance. Could you provide more details about what you'd like to know? I can assist with ROI calculations, environmental impact, investment strategies, or explain how our NFT systems work.";
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-light font-outfit mb-6 text-agri-text">
            <span className="text-agri-primary">AgriGPT</span> Assistant
          </h1>
          <p className="text-xl text-agri-text/70 font-light max-w-3xl mx-auto">
            Your AI-powered guide to agricultural investments, carbon offsetting, and sustainable farming. 
            Get personalized advice and insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-medium text-agri-text mb-6 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-agri-primary" />
                Quick Questions
              </h3>
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="w-full text-left p-3 bg-agri-secondary/20 border border-agri-border rounded-lg hover:border-agri-primary/50 hover:bg-agri-primary/5 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <question.icon className="w-4 h-4 text-agri-primary mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-sm text-agri-text font-light">{question.text}</div>
                        <div className="text-xs text-agri-text/50 mt-1">{question.category}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-agri-card border border-agri-border rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-agri-secondary/20 border-b border-agri-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-agri-primary to-agri-accent rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-agri-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-agri-text">AgriGPT</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-agri-primary rounded-full animate-pulse" />
                      <span className="text-sm text-agri-text/70">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-agri-accent/20 text-agri-accent' 
                          : 'bg-agri-primary/20 text-agri-primary'
                      }`}>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-agri-primary/10 border border-agri-primary/20'
                          : 'bg-agri-secondary/20 border border-agri-border'
                      }`}>
                        <p className="text-agri-text font-light leading-relaxed">{message.content}</p>
                        <div className="text-xs text-agri-text/50 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-agri-primary/20 text-agri-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-agri-secondary/20 border border-agri-border rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-agri-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-agri-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-agri-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-agri-border p-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me about agricultural investments, carbon offsetting, or farming..."
                    className="flex-1 px-4 py-3 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-agri-primary to-agri-accent text-agri-dark rounded-lg font-medium hover:shadow-lg hover:shadow-agri-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-agri-primary mx-auto mb-3" />
                <h4 className="text-lg font-medium text-agri-text mb-2">Investment Guidance</h4>
                <p className="text-agri-text/70 font-light text-sm">Get personalized ROI calculations and investment strategies</p>
              </div>
              <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
                <Calculator className="w-8 h-8 text-agri-accent mx-auto mb-3" />
                <h4 className="text-lg font-medium text-agri-text mb-2">Carbon Calculator</h4>
                <p className="text-agri-text/70 font-light text-sm">Calculate footprint and get offset recommendations</p>
              </div>
              <div className="bg-agri-card border border-agri-border rounded-xl p-6 text-center">
                <Leaf className="w-8 h-8 text-agri-primary mx-auto mb-3" />
                <h4 className="text-lg font-medium text-agri-text mb-2">Farming Insights</h4>
                <p className="text-agri-text/70 font-light text-sm">Learn about sustainable practices and crop optimization</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AgriGPT;