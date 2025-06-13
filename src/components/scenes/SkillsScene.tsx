import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Database, Globe, Smartphone, Zap } from 'lucide-react';

const SkillsScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Vue.js, Angular",
      details: "Building responsive, accessible, and performant user interfaces with modern frameworks and best practices.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Adobe Creative Suite, Prototyping",
      details: "Creating intuitive and beautiful user experiences through thoughtful design and user research.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
      details: "Developing scalable server-side applications and robust database architectures.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "HTML5, CSS3, JavaScript, WebGL, Three.js",
      details: "Leveraging cutting-edge web technologies to create immersive digital experiences.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native, Flutter, iOS, Android",
      details: "Building cross-platform mobile applications with native performance and feel.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Performance & Optimization",
      description: "Webpack, Vite, PWA, Performance Auditing",
      details: "Optimizing applications for speed, accessibility, and user experience across all devices.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden px-8">
      {/* Astronaut figure */}
      <motion.div
        className="absolute right-1/3 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="relative">
          {/* Astronaut body */}
          <div className="w-16 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl relative">
            {/* Helmet */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gray-200 rounded-full border-4 border-gray-400">
              <div className="absolute inset-2 bg-black/20 rounded-full" />
            </div>
            {/* Chest panel */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-400 rounded">
              <div className="absolute inset-1 bg-blue-300 rounded-sm" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Girl reaching toward astronaut */}
      <motion.div
        className="absolute left-1/3 top-1/2 -translate-y-1/2"
        initial={{ x: -100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="relative">
          <div className="w-12 h-20 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full" />
            {/* Extended arm */}
            <div className="absolute -right-6 top-4 w-8 h-2 bg-gray-700 rounded-full rotate-12" />
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

      {/* Ripple effect trigger */}
      <motion.div
        className="absolute right-1/3 top-1/2 -translate-y-1/2 -translate-x-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 4, 0], opacity: [0, 0.6, 0] } : {}}
        transition={{ duration: 2, delay: 2.5 }}
      >
        <div className="w-32 h-32 border-2 border-purple-400 rounded-full" />
      </motion.div>

      {/* Skills content */}
      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white font-space mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            Skills & <span className="text-purple-400">Expertise</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 3.4 }}
          >
            Through years of exploration in the digital cosmos, I've gathered knowledge 
            across the full spectrum of web development and design.
          </motion.p>

          {/* Skills grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 3.6, staggerChildren: 0.1 }}
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isSelected = selectedSkill === index;
              
              return (
                <motion.div
                  key={index}
                  className={`
                    relative p-6 rounded-xl border cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? 'border-purple-400 bg-black/40 scale-105' 
                      : 'border-white/20 bg-black/20 hover:border-purple-400/50 hover:bg-black/30'
                    }
                  `}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: isSelected ? 1.05 : 1 
                  } : { opacity: 0, y: 30, scale: 0.8 }}
                  transition={{ duration: 1, delay: 3.8 + index * 0.1 }}
                  onClick={() => setSelectedSkill(isSelected ? null : index)}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-2">{skill.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                  
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute inset-x-6 bottom-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-300">{skill.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsScene;