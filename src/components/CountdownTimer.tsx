import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  onComplete,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete) onComplete();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  // Format with leading zeros
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  if (isComplete) {
    return (
      <div className={`flex items-center space-x-1 text-agri-primary ${className}`}>
        <Clock className="w-4 h-4" />
        <span>Time's up!</span>
      </div>
    );
  }

  // For short format (less than a day)
  if (timeLeft.days === 0) {
    return (
      <div className={`flex items-center space-x-1 text-agri-primary ${className}`}>
        <Clock className="w-4 h-4" />
        <span>
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  // For longer format
  return (
    <div className={`flex items-center space-x-1 text-agri-primary ${className}`}>
      <Clock className="w-4 h-4" />
      <span>
        {timeLeft.days}d {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m
      </span>
    </div>
  );
};

export default CountdownTimer;