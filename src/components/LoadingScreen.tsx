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
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central glowing purple orb */}
      <div className="relative w-64 h-64 mb-8">
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute inset-8 rounded-full bg-purple-400/30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />

        {/* Main purple orb */}
        <motion.div
          className="absolute inset-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-2xl"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 50px rgba(147, 51, 234, 0.5)',
              '0 0 100px rgba(147, 51, 234, 0.8)',
              '0 0 50px rgba(147, 51, 234, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Inner energy core */}
        <motion.div
          className="absolute inset-20 rounded-full bg-white/80 blur-sm"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Orbiting energy particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-300 rounded-full blur-sm"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: `${60 + Math.cos(i * Math.PI / 4) * 40}px ${Math.sin(i * Math.PI / 4) * 40}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 4 + i * 0.3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}

        {/* Falling stars effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
            style={{
              left: `${Math.random() * 400 - 100}px`,
              top: '-10px',
            }}
            animate={{
              y: 400,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
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
          className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
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