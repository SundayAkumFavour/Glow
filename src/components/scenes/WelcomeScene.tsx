import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WelcomeScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Candle glow effect */}
      <motion.div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/30 rounded-full blur-3xl"
        animate={inView ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Girl silhouette */}
      <motion.div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="relative">
          {/* Girl figure */}
          <div className="w-12 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full relative">
            {/* Head */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full" />
            {/* Candle */}
            <div className="absolute -right-4 top-2 w-1 h-8 bg-yellow-200 rounded-full">
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Welcome text */}
      <div className="text-center md:text-left md:ml-auto md:mr-32 z-10 px-8 max-w-2xl">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 100 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, staggerChildren: 0.2, delay: 1 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white font-space"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Welcome, traveler
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            In the vast darkness of space, I carry a small flame—a beacon of curiosity, 
            ambition, and hope. This journey is my story, each step illuminated by the 
            glow of dreams yet to be realized.
          </motion.p>

          <motion.p
            className="text-md text-gray-400 font-light italic"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            "The light we carry within is stronger than any darkness we may encounter."
          </motion.p>
        </motion.div>
      </div>

      {/* Particle trail */}
      {inView && (
        <div className="absolute left-1/4 top-1/2">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${-i * 8}px`,
                top: `${Math.sin(i * 0.3) * 20}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: 2 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WelcomeScene;