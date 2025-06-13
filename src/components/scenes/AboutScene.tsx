import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Heart, Target, Rocket } from 'lucide-react';

const AboutScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const traits = [
    {
      icon: Sparkles,
      title: "Curious Explorer",
      description: "Always seeking new technologies and creative solutions to complex problems."
    },
    {
      icon: Heart,
      title: "Passionate Creator",
      description: "Driven by the desire to build meaningful experiences that make a difference."
    },
    {
      icon: Target,
      title: "Detail-Oriented",
      description: "Committed to excellence in every pixel, every line of code, every interaction."
    },
    {
      icon: Rocket,
      title: "Future-Focused",
      description: "Embracing emerging technologies while building for tomorrow's possibilities."
    }
  ];

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden px-8">
      {/* Distant light source */}
      <motion.div
        className="absolute right-1/4 top-1/3 w-4 h-4 bg-white rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-white rounded-full blur-md"
          animate={inView ? {
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      {/* Light rays */}
      <motion.div
        className="absolute right-1/4 top-1/3 w-96 h-1 bg-gradient-to-l from-white/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ transformOrigin: 'right center' }}
      />

      {/* Girl walking toward light */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        initial={{ x: -200, opacity: 0 }}
        animate={inView ? { x: 50, opacity: 1 } : { x: -200, opacity: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <div className="relative">
          <div className="w-12 h-20 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full" />
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

      {/* About content */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white font-space mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            I'm <span className="text-purple-400">Sparkles</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            A developer who believes that every line of code is a step toward illuminating 
            the digital universe. In the distance, I see hope—a guiding light that pulls 
            me forward through challenges and inspires me to create experiences that matter.
          </motion.p>

          {/* Trait cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 2.6, staggerChildren: 0.2 }}
          >
            {traits.map((trait, index) => {
              const Icon = trait.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 1, delay: 2.8 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-2">{trait.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{trait.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutScene;