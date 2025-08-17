import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Phone,
  Mail
} from 'lucide-react';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMode, setChatMode] = useState('greeting'); // greeting, agrigpt, support
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: chatMode === 'agrigpt' 
          ? "I'm AgriGPT! I can help you with agricultural investments, ROI calculations, and carbon offset guidance. What would you like to know?"
          : "Thank you for your message! Our support team will get back to you within 24 hours.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const startAgriGPTChat = () => {
    setChatMode('agrigpt');
    setMessages([{
      id: 1,
      text: "Hello! I'm AgriGPT, your AI assistant for agricultural investments. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const startSupportChat = () => {
    setChatMode('support');
    setMessages([{
      id: 1,
      text: "Hi! I'm here to help you with any questions about Agriverse. Please describe your issue and we'll get back to you soon.",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const submitUserInfo = () => {
    if (userInfo.name && userInfo.email) {
      setChatMode('support');
      setMessages([{
        id: 1,
        text: `Hello ${userInfo.name}! Thanks for reaching out. How can we assist you today?`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-agri-primary to-agri-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageSquare className="w-6 h-6 text-agri-dark" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.8 : 1, 
              y: 0,
              height: isMinimized ? 60 : 480
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-agri-card border border-agri-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-agri-primary to-agri-accent p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-agri-dark/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-agri-dark" />
                </div>
                <div>
                  <div className="text-agri-dark font-medium">Agriverse Support</div>
                  <div className="text-agri-dark/70 text-xs">
                    {chatMode === 'agrigpt' ? 'AgriGPT Assistant' : 'Live Chat Support'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-agri-dark/70 hover:text-agri-dark transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-agri-dark/70 hover:text-agri-dark transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Content */}
                <div className="h-80 flex flex-col">
                  {chatMode === 'greeting' ? (
                    /* Greeting Screen */
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-agri-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-agri-primary" />
                        </div>
                        <h3 className="text-lg font-medium text-agri-text mb-2">How can we help?</h3>
                        <p className="text-agri-text/70 text-sm">Choose an option to get started</p>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={startAgriGPTChat}
                          className="w-full p-4 bg-agri-primary/10 border border-agri-primary/20 rounded-lg hover:bg-agri-primary/20 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <Bot className="w-5 h-5 text-agri-primary" />
                            <div>
                              <div className="text-agri-text font-medium">Chat with AgriGPT</div>
                              <div className="text-agri-text/70 text-sm">AI assistant for investment guidance</div>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => setChatMode('userinfo')}
                          className="w-full p-4 bg-agri-secondary/20 border border-agri-border rounded-lg hover:bg-agri-secondary/30 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-agri-accent" />
                            <div>
                              <div className="text-agri-text font-medium">Contact Support</div>
                              <div className="text-agri-text/70 text-sm">Get help from our team</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : chatMode === 'userinfo' ? (
                    /* User Info Collection */
                    <div className="flex-1 p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-medium text-agri-text mb-2">Contact Information</h3>
                        <p className="text-agri-text/70 text-sm">Please provide your details so we can assist you better</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-agri-text/70 text-sm mb-2">Name</label>
                          <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text text-sm focus:border-agri-primary focus:outline-none"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-agri-text/70 text-sm mb-2">Email</label>
                          <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                            className="w-full px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text text-sm focus:border-agri-primary focus:outline-none"
                            placeholder="your@email.com"
                          />
                        </div>
                        <button
                          onClick={submitUserInfo}
                          disabled={!userInfo.name || !userInfo.email}
                          className="w-full py-2 bg-agri-primary text-agri-dark rounded-lg font-medium text-sm hover:bg-agri-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Start Chat
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Chat Messages */
                    <>
                      <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                message.sender === 'user' 
                                  ? 'bg-agri-primary/20 text-agri-primary' 
                                  : 'bg-agri-accent/20 text-agri-accent'
                              }`}>
                                {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                              </div>
                              <div className={`rounded-lg p-3 text-sm ${
                                message.sender === 'user'
                                  ? 'bg-agri-primary/10 border border-agri-primary/20 text-agri-text'
                                  : 'bg-agri-secondary/20 border border-agri-border text-agri-text'
                              }`}>
                                {message.text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input */}
                      <div className="p-4 border-t border-agri-border">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 bg-agri-secondary/20 border border-agri-border rounded-lg text-agri-text text-sm placeholder-agri-text/50 focus:border-agri-primary focus:outline-none"
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim()}
                            className="px-3 py-2 bg-agri-primary text-agri-dark rounded-lg hover:bg-agri-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;