import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Galaxy Vortex Animation */}
      <div className="relative w-64 h-64 mb-8">
        <motion.div
          className="absolute inset-0 border-2 border-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-2 border-blue-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 border-2 border-purple-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central glow */}
        <div className="absolute inset-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full blur-xl opacity-70" />
        
        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${50 + Math.cos(i * Math.PI / 4) * 80}px ${Math.sin(i * Math.PI / 4) * 80}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3 + i * 0.2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.h1
        className="text-2xl font-light text-white mb-4 font-space"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Into the Glow
      </motion.h1>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className="text-gray-400 text-sm mt-4 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Preparing your journey through the stars...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;