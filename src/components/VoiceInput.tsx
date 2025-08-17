import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation states for the mic button
  const pulseVariants = {
    listening: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 0 0 rgba(179, 255, 171, 0.4)',
        '0 0 0 10px rgba(179, 255, 171, 0.2)',
        '0 0 0 0 rgba(179, 255, 171, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop'
      }
    },
    idle: {
      scale: 1,
      boxShadow: '0 0 0 0 rgba(179, 255, 171, 0)'
    }
  };

  // Simulated voice recognition (in a real app, you'd use the Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    
    setError(null);
    setIsListening(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(true);
      
      // Simulate result after 2 seconds
      setTimeout(() => {
        setIsListening(false);
        setIsProcessing(false);
        
        // Simulate a transcript
        onTranscript("What's the ROI on the organic wheat farm project?");
      }, 2000);
    }, 3000);
  };

  return (
    <div>
      <motion.button
        onClick={toggleListening}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          isListening 
            ? 'bg-agri-primary text-agri-dark' 
            : 'bg-agri-secondary/50 text-agri-text hover:bg-agri-primary/20 hover:text-agri-primary'
        }`}
        variants={pulseVariants}
        animate={isListening ? 'listening' : 'idle'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isProcessing ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : isListening ? (
          <Mic className="w-5 h-5" />
        ) : (
          <MicOff className="w-5 h-5" />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-2 text-center"
          >
            <div className="text-agri-primary text-sm">
              {isProcessing ? 'Processing...' : 'Listening...'}
            </div>
            
            {/* Voice visualization */}
            {isListening && !isProcessing && (
              <div className="flex items-center justify-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-agri-primary rounded-full"
                    animate={{
                      height: [3, 12, 5, 18, 3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            )}
            
            {error && (
              <div className="text-red-400 text-xs mt-1">{error}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;