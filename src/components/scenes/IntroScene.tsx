import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IntroScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Generate star streaks for tunnel effect
  const generateStarStreaks = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 200 + Math.random() * 400;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const length = 50 + Math.random() * 100;
      const brightness = 0.3 + Math.random() * 0.7;
      
      return {
        id: i,
        x: x + window.innerWidth / 2,
        y: y + window.innerHeight / 2,
        angle: angle,
        length,
        brightness,
        speed: 1 + Math.random() * 2,
      };
    });
  };

  const starStreaks = generateStarStreaks(150);

  // Generate static background stars
  const backgroundStars = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    brightness: 0.2 + Math.random() * 0.8,
    twinkleDelay: Math.random() * 3,
  }));

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background stars */}
      <div className="absolute inset-0">
        {backgroundStars.map((star) => (
          <motion.div
            key={`bg-star-${star.id}`}
            className="absolute rounded-full bg-blue-200"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.brightness,
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: star.twinkleDelay,
            }}
          />
        ))}
      </div>

      {/* Cosmic tunnel effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central vanishing point glow */}
        <motion.div
          className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
          animate={inView ? {
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Star streaks creating tunnel effect */}
        {starStreaks.map((streak) => (
          <motion.div
            key={`streak-${streak.id}`}
            className="absolute origin-center"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${streak.angle}rad)`,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? {
              opacity: [0, streak.brightness, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-transparent via-blue-200 to-transparent rounded-full"
              style={{
                width: `${streak.length}px`,
                height: '1px',
                transformOrigin: 'left center',
              }}
              animate={inView ? {
                scaleX: [0, 1, 0],
                x: [0, streak.speed * 100, streak.speed * 200],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          </motion.div>
        ))}

        {/* Additional radial light streaks */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`radial-${i}`}
            className="absolute w-1 bg-gradient-to-t from-transparent via-purple-300/50 to-transparent"
            style={{
              height: '60vh',
              left: '50%',
              top: '50%',
              transformOrigin: 'bottom center',
              transform: `rotate(${(i * 45)}deg) translateX(-50%)`,
            }}
            animate={inView ? {
              opacity: [0, 0.6, 0],
              scaleY: [0, 1, 0],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Concentric circles for depth */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute border border-purple-400/20 rounded-full"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={inView ? {
              scale: [0.5, 2, 0.5],
              opacity: [0.8, 0.2, 0.8],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Particle field moving toward center */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 300 + Math.random() * 400;
          const startX = Math.cos(angle) * distance;
          const startY = Math.sin(angle) * distance;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={inView ? {
                x: [startX, 0],
                y: [startY, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0],
              } : {}}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeIn",
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-8 relative">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1.5, delay: 2, staggerChildren: 0.3 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-light text-white font-space tracking-wider relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          >
            Into the
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent relative">
              Glow
              {/* Text glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Glow
              </motion.div>
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

      {/* Vignette effect for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default IntroScene;