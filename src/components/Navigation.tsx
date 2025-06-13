import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

interface NavigationProps {
  currentScene: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentScene }) => {
  const navItems = [
    { icon: Home, label: 'Home', id: 0 },
    { icon: User, label: 'About', id: 1 },
    { icon: Code, label: 'Skills', id: 2 },
    { icon: Briefcase, label: 'Projects', id: 3 },
    { icon: Mail, label: 'Contact', id: 4 },
  ];

  const scrollToSection = (sectionId: number) => {
    window.scrollTo({
      top: sectionId * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex flex-col space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScene === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative group p-3 rounded-full transition-all duration-300
                ${isActive 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'bg-black/20 text-gray-400 hover:text-white hover:bg-white/10'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap backdrop-blur-sm">
                  {item.label}
                </div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 rounded-full"
                  layoutId="nav-indicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;