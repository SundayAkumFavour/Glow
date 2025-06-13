import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star, Zap, Globe, Smartphone } from 'lucide-react';

const ProjectsScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Stellar UI Framework",
      description: "A comprehensive React component library with space-themed design system",
      tags: ["React", "TypeScript", "Storybook", "CSS-in-JS"],
      image: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Star,
      details: "Built a complete design system with 50+ components, used by 10+ companies. Features dark/light themes, full accessibility compliance, and comprehensive documentation.",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Cosmic Dashboard",
      description: "Real-time analytics dashboard with interactive data visualizations",
      tags: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
      image: "https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Zap,
      details: "Created a high-performance dashboard handling 1M+ data points with real-time updates, custom charts, and advanced filtering capabilities.",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Nebula E-commerce",
      description: "Full-stack e-commerce platform with advanced search and recommendations",
      tags: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.pexels.com/photos/57043/pexels-photo-57043.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Globe,
      details: "Developed a complete e-commerce solution with AI-powered recommendations, secure payments, and inventory management.",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Galaxy Mobile App",
      description: "Cross-platform mobile app for space exploration and education",
      tags: ["React Native", "Expo", "Firebase", "AR"],
      image: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Smartphone,
      details: "Built an educational app with AR features, 3D models, and interactive learning modules, downloaded by 50K+ users.",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden px-8">
      {/* Girl being blasted back animation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={inView ? { 
          x: [-100, 100, 0], 
          y: [0, -200, 100, 0], 
          rotate: [0, 180, 360] 
        } : {}}
        transition={{ 
          duration: 3, 
          delay: 0.5,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut"
        }}
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

      {/* Explosion effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 10, 0], opacity: [0, 0.8, 0] } : {}}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
      </motion.div>

      {/* Projects content */}
      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white font-space mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 4.2 }}
          >
            Stellar <span className="text-purple-400">Projects</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 4.4 }}
          >
            Each project is a constellation of ideas, brought to life through code, 
            creativity, and countless hours of passionate development.
          </motion.p>

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 4.6, staggerChildren: 0.2 }}
          >
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isSelected = selectedProject === index;
              
              return (
                <motion.div
                  key={index}
                  className={`
                    relative group cursor-pointer rounded-xl overflow-hidden border transition-all duration-500
                    ${project.featured ? 'md:col-span-1' : 'md:col-span-1'}
                    ${isSelected 
                      ? 'border-purple-400 scale-105 z-20' 
                      : 'border-white/20 hover:border-purple-400/50'
                    }
                  `}
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    scale: isSelected ? 1.05 : 1
                  } : { opacity: 0, y: 50, rotateX: 15 }}
                  transition={{ duration: 1, delay: 4.8 + index * 0.2 }}
                  onClick={() => setSelectedProject(isSelected ? null : index)}
                  whileHover={{ y: -10 }}
                >
                  {/* Project image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Project icon */}
                    <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 px-2 py-1 bg-purple-500/80 rounded-full text-xs text-white font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project content */}
                  <div className="p-6 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-4">
                      <a 
                        href={project.liveUrl}
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.githubUrl}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute inset-x-0 bottom-0 p-6 bg-black/90 backdrop-blur-md border-t border-purple-500/30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {project.details}
                        </p>
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

export default ProjectsScene;