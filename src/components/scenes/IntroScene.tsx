import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IntroScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background constellation stars */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: Math.random() > 0.7 ? '#60a5fa' : '#ffffff',
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Central glowing purple orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500/15 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute inset-12 rounded-full bg-purple-400/25 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        {/* Main purple orb */}
        <motion.div
          className="absolute inset-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 60px rgba(147, 51, 234, 0.6)',
              '0 0 120px rgba(147, 51, 234, 0.9)',
              '0 0 60px rgba(147, 51, 234, 0.6)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Inner energy core */}
        <motion.div
          className="absolute inset-32 rounded-full bg-white/60 blur-md"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Energy waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-purple-400/30"
            animate={{
              scale: [0.5, 2],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Falling particles effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1.5, delay: 2, staggerChildren: 0.3 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-light text-white font-space tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          >
            Into the
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Glow
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 3 }}
          >
            A journey through the cosmos, where each scroll unveils a new chapter of discovery, 
            dreams, and the endless pursuit of light in the darkness.
          </motion.p>

          <motion.div
            className="text-gray-400 text-lg font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to begin your descent through the stars ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />
    </section>
  );
};

export default IntroScene;