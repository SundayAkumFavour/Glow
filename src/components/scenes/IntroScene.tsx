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
      {/* Falling particles effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 1, 1, 0],
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

      {/* Main content */}
      <div className="text-center z-10 px-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, staggerChildren: 0.3 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-light text-white font-space tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Into the
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Glow
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1 }}
          >
            A journey through the cosmos, where each scroll unveils a new chapter of discovery, 
            dreams, and the endless pursuit of light in the darkness.
          </motion.p>

          <motion.div
            className="text-gray-400 text-lg font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
    </section>
  );
};

export default IntroScene;